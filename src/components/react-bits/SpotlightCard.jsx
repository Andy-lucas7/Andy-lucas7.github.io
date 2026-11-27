import React, { useRef } from 'react';
import { useRevealClass } from '../ui/Reveal';

/**
 * SpotlightCard - React Bits Component
 * Card com iluminação direcional radial que segue o cursor do mouse,
 * destacando a borda e o fundo com gradientes cibernéticos.
 *
 * A posição do cursor é escrita direto em custom properties (sem estado React)
 * e a visibilidade do holofote vem de :hover no CSS: mover o mouse não
 * re-renderiza o componente.
 */
export default function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgba(0, 240, 255, 0.25)',
  borderColor = 'rgba(0, 240, 255, 0.8)',
  reveal = false,
  revealDelay = 0,
  style = {},
  ...props
}) {
  const cardRef = useRef(null);
  const rafRef = useRef(0);
  const revealClass = useRevealClass(cardRef, reveal);

  const handlePointerMove = (e) => {
    const { clientX, clientY } = e;
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const card = cardRef.current;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mouse-x', `${clientX - rect.left}px`);
      card.style.setProperty('--mouse-y', `${clientY - rect.top}px`);
    });
  };

  const handlePointerLeave = () => cancelAnimationFrame(rafRef.current);

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerDown={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`spotlight-card-wrapper ${revealClass} ${className}`.trim()}
      style={{
        '--mouse-x': '-1000px',
        '--mouse-y': '-1000px',
        '--spotlight-border': borderColor,
        '--spotlight-fill': spotlightColor,
        ...(revealDelay ? { '--reveal-delay': `${revealDelay}ms` } : null),
        ...style
      }}
      {...props}
    >
      {/* Borda iluminada pelo holofote */}
      <div className="spotlight-card-border" />

      {/* Conteúdo do Card */}
      <div className="spotlight-card-inner">
        {/* Luz de preenchimento interna suave */}
        <div className="spotlight-card-glow" />
        <div className="spotlight-card-body">{children}</div>
      </div>
    </div>
  );
}
