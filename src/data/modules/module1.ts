import type { Module } from '../../types';

export const module1: Module = {
  id: 'python-basics',
  title: 'Python编程基础',
  description: '从零开始学习Python编程，掌握变量、数据类型、流程控制、函数等核心概念，为数据分析打下坚实基础。',
  icon: '🐍',
  order: 1,
  chapters: [
    {
      id: 'ch1-1',
      moduleId: 'python-basics',
      title: '变量与数据类型',
      order: 1,
      lessons: [
        {
          id: 'les1-1-1',
          chapterId: 'ch1-1',
          title: '变量与基本数据类型',
          type: 'both',
          content: `## 变量与基本数据类型

在Python中，变量是用来存储数据的容器。与许多其他编程语言不同，Python是动态类型语言，不需要提前声明变量类型，解释器会根据赋值自动推断。

### 变量命名规则

- 变量名只能包含字母、数字和下划线，不能以数字开头
- 变量名不能包含空格，可以使用下划线分隔单词
- 不能使用Python关键字作为变量名（如if、for、class等）
- 变量名应具有描述性，提高代码可读性

### 基本数据类型

Python有四种基本数据类型：

1. **int（整型）**：表示整数，如 42、-7、0。Python 3中整数没有大小限制。
2. **float（浮点型）**：表示小数，如 3.14、-0.5、2.0。使用IEEE 754双精度标准。
3. **str（字符串）**：表示文本，用单引号或双引号包裹，如 'hello'、"世界"。支持Unicode。
4. **bool（布尔型）**：表示真或假，只有True和False两个值。布尔型是整型的子类，True等于1，False等于0。

### 类型转换

使用内置函数可以在不同类型之间转换：\`int()\`、\`float()\`、\`str()\`、\`bool()\`。注意转换时可能丢失精度或报错，例如将非数字字符串转为整数会抛出ValueError。

### type()函数

使用\`type()\`函数可以查看任意变量的数据类型，这在调试和理解代码时非常有用。`,
          codeExample: `# 变量赋值与基本数据类型
name = "张三"          # str 字符串
age = 25               # int 整型
height = 1.75          # float 浮点型
is_student = True      # bool 布尔型

print(f"姓名: {name}, 类型: {type(name)}")
print(f"年龄: {age}, 类型: {type(age)}")
print(f"身高: {height}, 类型: {type(height)}")
print(f"是否学生: {is_student}, 类型: {type(is_student)}")

# 类型转换
age_str = str(age)        # int -> str
height_int = int(height)  # float -> int (截断小数部分)
num_str = "42"
num_int = int(num_str)    # str -> int

print(f"转换后: {age_str}, {height_int}, {num_int}")

# 布尔值与整型的关系
print(True + True)   # 输出 2
print(False + 5)     # 输出 5`,
          exercise: {
            id: 'ex1-1-1',
            lessonId: 'les1-1-1',
            description: '编写一个函数 `describe_data(value)`，接收一个值，返回一个字符串描述其数据类型和值。格式为："值 {value} 的类型是 {type}"，其中type为int、float、str或bool之一。',
            initialCode: `def describe_data(value):
    # 请在此处编写代码
    pass

# 测试
print(describe_data(42))
print(describe_data(3.14))
print(describe_data("hello"))
print(describe_data(True))`,
            hints: [
              '使用 type(value) 获取类型，然后用 if-elif 判断具体类型名称',
              '可以使用 isinstance(value, int) 等方式判断类型，注意 bool 是 int 的子类，需要先判断 bool'
            ],
            referenceAnswer: `def describe_data(value):
    t = type(value)
    if t == bool:
        type_name = "bool"
    elif t == int:
        type_name = "int"
    elif t == float:
        type_name = "float"
    elif t == str:
        type_name = "str"
    else:
        type_name = str(t)
    return f"值 {value} 的类型是 {type_name}"`,
            testCases: [
              { input: 'describe_data(42)', expectedOutput: '值 42 的类型是 int' },
              { input: 'describe_data(3.14)', expectedOutput: '值 3.14 的类型是 float' },
              { input: 'describe_data("hello")', expectedOutput: '值 hello 的类型是 str' },
              { input: 'describe_data(True)', expectedOutput: '值 True 的类型是 bool' }
            ]
          }
        },
        {
          id: 'les1-1-2',
          chapterId: 'ch1-1',
          title: '列表与字典',
          type: 'both',
          content: `## 列表与字典

列表和字典是Python中最常用的两种复合数据结构，在数据分析中尤为重要。

### 列表（list）

列表是一个**有序**的、**可变**的元素集合，使用方括号 \`[]\` 创建。

**核心特性：**
- 有序：元素按插入顺序排列，可通过索引访问
- 可变：可以增删改元素
- 异构：可以包含不同类型的元素
- 支持切片、嵌套等操作

**常用方法：**
- \`append(x)\`：末尾添加元素
- \`insert(i, x)\`：在索引i处插入元素
- \`remove(x)\`：删除第一个值为x的元素
- \`pop([i])\`：删除并返回索引i处的元素
- \`sort()\`：原地排序
- \`reverse()\`：原地反转

### 字典（dict）

字典是一个**键值对**的集合，使用花括号 \`{}\` 创建。

**核心特性：**
- 键唯一：每个键只能出现一次
- 键不可变：键必须是不可变类型（str、int、tuple等）
- 可变：可以增删改键值对
- 查找高效：基于哈希表实现，查找时间复杂度O(1)

**常用方法：**
- \`keys()\`：返回所有键
- \`values()\`：返回所有值
- \`items()\`：返回所有键值对
- \`get(key, default)\`：安全获取值
- \`update(other)\`：合并字典`,
          codeExample: `# 列表操作
fruits = ["苹果", "香蕉", "橙子"]
print(f"原始列表: {fruits}")

# 索引访问（从0开始）
print(f"第一个: {fruits[0]}")
print(f"最后一个: {fruits[-1]}")

# 切片
print(f"前两个: {fruits[0:2]}")

# 添加和删除
fruits.append("葡萄")        # 末尾添加
fruits.insert(1, "西瓜")     # 指定位置插入
removed = fruits.pop()       # 删除末尾
print(f"修改后: {fruits}, 删除了: {removed}")

# 列表推导式
squares = [x**2 for x in range(1, 6)]
print(f"平方数: {squares}")

# 字典操作
student = {
    "name": "李明",
    "age": 20,
    "scores": {"math": 95, "english": 88}
}
print(f"学生信息: {student}")

# 访问和修改
print(f"姓名: {student['name']}")
print(f"数学成绩: {student['scores']['math']}")

# 安全获取
email = student.get("email", "未设置")
print(f"邮箱: {email}")

# 添加和更新
student["email"] = "liming@example.com"
student["age"] = 21
print(f"更新后: {student}")

# 遍历
for key, value in student.items():
    print(f"  {key}: {value}")`,
          exercise: {
            id: 'ex1-1-2',
            lessonId: 'les1-1-2',
            description: '编写一个函数 `merge_dicts(dict1, dict2)`，合并两个字典。如果两个字典有相同的键，则将对应的值相加（假设值都是数字）。返回合并后的新字典。',
            initialCode: `def merge_dicts(dict1, dict2):
    # 请在此处编写代码
    pass

# 测试
d1 = {"a": 1, "b": 2, "c": 3}
d2 = {"b": 3, "c": 4, "d": 5}
print(merge_dicts(d1, d2))`,
            hints: [
              '先复制dict1到结果字典，然后遍历dict2，如果键已存在则值相加，否则添加新键值对',
              '可以使用 dict.copy() 创建字典副本，用 for key, value in dict2.items() 遍历'
            ],
            referenceAnswer: `def merge_dicts(dict1, dict2):
    result = dict1.copy()
    for key, value in dict2.items():
        if key in result:
            result[key] += value
        else:
            result[key] = value
    return result`,
            testCases: [
              { input: 'merge_dicts({"a": 1, "b": 2}, {"b": 3, "c": 4})', expectedOutput: "{'a': 1, 'b': 5, 'c': 4}" },
              { input: 'merge_dicts({}, {"x": 10})', expectedOutput: "{'x': 10}" },
              { input: 'merge_dicts({"a": 5}, {"a": 5})', expectedOutput: "{'a': 10}" }
            ]
          }
        }
      ]
    },
    {
      id: 'ch1-2',
      moduleId: 'python-basics',
      title: '运算符',
      order: 2,
      lessons: [
        {
          id: 'les1-2-1',
          chapterId: 'ch1-2',
          title: '算术与比较运算符',
          type: 'both',
          content: `## 算术与比较运算符

运算符是编程语言中进行计算和比较的基本工具，掌握它们是编写任何程序的前提。

### 算术运算符

| 运算符 | 描述 | 示例 | 结果 |
|--------|------|------|------|
| + | 加法 | 3 + 2 | 5 |
| - | 减法 | 3 - 2 | 1 |
| * | 乘法 | 3 * 2 | 6 |
| / | 除法 | 7 / 2 | 3.5 |
| // | 整除 | 7 // 2 | 3 |
| % | 取模 | 7 % 2 | 1 |
| ** | 幂运算 | 2 ** 3 | 8 |

**注意事项：**
- 除法 \`/\` 总是返回浮点数
- 整除 \`//\` 向下取整，对负数也适用（-7 // 2 = -4）
- 取模 \`%\` 的结果符号与除数相同
- \`**\` 运算符优先级高于负号：\`-2**2\` 等于 \`-(2**2)\` 等于 -4

### 比较运算符

| 运算符 | 描述 | 示例 | 结果 |
|--------|------|------|------|
| == | 等于 | 3 == 3 | True |
| != | 不等于 | 3 != 4 | True |
| > | 大于 | 5 > 3 | True |
| < | 小于 | 5 < 3 | False |
| >= | 大于等于 | 5 >= 5 | True |
| <= | 小于等于 | 5 <= 3 | False |

比较运算符可以链式使用，如 \`1 < x < 10\`，这在数学条件判断中非常方便。`,
          codeExample: `# 算术运算符
a, b = 17, 5
print(f"{a} + {b} = {a + b}")
print(f"{a} - {b} = {a - b}")
print(f"{a} * {b} = {a * b}")
print(f"{a} / {b} = {a / b}")
print(f"{a} // {b} = {a // b}")
print(f"{a} % {b} = {a % b}")
print(f"{a} ** {b} = {a ** b}")

# 比较运算符
x = 10
print(f"{x} > 5: {x > 5}")
print(f"{x} < 5: {x < 5}")
print(f"{x} == 10: {x == 10}")
print(f"{x} != 10: {x != 10}")

# 链式比较
print(f"5 < x < 15: {5 < x < 15}")
print(f"0 < x < 5: {0 < x < 5}")

# 字符串也可以比较（按字典序）
print(f"'abc' < 'abd': {'abc' < 'abd'}")
print(f"'abc' == 'abc': {'abc' == 'abc'}")`,
          exercise: {
            id: 'ex1-2-1',
            lessonId: 'les1-2-1',
            description: '编写一个函数 `is_leap_year(year)`，判断给定年份是否为闰年。闰年规则：能被4整除但不能被100整除，或者能被400整除的年份是闰年。返回True或False。',
            initialCode: `def is_leap_year(year):
    # 请在此处编写代码
    pass

# 测试
print(is_leap_year(2000))
print(is_leap_year(1900))
print(is_leap_year(2024))
print(is_leap_year(2023))`,
            hints: [
              '闰年条件：(能被4整除且不能被100整除) 或 (能被400整除)',
              '使用 % 运算符判断整除，使用 and、or、not 逻辑运算符组合条件'
            ],
            referenceAnswer: `def is_leap_year(year):
    return (year % 4 == 0 and year % 100 != 0) or (year % 400 == 0)`,
            testCases: [
              { input: 'is_leap_year(2000)', expectedOutput: 'True' },
              { input: 'is_leap_year(1900)', expectedOutput: 'False' },
              { input: 'is_leap_year(2024)', expectedOutput: 'True' },
              { input: 'is_leap_year(2023)', expectedOutput: 'False' }
            ]
          }
        },
        {
          id: 'les1-2-2',
          chapterId: 'ch1-2',
          title: '逻辑与赋值运算符',
          type: 'both',
          content: `## 逻辑与赋值运算符

### 逻辑运算符

逻辑运算符用于组合布尔表达式，在条件判断中非常重要。

| 运算符 | 描述 | 示例 | 结果 |
|--------|------|------|------|
| and | 与 | True and False | False |
| or | 或 | True or False | True |
| not | 非 | not True | False |

**短路求值：**
- \`and\`：如果第一个操作数为False，直接返回第一个操作数，不再计算第二个
- \`or\`：如果第一个操作数为True，直接返回第一个操作数，不再计算第二个

这个特性在实际编程中非常有用，例如：\`result = x and x.value\` 可以避免在x为None时访问属性报错。

**布尔上下文中的真值判断：**
以下值在布尔上下文中被视为False（falsy值）：
- None、False、0、0.0、""（空字符串）、[]（空列表）、{}（空字典）、()（空元组）
- 其他值都被视为True（truthy值）

### 赋值运算符

| 运算符 | 等价于 | 示例 |
|--------|--------|------|
| = | 赋值 | x = 5 |
| += | x = x + y | x += 3 |
| -= | x = x - y | x -= 3 |
| *= | x = x * y | x *= 3 |
| /= | x = x / y | x /= 3 |
| //= | x = x // y | x //= 3 |
| %= | x = x % y | x %= 3 |
| **= | x = x ** y | x **= 3 |

Python还支持多重赋值和解包赋值，如 \`a, b = 1, 2\` 和 \`a, *rest = [1, 2, 3, 4]\`。`,
          codeExample: `# 逻辑运算符
x = 10
print(f"x > 5 and x < 20: {x > 5 and x < 20}")
print(f"x > 15 or x < 20: {x > 15 or x < 20}")
print(f"not (x > 5): {not (x > 5)}")

# 短路求值
result = 0 and "不会执行"
print(f"0 and '不会执行': {result}")  # 返回 0

result = 1 or "不会执行"
print(f"1 or '不会执行': {result}")  # 返回 1

# 真值判断
values = [0, "", [], None, 1, "hello", [1]]
for v in values:
    print(f"bool({v!r}) = {bool(v)}")

# 赋值运算符
a = 10
a += 5   # a = 15
a -= 3   # a = 12
a *= 2   # a = 24
a //= 5  # a = 4
a **= 3  # a = 64
print(f"a = {a}")

# 多重赋值
x, y, z = 1, 2, 3
print(f"x={x}, y={y}, z={z}")

# 交换变量
x, y = y, x
print(f"交换后: x={x}, y={y}")`,
          exercise: {
            id: 'ex1-2-2',
            lessonId: 'les1-2-2',
            description: '编写一个函数 `classify_number(n)`，对整数n进行分类：如果n是正偶数返回"正偶数"，正奇数返回"正奇数"，负数返回"负数"，零返回"零"。',
            initialCode: `def classify_number(n):
    # 请在此处编写代码
    pass

# 测试
print(classify_number(4))
print(classify_number(7))
print(classify_number(-3))
print(classify_number(0))`,
            hints: [
              '先判断n是否等于0，再判断正负，最后判断奇偶',
              '判断奇偶可以用 n % 2 == 0 判断偶数'
            ],
            referenceAnswer: `def classify_number(n):
    if n == 0:
        return "零"
    elif n < 0:
        return "负数"
    elif n % 2 == 0:
        return "正偶数"
    else:
        return "正奇数"`,
            testCases: [
              { input: 'classify_number(4)', expectedOutput: '正偶数' },
              { input: 'classify_number(7)', expectedOutput: '正奇数' },
              { input: 'classify_number(-3)', expectedOutput: '负数' },
              { input: 'classify_number(0)', expectedOutput: '零' }
            ]
          }
        }
      ]
    },
    {
      id: 'ch1-3',
      moduleId: 'python-basics',
      title: '流程控制',
      order: 3,
      lessons: [
        {
          id: 'les1-3-1',
          chapterId: 'ch1-3',
          title: '条件语句',
          type: 'both',
          content: `## 条件语句

条件语句是程序根据不同条件执行不同代码分支的结构，是编程中最基本的控制流之一。

### if-elif-else 语句

Python使用 \`if\`、\`elif\`（else if的缩写）、\`else\` 来实现条件分支：

\`\`\`python
if 条件1:
    代码块1
elif 条件2:
    代码块2
else:
    代码块3
\`\`\`

**关键要点：**
- 条件表达式后面必须加冒号 \`:\`
- 代码块通过缩进（4个空格）来界定，不需要花括号
- \`elif\` 可以有多个，\`else\` 最多一个且放在最后
- 条件表达式不需要括号（但加上也不报错）

### 条件表达式（三元运算符）

Python的三元运算符语法：\`值1 if 条件 else 值2\`

### match-case（Python 3.10+）

Python 3.10引入了结构化模式匹配，类似于其他语言的switch-case，但功能更强大，支持解构和守卫条件。

### 嵌套条件

条件语句可以嵌套使用，但建议不超过3层，过深的嵌套会降低代码可读性。可以考虑使用提前返回（guard clause）来减少嵌套。`,
          codeExample: `# 基本条件语句
score = 85

if score >= 90:
    grade = "优秀"
elif score >= 80:
    grade = "良好"
elif score >= 70:
    grade = "中等"
elif score >= 60:
    grade = "及格"
else:
    grade = "不及格"

print(f"成绩 {score} 分，等级：{grade}")

# 三元运算符
age = 20
status = "成年" if age >= 18 else "未成年"
print(f"{age}岁：{status}")

# 条件组合
day = "周六"
weather = "晴"
if day in ["周六", "周日"] and weather == "晴":
    print("适合出游！")
elif day in ["周六", "周日"]:
    print("周末但天气不好，宅家吧")
else:
    print("工作日，好好上班")

# 使用真值判断简化条件
data = [1, 2, 3]
if data:  # 等价于 if len(data) > 0
    print(f"列表非空，有 {len(data)} 个元素")
else:
    print("列表为空")`,
          exercise: {
            id: 'ex1-3-1',
            lessonId: 'les1-3-1',
            description: '编写一个函数 `calculate_bmi_category(weight, height)`，根据BMI值返回体重分类。BMI = 体重(kg) / 身高(m)²。分类标准：BMI<18.5为"偏瘦"，18.5<=BMI<24为"正常"，24<=BMI<28为"偏胖"，BMI>=28为"肥胖"。',
            initialCode: `def calculate_bmi_category(weight, height):
    # 请在此处编写代码
    pass

# 测试
print(calculate_bmi_category(60, 1.75))
print(calculate_bmi_category(80, 1.70))
print(calculate_bmi_category(50, 1.70))
print(calculate_bmi_category(100, 1.65))`,
            hints: [
              '先计算BMI值：bmi = weight / (height ** 2)',
              '然后用if-elif-else判断BMI所在的范围，返回对应分类'
            ],
            referenceAnswer: `def calculate_bmi_category(weight, height):
    bmi = weight / (height ** 2)
    if bmi < 18.5:
        return "偏瘦"
    elif bmi < 24:
        return "正常"
    elif bmi < 28:
        return "偏胖"
    else:
        return "肥胖"`,
            testCases: [
              { input: 'calculate_bmi_category(60, 1.75)', expectedOutput: '正常' },
              { input: 'calculate_bmi_category(80, 1.70)', expectedOutput: '偏胖' },
              { input: 'calculate_bmi_category(50, 1.70)', expectedOutput: '偏瘦' },
              { input: 'calculate_bmi_category(100, 1.65)', expectedOutput: '肥胖' }
            ]
          }
        },
        {
          id: 'les1-3-2',
          chapterId: 'ch1-3',
          title: '循环语句',
          type: 'both',
          content: `## 循环语句

循环语句用于重复执行一段代码，是处理批量数据的基础。

### for 循环

\`for\` 循环用于遍历可迭代对象（列表、字符串、range等）中的元素：

\`\`\`python
for 变量 in 可迭代对象:
    代码块
\`\`\`

**常用遍历方式：**
- \`for item in list\`：直接遍历元素
- \`for i in range(n)\`：按索引遍历
- \`for i, item in enumerate(list)\`：同时获取索引和元素
- \`for key, value in dict.items()\`：遍历字典键值对
- \`for a, b in zip(list1, list2)\`：并行遍历多个列表

### while 循环

\`while\` 循环在条件为True时反复执行代码块，适合循环次数不确定的场景：

\`\`\`python
while 条件:
    代码块
\`\`\`

### 循环控制

- \`break\`：立即退出当前循环
- \`continue\`：跳过本次迭代，进入下一次
- \`else\`子句：循环正常结束（未被break中断）时执行

### 嵌套循环

循环可以嵌套使用，常用于处理多维数据。注意嵌套循环的时间复杂度是乘积关系，应避免过深的嵌套。`,
          codeExample: `# for 循环遍历列表
fruits = ["苹果", "香蕉", "橙子"]
for fruit in fruits:
    print(f"我喜欢{fruit}")

# range 函数
print("\\n0到4:")
for i in range(5):
    print(i, end=" ")
print()

print("\\n2到8，步长2:")
for i in range(2, 9, 2):
    print(i, end=" ")
print()

# enumerate 获取索引
print("\\n带索引遍历:")
for i, fruit in enumerate(fruits):
    print(f"  {i}: {fruit}")

# zip 并行遍历
prices = [5.5, 3.2, 4.8]
print("\\n水果价格:")
for fruit, price in zip(fruits, prices):
    print(f"  {fruit}: ¥{price}")

# while 循环
print("\\n倒计时:")
count = 5
while count > 0:
    print(f"  {count}...")
    count -= 1
print("  发射！")

# break 和 continue
print("\\n找第一个偶数:")
for num in [1, 3, 7, 4, 9, 2]:
    if num % 2 != 0:
        continue  # 跳过奇数
    print(f"  找到偶数: {num}")
    break  # 找到后退出

# 循环的 else 子句
for n in range(2, 10):
    for i in range(2, n):
        if n % i == 0:
            break
    else:
        print(f"  {n}是质数")`,
          exercise: {
            id: 'ex1-3-2',
            lessonId: 'les1-3-2',
            description: '编写一个函数 `find_primes(n)`，找出小于n的所有质数，返回质数列表。质数是大于1且只能被1和自身整除的整数。',
            initialCode: `def find_primes(n):
    # 请在此处编写代码
    pass

# 测试
print(find_primes(10))
print(find_primes(20))
print(find_primes(2))`,
            hints: [
              '对于每个数i（从2到n-1），检查是否能被2到i-1之间的任何数整除',
              '如果i不能被2到sqrt(i)之间的任何数整除，则i是质数。也可以使用简单的遍历方法'
            ],
            referenceAnswer: `def find_primes(n):
    primes = []
    for i in range(2, n):
        is_prime = True
        for j in range(2, int(i**0.5) + 1):
            if i % j == 0:
                is_prime = False
                break
        if is_prime:
            primes.append(i)
    return primes`,
            testCases: [
              { input: 'find_primes(10)', expectedOutput: '[2, 3, 5, 7]' },
              { input: 'find_primes(20)', expectedOutput: '[2, 3, 5, 7, 11, 13, 17, 19]' },
              { input: 'find_primes(2)', expectedOutput: '[]' }
            ]
          }
        }
      ]
    },
    {
      id: 'ch1-4',
      moduleId: 'python-basics',
      title: '函数',
      order: 4,
      lessons: [
        {
          id: 'les1-4-1',
          chapterId: 'ch1-4',
          title: '函数定义与调用',
          type: 'both',
          content: `## 函数定义与调用

函数是组织好的、可重复使用的代码块，用于实现单一或相关联的功能。使用函数可以提高代码的模块化程度、减少重复代码、便于维护和测试。

### 定义函数

使用 \`def\` 关键字定义函数：

\`\`\`python
def 函数名(参数列表):
    """文档字符串（docstring）"""
    函数体
    return 返回值
\`\`\`

### 参数类型

1. **位置参数**：按顺序传递，调用时必须提供
2. **默认参数**：定义时指定默认值，调用时可省略
3. **关键字参数**：调用时使用 \`参数名=值\` 的形式，可以不按顺序
4. **可变位置参数**：\`*args\`，接收任意数量的位置参数，打包为元组
5. **可变关键字参数**：\`**kwargs\`，接收任意数量的关键字参数，打包为字典

### 返回值

- 使用 \`return\` 语句返回值
- 可以返回多个值（实际返回元组）
- 没有return语句则返回None
- 可以在函数中有多个return（不同条件分支）

### lambda表达式

lambda是匿名函数，语法为 \`lambda 参数: 表达式\`，适合简单的、一次性使用的函数。`,
          codeExample: `# 基本函数定义
def greet(name, greeting="你好"):
    """问候函数"""
    return f"{greeting}，{name}！"

print(greet("张三"))
print(greet("李四", greeting="早上好"))

# 多种参数类型
def student_info(name, age, *hobbies, **details):
    print(f"姓名: {name}, 年龄: {age}")
    print(f"爱好: {', '.join(hobbies)}")
    for key, value in details.items():
        print(f"  {key}: {value}")

student_info("王五", 20, "阅读", "游泳", school="北京大学", major="数据科学")

# 多返回值
def min_max(numbers):
    return min(numbers), max(numbers)

low, high = min_max([3, 1, 4, 1, 5, 9])
print(f"最小值: {low}, 最大值: {high}")

# lambda 表达式
square = lambda x: x ** 2
print(f"5的平方: {square(5)}")

# lambda 常与排序结合使用
students = [("张三", 85), ("李四", 92), ("王五", 78)]
students_sorted = sorted(students, key=lambda s: s[1], reverse=True)
print(f"按成绩排序: {students_sorted}")

# 函数作为参数
def apply_operation(data, operation):
    return [operation(x) for x in data]

numbers = [1, 2, 3, 4, 5]
doubled = apply_operation(numbers, lambda x: x * 2)
print(f"翻倍: {doubled}")`,
          exercise: {
            id: 'ex1-4-1',
            lessonId: 'les1-4-1',
            description: '编写一个函数 `calculate_stats(numbers)`，接收一个数字列表，返回一个字典，包含：平均值（mean）、中位数（median）、最大值（max）、最小值（min）。中位数：如果列表长度为奇数取中间值，偶数取中间两个的平均。',
            initialCode: `def calculate_stats(numbers):
    # 请在此处编写代码
    pass

# 测试
print(calculate_stats([1, 2, 3, 4, 5]))
print(calculate_stats([1, 2, 3, 4, 5, 6]))`,
            hints: [
              '平均值 = sum(numbers) / len(numbers)，最大最小值用 max() 和 min()',
              '中位数需要先排序，然后用 len 判断奇偶：偶数取中间两个的平均，奇数取中间值'
            ],
            referenceAnswer: `def calculate_stats(numbers):
    sorted_nums = sorted(numbers)
    n = len(sorted_nums)
    mean = sum(sorted_nums) / n
    if n % 2 == 0:
        median = (sorted_nums[n//2 - 1] + sorted_nums[n//2]) / 2
    else:
        median = sorted_nums[n//2]
    return {
        "mean": mean,
        "median": median,
        "max": max(sorted_nums),
        "min": min(sorted_nums)
    }`,
            testCases: [
              { input: 'calculate_stats([1, 2, 3, 4, 5])', expectedOutput: "{'mean': 3.0, 'median': 3, 'max': 5, 'min': 1}" },
              { input: 'calculate_stats([1, 2, 3, 4, 5, 6])', expectedOutput: "{'mean': 3.5, 'median': 3.5, 'max': 6, 'min': 1}" }
            ]
          }
        }
      ]
    },
    {
      id: 'ch1-5',
      moduleId: 'python-basics',
      title: '模块与包',
      order: 5,
      lessons: [
        {
          id: 'les1-5-1',
          chapterId: 'ch1-5',
          title: '模块导入与常用标准库',
          type: 'both',
          content: `## 模块导入与常用标准库

模块是Python组织代码的基本方式，一个.py文件就是一个模块，包含函数、类和变量的定义。包是包含多个模块的目录，通过层次结构组织相关模块。

### 导入方式

1. \`import 模块名\`：导入整个模块，使用时需要加前缀
2. \`from 模块名 import 名称\`：导入模块中的特定名称
3. \`from 模块名 import *\`：导入模块中所有公开名称（不推荐）
4. \`import 模块名 as 别名\`：给模块起别名

### 常用标准库

| 模块 | 用途 | 常用功能 |
|------|------|----------|
| os | 操作系统接口 | 文件路径、环境变量 |
| sys | 系统相关 | 命令行参数、路径 |
| math | 数学运算 | sin、cos、sqrt、pi |
| random | 随机数 | random、randint、choice |
| datetime | 日期时间 | date、datetime、timedelta |
| json | JSON处理 | dumps、loads |
| collections | 高级容器 | Counter、defaultdict、deque |
| itertools | 迭代工具 | chain、combinations、permutations |
| re | 正则表达式 | match、search、findall |
| pathlib | 路径操作 | Path对象 |

### 模块搜索路径

Python按照以下顺序搜索模块：
1. 当前目录
2. PYTHONPATH环境变量指定的目录
3. 标准库目录
4. 第三方包目录（site-packages）

### \\_\\_name\\_\\_ 变量

每个模块都有 \`__name__\` 属性。当模块被直接运行时，\`__name__\` 等于 \`"__main__"\`；被导入时等于模块名。这常用于编写可被导入也可直接运行的代码。`,
          codeExample: `# 不同的导入方式
import math
from datetime import datetime
from collections import Counter
import random as rnd

# math 模块
print(f"圆周率: {math.pi}")
print(f"根号2: {math.sqrt(2)}")
print(f"e的2次方: {math.exp(2)}")

# datetime 模块
now = datetime.now()
print(f"当前时间: {now}")
print(f"格式化: {now.strftime('%Y年%m月%d日 %H:%M:%S')}")

# random 模块
rnd.seed(42)  # 设置随机种子
print(f"随机浮点数: {rnd.random()}")
print(f"随机整数(1-10): {rnd.randint(1, 10)}")
print(f"随机选择: {rnd.choice(['A', 'B', 'C', 'D'])}")

# collections.Counter
text = "数据分析是商务数据分析的核心"
counter = Counter(text)
print(f"字符频率: {counter.most_common(5)}")

# json 模块
import json
data = {"name": "张三", "scores": [85, 92, 78]}
json_str = json.dumps(data, ensure_ascii=False)
print(f"JSON字符串: {json_str}")
parsed = json.loads(json_str)
print(f"解析后: {parsed}")

# __name__ 检查
if __name__ == "__main__":
    print("这是主程序")`,
          exercise: {
            id: 'ex1-5-1',
            lessonId: 'les1-5-1',
            description: '编写一个函数 `generate_password(length)`，使用random模块生成指定长度的随机密码。密码必须包含至少一个大写字母、一个小写字母、一个数字。返回生成的密码字符串。',
            initialCode: `import random
import string

def generate_password(length):
    # 请在此处编写代码
    pass

# 测试
random.seed(42)
print(generate_password(8))
random.seed(123)
print(generate_password(12))`,
            hints: [
              '使用 string.ascii_uppercase、string.ascii_lowercase、string.digits 获取字符集',
              '先确保每种字符至少一个，然后用随机字符填充剩余长度，最后打乱顺序'
            ],
            referenceAnswer: `import random
import string

def generate_password(length):
    if length < 3:
        length = 3
    chars = []
    chars.append(random.choice(string.ascii_uppercase))
    chars.append(random.choice(string.ascii_lowercase))
    chars.append(random.choice(string.digits))
    all_chars = string.ascii_letters + string.digits
    for _ in range(length - 3):
        chars.append(random.choice(all_chars))
    random.shuffle(chars)
    return ''.join(chars)`,
            testCases: [
              { input: 'random.seed(42); p = generate_password(8); len(p) == 8 and any(c.isupper() for c in p) and any(c.islower() for c in p) and any(c.isdigit() for c in p)', expectedOutput: 'True' },
              { input: 'random.seed(42); generate_password(8)', expectedOutput: 'd1eJ7fFq' }
            ]
          }
        }
      ]
    },
    {
      id: 'ch1-6',
      moduleId: 'python-basics',
      title: '文件操作',
      order: 6,
      lessons: [
        {
          id: 'les1-6-1',
          chapterId: 'ch1-6',
          title: '文件读写与CSV处理',
          type: 'both',
          content: `## 文件读写与CSV处理

文件操作是数据分析的基础技能，数据通常存储在文件中，需要先读取到程序中才能进行分析处理。

### 文件打开与关闭

使用 \`open()\` 函数打开文件，常用模式：
- \`'r'\`：只读（默认）
- \`'w'\`：写入（覆盖）
- \`'a'\`：追加
- \`'b'\`：二进制模式
- \`'+'\`：读写模式

### with 语句

推荐使用 \`with\` 语句打开文件，它会自动在代码块结束时关闭文件，即使发生异常也能正确关闭：

\`\`\`python
with open('file.txt', 'r', encoding='utf-8') as f:
    content = f.read()
\`\`\`

### 读取方法

- \`read()\`：读取全部内容为字符串
- \`readline()\`：读取一行
- \`readlines()\`：读取所有行，返回列表
- 直接迭代：\`for line in f:\` 逐行读取（内存友好）

### 写入方法

- \`write(s)\`：写入字符串
- \`writelines(lines)\`：写入字符串列表

### CSV文件处理

CSV（逗号分隔值）是数据分析中最常见的文件格式之一。Python标准库 \`csv\` 模块提供了CSV文件的读写支持：

- \`csv.reader()\`：读取CSV文件，返回每行作为列表
- \`csv.writer()\`：写入CSV文件
- \`csv.DictReader()\`：读取为字典（以表头为键）
- \`csv.DictWriter()\`：以字典形式写入

在数据分析实践中，通常使用pandas的 \`read_csv()\` 函数来读取CSV文件，功能更强大。`,
          codeExample: `# 写入文本文件
with open('example.txt', 'w', encoding='utf-8') as f:
    f.write("第一行内容\\n")
    f.write("第二行内容\\n")
    lines = ["第三行\\n", "第四行\\n"]
    f.writelines(lines)

# 读取文本文件
with open('example.txt', 'r', encoding='utf-8') as f:
    content = f.read()
    print("全部内容:")
    print(content)

# 逐行读取
with open('example.txt', 'r', encoding='utf-8') as f:
    print("逐行读取:")
    for i, line in enumerate(f):
        print(f"  行{i+1}: {line.strip()}")

# CSV 文件处理
import csv

# 写入CSV
data = [
    ["姓名", "年龄", "成绩"],
    ["张三", 20, 85],
    ["李四", 21, 92],
    ["王五", 19, 78]
]
with open('students.csv', 'w', newline='', encoding='utf-8') as f:
    writer = csv.writer(f)
    writer.writerows(data)

# 读取CSV
with open('students.csv', 'r', encoding='utf-8') as f:
    reader = csv.reader(f)
    for row in reader:
        print(row)

# 使用DictReader
with open('students.csv', 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    for row in reader:
        print(f"{row['姓名']}: {row['成绩']}分")`,
          exercise: {
            id: 'ex1-6-1',
            lessonId: 'les1-6-1',
            description: '编写一个函数 `count_word_frequency(filename)`，读取文本文件，统计每个单词出现的频率，返回按频率降序排列的列表，每个元素为 (word, count) 元组。不区分大小写，忽略标点符号。',
            initialCode: `import string

def count_word_frequency(filename):
    # 请在此处编写代码
    pass

# 测试（先创建测试文件）
with open('test_words.txt', 'w', encoding='utf-8') as f:
    f.write("Hello world! Hello Python. Python is great, world is great.")

print(count_word_frequency('test_words.txt'))`,
            hints: [
              '使用 str.translate 或正则表达式去除标点，然后将文本转为小写',
              '使用 split() 分词，然后用字典或 collections.Counter 统计频率'
            ],
            referenceAnswer: `import string
from collections import Counter

def count_word_frequency(filename):
    with open(filename, 'r', encoding='utf-8') as f:
        text = f.read()
    text = text.lower()
    text = text.translate(str.maketrans('', '', string.punctuation))
    words = text.split()
    counter = Counter(words)
    return counter.most_common()`,
            testCases: [
              { input: "count_word_frequency('test_words.txt')", expectedOutput: "[('hello', 2), ('world', 2), ('is', 2), ('great', 2), ('python', 2)]" }
            ]
          }
        }
      ]
    }
  ]
};
