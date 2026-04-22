import { promises as fs } from 'node:fs';
import path from 'node:path';
import { cache } from 'react';

const decksRoot = path.join(process.cwd(), 'public', 'decks');
const labelOverrides = new Map([
  ['ki', 'KI'],
  ['praesi', 'Präsi'],
  ['praesentationen', 'Präsentationen'],
]);

function humanizeSlug(slug) {
  return slug
    .split(/[-_]/)
    .filter(Boolean)
    .map((part) => {
      const normalizedPart = part.toLowerCase();

      if (labelOverrides.has(normalizedPart)) {
        return labelOverrides.get(normalizedPart);
      }

      if (part.toUpperCase() === part) {
        return part;
      }

      return part.charAt(0).toUpperCase() + part.slice(1);
    })
    .join(' ');
}

function normalizeText(text = '') {
  return text
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^\p{L}\p{N}]+/gu, '');
}

function decodeHtml(text = '') {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&hellip;/g, '...')
    .replace(/&mdash;/g, '-')
    .replace(/&ndash;/g, '-')
    .replace(/&rarr;/g, '->')
    .replace(/&#(\d+);/g, (_, codepoint) => String.fromCodePoint(Number(codepoint)))
    .replace(/&#x([0-9a-f]+);/gi, (_, codepoint) =>
      String.fromCodePoint(Number.parseInt(codepoint, 16))
    );
}

function buildPdfLabel(index, total) {
  if (total === 1) {
    return 'PDF-Version';
  }

  return `PDF-Version ${index + 1}`;
}

function extractMatch(source, patterns) {
  for (const pattern of patterns) {
    const match = source.match(pattern);
    if (match?.[1]) {
      return decodeHtml(match[1].replace(/<[^>]+>/g, '').trim());
    }
  }

  return null;
}

async function extractHtmlMetadata(filePath) {
  const html = await fs.readFile(filePath, 'utf8');

  return {
    title: extractMatch(html, [/<title>([\s\S]*?)<\/title>/i, /<h1[^>]*>([\s\S]*?)<\/h1>/i]),
    headline: extractMatch(html, [/<h1[^>]*>([\s\S]*?)<\/h1>/i]),
    description: extractMatch(html, [
      /<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["'][^>]*>/i,
      /<meta[^>]*content=["']([^"']+)["'][^>]*name=["']description["'][^>]*>/i,
    ]),
  };
}

export const getDeckCatalog = cache(async function getDeckCatalog() {
  let entries = [];

  try {
    entries = await fs.readdir(decksRoot, { withFileTypes: true });
  } catch (error) {
    if (error?.code === 'ENOENT') {
      return [];
    }

    throw error;
  }

  const decks = await Promise.all(
    entries
      .filter((entry) => entry.isDirectory())
      .map(async (entry) => {
        const directoryPath = path.join(decksRoot, entry.name);
        const files = await fs.readdir(directoryPath, { withFileTypes: true });
        const fileNames = files.filter((file) => file.isFile()).map((file) => file.name);
        const htmlDeckPath = path.join(directoryPath, 'index.html');
        const hasHtmlDeck = fileNames.includes('index.html');
        const pdfFiles = fileNames
          .filter((name) => name.toLowerCase().endsWith('.pdf'))
          .sort((left, right) => left.localeCompare(right, 'de-DE'));

        if (!hasHtmlDeck && pdfFiles.length === 0) {
          return null;
        }

        const metadata = hasHtmlDeck
          ? await extractHtmlMetadata(htmlDeckPath)
          : { title: null, headline: null, description: null };

        const label = humanizeSlug(entry.name);
        const title = metadata.headline || metadata.title || humanizeSlug(entry.name);
        const subtitle =
          metadata.headline &&
          metadata.title &&
          normalizeText(metadata.headline) !== normalizeText(metadata.title)
            ? metadata.title
            : null;
        const description =
          metadata.description &&
          normalizeText(metadata.description) !== normalizeText(title) &&
          normalizeText(metadata.description) !== normalizeText(subtitle || '')
            ? metadata.description
            : null;

        return {
          slug: entry.name,
          label,
          title,
          subtitle,
          description,
          revealHref: hasHtmlDeck ? `/decks/${entry.name}/` : null,
          speakerHref: hasHtmlDeck ? `/decks/${entry.name}/?speaker=1` : null,
          pdfs: pdfFiles.map((fileName, index) => ({
            name: fileName,
            label: buildPdfLabel(index, pdfFiles.length),
            href: `/decks/${entry.name}/${fileName}`,
          })),
        };
      })
  );

  return decks
    .filter(Boolean)
    .sort((left, right) => left.title.localeCompare(right.title, 'de-DE'));
});
