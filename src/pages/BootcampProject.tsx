import { useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  BookOpen,
  Code2,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Play,
  FileCode,
  Lightbulb,
  Upload,
} from 'lucide-react';
import { bootcampProjects } from '../data/bootcamp';
import { useBootcampStore } from '../stores/bootcampStore';
import CodeEditor from '../components/CodeEditor';
import MarkdownRenderer from '../components/MarkdownRenderer';

type TabKey = 'outline' | 'coding' | 'solution';

export default function BootcampProject() {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const store = useBootcampStore();

  const project = bootcampProjects.find((p) => p.id === projectId);

  const [activeTab, setActiveTab] = useState<TabKey>('outline');
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
  const [editorCode, setEditorCode] = useState<string>(() => {
    if (!project) return '';
    return store.getCode(project.id) || project.starterCode;
  });
  const handleCodeChange = useCallback(
    (code: string) => {
      setEditorCode(code);
      if (project) store.saveCode(project.id, code);
    },
    [project, store]
  );

  const handleRunExample = useCallback(
    (code: string) => {
      setEditorCode(code);
      if (project) store.saveCode(project.id, code);
      setActiveTab('coding');
    },
    [project, store]
  );

  const handleLoadToEditor = useCallback(
    (code: string) => {
      setEditorCode(code);
      if (project) store.saveCode(project.id, code);
      setActiveTab('coding');
    },
    [project, store]
  );

  const toggleSection = (sectionTitle: string) => {
    setExpandedSections((prev) => ({ ...prev, [sectionTitle]: !prev[sectionTitle] }));
  };

  const toggleItem = (itemKey: string) => {
    setExpandedItems((prev) => ({ ...prev, [itemKey]: !prev[itemKey] }));
  };

  if (!project) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <p className="text-lg text-gray-600 mb-2">项目未找到</p>
          <p className="text-sm text-gray-400 mb-4">projectId: {projectId}</p>
          <button
            onClick={() => navigate('/bootcamp')}
            className="px-4 py-2 bg-indigo-900 text-white rounded-lg hover:bg-indigo-800 transition-colors"
          >
            返回训练营
          </button>
        </div>
      </div>
    );
  }

  const tabs: { key: TabKey; label: string; icon: React.ReactNode }[] = [
    { key: 'outline', label: '学习大纲', icon: <BookOpen size={16} /> },
    { key: 'coding', label: '在线编程', icon: <Code2 size={16} /> },
    { key: 'solution', label: '参考解答', icon: <Lightbulb size={16} /> },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* 顶部导航 */}
      <div className="flex items-center gap-3 mb-4 shrink-0">
        <button
          onClick={() => navigate('/bootcamp')}
          className="flex items-center gap-1 text-sm text-gray-500 hover:text-indigo-900 transition-colors"
        >
          <ArrowLeft size={16} />
          返回训练营
        </button>
        <span className="text-gray-300">|</span>
        <h1 className="text-lg font-bold text-gray-900 truncate">{project.title}</h1>
      </div>

      {/* 标签栏 */}
      <div className="flex shrink-0 border-b border-gray-200 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-1.5 px-5 py-2.5 text-sm font-medium transition-colors ${
              activeTab === tab.key
                ? 'bg-indigo-900 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            } ${tab.key === 'outline' ? 'rounded-tl-lg' : ''} ${
              tab.key === 'solution' ? 'rounded-tr-lg' : ''
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* 标签内容 */}
      <div className="flex-1 min-h-0 overflow-y-auto">
        {activeTab === 'outline' && (
          <OutlineTab
            project={project}
            expandedSections={expandedSections}
            expandedItems={expandedItems}
            onToggleSection={toggleSection}
            onToggleItem={toggleItem}
            onRunExample={handleRunExample}
          />
        )}
        {activeTab === 'coding' && (
          <CodingTab
            project={project}
            code={editorCode}
            onCodeChange={handleCodeChange}
          />
        )}
        {activeTab === 'solution' && (
          <SolutionTab
            project={project}
            onLoadToEditor={handleLoadToEditor}
          />
        )}
      </div>
    </div>
  );
}

// ==================== 学习大纲标签 ====================

interface OutlineTabProps {
  project: (typeof bootcampProjects)[number];
  expandedSections: Record<string, boolean>;
  expandedItems: Record<string, boolean>;
  onToggleSection: (title: string) => void;
  onToggleItem: (key: string) => void;
  onRunExample: (code: string) => void;
}

