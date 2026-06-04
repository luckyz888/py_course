import { useRef, useState } from 'react';
import { User, Star, Flame, BookOpen, Download, Upload, Trash2, AlertTriangle } from 'lucide-react';
import { useCourseStore } from '../stores/courseStore';
import { useExerciseStore } from '../stores/exerciseStore';
import { useQuizStore } from '../stores/quizStore';
import { useAchievementStore } from '../stores/achievementStore';
import { allModules } from '../data/modules';
import { exportAllData, importAllData, resetAllData } from '../utils/dataExport';
import StatsCard from '../components/StatsCard';
import ProgressBar from '../components/ProgressBar';

export default function Profile() {
  const { completedLessons, getModuleProgress } = useCourseStore();
  const { exerciseResults } = useExerciseStore();
  const { quizResults, getBestScore } = useQuizStore();
  const { points, streak, getLevel } = useAchievementStore();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [importError, setImportError] = useState(false);
  const [importSuccess, setImportSuccess] = useState(false);

  const level = getLevel();

  // 练习统计
  const totalExercises = allModules.reduce(
    (sum, m) => sum + m.chapters.reduce(
      (s, ch) => s + ch.lessons.filter((l) => l.exercise).length, 0
    ), 0
  );
  const passedExercises = Object.values(exerciseResults).filter((r) => r.passed).length;

  // 测评统计
  const quizEntries = Object.values(quizResults);
  const passedQuizzes = quizEntries.filter((r) => (r.score / r.totalQuestions) * 100 >= 60).length;
  const quizPassRate = quizEntries.length > 0
    ? Math.round((passedQuizzes / quizEntries.length) * 100)
    : 0;

  // 测评最高分列表
  const bestScores = allModules.map((m) => ({
    moduleId: m.id,
    title: m.title,
    bestScore: getBestScore(m.id),
  })).filter((s) => s.bestScore > 0);

  // 导出
  const handleExport = () => {
    const json = exportAllData();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `learning-data-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // 导入
  const handleImport = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImportError(false);
    setImportSuccess(false);
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result as string;
      const success = importAllData(text);
      if (success) {
        setImportSuccess(true);
        setTimeout(() => window.location.reload(), 800);
      } else {
        setImportError(true);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // 重置
  const handleReset = () => {
    resetAllData();
    setShowResetConfirm(false);
    window.location.reload();
  };

  return (
    <div className="space-y-6 animate-slide-up">
      {/* 标题 */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#1e1b4b]/10 flex items-center justify-center">
          <User className="w-5 h-5 text-[#1e1b4b]" />
        </div>
        <h1 className="text-2xl font-bold text-[#1e1b4b]">个人中心</h1>
      </div>

      {/* 学习统计卡片 */}
      <div className="grid grid-cols-2 gap-4 stagger-children">
        <StatsCard
          title="总积分"
          value={points}
          icon={<Star className="w-6 h-6" />}
          color="#f59e0b"
        />
        <StatsCard
          title="当前等级"
          value={level.name}
          icon={<Star className="w-6 h-6" />}
          color="#1e1b4b"
        />
        <StatsCard
          title="连续学习天数"
          value={streak}
          icon={<Flame className="w-6 h-6" />}
          color="#f59e0b"
        />
        <StatsCard
          title="完成知识点数"
          value={completedLessons.length}
          icon={<BookOpen className="w-6 h-6" />}
          color="#10b981"
        />
      </div>

      {/* 学习进度概览 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-bold text-[#1e1b4b] mb-4">学习进度概览</h2>
        <div className="space-y-4">
          {allModules.map((m) => (
            <ProgressBar
              key={m.id}
              label={m.title}
              progress={getModuleProgress(m.id)}
            />
          ))}
        </div>
      </div>

      {/* 练习与测评统计 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-bold text-[#1e1b4b] mb-4">练习与测评统计</h2>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center p-4 bg-gray-50 rounded-xl">
            <p className="text-sm text-gray-500 mb-1">已通过练习</p>
            <p className="text-2xl font-bold text-[#10b981]">
              {passedExercises}<span className="text-base font-normal text-gray-400"> / {totalExercises}</span>
            </p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-xl">
            <p className="text-sm text-gray-500 mb-1">测评通过率</p>
            <p className="text-2xl font-bold text-[#f59e0b]">{quizPassRate}%</p>
          </div>
        </div>
        {bestScores.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-gray-600 mb-2">测评最高分</h3>
            <div className="space-y-2">
              {bestScores.map((s) => (
                <div key={s.moduleId} className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-700">{s.title}</span>
                  <span className="text-sm font-semibold text-[#10b981]">{s.bestScore}分</span>
                </div>
              ))}
            </div>
          </div>
        )}
        {bestScores.length === 0 && (
          <p className="text-sm text-gray-400 text-center py-4">暂无测评记录</p>
        )}
      </div>

      {/* 数据管理 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-bold text-[#1e1b4b] mb-4">数据管理</h2>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleExport}
            className="group flex items-center gap-2 px-4 py-2.5 bg-[#1e1b4b] text-white rounded-lg hover:bg-[#1e1b4b]/90 transition-all duration-200 text-sm font-medium hover:-translate-y-0.5 hover:shadow-md"
          >
            <Download className="w-4 h-4 group-hover:animate-bounce" />
            导出数据
          </button>
          <button
            onClick={handleImport}
            className="group flex items-center gap-2 px-4 py-2.5 bg-[#f59e0b] text-white rounded-lg hover:bg-[#f59e0b]/90 transition-all duration-200 text-sm font-medium hover:-translate-y-0.5 hover:shadow-md"
          >
            <Upload className="w-4 h-4 group-hover:animate-bounce" />
            导入数据
          </button>
          <button
            onClick={() => setShowResetConfirm(true)}
            className="group flex items-center gap-2 px-4 py-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200 text-sm font-medium hover:-translate-y-0.5 hover:shadow-md"
          >
            <Trash2 className="w-4 h-4 group-hover:animate-bounce" />
            重置数据
          </button>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={handleFileChange}
          className="hidden"
        />
        {importSuccess && (
          <p className="mt-3 text-sm text-[#10b981]">导入成功，页面即将刷新…</p>
        )}
        {importError && (
          <p className="mt-3 text-sm text-red-500">导入失败，请检查文件格式是否正确。</p>
        )}
      </div>

      {/* 重置确认对话框 */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full mx-4 animate-slide-up">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-500" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">确认重置</h3>
            </div>
            <p className="text-gray-600 mb-6">此操作将清除所有学习数据，包括课程进度、练习记录、测评结果和成就数据。此操作不可撤销。</p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                取消
              </button>
              <button
                onClick={handleReset}
                className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
              >
                确认重置
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
