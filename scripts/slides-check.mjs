import path from 'node:path';
import process from 'node:process';

import {
  formatIssue,
  listContentMdxFiles,
  readMdxSource,
  routeSegmentsFromContentFile,
  validateAndBuildSlides,
} from '../lib/slides/model.mjs';

async function main() {
  const cwd = process.cwd();
  const files = await listContentMdxFiles(cwd);
  const slideEntries = [];

  for (const filePath of files) {
    const source = await readMdxSource(filePath);

    if (!source.frontmatter?.slides) {
      continue;
    }

    // Note: the slides route uses importPage(...).metadata (Nextra-compiled),
    // while this standalone script uses gray-matter frontmatter directly.
    // If Nextra transforms frontmatter fields, results may diverge.
    const validation = validateAndBuildSlides({
      metadata: source.frontmatter,
      contentPath: path.relative(cwd, filePath),
      mdxBody: source.body,
    });

    slideEntries.push({
      filePath,
      routePath: routeSegmentsFromContentFile(cwd, filePath).join('/'),
      ...validation,
    });
  }

  if (slideEntries.length === 0) {
    console.log('slides:check: no slides:true pages found.');
    return;
  }

  let warningCount = 0;
  let errorCount = 0;

  for (const entry of slideEntries) {
    if (entry.warnings.length > 0) {
      warningCount += entry.warnings.length;
      console.warn(`\n[slides:warning] /slides/${entry.routePath}`);
      for (const warning of entry.warnings) {
        console.warn(`  - ${formatIssue(warning)}`);
      }
    }

    if (entry.errors.length > 0) {
      errorCount += entry.errors.length;
      console.error(`\n[slides:error] /slides/${entry.routePath}`);
      for (const error of entry.errors) {
        console.error(`  - ${formatIssue(error)}`);
      }
    }
  }

  const okCount = slideEntries.length - slideEntries.filter((entry) => entry.errors.length > 0).length;
  console.log(
    `\nslides:check: ${okCount}/${slideEntries.length} slide pages valid, ${warningCount} warning(s), ${errorCount} error(s).`,
  );

  if (errorCount > 0) {
    process.exitCode = 1;
  }
}

await main();
