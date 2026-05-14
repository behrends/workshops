import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const entryPath = fileURLToPath(import.meta.resolve('nextra-theme-docs'));
const packagePath = path.join(path.dirname(entryPath), '..', 'package.json');
const layoutPath = path.join(path.dirname(entryPath), 'layout.js');
const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

if (packageJson.version !== '4.6.1') {
  console.warn(`Skipping nextra-theme-docs patch: expected version 4.6.1, found ${packageJson.version}. Verify whether https://github.com/shuding/nextra/commit/f5fe77fc76a3eb6d4eff9ee306b5ee033ae93df6 is included.`);
  process.exit(0);
}

const source = fs.readFileSync(layoutPath, 'utf8');
const safeParsePatched = 'LayoutPropsSchema.safeParse({\n      ...themeConfig,\n      children\n    })';
const childrenMarker = 'let _children;';

if (source.includes(safeParsePatched) && source.includes(childrenMarker)) {
  process.exit(0);
}

// Backport of https://github.com/shuding/nextra/commit/f5fe77fc76a3eb6d4eff9ee306b5ee033ae93df6
// for nextra-theme-docs@4.6.1. The published dist file destructures `children`
// before validating props, but Zod 4.4.x treats the missing required key as an error.
function replaceOrThrow(input, search, replacement) {
  if (!input.includes(search)) {
    throw new Error(`Could not patch ${layoutPath}: expected pattern was not found: ${JSON.stringify(search)}`);
  }

  return input.replace(search, replacement);
}

let patched = replaceOrThrow(
  source,
  '} = LayoutPropsSchema.safeParse(themeConfig);',
  '} = LayoutPropsSchema.safeParse({\n      ...themeConfig,\n      children\n    });'
);

patched = replaceOrThrow(
  patched,
  'let banner;\n  let footer;',
  'let banner;\n  let _children;\n  let footer;'
);

patched = replaceOrThrow(
  patched,
  '({\n      footer,\n      navbar,',
  '({\n      children: _children,\n      footer,\n      navbar,'
);

fs.writeFileSync(layoutPath, patched);
console.log(`Patched ${layoutPath}`);
