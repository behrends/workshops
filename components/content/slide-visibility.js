import { Fragment } from 'react';

export function DocsOnly({ children }) {
  return <Fragment>{children}</Fragment>;
}

export function SlideOnly() {
  return null;
}

export function SlideLead({ children }) {
  return <Fragment>{children}</Fragment>;
}

export function SlideBreak() {
  return null;
}
