import { useState, useRef, useEffect } from 'react';
import { Send, Trash2, Bot, User } from 'lucide-react';
import { useBootcampStore } from '../stores/bootcampStore';
import { generateLocalAIResponse, AI_QUICK_ACTIONS, generateId } from '../utils/aiCoach';
import type { AIChatMessage } from '../types';

interface AICoachPanelProps {
  projectId: string;
  projectTitle: string;
  currentTask?: string;
  userCode?: string;
  error?: string;
}

export default function AICoachPanel({ projectId, projectTitle, currentTask, userCode, error }: AICoachPanelProps) {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const chatHistory = useBootcampStore((s) => s.getChatHistory(projectId));
  const addChatMessage = useBootcampStore((s) => s.addChatMessage);
  const clearChatHistory = useBootcampStore((s) => s.clearChatHistory);

  // 自动滚动到底部
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    // 添加用户消息
    const userMsg: AIChatMessage = {
      id: generateId(),
      role: 'user',
      content: trimmed,
      timestamp: new Date().toISOString(),
    };
    addChatMessage(projectId, userMsg);

    // 生成AI回复
    const aiContent = generateLocalAIResponse(trimmed, {
      projectTitle,
      currentTask,
      userCode,
      error,
    });

    const aiMsg: AIChatMessage = {
      id: generateId(),
      role: 'assistant',
      content: aiContent,
      timestamp: new Date().toISOString(),
    };
    addChatMessage(projectId, aiMsg);

    setInput('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleQuickAction = (prompt: string) => {
    sendMessage(prompt);
  };

  const handleClear = () => {
    clearChatHistory(projectId);
  };

  return (
    <div className="flex flex-col h-full border-l border-gray-200 bg-white">
      {/* 顶部标题 */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center gap-2">
          <Bot size={20} className="text-indigo-600" />
          <h3 className="font-semibold text-gray-800">AI 陪练教练</h3>
        </div>
        <button
          onClick={handleClear}
          className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
          title="清空聊天记录"
        >
          <Trash2 size={16} />
        </button>
      </div>

      {/* 快捷操作 */}
      <div className="flex flex-wrap gap-2 px-4 py-3 border-b border-gray-100">
        {AI_QUICK_ACTIONS.map((action) => (
          <button
            key={action.id}
            onClick={() => handleQuickAction(action.prompt)}
            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-100 hover:bg-indigo-50 hover:text-indigo-700 rounded-full transition-colors"
          >
            <span>{action.icon}</span>
            {action.label}
          </button>
        ))}
      </div>

      {/* 聊天消息列表 */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        {chatHistory.length === 0 && (
          <div className="text-center text-sm text-gray-400 mt-8">
            <Bot size={32} className="mx-auto mb-2 text-gray-300" />
            <p>有问题随时问我</p>
            <p className="mt-1">我会引导你自己思考，而不是直接给答案</p>
          </div>
        )}
        {chatHistory.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
          >
            {/* 头像 */}
            <div
              className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center ${
                msg.role === 'assistant'
                  ? 'bg-indigo-100 text-indigo-600'
                  : 'bg-amber-100 text-amber-600'
              }`}
            >
              {msg.role === 'assistant' ? <Bot size={14} /> : <User size={14} />}
            </div>
            {/* 消息气泡 */}
            <div
              className={`max-w-[85%] px-3 py-2 rounded-lg text-sm whitespace-pre-wrap leading-relaxed ${
                msg.role === 'assistant'
                  ? 'bg-indigo-50 text-gray-800 rounded-tl-none'
                  : 'bg-amber-50 text-gray-800 rounded-tr-none'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* 底部输入框 */}
      <form onSubmit={handleSubmit} className="flex items-center gap-2 px-4 py-3 border-t border-gray-200">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="输入你的问题..."
          className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300"
        />
        <button
          type="submit"
          disabled={!input.trim()}
          className="p-2 text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg transition-colors"
        >
          <Send size={16} />
        </button>
      </form>
    </div>
  );
}
