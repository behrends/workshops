import { createServer } from 'node:http';
import path from 'node:path';
import process from 'node:process';

import chokidar from 'chokidar';

const HOST = process.env.DECK_RELOAD_HOST || '127.0.0.1';
const PORT = Number(process.env.DECK_RELOAD_PORT || 35729);
const WATCH_PATHS = ['public/decks', 'public/vendor/reveal'];
const HEARTBEAT_MS = 20000;
const DEBOUNCE_MS = 100;

const clients = new Set();
let lastEvent = { path: '', timestamp: 0 };

function normalizePath(filePath) {
  return path.relative(process.cwd(), filePath).split(path.sep).join('/');
}

function broadcast(payload) {
  const message = `data: ${JSON.stringify(payload)}\n\n`;

  for (const client of clients) {
    client.write(message);
  }
}

function handleChange(eventName, filePath) {
  const normalizedPath = normalizePath(filePath);
  const now = Date.now();

  if (
    normalizedPath === lastEvent.path &&
    now - lastEvent.timestamp < DEBOUNCE_MS
  ) {
    return;
  }

  lastEvent = { path: normalizedPath, timestamp: now };

  const payload = {
    event: eventName,
    path: normalizedPath,
    changedAt: new Date(now).toISOString(),
  };

  broadcast(payload);
  console.log(`[decks] ${eventName}: ${normalizedPath}`);
}

const server = createServer((req, res) => {
  if (req.url !== '/__deck_reload') {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Not found');
    return;
  }

  res.writeHead(200, {
    'Access-Control-Allow-Origin': '*',
    'Cache-Control': 'no-cache, no-transform',
    Connection: 'keep-alive',
    'Content-Type': 'text/event-stream',
    'X-Accel-Buffering': 'no',
  });

  res.write(': connected\n\n');
  clients.add(res);

  req.on('close', () => {
    clients.delete(res);
  });
});

server.on('error', (error) => {
  console.error(`[decks] server error on ${HOST}:${PORT}:`, error);
  process.exit(1);
});

const heartbeat = setInterval(() => {
  for (const client of clients) {
    client.write(': heartbeat\n\n');
  }
}, HEARTBEAT_MS);

const watcher = chokidar.watch(WATCH_PATHS, {
  ignoreInitial: true,
  ignored: ['**/.DS_Store'],
});

watcher.on('add', (filePath) => handleChange('add', filePath));
watcher.on('change', (filePath) => handleChange('change', filePath));
watcher.on('unlink', (filePath) => handleChange('unlink', filePath));
watcher.on('error', (error) => {
  console.error('[decks] watch error:', error);
});

server.listen(PORT, HOST, () => {
  console.log(
    `[decks] watching ${WATCH_PATHS.join(', ')} on ${HOST}:${PORT}`,
  );
});

async function shutdown() {
  clearInterval(heartbeat);

  for (const client of clients) {
    client.end();
  }

  clients.clear();

  await watcher.close();
  await new Promise((resolve) => server.close(resolve));
}

process.on('SIGINT', async () => {
  await shutdown();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await shutdown();
  process.exit(0);
});
