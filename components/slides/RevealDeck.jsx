'use client';

import { useSearchParams } from 'next/navigation';
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
  const searchParams = useSearchParams();
  const embedded = searchParams.has('embedded');

  return (
    <div className="reveal-viewport">
      <Deck config={embedded ? embeddedConfig : fullScreenConfig}>{children}</Deck>
    </div>
  );
}
