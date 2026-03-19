import fs from 'node:fs/promises';
import path from 'node:path';

import matter from 'gray-matter';
import { toString } from 'mdast-util-to-string';
import remarkGfm from 'remark-gfm';
import remarkMdx from 'remark-mdx';
import remarkParse from 'remark-parse';
import { unified } from 'unified';

const MARKER_NAMES = new Set([
  'DocsOnly',
  'SlideOnly',
  'SlideLead',
  'SlideBreak',
]);

const AUTO_LIMITS = {
  leadChars: 220,
  leadSentences: 2,
  listItems: 6,
  listItemChars: 140,
  codeLines: 12,
  tableColumns: 4,
  tableRows: 5,
  calloutChars: 220,
  calloutItems: 4,
};

const processor = unified()
  .use(remarkParse)
  .use(remarkMdx)
  .use(remarkGfm);

export async function readMdxSource(filePath) {
  const raw = await fs.readFile(filePath, 'utf8');
  const parsed = matter(raw);

  return {
    raw,
    frontmatter: parsed.data,
    body: parsed.content,
  };
}

export async function resolveContentFileFromSegments(cwd, segments = []) {
  const contentRoot = path.join(cwd, 'content');
  const joined = path.join(contentRoot, ...segments);
  const directFile = `${joined}.mdx`;
  const indexFile = path.join(joined, 'index.mdx');

  if (await exists(directFile)) {
    return directFile;
  }

  if (await exists(indexFile)) {
    return indexFile;
  }

  throw new Error(`No content file found for route: ${segments.join('/')}`);
}

export async function listContentMdxFiles(cwd, dir = path.join(cwd, 'content')) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await listContentMdxFiles(cwd, fullPath)));
      continue;
    }

    if (entry.isFile() && entry.name.endsWith('.mdx')) {
      files.push(fullPath);
    }
  }

  return files;
}

export function routeSegmentsFromContentFile(cwd, filePath) {
  const contentRoot = path.join(cwd, 'content');
  const relativePath = path.relative(contentRoot, filePath);

  if (relativePath.endsWith('/index.mdx')) {
    const parentDir = relativePath.slice(0, -'/index.mdx'.length);
    return parentDir ? parentDir.split(path.sep) : [];
  }

  return relativePath.slice(0, -'.mdx'.length).split(path.sep);
}

export function validateAndBuildSlides({ metadata = {}, contentPath, mdxBody }) {
  const tree = processor.parse(mdxBody);
  const issues = {
    warnings: [],
    errors: [],
  };

  const titleNode = tree.children.find(
    (node) => node.type === 'heading' && node.depth === 1,
  );
  const deckTitle = metadata.slideTitle || inlineText(titleNode) || 'Folien';

  const split = splitSections(tree.children);
  validateIntroNodes(split.introNodes, contentPath, issues);

  const slides = [];

  if (metadata.titleSlide) {
    slides.push({
      kind: 'title',
      title: deckTitle,
      duration: metadata.slideDuration || null,
      goal: metadata.slideGoal || null,
    });
  }

  if (metadata.slides && split.sections.length === 0) {
    issues.errors.push(
      createIssue({
        level: 'error',
        contentPath,
        message: 'slides:true requires at least one ## section.',
      }),
    );
  }

  for (const section of split.sections) {
    validateSectionMarkers(section, contentPath, issues);
    const segments = splitSectionSegments(section.nodes);

    segments.forEach((segmentNodes, segmentIndex) => {
      const result = projectSegment({
        contentPath,
        sectionTitle: section.title,
        segmentIndex: segmentIndex + 1,
        nodes: segmentNodes,
      });

      issues.warnings.push(...result.warnings);
      issues.errors.push(...result.errors);

      if (result.blocks.length > 0) {
        slides.push({
          kind: 'content',
          title: section.title,
          segmentIndex: segmentIndex + 1,
          blocks: result.blocks,
        });
      }
    });
  }

  if (
    metadata.slides &&
    !slides.some((slide) => slide.kind === 'content')
  ) {
    issues.errors.push(
      createIssue({
        level: 'error',
        contentPath,
        message: 'No visible content slides were produced for this page.',
      }),
    );
  }

  return {
    deckTitle,
    slides,
    warnings: issues.warnings,
    errors: issues.errors,
    status: issues.errors.length
      ? 'error'
      : issues.warnings.length
        ? 'warning'
        : 'ok',
  };
}

