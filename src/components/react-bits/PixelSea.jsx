import React, { useEffect, useRef } from 'react';

/**
 * PixelSea - Mar de Pixels baseado na arquitetura da classe Pixel do React Bits.
 * Transforma a mecânica de pixels do React Bits (appear, shimmer, disappear)
 * em um oceano fluido de ondas contínuas com perturbação interativa via cursor.
 */
class WavePixel {
  constructor(canvas, context, x, y, colors, speed, baseDelay) {
    this.canvas = canvas;
    this.ctx = context;
    this.x = x;
    this.y = y;
    this.colors = colors;
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.speed = (0.1 + Math.random() * 0.8) * speed;
    this.size = 0;
    this.sizeStep = 0.1 + Math.random() * 0.35;
    this.minSize = 0.5;
    this.maxSizeInteger = 3.5;
    this.maxSize = this.minSize + Math.random() * (this.maxSizeInteger - this.minSize);
    this.delay = baseDelay;
    this.counter = 0;
    this.counterStep = Math.random() * 3 + 1;
    this.isIdle = true;
    this.isReverse = false;
    this.isShimmer = false;
    this.waveHeight = 0;
  }

  draw(elevationRatio = 0) {
    if (this.size <= 0.2) return;
    const centerOffset = (this.maxSizeInteger - this.size) * 0.5;
    
    // Gradiente sutil de cores do mar de pixels
    if (elevationRatio > 0.6) {
      this.ctx.fillStyle = this.colors[0]; // mais brilhante (ciano/branco)
    } else {
      this.ctx.fillStyle = this.colors[1] || this.color;
    }

    this.ctx.fillRect(
      this.x + centerOffset,
      this.y + centerOffset,
      this.size,
      this.size
    );
  }

  appear() {
    this.isIdle = false;
    if (this.counter <= this.delay) {
      this.counter += this.counterStep;
      return;
    }
    if (this.size >= this.maxSize) {
      this.isShimmer = true;
    }
    if (this.isShimmer) {
      this.shimmer();
    } else {
      this.size += this.sizeStep;
    }
  }

  disappear() {
    this.isShimmer = false;
    this.counter = 0;
    if (this.size <= 0.1) {
      this.size = 0;
      this.isIdle = true;
      return;
    }
    this.size -= 0.12;
  }

  shimmer() {
    if (this.size >= this.maxSize) {
      this.isReverse = true;
    } else if (this.size <= this.minSize) {
      this.isReverse = false;
    }
    if (this.isReverse) {
      this.size -= this.speed;
    } else {
      this.size += this.speed;
    }
  }

  updateWithWave(waveValue, mouseDist, mouseRadius) {
    // Interatividade do mouse: desperta os pixels
    const mouseInfluence = mouseDist < mouseRadius ? (1 - mouseDist / mouseRadius) : 0;
    const combinedEnergy = waveValue + mouseInfluence * 1.8;

    if (combinedEnergy > 0.45) {
      this.appear();
    } else {
      this.disappear();
    }

    if (!this.isIdle) {
      this.draw(combinedEnergy);
    }
  }
}

export default function PixelSea({
  gap = 20,
  speed = 0.0014,
  colors = '#ffffff,#00f0ff,#a855f7,#7dd3fc'
}) {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let animId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let time = 0;

    const colorsArray = colors.split(',');
    let pixels = [];

    const initGrid = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      pixels = [];

      for (let x = 0; x < width + gap; x += gap) {
        for (let y = 0; y < height + gap; y += gap) {
          const dx = x - width / 2;
          const dy = y - height / 2;
          const baseDelay = (Math.sin(x * 0.01) + Math.cos(y * 0.01)) * 5;
          pixels.push(new WavePixel(canvas, ctx, x, y, colorsArray, 0.04, Math.abs(baseDelay)));
        }
      }
    };

    initGrid();

    const handleResize = () => {
      initGrid();
    };

    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    const render = () => {
      time += 0.025;

      // Fundo preto absoluto cinematográfico
      ctx.fillStyle = '#030305';
      ctx.fillRect(0, 0, width, height);

      const mouseX = mouseRef.current.x;
      const mouseY = mouseRef.current.y;
      const mouseRadius = 200;

      for (let i = 0; i < pixels.length; i++) {
        const p = pixels[i];

        // Equação de propagação de ondas do "Mar de Pixels"
        // Cria frentes de onda senoidais entrelaçadas como o mar
        const wave1 = Math.sin(p.x * 0.004 + time * 0.8);
        const wave2 = Math.cos(p.y * 0.005 + p.x * 0.002 - time * 0.6);
        const wave3 = Math.sin((p.x + p.y) * 0.003 + time * 0.4);
        
        // Normalizado de 0 a 1
        const waveNormalized = (wave1 + wave2 + wave3 + 3) / 6;

        let dist = 9999;
        if (mouseRef.current.active) {
          const dx = p.x - mouseX;
          const dy = p.y - mouseY;
          dist = Math.sqrt(dx * dx + dy * dy);
        }

        p.updateWithWave(waveNormalized, dist, mouseRadius);
      }

      // Vinheta de profundidade suave
      const vignette = ctx.createRadialGradient(
        width / 2, height / 2, Math.min(width, height) * 0.4,
        width / 2, height / 2, Math.max(width, height) * 0.85
      );
      vignette.addColorStop(0, 'rgba(3, 3, 5, 0)');
      vignette.addColorStop(1, 'rgba(3, 3, 5, 0.7)');
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [gap, speed, colors]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
        display: 'block'
      }}
      aria-hidden="true"
    />
  );
}
