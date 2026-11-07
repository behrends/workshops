import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { pathToFileURL } from 'node:url';

import { buildDeckCatalog } from '../lib/decks/build-catalog.mjs';

const decksRoot = path.join(process.cwd(), 'public', 'decks');
const outputFile = path.join(process.cwd(), 'lib', 'decks', 'catalog.generated.json');

// Writes the /decks overview data as JSON so the app needs no filesystem
// access at runtime. Only writes when the content changed to avoid needless
// reloads in the dev server. Returns true if the file was written.
export async function writeDeckCatalog() {
  const catalog = await buildDeckCatalog(decksRoot);
  const json = `${JSON.stringify(catalog, null, 2)}\n`;

  let current = null;
  try {
    current = await fs.readFile(outputFile, 'utf8');
  } catch (error) {
    if (error?.code !== 'ENOENT') {
      throw error;
    }
  }

  if (current === json) {
    return false;
  }

  await fs.writeFile(outputFile, json);
  return true;
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const written = await writeDeckCatalog();
  console.log(
    `decks:catalog: ${written ? 'updated' : 'unchanged'} ${path.relative(process.cwd(), outputFile)}`,
  );
}
