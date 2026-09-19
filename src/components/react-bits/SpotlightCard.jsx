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
  const [coords, setCoords] = useState({ x: -1000, y: -1000 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`spotlight-card-wrapper ${className}`}
      style={{
        '--mouse-x': `${coords.x}px`,
        '--mouse-y': `${coords.y}px`,
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
