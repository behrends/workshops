import path from 'node:path';

import { cache } from 'react';
import { generateStaticParamsFor, importPage } from 'nextra/pages';
import { notFound } from 'next/navigation';

import { useMDXComponents as getMDXComponents } from '../../../mdx-components';
import SlidePreviewBox from '../../../components/content/SlidePreviewBox';
import {
  resolveContentFileFromSegments,
  readMdxSource,
  validateAndBuildSlides,
} from '../../../lib/slides/model.mjs';

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

  let hasSlides = false;
  if (metadata.slides === true) {
    try {
      const contentFile = await resolveContentFileFromSegments(process.cwd(), mdxPath);
      const source = await readMdxSource(contentFile);
      const { status } = validateAndBuildSlides({
        metadata,
        contentPath: path.relative(process.cwd(), contentFile),
        mdxBody: source.body,
      });
      hasSlides = status !== 'error';
    } catch {
      hasSlides = false;
    }
  }

  return (
    <Wrapper toc={toc} metadata={metadata} sourceCode={sourceCode}>
      {hasSlides ? (
        <SlidePreviewBox
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
