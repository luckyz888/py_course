import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Assignment {
  id: string;
  moduleId: string;
  chapterId: string;
  title: string;
  type: 'objective' | 'subjective';
  questions: AssignmentQuestion[];
}

export interface AssignmentQuestion {
  id: string;
  type: 'choice' | 'fill' | 'code' | 'essay';
  question: string;
  options?: string[];
  answer: string;
  points: number;
}

export interface AssignmentSubmission {
  assignmentId: string;
  userId: string;
  answers: Record<string, string>;
  objectiveScore: number;
  objectiveTotal: number;
  subjectiveScore: number | null;
  subjectiveFeedback: Record<string, string>;
  totalScore: number | null;
  status: 'pending' | 'auto-graded' | 'reviewed';
  submittedAt: string;
  reviewedAt: string | null;
}

interface AssignmentState {
  submissions: Record<string, AssignmentSubmission>;
  submitAssignment: (assignmentId: string, userId: string, answers: Record<string, string>, assignment: Assignment) => AssignmentSubmission;
  getSubmission: (assignmentId: string, userId: string) => AssignmentSubmission | undefined;
  reviewSubjective: (assignmentId: string, userId: string, scores: Record<string, number>, feedback: Record<string, string>) => void;
}

function autoGradeObjective(assignment: Assignment, answers: Record<string, string>): { score: number; total: number } {
  let score = 0;
  let total = 0;
  for (const q of assignment.questions) {
    if (q.type === 'choice' || q.type === 'fill') {
      total += q.points;
      const userAnswer = (answers[q.id] || '').trim().toLowerCase();
      const correctAnswer = q.answer.trim().toLowerCase();
      if (userAnswer === correctAnswer) {
        score += q.points;
      }
    }
  }
  return { score, total };
}

function aiGradeSubjective(assignment: Assignment, answers: Record<string, string>): { scores: Record<string, number>; feedback: Record<string, string> } {
  const scores: Record<string, number> = {};
  const feedback: Record<string, string> = {};

  for (const q of assignment.questions) {
    if (q.type === 'code' || q.type === 'essay') {
      const userAnswer = answers[q.id] || '';
      const correctAnswer = q.answer;

      // Simple heuristic scoring
      let scoreRatio = 0;
      let fb = '';

      if (q.type === 'code') {
        // Check if key keywords from the answer appear in user's code
        const keywords = correctAnswer.split(/[\s\(\)\[\]{}=<>!,;:.]+/).filter(w => w.length > 2);
        const matchedKeywords = keywords.filter(kw => userAnswer.toLowerCase().includes(kw.toLowerCase()));
        scoreRatio = keywords.length > 0 ? matchedKeywords.length / keywords.length : 0;
        scoreRatio = Math.min(scoreRatio * 1.2, 1); // Boost slightly, cap at 1

        if (userAnswer.trim().length === 0) {
          fb = '未提交代码，请补充作答。';
          scoreRatio = 0;
        } else if (scoreRatio > 0.8) {
          fb = '代码逻辑基本正确，关键词匹配度高。建议检查边界条件和异常处理。';
        } else if (scoreRatio > 0.5) {
          fb = '代码部分正确，但缺少一些关键步骤。请对照参考答案补充缺失部分。';
        } else if (scoreRatio > 0.2) {
          fb = '代码逻辑存在较大偏差，建议重新理解题目要求后作答。';
        } else {
          fb = '代码与参考答案差异较大，请仔细复习相关知识点后重新提交。';
        }
      } else {
        // Essay type
        const answerLength = userAnswer.trim().length;
        if (answerLength === 0) {
          fb = '未提交回答。';
          scoreRatio = 0;
        } else if (answerLength < 20) {
          fb = '回答过于简短，请补充更多细节和分析。';
          scoreRatio = 0.2;
        } else if (answerLength < 50) {
          fb = '回答基本覆盖要点，但可以更详细。建议补充具体案例或数据支撑。';
          scoreRatio = 0.5;
        } else {
          fb = '回答较为完整，论述有一定深度。人工复核可能会调整分数。';
          scoreRatio = 0.7;
        }
      }

      scores[q.id] = Math.round(q.points * scoreRatio);
      feedback[q.id] = fb;
    }
  }

  return { scores, feedback };
}

export const useAssignmentStore = create<AssignmentState>()(
  persist(
    (set, get) => ({
      submissions: {},

      submitAssignment: (assignmentId, userId, answers, assignment) => {
        const objectiveResult = autoGradeObjective(assignment, answers);
        const subjectiveResult = aiGradeSubjective(assignment, answers);

        const objectiveTotal = assignment.questions
          .filter(q => q.type === 'choice' || q.type === 'fill')
          .reduce((sum, q) => sum + q.points, 0);

        const subjectiveTotal = assignment.questions
          .filter(q => q.type === 'code' || q.type === 'essay')
          .reduce((sum, q) => sum + q.points, 0);

        const subjectiveScore = Object.values(subjectiveResult.scores).reduce((s, v) => s + v, 0);

        const hasSubjective = subjectiveTotal > 0;
        const totalScore = hasSubjective ? null : objectiveResult.score;

        const submission: AssignmentSubmission = {
          assignmentId,
          userId,
          answers,
          objectiveScore: objectiveResult.score,
          objectiveTotal: objectiveTotal,
          subjectiveScore: hasSubjective ? subjectiveScore : null,
          subjectiveFeedback: subjectiveResult.feedback,
          totalScore,
          status: hasSubjective ? 'auto-graded' : 'auto-graded',
          submittedAt: new Date().toISOString(),
          reviewedAt: null,
        };

        const key = `${assignmentId}_${userId}`;
        set((state) => ({
          submissions: { ...state.submissions, [key]: submission },
        }));

        return submission;
      },

      getSubmission: (assignmentId, userId) => {
        const key = `${assignmentId}_${userId}`;
        return get().submissions[key];
      },

      reviewSubjective: (assignmentId, userId, scores, feedback) => {
        const key = `${assignmentId}_${userId}`;
        const submission = get().submissions[key];
        if (!submission) return;

        const subjectiveScore = Object.values(scores).reduce((s, v) => s + v, 0);
        const totalScore = submission.objectiveScore + subjectiveScore;

        set((state) => ({
          submissions: {
            ...state.submissions,
            [key]: {
              ...submission,
              subjectiveScore,
              subjectiveFeedback: { ...submission.subjectiveFeedback, ...feedback },
              totalScore,
              status: 'reviewed',
              reviewedAt: new Date().toISOString(),
            },
          },
        }));
      },
    }),
    { name: 'assignment-store' }
  )
);
