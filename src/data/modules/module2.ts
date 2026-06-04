import type { Module } from '../../types';

export const module2: Module = {
  id: 'data-processing',
  title: '数据处理与分析',
  description: '学习使用NumPy和Pandas进行高效的数据处理与分析，掌握数据清洗、合并、分组等核心技能。',
  icon: '📊',
  order: 2,
  chapters: [
    {
      id: 'ch2-1',
      moduleId: 'data-processing',
      title: 'NumPy基础',
      order: 1,
      lessons: [
        {
          id: 'les2-1-1',
          chapterId: 'ch2-1',
          title: 'ndarray创建与索引',
          type: 'both',
          content: `## ndarray创建与索引

NumPy（Numerical Python）是Python科学计算的基础库，其核心数据结构是ndarray（N-dimensional array，多维数组）。ndarray与Python列表相比，具有以下优势：

- **同质数据类型**：所有元素类型相同，内存连续存储
- **向量化运算**：无需循环即可对整个数组进行运算
- **广播机制**：不同形状数组之间的运算
- **高效性能**：底层使用C语言实现，运算速度远超纯Python

### 创建ndarray

常用创建方式：
- \`np.array()\`：从列表或元组创建
- \`np.zeros()\`：创建全零数组
- \`np.ones()\`：创建全1数组
- \`np.arange()\`：创建等差数列
- \`np.linspace()\`：创建指定数量的等间距数列
- \`np.random\`：创建随机数组

### 数组属性

- \`shape\`：数组形状（各维度大小）
- \`dtype\`：数据类型
- \`ndim\`：维度数
- \`size\`：元素总数

### 索引与切片

NumPy数组的索引与Python列表类似，但支持多维索引：
- **基本索引**：\`arr[0]\`、\`arr[0, 1]\`
- **切片**：\`arr[1:3]\`、\`arr[:, 0:2]\`
- **布尔索引**：\`arr[arr > 0]\`
- **花式索引**：\`arr[[0, 2, 4]]\`

注意：NumPy切片返回的是视图（view）而非副本，修改切片会影响原数组。如需副本，使用\`.copy()\`。`,
          codeExample: `import numpy as np

# 创建数组
a = np.array([1, 2, 3, 4, 5])
b = np.array([[1, 2, 3], [4, 5, 6]])

print(f"一维数组: {a}")
print(f"二维数组:\\n{b}")
print(f"形状: {a.shape}, {b.shape}")
print(f"维度: {a.ndim}, {b.ndim}")
print(f"类型: {a.dtype}")

# 特殊数组
zeros = np.zeros((3, 4))
ones = np.ones((2, 3))
range_arr = np.arange(0, 10, 2)
linspace_arr = np.linspace(0, 1, 5)

print(f"\\n全零数组:\\n{zeros}")
print(f"等差数列: {range_arr}")
print(f"等间距: {linspace_arr}")

# 随机数组
rng = np.random.default_rng(42)
rand_arr = rng.random((2, 3))
rand_int = rng.integers(0, 10, size=5)
print(f"\\n随机数组:\\n{rand_arr}")
print(f"随机整数: {rand_int}")

# 索引与切片
arr = np.array([[1, 2, 3, 4],
                [5, 6, 7, 8],
                [9, 10, 11, 12]])
print(f"\\n第1行: {arr[0]}")
print(f"第2行第3列: {arr[1, 2]}")
print(f"前2行前2列:\\n{arr[:2, :2]}")

# 布尔索引
data = np.array([1, -2, 3, -4, 5])
print(f"\\n正数: {data[data > 0]}")

# 花式索引
print(f"第0行和第2行:\\n{arr[[0, 2]]}")`,
          exercise: {
            id: 'ex2-1-1',
            lessonId: 'les2-1-1',
            description: '编写一个函数 `create_matrix(n)`，使用NumPy创建一个n×n的矩阵，对角线元素为1，其余为0（单位矩阵）。然后编写另一个函数 `normalize_matrix(arr)`，将矩阵的每列归一化到[0,1]范围：`(x - min) / (max - min)`。',
            initialCode: `import numpy as np

def create_identity(n):
    # 请在此处编写代码
    pass

def normalize_columns(arr):
    # 请在此处编写代码
    pass

# 测试
I = create_identity(3)
print(I)
arr = np.array([[1, 10], [3, 30], [5, 50]], dtype=float)
print(normalize_columns(arr))`,
            hints: [
              '单位矩阵可以用 np.eye(n) 或 np.identity(n) 创建',
              '归一化：对每列求 min 和 max，用 arr.min(axis=0) 和 arr.max(axis=0)，注意保持形状以便广播'
            ],
            referenceAnswer: `import numpy as np

def create_identity(n):
    return np.eye(n)

def normalize_columns(arr):
    col_min = arr.min(axis=0)
    col_max = arr.max(axis=0)
    return (arr - col_min) / (col_max - col_min)`,
            testCases: [
              { input: 'create_identity(3)', expectedOutput: '[[1. 0. 0.]\\n [0. 1. 0.]\\n [0. 0. 1.]]' },
              { input: 'normalize_columns(np.array([[1.0, 10.0], [3.0, 30.0], [5.0, 50.0]]))', expectedOutput: '[[0.  0. ]\\n [0.5 0.5]\\n [1.  1. ]]' }
            ]
          }
        },
        {
          id: 'les2-1-2',
          chapterId: 'ch2-1',
          title: '数组运算与广播',
          type: 'both',
          content: `## 数组运算与广播

NumPy的强大之处在于其高效的数组运算能力，无需编写循环即可对整个数组进行数学运算。

### 逐元素运算

NumPy支持基本的算术运算符，这些运算都是逐元素进行的：
- \`+\`、\`-\`、\`*\`、\`/\`：加减乘除
- \`**\`：幂运算
- \`//\`：整除
- \`%\`：取模

### 通用函数（ufunc）

NumPy提供了大量通用函数，对数组进行逐元素运算：
- \`np.sqrt()\`、\`np.exp()\`、\`np.log()\`
- \`np.sin()\`、\`np.cos()\`、\`np.tan()\`
- \`np.abs()\`、\`np.round()\`、\`np.floor()\`
- \`np.maximum()\`、\`np.minimum()\`

### 广播机制

广播是NumPy处理不同形状数组运算的机制。当两个数组形状不同时，NumPy会自动扩展较小的数组使其与较大的数组形状匹配。

**广播规则：**
1. 如果两个数组的维度数不同，较小维度数组的形状在左侧补1
2. 如果两个数组在某个维度上的大小不同，大小为1的维度会被扩展
3. 如果两个数组在某个维度上大小既不相同也不为1，则报错

### 聚合运算

- \`arr.sum()\`：求和
- \`arr.mean()\`：平均值
- \`arr.std()\`：标准差
- \`arr.max()\` / \`arr.min()\`：最大/最小值
- \`arr.argmax()\` / \`arr.argmin()\`：最大/最小值索引

聚合运算可以通过 \`axis\` 参数指定沿哪个轴进行。`,
          codeExample: `import numpy as np

# 逐元素运算
a = np.array([1, 2, 3, 4])
b = np.array([10, 20, 30, 40])

print(f"a + b = {a + b}")
print(f"a * b = {a * b}")
print(f"a ** 2 = {a ** 2}")

# 通用函数
print(f"\\nsqrt(a) = {np.sqrt(a)}")
print(f"exp(a) = {np.exp(a)}")

# 广播机制
# 标量与数组
print(f"\\na + 100 = {a + 100}")
print(f"a * 2 = {a * 2}")

# 不同形状数组
matrix = np.array([[1, 2, 3],
                   [4, 5, 6]])
row = np.array([10, 20, 30])
col = np.array([[100], [200]])

print(f"\\n矩阵 + 行向量:\\n{matrix + row}")
print(f"矩阵 + 列向量:\\n{matrix + col}")

# 聚合运算
data = np.array([[1, 2, 3],
                 [4, 5, 6]])
print(f"\\n总和: {data.sum()}")
print(f"按列求和: {data.sum(axis=0)}")
print(f"按行求和: {data.sum(axis=1)}")
print(f"平均值: {data.mean()}")
print(f"标准差: {data.std():.4f}")
print(f"最大值索引: {data.argmax()}")

# 条件运算
scores = np.array([85, 92, 78, 95, 60, 88])
print(f"\\n及格的分数: {scores[scores >= 60]}")
print(f"优秀数量: {(scores >= 90).sum()}")`,
          exercise: {
            id: 'ex2-1-2',
            lessonId: 'les2-1-2',
            description: '编写一个函数 `standardize(arr)`，对二维数组的每列进行标准化（Z-score标准化）：`(x - mean) / std`。返回标准化后的数组。处理std为0的情况（当某列std为0时，该列保持不变）。',
            initialCode: `import numpy as np

def standardize(arr):
    # 请在此处编写代码
    pass

# 测试
data = np.array([[1, 2, 3], [4, 5, 3], [7, 8, 3]], dtype=float)
print(standardize(data))`,
            hints: [
              '使用 arr.mean(axis=0) 和 arr.std(axis=0) 计算每列的均值和标准差',
              '当std为0时，除法会产生NaN，可以用 np.where 或先检查std是否为0来处理'
            ],
            referenceAnswer: `import numpy as np

def standardize(arr):
    mean = arr.mean(axis=0)
    std = arr.std(axis=0)
    std[std == 0] = 1
    return (arr - mean) / std`,
            testCases: [
              { input: 'standardize(np.array([[1.0, 2.0, 3.0], [4.0, 5.0, 3.0], [7.0, 8.0, 3.0]]))', expectedOutput: '[[-1.22474487 -1.22474487  0.        ]\\n [ 0.          0.          0.        ]\\n [ 1.22474487  1.22474487  0.        ]]' }
            ]
          }
        }
      ]
    },
    {
      id: 'ch2-2',
      moduleId: 'data-processing',
      title: 'Pandas数据结构',
      order: 2,
      lessons: [
        {
          id: 'les2-2-1',
          chapterId: 'ch2-2',
          title: 'Series与DataFrame创建',
          type: 'both',
          content: `## Series与DataFrame创建

Pandas是Python数据分析最核心的库，提供了两种主要数据结构：Series和DataFrame。

### Series

Series是一维标签数组，可以存储任意数据类型（整数、字符串、浮点数、Python对象等）。它由两部分组成：
- **values**：数据值（NumPy数组）
- **index**：索引标签

创建方式：
- \`pd.Series([1, 2, 3])\`：从列表创建
- \`pd.Series({'a': 1, 'b': 2})\`：从字典创建
- \`pd.Series([1, 2, 3], index=['x', 'y', 'z'])\`：指定索引

### DataFrame

DataFrame是二维标签数据结构，类似于Excel表格或SQL表。它由行索引和列索引共同定位数据。

创建方式：
- \`pd.DataFrame(dict)\`：从字典创建（键为列名）
- \`pd.DataFrame(list_of_lists)\`：从嵌套列表创建
- \`pd.DataFrame(arr, columns=[...])\`：从NumPy数组创建
- \`pd.read_csv()\`：从CSV文件读取

### DataFrame属性

- \`shape\`：行数和列数
- \`columns\`：列名列表
- \`index\`：行索引
- \`dtypes\`：各列数据类型
- \`values\`：NumPy数组表示

### 数据查看

- \`head(n)\`：查看前n行
- \`tail(n)\`：查看后n行
- \`info()\`：数据概览
- \`describe()\`：统计摘要`,
          codeExample: `import pandas as pd
import numpy as np

# 创建Series
s1 = pd.Series([85, 92, 78, 95, 88], name='成绩')
s2 = pd.Series({'语文': 85, '数学': 92, '英语': 78}, name='分数')

print("Series 1:")
print(s1)
print(f"\\n索引: {s1.index.tolist()}")
print(f"值: {s1.values}")

print("\\nSeries 2:")
print(s2)
print(f"数学成绩: {s2['数学']}")

# 创建DataFrame
df = pd.DataFrame({
    '姓名': ['张三', '李四', '王五', '赵六'],
    '年龄': [20, 21, 19, 22],
    '成绩': [85, 92, 78, 95],
    '通过': [True, True, False, True]
})

print("\\nDataFrame:")
print(df)
print(f"\\n形状: {df.shape}")
print(f"列名: {df.columns.tolist()}")
print(f"数据类型:\\n{df.dtypes}")

# 从列表创建
data = [
    ['北京', 2154, 35371],
    ['上海', 2424, 43215],
    ['广州', 1530, 28839],
    ['深圳', 1303, 30665]
]
cities = pd.DataFrame(data, columns=['城市', '人口(万)', 'GDP(亿)'])
print("\\n城市数据:")
print(cities)

# 数据查看
print(f"\\n前2行:\\n{cities.head(2)}")
print(f"\\n统计摘要:\\n{cities.describe()}")`,
          exercise: {
            id: 'ex2-2-1',
            lessonId: 'les2-2-1',
            description: '编写一个函数 `create_student_df(names, scores_dict)`，接收学生姓名列表和成绩字典（键为科目名，值为成绩列表），返回一个DataFrame。再编写函数 `add_total_column(df)`，为DataFrame添加"总分"列，计算每个学生的总分。',
            initialCode: `import pandas as pd

def create_student_df(names, scores_dict):
    # 请在此处编写代码
    pass

def add_total_column(df):
    # 请在此处编写代码
    pass

# 测试
names = ['张三', '李四', '王五']
scores = {
    '语文': [85, 92, 78],
    '数学': [90, 88, 95],
    '英语': [82, 76, 89]
}
df = create_student_df(names, scores)
print(df)
df = add_total_column(df)
print(df)`,
            hints: [
              '创建DataFrame时，将names和scores_dict合并为一个字典，姓名列用"姓名"作为键',
              '总分列可以用 df[数值列].sum(axis=1) 计算'
            ],
            referenceAnswer: `import pandas as pd

def create_student_df(names, scores_dict):
    data = {'姓名': names}
    data.update(scores_dict)
    return pd.DataFrame(data)

def add_total_column(df):
    score_cols = [col for col in df.columns if col != '姓名']
    df = df.copy()
    df['总分'] = df[score_cols].sum(axis=1)
    return df`,
            testCases: [
              { input: "df = create_student_df(['张三', '李四'], {'语文': [85, 92], '数学': [90, 88]}); print(df.to_string())", expectedOutput: '   姓名  语文  数学\\n0  张三  85  90\\n1  李四  92  88' },
              { input: "df = add_total_column(create_student_df(['张三'], {'语文': [85], '数学': [90]})); print(df['总分'].tolist())", expectedOutput: '[175]' }
            ]
          }
        },
        {
          id: 'les2-2-2',
          chapterId: 'ch2-2',
          title: '数据选择与过滤',
          type: 'both',
          content: `## 数据选择与过滤

数据选择和过滤是数据分析中最常用的操作，Pandas提供了多种灵活的方式来选取数据子集。

### 列选择

- \`df['列名']\`：选择单列，返回Series
- \`df[['列1', '列2']]\`：选择多列，返回DataFrame
- \`df.列名\`：属性方式访问（列名必须是有效Python标识符）

### 行选择

- \`df.loc[label]\`：基于标签索引
- \`df.iloc[position]\`：基于位置索引
- \`df[条件]\`：布尔索引

### loc vs iloc

| 特性 | loc | iloc |
|------|-----|------|
| 索引方式 | 标签 | 位置（整数） |
| 切片 | 包含右端 | 不包含右端 |
| 使用场景 | 已知标签名 | 已知位置序号 |

### 布尔索引

布尔索引是Pandas最强大的数据筛选方式：
- 单条件：\`df[df['年龄'] > 20]\`
- 多条件：\`df[(df['年龄'] > 20) & (df['成绩'] > 80)]\`
- \`isin()\`：判断值是否在列表中
- \`str.contains()\`：字符串包含判断

### query方法

\`df.query()\` 方法使用字符串表达式进行筛选，语法更简洁：
\`df.query("年龄 > 20 and 成绩 > 80")\``,
          codeExample: `import pandas as pd

# 创建示例数据
df = pd.DataFrame({
    '姓名': ['张三', '李四', '王五', '赵六', '钱七'],
    '年龄': [20, 21, 19, 22, 20],
    '成绩': [85, 92, 78, 95, 88],
    '城市': ['北京', '上海', '广州', '北京', '深圳']
}, index=['a', 'b', 'c', 'd', 'e'])

print("原始数据:")
print(df)

# 列选择
print(f"\\n姓名列:\\n{df['姓名']}")
print(f"\\n姓名和成绩列:\\n{df[['姓名', '成绩']]}")

# loc 基于标签
print(f"\\nloc['a':'c']:\\n{df.loc['a':'c']}")
print(f"\\nloc['a', '姓名']: {df.loc['a', '姓名']}")
print(f"\\nloc[:, ['姓名', '成绩']]:\\n{df.loc[:, ['姓名', '成绩']]}")

# iloc 基于位置
print(f"\\niloc[0:3]:\\n{df.iloc[0:3]}")
print(f"\\niloc[0, 0]: {df.iloc[0, 0]}")

# 布尔索引
print(f"\\n成绩>85:\\n{df[df['成绩'] > 85]}")
print(f"\\n北京学生:\\n{df[df['城市'] == '北京']}")
print(f"\\n成绩>85且年龄>20:\\n{df[(df['成绩'] > 85) & (df['年龄'] > 20)]}")

# isin
print(f"\\n北京或上海:\\n{df[df['城市'].isin(['北京', '上海'])]}")

# query
print(f"\\nquery筛选:\\n{df.query('成绩 > 85 and 城市 == \\"北京\\"')}")`,
          exercise: {
            id: 'ex2-2-2',
            lessonId: 'les2-2-2',
            description: '编写一个函数 `filter_students(df, min_score, cities)`，从学生DataFrame中筛选出成绩大于等于min_score且城市在cities列表中的学生，返回筛选后的DataFrame（按成绩降序排列）。',
            initialCode: `import pandas as pd

def filter_students(df, min_score, cities):
    # 请在此处编写代码
    pass

# 测试
df = pd.DataFrame({
    '姓名': ['张三', '李四', '王五', '赵六', '钱七'],
    '成绩': [85, 92, 78, 95, 88],
    '城市': ['北京', '上海', '广州', '北京', '深圳']
})
print(filter_students(df, 85, ['北京', '上海']))`,
            hints: [
              '使用布尔索引组合条件：df[(df["成绩"] >= min_score) & (df["城市"].isin(cities))]',
              '排序使用 sort_values("成绩", ascending=False)'
            ],
            referenceAnswer: `import pandas as pd

def filter_students(df, min_score, cities):
    filtered = df[(df['成绩'] >= min_score) & (df['城市'].isin(cities))]
    return filtered.sort_values('成绩', ascending=False)`,
            testCases: [
              { input: "df = pd.DataFrame({'姓名': ['张三', '李四', '王五'], '成绩': [85, 92, 78], '城市': ['北京', '上海', '广州']}); print(filter_students(df, 80, ['北京', '上海']).to_string())", expectedOutput: '   姓名  成绩  城市\\n1  李四  92  上海\\n0  张三  85  北京' }
            ]
          }
        }
      ]
    },
    {
      id: 'ch2-3',
      moduleId: 'data-processing',
      title: '数据清洗',
      order: 3,
      lessons: [
        {
          id: 'les2-3-1',
          chapterId: 'ch2-3',
          title: '缺失值与重复值处理',
          type: 'both',
          content: `## 缺失值与重复值处理

数据清洗是数据分析的第一步，真实数据往往存在缺失值、重复值、异常值等问题，需要在分析前进行处理。

### 缺失值

Pandas中缺失值用 \`NaN\`（Not a Number）表示，可以使用 \`np.nan\`、\`None\` 或 \`pd.NA\` 创建。

**检测缺失值：**
- \`df.isna()\` 或 \`df.isnull()\`：返回布尔DataFrame
- \`df.notna()\` 或 \`df.notnull()\`：返回非缺失值的布尔DataFrame
- \`df.isna().sum()\`：统计每列缺失值数量
- \`df.isna().any()\`：判断每列是否有缺失值

**处理缺失值：**
- \`df.dropna()\`：删除包含缺失值的行/列
  - \`axis\`：0删除行，1删除列
  - \`how='all'\`：仅当全部缺失时删除
  - \`subset\`：指定检查的列
  - \`thresh\`：保留至少有n个非缺失值的行
- \`df.fillna(value)\`：填充缺失值
  - 固定值：\`fillna(0)\`
  - 统计值：\`fillna(df.mean())\`
  - 前后填充：\`fillna(method='ffill')\` / \`fillna(method='bfill')\`
  - 插值：\`df.interpolate()\`

### 重复值

- \`df.duplicated()\`：检测重复行
- \`df.drop_duplicates()\`：删除重复行
  - \`subset\`：指定检查的列
  - \`keep='first'\`：保留第一个（默认）
  - \`keep='last'\`：保留最后一个
  - \`keep=False\`：删除所有重复行`,
          codeExample: `import pandas as pd
import numpy as np

# 创建含缺失值的数据
df = pd.DataFrame({
    '姓名': ['张三', '李四', '王五', '赵六', '钱七', '张三'],
    '年龄': [20, np.nan, 19, 22, np.nan, 20],
    '成绩': [85, 92, np.nan, 95, 88, 85],
    '城市': ['北京', '上海', '广州', np.nan, '深圳', '北京']
})

print("原始数据:")
print(df)
print(f"\\n缺失值统计:\\n{df.isna().sum()}")
print(f"\\n是否有缺失值:\\n{df.isna().any()}")

# 删除缺失值
print(f"\\n删除含缺失值的行:\\n{df.dropna()}")
print(f"\\n删除全缺失的行:\\n{df.dropna(how='all')}")
print(f"\\n仅检查年龄列:\\n{df.dropna(subset=['年龄'])}")

# 填充缺失值
print(f"\\n用0填充:\\n{df.fillna(0)}")
print(f"\\n年龄用均值填充:\\n{df.copy().assign(年龄=df['年龄'].fillna(df['年龄'].mean()))}")
print(f"\\n前向填充:\\n{df.fillna(method='ffill')}")

# 重复值处理
print(f"\\n重复行检测:\\n{df.duplicated()}")
print(f"\\n删除重复行:\\n{df.drop_duplicates()}")
print(f"\\n按姓名去重(保留最后):\\n{df.drop_duplicates(subset=['姓名'], keep='last')}")`,
          exercise: {
            id: 'ex2-3-1',
            lessonId: 'les2-3-1',
            description: '编写一个函数 `clean_data(df)`，对DataFrame进行清洗：1) 删除完全重复的行；2) 数值列的缺失值用该列均值填充；3) 字符串列的缺失值用"未知"填充。返回清洗后的DataFrame。',
            initialCode: `import pandas as pd
import numpy as np

def clean_data(df):
    # 请在此处编写代码
    pass

# 测试
df = pd.DataFrame({
    '姓名': ['张三', '李四', '王五', '张三'],
    '年龄': [20, np.nan, 19, 20],
    '成绩': [85, 92, np.nan, 85],
    '城市': ['北京', '上海', np.nan, '北京']
})
print(clean_data(df))`,
            hints: [
              '先 drop_duplicates()，然后遍历列，用 df[col].dtype 判断类型',
              '数值类型可以用 np.issubdtype(col.dtype, np.number) 判断，均值用 df[col].mean()'
            ],
            referenceAnswer: `import pandas as pd
import numpy as np

def clean_data(df):
    df = df.drop_duplicates()
    df = df.copy()
    for col in df.columns:
        if df[col].isna().any():
            if np.issubdtype(df[col].dtype, np.number):
                df[col] = df[col].fillna(df[col].mean())
            else:
                df[col] = df[col].fillna('未知')
    return df`,
            testCases: [
              { input: "df = pd.DataFrame({'姓名': ['张三', '李四', '张三'], '年龄': [20, np.nan, 20], '成绩': [85, 92, 85]}); result = clean_data(df); print(result['年龄'].iloc[1])", expectedOutput: '20.0' }
            ]
          }
        },
        {
          id: 'les2-3-2',
          chapterId: 'ch2-3',
          title: '数据类型转换',
          type: 'both',
          content: `## 数据类型转换

数据类型转换是数据清洗的重要环节，确保每列数据具有正确的类型是后续分析的基础。

### Pandas数据类型

| 类型 | 说明 | 示例 |
|------|------|------|
| int64 | 整数 | 1, 2, 3 |
| float64 | 浮点数 | 1.5, 2.0 |
| bool | 布尔值 | True, False |
| object | Python对象（通常为字符串） | 'hello' |
| datetime64 | 日期时间 | 2024-01-01 |
| category | 分类 | 有限个离散值 |
| string | 字符串（新类型） | 'hello' |

### 类型转换方法

1. **astype()**：最基本的类型转换方法
   - \`df['列名'].astype(int)\`
   - \`df['列名'].astype(float)\`
   - \`df['列名'].astype(str)\`
   - \`df['列名'].astype('category')\`

2. **pd.to_numeric()**：安全地转为数值类型
   - \`errors='coerce'\`：无法转换的值设为NaN
   - \`errors='raise'\`：无法转换时报错（默认）
   - \`errors='ignore'\`：无法转换时保持原样

3. **pd.to_datetime()**：转为日期时间类型
   - 支持多种日期格式自动推断
   - \`format\` 参数指定格式

4. **convert_dtypes()**：自动转为最佳类型（使用新的Nullable类型）

### 常见转换场景

- 字符串数字转数值：\`astype(float)\` 或 \`pd.to_numeric()\`
- 日期字符串转datetime：\`pd.to_datetime()\`
- 数值转分类：\`astype('category')\`
- 布尔值处理：\`replace({'是': True, '否': False})\``,
          codeExample: `import pandas as pd
import numpy as np

# 创建混合类型数据
df = pd.DataFrame({
    'id': ['001', '002', '003', '004'],
    'price': ['12.5', '25.0', '8.3', '15.7'],
    'quantity': ['10', '5', '20', '8'],
    'date': ['2024-01-15', '2024-02-20', '2024-03-10', '2024-04-05'],
    'is_vip': ['是', '否', '是', '否']
})

print("原始数据类型:")
print(df.dtypes)

# 字符串转数值
df['price'] = pd.to_numeric(df['price'])
df['quantity'] = df['quantity'].astype(int)
print(f"\\n转换后类型:\\n{df.dtypes}")

# 日期转换
df['date'] = pd.to_datetime(df['date'])
print(f"\\ndate类型: {df['date'].dtype}")
print(f"月份: {df['date'].dt.month.tolist()}")

# 布尔值转换
df['is_vip'] = df['is_vip'].replace({'是': True, '否': False})
print(f"\\nis_vip类型: {df['is_vip'].dtype}")

# 分类类型
df['category'] = df['is_vip'].astype('category')
print(f"category类型: {df['category'].dtype}")

# 处理转换错误
dirty = pd.Series(['1', '2', 'abc', '4'])
print(f"\\n强制转换(错误变NaN): {pd.to_numeric(dirty, errors='coerce').tolist()}")

# 最终数据
print(f"\\n最终数据类型:")
print(df.dtypes)`,
          exercise: {
            id: 'ex2-3-2',
            lessonId: 'les2-3-2',
            description: '编写一个函数 `convert_data_types(df, type_map)`，根据类型映射字典转换DataFrame的列类型。type_map格式为 `{"列名": "int"/"float"/"str"/"datetime"/"category"}`。转换失败时将无效值设为NaN（数值类型）或保持原值（其他类型）。',
            initialCode: `import pandas as pd

def convert_data_types(df, type_map):
    # 请在此处编写代码
    pass

# 测试
df = pd.DataFrame({
    'price': ['12.5', '25.0', 'abc', '15.7'],
    'count': ['10', '5', '20', '8'],
    'date': ['2024-01-15', '2024-02-20', '2024-03-10', '2024-04-05']
})
type_map = {'price': 'float', 'count': 'int', 'date': 'datetime'}
result = convert_data_types(df, type_map)
print(result.dtypes)
print(result)`,
            hints: [
              '遍历type_map，对每列根据目标类型调用相应的转换函数',
              '数值类型用 pd.to_numeric(errors="coerce")，日期用 pd.to_datetime(errors="coerce")，其他用 astype()'
            ],
            referenceAnswer: `import pandas as pd

def convert_data_types(df, type_map):
    df = df.copy()
    for col, target_type in type_map.items():
        if col not in df.columns:
            continue
        if target_type in ('int', 'float'):
            df[col] = pd.to_numeric(df[col], errors='coerce')
            if target_type == 'int':
                df[col] = df[col].astype('Int64')
            else:
                df[col] = df[col].astype('Float64')
        elif target_type == 'datetime':
            df[col] = pd.to_datetime(df[col], errors='coerce')
        elif target_type == 'category':
            df[col] = df[col].astype('category')
        elif target_type == 'str':
            df[col] = df[col].astype(str)
    return df`,
            testCases: [
              { input: "df = pd.DataFrame({'price': ['12.5', 'abc'], 'count': ['10', '5']}); result = convert_data_types(df, {'price': 'float', 'count': 'int'}); print(result.dtypes['price'])", expectedOutput: 'Float64' }
            ]
          }
        }
      ]
    },
    {
      id: 'ch2-4',
      moduleId: 'data-processing',
      title: '数据合并与重塑',
      order: 4,
      lessons: [
        {
          id: 'les2-4-1',
          chapterId: 'ch2-4',
          title: 'merge与concat',
          type: 'both',
          content: `## merge与concat

在数据分析中，数据通常分散在多个表或文件中，需要合并后才能进行综合分析。Pandas提供了多种数据合并方式。

### pd.merge() — 数据库风格合并

merge类似于SQL的JOIN操作，根据一个或多个键将两个DataFrame的行连接起来。

**合并类型（how参数）：**
- \`inner\`：内连接（默认），取交集
- \`outer\`：外连接，取并集
- \`left\`：左连接，保留左表所有行
- \`right\`：右连接，保留右表所有行

**关键参数：**
- \`on\`：指定连接键（两表列名相同时）
- \`left_on\` / \`right_on\`：分别指定左右表的连接键
- \`suffixes\`：重名列的后缀

### pd.concat() — 拼接

concat沿某个轴将多个对象堆叠在一起。

**关键参数：**
- \`axis\`：0按行拼接（默认），1按列拼接
- \`join\`：\`outer\`取并集（默认），\`inner\`取交集
- \`ignore_index\`：是否重置索引

### merge vs concat 选择

- 需要根据某列的值匹配行 → 用merge
- 简单地堆叠行或列 → 用concat
- 一对多、多对多关系 → 用merge`,
          codeExample: `import pandas as pd

# merge 示例
students = pd.DataFrame({
    '学号': ['S001', 'S002', 'S003', 'S004'],
    '姓名': ['张三', '李四', '王五', '赵六']
})
scores = pd.DataFrame({
    '学号': ['S001', 'S002', 'S003', 'S005'],
    '成绩': [85, 92, 78, 88]
})

print("学生表:")
print(students)
print("\\n成绩表:")
print(scores)

# 内连接
inner = pd.merge(students, scores, on='学号', how='inner')
print(f"\\n内连接:\\n{inner}")

# 左连接
left = pd.merge(students, scores, on='学号', how='left')
print(f"\\n左连接:\\n{left}")

# 外连接
outer = pd.merge(students, scores, on='学号', how='outer')
print(f"\\n外连接:\\n{outer}")

# concat 示例
df1 = pd.DataFrame({'A': [1, 2], 'B': [3, 4]})
df2 = pd.DataFrame({'A': [5, 6], 'B': [7, 8]})
df3 = pd.DataFrame({'C': [9, 10], 'D': [11, 12]})

# 按行拼接
row_concat = pd.concat([df1, df2], ignore_index=True)
print(f"\\n按行拼接:\\n{row_concat}")

# 按列拼接
col_concat = pd.concat([df1, df3], axis=1)
print(f"\\n按列拼接:\\n{col_concat}")

# 不同列名的拼接
df4 = pd.DataFrame({'A': [1, 2], 'B': [3, 4]})
df5 = pd.DataFrame({'B': [5, 6], 'C': [7, 8]})
print(f"\\n不同列名拼接(outer):\\n{pd.concat([df4, df5], ignore_index=True)}")
print(f"不同列名拼接(inner):\\n{pd.concat([df4, df5], ignore_index=True, join='inner')}")`,
          exercise: {
            id: 'ex2-4-1',
            lessonId: 'les2-4-1',
            description: '编写一个函数 `merge_sales_data(products, orders, customers)`，合并三个DataFrame：products（产品信息，含product_id）、orders（订单信息，含product_id和customer_id）、customers（客户信息，含customer_id）。返回包含产品名、客户名和订单金额的完整订单表。',
            initialCode: `import pandas as pd

def merge_sales_data(products, orders, customers):
    # 请在此处编写代码
    pass

# 测试
products = pd.DataFrame({
    'product_id': ['P001', 'P002', 'P003'],
    'product_name': ['笔记本电脑', '手机', '平板']
})
orders = pd.DataFrame({
    'order_id': ['O001', 'O002', 'O003'],
    'product_id': ['P001', 'P002', 'P001'],
    'customer_id': ['C001', 'C002', 'C002'],
    'amount': [5999, 3999, 5999]
})
customers = pd.DataFrame({
    'customer_id': ['C001', 'C002'],
    'customer_name': ['张三', '李四']
})
print(merge_sales_data(products, orders, customers))`,
            hints: [
              '先merge orders和products（on="product_id"），再merge结果和customers（on="customer_id"）',
              '选择需要的列：product_name, customer_name, amount'
            ],
            referenceAnswer: `import pandas as pd

def merge_sales_data(products, orders, customers):
    merged = pd.merge(orders, products, on='product_id', how='left')
    merged = pd.merge(merged, customers, on='customer_id', how='left')
    return merged[['product_name', 'customer_name', 'amount']]`,
            testCases: [
              { input: "products = pd.DataFrame({'product_id': ['P01'], 'product_name': ['电脑']}); orders = pd.DataFrame({'order_id': ['O01'], 'product_id': ['P01'], 'customer_id': ['C01'], 'amount': [5000]}); customers = pd.DataFrame({'customer_id': ['C01'], 'customer_name': ['张三']}); print(merge_sales_data(products, orders, customers).to_string())", expectedOutput: '  product_name customer_name  amount\\n0          电脑            张三    5000' }
            ]
          }
        },
        {
          id: 'les2-4-2',
          chapterId: 'ch2-4',
          title: 'pivot与melt',
          type: 'both',
          content: `## pivot与melt

数据重塑是指改变数据的布局形式，在宽格式（wide）和长格式（long）之间转换，这是数据整理的重要技能。

### pivot — 长转宽

\`pivot()\` 将长格式数据转为宽格式，类似于Excel的数据透视表：

\`\`\`python
df.pivot(index='行索引列', columns='列名列', values='值列')
\`\`\`

- \`index\`：新DataFrame的行索引
- \`columns\`：新DataFrame的列名
- \`values\`：填充到新DataFrame中的值

**pivot_table()**：更强大的透视方法，支持聚合函数：
- \`aggfunc\`：聚合函数，默认为mean
- \`fill_value\`：填充缺失值
- \`margins\`：是否添加汇总行/列

### melt — 宽转长

\`melt()\` 将宽格式数据转为长格式，是pivot的逆操作：

\`\`\`python
pd.melt(df, id_vars=['标识列'], value_vars=['值列1', '值列2'])
\`\`\`

- \`id_vars\`：保持不变的标识列
- \`value_vars\`：需要融化的列
- \`var_name\`：融化后变量列的名称
- \`value_name\`：融化后值列的名称

### 何时使用

- **pivot**：当需要将某列的值展开为多列时（如将月份数据从行转为列）
- **melt**：当需要将多列合并为一列时（如将各月份数据从列转为行）
- **pivot_table**：当需要按分组聚合时`,
          codeExample: `import pandas as pd

# 长格式数据
long_df = pd.DataFrame({
    '月份': ['1月', '1月', '2月', '2月', '3月', '3月'],
    '产品': ['A', 'B', 'A', 'B', 'A', 'B'],
    '销量': [100, 150, 120, 180, 130, 200]
})

print("长格式数据:")
print(long_df)

# pivot 长转宽
wide_df = long_df.pivot(index='月份', columns='产品', values='销量')
print(f"\\n宽格式数据:\\n{wide_df}")

# pivot_table 带聚合
sales = pd.DataFrame({
    '月份': ['1月', '1月', '1月', '2月', '2月'],
    '产品': ['A', 'A', 'B', 'A', 'B'],
    '销量': [100, 120, 150, 130, 180]
})
pivot_result = sales.pivot_table(index='月份', columns='产品',
                                 values='销量', aggfunc='mean')
print(f"\\npivot_table(均值):\\n{pivot_result}")

# melt 宽转长
wide_data = pd.DataFrame({
    '姓名': ['张三', '李四', '王五'],
    '语文': [85, 92, 78],
    '数学': [90, 88, 95],
    '英语': [82, 76, 89]
})

print(f"\\n宽格式成绩:")
print(wide_data)

long_data = pd.melt(wide_data, id_vars=['姓名'],
                     value_vars=['语文', '数学', '英语'],
                     var_name='科目', value_name='成绩')
print(f"\\n长格式成绩:")
print(long_data)

# stack/unstack
df = pd.DataFrame({
    '语文': [85, 92],
    '数学': [90, 88]
}, index=['张三', '李四'])
print(f"\\nstack结果:\\n{df.stack()}")`,
          exercise: {
            id: 'ex2-4-2',
            lessonId: 'les2-4-2',
            description: '编写一个函数 `reshape_sales_data(df)`，接收宽格式的销售数据DataFrame（包含"门店"列和若干月份列如"1月"、"2月"等），使用melt将其转为长格式，列名为"门店"、"月份"、"销售额"。',
            initialCode: `import pandas as pd

def reshape_sales_data(df):
    # 请在此处编写代码
    pass

# 测试
df = pd.DataFrame({
    '门店': ['北京店', '上海店', '广州店'],
    '1月': [100, 120, 90],
    '2月': [110, 130, 95],
    '3月': [105, 125, 100]
})
print(reshape_sales_data(df))`,
            hints: [
              '使用 pd.melt()，id_vars=["门店"]，value_vars为月份列',
              '月份列可以用 df.columns.drop("门店") 获取'
            ],
            referenceAnswer: `import pandas as pd

def reshape_sales_data(df):
    month_cols = [col for col in df.columns if col != '门店']
    result = pd.melt(df, id_vars=['门店'], value_vars=month_cols,
                     var_name='月份', value_name='销售额')
    return result`,
            testCases: [
              { input: "df = pd.DataFrame({'门店': ['北京店'], '1月': [100], '2月': [110]}); print(reshape_sales_data(df).to_string())", expectedOutput: '    门店 月份  销售额\\n0  北京店  1月  100\\n1  北京店  2月  110' }
            ]
          }
        }
      ]
    },
    {
      id: 'ch2-5',
      moduleId: 'data-processing',
      title: '数据聚合与分组',
      order: 5,
      lessons: [
        {
          id: 'les2-5-1',
          chapterId: 'ch2-5',
          title: 'groupby与聚合运算',
          type: 'both',
          content: `## groupby与聚合运算

分组聚合是数据分析中最核心的操作之一，用于按某个维度对数据进行汇总统计。

### groupby机制

Pandas的groupby遵循"split-apply-combine"（拆分-应用-合并）模式：
1. **Split**：按分组键将数据拆分为多个组
2. **Apply**：对每个组独立应用函数
3. **Combine**：将结果合并为新的数据结构

### 基本用法

\`\`\`python
df.groupby('分组列').聚合函数()
\`\`\`

### 常用聚合函数

| 函数 | 说明 |
|------|------|
| sum() | 求和 |
| mean() | 平均值 |
| count() | 计数（非空值） |
| size() | 计数（包含空值） |
| min() / max() | 最小/最大值 |
| std() / var() | 标准差/方差 |
| first() / last() | 第一个/最后一个值 |
| nunique() | 唯一值数量 |

### 多种聚合方式

1. **单列单函数**：\`df.groupby('A')['B'].mean()\`
2. **单列多函数**：\`df.groupby('A')['B'].agg(['mean', 'sum'])\`
3. **多列单函数**：\`df.groupby('A')[['B', 'C']].mean()\`
4. **多列多函数**：\`df.groupby('A').agg({'B': 'mean', 'C': 'sum'})\`
5. **自定义函数**：\`df.groupby('A')['B'].agg(lambda x: x.max() - x.min())\`

### transform与apply

- **transform**：返回与原DataFrame相同形状的结果，常用于组内标准化
- **apply**：最灵活，可以返回任意形状的结果`,
          codeExample: `import pandas as pd
import numpy as np

# 创建示例数据
df = pd.DataFrame({
    '部门': ['销售', '技术', '销售', '技术', '销售', '技术', '市场', '市场'],
    '姓名': ['张三', '李四', '王五', '赵六', '钱七', '孙八', '周九', '吴十'],
    '工资': [8000, 12000, 9000, 15000, 8500, 13000, 7500, 7000],
    '绩效': [85, 92, 78, 95, 88, 90, 82, 76]
})

print("原始数据:")
print(df)

# 基本分组聚合
print(f"\\n各部门平均工资:")
print(df.groupby('部门')['工资'].mean())

print(f"\\n各部门统计:")
print(df.groupby('部门')['工资'].agg(['mean', 'sum', 'count']))

# 多列多函数
print(f"\\n多列聚合:")
print(df.groupby('部门').agg({
    '工资': ['mean', 'max'],
    '绩效': ['mean', 'min']
}))

# 自定义聚合
print(f"\\n工资范围:")
print(df.groupby('部门')['工资'].agg(lambda x: x.max() - x.min()))

# transform - 组内标准化
df['工资标准化'] = df.groupby('部门')['工资'].transform(
    lambda x: (x - x.mean()) / x.std()
)
print(f"\\n组内标准化:\\n{df[['姓名', '部门', '工资', '工资标准化']]}")

# apply - 灵活操作
def top_performer(group):
    return group.loc[group['绩效'].idxmax()]

print(f"\\n各部门绩效最高者:")
print(df.groupby('部门').apply(top_performer, include_groups=False)[['姓名', '绩效']])

# 多级分组
df['季度'] = ['Q1', 'Q1', 'Q2', 'Q2', 'Q1', 'Q2', 'Q1', 'Q2']
print(f"\\n部门-季度分组:")
print(df.groupby(['部门', '季度'])['工资'].mean())`,
          exercise: {
            id: 'ex2-5-1',
            lessonId: 'les2-5-1',
            description: '编写一个函数 `analyze_by_category(df, group_col, value_col)`，对DataFrame按group_col分组，计算value_col的均值、中位数、最大值、最小值和标准差，返回一个DataFrame，每行是一个分组，列为各统计量。',
            initialCode: `import pandas as pd
import numpy as np

def analyze_by_category(df, group_col, value_col):
    # 请在此处编写代码
    pass

# 测试
df = pd.DataFrame({
    '类别': ['A', 'A', 'B', 'B', 'A', 'B', 'A', 'B'],
    '数值': [10, 20, 30, 40, 15, 35, 25, 45]
})
print(analyze_by_category(df, '类别', '数值'))`,
            hints: [
              '使用 groupby + agg，传入多个聚合函数名',
              'agg 函数列表用 ["mean", "median", "max", "min", "std"]'
            ],
            referenceAnswer: `import pandas as pd
import numpy as np

def analyze_by_category(df, group_col, value_col):
    result = df.groupby(group_col)[value_col].agg(
        ['mean', 'median', 'max', 'min', 'std']
    )
    result.columns = ['均值', '中位数', '最大值', '最小值', '标准差']
    return result`,
            testCases: [
              { input: "df = pd.DataFrame({'类别': ['A', 'A', 'B', 'B'], '数值': [10, 20, 30, 40]}); print(analyze_by_category(df, '类别', '数值').to_string())", expectedOutput: '类别   均值  中位数  最大值  最小值        标准差\\nA  15.0  15.0   20   10   7.071068\\nB  35.0  35.0   40   30   7.071068' }
            ]
          }
        }
      ]
    }
  ]
};
