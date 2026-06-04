import { useState } from 'react';
import { Trophy, Flame, Star, X } from 'lucide-react';
import { useAchievementStore } from '../stores/achievementStore';
import { badges } from '../data/badges';
import type { Badge } from '../types';

export default function Achievements() {
  const { points, streak, longestStreak, studyDays, earnedBadges, getLevel, getLevelProgress } =
    useAchievementStore();
  const level = getLevel();
  const levelProgress = getLevelProgress();
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);

  // 最近30天日期列表
  const last30Days: string[] = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date(Date.now() - i * 86400000);
    last30Days.push(d.toISOString().split('T')[0]);
  }

  return (
    <div className="space-y-6 animate-slide-up">
      {/* 标题 */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#f59e0b]/10 flex items-center justify-center">
          <Trophy className="w-5 h-5 text-[#f59e0b]" />
        </div>
        <h1 className="text-2xl font-bold text-[#1e1b4b]">成就中心</h1>
      </div>

      {/* 积分与等级区域 */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center gap-4 sm:gap-6 flex-wrap sm:flex-nowrap">
          {/* 积分 */}
          <div className="text-center min-w-[120px]">
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <Star className="w-5 h-5 text-[#f59e0b]" />
              <span className="text-sm text-gray-500">当前积分</span>
            </div>
            <div className="text-4xl font-bold text-[#1e1b4b]">{points}</div>
          </div>

          {/* 分隔线 */}
          <div className="w-px h-16 bg-gray-200 hidden sm:block" />

          {/* 等级 */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{level.icon}</span>
                <span className="text-lg font-semibold text-[#1e1b4b]">{level.name}</span>
              </div>
              {level.nextLevelPoints !== null && (
                <span className="text-sm text-gray-400">
                  下一等级需 {level.nextLevelPoints} 积分
                </span>
              )}
            </div>
            {/* 等级进度条 with gradient */}
            <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${levelProgress}%`,
                  background: 'linear-gradient(90deg, #f59e0b, #fbbf24)',
                }}
              />
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-xs text-gray-400">{level.minPoints}</span>
              {level.nextLevelPoints !== null && (
                <span className="text-xs text-gray-400">{level.nextLevelPoints}</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 连续学习区域 */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold text-[#1e1b4b] mb-4">学习记录</h2>
        <div className="flex items-center gap-6 mb-5">
          {/* 当前连续天数 */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center">
              <Flame className="w-5 h-5 text-[#f59e0b]" />
            </div>
            <div>
              <div className="text-2xl font-bold text-[#1e1b4b]">{streak}</div>
              <div className="text-xs text-gray-400">当前连续天数</div>
            </div>
          </div>

          {/* 最长连续记录 */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
              <Flame className="w-5 h-5 text-[#10b981]" />
            </div>
            <div>
              <div className="text-2xl font-bold text-[#1e1b4b]">{longestStreak}</div>
              <div className="text-xs text-gray-400">最长连续记录</div>
            </div>
          </div>
        </div>

        {/* 最近30天热力图 with tooltip */}
        <div>
          <div className="text-sm text-gray-500 mb-2">最近 30 天</div>
          <div className="flex flex-wrap gap-1.5">
            {last30Days.map((day) => {
              const studied = studyDays.includes(day);
              return (
                <div
                  key={day}
                  className={`w-5 h-5 rounded-sm transition-colors heatmap-tooltip ${
                    studied ? 'bg-[#10b981]' : 'bg-gray-200'
                  }`}
                  data-tooltip={`${day}${studied ? ' (已学习)' : ''}`}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* 徽章墙 */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold text-[#1e1b4b] mb-4">
          徽章墙
          <span className="text-sm font-normal text-gray-400 ml-2">
            {earnedBadges.length} / {badges.length}
          </span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {badges.map((badge) => {
            const earned = earnedBadges.includes(badge.id);
            return (
              <button
                key={badge.id}
                onClick={() => setSelectedBadge(badge)}
                className={`relative p-4 rounded-xl border-2 transition-all text-left ${
                  earned
                    ? `border-[#f59e0b]/40 bg-[#f59e0b]/5 shadow-[0_0_12px_rgba(245,158,11,0.15)] hover:shadow-[0_0_20px_rgba(245,158,11,0.25)] animate-badge-glow`
                    : 'border-gray-100 bg-gray-50/50 opacity-40 hover:opacity-50'
                }`}
              >
                <div className="text-3xl mb-2">{badge.icon}</div>
                <div className={`text-sm font-semibold mb-0.5 ${earned ? 'text-[#1e1b4b]' : 'text-gray-500'}`}>
                  {badge.name}
                </div>
                <div className="text-xs text-gray-400 line-clamp-2">
                  {earned ? badge.description : badge.condition}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 徽章详情弹窗 */}
      {selectedBadge && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          onClick={() => setSelectedBadge(null)}
        >
          <div className="absolute inset-0 bg-black/40" />
          <div
            className="relative bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full mx-4 text-center animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedBadge(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="text-6xl mb-4">{selectedBadge.icon}</div>
            <h3 className="text-xl font-bold text-[#1e1b4b] mb-1">{selectedBadge.name}</h3>
            <p className="text-sm text-gray-500 mb-3">{selectedBadge.description}</p>
            <div
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                earnedBadges.includes(selectedBadge.id)
                  ? 'bg-[#10b981]/10 text-[#10b981]'
                  : 'bg-gray-100 text-gray-400'
              }`}
            >
              {earnedBadges.includes(selectedBadge.id) ? '已获得' : '未获得'}
            </div>
            {!earnedBadges.includes(selectedBadge.id) && (
              <p className="text-xs text-gray-400 mt-3">获得条件：{selectedBadge.condition}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
