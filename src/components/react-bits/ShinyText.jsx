import React from 'react';

/**
 * ShinyText - React Bits Component
 * Gera um efeito de brilho metálico/luz contínua que desliza sobre a tipografia.
 */
export default function ShinyText({
  text,
  speed = 3.5,
  className = '',
  style = {}
}) {
  return (
    <span
      className={`shiny-text ${className}`}
      style={{
        animationDuration: `${speed}s`,
        ...style
      }}
    >
      {text}
    </span>
  );
}
