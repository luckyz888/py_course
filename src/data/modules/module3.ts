import type { Module } from '../../types';

export const module3: Module = {
  id: 'data-visualization',
  title: '数据可视化',
  description: '学习使用Matplotlib、Seaborn和Plotly创建专业的数据可视化图表，掌握商业报表图表设计原则。',
  icon: '📈',
  order: 3,
  chapters: [
    {
      id: 'ch3-1',
      moduleId: 'data-visualization',
      title: 'Matplotlib基础绘图',
      order: 1,
      lessons: [
        {
          id: 'les3-1-1',
          chapterId: 'ch3-1',
          title: '折线图与柱状图',
          type: 'both',
          content: `## 折线图与柱状图

Matplotlib是Python最基础也最重要的绘图库，几乎所有高级绘图库都基于它构建。掌握Matplotlib是数据可视化的基本功。

### Matplotlib架构

Matplotlib有三层结构：
1. **Backend层**：处理渲染输出（屏幕、文件等）
2. **Artist层**：所有可见元素都是Artist（Figure、Axes、Line2D等）
3. **Scripting层**：pyplot接口，提供MATLAB风格的绘图函数

### 基本绘图流程

\`\`\`python
import matplotlib.pyplot as plt

fig, ax = plt.subplots()  # 创建画布和坐标轴
ax.plot(x, y)             # 绑定数据
ax.set_title('标题')       # 设置标题
plt.show()                # 显示图表
\`\`\`

### 折线图（Line Plot）

折线图用于展示数据随时间或顺序的变化趋势，是最常用的图表类型之一。

**适用场景：**
- 时间序列数据
- 连续数据的趋势变化
- 多组数据的对比趋势

**关键参数：**
- \`color\`：线条颜色
- \`linestyle\` / \`ls\`：线型（'-'、'--'、'-.'、':'）
- \`linewidth\` / \`lw\`：线宽
- \`marker\`：数据点标记（'o'、's'、'^'、'D'）
- \`label\`：图例标签

### 柱状图（Bar Chart）

柱状图用于比较不同类别之间的数值大小。

**适用场景：**
- 分类数据的比较
- 频率/计数展示
- 排名展示

**类型：**
- 垂直柱状图：\`ax.bar()\`
- 水平柱状图：\`ax.barh()\`
- 分组柱状图：多组数据并排显示
- 堆叠柱状图：\`bottom\` 参数`,
          codeExample: `import matplotlib.pyplot as plt
import numpy as np

# 折线图
months = ['1月', '2月', '3月', '4月', '5月', '6月']
sales_A = [120, 135, 148, 160, 175, 190]
sales_B = [100, 110, 125, 138, 150, 165]

fig, ax = plt.subplots(figsize=(10, 5))
ax.plot(months, sales_A, color='#2196F3', marker='o', linewidth=2,
        label='产品A', markersize=8)
ax.plot(months, sales_B, color='#FF5722', marker='s', linewidth=2,
        label='产品B', markersize=8)

ax.set_title('月度销售趋势', fontsize=16, fontweight='bold')
ax.set_xlabel('月份', fontsize=12)
ax.set_ylabel('销售额（万元）', fontsize=12)
ax.legend(fontsize=12)
ax.grid(True, alpha=0.3)
plt.tight_layout()
plt.savefig('line_chart.png', dpi=150)
plt.show()

# 柱状图
categories = ['食品', '服装', '电子', '家居', '美妆']
values_2023 = [350, 280, 420, 190, 310]
values_2024 = [380, 310, 450, 220, 350]

fig, ax = plt.subplots(figsize=(10, 5))
x = np.arange(len(categories))
width = 0.35

bars1 = ax.bar(x - width/2, values_2023, width, label='2023年',
               color='#42A5F5', edgecolor='white')
bars2 = ax.bar(x + width/2, values_2024, width, label='2024年',
               color='#EF5350', edgecolor='white')

ax.set_title('各品类销售额对比', fontsize=16, fontweight='bold')
ax.set_xlabel('品类', fontsize=12)
ax.set_ylabel('销售额（万元）', fontsize=12)
ax.set_xticks(x)
ax.set_xticklabels(categories, fontsize=11)
ax.legend(fontsize=12)

# 在柱子上添加数值标签
for bar in bars1:
    ax.text(bar.get_x() + bar.get_width()/2, bar.get_height() + 5,
            f'{bar.get_height()}', ha='center', va='bottom', fontsize=9)
for bar in bars2:
    ax.text(bar.get_x() + bar.get_width()/2, bar.get_height() + 5,
            f'{bar.get_height()}', ha='center', va='bottom', fontsize=9)

plt.tight_layout()
plt.savefig('bar_chart.png', dpi=150)
plt.show()`,
          exercise: {
            id: 'ex3-1-1',
            lessonId: 'les3-1-1',
            description: '编写一个函数 `plot_comparison(categories, values1, values2, label1, label2, title)`，绘制分组柱状图。要求：1) 两组数据并排显示；2) 包含图例；3) 每个柱子上方显示数值；4) 设置标题和轴标签。返回fig和ax对象。',
            initialCode: `import matplotlib.pyplot as plt
import numpy as np

def plot_comparison(categories, values1, values2, label1, label2, title):
    # 请在此处编写代码
    pass

# 测试
categories = ['Q1', 'Q2', 'Q3', 'Q4']
fig, ax = plot_comparison(categories, [100, 120, 130, 150],
                          [90, 110, 140, 160], '2023', '2024', '季度收入对比')
plt.show()`,
            hints: [
              '使用 ax.bar() 绘制两组柱状图，用 x - width/2 和 x + width/2 控制位置',
              '用 ax.text() 在每个柱子上方添加数值标签'
            ],
            referenceAnswer: `import matplotlib.pyplot as plt
import numpy as np

def plot_comparison(categories, values1, values2, label1, label2, title):
    fig, ax = plt.subplots(figsize=(10, 5))
    x = np.arange(len(categories))
    width = 0.35
    bars1 = ax.bar(x - width/2, values1, width, label=label1, color='#42A5F5')
    bars2 = ax.bar(x + width/2, values2, width, label=label2, color='#EF5350')
    ax.set_title(title, fontsize=16, fontweight='bold')
    ax.set_xticks(x)
    ax.set_xticklabels(categories)
    ax.legend()
    for bar in bars1:
        ax.text(bar.get_x() + bar.get_width()/2, bar.get_height(),
                f'{bar.get_height()}', ha='center', va='bottom', fontsize=9)
    for bar in bars2:
        ax.text(bar.get_x() + bar.get_width()/2, bar.get_height(),
                f'{bar.get_height()}', ha='center', va='bottom', fontsize=9)
    return fig, ax`,
            testCases: [
              { input: 'fig, ax = plot_comparison(["A","B"], [10,20], [15,25], "X", "Y", "Test"); print(type(ax).__name__)', expectedOutput: 'Axes' }
            ]
          }
        },
        {
          id: 'les3-1-2',
          chapterId: 'ch3-1',
          title: '散点图与子图',
          type: 'both',
          content: `## 散点图与子图

### 散点图（Scatter Plot）

散点图用于展示两个数值变量之间的关系，是探索性数据分析中最常用的图表类型之一。

**适用场景：**
- 两个连续变量之间的关系
- 发现数据中的模式、趋势和异常值
- 相关性可视化

**关键参数：**
- \`s\`：点的大小（可以是标量或数组）
- \`c\`：点的颜色（可以是标量、数组或颜色列表）
- \`alpha\`：透明度（0-1）
- \`cmap\`：颜色映射（当c为数组时）
- \`marker\`：标记样式

**高级用法：**
- 气泡图：用点的大小表示第三个变量
- 颜色编码：用颜色表示分类变量
- 添加趋势线：用numpy拟合后绘制

### 子图（Subplots）

子图允许在一个画布中绘制多个图表，便于对比展示。

**创建方式：**
1. \`plt.subplots(nrows, ncols)\`：创建规则网格
2. \`plt.subplot(nrows, ncols, index)\`：逐个添加
3. \`GridSpec\`：创建不规则布局
4. \`subplot_mosaic\`：用文字布局（新版本）

**子图调整：**
- \`fig.tight_layout()\`：自动调整间距
- \`plt.subplots_adjust()\`：手动调整间距
- \`fig.suptitle()\`：添加总标题`,
          codeExample: `import matplotlib.pyplot as plt
import numpy as np

# 散点图
np.random.seed(42)
n = 100
ad_spend = np.random.uniform(10, 100, n)
sales = ad_spend * 2.5 + np.random.normal(0, 20, n)
categories = np.random.choice(['A', 'B', 'C'], n)

fig, ax = plt.subplots(figsize=(8, 6))
colors = {'A': '#2196F3', 'B': '#FF5722', 'C': '#4CAF50'}
for cat in ['A', 'B', 'C']:
    mask = categories == cat
    ax.scatter(ad_spend[mask], sales[mask], c=colors[cat],
               label=f'产品{cat}', alpha=0.7, s=60, edgecolors='white')

# 添加趋势线
z = np.polyfit(ad_spend, sales, 1)
p = np.poly1d(z)
x_line = np.linspace(10, 100, 100)
ax.plot(x_line, p(x_line), '--', color='gray', alpha=0.8, label='趋势线')

ax.set_title('广告投入与销售额关系', fontsize=16, fontweight='bold')
ax.set_xlabel('广告投入（万元）', fontsize=12)
ax.set_ylabel('销售额（万元）', fontsize=12)
ax.legend(fontsize=11)
ax.grid(True, alpha=0.3)
plt.tight_layout()
plt.show()

# 子图布局
fig, axes = plt.subplots(2, 2, figsize=(12, 10))

# 折线图
x = np.linspace(0, 2*np.pi, 100)
axes[0, 0].plot(x, np.sin(x), color='#2196F3', linewidth=2)
axes[0, 0].set_title('正弦函数')

# 柱状图
categories = ['A', 'B', 'C', 'D']
values = [23, 45, 56, 78]
axes[0, 1].bar(categories, values, color=['#2196F3', '#FF5722', '#4CAF50', '#FFC107'])
axes[0, 1].set_title('柱状图')

# 散点图
axes[1, 0].scatter(np.random.randn(50), np.random.randn(50),
                   c=np.random.randn(50), cmap='viridis', alpha=0.7)
axes[1, 0].set_title('散点图')

# 直方图
data = np.random.normal(0, 1, 1000)
axes[1, 1].hist(data, bins=30, color='#9C27B0', alpha=0.7, edgecolor='white')
axes[1, 1].set_title('直方图')

fig.suptitle('多图表展示', fontsize=18, fontweight='bold')
fig.tight_layout()
plt.show()`,
          exercise: {
            id: 'ex3-1-2',
            lessonId: 'les3-1-2',
            description: '编写一个函数 `plot_scatter_with_trend(x, y, title, xlabel, ylabel)`，绘制散点图并添加线性趋势线。要求：1) 散点图使用蓝色半透明点；2) 趋势线使用红色虚线；3) 在图上显示R²值（决定系数）；4) 设置标题和轴标签。',
            initialCode: `import matplotlib.pyplot as plt
import numpy as np

def plot_scatter_with_trend(x, y, title, xlabel, ylabel):
    # 请在此处编写代码
    pass

# 测试
np.random.seed(42)
x = np.random.uniform(0, 100, 50)
y = 2 * x + 10 + np.random.normal(0, 20, 50)
fig, ax = plot_scatter_with_trend(x, y, '广告与销售', '广告投入', '销售额')
plt.show()`,
            hints: [
              '用 np.polyfit(x, y, 1) 拟合线性趋势线，用 np.poly1d 生成函数',
              'R² = 1 - SS_res / SS_tot，其中 SS_res = sum((y - y_pred)²)，SS_tot = sum((y - y_mean)²)'
            ],
            referenceAnswer: `import matplotlib.pyplot as plt
import numpy as np

def plot_scatter_with_trend(x, y, title, xlabel, ylabel):
    fig, ax = plt.subplots(figsize=(8, 6))
    ax.scatter(x, y, c='#2196F3', alpha=0.6, s=50, edgecolors='white')
    z = np.polyfit(x, y, 1)
    p = np.poly1d(z)
    x_line = np.linspace(x.min(), x.max(), 100)
    ax.plot(x_line, p(x_line), '--', color='red', linewidth=2, label='趋势线')
    y_pred = p(x)
    ss_res = np.sum((y - y_pred) ** 2)
    ss_tot = np.sum((y - np.mean(y)) ** 2)
    r_squared = 1 - ss_res / ss_tot
    ax.text(0.05, 0.95, f'R² = {r_squared:.4f}', transform=ax.transAxes,
            fontsize=12, verticalalignment='top',
            bbox=dict(boxstyle='round', facecolor='wheat', alpha=0.5))
    ax.set_title(title, fontsize=16, fontweight='bold')
    ax.set_xlabel(xlabel, fontsize=12)
    ax.set_ylabel(ylabel, fontsize=12)
    ax.legend()
    ax.grid(True, alpha=0.3)
    return fig, ax`,
            testCases: [
              { input: 'np.random.seed(42); x = np.array([1,2,3,4,5]); y = np.array([2,4,6,8,10]); fig, ax = plot_scatter_with_trend(x, y, "Test", "X", "Y"); print(type(ax).__name__)', expectedOutput: 'Axes' }
            ]
          }
        }
      ]
    },
    {
      id: 'ch3-2',
      moduleId: 'data-visualization',
      title: 'Seaborn高级可视化',
      order: 2,
      lessons: [
        {
          id: 'les3-2-1',
          chapterId: 'ch3-2',
          title: '分布图与热力图',
          type: 'both',
          content: `## 分布图与热力图

Seaborn是基于Matplotlib的高级可视化库，提供了更美观的默认样式和更简洁的API，特别适合统计图表的绘制。

### Seaborn优势

- 更美观的默认样式和配色方案
- 内置主题：darkgrid、whitegrid、dark、white、ticks
- 与Pandas DataFrame深度集成
- 简化的统计图表API
- 自动处理图例和标注

### 分布图

分布图用于展示数据的分布特征，是探索性数据分析的重要工具。

**常用分布图函数：**
- \`sns.histplot()\`：直方图（推荐，替代distplot）
- \`sns.kdeplot()\`：核密度估计图
- \`sns.ecdfplot()\`：经验累积分布函数
- \`sns.rugplot()\`：地毯图（边际分布）
- \`sns.displot()\`：Figure级分布图（支持多子图）
- \`sns.boxplot()\`：箱线图
- \`sns.violinplot()\`：小提琴图

### 热力图（Heatmap）

热力图用颜色深浅表示数值大小，常用于：
- 相关性矩阵可视化
- 透视表数据展示
- 混淆矩阵展示

**关键参数：**
- \`annot=True\`：在格子中显示数值
- \`fmt\`：数值格式（如'.2f'）
- \`cmap\`：颜色映射
- \`center\`：颜色中心值
- \`vmin/vmax\`：颜色范围`,
          codeExample: `import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd
import numpy as np

# 设置主题
sns.set_theme(style='whitegrid')

# 生成示例数据
np.random.seed(42)
n = 200
df = pd.DataFrame({
    '年龄': np.random.normal(35, 10, n),
    '收入': np.random.normal(8000, 3000, n),
    '消费': np.random.normal(5000, 2000, n),
    '性别': np.random.choice(['男', '女'], n),
    '城市': np.random.choice(['北京', '上海', '广州'], n)
})

# 直方图 + KDE
fig, axes = plt.subplots(1, 2, figsize=(12, 5))
sns.histplot(data=df, x='收入', kde=True, ax=axes[0], color='#2196F3')
axes[0].set_title('收入分布', fontsize=14)

# 分组直方图
sns.histplot(data=df, x='收入', hue='性别', multiple='stack',
             ax=axes[1], palette='Set2')
axes[1].set_title('收入分布（按性别）', fontsize=14)
plt.tight_layout()
plt.show()

# 箱线图与小提琴图
fig, axes = plt.subplots(1, 2, figsize=(12, 5))
sns.boxplot(data=df, x='城市', y='收入', ax=axes[0], palette='Set3')
axes[0].set_title('各城市收入箱线图', fontsize=14)

sns.violinplot(data=df, x='城市', y='收入', hue='性别',
               split=True, ax=axes[1], palette='Set2')
axes[1].set_title('各城市收入小提琴图', fontsize=14)
plt.tight_layout()
plt.show()

# 相关性热力图
corr = df[['年龄', '收入', '消费']].corr()
fig, ax = plt.subplots(figsize=(8, 6))
sns.heatmap(corr, annot=True, fmt='.2f', cmap='RdBu_r',
            center=0, square=True, ax=ax,
            linewidths=0.5, cbar_kws={'shrink': 0.8})
ax.set_title('变量相关性热力图', fontsize=16)
plt.tight_layout()
plt.show()`,
          exercise: {
            id: 'ex3-2-1',
            lessonId: 'les3-2-1',
            description: '编写一个函数 `plot_correlation_heatmap(df, columns, title)`，绘制指定列的相关性热力图。要求：1) 使用Seaborn的heatmap；2) 显示相关系数数值（保留2位小数）；3) 使用RdBu_r配色；4) 设置标题。',
            initialCode: `import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd
import numpy as np

def plot_correlation_heatmap(df, columns, title):
    # 请在此处编写代码
    pass

# 测试
np.random.seed(42)
df = pd.DataFrame({
    'A': np.random.randn(100),
    'B': np.random.randn(100),
    'C': np.random.randn(100),
    'D': np.random.randn(100)
})
fig, ax = plot_correlation_heatmap(df, ['A', 'B', 'C', 'D'], '相关性分析')
plt.show()`,
            hints: [
              '用 df[columns].corr() 计算相关矩阵',
              '用 sns.heatmap() 绘制，设置 annot=True, fmt=".2f", cmap="RdBu_r"'
            ],
            referenceAnswer: `import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd
import numpy as np

def plot_correlation_heatmap(df, columns, title):
    corr = df[columns].corr()
    fig, ax = plt.subplots(figsize=(8, 6))
    sns.heatmap(corr, annot=True, fmt='.2f', cmap='RdBu_r',
                center=0, square=True, ax=ax,
                linewidths=0.5, cbar_kws={'shrink': 0.8})
    ax.set_title(title, fontsize=16)
    return fig, ax`,
            testCases: [
              { input: 'np.random.seed(42); df = pd.DataFrame({"A": [1,2,3], "B": [3,2,1]}); fig, ax = plot_correlation_heatmap(df, ["A", "B"], "Test"); print(type(ax).__name__)', expectedOutput: 'Axes' }
            ]
          }
        }
      ]
    },
    {
      id: 'ch3-3',
      moduleId: 'data-visualization',
      title: '交互式图表',
      order: 3,
      lessons: [
        {
          id: 'les3-3-1',
          chapterId: 'ch3-3',
          title: 'Plotly基础与交互功能',
          type: 'both',
          content: `## Plotly基础与交互功能

Plotly是一个强大的交互式可视化库，创建的图表支持缩放、平移、悬停提示等交互操作，非常适合数据探索和Web展示。

### Plotly Express

Plotly Express是Plotly的高级API，类似于Seaborn，提供简洁的函数接口：

\`\`\`python
import plotly.express as px
fig = px.scatter(df, x='col1', y='col2', color='category')
fig.show()
\`\`\`

### 常用图表函数

| 函数 | 图表类型 | 说明 |
|------|----------|------|
| px.line() | 折线图 | 趋势展示 |
| px.bar() | 柱状图 | 分类比较 |
| px.scatter() | 散点图 | 关系探索 |
| px.histogram() | 直方图 | 分布展示 |
| px.box() | 箱线图 | 分布比较 |
| px.pie() | 饼图 | 占比展示 |
| px.sunburst() | 旭日图 | 层级占比 |
| px.treemap() | 树图 | 层级占比 |
| px.choropleth() | 地图 | 地理数据 |
| px.imshow() | 热力图 | 矩阵数据 |

### 交互功能

Plotly图表内置的交互功能：
- **缩放**：鼠标滚轮或框选
- **平移**：拖拽
- **悬停提示**：鼠标悬停显示数据详情
- **图例交互**：点击图例显示/隐藏数据系列
- **导出**：工具栏中的相机图标可导出PNG

### 自定义交互

- \`hover_data\`：指定悬停显示的额外数据
- \`hover_name\`：悬停提示的标题字段
- \`animation_frame\`：添加动画帧
- \`facet_row/col\`：分面展示

### 导出

- \`fig.show()\`：在浏览器中显示
- \`fig.write_html()\`：导出为HTML文件
- \`fig.write_image()\`：导出为图片（需要kaleido）`,
          codeExample: `import plotly.express as px
import plotly.graph_objects as go
import pandas as pd
import numpy as np

# 内置数据集
df = px.data.gapminder()
china = df[df['country'] == 'China']

# 折线图
fig = px.line(china, x='year', y='gdpPercap',
              title='中国人均GDP变化',
              labels={'year': '年份', 'gdpPercap': '人均GDP'},
              markers=True)
fig.update_layout(title_font_size=20)
fig.show()

# 散点图（带动画）
fig = px.scatter(df.query("year == 2007"),
                 x='gdpPercap', y='lifeExp',
                 size='pop', color='continent',
                 hover_name='country',
                 log_x=True, size_max=60,
                 title='2007年各国GDP与寿命')
fig.show()

# 柱状图
fig = px.bar(china, x='year', y='pop',
             title='中国人口变化',
             labels={'year': '年份', 'pop': '人口'})
fig.show()

# 使用graph_objects创建更复杂的图表
fig = go.Figure()
fig.add_trace(go.Scatter(
    x=china['year'], y=china['lifeExp'],
    mode='lines+markers',
    name='预期寿命',
    line=dict(color='#2196F3', width=3),
    marker=dict(size=8)
))
fig.add_trace(go.Scatter(
    x=china['year'], y=china['gdpPercap']/1000,
    mode='lines+markers',
    name='人均GDP(千美元)',
    line=dict(color='#FF5722', width=3),
    marker=dict(size=8),
    yaxis='y2'
))
fig.update_layout(
    title='中国发展指标',
    yaxis=dict(title='预期寿命（岁）'),
    yaxis2=dict(title='人均GDP（千美元）', overlaying='y', side='right'),
    hovermode='x unified'
)
fig.show()`,
          exercise: {
            id: 'ex3-3-1',
            lessonId: 'les3-3-1',
            description: '编写一个函数 `create_interactive_scatter(df, x_col, y_col, size_col, color_col, title)`，使用Plotly Express创建交互式散点图。要求：1) 点的大小由size_col决定；2) 颜色由color_col决定；3) 悬停显示所有列信息；4) 设置标题。',
            initialCode: `import plotly.express as px
import pandas as pd
import numpy as np

def create_interactive_scatter(df, x_col, y_col, size_col, color_col, title):
    # 请在此处编写代码
    pass

# 测试
np.random.seed(42)
df = pd.DataFrame({
    'x': np.random.randn(50),
    'y': np.random.randn(50),
    'size': np.random.uniform(10, 100, 50),
    'category': np.random.choice(['A', 'B', 'C'], 50)
})
fig = create_interactive_scatter(df, 'x', 'y', 'size', 'category', '交互式散点图')
fig.show()`,
            hints: [
              '使用 px.scatter()，设置 x, y, size, color, hover_data 参数',
              'hover_data 可以设为 df.columns.tolist() 显示所有列'
            ],
            referenceAnswer: `import plotly.express as px
import pandas as pd
import numpy as np

def create_interactive_scatter(df, x_col, y_col, size_col, color_col, title):
    fig = px.scatter(df, x=x_col, y=y_col, size=size_col,
                     color=color_col, hover_data=df.columns.tolist(),
                     title=title)
    return fig`,
            testCases: [
              { input: 'np.random.seed(42); df = pd.DataFrame({"x": [1,2], "y": [3,4], "size": [10,20], "cat": ["A","B"]}); fig = create_interactive_scatter(df, "x", "y", "size", "cat", "Test"); print(type(fig).__name__)', expectedOutput: 'Figure' }
            ]
          }
        }
      ]
    },
    {
      id: 'ch3-4',
      moduleId: 'data-visualization',
      title: '商业报表图表设计',
      order: 4,
      lessons: [
        {
          id: 'les3-4-1',
          chapterId: 'ch3-4',
          title: '配色、标注与布局设计',
          type: 'both',
          content: `## 配色、标注与布局设计

商业报表中的图表不仅需要准确传达数据，还需要美观专业，让读者一目了然。本节介绍商业图表设计的核心原则和技巧。

### 配色原则

**1. 品牌一致性**
- 使用公司品牌色系
- 保持图表间配色一致
- 主色不超过3种

**2. 数据驱动配色**
- 分类数据：使用对比色（如Set2、Paired）
- 顺序数据：使用渐变色（如Blues、OrRd）
- 发散数据：使用双色渐变（如RdBu、RdYlGn）

**3. 可访问性**
- 避免仅依赖颜色区分（添加形状/纹理）
- 选择色盲友好的配色方案
- 确保足够的对比度

### 标注原则

**1. 标题**
- 主标题：简洁描述图表核心信息
- 副标题：补充说明数据来源或时间范围

**2. 数据标签**
- 关键数据点添加标签
- 避免标签重叠
- 标签字体小于标题

**3. 注释**
- 用箭头指向关键数据点
- 解释异常值或重要趋势
- 保持简洁

### 布局原则

**1. 数据墨水比**
- 最大化数据展示的"墨水"
- 减少非数据元素（网格线、边框等）
- 删除3D效果、渐变背景等装饰

**2. 留白**
- 图表元素间保持适当间距
- 避免拥挤
- tight_layout()自动调整

**3. 对齐与层次**
- 所有元素对齐
- 重要信息突出显示
- 建立视觉层次

### 导出规范

- 分辨率：打印300dpi，屏幕150dpi
- 格式：矢量图（SVG/PDF）或位图（PNG）
- 尺寸：根据使用场景调整`,
          codeExample: `import matplotlib.pyplot as plt
import matplotlib.patches as patches
import numpy as np

# 专业商业图表模板
plt.rcParams.update({
    'font.family': 'sans-serif',
    'axes.spines.top': False,
    'axes.spines.right': False,
    'figure.facecolor': 'white',
    'axes.facecolor': 'white',
    'axes.grid': True,
    'grid.alpha': 0.3,
    'grid.linestyle': '--',
})

# 品牌配色方案
BRAND_COLORS = {
    'primary': '#1A73E8',
    'secondary': '#EA4335',
    'accent1': '#34A853',
    'accent2': '#FBBC04',
    'gray': '#5F6368',
    'light_gray': '#DADCE0',
}

# 创建专业报表图表
fig, ax = plt.subplots(figsize=(12, 6))

months = ['1月', '2月', '3月', '4月', '5月', '6月']
revenue = [120, 135, 128, 145, 160, 175]
target = [130, 130, 135, 140, 145, 150]

# 绘制数据
ax.plot(months, revenue, color=BRAND_COLORS['primary'],
        linewidth=3, marker='o', markersize=8, label='实际收入', zorder=3)
ax.plot(months, target, color=BRAND_COLORS['light_gray'],
        linewidth=2, linestyle='--', marker='s', markersize=6, label='目标收入')

# 填充区域
ax.fill_between(months, revenue, target,
                where=[r >= t for r, t in zip(revenue, target)],
                alpha=0.15, color=BRAND_COLORS['accent1'], label='超额完成')
ax.fill_between(months, revenue, target,
                where=[r < t for r, t in zip(revenue, target)],
                alpha=0.15, color=BRAND_COLORS['secondary'], label='未达标')

# 标注关键数据点
max_idx = np.argmax(revenue)
ax.annotate(f'最高: {revenue[max_idx]}万',
            xy=(months[max_idx], revenue[max_idx]),
            xytext=(20, 20), textcoords='offset points',
            fontsize=11, fontweight='bold',
            color=BRAND_COLORS['primary'],
            arrowprops=dict(arrowstyle='->', color=BRAND_COLORS['primary']))

# 样式设置
ax.set_title('月度收入达成分析', fontsize=18, fontweight='bold',
             pad=20, color=BRAND_COLORS['gray'])
ax.set_ylabel('收入（万元）', fontsize=12, color=BRAND_COLORS['gray'])
ax.legend(loc='upper left', frameon=True, framealpha=0.9)

# Y轴范围
ax.set_ylim(100, 190)

plt.tight_layout()
plt.savefig('business_chart.png', dpi=300, bbox_inches='tight')
plt.show()`,
          exercise: {
            id: 'ex3-4-1',
            lessonId: 'les3-4-1',
            description: '编写一个函数 `create_business_chart(data, title, subtitle)`，创建专业的商业报表折线图。data是字典，键为系列名称，值为(x列表, y列表)元组。要求：1) 使用专业配色；2) 删除上和右边框；3) 添加网格线；4) 标注每个系列的最大值点；5) 包含标题和副标题。',
            initialCode: `import matplotlib.pyplot as plt
import numpy as np

def create_business_chart(data, title, subtitle=''):
    # 请在此处编写代码
    pass

# 测试
data = {
    '实际': (['Q1', 'Q2', 'Q3', 'Q4'], [100, 120, 135, 150]),
    '目标': (['Q1', 'Q2', 'Q3', 'Q4'], [110, 115, 130, 145])
}
fig, ax = create_business_chart(data, '季度业绩分析', '2024年度')
plt.show()`,
            hints: [
              '使用 ax.spines["top"].set_visible(False) 和 ax.spines["right"].set_visible(False) 删除边框',
              '用 ax.annotate() 标注最大值点，用 fig.suptitle() 和 ax.set_title() 分别设置主标题和副标题'
            ],
            referenceAnswer: `import matplotlib.pyplot as plt
import numpy as np

def create_business_chart(data, title, subtitle=''):
    colors = ['#1A73E8', '#EA4335', '#34A853', '#FBBC04', '#5F6368']
    fig, ax = plt.subplots(figsize=(10, 6))
    ax.spines['top'].set_visible(False)
    ax.spines['right'].set_visible(False)
    ax.grid(True, alpha=0.3, linestyle='--')
    for i, (name, (x, y)) in enumerate(data.items()):
        color = colors[i % len(colors)]
        ax.plot(x, y, color=color, linewidth=2.5, marker='o',
                markersize=7, label=name, zorder=3)
        max_idx = np.argmax(y)
        ax.annotate(f'{y[max_idx]}', xy=(x[max_idx], y[max_idx]),
                    xytext=(0, 15), textcoords='offset points',
                    fontsize=10, fontweight='bold', color=color,
                    ha='center')
    fig.suptitle(title, fontsize=18, fontweight='bold', y=0.98)
    if subtitle:
        ax.set_title(subtitle, fontsize=12, color='gray', pad=10)
    ax.legend(loc='upper left', frameon=True, framealpha=0.9)
    plt.tight_layout()
    return fig, ax`,
            testCases: [
              { input: "data = {'A': (['X','Y'], [1,3])}; fig, ax = create_business_chart(data, 'Test', 'Sub'); print(type(ax).__name__)", expectedOutput: 'Axes' }
            ]
          }
        }
      ]
    }
  ]
};