function splitSections(nodes) {
  const introNodes = [];
  const sections = [];
  let currentSection = null;

  for (const node of nodes) {
    if (node.type === 'mdxjsEsm') {
      continue;
    }

    if (node.type === 'heading' && node.depth === 2) {
      currentSection = {
        title: inlineText(node),
        nodes: [],
      };
      sections.push(currentSection);
      continue;
    }

    if (currentSection) {
      currentSection.nodes.push(node);
    } else if (!(node.type === 'heading' && node.depth === 1)) {
      introNodes.push(node);
    }
  }

  return { introNodes, sections };
}

function validateIntroNodes(nodes, contentPath, issues) {
  for (const node of nodes) {
    if (isMarker(node, 'DocsOnly')) {
      continue;
    }

    if (isMarkerNode(node)) {
      issues.errors.push(
        createIssue({
          level: 'error',
          contentPath,
          message: `${node.name} may only be used inside a ## section.`,
        }),
      );
      continue;
    }

    if (isCallout(node)) {
      const text = nodeText(node);
      const hasList = (node.children || []).some((child) => child.type === 'list');
      if (text.includes('Dauer:') || text.includes('Ziel:') || hasList) {
        issues.errors.push(
          createIssue({
            level: 'error',
            contentPath,
            message:
              'Intro callouts with duration, goal, or topic lists are not allowed on slides:true pages.',
          }),
        );
      }
      continue;
    }

    if (!isWhitespaceNode(node)) {
      issues.warnings.push(
        createIssue({
          level: 'warning',
          contentPath,
          message:
            'Content before the first ## is docs-only by default. Wrap it in <DocsOnly> for clarity.',
          }),
      );
    }
  }
}

function validateSectionMarkers(section, contentPath, issues) {
  for (const node of section.nodes) {
    if (isMarker(node, 'DocsOnly')) {
      findNestedMarkerIssues(node, {
        contentPath,
        sectionTitle: section.title,
        segmentIndex: null,
        issues,
      });
      continue;
    }

    if (isMarkerNode(node) || isCallout(node)) {
      findNestedMarkerIssues(node, {
        contentPath,
        sectionTitle: section.title,
        segmentIndex: null,
        issues,
      });
      continue;
    }

    if (containsNestedMarker(node)) {
      issues.errors.push(
        createIssue({
          level: 'error',
          contentPath,
          sectionTitle: section.title,
          message: 'Slide markers may not be nested inside other content blocks.',
        }),
      );
    }
  }
}

function splitSectionSegments(nodes) {
  const segments = [[]];

  for (const node of nodes) {
    if (isMarker(node, 'SlideBreak')) {
      segments.push([]);
      continue;
    }

    segments[segments.length - 1].push(node);
  }

  return segments;
}

function projectSegment({ contentPath, sectionTitle, segmentIndex, nodes }) {
  const warnings = [];
  const errors = [];
  const blocks = [];
  let hasVisibleBlock = false;
  let leadUsed = false;
  let imageUsed = false;

  for (const node of nodes) {
    if (isMarker(node, 'DocsOnly')) {
      continue;
    }

    if (isMarker(node, 'SlideLead')) {
      if (leadUsed || hasVisibleBlock) {
        errors.push(
          createIssue({
            level: 'error',
            contentPath,
            sectionTitle,
            segmentIndex,
            message: 'SlideLead must appear once at most and before other visible content.',
          }),
        );
        continue;
      }

      const lead = normalizeLeadMarker(node, {
        contentPath,
        sectionTitle,
        segmentIndex,
      });

      if (lead.error) {
        errors.push(lead.error);
        continue;
      }

      leadUsed = true;
      hasVisibleBlock = true;
      blocks.push(lead.block);
      continue;
    }

    if (isMarker(node, 'SlideOnly')) {
      const explicit = projectExplicitChildren(node.children || [], {
        contentPath,
        sectionTitle,
        segmentIndex,
      });

      warnings.push(...explicit.warnings);
      errors.push(...explicit.errors);
      if (explicit.blocks.length > 0) {
        hasVisibleBlock = true;
        blocks.push(...explicit.blocks);
      }
      continue;
    }

    if (isMarker(node, 'SlideBreak')) {
      errors.push(
        createIssue({
          level: 'error',
          contentPath,
          sectionTitle,
          segmentIndex,
          message: 'SlideBreak may only be used as a top-level separator inside a ## section.',
        }),
      );
      continue;
    }

    const auto = projectAutoNode(node, {
      contentPath,
      sectionTitle,
      segmentIndex,
      leadUsed,
      imageUsed,
      hasVisibleBlock,
    });

    warnings.push(...auto.warnings);
    errors.push(...auto.errors);

    if (auto.block) {
      if (auto.block.type === 'lead') {
        leadUsed = true;
      }
      if (auto.block.type === 'image') {
        imageUsed = true;
      }
      hasVisibleBlock = true;
      blocks.push(auto.block);
    }
  }

  if (!hasVisibleBlock) {
    errors.push(
      createIssue({
        level: 'error',
        contentPath,
        sectionTitle,
        segmentIndex,
        message:
          `Segment "## ${sectionTitle}" contains no visible content after filtering. Add SlideOnly or SlideLead, or wrap the section in DocsOnly.`,
      }),
    );
  }

  return { blocks, warnings, errors };
}

