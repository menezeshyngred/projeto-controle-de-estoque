const { spawn } = require('node:child_process');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const services = [];
let stopping = false;

function stop(code) {
  if (stopping) return;
  stopping = true;
  for (const service of services) {
    try {
      process.kill(-service.pid, 'SIGTERM');
    } catch (error) {
      if (error.code !== 'ESRCH') console.error(error);
    }
  }
  process.exit(code);
}

function start(directory, env) {
  const service = spawn('npm', ['start'], {
    cwd: path.join(root, directory),
    env: { ...process.env, ...env },
    stdio: 'inherit',
    detached: true,
  });
  services.push(service);
  service.on('error', (error) => {
    console.error(`Failed to start ${directory}:`, error);
    stop(1);
  });
  service.on('exit', (code) => stop(code || 0));
}

process.on('SIGTERM', () => stop(0));
process.on('SIGINT', () => stop(0));

start('backend', { PORT: '3000', HOST: '127.0.0.1' });
start('frontend', {
  PORT: '5000',
  HOST: '0.0.0.0',
  BROWSER: 'none',
  DANGEROUSLY_DISABLE_HOST_CHECK: 'true',
  WDS_SOCKET_PORT: '0',
});
