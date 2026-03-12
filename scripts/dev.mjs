import { spawn } from 'node:child_process';
import process from 'node:process';

const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const childEntries = [];
let shuttingDown = false;
let pendingExitCode = 0;

function spawnTask(name, args) {
  const child = spawn(npmCommand, args, {
    stdio: 'inherit',
    env: process.env,
  });

  childEntries.push({ name, child });

  child.on('exit', (code, signal) => {
    if (shuttingDown) {
      return;
    }

    pendingExitCode = code ?? (signal ? 1 : 0);
    shutdown(signal ?? 'SIGTERM');
  });
}

function shutdown(signal = 'SIGTERM') {
  if (shuttingDown) {
    return;
  }

  shuttingDown = true;

  for (const { child } of childEntries) {
    if (!child.killed) {
      child.kill(signal);
    }
  }

  setTimeout(() => {
    for (const { child } of childEntries) {
      if (!child.killed) {
        child.kill('SIGKILL');
      }
    }
  }, 3000).unref();
}

process.on('SIGINT', () => {
  pendingExitCode = 0;
  shutdown('SIGINT');
});

process.on('SIGTERM', () => {
  pendingExitCode = 0;
  shutdown('SIGTERM');
});

let remainingChildren = 2;

function trackCompletion() {
  remainingChildren -= 1;

  if (remainingChildren === 0) {
    process.exit(pendingExitCode);
  }
}

spawnTask('decks', ['run', 'decks:watch']);
spawnTask('next', ['run', 'dev:next']);

for (const { child } of childEntries) {
  child.on('close', trackCompletion);
}