function projectExplicitChildren(children, context) {
  const blocks = [];
  const warnings = [];
  const errors = [];

  for (const child of children) {
    const converted = convertSupportedBlock(child, context, { explicit: true });
    warnings.push(...converted.warnings);
    errors.push(...converted.errors);
    if (converted.block) {
      blocks.push(converted.block);
    }
  }

  return { blocks, warnings, errors };
}

function projectAutoNode(node, context) {
  const warnings = [];
  const errors = [];

  if (node.type === 'paragraph') {
    const image = imageFromParagraph(node);
    if (image) {
      if (context.imageUsed) {
        warnings.push(
          createIssue({
            level: 'warning',
            ...context,
            message: 'Additional images are hidden by default. Use SlideBreak or SlideOnly to show more than one image.',
          }),
        );
        return { warnings, errors, block: null };
      }

      return {
        warnings,
        errors,
        block: {
          type: 'image',
          url: image.url,
          alt: image.alt,
        },
      };
    }

    if (!context.leadUsed && !context.hasVisibleBlock && qualifiesAsLead(node)) {
      const inline = renderableInlineChildren(node.children || [], context);
      warnings.push(...inline.warnings);
      errors.push(...inline.errors);

      return {
        warnings,
        errors,
        block: {
          type: 'lead',
          children: inline.children,
        },
      };
    }

    warnings.push(
      createIssue({
        level: 'warning',
        ...context,
        message: 'Paragraph is docs-only by default after the lead.',
      }),
    );
    return { warnings, errors, block: null };
  }

  if (node.type === 'list') {
    const converted = convertListBlock(node, context, { explicit: false });
    warnings.push(...converted.warnings);
    errors.push(...converted.errors);
    return {
      warnings,
      errors,
      block: converted.block,
    };
  }

  if (node.type === 'code') {
    const lines = nonEmptyLineCount(node.value || '');
    if (lines > AUTO_LIMITS.codeLines) {
      warnings.push(
        createIssue({
          level: 'warning',
          ...context,
          message: 'Code block exceeds the auto-slide limit and stays docs-only.',
        }),
      );
      return { warnings, errors, block: null };
    }

    return {
      warnings,
      errors,
      block: {
        type: 'code',
        lang: node.lang || '',
        meta: node.meta || '',
        value: node.value || '',
      },
    };
  }

  if (node.type === 'table') {
    const converted = convertTableBlock(node, context, { explicit: false });
    warnings.push(...converted.warnings);
    errors.push(...converted.errors);
    return {
      warnings,
      errors,
      block: converted.block,
    };
  }

  if (isCallout(node)) {
    const converted = convertCalloutBlock(node, context, { explicit: false });
    warnings.push(...converted.warnings);
    errors.push(...converted.errors);
    return {
      warnings,
      errors,
      block: converted.block,
    };
  }

  if (node.type === 'heading' && node.depth >= 3) {
    const inline = renderableInlineChildren(node.children || [], context);
    warnings.push(...inline.warnings);
    errors.push(...inline.errors);
    return {
      warnings,
      errors,
      block: {
        type: 'heading',
        depth: node.depth,
        children: inline.children,
      },
    };
  }

  if (node.type === 'blockquote') {
    warnings.push(
      createIssue({
        level: 'warning',
        ...context,
        message: 'Blockquotes are docs-only by default.',
      }),
    );
    return { warnings, errors, block: null };
  }

  if (isUnsupportedVisibleNode(node)) {
    errors.push(
      createIssue({
        level: 'error',
        ...context,
        message: `Unsupported visible node: ${nodeLabel(node)}.`,
      }),
    );
    return { warnings, errors, block: null };
  }

  return { warnings, errors, block: null };
}

