# Repository Guidelines

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
Commit messages typically follow `Area: short summary` (e.g., `Prog: Glossar erweitert`, `Präsi: Add z.ai and minimax.io`). Keep commits focused on one content area. PRs should include a short description, note the affected content section(s), and attach screenshots for UI or content layout changes.

## Content & Assets
Place MDX content under `content/` and reference images from `public/images` with absolute paths (e.g., `/images/example.png`). Use `components/` or `mdx-components.js` for reusable MDX blocks instead of duplicating markup.
