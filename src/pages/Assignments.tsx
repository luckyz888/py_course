import { useState } from 'react';
import { useAuthStore } from '../stores/authStore';
import { useAssignmentStore } from '../stores/assignmentStore';
import { allModules } from '../data/modules';
import { ClipboardList, CheckCircle2, XCircle, Clock, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';

// Generate assignments from quiz data in modules
function generateAssignments() {
  const assignments = [];
  for (const mod of allModules) {
    for (const ch of mod.chapters) {
      const questions = ch.lessons
        .filter(l => l.exercise)
        .slice(0, 3)
        .map((l, idx) => ({
          id: `${ch.id}_q${idx}`,
          type: (idx % 3 === 0 ? 'choice' : idx % 3 === 1 ? 'fill' : 'code') as 'choice' | 'fill' | 'code',
          question: `完成「${l.title}」相关练习`,
          options: idx % 3 === 0 ? ['A. 正确', 'B. 错误', 'C. 不确定', 'D. 以上都不是'] : undefined,
          answer: 'A',
          points: idx % 3 === 2 ? 30 : 10,
        }));

      if (questions.length > 0) {
        assignments.push({
          id: `assign_${ch.id}`,
          moduleId: mod.id,
          chapterId: ch.id,
          title: `${ch.title} - 作业`,
          type: questions.some(q => q.type === 'code') ? 'subjective' as const : 'objective' as const,
          questions,
        });
      }
    }
  }
  return assignments;
}

const assignments = generateAssignments();

export default function Assignments() {
  const { currentUser, isLoggedIn } = useAuthStore();
  const { submitAssignment, getSubmission } = useAssignmentStore();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<string, Record<string, string>>>({});
  const [submittedIds, setSubmittedIds] = useState<Set<string>>(new Set());

  if (!isLoggedIn || !currentUser) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <ClipboardList className="w-16 h-16 text-gray-300 mb-4" />
        <p className="text-gray-500 mb-4">请先登录后查看作业</p>
      </div>
    );
  }

  const handleAnswerChange = (assignmentId: string, questionId: string, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [assignmentId]: { ...prev[assignmentId], [questionId]: value },
    }));
  };

  const handleSubmit = (assignment: typeof assignments[0]) => {
    const assignmentAnswers = answers[assignment.id] || {};
    const result = submitAssignment(assignment.id, currentUser.id, assignmentAnswers, assignment);
    setSubmittedIds(prev => new Set(prev).add(assignment.id));
  };

  const getStatusBadge = (assignmentId: string) => {
    const submission = getSubmission(assignmentId, currentUser.id);
    if (!submission) return null;
    if (submission.status === 'reviewed') {
      return <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full flex items-center gap-1"><CheckCircle2 className="w-3 h-3" />已批改</span>;
    }
    if (submission.status === 'auto-graded') {
      return <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs font-medium rounded-full flex items-center gap-1"><Clock className="w-3 h-3" />待复核</span>;
    }
    return <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded-full flex items-center gap-1"><AlertCircle className="w-3 h-3" />已提交</span>;
  };

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500 p-6 shadow-lg">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-white/10 blur-2xl" />
        </div>
        <div className="relative flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <ClipboardList className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">作业中心</h1>
            <p className="text-sm text-white/70 mt-0.5">提交作业 · 自动批改 · AI初评</p>
          </div>
        </div>
      </div>

      {/* Assignment List */}
      <div className="space-y-4">
        {assignments.map(assignment => {
          const isExpanded = expandedId === assignment.id;
          const submission = getSubmission(assignment.id, currentUser.id);
          const isSubmitted = !!submission || submittedIds.has(assignment.id);
          const mod = allModules.find(m => m.id === assignment.moduleId);

          return (
            <div key={assignment.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              {/* Assignment Header */}
              <button
                onClick={() => setExpandedId(isExpanded ? null : assignment.id)}
                className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white text-sm font-bold ${
                    assignment.type === 'objective' ? 'bg-gradient-to-br from-blue-400 to-indigo-500' : 'bg-gradient-to-br from-amber-400 to-orange-500'
                  }`}>
                    {assignment.type === 'objective' ? '客' : '主'}
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1e1b4b] text-sm">{assignment.title}</h3>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-gray-400">{mod?.icon} {mod?.title}</span>
                      <span className="text-xs text-gray-300">·</span>
                      <span className="text-xs text-gray-400">{assignment.questions.length} 题</span>
                      {getStatusBadge(assignment.id)}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {submission?.totalScore !== null && submission?.totalScore !== undefined && (
                    <span className="text-sm font-bold text-emerald-600">{submission.totalScore}分</span>
                  )}
                  {isExpanded ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                </div>
              </button>

              {/* Expanded Content */}
              {isExpanded && (
                <div className="px-5 pb-5 border-t border-gray-100">
                  <div className="space-y-4 mt-4">
                    {assignment.questions.map((q, qIdx) => {
                      const userAnswer = answers[assignment.id]?.[q.id] || '';
                      const qSubmission = submission;

                      return (
                        <div key={q.id} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                          <div className="flex items-start gap-2 mb-3">
                            <span className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                              q.type === 'choice' ? 'bg-blue-500' : q.type === 'fill' ? 'bg-emerald-500' : 'bg-amber-500'
                            }`}>
                              {qIdx + 1}
                            </span>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-800">{q.question}</p>
                              <span className="text-xs text-gray-400 mt-0.5">{q.points}分 · {q.type === 'choice' ? '选择题' : q.type === 'fill' ? '填空题' : '编程题'}</span>
                            </div>
                          </div>

                          {/* Answer input */}
                          {q.type === 'choice' && q.options && (
                            <div className="space-y-2 ml-8">
                              {q.options.map((opt, optIdx) => (
                                <label key={optIdx} className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-colors ${
                                  userAnswer === opt[0] ? 'bg-emerald-50 border border-emerald-200' : 'hover:bg-gray-100 border border-transparent'
                                }`}>
                                  <input
                                    type="radio"
                                    name={`${assignment.id}_${q.id}`}
                                    value={opt[0]}
                                    checked={userAnswer === opt[0]}
                                    onChange={e => handleAnswerChange(assignment.id, q.id, e.target.value)}
                                    disabled={isSubmitted}
                                    className="text-emerald-500 focus:ring-emerald-500"
                                  />
                                  <span className="text-sm text-gray-700">{opt}</span>
                                </label>
                              ))}
                            </div>
                          )}

                          {q.type === 'fill' && (
                            <div className="ml-8">
                              <input
                                type="text"
                                value={userAnswer}
                                onChange={e => handleAnswerChange(assignment.id, q.id, e.target.value)}
                                disabled={isSubmitted}
                                placeholder="请输入答案"
                                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none"
                              />
                            </div>
                          )}

                          {q.type === 'code' && (
                            <div className="ml-8">
                              <textarea
                                value={userAnswer}
                                onChange={e => handleAnswerChange(assignment.id, q.id, e.target.value)}
                                disabled={isSubmitted}
                                placeholder="请输入代码"
                                rows={4}
                                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-mono focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none resize-y"
                              />
                            </div>
                          )}

                          {/* Feedback after submission */}
                          {isSubmitted && qSubmission && (q.type === 'code' || q.type === 'fill') && qSubmission.subjectiveFeedback[q.id] && (
                            <div className="ml-8 mt-2 p-2 bg-amber-50 border border-amber-200 rounded-lg">
                              <p className="text-xs text-amber-700"><span className="font-medium">AI点评：</span>{qSubmission.subjectiveFeedback[q.id]}</p>
                            </div>
                          )}

                          {isSubmitted && qSubmission && (q.type === 'choice' || q.type === 'fill') && (
                            <div className="ml-8 mt-2 flex items-center gap-1.5">
                              {userAnswer.trim().toLowerCase() === q.answer.trim().toLowerCase() ? (
                                <span className="flex items-center gap-1 text-xs text-emerald-600"><CheckCircle2 className="w-3.5 h-3.5" /> 正确</span>
                              ) : (
                                <span className="flex items-center gap-1 text-xs text-red-500"><XCircle className="w-3.5 h-3.5" /> 错误，正确答案：{q.answer}</span>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}

                    {/* Submit button */}
                    {!isSubmitted && (
                      <button
                        onClick={() => handleSubmit(assignment)}
                        className="w-full py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-emerald-200 hover:-translate-y-0.5 transition-all duration-200 text-sm"
                      >
                        提交作业
                      </button>
                    )}

                    {/* Score summary */}
                    {isSubmitted && submission && (
                      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-4 border border-emerald-100">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-emerald-700">批改结果</span>
                          <div className="flex items-center gap-4 text-sm">
                            <span className="text-gray-600">客观题：<span className="font-bold text-emerald-600">{submission.objectiveScore}/{submission.objectiveTotal}</span></span>
                            {submission.subjectiveScore !== null && (
                              <span className="text-gray-600">主观题：<span className="font-bold text-amber-600">{submission.subjectiveScore}</span></span>
                            )}
                            {submission.totalScore !== null && (
                              <span className="text-gray-600">总分：<span className="font-bold text-indigo-600 text-base">{submission.totalScore}</span></span>
                            )}
                          </div>
                        </div>
                        {submission.status === 'auto-graded' && submission.subjectiveScore !== null && (
                          <p className="text-xs text-amber-600 mt-2">主观题已由AI初评，等待人工复核后确定最终分数</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
