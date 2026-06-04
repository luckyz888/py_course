import type { AIChatMessage } from '../types';

// AI教练系统提示词
const SYSTEM_PROMPT = `你是一个严格的Python数据分析教练，你的任务是帮助用户通过实操项目学习数据分析，而不是替他们写代码。
1. 永远不要直接给用户完整的可运行代码，只给思路和关键代码片段；
2. 当用户代码报错时，先指出错误原因，再告诉他们应该怎么改，不要直接贴修正后的代码；
3. 当用户说"我卡住了"时，给他们一个下一步的提示，引导他们自己思考；
4. 当用户答错题目时，一定要先追问："你哪里错了？漏掉了什么？"，然后再详细解释；
5. 始终强调思维的重要性，而不是语法的正确性；
6. 语言要简洁、直白、严厉，不要太客气。`;

// 本地AI回复生成（基于规则，无需API）
export function generateLocalAIResponse(
  userMessage: string,
  context: {
    projectTitle: string;
    currentTask?: string;
    userCode?: string;
    error?: string;
  }
): string {
  const msg = userMessage.toLowerCase();

  // 代码报错场景
  if (context.error || msg.includes('报错') || msg.includes('error') || msg.includes('错误')) {
    if (context.error) {
      return `你的代码报错了。先看看错误信息：${context.error.substring(0, 200)}\n\n别急着改代码，先想清楚三个问题：\n1. 这个错误是在哪一行产生的？\n2. 错误类型是什么（语法错误、类型错误、键错误...）？\n3. 导致这个错误的根本原因是什么？\n\n想清楚再动手改。`;
    }
    return `报错了？别慌。先把完整的错误信息贴出来，我帮你分析。记住：看错误信息要从下往上看，最后一行通常是最关键的。`;
  }

  // 卡住了
  if (msg.includes('卡住') || msg.includes('不会') || msg.includes('不知道怎么做')) {
    return `卡住了？先别急着看答案。试试这样想：\n\n1. 你现在要解决的问题是什么？用一句话描述清楚\n2. 你已经尝试了什么方法？\n3. 卡在哪一步了？\n\n把思路理清楚，问题往往就解决了一半。如果还是想不通，告诉我具体卡在哪里，我给你一个方向。`;
  }

  // 思路点拨
  if (msg.includes('思路') || msg.includes('提示') || msg.includes('hint')) {
    if (context.currentTask) {
      return `关于"${context.currentTask}"的思路提示：\n\n1. 先明确你要对哪些数据进行操作\n2. 想想用pandas的哪个方法最合适（groupby? merge? pivot_table?）\n3. 注意数据的粒度——你是在行级别操作还是聚合级别操作？\n4. 先写伪代码，再翻译成pandas代码\n\n记住：先想清楚"做什么"，再想"怎么做"。`;
    }
    return `需要思路提示？告诉我你正在做哪个任务，我帮你理清思路。但记住，我只能给方向，不能替你写代码。`;
  }

  // 代码纠错
  if (msg.includes('纠错') || msg.includes('检查') || msg.includes('review')) {
    if (context.userCode) {
      return `让我看看你的代码...\n\n先自己检查这几个常见问题：\n1. 列名写对了吗？（大小写、空格）\n2. 数据类型对吗？（字符串vs数字vs日期）\n3. 索引对齐了吗？（reset_index了吗？）\n4. 有没有意外修改了原始数据？\n\n如果自己查不出来，把代码和报错信息一起发给我。`;
    }
    return `想让我帮你检查代码？先把你的代码和运行结果贴出来。不过我更建议你先自己review一遍——大部分bug自己就能发现。`;
  }

  // 概念解释
  if (msg.includes('概念') || msg.includes('解释') || msg.includes('什么是') || msg.includes('什么意思')) {
    return `概念问题？好的，先告诉我你具体想了解哪个概念。\n\n学习数据分析概念最好的方式是：\n1. 先理解"为什么需要它"——解决什么问题\n2. 再理解"它是什么"——核心原理\n3. 最后理解"怎么用"——实际操作\n\n你问的具体概念是什么？我按这个顺序给你讲。`;
  }

  // 默认回复
  return `我听到了你的问题。作为你的数据分析教练，我的建议是：\n\n1. 先把问题具体化——你遇到了什么困难？\n2. 告诉我你目前的进度和思路\n3. 我会给你方向，但代码得你自己写\n\n学习数据分析最重要的不是记住语法，而是培养数据思维。加油！`;
}

// 预设的AI快捷操作
export const AI_QUICK_ACTIONS = [
  { id: 'hint', label: '思路点拨', icon: '💡', prompt: '给我一些思路提示' },
  { id: 'debug', label: '代码纠错', icon: '🔧', prompt: '帮我检查代码问题' },
  { id: 'stuck', label: '我卡住了', icon: '🆘', prompt: '我卡住了，不知道下一步怎么做' },
  { id: 'explain', label: '概念解释', icon: '📖', prompt: '请解释一下相关概念' },
];

// 生成唯一ID
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}
