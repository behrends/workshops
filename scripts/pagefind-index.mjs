import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import process from 'node:process';
import { spawn } from 'node:child_process';

async function main() {
  const cwd = process.cwd();
  const buildDir = path.join(cwd, '.next', 'server', 'app');
  // On Vercel the Next.js build adapter is active and moves prerendered pages
  // to .next/output/functions/<route>.prerender-fallback.html.
  const adapterDir = path.join(cwd, '.next', 'output', 'functions');
  const outputDir = path.join(cwd, 'public', '_pagefind');
  const tempRoot = await fs.mkdtemp(path.join(os.tmpdir(), 'workshops-pagefind-'));
  const tempSiteDir = path.join(tempRoot, 'app');

  try {
    if ((await listHtmlFiles(buildDir)).length > 0) {
      await fs.cp(buildDir, tempSiteDir, { recursive: true });
    } else {
      await copyAdapterPages(adapterDir, tempSiteDir);
    }
    await fs.rm(path.join(tempSiteDir, 'slides'), { recursive: true, force: true });
    await fs.rm(path.join(tempSiteDir, 'slides-embed'), { recursive: true, force: true });
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

async function listHtmlFiles(dir) {
  try {
    const entries = await fs.readdir(dir, { recursive: true });
    return entries.filter((entry) => entry.endsWith('.html'));
  } catch (error) {
    if (error.code === 'ENOENT') return [];
    throw error;
  }
}

async function copyAdapterPages(sourceDir, targetDir) {
  const suffix = '.prerender-fallback.html';
  const files = (await listHtmlFiles(sourceDir)).filter((file) => file.endsWith(suffix));

  for (const file of files) {
    const target = path.join(targetDir, `${file.slice(0, -suffix.length)}.html`);
    await fs.mkdir(path.dirname(target), { recursive: true });
    await fs.copyFile(path.join(sourceDir, file), target);
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
