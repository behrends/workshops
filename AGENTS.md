# Repository Guidelines

## Project Overview
This repository hosts **workshop materials** for teaching programming concepts, web development, and mobile app development. The content is written in German and targets students learning these topics.

**Workshop areas:**
- `prog/`: General programming fundamentals and a glossary of key terms.
- `web-prog/`: Web development with HTML, CSS, and JavaScript.
- `mobile/`: Mobile app development covering Android (Kotlin/Compose), Flutter, React Native, and cross-platform frameworks.
- `praesi/`: Presentation topics including AI tools and creative coding (p5.js).

The site is built with Next.js and Nextra, deployed via Vercel, and uses MDX for rich, interactive content with embedded code editors (Sandpack).

## Project Structure & Module Organization
The site is a Next.js + Nextra docs app. Key locations:
- `app/`: App Router entry, layout, and global styles.
- `content/`: MDX workshop content organized by topic; `_meta.js` files drive navigation.
- `components/`: shared React components (e.g., `JSEditor.js`).
- `public/`: static assets, sitemap, and Pagefind search index (`_pagefind`).
- `assets/`, `diagrams/`: source documents and diagrams used in content.

## Build, Test, and Development Commands
- `npm run dev`: start the local dev server with hot reload.
- `npm run build`: create a production build in `.next`.
- `npm run start`: serve the production build locally.
- `npm run postbuild`: generate sitemap and Pagefind index (runs after `build`).

## Coding Style & Naming Conventions
Use the existing style: 2-space indentation, semicolons, and ESM imports. Components use `PascalCase` names (e.g., `JSEditor.js`). Content folders and files are numbered and kebab-cased (e.g., `content/mobile/07-projekt`). Keep navigation data in `_meta.js` alongside MDX files. No lint/format script is configured; keep changes consistent with surrounding code.

## Testing Guidelines
There is no automated test runner configured in `package.json`. If you add tests, prefer `__tests__/` or `*.test.jsx` naming and introduce a script such as `npm test` so contributors have a single entry point.

## Commit & Pull Request Guidelines
Commit messages typically follow `Area: short summary` (e.g., `Prog: Glossar erweitert`, `Präsi: Add z.ai and minimax.io`). Keep commits focused on one content area. Commit messages should be concise and descriptive but not too verbose.

## Content & Assets
Place MDX content under `content/` and reference images from `public/images` with absolute paths (e.g., `/images/example.png`). Use `components/` or `mdx-components.js` for reusable MDX blocks instead of duplicating markup.
