# Tasks

- [x] Task 1: 项目初始化与基础架构搭建
  - [x] 1.1 使用 Vite + React + TypeScript 初始化项目
  - [x] 1.2 安装核心依赖：React Router、TailwindCSS、Zustand（状态管理）、Monaco Editor（代码编辑器）
  - [x] 1.3 配置项目结构：pages、components、stores、data、utils、types 目录
  - [x] 1.4 配置 TailwindCSS 和全局样式
  - [x] 1.5 配置 Vite 构建：代码分割、Pyodide 外部化、SPA fallback

- [x] Task 2: 课程数据模型与内容编写
  - [x] 2.1 定义课程数据 TypeScript 类型（Module、Chapter、Lesson、Exercise、Quiz）
  - [x] 2.2 编写模块1课程内容：Python编程基础（6个章节）
  - [x] 2.3 编写模块2课程内容：数据处理与分析（5个章节）
  - [x] 2.4 编写模块3课程内容：数据可视化（4个章节）
  - [x] 2.5 编写模块4课程内容：统计分析（5个章节）
  - [x] 2.6 编写模块5课程内容：商务智能与报表（4个章节）
  - [x] 2.7 编写模块6课程内容：数据挖掘与商务实战（5个章节）

- [x] Task 3: 页面路由与布局框架
  - [x] 3.1 配置 React Router 路由：首页、课程列表、课程详情、知识点学习、练习、测评、成就中心、个人中心
  - [x] 3.2 实现全局布局：顶部导航栏、侧边栏、主内容区
  - [x] 3.3 实现首页：平台介绍、学习进度概览、快速入口

- [x] Task 4: 课程浏览与学习模块
  - [x] 4.1 实现课程列表页：6大模块卡片展示，显示进度
  - [x] 4.2 实现课程详情页：章节目录、知识点列表
  - [x] 4.3 实现知识点学习页：理论讲解区域 + 代码示例区域
  - [x] 4.4 实现学习进度追踪：标记已学知识点

- [x] Task 5: 互动式编程环境（Pyodide集成）
  - [x] 5.1 集成 Pyodide：CDN 加载、初始化、运行 Python 代码
  - [x] 5.2 集成 Monaco Editor：Python 语法高亮、自动补全
  - [x] 5.3 实现代码运行功能：执行代码、捕获输出、显示错误
  - [x] 5.4 实现图表渲染：拦截 matplotlib 输出并渲染为图片
  - [x] 5.5 实现预置代码模板加载

- [x] Task 6: 练习模块
  - [x] 6.1 实现练习页面：题目描述、代码编辑器、提示按钮、提交按钮
  - [x] 6.2 实现代码自动评判：运行学生代码与预期输出比对
  - [x] 6.3 实现提示系统：渐进式提示
  - [x] 6.4 实现参考答案查看功能
  - [x] 6.5 记录练习完成状态

- [x] Task 7: 测评模块
  - [x] 7.1 实现测评页面：选择题、填空题、编程题混合展示
  - [x] 7.2 实现自动评分：选择题即时评分、编程题运行比对
  - [x] 7.3 实现测评结果页：分数、正确答案、解析
  - [x] 7.4 记录测评历史和最高分

- [x] Task 8: 成就激励系统
  - [x] 8.1 实现积分系统：定义积分规则，积分增减逻辑
  - [x] 8.2 实现徽章系统：定义徽章条件和图标，触发检测
  - [x] 8.3 实现连续学习追踪：每日学习记录、连续天数计算
  - [x] 8.4 实现等级系统：积分-等级映射、等级展示
  - [x] 8.5 实现成就中心页面：徽章墙、积分排行、等级展示
  - [x] 8.6 实现徽章获得通知弹窗

- [x] Task 9: 个人中心与数据持久化
  - [x] 9.1 使用 Zustand + localStorage 实现数据持久化
  - [x] 9.2 实现个人中心页面：学习统计、进度概览、设置
  - [x] 9.3 实现数据导出/导入功能（JSON格式）

- [x] Task 10: UI优化与响应式适配
  - [x] 10.1 优化整体视觉风格：教育主题配色、图标、动效
  - [x] 10.2 适配平板端（768px+）布局
  - [x] 10.3 添加页面过渡动画和加载状态
  - [x] 10.4 优化 Pyodide 加载体验：加载进度提示

- [x] Task 11: Cloudflare Pages 部署配置
  - [x] 11.1 创建 `_redirects` 文件配置 SPA 路由
  - [x] 11.2 优化构建产物：分析包体积、懒加载优化
  - [x] 11.3 编写部署说明文档

# Task Dependencies
- Task 2 depends on Task 1
- Task 3 depends on Task 1
- Task 4 depends on Task 2, Task 3
- Task 5 depends on Task 1
- Task 6 depends on Task 5
- Task 7 depends on Task 5
- Task 8 depends on Task 4, Task 6, Task 7
- Task 9 depends on Task 8
- Task 10 depends on Task 4, Task 5, Task 6, Task 7, Task 8, Task 9
- Task 11 depends on Task 10
