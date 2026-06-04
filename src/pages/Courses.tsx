import { useNavigate } from 'react-router-dom';
import { BookOpen, Sparkles } from 'lucide-react';
import { allModules } from '../data/modules';
import { useCourseStore } from '../stores/courseStore';

function ProgressRing({ progress, size = 48, strokeWidth = 4 }: { progress: number; size?: number; strokeWidth?: number }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - progress / 100);
  const color = progress === 100 ? '#10b981' : '#f59e0b';

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="shrink-0">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="#e5e7eb"
        strokeWidth={strokeWidth}
        fill="none"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        className="transition-all duration-700 ease-out"
      />
      <text
        x={size / 2}
        y={size / 2}
        textAnchor="middle"
        dominantBaseline="central"
        className="text-xs font-bold"
        fill={color}
      >
        {progress}%
      </text>
    </svg>
  );
}

export default function Courses() {
  const navigate = useNavigate();
  const getModuleProgress = useCourseStore((s) => s.getModuleProgress);

  const allZeroProgress = allModules.every((m) => getModuleProgress(m.id) === 0);

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-[#1e1b4b]/10 flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-[#1e1b4b]" />
          </div>
          <h1 className="text-2xl font-bold text-[#1e1b4b]">课程中心</h1>
        </div>
        <p className="text-gray-500">系统化学习商务数据分析，从Python基础到数据挖掘实战，开启你的数据之旅。</p>
      </div>

      {/* Empty state for all-zero progress */}
      {allZeroProgress && (
        <div className="bg-gradient-to-r from-[#f59e0b]/5 to-[#f59e0b]/10 rounded-xl p-6 border border-[#f59e0b]/20 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#f59e0b]/20 flex items-center justify-center shrink-0">
            <Sparkles className="w-6 h-6 text-[#f59e0b]" />
          </div>
          <div>
            <p className="font-semibold text-[#1e1b4b]">准备好开始了吗？</p>
            <p className="text-sm text-gray-500">点击任意课程模块，迈出你数据分析学习的第一步！</p>
          </div>
        </div>
      )}

      {/* Module Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 stagger-children">
        {allModules.map((mod) => {
          const progress = getModuleProgress(mod.id);
          const chapterCount = mod.chapters.length;
          const lessonCount = mod.chapters.reduce((sum, ch) => sum + ch.lessons.length, 0);

          return (
            <div
              key={mod.id}
              onClick={() => navigate(`/courses/${mod.id}`)}
              className="relative bg-white rounded-xl p-[2px] shadow-sm cursor-pointer
                transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
              style={{
                background: 'linear-gradient(135deg, #e5e7eb 0%, #e5e7eb 100%)',
              }}
            >
              {/* Gradient border overlay */}
              <div
                className="absolute inset-0 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: 'linear-gradient(135deg, #f59e0b, #1e1b4b)',
                }}
              />
              <div className="relative bg-white rounded-[10px] p-6 h-full">
                {/* Icon & Title */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="text-3xl w-12 h-12 flex items-center justify-center bg-[#1e1b4b]/5 rounded-xl shrink-0">
                    {mod.icon}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-[#1e1b4b] text-lg leading-tight">{mod.title}</h3>
                    <p className="text-gray-400 text-sm mt-1 line-clamp-2">{mod.description}</p>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <span>{chapterCount} 章节</span>
                  <span>{lessonCount} 知识点</span>
                </div>

                {/* Progress Ring */}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">学习进度</span>
                  <ProgressRing progress={progress} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