function convertSupportedBlock(node, context, options = { explicit: false }) {
  const warnings = [];
  const errors = [];

  if (node.type === 'paragraph') {
    const image = imageFromParagraph(node);
    if (image) {
      return {
        warnings,
        errors,
        block: {
          type: 'image',
          url: image.url,
          alt: image.alt,
        },
      };
    }

    const inline = renderableInlineChildren(node.children || [], context);
    warnings.push(...inline.warnings);
    errors.push(...inline.errors);
    return {
      warnings,
      errors,
      block: inline.children.length
        ? {
            type: 'paragraph',
            children: inline.children,
          }
        : null,
    };
  }

  if (node.type === 'heading' && node.depth >= 3) {
    const inline = renderableInlineChildren(node.children || [], context);
    warnings.push(...inline.warnings);
    errors.push(...inline.errors);
    return {
      warnings,
      errors,
      block: {
        type: 'heading',
        depth: node.depth,
        children: inline.children,
      },
    };
  }

  if (node.type === 'list') {
    return convertListBlock(node, context, { explicit: options.explicit });
  }

  if (node.type === 'code') {
    const lines = nonEmptyLineCount(node.value || '');
    if (options.explicit && lines > AUTO_LIMITS.codeLines) {
      warnings.push(
        createIssue({
          level: 'warning',
          ...context,
          message: 'SlideOnly contains a large code block. Check slide readability.',
        }),
      );
    }

    return {
      warnings,
      errors,
      block: {
        type: 'code',
        lang: node.lang || '',
        meta: node.meta || '',
        value: node.value || '',
      },
    };
  }

  if (node.type === 'table') {
    return convertTableBlock(node, context, { explicit: options.explicit });
  }

  if (node.type === 'blockquote') {
    const childBlocks = projectExplicitChildren(node.children || [], context);
    warnings.push(...childBlocks.warnings);
    errors.push(...childBlocks.errors);
    return {
      warnings,
      errors,
      block: {
        type: 'blockquote',
        blocks: childBlocks.blocks,
      },
    };
  }

  if (isCallout(node)) {
    return convertCalloutBlock(node, context, { explicit: options.explicit });
  }

  if (isUnsupportedVisibleNode(node)) {
    errors.push(
      createIssue({
        level: 'error',
        ...context,
        message: `Unsupported visible node: ${nodeLabel(node)}.`,
      }),
    );
  }

  return { warnings, errors, block: null };
}

function convertListBlock(node, context, { explicit }) {
  const warnings = [];
  const errors = [];

  if (!explicit) {
    if (node.children.length > AUTO_LIMITS.listItems) {
      warnings.push(
        createIssue({
          level: 'warning',
          ...context,
          message: 'List exceeds the auto-slide item limit and stays docs-only.',
        }),
      );
      return { warnings, errors, block: null };
    }
  } else if (node.children.length > AUTO_LIMITS.listItems + 2) {
    warnings.push(
      createIssue({
        level: 'warning',
        ...context,
        message: 'SlideOnly contains a long list. Check slide readability.',
      }),
    );
  }

  const items = [];

  for (const item of node.children) {
    if (!item.children || item.children.length === 0) {
      continue;
    }

    const inlineSource =
      item.children[0].type === 'paragraph' ? item.children[0].children : null;

    if (!inlineSource || item.children.length > 1) {
      errors.push(
        createIssue({
          level: 'error',
          ...context,
          message: 'Only simple one-paragraph list items are supported in slides.',
        }),
      );
      continue;
    }

    const text = compactText(inlineSource);
    if (!explicit && text.length > AUTO_LIMITS.listItemChars) {
      warnings.push(
        createIssue({
          level: 'warning',
          ...context,
          message: 'List item exceeds the auto-slide length limit and the list stays docs-only.',
        }),
      );
      return { warnings, errors, block: null };
    }

    const inline = renderableInlineChildren(inlineSource, context);
    warnings.push(...inline.warnings);
    errors.push(...inline.errors);
    items.push(inline.children);
  }

  if (items.length === 0) {
    return { warnings, errors, block: null };
  }

  return {
    warnings,
    errors,
    block: {
      type: 'list',
      ordered: Boolean(node.ordered),
      start: typeof node.start === 'number' ? node.start : 1,
      items,
    },
  };
}

