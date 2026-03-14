'use client';

import { useEffect, useRef } from 'react';
import Reveal from 'reveal.js';

const deckConfig = {
  hash: true,
  controls: false,
  center: true,
  margin: 0.04,
  slideNumber: true,
  width: 1280,
  height: 720,
};

export default function RevealDeck({ children }) {
  const deckRef = useRef(null);

  useEffect(() => {
    if (!deckRef.current) {
      return undefined;
    }

    const deck = new Reveal(deckRef.current, deckConfig);
    deck.initialize().then(() => deck.sync());

    return () => {
      try {
        deck.destroy();
      } catch {
        // Reveal may throw if already destroyed
      }
    };
  }, []);

  return (
    <div className="reveal-viewport">
      <div ref={deckRef} className="reveal">
        <div className="slides">{children}</div>
      </div>
    </div>
  );
}