function OutlineTab({
  project,
  expandedSections,
  expandedItems,
  onToggleSection,
  onToggleItem,
  onRunExample,
}: OutlineTabProps) {
  return (
    <div className="space-y-6 pb-6">
      {/* 项目信息头部 */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h2>
        <p className="text-gray-600 mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
            {project.difficultyLabel}
          </span>
          {project.tags.map((tag) => (
            <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* 大纲章节 */}
      {project.outline.map((section, si) => {
        const sectionOpen = expandedSections[section.title] ?? false;
        return (
          <div key={si} className="bg-white rounded-xl shadow-sm overflow-hidden">
            {/* 章节标题 */}
            <button
              onClick={() => onToggleSection(section.title)}
              className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-indigo-900 text-white text-sm font-bold">
                  {si + 1}
                </span>
                <span className="font-bold text-gray-900">{section.title}</span>
              </div>
              {sectionOpen ? (
                <ChevronDown size={20} className="text-gray-400" />
              ) : (
                <ChevronRight size={20} className="text-gray-400" />
              )}
            </button>

            {/* 章节内容 */}
            {sectionOpen && (
              <div className="border-t border-gray-100">
                {section.items.map((item, ii) => {
                  const itemKey = `${si}-${ii}`;
                  const itemOpen = expandedItems[itemKey] ?? false;
                  return (
                    <div key={ii} className="border-b border-gray-50 last:border-b-0">
                      {/* 知识点标题 */}
                      <button
                        onClick={() => onToggleItem(itemKey)}
                        className="w-full flex items-center justify-between px-6 py-3 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                          <span className="text-sm font-medium text-gray-800">{item.title}</span>
                        </div>
                        {itemOpen ? (
                          <ChevronDown size={16} className="text-gray-400" />
                        ) : (
                          <ChevronRight size={16} className="text-gray-400" />
                        )}
                      </button>

                      {/* 知识点详情 */}
                      {itemOpen && (
                        <div className="px-6 pb-4 space-y-4">
                          {/* 知识讲解 */}
                          <div className="pl-3.5">
                            <MarkdownRenderer content={item.content} />
                          </div>

                          {/* 代码示例 */}
                          {item.codeExample && (
                            <div className="relative rounded-lg overflow-hidden">
                              <pre className="bg-gray-900 text-green-300 p-4 pr-24 overflow-x-auto text-sm font-mono leading-relaxed">
                                {item.codeExample}
                              </pre>
                              <button
                                onClick={() => onRunExample(item.codeExample)}
                                className="absolute top-3 right-3 flex items-center gap-1 px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-white text-xs font-medium rounded transition-colors"
                              >
                                <Play size={12} />
                                运行示例
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ==================== 在线编程标签 ====================

interface CodingTabProps {
  project: (typeof bootcampProjects)[number];
  code: string;
  onCodeChange: (code: string) => void;
}

function CodingTab({ project, code, onCodeChange }: CodingTabProps) {
  const store = useBootcampStore();

  const handleLoadStarterCode = () => {
    onCodeChange(project.starterCode);
  };

  const handleLoadReference = () => {
    onCodeChange(project.referenceSolution);
  };

  return (
    <div className="space-y-4 pb-6">
      {/* 工具栏 */}
      <div className="flex items-center justify-between bg-white rounded-xl px-4 py-3 shadow-sm">
        <span className="font-bold text-gray-900">{project.title}</span>
        <div className="flex gap-2">
          <button
            onClick={handleLoadStarterCode}
            className="flex items-center gap-1 px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
          >
            <FileCode size={14} />
            起始代码
          </button>
          <button
            onClick={handleLoadReference}
            className="flex items-center gap-1 px-3 py-1.5 text-sm bg-indigo-900 hover:bg-indigo-800 text-white rounded-lg transition-colors"
          >
            <Lightbulb size={14} />
            参考解答
          </button>
        </div>
      </div>

      {/* 代码编辑器 + 运行控制台 */}
      <CodeEditor
        code={code}
        onCodeChange={onCodeChange}
        height="400px"
        datasetCode={project.datasetCode}
      />

      {/* 任务列表 */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <h3 className="font-bold text-gray-800 mb-3">任务列表</h3>
        <div className="space-y-2">
          {project.tasks.map((task, i) => {
            const completed = store.isTaskCompleted(project.id, task.id);
            return (
              <div
                key={task.id}
                className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <button
                  onClick={() => {
                    if (!completed) store.completeTask(project.id, task.id);
                  }}
                  className="shrink-0"
                >
                  <CheckCircle2
                    size={20}
                    className={completed ? 'text-green-500' : 'text-gray-300'}
                  />
                </button>
                <span className="text-sm text-gray-500 w-6">{i + 1}.</span>
                <span
                  className={`text-sm ${
                    completed ? 'text-gray-400 line-through' : 'text-gray-800 font-medium'
                  }`}
                >
                  {task.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ==================== 参考解答标签 ====================

interface SolutionTabProps {
  project: (typeof bootcampProjects)[number];
  onLoadToEditor: (code: string) => void;
}

function SolutionTab({ project, onLoadToEditor }: SolutionTabProps) {
  return (
    <div className="space-y-6 pb-6">
      {/* 参考解答代码 */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="font-bold text-gray-800">参考解答</h3>
          <button
            onClick={() => onLoadToEditor(project.referenceSolution)}
            className="flex items-center gap-1.5 px-4 py-2 bg-indigo-900 hover:bg-indigo-800 text-white text-sm font-medium rounded-lg transition-colors"
          >
            <Upload size={14} />
            加载到编辑器
          </button>
        </div>
        <pre className="bg-gray-900 text-green-300 p-6 overflow-x-auto text-sm font-mono leading-relaxed">
          {project.referenceSolution}
        </pre>
      </div>

      {/* 任务提示 */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="font-bold text-gray-800 mb-4">任务提示</h3>
        <div className="space-y-3">
          {project.tasks.map((task, i) => (
            <div key={task.id} className="p-3 bg-amber-50 border border-amber-100 rounded-lg">
              <div className="text-sm font-medium text-amber-800 mb-1">
                {i + 1}. {task.title}
              </div>
              <div className="text-sm text-amber-700">{task.hint}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
