import { useRef, useState } from 'react';
import Editor from '@monaco-editor/react';
import { Play, RotateCcw, Loader2 } from 'lucide-react';
import { runPython, isPyodideLoaded, loadPyodide } from '../utils/pyodide';

interface CodeEditorProps {
  initialCode?: string;
  onRun?: (result: { output: string; error: string | null; images: string[] }) => void;
  onCodeChange?: (code: string) => void;
  readOnly?: boolean;
  height?: string;
}

export default function CodeEditor({ initialCode = '', onRun, onCodeChange, readOnly = false, height = '400px' }: CodeEditorProps) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [isPyodideLoading, setIsPyodideLoading] = useState(!isPyodideLoaded());
  const editorRef = useRef<any>(null);

  const handleEditorMount = (editor: any) => {
    editorRef.current = editor;
  };

  const handleRun = async () => {
    if (isRunning) return;
    setIsRunning(true);
    setOutput('');
    setError(null);
    setImages([]);

    try {
      if (!isPyodideLoaded()) {
        setIsPyodideLoading(true);
        await loadPyodide();
        setIsPyodideLoading(false);
      }

      const result = await runPython(code);
      setOutput(result.output);
      setError(result.error);
      setImages(result.images);
      onRun?.(result);
    } catch (err: any) {
      setError(err.message || '运行出错');
    } finally {
      setIsRunning(false);
    }
  };

  const handleReset = () => {
    setCode(initialCode);
    setOutput('');
    setError(null);
    setImages([]);
  };

  return (
    <div className="flex flex-col h-full border border-gray-200 rounded-lg overflow-hidden">
      {/* 工具栏 */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 text-white shrink-0">
        <span className="text-sm font-medium">Python 编辑器</span>
        <div className="flex gap-2">
          <button
            onClick={handleReset}
            className="flex items-center gap-1 px-3 py-1 text-sm bg-gray-700 hover:bg-gray-600 rounded transition-colors"
          >
            <RotateCcw size={14} />
            重置
          </button>
          <button
            onClick={handleRun}
            disabled={isRunning || isPyodideLoading}
            className="flex items-center gap-1 px-3 py-1 text-sm bg-amber-500 hover:bg-amber-400 disabled:opacity-50 rounded transition-colors"
          >
            {isRunning ? <Loader2 size={14} className="animate-spin" /> : <Play size={14} />}
            {isPyodideLoading ? '加载环境...' : isRunning ? '运行中...' : '运行'}
          </button>
        </div>
      </div>

      {/* 编辑器 */}
      <div className="flex-1 min-h-0">
        <Editor
          height={height}
          language="python"
          theme="vs-dark"
          value={code}
          onChange={(value) => {
            setCode(value || '');
            onCodeChange?.(value || '');
          }}
          onMount={handleEditorMount}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            readOnly,
            automaticLayout: true,
            tabSize: 4,
          }}
        />
      </div>

      {/* 输出区域 */}
      {(output || error || images.length > 0) && (
        <div className="border-t border-gray-200 shrink-0 max-h-[200px] overflow-y-auto">
          <div className="px-4 py-2 bg-gray-100 text-sm font-medium text-gray-700 sticky top-0">输出</div>
          <div className="p-4 bg-white">
            {output && (
              <pre className="text-sm text-gray-800 whitespace-pre-wrap font-mono">{output}</pre>
            )}
            {error && (
              <pre className="text-sm text-red-500 whitespace-pre-wrap font-mono">{error}</pre>
            )}
            {images.map((img, i) => (
              <img key={i} src={`data:image/png;base64,${img}`} alt="图表输出" className="max-w-full mt-2" />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
