import React, { useRef, useState } from 'react';

/**
 * SpotlightCard - React Bits Component
 * Card com iluminação direcional radial que segue o cursor do mouse,
 * destacando a borda e o fundo com gradientes cibernéticos.
 */
export default function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgba(0, 240, 255, 0.25)',
  borderColor = 'rgba(0, 240, 255, 0.8)',
  style = {},
  ...props
}) {
  const cardRef = useRef(null);
  const rafRef = useRef(null);
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const clientX = e.clientX;
    const clientY = e.clientY;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      cardRef.current.style.setProperty('--mouse-x', `${clientX - rect.left}px`);
      cardRef.current.style.setProperty('--mouse-y', `${clientY - rect.top}px`);
    });

    if (opacity !== 1) setOpacity(1);
  };

  const handleMouseLeave = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setOpacity(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`spotlight-card-wrapper ${className}`}
      style={{
        '--mouse-x': '-1000px',
        '--mouse-y': '-1000px',
        ...style
      }}
      {...props}
    >
      {/* Borda iluminada pelo holofote */}
      <div 
        className="spotlight-card-border"
        style={{
          opacity: opacity,
          background: `radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), ${borderColor}, transparent 70%)`
        }}
      />

      {/* Conteúdo do Card */}
      <div className="spotlight-card-inner">
        {/* Luz de preenchimento interna suave */}
        <div 
          className="spotlight-card-glow"
          style={{
            opacity: opacity,
            background: `radial-gradient(350px circle at var(--mouse-x) var(--mouse-y), ${spotlightColor}, transparent 75%)`
          }}
        />
        <div style={{ position: 'relative', zIndex: 2 }}>
          {children}
        </div>
      </div>
    </div>
  );
}
