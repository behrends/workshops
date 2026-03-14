import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import process from 'node:process';
import { spawn } from 'node:child_process';

async function main() {
  const cwd = process.cwd();
  const buildDir = path.join(cwd, '.next', 'server', 'app');
  const outputDir = path.join(cwd, 'public', '_pagefind');
  const tempRoot = await fs.mkdtemp(path.join(os.tmpdir(), 'workshops-pagefind-'));
  const tempSiteDir = path.join(tempRoot, 'app');

  try {
    await fs.cp(buildDir, tempSiteDir, { recursive: true });
    await fs.rm(path.join(tempSiteDir, 'slides'), { recursive: true, force: true });
    await fs.rm(outputDir, { recursive: true, force: true });

    await runPagefind({
      site: tempSiteDir,
      output: outputDir,
      cwd,
    });
  } finally {
    await fs.rm(tempRoot, { recursive: true, force: true });
  }
}

function runPagefind({ site, output, cwd }) {
  return new Promise((resolve, reject) => {
    const child = spawn(
      process.execPath,
      ['node_modules/pagefind/lib/runner/bin.cjs', '--site', site, '--output-path', output],
      {
        cwd,
        stdio: 'inherit',
      },
    );

    child.on('exit', (code) => {
      if (code === 0) {
        resolve();
        return;
      }

      reject(new Error(`Pagefind failed with exit code ${code ?? 1}.`));
    });

    child.on('error', reject);
  });
}

await main();
