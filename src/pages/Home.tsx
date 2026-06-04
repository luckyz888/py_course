import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Trophy, PlayCircle, Flame, CheckCircle2, ArrowRight, Sparkles, Code2, Zap } from 'lucide-react';

const stats = [
  { value: 6, label: '课程模块', suffix: '' },
  { value: 29, label: '章节', suffix: '' },
  { value: 100, label: '知识点', suffix: '+' },
  { value: 50, label: '练习题', suffix: '+' },
];

const modules = [
  { id: 'm1', name: 'Python基础', progress: 0 },
  { id: 'm2', name: '数据处理与分析', progress: 0 },
  { id: 'm3', name: '数据可视化', progress: 0 },
  { id: 'm4', name: '统计分析方法', progress: 0 },
  { id: 'm5', name: '商业智能应用', progress: 0 },
  { id: 'm6', name: '综合实战项目', progress: 0 },
];

function AnimatedNumber({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1500;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export default function Home() {
  const streakDays = 0;
  const todayChecked = false;
  const allZeroProgress = modules.every((m) => m.progress === 0);

  return (
    <div className="space-y-8 animate-slide-up">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1e1b4b] to-[#3730a3] text-white px-6 py-10 sm:px-8 sm:py-12 md:px-12 md:py-16">
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-[#f59e0b]/15 blur-3xl" />
          <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-[#10b981]/15 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
          {/* Geometric decorations */}
          <div className="absolute top-8 right-8 w-20 h-20 border border-white/10 rounded-lg rotate-12 md:w-32 md:h-32" />
          <div className="absolute bottom-12 right-24 w-12 h-12 border border-white/10 rounded-full md:w-16 md:h-16" />
          <div className="absolute top-16 left-1/3 w-6 h-6 bg-[#f59e0b]/20 rounded rotate-45" />
          <div className="absolute bottom-8 left-1/4 w-4 h-4 bg-[#10b981]/20 rounded-full" />
        </div>
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-3xl md:text-4xl font-bold leading-tight">
            商务数据分析
            <br />
            在线教育平台
          </h1>
          <p className="mt-4 text-lg text-white/80">
            从Python基础到商业智能，系统掌握数据分析核心技能，助力你的职业发展
          </p>
          <Link
            to="/courses"
            className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-[#f59e0b] text-[#1e1b4b] font-bold rounded-xl hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#f59e0b]/30 transition-all duration-200"
          >
            开始学习
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 stagger-children">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl p-5 text-center shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
          >
            <div className="text-3xl font-bold text-[#1e1b4b]">
              <AnimatedNumber target={stat.value} suffix={stat.suffix} />
            </div>
            <div className="mt-1 text-sm text-gray-500">{stat.label}</div>
          </div>
        ))}
      </section>

      {/* Learning Progress */}
      <section className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 animate-fade-in">
        <h2 className="text-lg font-bold text-[#1e1b4b] mb-4">学习进度概览</h2>
        {allZeroProgress ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <div className="w-16 h-16 rounded-full bg-[#f59e0b]/10 flex items-center justify-center mb-4">
              <Sparkles className="w-8 h-8 text-[#f59e0b]" />
            </div>
            <p className="text-[#1e1b4b] font-semibold text-lg mb-1">开始你的学习之旅吧！</p>
            <p className="text-sm text-gray-400 mb-4">完成知识点学习后，进度将在这里显示</p>
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#f59e0b] text-white rounded-lg font-medium hover:bg-[#d97706] transition-colors"
            >
              <BookOpen className="w-4 h-4" />
              前往课程中心
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {modules.map((mod) => (
              <div key={mod.id} className="flex items-center gap-4">
                <span className="w-32 text-sm text-gray-700 shrink-0">{mod.name}</span>
                <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#10b981] rounded-full transition-all duration-500"
                    style={{ width: `${mod.progress}%` }}
                  />
                </div>
                <span className="w-12 text-sm text-gray-500 text-right">{mod.progress}%</span>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Quick Entry Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 stagger-children">
        <Link
          to="/courses/m1"
          className="group flex items-center gap-4 bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:-translate-y-1 hover:shadow-lg transition-all duration-200"
        >
          <div className="w-12 h-12 rounded-xl bg-[#f59e0b]/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-200">
            <PlayCircle className="w-6 h-6 text-[#f59e0b]" />
          </div>
          <div>
            <div className="font-bold text-[#1e1b4b]">继续学习</div>
            <div className="text-sm text-gray-500">从上次的位置继续</div>
          </div>
        </Link>

        <Link
          to="/courses"
          className="group flex items-center gap-4 bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:-translate-y-1 hover:shadow-lg transition-all duration-200"
        >
          <div className="w-12 h-12 rounded-xl bg-[#1e1b4b]/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-200">
            <BookOpen className="w-6 h-6 text-[#1e1b4b]" />
          </div>
          <div>
            <div className="font-bold text-[#1e1b4b]">课程中心</div>
            <div className="text-sm text-gray-500">浏览所有课程模块</div>
          </div>
        </Link>

        <Link
          to="/achievements"
          className="group flex items-center gap-4 bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:-translate-y-1 hover:shadow-lg transition-all duration-200"
        >
          <div className="w-12 h-12 rounded-xl bg-[#10b981]/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-200">
            <Trophy className="w-6 h-6 text-[#10b981]" />
          </div>
          <div>
            <div className="font-bold text-[#1e1b4b]">成就中心</div>
            <div className="text-sm text-gray-500">查看学习成就</div>
          </div>
        </Link>
      </section>

      {/* Pandas 实战训练营入口 */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1e1b4b] via-[#312e81] to-[#4338ca] text-white p-6 sm:p-8 animate-fade-in">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-[#f59e0b]/20 blur-2xl" />
          <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-[#10b981]/15 blur-2xl" />
          <div className="absolute top-4 right-16 text-6xl opacity-10 font-mono font-black">PD</div>
        </div>
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-5 h-5 text-[#f59e0b]" />
              <span className="text-sm font-medium text-[#f59e0b]">实战训练营</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Pandas 数据分析实战训练营</h2>
            <p className="text-white/70 mb-4">
              10个真实项目，从数据清洗到商业分析，AI教练全程陪练，边学边练快速提升
            </p>
            <div className="flex flex-wrap gap-3 mb-4">
              <span className="px-3 py-1 bg-white/10 rounded-full text-sm">10个梯度项目</span>
              <span className="px-3 py-1 bg-white/10 rounded-full text-sm">真实数据集</span>
              <span className="px-3 py-1 bg-white/10 rounded-full text-sm">AI 陪练教练</span>
              <span className="px-3 py-1 bg-white/10 rounded-full text-sm">浏览器内运行</span>
            </div>
            <Link
              to="/bootcamp"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#f59e0b] text-[#1e1b4b] font-bold rounded-xl hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#f59e0b]/30 transition-all duration-200"
            >
              <Code2 className="w-5 h-5" />
              进入训练营
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3 shrink-0">
            <div className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm">
              <div className="text-2xl font-bold">10</div>
              <div className="text-xs text-white/60">实战项目</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm">
              <div className="text-2xl font-bold">50</div>
              <div className="text-xs text-white/60">练习任务</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm">
              <div className="text-2xl font-bold">4</div>
              <div className="text-xs text-white/60">难度级别</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm">
              <div className="text-2xl font-bold">AI</div>
              <div className="text-xs text-white/60">教练陪练</div>
            </div>
          </div>
        </div>
      </section>

      {/* Streak Section */}
      <section className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 animate-fade-in">
        <h2 className="text-lg font-bold text-[#1e1b4b] mb-4">连续学习打卡</h2>
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-xl bg-[#f59e0b]/10 flex items-center justify-center">
              <Flame className="w-7 h-7 text-[#f59e0b]" />
            </div>
            <div>
              <div className="text-2xl font-bold text-[#1e1b4b]">{streakDays} 天</div>
              <div className="text-sm text-gray-500">连续学习</div>
            </div>
          </div>
          <div className="h-10 w-px bg-gray-200" />
          <div className="flex items-center gap-3">
            <div
              className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                todayChecked ? 'bg-[#10b981]/10' : 'bg-gray-100'
              }`}
            >
              <CheckCircle2
                className={`w-7 h-7 ${todayChecked ? 'text-[#10b981]' : 'text-gray-300'}`}
              />
            </div>
            <div>
              <div className={`text-lg font-bold ${todayChecked ? 'text-[#10b981]' : 'text-gray-400'}`}>
                {todayChecked ? '已打卡' : '未打卡'}
              </div>
              <div className="text-sm text-gray-500">今日状态</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