function convertTableBlock(node, context, { explicit }) {
  const warnings = [];
  const errors = [];
  const columnCount = node.children[0]?.children?.length || 0;
  const bodyRows = Math.max(node.children.length - 1, 0);

  if (!explicit) {
    if (
      columnCount > AUTO_LIMITS.tableColumns ||
      bodyRows > AUTO_LIMITS.tableRows
    ) {
      warnings.push(
        createIssue({
          level: 'warning',
          ...context,
          message: 'Table exceeds the auto-slide size limit and stays docs-only.',
        }),
      );
      return { warnings, errors, block: null };
    }
  }

  const rows = [];

  for (const row of node.children) {
    const renderedRow = [];
    for (const cell of row.children) {
      const inline = renderableInlineChildren(cell.children || [], context);
      warnings.push(...inline.warnings);
      errors.push(...inline.errors);
      renderedRow.push(inline.children);
    }
    rows.push(renderedRow);
  }

  if (rows.length === 0) {
    return { warnings, errors, block: null };
  }

  return {
    warnings,
    errors,
    block: {
      type: 'table',
      headers: rows[0],
      rows: rows.slice(1),
    },
  };
}

function convertCalloutBlock(node, context, { explicit }) {
  const warnings = [];
  const errors = [];
  const textLength = compactText(node.children || []).length;
  const list = (node.children || []).find((child) => child.type === 'list');
  const listSize = list?.children?.length || 0;

  if (!explicit) {
    if (
      textLength > AUTO_LIMITS.calloutChars &&
      !(list && listSize <= AUTO_LIMITS.calloutItems)
    ) {
      warnings.push(
        createIssue({
          level: 'warning',
          ...context,
          message: 'Callout is too large for automatic slide rendering and stays docs-only.',
        }),
      );
      return { warnings, errors, block: null };
    }
  }

  const childBlocks = projectExplicitChildren(node.children || [], context);
  warnings.push(...childBlocks.warnings);
  errors.push(...childBlocks.errors);

  return {
    warnings,
    errors,
    block: {
      type: 'callout',
      calloutType: getAttributeValue(node, 'type') || 'default',
      emoji: getAttributeValue(node, 'emoji') || '',
      blocks: childBlocks.blocks,
    },
  };
}

function normalizeLeadMarker(node, context) {
  const children = node.children || [];
  if (children.length === 0) {
    return {
      error: createIssue({
        level: 'error',
        ...context,
        message: 'SlideLead must contain visible text.',
      }),
    };
  }

  const normalizedChildren =
    children.length === 1 && children[0].type === 'paragraph'
      ? children[0].children || []
      : children;
  const inline = renderableInlineChildren(normalizedChildren, context);

  if (inline.children.length === 0) {
    return {
      error: createIssue({
        level: 'error',
        ...context,
        message: 'SlideLead must contain renderable inline content.',
      }),
    };
  }

  return {
    block: {
      type: 'lead',
      children: inline.children,
    },
  };
}

function resolveSlideLink(url, contentPath) {
  if (
    !url ||
    /^[a-z][a-z0-9+.-]*:/i.test(url) ||
    url.startsWith('//') ||
    url.startsWith('/') ||
    url.startsWith('#')
  ) {
    return url;
  }

  const dir = path.dirname(contentPath);
  const resolved = path.join(dir, url);
  const parts = resolved.split(path.sep);

  if (parts[0] === 'content') {
    return '/' + parts.slice(1).join('/');
  }

  return url;
}

