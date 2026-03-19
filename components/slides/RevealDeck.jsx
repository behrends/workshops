'use client';

import { useState } from 'react';
import { Deck, Slide } from '@revealjs/react';

export { Slide };

const fullScreenConfig = {
  hash: true,
  controls: false,
  center: true,
  margin: 0.04,
  slideNumber: true,
  width: 1280,
  height: 720,
};

const embeddedConfig = {
  ...fullScreenConfig,
  hash: false,
  history: false,
  embedded: true,
  controls: true,
  controlsLayout: 'edges',
  keyboardCondition: 'focused',
  mouseWheel: false,
  touch: true,
};

export default function RevealDeck({ children }) {
  const [config] = useState(() => {
    if (typeof window === 'undefined') return fullScreenConfig;
    return new URLSearchParams(window.location.search).has('embedded')
      ? embeddedConfig
      : fullScreenConfig;
  });

  return (
    <div className="reveal-viewport">
      <Deck config={config}>{children}</Deck>
    </div>
  );
}
