import path from 'node:path';

import { cache } from 'react';
import { generateStaticParamsFor, importPage } from 'nextra/pages';
import { notFound } from 'next/navigation';

import SlideDeckView from '../../../../components/slides/SlideDeckView';
import {
  formatIssue,
  readMdxSource,
  resolveContentFileFromSegments,
  validateAndBuildSlides,
} from '../../../../lib/slides/model.mjs';

export const dynamicParams = false;

const listCandidateParams = generateStaticParamsFor('slidePath');

const loadSlidePageData = cache(async (slidePath) => {
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

export async function generateStaticParams() {
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

export async function generateMetadata({ params }) {
  const { slidePath } = await params;
  const { metadata, deckTitle, status } = await loadSlidePageData(slidePath);

  if (!metadata.slides || status === 'error') {
    notFound();
  }

  return {
    title: `${deckTitle} - Folien`,
  };
}

export default async function SlidePage({ params, searchParams }) {
  const { slidePath } = await params;
  const resolvedSearchParams = await searchParams;
  const embedded = resolvedSearchParams?.embedded !== undefined;
  const data = await loadSlidePageData(slidePath);

  if (!data.metadata.slides || data.status === 'error') {
    notFound();
  }

  if (data.warnings.length > 0) {
    const summary = data.warnings.map((warning) => formatIssue(warning)).join('\n');
    console.warn(`Slide warnings for ${slidePath.join('/')}:\n${summary}`);
  }

  return <SlideDeckView slides={data.slides} embedded={embedded} />;
}
