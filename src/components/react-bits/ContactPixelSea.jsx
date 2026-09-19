import React, { useEffect, useRef } from 'react';

class ContactPixel {
  constructor(canvas, context, x, y) {
    this.canvas = canvas;
    this.ctx = context;
    this.x = x;
    this.y = y;
    this.color = '#ffffff';
    this.size = 0;
    this.maxSize = 2.5;
  }

  updateAndDraw(waveValue) {
    // waveValue goes from 0 to 1
    // scale size based on wave
    if (waveValue > 0.3) {
      this.size = (waveValue - 0.3) * (this.maxSize / 0.7);
    } else {
      this.size = 0;
    }

    if (this.size > 0.2) {
      const centerOffset = (this.maxSize - this.size) * 0.5;
      this.ctx.fillStyle = this.color;
      this.ctx.fillRect(this.x + centerOffset, this.y + centerOffset, this.size, this.size);
    }
  }
}

export default function ContactPixelSea({ gap = 15 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animId;
    let width = 0;
    let height = 0;
    let time = 0;
    let pixels = [];

    const initGrid = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      width = canvas.width = rect.width;
      height = canvas.height = rect.height;
      pixels = [];

      for (let x = 0; x < width + gap; x += gap) {
        for (let y = 0; y < height + gap; y += gap) {
          pixels.push(new ContactPixel(canvas, ctx, x, y));
        }
      }
    };

    initGrid();
    const resizeObserver = new ResizeObserver(() => initGrid());
    resizeObserver.observe(canvas.parentElement);

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < pixels.length; i++) {
        const p = pixels[i];

        // Complex interlocking waves for the white pixels
        const wave1 = Math.sin(p.x * 0.005 + time * 1.2);
        const wave2 = Math.cos(p.y * 0.006 - time * 0.8);
        const wave3 = Math.sin((p.x - p.y) * 0.004 + time * 1.5);
        
        const waveNormalized = (wave1 + wave2 + wave3 + 3) / 6;

        p.updateAndDraw(waveNormalized);
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
    };
  }, [gap]);

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 0,
      pointerEvents: 'none',
      overflow: 'hidden',
      borderRadius: 'inherit'
    }}>
      {/* Luz indireta bem fraca do lado esquerdo (Azul no canto inferior esquerdo) */}
      <div style={{
        position: 'absolute',
        bottom: '-25%',
        left: '-15%',
        width: '60%',
        height: '60%',
        background: 'radial-gradient(circle, rgba(37, 99, 235, 0.15) 0%, transparent 70%)',
        zIndex: 0
      }} />

      {/* Luz indireta bem fraca do lado direito (Roxo no canto superior direito) */}
      <div style={{
        position: 'absolute',
        top: '-25%',
        right: '-15%',
        width: '60%',
        height: '60%',
        background: 'radial-gradient(circle, rgba(147, 51, 234, 0.15) 0%, transparent 70%)',
        zIndex: 0
      }} />
      
      {/* Canvas para os pixels brancos */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
          opacity: 0.8
        }}
        aria-hidden="true"
      />
    </div>
  );
}
