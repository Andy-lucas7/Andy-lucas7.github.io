import React, { useRef } from 'react';
import { useInView } from '../../hooks/useInView';

/**
 * ShinyText - React Bits Component
 * Gera um efeito de brilho metálico/luz contínua que desliza sobre a tipografia.
 *
 * background-position com background-clip:text exige repintura a cada frame;
 * fora da viewport a animação é pausada para não repintar texto invisível.
 */
export default function ShinyText({ text, speed = 3.5, className = '', style = {} }) {
  const ref = useRef(null);
  const inView = useInView(ref, { rootMargin: '100px 0px' });

  return (
    <span
      ref={ref}
      className={`shiny-text ${className}`.trim()}
      style={{
        animationDuration: `${speed}s`,
        animationPlayState: inView ? 'running' : 'paused',
        ...style
      }}
    >
      {text}
    </span>
  );
}
