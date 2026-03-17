import path from 'node:path';

import { cache } from 'react';
import { generateStaticParamsFor, importPage } from 'nextra/pages';

import {
  readMdxSource,
  resolveContentFileFromSegments,
  validateAndBuildSlides,
} from './model.mjs';

const listCandidateParams = generateStaticParamsFor('slidePath');

export const loadSlidePageData = cache(async (slidePath) => {
  try {
    const page = await importPage(slidePath);
    const contentFile = await resolveContentFileFromSegments(
      process.cwd(),
      slidePath,
    );
    const source = await readMdxSource(contentFile);
    const validation = validateAndBuildSlides({
      metadata: page.metadata || {},
      contentPath: path.relative(process.cwd(), contentFile),
      mdxBody: source.body,
    });

    return {
      metadata: page.metadata || {},
      contentFile,
      ...validation,
    };
  } catch (err) {
    console.error(`Failed to load slide data for ${slidePath?.join('/')}:`, err);
    return {
      metadata: {},
      contentFile: null,
      deckTitle: 'Folien',
      slides: [],
      warnings: [],
      errors: [],
      status: 'error',
    };
  }
});

export async function generateStaticSlideParams() {
  const candidates = await listCandidateParams();
  const entries = await Promise.all(
    candidates.map(async ({ slidePath }) => {
      const { metadata, status } = await loadSlidePageData(slidePath);
      if (!metadata.slides || status === 'error') {
        return null;
      }

      return { slidePath };
    }),
  );

  return entries.filter(Boolean);
}
