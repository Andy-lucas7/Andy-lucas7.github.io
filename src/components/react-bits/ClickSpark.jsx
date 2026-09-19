import React, { useEffect, useRef } from 'react';

/**
 * ClickSpark - React Bits Micro-interaction
 * Emite faíscas de luz cibernéticas nas coordenadas exatas de qualquer clique na página.
 */
export default function ClickSpark({
  sparkColor = '#00f0ff',
  sparkSize = 10,
  sparkCount = 8,
  duration = 450
}) {
  const canvasRef = useRef(null);
  const sparksRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const handleClick = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      const now = performance.now();

      for (let i = 0; i < sparkCount; i++) {
        const angle = (Math.PI * 2 * i) / sparkCount + (Math.random() - 0.5) * 0.5;
        const velocity = 2.5 + Math.random() * 2.5;
        sparksRef.current.push({
          x,
          y,
          vx: Math.cos(angle) * velocity,
          vy: Math.sin(angle) * velocity,
          size: sparkSize * (0.6 + Math.random() * 0.8),
          startTime: now,
          color: i % 2 === 0 ? sparkColor : '#a855f7'
        });
      }
    };

    window.addEventListener('pointerdown', handleClick);

    const animate = (time) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      sparksRef.current = sparksRef.current.filter((spark) => {
        const elapsed = time - spark.startTime;
        if (elapsed > duration) return false;

        const progress = elapsed / duration;
        const alpha = 1 - progress;

        spark.x += spark.vx;
        spark.y += spark.vy;

        ctx.save();
        ctx.fillStyle = spark.color;
        ctx.globalAlpha = alpha;
        ctx.shadowColor = spark.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(spark.x, spark.y, spark.size * (1 - progress * 0.5), 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        return true;
      });

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointerdown', handleClick);
    };
  }, [sparkColor, sparkSize, sparkCount, duration]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 99999
      }}
      aria-hidden="true"
    />
  );
}
