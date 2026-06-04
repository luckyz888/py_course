import type { Module } from '../../types';

export const module6: Module = {
  id: 'data-mining',
  title: '数据挖掘与商务实战',
  description: '学习分类、聚类、关联规则、推荐系统等数据挖掘方法，通过商务案例将所学知识综合应用。',
  icon: '⛏️',
  order: 6,
  chapters: [
    {
      id: 'ch6-1',
      moduleId: 'data-mining',
      title: '分类与预测',
      order: 1,
      lessons: [
        {
          id: 'les6-1-1',
          chapterId: 'ch6-1',
          title: '决策树与逻辑回归',
          type: 'both',
          content: `## 决策树与逻辑回归

分类是数据挖掘中最常见的任务之一，目标是根据特征将样本划分到预定义的类别中。

### 决策树（Decision Tree）

决策树通过一系列规则对数据进行分割，形成树状结构：

**核心概念：**
- **根节点**：包含所有训练数据
- **内部节点**：表示一个特征上的判断条件
- **叶节点**：表示类别标签
- **分支**：判断结果的不同路径

**分裂准则：**
- **信息增益（ID3）**：选择使信息熵减少最多的特征
- **信息增益率（C4.5）**：克服信息增益偏向多值特征的问题
- **基尼指数（CART）**：选择使基尼不纯度最小的特征

**优点：** 可解释性强、无需特征缩放、能处理数值和分类特征
**缺点：** 容易过拟合、对数据变化敏感

**防止过拟合：**
- 限制树深度（max_depth）
- 限制叶节点最小样本数（min_samples_leaf）
- 剪枝（pruning）

### 逻辑回归（Logistic Regression）

逻辑回归虽然名字中有"回归"，但实际是分类算法。它使用sigmoid函数将线性组合映射到[0,1]区间：

σ(z) = 1 / (1 + e⁻ᶻ)

**核心概念：**
- 输出为概率值（0到1之间）
- 默认阈值0.5：概率≥0.5预测为正类
- 通过最大似然估计求解参数

**优点：** 简单高效、输出概率可解释、适合线性可分问题
**缺点：** 只能处理线性决策边界、对特征缩放敏感

### 模型评估指标

- **准确率（Accuracy）**：正确预测的比例
- **精确率（Precision）**：预测为正的样本中实际为正的比例
- **召回率（Recall）**：实际为正的样本中被正确预测的比例
- **F1分数**：精确率和召回率的调和平均
- **AUC-ROC**：ROC曲线下面积`,
          codeExample: `import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier, plot_tree
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import (accuracy_score, precision_score,
                              recall_score, f1_score, classification_report,
                              confusion_matrix)
from sklearn.datasets import make_classification
import matplotlib.pyplot as plt

# 生成示例数据
X, y = make_classification(n_samples=1000, n_features=4,
                            n_informative=3, n_redundant=1,
                            random_state=42, class_sep=1.5)
feature_names = ['年龄', '收入', '消费频次', '会员等级']
df = pd.DataFrame(X, columns=feature_names)
df['是否流失'] = y

print("数据概览:")
print(df.head())
print(f"\\n类别分布:\\n{df['是否流失'].value_counts()}")

# 划分训练集和测试集
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.3, random_state=42, stratify=y
)

# 决策树
dt = DecisionTreeClassifier(max_depth=4, random_state=42)
dt.fit(X_train, y_train)
y_pred_dt = dt.predict(X_test)

print("\\n=== 决策树 ===")
print(f"准确率: {accuracy_score(y_test, y_pred_dt):.4f}")
print(f"精确率: {precision_score(y_test, y_pred_dt):.4f}")
print(f"召回率: {recall_score(y_test, y_pred_dt):.4f}")
print(f"F1分数: {f1_score(y_test, y_pred_dt):.4f}")

# 特征重要性
importance = pd.Series(dt.feature_importances_, index=feature_names)
print(f"\\n特征重要性:")
for feat, imp in importance.sort_values(ascending=False).items():
    print(f"  {feat}: {imp:.4f}")

# 逻辑回归
lr = LogisticRegression(random_state=42, max_iter=1000)
lr.fit(X_train, y_train)
y_pred_lr = lr.predict(X_test)
y_prob_lr = lr.predict_proba(X_test)[:, 1]

print("\\n=== 逻辑回归 ===")
print(f"准确率: {accuracy_score(y_test, y_pred_lr):.4f}")
print(f"精确率: {precision_score(y_test, y_pred_lr):.4f}")
print(f"召回率: {recall_score(y_test, y_pred_lr):.4f}")
print(f"F1分数: {f1_score(y_test, y_pred_lr):.4f}")

# 分类报告
print("\\n分类报告:")
print(classification_report(y_test, y_pred_lr,
                            target_names=['未流失', '流失']))`,
          exercise: {
            id: 'ex6-1-1',
            lessonId: 'les6-1-1',
            description: '编写一个函数 `evaluate_classifier(y_true, y_pred)`，计算并返回分类评估指标字典，包含：准确率、精确率、召回率、F1分数。再编写函数 `compare_models(results_dict)`，接收多个模型的评估结果字典，返回对比DataFrame。',
            initialCode: `from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score
import pandas as pd

def evaluate_classifier(y_true, y_pred):
    # 请在此处编写代码
    pass

def compare_models(results_dict):
    # 请在此处编写代码
    pass

# 测试
y_true = [1, 0, 1, 1, 0, 1, 0, 0, 1, 0]
y_pred_dt = [1, 0, 1, 0, 0, 1, 0, 1, 1, 0]
y_pred_lr = [1, 0, 1, 1, 0, 0, 0, 0, 1, 0]

results = {
    '决策树': evaluate_classifier(y_true, y_pred_dt),
    '逻辑回归': evaluate_classifier(y_true, y_pred_lr)
}
print(compare_models(results))`,
            hints: [
              '使用 sklearn.metrics 中的 accuracy_score, precision_score, recall_score, f1_score',
              'compare_models 将每个模型的结果字典转为DataFrame行'
            ],
            referenceAnswer: `from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score
import pandas as pd

def evaluate_classifier(y_true, y_pred):
    return {
        '准确率': round(accuracy_score(y_true, y_pred), 4),
        '精确率': round(precision_score(y_true, y_pred, zero_division=0), 4),
        '召回率': round(recall_score(y_true, y_pred, zero_division=0), 4),
        'F1分数': round(f1_score(y_true, y_pred, zero_division=0), 4),
    }

def compare_models(results_dict):
    return pd.DataFrame(results_dict).T`,
            testCases: [
              { input: "result = evaluate_classifier([1,0,1], [1,0,0]); print(result['准确率'])", expectedOutput: '0.6667' },
              { input: "results = {'A': evaluate_classifier([1,0,1], [1,0,1])}; df = compare_models(results); print(df.loc['A', '准确率'])", expectedOutput: '1.0' }
            ]
          }
        }
      ]
    },
    {
      id: 'ch6-2',
      moduleId: 'data-mining',
      title: '聚类分析',
      order: 2,
      lessons: [
        {
          id: 'les6-2-1',
          chapterId: 'ch6-2',
          title: 'K-Means与层次聚类',
          type: 'both',
          content: `## K-Means与层次聚类

聚类是无监督学习方法，将相似的数据点分组到同一簇中，在客户细分、异常检测等场景中应用广泛。

### K-Means聚类

K-Means是最常用的聚类算法，目标是将n个数据点划分为K个簇。

**算法步骤：**
1. 随机选择K个初始聚类中心
2. 将每个数据点分配到最近的聚类中心
3. 重新计算每个簇的中心（均值）
4. 重复步骤2-3直到收敛

**关键参数：**
- \`n_clusters\`：簇的数量K
- \`init='k-means++'\`：智能初始化（默认）
- \`n_init\`：运行次数，取最优结果
- \`max_iter\`：最大迭代次数

**确定K值：**
- **肘部法则（Elbow Method）**：绘制K与SSE的关系图，选择拐点
- **轮廓系数（Silhouette Score）**：衡量聚类质量，范围[-1, 1]，越大越好

**优点：** 简单高效、适合大规模数据
**缺点：** 需要预设K值、对初始中心敏感、只能发现球形簇

### 层次聚类

层次聚类通过计算簇间距离逐步合并或分裂，形成树状结构（树状图dendrogram）。

**聚合层次聚类（自底向上）：**
1. 每个点初始为一个簇
2. 合并最近的两个簇
3. 重复直到只剩一个簇

**簇间距离度量：**
- 单链接（single）：最近点距离
- 全链接（complete）：最远点距离
- 平均链接（average）：平均距离
- Ward法：最小化簇内方差增加

**优点：** 不需要预设K值、可视化直观
**缺点：** 计算复杂度高、不适合大数据

### 聚类评估

- **轮廓系数**：衡量簇内紧密度和簇间分离度
- **Calinski-Harabasz指数**：簇间/簇内方差比
- **Davies-Bouldin指数**：簇内离散度/簇间距离比`,
          codeExample: `import numpy as np
import pandas as pd
from sklearn.cluster import KMeans, AgglomerativeClustering
from sklearn.metrics import silhouette_score
from sklearn.preprocessing import StandardScaler
from sklearn.datasets import make_blobs
import matplotlib.pyplot as plt

# 生成客户数据
np.random.seed(42)
X, y_true = make_blobs(n_samples=300, centers=4,
                        cluster_std=1.5, random_state=42)
df = pd.DataFrame(X, columns=['年消费额', '访问频次'])

# 数据标准化
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# === 肘部法则确定K ===
sse = []
silhouette_scores = []
K_range = range(2, 9)

for k in K_range:
    km = KMeans(n_clusters=k, random_state=42, n_init=10)
    km.fit(X_scaled)
    sse.append(km.inertia_)
    silhouette_scores.append(silhouette_score(X_scaled, km.labels_))

print("K值选择:")
for k, s, sil in zip(K_range, sse, silhouette_scores):
    print(f"  K={k}: SSE={s:.2f}, 轮廓系数={sil:.4f}")

# === K-Means聚类 ===
best_k = 4
kmeans = KMeans(n_clusters=best_k, random_state=42, n_init=10)
df['KMeans簇'] = kmeans.fit_predict(X_scaled)

print(f"\\nK-Means聚类结果 (K={best_k}):")
print(df['KMeans簇'].value_counts().sort_index())
print(f"轮廓系数: {silhouette_score(X_scaled, df['KMeans簇']):.4f}")

# 簇中心分析
cluster_stats = df.groupby('KMeans簇')[['年消费额', '访问频次']].mean()
print(f"\\n各簇特征均值:")
print(cluster_stats.round(2))

# === 层次聚类 ===
hc = AgglomerativeClustering(n_clusters=4, linkage='ward')
df['HC簇'] = hc.fit_predict(X_scaled)

print(f"\\n层次聚类结果:")
print(df['HC簇'].value_counts().sort_index())
print(f"轮廓系数: {silhouette_score(X_scaled, df['HC簇']):.4f}")

# 可视化
fig, axes = plt.subplots(1, 2, figsize=(14, 6))

for cluster in range(best_k):
    mask = df['KMeans簇'] == cluster
    axes[0].scatter(df.loc[mask, '年消费额'], df.loc[mask, '访问频次'],
                    label=f'簇{cluster}', alpha=0.6, s=50)
centers = scaler.inverse_transform(kmeans.cluster_centers_)
axes[0].scatter(centers[:, 0], centers[:, 1], c='black', marker='X',
                s=200, label='中心点')
axes[0].set_title('K-Means聚类')
axes[0].legend()

for cluster in range(best_k):
    mask = df['HC簇'] == cluster
    axes[1].scatter(df.loc[mask, '年消费额'], df.loc[mask, '访问频次'],
                    label=f'簇{cluster}', alpha=0.6, s=50)
axes[1].set_title('层次聚类')
axes[1].legend()

plt.tight_layout()
plt.show()`,
          exercise: {
            id: 'ex6-2-1',
            lessonId: 'les6-2-1',
            description: '编写一个函数 `find_optimal_k(X, k_range)`，使用肘部法则和轮廓系数确定最优K值。返回包含每个K值的SSE和轮廓系数的DataFrame，以及推荐的最优K值（轮廓系数最大的K）。',
            initialCode: `import numpy as np
import pandas as pd
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score
from sklearn.preprocessing import StandardScaler

def find_optimal_k(X, k_range=range(2, 9)):
    # 请在此处编写代码
    pass

# 测试
from sklearn.datasets import make_blobs
X, _ = make_blobs(n_samples=200, centers=3, random_state=42)
result = find_optimal_k(X)
print(result['metrics'])
print(f"推荐K值: {result['best_k']}")`,
            hints: [
              '遍历k_range，对每个K值训练KMeans，记录inertia_和silhouette_score',
              '最优K为轮廓系数最大的K值'
            ],
            referenceAnswer: `import numpy as np
import pandas as pd
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score
from sklearn.preprocessing import StandardScaler

def find_optimal_k(X, k_range=range(2, 9)):
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)
    metrics = []
    for k in k_range:
        km = KMeans(n_clusters=k, random_state=42, n_init=10)
        labels = km.fit_predict(X_scaled)
        sse = km.inertia_
        sil = silhouette_score(X_scaled, labels)
        metrics.append({'K': k, 'SSE': round(sse, 2), '轮廓系数': round(sil, 4)})
    df = pd.DataFrame(metrics)
    best_k = df.loc[df['轮廓系数'].idxmax(), 'K']
    return {'metrics': df, 'best_k': best_k}`,
            testCases: [
              { input: "from sklearn.datasets import make_blobs; X, _ = make_blobs(n_samples=200, centers=3, random_state=42); result = find_optimal_k(X); print(result['best_k'])", expectedOutput: '3' }
            ]
          }
        }
      ]
    },
    {
      id: 'ch6-3',
      moduleId: 'data-mining',
      title: '关联规则',
      order: 3,
      lessons: [
        {
          id: 'les6-3-1',
          chapterId: 'ch6-3',
          title: 'Apriori算法与关联分析',
          type: 'both',
          content: `## Apriori算法与关联分析

关联规则挖掘用于发现数据中项之间的关联关系，最经典的应用是购物篮分析——"买A的人也倾向于买B"。

### 基本概念

**1. 项集（Itemset）**
- 包含0个或多个项的集合
- 如 {面包, 牛奶, 鸡蛋}
- 频繁项集：支持度≥最小支持度阈值的项集

**2. 支持度（Support）**
- 定义：包含该项集的事务占总事务的比例
- 公式：Support(A) = P(A) = count(A) / N
- 含义：项集出现的频繁程度

**3. 置信度（Confidence）**
- 定义：包含A的事务中也包含B的比例
- 公式：Confidence(A→B) = P(B|A) = Support(A∪B) / Support(A)
- 含义：A出现时B也出现的概率

**4. 提升度（Lift）**
- 定义：置信度与B的先验概率之比
- 公式：Lift(A→B) = Confidence(A→B) / Support(B)
- 含义：A的出现对B出现概率的提升程度
- Lift > 1：正相关；Lift = 1：无关；Lift < 1：负相关

### Apriori算法

Apriori算法利用"频繁项集的子集也必须是频繁的"这一先验性质，逐层搜索：

1. 扫描数据，找出所有频繁1-项集
2. 由频繁k-项集生成候选(k+1)-项集
3. 扫描数据，计算候选项集的支持度
4. 删除不满足最小支持度的候选项集
5. 重复直到无法生成新的频繁项集

### Python实现

使用mlxtend库的apriori和association_rules函数：
- \`apriori(df, min_support)\`：挖掘频繁项集
- \`association_rules(df, metric, min_threshold)\`：生成关联规则`,
          codeExample: `# 需要安装: pip install mlxtend
import pandas as pd
from mlxtend.frequent_patterns import apriori, association_rules

# 创建购物篮数据
transactions = [
    ['面包', '牛奶', '鸡蛋'],
    ['面包', '牛奶'],
    ['牛奶', '鸡蛋', '啤酒'],
    ['面包', '啤酒'],
    ['面包', '牛奶', '鸡蛋', '啤酒'],
    ['鸡蛋', '啤酒'],
    ['面包', '牛奶', '鸡蛋'],
    ['面包', '牛奶'],
    ['牛奶', '鸡蛋'],
    ['面包', '牛奶', '啤酒'],
]

# 转换为one-hot编码
from mlxtend.preprocessing import TransactionEncoder
te = TransactionEncoder()
te_ary = te.fit(transactions).transform(transactions)
df = pd.DataFrame(te_ary, columns=te.columns_)

print("购物篮数据（前5行）:")
print(df.head())

# 挖掘频繁项集
frequent_items = apriori(df, min_support=0.3, use_colnames=True)
frequent_items['长度'] = frequent_items['itemsets'].apply(len)

print("\\n频繁项集:")
print(frequent_items.sort_values('support', ascending=False))

# 生成关联规则
rules = association_rules(frequent_items, metric='confidence',
                           min_threshold=0.5)

print("\\n关联规则:")
print(rules[['antecedents', 'consequents', 'support',
             'confidence', 'lift']].round(4))

# 筛选强关联规则
strong_rules = rules[(rules['lift'] > 1.2) &
                     (rules['confidence'] > 0.6)]

print("\\n强关联规则（lift>1.2, confidence>0.6）:")
for _, row in strong_rules.iterrows():
    ant = ', '.join(row['antecedents'])
    con = ', '.join(row['consequents'])
    print(f"  {ant} → {con}")
    print(f"    支持度: {row['support']:.4f}, "
          f"置信度: {row['confidence']:.4f}, "
          f"提升度: {row['lift']:.4f}")`,
          exercise: {
            id: 'ex6-3-1',
            lessonId: 'les6-3-1',
            description: '编写一个函数 `analyze_associations(df_onehot, min_support, min_confidence, min_lift)`，对one-hot编码的购物篮数据进行关联分析。返回满足条件的关联规则DataFrame，包含前件、后件、支持度、置信度和提升度，按提升度降序排列。',
            initialCode: `import pandas as pd
from mlxtend.frequent_patterns import apriori, association_rules

def analyze_associations(df_onehot, min_support=0.3, min_confidence=0.5, min_lift=1.0):
    # 请在此处编写代码
    pass

# 测试
from mlxtend.preprocessing import TransactionEncoder
transactions = [
    ['A', 'B', 'C'],
    ['A', 'B'],
    ['B', 'C'],
    ['A', 'C'],
    ['A', 'B', 'C'],
]
te = TransactionEncoder()
df = pd.DataFrame(te.fit(transactions).transform(transactions), columns=te.columns_)
result = analyze_associations(df, 0.3, 0.5, 1.0)
print(result)`,
            hints: [
              '先用 apriori 找频繁项集，再用 association_rules 生成规则',
              '用布尔条件筛选 confidence >= min_confidence 和 lift >= min_lift'
            ],
            referenceAnswer: `import pandas as pd
from mlxtend.frequent_patterns import apriori, association_rules

def analyze_associations(df_onehot, min_support=0.3, min_confidence=0.5, min_lift=1.0):
    frequent_items = apriori(df_onehot, min_support=min_support, use_colnames=True)
    rules = association_rules(frequent_items, metric='confidence',
                               min_threshold=min_confidence)
    rules = rules[rules['lift'] >= min_lift]
    result = rules[['antecedents', 'consequents', 'support',
                     'confidence', 'lift']].sort_values('lift', ascending=False)
    return result.reset_index(drop=True)`,
            testCases: [
              { input: "from mlxtend.preprocessing import TransactionEncoder; te = TransactionEncoder(); t = [['A','B'],['A','B'],['A','C']]; df = pd.DataFrame(te.fit(t).transform(t), columns=te.columns_); result = analyze_associations(df, 0.3, 0.5, 0.5); print(len(result) >= 0)", expectedOutput: 'True' }
            ]
          }
        }
      ]
    },
    {
      id: 'ch6-4',
      moduleId: 'data-mining',
      title: '推荐系统基础',
      order: 4,
      lessons: [
        {
          id: 'les6-4-1',
          chapterId: 'ch6-4',
          title: '协同过滤与内容推荐',
          type: 'both',
          content: `## 协同过滤与内容推荐

推荐系统是数据挖掘在商业中最成功的应用之一，帮助用户从海量信息中发现感兴趣的内容。

### 推荐系统分类

**1. 协同过滤（Collaborative Filtering）**
- 基于用户行为（评分、购买等）发现相似性
- 不需要内容信息
- 分为基于用户和基于物品两种

**2. 基于内容的推荐（Content-Based）**
- 基于物品特征和用户偏好匹配
- 需要物品的特征描述
- 不存在冷启动问题（新物品）

**3. 混合推荐**
- 结合多种推荐策略
- 通常效果最好

### 基于用户的协同过滤

核心思想：找到与目标用户相似的用户，推荐这些相似用户喜欢的物品。

**步骤：**
1. 计算用户之间的相似度（余弦相似度、皮尔逊相关系数等）
2. 找到与目标用户最相似的K个用户
3. 根据相似用户的评分预测目标用户对未评分物品的评分
4. 推荐预测评分最高的物品

### 基于物品的协同过滤

核心思想：如果用户喜欢物品A，则推荐与A相似的物品B。

**优点：**
- 物品相似度可以离线计算
- 物品数量通常远少于用户数量
- Amazon最早使用此方法

### 余弦相似度

最常用的相似度计算方法：

sim(A, B) = (A · B) / (||A|| × ||B||)

值域[-1, 1]，1表示完全相同，0表示无关，-1表示完全相反。

### 评估指标

- **RMSE**：均方根误差
- **MAE**：平均绝对误差
- **Precision@K**：前K个推荐中用户喜欢的比例
- **NDCG**：考虑排序位置的评估指标`,
          codeExample: `import numpy as np
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity

# 用户-物品评分矩阵
ratings_dict = {
    '用户1': {'电影A': 5, '电影B': 3, '电影C': 4, '电影D': 0, '电影E': 0},
    '用户2': {'电影A': 4, '电影B': 0, '电影C': 0, '电影D': 4, '电影E': 0},
    '用户3': {'电影A': 0, '电影B': 0, '电影C': 5, '电影D': 0, '电影E': 3},
    '用户4': {'电影A': 0, '电影B': 4, '电影C': 0, '电影D': 5, '电影E': 4},
    '用户5': {'电影A': 3, '电影B': 0, '电影C': 0, '电影D': 0, '电影E': 5},
}

df = pd.DataFrame(ratings_dict).T
df = df.replace(0, np.nan)  # 0表示未评分

print("评分矩阵:")
print(df)

# 计算用户相似度
df_filled = df.fillna(0)
user_sim = pd.DataFrame(
    cosine_similarity(df_filled),
    index=df.index, columns=df.index
)

print("\\n用户相似度矩阵:")
print(user_sim.round(3))

# 基于用户的协同过滤推荐
def recommend_user_based(user, df, user_sim, k=2, n=3):
    """为指定用户推荐物品"""
    # 找到最相似的K个用户
    sim_users = user_sim[user].drop(user).nlargest(k)

    print(f"\\n为{user}推荐:")
    print(f"  最相似用户: {dict(sim_users.round(3))}")

    recommendations = {}
    for item in df.columns:
        if pd.isna(df.loc[user, item]):  # 用户未评分的物品
            # 加权平均预测评分
            numerator = 0
            denominator = 0
            for sim_user, sim_score in sim_users.items():
                if not pd.isna(df.loc[sim_user, item]):
                    numerator += sim_score * df.loc[sim_user, item]
                    denominator += abs(sim_score)
            if denominator > 0:
                recommendations[item] = numerator / denominator

    # 排序并返回Top-N
    sorted_recs = sorted(recommendations.items(), key=lambda x: x[1],
                          reverse=True)[:n]
    for item, score in sorted_recs:
        print(f"  推荐{item}，预测评分: {score:.2f}")
    return sorted_recs

# 为用户1推荐
recs = recommend_user_based('用户1', df, user_sim)

# 计算物品相似度
item_sim = pd.DataFrame(
    cosine_similarity(df_filled.T),
    index=df.columns, columns=df.columns
)

print(f"\\n物品相似度矩阵:")
print(item_sim.round(3))

# 基于物品的推荐
def recommend_item_based(user, df, item_sim, n=3):
    """基于物品的协同过滤推荐"""
    user_ratings = df.loc[user].dropna()
    recommendations = {}

    for item in df.columns:
        if pd.isna(df.loc[user, item]):
            pred = 0
            sim_sum = 0
            for rated_item, rating in user_ratings.items():
                sim = item_sim.loc[item, rated_item]
                pred += sim * rating
                sim_sum += abs(sim)
            if sim_sum > 0:
                recommendations[item] = pred / sim_sum

    sorted_recs = sorted(recommendations.items(), key=lambda x: x[1],
                          reverse=True)[:n]
    return sorted_recs

recs_item = recommend_item_based('用户1', df, item_sim)
print(f"\\n基于物品的推荐:")
for item, score in recs_item:
    print(f"  推荐{item}，预测评分: {score:.2f}")`,
          exercise: {
            id: 'ex6-4-1',
            lessonId: 'les6-4-1',
            description: "编写一个函数 `compute_recommendations(rating_matrix, user, method='user', k=2, n=3)`，实现基于用户或基于物品的协同过滤推荐。rating_matrix是用户-物品评分DataFrame（NaN表示未评分），method为\"user\"或\"item\"。返回推荐物品及预测评分的列表。",
            initialCode: `import numpy as np
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity

def compute_recommendations(rating_matrix, user, method='user', k=2, n=3):
    # 请在此处编写代码
    pass

# 测试
df = pd.DataFrame({
    '电影A': [5, 4, np.nan, np.nan, 3],
    '电影B': [3, np.nan, np.nan, 4, np.nan],
    '电影C': [4, np.nan, 5, np.nan, np.nan],
    '电影D': [np.nan, 4, np.nan, 5, np.nan],
    '电影E': [np.nan, np.nan, 3, 4, 5],
}, index=['用户1', '用户2', '用户3', '用户4', '用户5'])

print("基于用户:")
print(compute_recommendations(df, '用户1', method='user'))
print("\\n基于物品:")
print(compute_recommendations(df, '用户1', method='item'))`,
            hints: [
              '基于用户：计算用户间余弦相似度，找最相似的K个用户，加权预测评分',
              '基于物品：计算物品间余弦相似度，用用户已评分物品的相似度加权预测'
            ],
            referenceAnswer: `import numpy as np
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity

def compute_recommendations(rating_matrix, user, method='user', k=2, n=3):
    df_filled = rating_matrix.fillna(0)
    if method == 'user':
        sim_matrix = pd.DataFrame(
            cosine_similarity(df_filled),
            index=rating_matrix.index, columns=rating_matrix.index
        )
        sim_users = sim_matrix[user].drop(user).nlargest(k)
        recommendations = {}
        for item in rating_matrix.columns:
            if pd.isna(rating_matrix.loc[user, item]):
                num, den = 0, 0
                for su, ss in sim_users.items():
                    if not pd.isna(rating_matrix.loc[su, item]):
                        num += ss * rating_matrix.loc[su, item]
                        den += abs(ss)
                if den > 0:
                    recommendations[item] = round(num / den, 2)
    else:
        sim_matrix = pd.DataFrame(
            cosine_similarity(df_filled.T),
            index=rating_matrix.columns, columns=rating_matrix.columns
        )
        user_ratings = rating_matrix.loc[user].dropna()
        recommendations = {}
        for item in rating_matrix.columns:
            if pd.isna(rating_matrix.loc[user, item]):
                num, den = 0, 0
                for ri, rv in user_ratings.items():
                    s = sim_matrix.loc[item, ri]
                    num += s * rv
                    den += abs(s)
                if den > 0:
                    recommendations[item] = round(num / den, 2)
    sorted_recs = sorted(recommendations.items(), key=lambda x: x[1], reverse=True)[:n]
    return sorted_recs`,
            testCases: [
              { input: "df = pd.DataFrame({'A': [5,4], 'B': [3,np.nan]}, index=['u1','u2']); result = compute_recommendations(df, 'u1', 'user'); print(type(result).__name__)", expectedOutput: 'list' }
            ]
          }
        }
      ]
    },
    {
      id: 'ch6-5',
      moduleId: 'data-mining',
      title: '商务案例分析',
      order: 5,
      lessons: [
        {
          id: 'les6-5-1',
          chapterId: 'ch6-5',
          title: '综合实战项目',
          type: 'both',
          content: `## 综合实战项目

本节通过一个完整的商务数据分析案例，将前面所学的所有知识综合应用。

### 项目：电商客户价值分析

**业务目标：**
1. 客户细分：识别不同价值的客户群体
2. 流失预测：预测可能流失的客户
3. 精准营销：根据客户特征制定营销策略

### 分析流程

**1. 数据理解与准备**
- 明确数据来源和字段含义
- 处理缺失值和异常值
- 特征工程：创建衍生变量

**2. 探索性数据分析（EDA）**
- 描述性统计
- 分布分析
- 相关性分析
- 可视化

**3. RFM模型构建**
RFM是客户价值分析的经典模型：
- **R（Recency）**：最近一次购买距今多少天
- **F（Frequency）**：购买频次
- **M（Monetary）**：消费总金额

**4. 客户聚类**
- 基于RFM特征进行K-Means聚类
- 确定最优K值
- 分析各簇特征，定义客户类型

**5. 流失预测**
- 构建特征（RFM + 行为特征）
- 训练分类模型
- 评估模型性能
- 识别关键影响因素

**6. 策略建议**
- 根据分析结果提出业务建议
- 设计差异化营销方案
- 制定客户维护策略

### 项目总结要点

- 数据质量决定分析质量
- 业务理解是分析的前提
- 简单模型往往更实用
- 结果要能转化为行动建议`,
          codeExample: `import numpy as np
import pandas as pd
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report
import matplotlib.pyplot as plt

# === 1. 生成模拟数据 ===
np.random.seed(42)
n_customers = 500

df = pd.DataFrame({
    'customer_id': [f'C{i:04d}' for i in range(n_customers)],
    'recency': np.random.exponential(30, n_customers).astype(int),  # 天
    'frequency': np.random.poisson(8, n_customers),  # 次数
    'monetary': np.random.gamma(5, 200, n_customers).round(2),  # 金额
    'avg_order_value': np.random.uniform(50, 500, n_customers).round(2),
    'tenure_months': np.random.randint(1, 60, n_customers),
    'complaints': np.random.poisson(0.5, n_customers),
})

# 模拟流失标签
churn_prob = 1 / (1 + np.exp(-(0.03 * df['recency'] - 0.1 * df['frequency']
                                - 0.001 * df['monetary'] + 0.5 * df['complaints'])))
df['churned'] = (np.random.random(n_customers) < churn_prob).astype(int)

print("数据概览:")
print(df.describe().round(2))
print(f"\\n流失率: {df['churned'].mean():.2%}")

# === 2. RFM分析 ===
# RFM评分（5分制）
df['R_score'] = pd.qcut(df['recency'], 5, labels=[5, 4, 3, 2, 1]).astype(int)
df['F_score'] = pd.qcut(df['frequency'].rank(method='first'), 5,
                         labels=[1, 2, 3, 4, 5]).astype(int)
df['M_score'] = pd.qcut(df['monetary'].rank(method='first'), 5,
                         labels=[1, 2, 3, 4, 5]).astype(int)
df['RFM_total'] = df['R_score'] + df['F_score'] + df['M_score']

print("\\nRFM评分分布:")
print(df['RFM_total'].describe())

# === 3. 客户聚类 ===
rfm_features = df[['R_score', 'F_score', 'M_score']]
scaler = StandardScaler()
rfm_scaled = scaler.fit_transform(rfm_features)

kmeans = KMeans(n_clusters=4, random_state=42, n_init=10)
df['segment'] = kmeans.fit_predict(rfm_scaled)

# 分析各簇特征
segment_stats = df.groupby('segment').agg({
    'recency': 'mean',
    'frequency': 'mean',
    'monetary': 'mean',
    'churned': 'mean',
    'customer_id': 'count'
}).round(2)
segment_stats.columns = ['平均R(天)', '平均F(次)', '平均M(元)', '流失率', '客户数']

print("\\n客户分群特征:")
print(segment_stats)

# 定义客户类型
segment_names = {
    0: '一般客户',
    1: '高价值客户',
    2: '流失风险客户',
    3: '潜力客户'
}
df['segment_name'] = df['segment'].map(segment_names)

# === 4. 流失预测 ===
features = ['recency', 'frequency', 'monetary', 'avg_order_value',
            'tenure_months', 'complaints']
X = df[features]
y = df['churned']

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.3, random_state=42, stratify=y
)

model = LogisticRegression(random_state=42, max_iter=1000)
model.fit(X_train, y_train)
y_pred = model.predict(X_test)

print("\\n流失预测模型:")
print(classification_report(y_test, y_pred,
                            target_names=['未流失', '流失']))

# 特征重要性
importance = pd.Series(np.abs(model.coef_[0]), index=features)
print("\\n特征重要性:")
for feat, imp in importance.sort_values(ascending=False).items():
    print(f"  {feat}: {imp:.4f}")`,
          exercise: {
            id: 'ex6-5-1',
            lessonId: 'les6-5-1',
            description: '编写一个函数 `rfm_analysis(df, customer_col, date_col, amount_col, reference_date)`，计算每个客户的RFM指标。R为最近购买距reference_date的天数，F为购买次数，M为总金额。返回包含RFM指标和评分的DataFrame。',
            initialCode: `import pandas as pd
import numpy as np

def rfm_analysis(df, customer_col, date_col, amount_col, reference_date):
    # 请在此处编写代码
    pass

# 测试
orders = pd.DataFrame({
    'customer_id': ['C001', 'C001', 'C002', 'C002', 'C002', 'C003'],
    'order_date': pd.to_datetime(['2024-01-15', '2024-03-20',
                                   '2024-02-10', '2024-04-05',
                                   '2024-05-15', '2024-01-01']),
    'amount': [100, 200, 150, 300, 250, 500]
})
result = rfm_analysis(orders, 'customer_id', 'order_date', 'amount',
                       pd.Timestamp('2024-06-01'))
print(result)`,
            hints: [
              'R = (reference_date - 每个客户最近购买日期).days，F = 每个客户订单数，M = 每个客户总金额',
              '使用 groupby + agg 计算，R用max(date)，F用count，M用sum'
            ],
            referenceAnswer: `import pandas as pd
import numpy as np

def rfm_analysis(df, customer_col, date_col, amount_col, reference_date):
    rfm = df.groupby(customer_col).agg(
        last_date=(date_col, 'max'),
        frequency=(date_col, 'count'),
        monetary=(amount_col, 'sum')
    )
    rfm['recency'] = (reference_date - rfm['last_date']).dt.days
    rfm['R_score'] = pd.qcut(rfm['recency'], 5, labels=[5,4,3,2,1], duplicates='drop').astype(int)
    rfm['F_score'] = pd.qcut(rfm['frequency'].rank(method='first'), 5,
                               labels=[1,2,3,4,5], duplicates='drop').astype(int)
    rfm['M_score'] = pd.qcut(rfm['monetary'].rank(method='first'), 5,
                               labels=[1,2,3,4,5], duplicates='drop').astype(int)
    rfm['RFM_total'] = rfm['R_score'] + rfm['F_score'] + rfm['M_score']
    return rfm.drop(columns=['last_date'])`,
            testCases: [
              { input: "orders = pd.DataFrame({'cid': ['A','A','B'], 'date': pd.to_datetime(['2024-01-01','2024-03-01','2024-02-01']), 'amt': [100,200,300]}); result = rfm_analysis(orders, 'cid', 'date', 'amt', pd.Timestamp('2024-06-01')); print(result.loc['A', 'frequency'])", expectedOutput: '2' }
            ]
          }
        }
      ]
    }
  ]
};
