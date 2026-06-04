import { useState, useRef, useCallback, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { Play, Loader2, Terminal, X } from 'lucide-react';
import { runPython, isPyodideLoaded, loadPyodide, onStatusChange } from '../utils/pyodide';

interface CodeEditorProps {
  code: string;
  onCodeChange?: (code: string) => void;
  height?: string;
  datasetCode?: string;
}

export default function CodeEditor({ code, onCodeChange, height = '350px', datasetCode }: CodeEditorProps) {
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [pyodideState, setPyodideState] = useState<'idle' | 'loading' | 'ready'>(
    isPyodideLoaded() ? 'ready' : 'idle'
  );
  const [loadingStatus, setLoadingStatus] = useState('');
  const [runCount, setRunCount] = useState(0);
  const editorRef = useRef<any>(null);

  // 监听 Pyodide 加载状态
  useEffect(() => {
    const cleanup = onStatusChange((status) => {
      setLoadingStatus(status);
      if (status === '就绪') {
        setPyodideState('ready');
      } else if (status === '加载失败') {
        setPyodideState('idle');
      } else {
        setPyodideState('loading');
      }
    });
    return cleanup;
  }, []);

  const handleEditorMount = (editor: any) => {
    editorRef.current = editor;
  };

  // 加载 Pyodide
  const ensurePyodide = useCallback(async () => {
    if (isPyodideLoaded()) {
      setPyodideState('ready');
      return true;
    }
    try {
      setPyodideState('loading');
      await loadPyodide();
      setPyodideState('ready');
      return true;
    } catch {
      setPyodideState('idle');
      return false;
    }
  }, []);

  const handleRun = async () => {
    if (isRunning) return;
    setIsRunning(true);
    setOutput('');
    setError(null);
    setImages([]);
    setRunCount((c) => c + 1);

    try {
      const ok = await ensurePyodide();
      if (!ok) {
        setError('Python 环境加载失败，请刷新页面重试');
        return;
      }

      // 先运行数据集代码（确保数据可用）
      if (datasetCode) {
        try {
          await runPython(datasetCode);
        } catch {
          // 数据集可能已加载，忽略错误
        }
      }

      // 运行用户代码
      const result = await runPython(code);
      setOutput(result.output);
      setError(result.error);
      setImages(result.images);
    } catch (err: any) {
      setError(err.message || '运行出错');
    } finally {
      setIsRunning(false);
    }
  };

  // 快捷键：Ctrl+Enter 运行
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        handleRun();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [handleRun, code]);

  const handleClear = () => {
    setOutput('');
    setError(null);
    setImages([]);
  };

  const hasOutput = output || error || images.length > 0;

  return (
    <div className="flex flex-col border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
      {/* 工具栏 */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 text-white shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Terminal size={14} className="text-amber-400" />
            <span className="text-sm font-medium">Python 控制台</span>
          </div>
          {pyodideState === 'loading' && (
            <div className="flex items-center gap-2 text-xs text-amber-300">
              <Loader2 size={12} className="animate-spin" />
              <span>{loadingStatus || '加载中...'}</span>
            </div>
          )}
          {pyodideState === 'ready' && (
            <span className="flex items-center gap-1.5 text-xs text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              就绪
            </span>
          )}
          {pyodideState === 'idle' && (
            <span className="text-xs text-gray-400">点击运行自动加载环境</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {hasOutput && (
            <button
              onClick={handleClear}
              className="flex items-center gap-1 px-2.5 py-1 text-xs bg-gray-700 hover:bg-gray-600 rounded transition-colors"
              title="清空输出"
            >
              <X size={12} />
              清空
            </button>
          )}
          <button
            onClick={handleRun}
            disabled={isRunning || pyodideState === 'loading'}
            className="flex items-center gap-1.5 px-4 py-1.5 text-sm font-semibold bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed rounded transition-colors shadow-sm"
          >
            {isRunning ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                运行中...
              </>
            ) : (
              <>
                <Play size={14} />
                运行
              </>
            )}
          </button>
        </div>
      </div>

      {/* 编辑器 */}
      <div style={{ height }}>
        <Editor
          height={height}
          language="python"
          theme="vs-dark"
          value={code}
          onChange={(value) => onCodeChange?.(value || '')}
          onMount={handleEditorMount}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 4,
            wordWrap: 'on',
            padding: { top: 12 },
            suggestOnTriggerCharacters: true,
            quickSuggestions: true,
          }}
        />
      </div>

      {/* 输出区域 - 始终显示 */}
      <div className="border-t border-gray-300">
        <div className="px-4 py-1.5 bg-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span>输出结果</span>
            {runCount > 0 && (
              <span className="text-gray-400 normal-case font-normal">
                第 {runCount} 次运行
              </span>
            )}
          </div>
          {isRunning && (
            <span className="text-amber-600 flex items-center gap-1 normal-case">
              <Loader2 size={10} className="animate-spin" />
              执行中...
            </span>
          )}
        </div>
        <div className="p-4 bg-gray-50 min-h-[80px] max-h-[300px] overflow-y-auto">
          {!hasOutput && !isRunning && (
            <div className="text-sm text-gray-400 flex items-center gap-2">
              <Play size={14} />
              <span>点击「运行」或按 Ctrl+Enter 执行代码</span>
            </div>
          )}
          {isRunning && !hasOutput && (
            <div className="text-sm text-gray-400 flex items-center gap-2">
              <Loader2 size={14} className="animate-spin" />
              <span>正在执行代码...</span>
            </div>
          )}
          {output && (
            <pre className="text-sm text-gray-800 whitespace-pre-wrap font-mono leading-relaxed">{output}</pre>
          )}
          {error && (
            <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg">
              <pre className="text-sm text-red-600 whitespace-pre-wrap font-mono leading-relaxed">{error}</pre>
            </div>
          )}
          {images.map((img, i) => (
            <div key={i} className="mt-3">
              <img
                src={`data:image/png;base64,${img}`}
                alt={`图表输出 ${i + 1}`}
                className="max-w-full rounded border border-gray-200 shadow-sm"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
