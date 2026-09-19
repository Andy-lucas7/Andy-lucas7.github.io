import React, { useState, useEffect } from 'react';
import GlassSurface from './GlassSurface';

/**
 * GlassIntro - Animação de Abertura com Cápsulas de GlassSurface (React Bits)
 * Utiliza o componente <GlassSurface /> com refração SVG real, dispersão cromática
 * e as configurações estritas fornecidas (preset Scroll: radius 50px, border 0.07, brightness 50%,
 * opacity 1, blur 12px, displace 1.9, distortionScale -180, chromatic offsets 0/10/20).
 */
export default function GlassIntro({ onComplete }) {
  const [phase, setPhase] = useState('swarming'); // 'swarming' | 'organizing' | 'done'
  const [skipped, setSkipped] = useState(false);

  useEffect(() => {
    // Fase 1: As cápsulas deslizam e cruzam umas sobre as outras (0s - 1.8s)
    const timer1 = setTimeout(() => {
      setPhase('organizing');
    }, 1800);

    // Fase 2: Elas se organizam e a interface aparece (1.8s - 2.8s)
    const timer2 = setTimeout(() => {
      setPhase('done');
      if (onComplete) onComplete();
    }, 2800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onComplete]);

  const handleSkip = () => {
    setSkipped(true);
    setPhase('done');
    if (onComplete) onComplete();
  };

  if (phase === 'done' || skipped) return null;

  // 6 cápsulas com propriedades de animação únicas
  const capsules = [
    { id: 1, initialX: -140, targetX: -125, delay: 0 },
    { id: 2, initialX: -80, targetX: -75, delay: 0.1 },
    { id: 3, initialX: -20, targetX: -25, delay: 0.2 },
    { id: 4, initialX: 40, targetX: 25, delay: 0.15 },
    { id: 5, initialX: 100, targetX: 75, delay: 0.05 },
    { id: 6, initialX: 160, targetX: 125, delay: 0.25 }
  ];

  return (
    <div
      onClick={handleSkip}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        background: 'rgba(3, 3, 5, 0.94)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        overflow: 'hidden',
        transition: 'opacity 0.6s ease',
        opacity: phase === 'organizing' ? 0.9 : 1
      }}
      title="Clique para pular animação"
    >
      <style>{`
        @keyframes floatCapsule1 {
          0% { transform: translateY(-40px) scale(0.95); }
          50% { transform: translateY(40px) scale(1.05) rotate(-3deg); }
          100% { transform: translateY(-40px) scale(0.95); }
        }
        @keyframes floatCapsule2 {
          0% { transform: translateY(50px) scale(1.03); }
          50% { transform: translateY(-45px) scale(0.96) rotate(4deg); }
          100% { transform: translateY(50px) scale(1.03); }
        }
        @keyframes pulseGlow {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.15); opacity: 0.8; }
        }
      `}</style>

      {/* Luz ambiente volumétrica de fundo para alimentação óptica da refração */}
      <div
        style={{
          position: 'absolute',
          width: '520px',
          height: '320px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0, 240, 255, 0.25) 0%, rgba(168, 85, 247, 0.2) 45%, transparent 75%)',
          filter: 'blur(50px)',
          animation: 'pulseGlow 4s ease-in-out infinite',
          pointerEvents: 'none'
        }}
      />

      {/* Cápsulas de Vidro Real com GlassSurface */}
      <div
        style={{
          position: 'relative',
          width: '340px',
          height: '240px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.9s cubic-bezier(0.16, 1, 0.3, 1)',
          transform: phase === 'organizing' 
            ? 'translateY(-40vh) scale(0.4) rotate(90deg)' 
            : 'translateY(0) scale(1) rotate(0deg)',
          opacity: phase === 'organizing' ? 0.4 : 1
        }}
      >
        {capsules.map((capsule, index) => {
          const isEven = index % 2 === 0;

          return (
            <div
              key={capsule.id}
              style={{
                position: 'absolute',
                width: '56px',
                height: '190px',
                transform: phase === 'swarming'
                  ? `translateX(${capsule.initialX}px)`
                  : `translateX(${capsule.targetX}px)`,
                animation: phase === 'swarming'
                  ? `${isEven ? 'floatCapsule1' : 'floatCapsule2'} ${2.4 + index * 0.2}s infinite ease-in-out`
                  : 'none',
                transition: 'all 0.8s cubic-bezier(0.25, 1, 0.5, 1)',
                zIndex: index + 10,
                pointerEvents: 'none'
              }}
            >
              <GlassSurface
                width={56}
                height={190}
                borderRadius={50}
                borderWidth={0.07}
                brightness={50}
                opacity={1}
                blur={12}
                displace={1.9}
                backgroundOpacity={0.1}
                saturation={1}
                distortionScale={-180}
                redOffset={0}
                greenOffset={10}
                blueOffset={20}
                style={{
                  width: '100%',
                  height: '100%',
                  boxShadow: '0 12px 32px rgba(0, 0, 0, 0.45)'
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Badge sutil de carregamento / pular com GlassSurface */}
      <div
        style={{
          position: 'absolute',
          bottom: '3rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          pointerEvents: 'auto'
        }}
      >
        <GlassSurface
          width="auto"
          height={38}
          borderRadius={50}
          borderWidth={0.07}
          brightness={50}
          opacity={1}
          blur={12}
          displace={1.9}
          backgroundOpacity={0.1}
          saturation={1}
          distortionScale={-180}
          redOffset={0}
          greenOffset={10}
          blueOffset={20}
          style={{ padding: '0 1.25rem' }}
        >
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              color: 'rgba(255, 255, 255, 0.85)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem'
            }}
          >
            <span>Carregando GlassSurface</span>
            <span
              style={{
                fontSize: '0.65rem',
                padding: '0.15rem 0.45rem',
                borderRadius: '9999px',
                background: 'rgba(255, 255, 255, 0.12)',
                color: 'var(--accent-cyan)'
              }}
            >
              Pular
            </span>
          </div>
        </GlassSurface>
      </div>
    </div>
  );
}
