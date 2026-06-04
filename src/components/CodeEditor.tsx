import { useState, useRef, useCallback } from 'react';
import Editor from '@monaco-editor/react';
import { Play, Loader2, Terminal, X } from 'lucide-react';
import { runPython, isPyodideLoaded, loadPyodide } from '../utils/pyodide';

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
  const [showOutput, setShowOutput] = useState(false);
  const editorRef = useRef<any>(null);

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
    setShowOutput(true);

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

  return (
    <div className="flex flex-col border border-gray-200 rounded-lg overflow-hidden bg-white">
      {/* 工具栏 */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 text-white shrink-0">
        <div className="flex items-center gap-2">
          <Terminal size={14} className="text-amber-400" />
          <span className="text-sm font-medium">Python 控制台</span>
          {pyodideState === 'loading' && (
            <span className="text-xs text-amber-300 flex items-center gap-1">
              <Loader2 size={12} className="animate-spin" />
              加载Python环境...
            </span>
          )}
          {pyodideState === 'ready' && (
            <span className="text-xs text-emerald-400">● 就绪</span>
          )}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => {
              setOutput('');
              setError(null);
              setImages([]);
              setShowOutput(false);
            }}
            className="flex items-center gap-1 px-3 py-1 text-sm bg-gray-700 hover:bg-gray-600 rounded transition-colors"
          >
            <X size={14} />
            清空输出
          </button>
          <button
            onClick={handleRun}
            disabled={isRunning || pyodideState === 'loading'}
            className="flex items-center gap-1.5 px-4 py-1.5 text-sm font-semibold bg-amber-500 hover:bg-amber-400 disabled:opacity-50 disabled:cursor-not-allowed rounded transition-colors"
          >
            {isRunning ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <Play size={14} />
            )}
            {isRunning ? '运行中...' : '运行代码'}
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
          }}
        />
      </div>

      {/* 输出区域 */}
      {showOutput && (
        <div className="border-t border-gray-300">
          <div className="px-4 py-1.5 bg-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center justify-between">
            <span>输出结果</span>
            {isRunning && (
              <span className="text-amber-600 flex items-center gap-1 normal-case">
                <Loader2 size={10} className="animate-spin" />
                执行中...
              </span>
            )}
          </div>
          <div className="p-4 bg-gray-50 max-h-[300px] overflow-y-auto">
            {!output && !error && images.length === 0 && !isRunning && (
              <p className="text-sm text-gray-400 italic">点击"运行代码"查看结果</p>
            )}
            {output && (
              <pre className="text-sm text-gray-800 whitespace-pre-wrap font-mono leading-relaxed">{output}</pre>
            )}
            {error && (
              <pre className="text-sm text-red-500 whitespace-pre-wrap font-mono leading-relaxed mt-2">{error}</pre>
            )}
            {images.map((img, i) => (
              <img
                key={i}
                src={`data:image/png;base64,${img}`}
                alt={`图表输出 ${i + 1}`}
                className="max-w-full mt-3 rounded border border-gray-200 shadow-sm"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
