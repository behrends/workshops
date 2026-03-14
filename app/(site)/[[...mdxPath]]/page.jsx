import { cache } from 'react';
import { generateStaticParamsFor, importPage } from 'nextra/pages';
import { notFound } from 'next/navigation';

import { useMDXComponents as getMDXComponents } from '../../../mdx-components';
import SlideMetaBox from '../../../components/content/SlideMetaBox';
import { resolveContentFileFromSegments } from '../../../lib/slides/model.mjs';

export const dynamicParams = false;
export const generateStaticParams = generateStaticParamsFor('mdxPath');

const loadDocPage = cache(async (segments = []) => {
  try {
    await resolveContentFileFromSegments(process.cwd(), segments);
  } catch {
    return null;
  }

  return importPage(segments);
});

export async function generateMetadata(props) {
  const params = await props.params;
  const mdxPath = params.mdxPath ?? [];
  const page = await loadDocPage(mdxPath);

  if (!page) {
    notFound();
  }

  const { metadata } = page;
  return metadata;
}

const Wrapper = getMDXComponents().wrapper;

export default async function Page(props) {
  const params = await props.params;
  const mdxPath = params.mdxPath ?? [];
  const page = await loadDocPage(mdxPath);

  if (!page) {
    notFound();
  }

  const {
    default: MDXContent,
    toc,
    metadata,
    sourceCode,
  } = page;

  const hasSlideMeta =
    metadata.slides &&
    (metadata.slideDuration || metadata.slideGoal || metadata.slideTopics);

  return (
    <Wrapper toc={toc} metadata={metadata} sourceCode={sourceCode}>
      {hasSlideMeta ? (
        <SlideMetaBox
          duration={metadata.slideDuration}
          goal={metadata.slideGoal}
          topics={metadata.slideTopics}
          slidePath={mdxPath}
        />
      ) : null}
      <MDXContent {...props} params={params} />
    </Wrapper>
  );
}
