import { useMDXComponents as getThemeComponents } from 'nextra-theme-docs';
import {
  DocsOnly,
  SlideBreak,
  SlideLead,
  SlideOnly,
} from './components/content/slide-visibility';

const themeComponents = getThemeComponents();

export function useMDXComponents(components) {
  return {
    ...themeComponents,
    DocsOnly,
    SlideOnly,
    SlideLead,
    SlideBreak,
    ...components,
  };
}
