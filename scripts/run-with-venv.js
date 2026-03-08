/**
 * Run a Python module using the project's venv. Ensures npm scripts use the
 * correct Python (with Flask etc.) on Windows and Unix without requiring
 * the user to activate the venv first.
 */
import path from 'path';
import { spawnSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const isWin = process.platform === 'win32';
const pythonDir = isWin ? path.join(projectRoot, 'venv', 'Scripts') : path.join(projectRoot, 'venv', 'bin');
const pythonExe = isWin ? 'python.exe' : 'python';
const pythonPath = path.join(pythonDir, pythonExe);

const args = process.argv.slice(2);
if (args.length === 0) {
  console.error('Usage: node run-with-venv.js <module> [args...]');
  console.error('Example: node run-with-venv.js backend.app');
  process.exit(1);
}

const result = spawnSync(pythonPath, ['-m', ...args], {
  stdio: 'inherit',
  cwd: projectRoot,
  shell: false,
});

if (result.error) {
  if (result.error.code === 'ENOENT') {
    console.error(`Virtual env Python not found at: ${pythonPath}`);
    console.error('Run "make install" or "make venv" and then "pip install -r backend/requirements.txt" first.');
  } else {
    console.error(result.error);
  }
  process.exit(1);
}
process.exit(result.status ?? 1);