function renderableInlineChildren(children, context) {
  const result = [];
  const warnings = [];
  const errors = [];

  for (const child of children) {
    switch (child.type) {
      case 'text':
        result.push({ type: 'text', value: child.value || '' });
        break;
      case 'strong':
      case 'emphasis':
      case 'delete': {
        const nested = renderableInlineChildren(child.children || [], context);
        warnings.push(...nested.warnings);
        errors.push(...nested.errors);
        result.push({
          type: child.type,
          children: nested.children,
        });
        break;
      }
      case 'inlineCode':
        result.push({ type: 'inlineCode', value: child.value || '' });
        break;
      case 'break':
        result.push({ type: 'break' });
        break;
      case 'link': {
        const nested = renderableInlineChildren(child.children || [], context);
        warnings.push(...nested.warnings);
        errors.push(...nested.errors);
        result.push({
          type: 'link',
          url: resolveSlideLink(child.url || '', context.contentPath),
          children: nested.children,
        });
        break;
      }
      case 'mdxJsxTextElement':
        if (child.name === 'br') {
          result.push({ type: 'break' });
          break;
        }

        if (child.name === 'mark') {
          const nested = renderableInlineChildren(child.children || [], context);
          warnings.push(...nested.warnings);
          errors.push(...nested.errors);
          result.push({
            type: 'mark',
            children: nested.children,
          });
          break;
        }

        errors.push(
          createIssue({
            level: 'error',
            ...context,
            message: `Unsupported inline JSX node: ${child.name}.`,
          }),
        );
        break;
      default:
        errors.push(
          createIssue({
            level: 'error',
            ...context,
            message: `Unsupported inline node: ${nodeLabel(child)}.`,
          }),
        );
    }
  }

  return {
    children: result,
    warnings,
    errors,
  };
}

function qualifiesAsLead(node) {
  const text = compactText(node.children || []);
  return (
    text.length > 0 &&
    text.length <= AUTO_LIMITS.leadChars &&
    sentenceCount(text) <= AUTO_LIMITS.leadSentences
  );
}

function imageFromParagraph(node) {
  if (
    node.children?.length === 1 &&
    node.children[0].type === 'image'
  ) {
    return {
      url: node.children[0].url || '',
      alt: node.children[0].alt || '',
    };
  }

  return null;
}

function findNestedMarkerIssues(node, context) {
  for (const child of node.children || []) {
    if (isMarkerNode(child)) {
      context.issues.errors.push(
        createIssue({
          level: 'error',
          ...context,
          message: 'Slide markers may not be nested inside other markers or components.',
        }),
      );
      continue;
    }

    findNestedMarkerIssues(child, context);
  }
}

function containsNestedMarker(node) {
  for (const child of node.children || []) {
    if (isMarkerNode(child) || containsNestedMarker(child)) {
      return true;
    }
  }

  return false;
}

function isCallout(node) {
  return node?.type === 'mdxJsxFlowElement' && node.name === 'Callout';
}

function isMarker(node, name) {
  return isMarkerNode(node) && node.name === name;
}

function isMarkerNode(node) {
  return (
    (node?.type === 'mdxJsxFlowElement' || node?.type === 'mdxJsxTextElement') &&
    MARKER_NAMES.has(node.name)
  );
}

function isUnsupportedVisibleNode(node) {
  if (!node) {
    return false;
  }

  if (node.type === 'mdxJsxFlowElement') {
    return node.name !== 'Callout';
  }

  return ['html', 'jsx'].includes(node.type);
}

function getAttributeValue(node, name) {
  const attribute = (node.attributes || []).find((item) => item.name === name);
  return attribute?.value ?? '';
}

function inlineText(node) {
  return compactText(node?.children || []);
}

function nodeText(node) {
  return compactText([node]);
}

function compactText(input) {
  return toString({ type: 'root', children: Array.isArray(input) ? input : [input] })
    .replace(/\s+/g, ' ')
    .trim();
}

function sentenceCount(text) {
  return text
    .split(/[.!?]+/)
    .map((part) => part.trim())
    .filter(Boolean).length;
}

function nonEmptyLineCount(value) {
  return value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean).length;
}

function nodeLabel(node) {
  if (node?.type === 'mdxJsxFlowElement' || node?.type === 'mdxJsxTextElement') {
    return node.name || node.type;
  }

  return node?.type || 'unknown';
}

function isWhitespaceNode(node) {
  return compactText(node).length === 0;
}

function createIssue({
  level,
  contentPath,
  sectionTitle = null,
  segmentIndex = null,
  message,
}) {
  return {
    level,
    contentPath,
    sectionTitle,
    segmentIndex,
    message,
  };
}

export function formatIssue(issue) {
  const prefix = [issue.contentPath, issue.sectionTitle, issue.segmentIndex]
    .filter(Boolean)
    .join(' :: ');

  return `${prefix} :: ${issue.message}`;
}

async function exists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}
