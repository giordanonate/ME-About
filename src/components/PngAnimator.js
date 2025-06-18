'use client';
import { useState, useEffect } from 'react';

export default function PngAnimator({ basePath, frameCount, interval = 100, prefix = 'Blocks-Full', extension = 'png', digits = 4, playing = true }) {
  const [frameIndex, setFrameIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    if (!playing) return;

    const timer = setInterval(() => {
      setFrameIndex(prev => {
        let next = prev + direction;

        if (next >= frameCount) {
          setDirection(-1);
          return frameCount - 2;
        } else if (next < 0) {
          setDirection(1);
          return 1;
        }

        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [playing, frameCount, interval, direction]);

  const frameNum = String(frameIndex + 1).padStart(digits, '0');
  const src = `${basePath}/${prefix}${frameNum}.${extension}`;

  return (
    <img
      src={src}
      alt={`Frame ${frameIndex + 1}`}
      style={{
        width: '100%',
        maxWidth: '1920px',
        display: 'block',
        margin: '0 auto',
        pointerEvents: 'none',
      }}
    />
  );
}
