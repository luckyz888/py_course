let pyodide: any = null;
let loading: Promise<any> | null = null;
let stdoutInitialized = false;

export async function loadPyodide() {
  if (pyodide) return pyodide;
  if (loading) return loading;

  loading = new Promise(async (resolve, reject) => {
    try {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/pyodide/v0.25.1/full/pyodide.js';
      script.onload = async () => {
        try {
          // @ts-ignore
          pyodide = await globalThis.loadPyodide({
            indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.25.1/full/'
          });
          resolve(pyodide);
        } catch (err) {
          reject(err);
        }
      };
      script.onerror = reject;
      document.head.appendChild(script);
    } catch (err) {
      reject(err);
    }
  });

  return loading;
}

async function ensureStdoutCapture() {
  if (stdoutInitialized) return;
  const py = await loadPyodide();
  await py.runPythonAsync(`
import io
import sys

class OutputCapture:
    def __init__(self):
        self.outputs = []
    def write(self, text):
        self.outputs.append(text)
    def flush(self):
        pass

_capture = OutputCapture()
_original_stdout = sys.stdout
_original_stderr = sys.stderr
sys.stdout = _capture
sys.stderr = _capture
`);
  stdoutInitialized = true;
}

export async function runPython(code: string): Promise<{ output: string; error: string | null; images: string[] }> {
  const py = await loadPyodide();
  const images: string[] = [];

  try {
    // 确保 stdout 已重定向
    await ensureStdoutCapture();

    // 清空之前的输出
    await py.runPythonAsync(`_capture.outputs.clear()`);

    // 运行用户代码
    await py.runPythonAsync(code);

    // 捕获 matplotlib 图片
    const hasMpl = await py.runPythonAsync(`
import sys
'matplotlib' in sys.modules
`);

    if (hasMpl) {
      try {
        const imgData = await py.runPythonAsync(`
import matplotlib.pyplot as plt
import io
import base64

figs = [plt.figure(i) for i in plt.get_fignums()]
img_list = []
for fig in figs:
    buf = io.BytesIO()
    fig.savefig(buf, format='png', dpi=100, bbox_inches='tight')
    buf.seek(0)
    img_list.append(base64.b64encode(buf.read()).decode('utf-8'))
plt.close('all')
img_list[-1] if img_list else ''
`);
        if (imgData) {
          images.push(imgData);
        }
      } catch {
        // matplotlib 图片捕获失败，忽略
      }
    }

    // 获取输出
    const output = await py.runPythonAsync(`''.join(_capture.outputs)`);

    return { output, error: null, images };
  } catch (err: any) {
    // 获取已捕获的输出
    let output = '';
    try {
      output = await py.runPythonAsync(`''.join(_capture.outputs)`);
    } catch {}

    return { output, error: err.message || String(err), images };
  }
}

export function isPyodideLoaded() {
  return pyodide !== null;
}
