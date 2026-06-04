import type { Module } from '../../types';

export const module4: Module = {
  id: 'statistics',
  title: '统计分析',
  description: '学习描述性统计、概率分布、假设检验、回归分析等统计方法，为商务决策提供数据支撑。',
  icon: '📐',
  order: 4,
  chapters: [
    {
      id: 'ch4-1',
      moduleId: 'statistics',
      title: '描述性统计',
      order: 1,
      lessons: [
        {
          id: 'les4-1-1',
          chapterId: 'ch4-1',
          title: '集中趋势与离散程度',
          type: 'both',
          content: `## 集中趋势与离散程度

描述性统计是数据分析的第一步，通过数值指标概括数据的特征，帮助我们快速了解数据的分布情况。

### 集中趋势度量

集中趋势反映数据的"中心位置"，常用的度量指标有：

**1. 均值（Mean）**
- 定义：所有数据值之和除以数据个数
- 公式：x̄ = (x₁ + x₂ + ... + xₙ) / n
- 特点：受极端值影响较大
- 适用：对称分布的数据

**2. 中位数（Median）**
- 定义：将数据排序后位于中间位置的值
- 特点：不受极端值影响（稳健性）
- 适用：偏态分布或含异常值的数据

**3. 众数（Mode）**
- 定义：出现频率最高的值
- 特点：可以不存在或存在多个
- 适用：分类数据

### 离散程度度量

离散程度反映数据的"分散程度"：

**1. 方差（Variance）**
- 定义：各数据值与均值之差的平方的平均值
- 总体方差：σ² = Σ(xᵢ - μ)² / N
- 样本方差：s² = Σ(xᵢ - x̄)² / (n-1)（无偏估计）

**2. 标准差（Standard Deviation）**
- 定义：方差的算术平方根
- 特点：与原始数据同量纲，更直观

**3. 四分位距（IQR）**
- 定义：Q3 - Q1（第75百分位数 - 第25百分位数）
- 特点：不受极端值影响
- 用途：箱线图中识别异常值

**4. 变异系数（CV）**
- 定义：标准差 / 均值 × 100%
- 用途：比较不同量纲数据的离散程度`,
          codeExample: `import numpy as np
import pandas as pd
from scipy import stats

# 生成示例数据
np.random.seed(42)
data = np.concatenate([
    np.random.normal(100, 15, 95),  # 正常数据
    [200, 250, 300, 280, 220]       # 异常值
])

print(f"数据量: {len(data)}")
print(f"均值: {np.mean(data):.2f}")
print(f"中位数: {np.median(data):.2f}")
print(f"众数: {stats.mode(data, keepdims=True).mode[0]:.2f}")

print(f"\\n方差: {np.var(data, ddof=1):.2f}")  # ddof=1 为样本方差
print(f"标准差: {np.std(data, ddof=1):.2f}")
print(f"变异系数: {np.std(data, ddof=1) / np.mean(data) * 100:.2f}%")

# 分位数
q1 = np.percentile(data, 25)
q3 = np.percentile(data, 75)
iqr = q3 - q1
print(f"\\nQ1: {q1:.2f}")
print(f"Q3: {q3:.2f}")
print(f"IQR: {iqr:.2f}")

# 异常值检测（IQR方法）
lower_bound = q1 - 1.5 * iqr
upper_bound = q3 + 1.5 * iqr
outliers = data[(data < lower_bound) | (data > upper_bound)]
print(f"\\n异常值下界: {lower_bound:.2f}")
print(f"异常值上界: {upper_bound:.2f}")
print(f"异常值数量: {len(outliers)}")
print(f"异常值: {sorted(outliers)}")

# 使用Pandas
df = pd.DataFrame({'成绩': data})
print(f"\\n描述性统计:")
print(df.describe())

# 偏度和峰度
print(f"\\n偏度: {stats.skew(data):.4f}")
print(f"峰度: {stats.kurtosis(data):.4f}")`,
          exercise: {
            id: 'ex4-1-1',
            lessonId: 'les4-1-1',
            description: '编写一个函数 `descriptive_stats(data)`，接收一个数值列表/数组，返回一个字典，包含：均值、中位数、标准差、方差、Q1、Q3、IQR、偏度、峰度。同时返回基于IQR方法的异常值列表。',
            initialCode: `import numpy as np
from scipy import stats

def descriptive_stats(data):
    # 请在此处编写代码
    pass

# 测试
data = [10, 12, 15, 18, 20, 22, 25, 100, 110]
result = descriptive_stats(data)
for key, value in result['stats'].items():
    print(f"{key}: {value:.4f}")
print(f"异常值: {result['outliers']}")`,
            hints: [
              '使用 numpy 的 mean、median、std、var、percentile 函数，scipy.stats 的 skew 和 kurtosis',
              'IQR异常值：小于 Q1-1.5*IQR 或大于 Q3+1.5*IQR 的值'
            ],
            referenceAnswer: `import numpy as np
from scipy import stats

def descriptive_stats(data):
    arr = np.array(data, dtype=float)
    q1 = np.percentile(arr, 25)
    q3 = np.percentile(arr, 75)
    iqr = q3 - q1
    lower = q1 - 1.5 * iqr
    upper = q3 + 1.5 * iqr
    outliers = arr[(arr < lower) | (arr > upper)].tolist()
    stat_dict = {
        '均值': np.mean(arr),
        '中位数': np.median(arr),
        '标准差': np.std(arr, ddof=1),
        '方差': np.var(arr, ddof=1),
        'Q1': q1,
        'Q3': q3,
        'IQR': iqr,
        '偏度': stats.skew(arr),
        '峰度': stats.kurtosis(arr),
    }
    return {'stats': stat_dict, 'outliers': outliers}`,
            testCases: [
              { input: "result = descriptive_stats([1, 2, 3, 4, 5]); print(f\"{result['stats']['均值']:.1f}\")", expectedOutput: '3.0' },
              { input: "result = descriptive_stats([1, 2, 3, 100]); print(len(result['outliers']))", expectedOutput: '1' }
            ]
          }
        }
      ]
    },
    {
      id: 'ch4-2',
      moduleId: 'statistics',
      title: '概率分布',
      order: 2,
      lessons: [
        {
          id: 'les4-2-1',
          chapterId: 'ch4-2',
          title: '常见概率分布',
          type: 'both',
          content: `## 常见概率分布

概率分布描述了随机变量取各种值的概率规律，是统计推断的理论基础。

### 正态分布（Normal Distribution）

正态分布是最重要的连续概率分布，由均值μ和标准差σ决定，记为N(μ, σ²)。

**特征：**
- 钟形曲线，关于μ对称
- 约68%的数据在μ±σ内，95%在μ±2σ内，99.7%在μ±3σ内
- 许多自然现象近似服从正态分布
- 中心极限定理保证了样本均值的正态性

**应用场景：**
- 测量误差分布
- 身高、体重等生理指标
- 金融资产收益率

### 二项分布（Binomial Distribution）

二项分布描述n次独立伯努利试验中成功次数的分布，记为B(n, p)。

**条件：**
- 固定次数n的独立试验
- 每次试验只有成功/失败两种结果
- 成功概率p恒定

**应用场景：**
- 产品合格率检验
- 转化率分析
- A/B测试

### 泊松分布（Poisson Distribution）

泊松分布描述单位时间/空间内随机事件发生次数的分布，记为P(λ)。

**条件：**
- 事件独立发生
- 单位时间内平均发生λ次
- 同一时刻不可能发生两个事件

**应用场景：**
- 网站访问量
- 客服来电次数
- 缺陷数量

### 使用scipy.stats

scipy.stats提供了所有常用分布的PDF（概率密度函数）、CDF（累积分布函数）、PPF（分位函数）和随机数生成功能。`,
          codeExample: `import numpy as np
from scipy import stats
import matplotlib.pyplot as plt

# 正态分布
mu, sigma = 100, 15
norm_dist = stats.norm(mu, sigma)

print("正态分布 N(100, 15²):")
print(f"  P(X < 85) = {norm_dist.cdf(85):.4f}")
print(f"  P(X > 130) = {1 - norm_dist.cdf(130):.4f}")
print(f"  P(85 < X < 115) = {norm_dist.cdf(115) - norm_dist.cdf(85):.4f}")
print(f"  95%分位数: {norm_dist.ppf(0.95):.2f}")

# 二项分布
n, p = 100, 0.3
binom_dist = stats.binom(n, p)

print(f"\\n二项分布 B(100, 0.3):")
print(f"  P(X = 30) = {binom_dist.pmf(30):.4f}")
print(f"  P(X <= 25) = {binom_dist.cdf(25):.4f}")
print(f"  均值: {binom_dist.mean():.1f}")
print(f"  标准差: {binom_dist.std():.2f}")

# 泊松分布
lambda_param = 5
poisson_dist = stats.poisson(lambda_param)

print(f"\\n泊松分布 P(5):")
print(f"  P(X = 3) = {poisson_dist.pmf(3):.4f}")
print(f"  P(X <= 5) = {poisson_dist.cdf(5):.4f}")
print(f"  均值: {poisson_dist.mean():.1f}")

# 正态性检验
np.random.seed(42)
data = np.random.normal(0, 1, 100)
stat, p_value = stats.shapiro(data)
print(f"\\nShapiro-Wilk正态性检验:")
print(f"  统计量: {stat:.4f}")
print(f"  p值: {p_value:.4f}")
print(f"  结论: {'正态' if p_value > 0.05 else '非正态'}")

# 可视化
fig, axes = plt.subplots(1, 3, figsize=(15, 4))

x_norm = np.linspace(40, 160, 200)
axes[0].plot(x_norm, norm_dist.pdf(x_norm), 'b-', linewidth=2)
axes[0].set_title('正态分布 N(100, 15²)')
axes[0].fill_between(x_norm, norm_dist.pdf(x_norm),
                      where=(x_norm >= 85) & (x_norm <= 115),
                      alpha=0.3, color='blue')

x_binom = np.arange(0, 60)
axes[1].bar(x_binom, binom_dist.pmf(x_binom), color='orange', alpha=0.7)
axes[1].set_title('二项分布 B(100, 0.3)')

x_poisson = np.arange(0, 15)
axes[2].bar(x_poisson, poisson_dist.pmf(x_poisson), color='green', alpha=0.7)
axes[2].set_title('泊松分布 P(5)')

plt.tight_layout()
plt.show()`,
          exercise: {
            id: 'ex4-2-1',
            lessonId: 'les4-2-1',
            description: '编写一个函数 `analyze_conversion(n, p, target)`，分析二项分布B(n, p)下的转化率。计算：1) 达到target次转化的概率；2) 转化次数的均值和标准差；3) 95%置信区间（使用正态近似：mean ± 1.96*std）。返回包含这些统计量的字典。',
            initialCode: `from scipy import stats
import numpy as np

def analyze_conversion(n, p, target):
    # 请在此处编写代码
    pass

# 测试
result = analyze_conversion(1000, 0.05, 60)
for key, value in result.items():
    print(f"{key}: {value}")`,
            hints: [
              '使用 stats.binom(n, p) 创建二项分布对象',
              'P(X>=target) = 1 - binom.cdf(target-1)，均值=binom.mean()，标准差=binom.std()'
            ],
            referenceAnswer: `from scipy import stats
import numpy as np

def analyze_conversion(n, p, target):
    binom_dist = stats.binom(n, p)
    mean = binom_dist.mean()
    std = binom_dist.std()
    prob = 1 - binom_dist.cdf(target - 1)
    ci_lower = max(0, mean - 1.96 * std)
    ci_upper = mean + 1.96 * std
    return {
        '达到目标的概率': round(prob, 4),
        '均值': round(mean, 2),
        '标准差': round(std, 2),
        '95%置信区间下界': round(ci_lower, 2),
        '95%置信区间上界': round(ci_upper, 2),
    }`,
            testCases: [
              { input: "result = analyze_conversion(100, 0.5, 50); print(result['均值'])", expectedOutput: '50.0' },
              { input: "result = analyze_conversion(1000, 0.05, 60); print(result['均值'])", expectedOutput: '50.0' }
            ]
          }
        }
      ]
    },
    {
      id: 'ch4-3',
      moduleId: 'statistics',
      title: '假设检验',
      order: 3,
      lessons: [
        {
          id: 'les4-3-1',
          chapterId: 'ch4-3',
          title: 't检验与卡方检验',
          type: 'both',
          content: `## t检验与卡方检验

假设检验是统计推断的核心方法，用于根据样本数据对总体参数做出判断。

### 假设检验基本步骤

1. **建立假设**：
   - H₀（零假设）：无差异/无效果
   - H₁（备择假设）：有差异/有效果

2. **选择检验方法**：根据数据类型和研究问题

3. **计算检验统计量**：基于样本数据

4. **确定p值**：在H₀成立条件下，观察到当前或更极端结果的概率

5. **做出决策**：
   - p < α（通常0.05）：拒绝H₀，结果显著
   - p ≥ α：不能拒绝H₀，结果不显著

### t检验

t检验用于比较均值差异，适用于连续型数据。

**1. 单样本t检验**：检验样本均值是否与已知值有显著差异
- \`scipy.stats.ttest_1samp(sample, popmean)\`

**2. 独立样本t检验**：检验两组独立样本的均值是否有显著差异
- \`scipy.stats.ttest_ind(sample1, sample2)\`
- 前提：正态性、方差齐性、独立性

**3. 配对样本t检验**：检验配对数据的均值差异
- \`scipy.stats.ttest_rel(sample1, sample2)\`
- 适用场景：前后对比、配对实验

### 卡方检验

卡方检验用于分类数据的分析。

**1. 适合度检验**：检验观测频率是否符合期望分布
- \`scipy.stats.chisquare(f_obs, f_exp)\`

**2. 独立性检验**：检验两个分类变量是否独立
- \`scipy.stats.chi2_contingency(observed)\`

**3. 注意事项**：
- 期望频数不应太小（通常≥5）
- 样本量要足够大`,
          codeExample: `import numpy as np
from scipy import stats
import pandas as pd

np.random.seed(42)

# 单样本t检验
# 检验某班成绩是否与全校平均80分有显著差异
scores = np.random.normal(83, 10, 30)
t_stat, p_value = stats.ttest_1samp(scores, 80)
print("单样本t检验:")
print(f"  样本均值: {scores.mean():.2f}")
print(f"  t统计量: {t_stat:.4f}")
print(f"  p值: {p_value:.4f}")
print(f"  结论: {'显著差异' if p_value < 0.05 else '无显著差异'}")

# 独立样本t检验
# 检验两个班的成绩是否有显著差异
class_a = np.random.normal(82, 10, 30)
class_b = np.random.normal(78, 10, 30)
t_stat, p_value = stats.ttest_ind(class_a, class_b)
print(f"\\n独立样本t检验:")
print(f"  A班均值: {class_a.mean():.2f}")
print(f"  B班均值: {class_b.mean():.2f}")
print(f"  t统计量: {t_stat:.4f}")
print(f"  p值: {p_value:.4f}")
print(f"  结论: {'显著差异' if p_value < 0.05 else '无显著差异'}")

# 配对样本t检验
# 检验培训前后成绩是否有显著提升
before = np.random.normal(70, 12, 25)
after = before + np.random.normal(5, 8, 25)  # 培训后平均提高5分
t_stat, p_value = stats.ttest_rel(before, after)
print(f"\\n配对样本t检验:")
print(f"  培训前均值: {before.mean():.2f}")
print(f"  培训后均值: {after.mean():.2f}")
print(f"  t统计量: {t_stat:.4f}")
print(f"  p值: {p_value:.4f}")
print(f"  结论: {'显著差异' if p_value < 0.05 else '无显著差异'}")

# 卡方独立性检验
# 检验性别与购买偏好是否独立
observed = np.array([
    [30, 20, 10],  # 男性
    [15, 25, 20],  # 女性
])
chi2, p_value, dof, expected = stats.chi2_contingency(observed)
print(f"\\n卡方独立性检验:")
print(f"  观测频数:\\n{observed}")
print(f"  期望频数:\\n{expected.round(2)}")
print(f"  卡方值: {chi2:.4f}")
print(f"  p值: {p_value:.4f}")
print(f"  自由度: {dof}")
print(f"  结论: {'不独立(有关联)' if p_value < 0.05 else '独立(无关联)'}")`,
          exercise: {
            id: 'ex4-3-1',
            lessonId: 'les4-3-1',
            description: '编写一个函数 `ab_test_analysis(control, treatment, alpha=0.05)`，对A/B测试结果进行独立样本t检验。返回包含：两组均值、均值差异、t统计量、p值、是否显著、效应量（Cohen\'s d）的字典。Cohen\'s d = (mean1 - mean2) / pooled_std。',
            initialCode: `import numpy as np
from scipy import stats

def ab_test_analysis(control, treatment, alpha=0.05):
    # 请在此处编写代码
    pass

# 测试
np.random.seed(42)
control = np.random.normal(100, 15, 50)
treatment = np.random.normal(108, 15, 50)
result = ab_test_analysis(control, treatment)
for key, value in result.items():
    print(f"{key}: {value}")`,
            hints: [
              '使用 stats.ttest_ind(control, treatment) 进行t检验',
              'Cohen\'s d = (mean_treatment - mean_control) / sqrt(((n1-1)*s1² + (n2-1)*s2²) / (n1+n2-2))'
            ],
            referenceAnswer: `import numpy as np
from scipy import stats

def ab_test_analysis(control, treatment, alpha=0.05):
    t_stat, p_value = stats.ttest_ind(control, treatment)
    mean_c = np.mean(control)
    mean_t = np.mean(treatment)
    n1, n2 = len(control), len(treatment)
    s1, s2 = np.std(control, ddof=1), np.std(treatment, ddof=1)
    pooled_std = np.sqrt(((n1-1)*s1**2 + (n2-1)*s2**2) / (n1+n2-2))
    cohens_d = (mean_t - mean_c) / pooled_std
    return {
        '对照组均值': round(mean_c, 4),
        '实验组均值': round(mean_t, 4),
        '均值差异': round(mean_t - mean_c, 4),
        't统计量': round(t_stat, 4),
        'p值': round(p_value, 4),
        '是否显著': p_value < alpha,
        'Cohens_d': round(cohens_d, 4),
    }`,
            testCases: [
              { input: "np.random.seed(42); c = np.random.normal(100, 15, 50); t = np.random.normal(108, 15, 50); result = ab_test_analysis(c, t); print(result['是否显著'])", expectedOutput: 'True' }
            ]
          }
        }
      ]
    },
    {
      id: 'ch4-4',
      moduleId: 'statistics',
      title: '相关与回归分析',
      order: 4,
      lessons: [
        {
          id: 'les4-4-1',
          chapterId: 'ch4-4',
          title: '相关系数与线性回归',
          type: 'both',
          content: `## 相关系数与线性回归

相关分析和回归分析是研究变量之间关系的核心统计方法，在商务分析中应用广泛。

### 相关系数

相关系数衡量两个变量之间的线性关系强度和方向。

**Pearson相关系数：**
- 范围：-1 到 1
- r > 0：正相关；r < 0：负相关；r = 0：无线性相关
- |r| < 0.3：弱相关；0.3-0.7：中等相关；> 0.7：强相关
- 注意：相关不等于因果

**Spearman秩相关：**
- 基于秩次计算，适用于有序数据和非线性单调关系
- 对异常值更稳健

### 线性回归

线性回归建立因变量Y与自变量X之间的线性关系模型：

Y = β₀ + β₁X + ε

**关键概念：**
- β₀（截距）：X=0时Y的期望值
- β₁（斜率）：X每增加1单位，Y的平均变化量
- R²（决定系数）：模型解释的方差比例
- 残差：观测值与预测值之差

**使用statsmodels进行回归：**
- 提供详细的统计检验结果
- 包含置信区间、F检验等

**使用sklearn进行回归：**
- 更适合预测场景
- 与机器学习工作流集成

### 回归诊断

- 残差图：检查线性假设和等方差性
- Q-Q图：检查残差正态性
- VIF：检查多重共线性`,
          codeExample: `import numpy as np
import pandas as pd
from scipy import stats
from sklearn.linear_model import LinearRegression
from sklearn.metrics import r2_score, mean_squared_error

# 生成示例数据
np.random.seed(42)
n = 100
ad_spend = np.random.uniform(10, 100, n)
sales = 50 + 2.5 * ad_spend + np.random.normal(0, 15, n)

# 相关系数
pearson_r, pearson_p = stats.pearsonr(ad_spend, sales)
spearman_r, spearman_p = stats.spearmanr(ad_spend, sales)

print("相关分析:")
print(f"  Pearson r = {pearson_r:.4f}, p = {pearson_p:.6f}")
print(f"  Spearman r = {spearman_r:.4f}, p = {spearman_p:.6f}")

# 使用sklearn进行线性回归
X = ad_spend.reshape(-1, 1)
y = sales

model = LinearRegression()
model.fit(X, y)

print(f"\\n线性回归结果:")
print(f"  截距(β₀): {model.intercept_:.4f}")
print(f"  斜率(β₁): {model.coef_[0]:.4f}")
print(f"  R²: {model.score(X, y):.4f}")

# 预测
y_pred = model.predict(X)
rmse = np.sqrt(mean_squared_error(y, y_pred))
print(f"  RMSE: {rmse:.4f}")

# 预测新数据
new_ad = np.array([[50], [80], [100]])
new_sales = model.predict(new_ad)
print(f"\\n预测:")
for ad, s in zip(new_ad.flatten(), new_sales):
    print(f"  广告投入{ad:.0f}万 → 预计销售{s:.1f}万")

# 使用statsmodels（更详细的统计信息）
import statsmodels.api as sm
X_with_const = sm.add_constant(X)
ols_model = sm.OLS(y, X_with_const).fit()
print(f"\\nstatsmodels回归摘要:")
print(ols_model.summary().tables[1])`,
          exercise: {
            id: 'ex4-4-1',
            lessonId: 'les4-4-1',
            description: '编写一个函数 `simple_regression_analysis(x, y)`，进行简单线性回归分析。返回包含：Pearson相关系数及p值、截距、斜率、R²、残差标准差的字典。',
            initialCode: `import numpy as np
from scipy import stats
from sklearn.linear_model import LinearRegression

def simple_regression_analysis(x, y):
    # 请在此处编写代码
    pass

# 测试
np.random.seed(42)
x = np.random.uniform(0, 100, 50)
y = 3 * x + 10 + np.random.normal(0, 20, 50)
result = simple_regression_analysis(x, y)
for key, value in result.items():
    print(f"{key}: {value}")`,
            hints: [
              '用 stats.pearsonr 计算相关系数，用 LinearRegression 拟合模型',
              '残差标准差 = sqrt(sum((y - y_pred)²) / (n - 2))'
            ],
            referenceAnswer: `import numpy as np
from scipy import stats
from sklearn.linear_model import LinearRegression

def simple_regression_analysis(x, y):
    r, p_value = stats.pearsonr(x, y)
    X = np.array(x).reshape(-1, 1)
    y_arr = np.array(y)
    model = LinearRegression()
    model.fit(X, y_arr)
    y_pred = model.predict(X)
    residuals = y_arr - y_pred
    residual_std = np.sqrt(np.sum(residuals**2) / (len(y_arr) - 2))
    return {
        'Pearson相关系数': round(r, 4),
        'p值': round(p_value, 6),
        '截距': round(model.intercept_, 4),
        '斜率': round(model.coef_[0], 4),
        'R²': round(model.score(X, y_arr), 4),
        '残差标准差': round(residual_std, 4),
    }`,
            testCases: [
              { input: "np.random.seed(42); x = np.random.uniform(0, 100, 50); y = 3 * x + 10 + np.random.normal(0, 5, 50); result = simple_regression_analysis(x, y); print(result['斜率'] > 2.5)", expectedOutput: 'True' }
            ]
          }
        }
      ]
    },
    {
      id: 'ch4-5',
      moduleId: 'statistics',
      title: '时间序列分析',
      order: 5,
      lessons: [
        {
          id: 'les4-5-1',
          chapterId: 'ch4-5',
          title: '趋势、季节性与移动平均',
          type: 'both',
          content: `## 趋势、季节性与移动平均

时间序列分析是分析按时间顺序排列的数据的方法，在商务预测、库存管理、财务分析等领域应用广泛。

### 时间序列组成

时间序列通常由以下成分组成：

1. **趋势（Trend）**：长期上升或下降的方向
2. **季节性（Seasonality）**：固定周期的规律性波动
3. **周期性（Cyclicity）**：非固定周期的波动
4. **随机性（Irregularity）**：不规则的随机波动

### 时间序列分解

加法模型：Y = T + S + C + I
乘法模型：Y = T × S × C × I

使用 \`statsmodels.tsa.seasonal.seasonal_decompose()\` 可以自动分解时间序列。

### 移动平均

移动平均是平滑时间序列的基本方法，用于消除短期波动、突出趋势。

**简单移动平均（SMA）：**
- 计算最近n个观测值的算术平均
- 窗口越大，平滑效果越强，但滞后越明显

**加权移动平均（WMA）：**
- 给近期数据更大权重

**指数移动平均（EMA）：**
- 对所有历史数据加权，权重指数递减
- 公式：EMAₜ = α × Yₜ + (1-α) × EMAₜ₋₁
- α越大，对近期数据越敏感

### Pandas时间序列功能

- \`df.rolling(window)\`：滚动窗口计算
- \`df.shift(n)\`：数据平移
- \`df.diff()\`：差分
- \`df.pct_change()\`：百分比变化`,
          codeExample: `import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from statsmodels.tsa.seasonal import seasonal_decompose

# 生成时间序列数据
np.random.seed(42)
dates = pd.date_range('2022-01-01', periods=36, freq='M')
trend = np.linspace(100, 200, 36)
seasonality = 20 * np.sin(np.arange(36) * 2 * np.pi / 12)
noise = np.random.normal(0, 5, 36)
sales = trend + seasonality + noise

ts = pd.Series(sales, index=dates, name='销售额')
print("时间序列数据（前12个月）:")
print(ts.head(12))

# 移动平均
ts_ma3 = ts.rolling(window=3).mean()
ts_ma6 = ts.rolling(window=6).mean()
ts_ema = ts.ewm(span=6).mean()

print(f"\\n3个月移动平均（前6个月）:")
print(ts_ma3.head(6))

# 时间序列分解
decomposition = seasonal_decompose(ts, model='additive', period=12)

fig, axes = plt.subplots(4, 1, figsize=(12, 10))
decomposition.observed.plot(ax=axes[0], title='原始数据')
decomposition.trend.plot(ax=axes[1], title='趋势')
decomposition.seasonal.plot(ax=axes[2], title='季节性')
decomposition.resid.plot(ax=axes[3], title='残差')
plt.tight_layout()
plt.show()

# 移动平均对比
fig, ax = plt.subplots(figsize=(12, 5))
ts.plot(ax=ax, label='原始数据', alpha=0.5)
ts_ma3.plot(ax=ax, label='3月移动平均', linewidth=2)
ts_ma6.plot(ax=ax, label='6月移动平均', linewidth=2)
ts_ema.plot(ax=ax, label='指数移动平均', linewidth=2)
ax.set_title('移动平均对比', fontsize=16)
ax.legend()
plt.tight_layout()
plt.show()

# 同比和环比
yoy = ts.pct_change(periods=12) * 100  # 同比
mom = ts.pct_change(periods=1) * 100   # 环比
print(f"\\n同比增长率（第13个月起）:")
print(yoy.dropna().head(6).round(2))`,
          exercise: {
            id: 'ex4-5-1',
            lessonId: 'les4-5-1',
            description: '编写一个函数 `analyze_time_series(series, window)`，对Pandas时间序列进行分析。返回包含：趋势（window期移动平均）、同比增长率、环比增长率、波动系数（标准差/均值）的字典。',
            initialCode: `import pandas as pd
import numpy as np

def analyze_time_series(series, window=3):
    # 请在此处编写代码
    pass

# 测试
np.random.seed(42)
dates = pd.date_range('2022-01', periods=24, freq='M')
values = np.linspace(100, 150, 24) + 10 * np.sin(np.arange(24) * 2 * np.pi / 12) + np.random.normal(0, 3, 24)
ts = pd.Series(values, index=dates)
result = analyze_time_series(ts, 3)
for key, value in result.items():
    if isinstance(value, pd.Series):
        print(f"{key}:\\n{value.head()}")
    else:
        print(f"{key}: {value}")`,
            hints: [
              '趋势用 series.rolling(window).mean()，同比用 series.pct_change(12)，环比用 series.pct_change(1)',
              '波动系数 = series.std() / series.mean()'
            ],
            referenceAnswer: `import pandas as pd
import numpy as np

def analyze_time_series(series, window=3):
    trend = series.rolling(window=window).mean()
    yoy = series.pct_change(periods=12) * 100
    mom = series.pct_change(periods=1) * 100
    cv = series.std() / series.mean()
    return {
        '趋势': trend,
        '同比增长率(%)': yoy,
        '环比增长率(%)': mom,
        '波动系数': round(cv, 4),
    }`,
            testCases: [
              { input: "np.random.seed(42); dates = pd.date_range('2022-01', periods=24, freq='M'); values = np.linspace(100, 150, 24); ts = pd.Series(values, index=dates); result = analyze_time_series(ts, 3); print(type(result['趋势']).__name__)", expectedOutput: 'Series' }
            ]
          }
        }
      ]
    }
  ]
};
