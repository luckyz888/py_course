import type { Module } from '../../types';

export const module5: Module = {
  id: 'business-intelligence',
  title: '商务智能与报表',
  description: '学习Excel数据处理、数据透视分析、商业指标体系构建和自动化报表生成，提升商务数据分析实战能力。',
  icon: '📋',
  order: 5,
  chapters: [
    {
      id: 'ch5-1',
      moduleId: 'business-intelligence',
      title: 'Excel数据处理',
      order: 1,
      lessons: [
        {
          id: 'les5-1-1',
          chapterId: 'ch5-1',
          title: 'openpyxl与pandas读写Excel',
          type: 'both',
          content: `## openpyxl与pandas读写Excel

Excel是商务领域最常用的数据处理工具，Python可以高效地批量处理Excel文件，实现自动化办公。

### openpyxl库

openpyxl是专门用于读写Excel 2010+（.xlsx）文件的Python库，支持：
- 读取和写入Excel文件
- 操作单元格、行、列
- 设置格式（字体、颜色、边框等）
- 创建图表
- 处理公式

**基本操作流程：**
1. 加载工作簿：\`openpyxl.load_workbook()\`
2. 选择工作表：\`wb['Sheet1']\` 或 \`wb.active\`
3. 读写单元格：\`ws['A1']\` 或 \`ws.cell(row, col)\`
4. 保存工作簿：\`wb.save('file.xlsx')\`

### pandas读写Excel

pandas提供了更简洁的Excel读写接口：

**读取：**
- \`pd.read_excel('file.xlsx')\`：读取Excel文件
- \`sheet_name\`：指定工作表
- \`header\`：指定表头行
- \`usecols\`：指定读取列
- \`skiprows\`：跳过行

**写入：**
- \`df.to_excel('file.xlsx')\`：写入Excel文件
- \`ExcelWriter\`：写入多个工作表
- \`startrow/startcol\`：指定起始位置

### 选择建议

- 需要精细控制格式 → openpyxl
- 只需读写数据 → pandas
- 两者可以结合使用：pandas处理数据，openpyxl美化格式`,
          codeExample: `import pandas as pd
import openpyxl
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side

# === pandas 读写 Excel ===

# 创建示例数据
df = pd.DataFrame({
    '产品': ['笔记本电脑', '手机', '平板', '耳机', '键盘'],
    '单价': [5999, 3999, 2999, 599, 299],
    '销量': [120, 350, 200, 500, 800],
    '成本': [4000, 2500, 1800, 200, 100]
})
df['收入'] = df['单价'] * df['销量']
df['利润'] = (df['单价'] - df['成本']) * df['销量']
df['利润率'] = (df['利润'] / df['收入'] * 100).round(2)

# 写入Excel
with pd.ExcelWriter('sales_report.xlsx', engine='openpyxl') as writer:
    df.to_excel(writer, sheet_name='销售数据', index=False)

# 读取Excel
df_read = pd.read_excel('sales_report.xlsx', sheet_name='销售数据')
print("读取的数据:")
print(df_read)

# === openpyxl 美化格式 ===

wb = openpyxl.load_workbook('sales_report.xlsx')
ws = wb['销售数据']

# 设置表头样式
header_font = Font(name='微软雅黑', bold=True, color='FFFFFF', size=11)
header_fill = PatternFill(start_color='2196F3', end_color='2196F3', fill_type='solid')
thin_border = Border(
    left=Side(style='thin'), right=Side(style='thin'),
    top=Side(style='thin'), bottom=Side(style='thin')
)

for cell in ws[1]:
    cell.font = header_font
    cell.fill = header_fill
    cell.alignment = Alignment(horizontal='center', vertical='center')
    cell.border = thin_border

# 设置数据区域格式
for row in ws.iter_rows(min_row=2, max_row=ws.max_row, max_col=ws.max_column):
    for cell in row:
        cell.border = thin_border
        cell.alignment = Alignment(horizontal='center')

# 自动调整列宽
for col in ws.columns:
    max_length = 0
    col_letter = col[0].column_letter
    for cell in col:
        if cell.value:
            max_length = max(max_length, len(str(cell.value)))
    ws.column_dimensions[col_letter].width = max_length + 4

wb.save('sales_report_formatted.xlsx')
print("\\n格式化报表已保存")`,
          exercise: {
            id: 'ex5-1-1',
            lessonId: 'les5-1-1',
            description: '编写一个函数 `create_excel_report(df, filename, sheet_name)`，将DataFrame写入Excel文件并美化格式。要求：1) 表头加粗、蓝色背景、白色字体；2) 所有单元格居中对齐；3) 数值列保留2位小数；4) 自动调整列宽。',
            initialCode: `import pandas as pd
import openpyxl
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side

def create_excel_report(df, filename, sheet_name='Sheet1'):
    # 请在此处编写代码
    pass

# 测试
df = pd.DataFrame({
    '姓名': ['张三', '李四', '王五'],
    '成绩': [85.5, 92.3, 78.8],
    '排名': [2, 1, 3]
})
create_excel_report(df, 'test_report.xlsx', '成绩表')
print("报表已创建")`,
            hints: [
              '先用 df.to_excel 写入，再用 openpyxl.load_workbook 加载并设置格式',
              '遍历表头行设置 Font、PatternFill、Alignment，遍历数据行设置格式'
            ],
            referenceAnswer: `import pandas as pd
import openpyxl
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side

def create_excel_report(df, filename, sheet_name='Sheet1'):
    df.to_excel(filename, sheet_name=sheet_name, index=False)
    wb = openpyxl.load_workbook(filename)
    ws = wb[sheet_name]
    header_font = Font(bold=True, color='FFFFFF', size=11)
    header_fill = PatternFill(start_color='2196F3', end_color='2196F3', fill_type='solid')
    center = Alignment(horizontal='center', vertical='center')
    for cell in ws[1]:
        cell.font = header_font
        cell.fill = header_fill
        cell.alignment = center
    for row in ws.iter_rows(min_row=2, max_row=ws.max_row, max_col=ws.max_column):
        for cell in row:
            cell.alignment = center
            if isinstance(cell.value, float):
                cell.number_format = '0.00'
    for col in ws.columns:
        max_len = max(len(str(c.value or '')) for c in col)
        ws.column_dimensions[col[0].column_letter].width = max_len + 4
    wb.save(filename)`,
            testCases: [
              { input: "df = pd.DataFrame({'A': [1.5], 'B': ['x']}); create_excel_report(df, 'test_report.xlsx'); print('ok')", expectedOutput: 'ok' }
            ]
          }
        }
      ]
    },
    {
      id: 'ch5-2',
      moduleId: 'business-intelligence',
      title: '数据透视分析',
      order: 2,
      lessons: [
        {
          id: 'les5-2-1',
          chapterId: 'ch5-2',
          title: '交叉表与透视表',
          type: 'both',
          content: `## 交叉表与透视表

数据透视分析是从不同维度对数据进行汇总和交叉分析的方法，是商务数据分析的核心技能。

### 交叉表（crosstab）

交叉表用于统计两个或多个分类变量的频数分布，类似于Excel的数据透视表。

\`\`\`python
pd.crosstab(index, columns, values=None, aggfunc=None)
\`\`\`

**关键参数：**
- \`index\`：行分组键
- \`columns\`：列分组键
- \`values\`：聚合的值列
- \`aggfunc\`：聚合函数
- \`margins\`：是否添加行/列合计
- \`normalize\`：归一化（'index'行百分比、'columns'列百分比、'all'总百分比）

### 透视表（pivot_table）

透视表比交叉表更灵活，支持多级索引和多聚合函数。

\`\`\`python
pd.pivot_table(data, values, index, columns, aggfunc)
\`\`\`

**关键参数：**
- \`data\`：DataFrame
- \`values\`：聚合的值列（可以是多列）
- \`index\`：行分组键（可以是多级）
- \`columns\`：列分组键（可以是多级）
- \`aggfunc\`：聚合函数或函数列表
- \`fill_value\`：填充缺失值
- \`margins\`：是否添加合计

### 多维分析

通过多级索引和列分组，可以实现OLAP风格的多维分析：
- **下钻（Drill-down）**：增加维度层级
- **上卷（Roll-up）**：减少维度层级
- **切片（Slice）**：选择某个维度的特定值
- **切块（Dice）**：选择多个维度的特定值范围`,
          codeExample: `import pandas as pd
import numpy as np

# 创建销售数据
np.random.seed(42)
n = 200
df = pd.DataFrame({
    '日期': pd.date_range('2024-01-01', periods=n, freq='D'),
    '地区': np.random.choice(['华东', '华南', '华北', '西南'], n),
    '产品': np.random.choice(['手机', '电脑', '平板'], n),
    '渠道': np.random.choice(['线上', '线下'], n),
    '销售额': np.random.uniform(100, 5000, n).round(2),
    '数量': np.random.randint(1, 20, n)
})
df['月份'] = df['日期'].dt.month

print("原始数据（前5行）:")
print(df.head())

# 交叉表 - 频数统计
print("\\n地区×产品 频数交叉表:")
ct = pd.crosstab(df['地区'], df['产品'], margins=True, margins_name='合计')
print(ct)

# 交叉表 - 百分比
print("\\n行百分比:")
ct_pct = pd.crosstab(df['地区'], df['产品'], normalize='index').round(4) * 100
print(ct_pct)

# 交叉表 - 带聚合值
print("\\n地区×产品 平均销售额:")
ct_val = pd.crosstab(df['地区'], df['产品'],
                      values=df['销售额'], aggfunc='mean').round(2)
print(ct_val)

# 透视表
print("\\n透视表 - 地区×月份 销售额:")
pt = pd.pivot_table(df, values='销售额', index='地区',
                     columns='月份', aggfunc='sum', fill_value=0)
print(pt.round(0))

# 多级透视表
print("\\n多级透视表 - 地区×渠道×产品:")
pt_multi = pd.pivot_table(df, values='销售额',
                           index=['地区', '渠道'],
                           columns='产品',
                           aggfunc=['sum', 'mean'],
                           fill_value=0)
print(pt_multi.round(2))

# 透视表带合计
pt_margin = pd.pivot_table(df, values='销售额', index='地区',
                            columns='产品', aggfunc='sum',
                            margins=True, margins_name='合计',
                            fill_value=0)
print(f"\\n带合计的透视表:")
print(pt_margin.round(0))`,
          exercise: {
            id: 'ex5-2-1',
            lessonId: 'les5-2-1',
            description: '编写一个函数 `create_sales_pivot(df)`，接收销售数据DataFrame（含"地区"、"产品"、"渠道"、"销售额"列），返回一个多级透视表：行为地区和渠道，列为产品，值为销售额的合计和平均值。同时计算每个地区的销售额占比。',
            initialCode: `import pandas as pd
import numpy as np

def create_sales_pivot(df):
    # 请在此处编写代码
    pass

# 测试
np.random.seed(42)
df = pd.DataFrame({
    '地区': np.random.choice(['华东', '华南', '华北'], 100),
    '产品': np.random.choice(['手机', '电脑'], 100),
    '渠道': np.random.choice(['线上', '线下'], 100),
    '销售额': np.random.uniform(100, 5000, 100).round(2)
})
result = create_sales_pivot(df)
print(result)`,
            hints: [
              '用 pd.pivot_table 创建多级透视表，index=["地区","渠道"]，columns="产品"，aggfunc=["sum","mean"]',
              '销售额占比用 groupby("地区")["销售额"].sum() / df["销售额"].sum() 计算'
            ],
            referenceAnswer: `import pandas as pd
import numpy as np

def create_sales_pivot(df):
    pivot = pd.pivot_table(df, values='销售额',
                           index=['地区', '渠道'],
                           columns='产品',
                           aggfunc=['sum', 'mean'],
                           fill_value=0)
    region_pct = df.groupby('地区')['销售额'].sum() / df['销售额'].sum() * 100
    pivot['地区占比(%)'] = pivot.index.get_level_values('地区').map(
        lambda x: round(region_pct.get(x, 0), 2)
    )
    return pivot`,
            testCases: [
              { input: "np.random.seed(42); df = pd.DataFrame({'地区': ['华东','华南'], '产品': ['手机','电脑'], '渠道': ['线上','线下'], '销售额': [1000, 2000]}); result = create_sales_pivot(df); print(type(result).__name__)", expectedOutput: 'DataFrame' }
            ]
          }
        }
      ]
    },
    {
      id: 'ch5-3',
      moduleId: 'business-intelligence',
      title: '商业指标体系',
      order: 3,
      lessons: [
        {
          id: 'les5-3-1',
          chapterId: 'ch5-3',
          title: 'KPI、转化率与留存率',
          type: 'both',
          content: `## KPI、转化率与留存率

商业指标体系是衡量业务健康度的量化工具，掌握核心指标的计算和分析方法是商务数据分析的基础。

### KPI（关键绩效指标）

KPI是衡量业务目标达成程度的核心指标，需要遵循SMART原则：
- **S**pecific：具体明确
- **M**easurable：可量化
- **A**chievable：可实现
- **R**elevant：与目标相关
- **T**ime-bound：有时限

**常见KPI分类：**
- 财务类：收入、利润、成本率
- 客户类：客户数、满意度、NPS
- 运营类：转化率、留存率、活跃度
- 增长类：增长率、市场份额

### 转化率（Conversion Rate）

转化率衡量从一阶段到下一阶段的转化效率。

**常见转化率：**
- 整体转化率 = 成交用户数 / 访问用户数 × 100%
- 注册转化率 = 注册用户数 / 访问用户数 × 100%
- 付费转化率 = 付费用户数 / 注册用户数 × 100%

**漏斗分析：**
通过各环节转化率定位问题环节，是优化业务流程的核心方法。

### 留存率（Retention Rate）

留存率衡量用户在一段时间后仍然活跃的比例，是评估产品粘性的关键指标。

**留存率计算：**
- 第n日留存率 = 第n日仍活跃用户数 / 第0日新增用户数 × 100%
- 通常关注：次日留存、7日留存、30日留存

**留存分析的价值：**
- 评估产品粘性
- 预测用户生命周期价值（LTV）
- 指导运营策略优化

### ROI（投资回报率）

ROI = (收益 - 成本) / 成本 × 100%

衡量投入产出效率，是决策的重要依据。`,
          codeExample: `import pandas as pd
import numpy as np

# === 转化率分析 ===

# 漏斗数据
funnel = pd.DataFrame({
    '环节': ['访问', '注册', '激活', '付费', '复购'],
    '用户数': [100000, 35000, 21000, 8400, 3360]
})
funnel['转化率'] = (funnel['用户数'] / funnel['用户数'].shift(1) * 100).fillna(100).round(2)
funnel['总体转化率'] = (funnel['用户数'] / funnel['用户数'].iloc[0] * 100).round(2)

print("转化漏斗分析:")
print(funnel.to_string(index=False))

# === 留存率分析 ===

np.random.seed(42)
# 模拟30天的新增用户和留存
dates = pd.date_range('2024-01-01', periods=30)
new_users = np.random.randint(500, 1000, 30)

retention_data = []
for i, (date, new) in enumerate(zip(dates, new_users)):
    row = {'日期': date, '新增用户': new, '第0日': new}
    for day in [1, 3, 7, 14, 30]:
        if i + day < 30:
            retained = int(new * np.random.uniform(0.3, 0.7) * (0.95 ** day))
            row[f'第{day}日'] = retained
    retention_data.append(row)

retention_df = pd.DataFrame(retention_data)

# 计算平均留存率
print("\\n平均留存率:")
for day in [1, 3, 7, 14, 30]:
    col = f'第{day}日'
    if col in retention_df.columns:
        rate = (retention_df[col] / retention_df['新增用户'] * 100).mean()
        print(f"  {col}留存率: {rate:.2f}%")

# === ROI分析 ===

campaigns = pd.DataFrame({
    '渠道': ['搜索广告', '社交媒体', '内容营销', '邮件营销', '线下活动'],
    '投入成本': [50000, 30000, 20000, 10000, 40000],
    '带来收入': [180000, 90000, 70000, 35000, 120000],
    '新增客户': [360, 225, 175, 140, 80]
})
campaigns['ROI'] = ((campaigns['带来收入'] - campaigns['投入成本'])
                     / campaigns['投入成本'] * 100).round(2)
campaigns['获客成本'] = (campaigns['投入成本'] / campaigns['新增客户']).round(2)

print("\\nROI分析:")
print(campaigns.to_string(index=False))`,
          exercise: {
            id: 'ex5-3-1',
            lessonId: 'les5-3-1',
            description: '编写一个函数 `calculate_funnel_metrics(stages, counts)`，接收漏斗环节名称列表和对应的用户数列表，返回一个DataFrame，包含每个环节的用户数、环节转化率（相对于上一环节）和总体转化率（相对于第一个环节）。',
            initialCode: `import pandas as pd

def calculate_funnel_metrics(stages, counts):
    # 请在此处编写代码
    pass

# 测试
stages = ['访问', '注册', '激活', '付费']
counts = [10000, 3000, 1800, 600]
result = calculate_funnel_metrics(stages, counts)
print(result)`,
            hints: [
              '环节转化率 = 当前环节用户数 / 上一环节用户数 * 100，第一环节为100%',
              '总体转化率 = 当前环节用户数 / 第一个环节用户数 * 100'
            ],
            referenceAnswer: `import pandas as pd

def calculate_funnel_metrics(stages, counts):
    df = pd.DataFrame({'环节': stages, '用户数': counts})
    df['环节转化率(%)'] = (df['用户数'] / df['用户数'].shift(1) * 100).fillna(100).round(2)
    df['总体转化率(%)'] = (df['用户数'] / df['用户数'].iloc[0] * 100).round(2)
    return df`,
            testCases: [
              { input: "result = calculate_funnel_metrics(['A','B','C'], [100, 50, 25]); print(result['总体转化率(%)'].tolist())", expectedOutput: '[100.0, 50.0, 25.0]' }
            ]
          }
        }
      ]
    },
    {
      id: 'ch5-4',
      moduleId: 'business-intelligence',
      title: '自动化报表生成',
      order: 4,
      lessons: [
        {
          id: 'les5-4-1',
          chapterId: 'ch5-4',
          title: '报表模板与定时任务',
          type: 'both',
          content: `## 报表模板与定时任务

自动化报表是提升工作效率的关键，通过模板化和定时任务，可以将重复性报表工作完全自动化。

### 报表自动化流程

1. **数据获取**：从数据库、API、文件等数据源获取数据
2. **数据处理**：清洗、转换、计算指标
3. **报表生成**：填充模板、生成图表
4. **报表分发**：邮件发送、上传共享

### 报表模板设计

使用Python生成报表的常见方式：

**1. Excel模板**
- 使用openpyxl操作模板文件
- 保留格式，只更新数据
- 适合财务报表、数据表格

**2. HTML模板**
- 使用Jinja2模板引擎
- 支持条件渲染和循环
- 适合邮件报表、Web报表

**3. PDF报表**
- 使用ReportLab或WeasyPrint
- 适合正式文档

### 定时任务

**1. schedule库**（简单场景）
\`\`\`python
import schedule
schedule.every().day.at("09:00").do(generate_report)
\`\`\`

**2. APScheduler**（高级场景）
- 支持Cron表达式
- 持久化任务
- 错误处理

**3. 系统级定时**
- Linux：crontab
- Windows：任务计划程序

### 邮件发送

使用smtplib发送报表邮件：
- 支持HTML正文
- 支持附件
- 支持多人发送`,
          codeExample: `import pandas as pd
import numpy as np
from datetime import datetime, timedelta

# === 报表模板生成 ===

def generate_daily_report(date=None):
    """生成日报表"""
    if date is None:
        date = datetime.now().strftime('%Y-%m-%d')

    # 模拟获取数据
    np.random.seed(hash(date) % 2**32)
    metrics = {
        '日期': date,
        '访客数': np.random.randint(5000, 15000),
        '订单数': np.random.randint(100, 500),
        '销售额': round(np.random.uniform(50000, 200000), 2),
        '客单价': None,  # 稍后计算
        '转化率': None,
    }
    metrics['客单价'] = round(metrics['销售额'] / metrics['订单数'], 2)
    metrics['转化率'] = round(metrics['订单数'] / metrics['访客数'] * 100, 2)

    return metrics

# 生成报表
report = generate_daily_report('2024-06-15')
print("日报表:")
for key, value in report.items():
    print(f"  {key}: {value}")

# === 周报表（汇总） ===

def generate_weekly_report(end_date=None):
    """生成周报表"""
    if end_date is None:
        end_date = datetime.now()

    dates = [end_date - timedelta(days=i) for i in range(6, -1, -1)]
    daily_data = [generate_daily_report(d.strftime('%Y-%m-%d')) for d in dates]

    df = pd.DataFrame(daily_data)
    weekly = {
        '周期': f"{dates[0].strftime('%m/%d')} - {dates[-1].strftime('%m/%d')}",
        '总访客数': df['访客数'].sum(),
        '总订单数': df['订单数'].sum(),
        '总销售额': round(df['销售额'].sum(), 2),
        '日均访客': round(df['访客数'].mean()),
        '日均订单': round(df['订单数'].mean()),
        '平均转化率': round(df['转化率'].mean(), 2),
    }
    return weekly, df

weekly, daily_df = generate_weekly_report()
print(f"\\n周报表:")
for key, value in weekly.items():
    print(f"  {key}: {value}")

# === HTML邮件模板 ===

def generate_html_report(metrics):
    """生成HTML格式报表"""
    html = f"""
    <html>
    <head><style>
        body {{ font-family: Arial, sans-serif; }}
        .header {{ background: #2196F3; color: white; padding: 20px; }}
        .metrics {{ display: flex; flex-wrap: wrap; gap: 15px; padding: 20px; }}
        .metric-card {{
            border: 1px solid #ddd; border-radius: 8px;
            padding: 15px; min-width: 150px; text-align: center;
        }}
        .metric-value {{ font-size: 24px; font-weight: bold; color: #2196F3; }}
        .metric-label {{ font-size: 12px; color: #666; }}
    </style></head>
    <body>
        <div class="header"><h1>每日业务报表 - {metrics['日期']}</h1></div>
        <div class="metrics">
            <div class="metric-card">
                <div class="metric-value">{metrics['访客数']:,}</div>
                <div class="metric-label">访客数</div>
            </div>
            <div class="metric-card">
                <div class="metric-value">{metrics['订单数']:,}</div>
                <div class="metric-label">订单数</div>
            </div>
            <div class="metric-card">
                <div class="metric-value">¥{metrics['销售额']:,.2f}</div>
                <div class="metric-label">销售额</div>
            </div>
            <div class="metric-card">
                <div class="metric-value">{metrics['转化率']}%</div>
                <div class="metric-label">转化率</div>
            </div>
        </div>
    </body></html>
    """
    return html

html_report = generate_html_report(report)
print(f"\\nHTML报表已生成，长度: {len(html_report)} 字符")

# === 定时任务示例 ===
import schedule
import time

def report_job():
    print(f"[{datetime.now()}] 正在生成报表...")
    report = generate_daily_report()
    print(f"  销售额: ¥{report['销售额']:,.2f}")

# 设置定时任务
schedule.every().day.at("09:00").do(report_job)
print("\\n定时任务已设置（每天9:00执行）")
# 实际运行: while True: schedule.run_pending(); time.sleep(60)`,
          exercise: {
            id: 'ex5-4-1',
            lessonId: 'les5-4-1',
            description: '编写一个函数 `generate_comparison_report(current_data, previous_data)`，生成环比对比报表。输入为两个字典（当期和上期数据），返回包含各指标的当期值、上期值、变化值和变化率的DataFrame。',
            initialCode: `import pandas as pd

def generate_comparison_report(current_data, previous_data):
    # 请在此处编写代码
    pass

# 测试
current = {'访客数': 12000, '订单数': 360, '销售额': 150000}
previous = {'访客数': 10000, '订单数': 300, '销售额': 120000}
result = generate_comparison_report(current, previous)
print(result)`,
            hints: [
              '遍历current_data的键，计算变化值和变化率',
              '变化率 = (当期 - 上期) / 上期 * 100'
            ],
            referenceAnswer: `import pandas as pd

def generate_comparison_report(current_data, previous_data):
    rows = []
    for key in current_data:
        curr = current_data[key]
        prev = previous_data.get(key, 0)
        change = curr - prev
        change_rate = (change / prev * 100) if prev != 0 else 0
        rows.append({
            '指标': key,
            '当期': curr,
            '上期': prev,
            '变化值': change,
            '变化率(%)': round(change_rate, 2)
        })
    return pd.DataFrame(rows)`,
            testCases: [
              { input: "result = generate_comparison_report({'A': 120}, {'A': 100}); print(result['变化率(%)'].iloc[0])", expectedOutput: '20.0' }
            ]
          }
        }
      ]
    }
  ]
};
