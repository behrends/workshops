import { notFound } from 'next/navigation';

import SlideDeckView from '../../../../components/slides/SlideDeckView';
import { formatIssue } from '../../../../lib/slides/model.mjs';
import {
  generateStaticSlideParams,
  loadSlidePageData,
} from '../../../../lib/slides/page-data.mjs';

export const dynamicParams = false;
export const generateStaticParams = generateStaticSlideParams;

export async function generateMetadata({ params }) {
  const { slidePath } = await params;
  const { metadata, deckTitle, status } = await loadSlidePageData(slidePath);

  if (!metadata.slides || status === 'error') {
    notFound();
  }

  return {
    title: `${deckTitle} - Folienvorschau`,
  };
}

export default async function EmbeddedSlidePage({ params }) {
  const { slidePath } = await params;
  const data = await loadSlidePageData(slidePath);

  if (!data.metadata.slides || data.status === 'error') {
    notFound();
  }

  if (data.warnings.length > 0) {
    const summary = data.warnings.map((warning) => formatIssue(warning)).join('\n');
    console.warn(`Embedded slide warnings for ${slidePath.join('/')}:\n${summary}`);
  }

  return <SlideDeckView slides={data.slides} embedded />;
}
