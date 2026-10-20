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
    this.speed = (0.1 + Math.random() * 0.3) * speed;
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
    const fillStyle = elevationRatio > 0.6 ? this.colors[0] : (this.colors[1] || this.color);
    if (this.ctx._lastFillStyle !== fillStyle) {
      this.ctx.fillStyle = fillStyle;
      this.ctx._lastFillStyle = fillStyle;
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
  speed = 0.0004,
  colors = '#ffffff,#00f0ff,#a855f7,#7dd3fc'
}) {
  const canvasRef = useRef(null);
  const vignetteCanvasRef = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    const vignetteCanvas = vignetteCanvasRef.current;
    if (!canvas || !vignetteCanvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    const vCtx = vignetteCanvas.getContext('2d');
    if (!ctx || !vCtx) return;

    let animId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let time = 0;

    const colorsArray = colors.split(',');
    let pixels = [];

    const drawStaticVignette = (w, h) => {
      vignetteCanvas.width = w;
      vignetteCanvas.height = h;
      vCtx.clearRect(0, 0, w, h);
      const grad = vCtx.createRadialGradient(
        w / 2, h / 2, Math.min(w, h) * 0.4,
        w / 2, h / 2, Math.max(w, h) * 0.85
      );
      grad.addColorStop(0, 'rgba(3, 3, 5, 0)');
      grad.addColorStop(1, 'rgba(3, 3, 5, 0.7)');
      vCtx.fillStyle = grad;
      vCtx.fillRect(0, 0, w, h);
    };

    const initGrid = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      drawStaticVignette(width, height);
      pixels = [];

      for (let x = 0; x < width + gap; x += gap) {
        for (let y = 0; y < height + gap; y += gap) {
          const baseDelay = (Math.sin(x * 0.01) + Math.cos(y * 0.01)) * 5;
          pixels.push(new WavePixel(canvas, ctx, x, y, colorsArray, 0.04, Math.abs(baseDelay)));
        }
      }
    };

    initGrid();

    const handleResize = () => {
      const newW = window.innerWidth;
      const newH = window.innerHeight;
      // Evita recriar todo o grid no mobile quando apenas a barra de endereço retrai/expande
      if (newW === width && Math.abs(newH - height) < 140 && newH <= height) {
        return;
      }
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

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    const mouseRadius = 200;
    const mouseRadiusSq = mouseRadius * mouseRadius;

    const render = () => {
      if (document.hidden) {
        animId = requestAnimationFrame(render);
        return;
      }

      time += 0.025;

      // Fundo preto absoluto cinematográfico
      ctx.fillStyle = '#030305';
      ctx._lastFillStyle = '#030305';
      ctx.fillRect(0, 0, width, height);

      const mouseX = mouseRef.current.x;
      const mouseY = mouseRef.current.y;
      const isMouseActive = mouseRef.current.active;
      const t1 = time * 0.8;
      const t2 = time * 0.6;
      const t3 = time * 0.4;

      for (let i = 0, len = pixels.length; i < len; i++) {
        const p = pixels[i];

        // Equação de propagação de ondas do "Mar de Pixels"
        // Cria frentes de onda senoidais entrelaçadas como o mar
        const wave1 = Math.sin(p.x * 0.004 + t1);
        const wave2 = Math.cos(p.y * 0.005 + p.x * 0.002 - t2);
        const wave3 = Math.sin((p.x + p.y) * 0.003 + t3);
        
        // Normalizado de 0 a 1
        const waveNormalized = (wave1 + wave2 + wave3 + 3) * 0.16666667;

        let dist = 9999;
        if (isMouseActive) {
          const dx = p.x - mouseX;
          const dy = p.y - mouseY;
          const distSq = dx * dx + dy * dy;
          if (distSq < mouseRadiusSq) {
            dist = Math.sqrt(distSq);
          }
        }

        p.updateWithWave(waveNormalized, dist, mouseRadius);
      }

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
    <>
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
          display: 'block',
          transform: 'translate3d(0, 0, 0)',
          backfaceVisibility: 'hidden',
          willChange: 'transform'
        }}
        aria-hidden="true"
      />
      <canvas
        ref={vignetteCanvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 0,
          pointerEvents: 'none',
          display: 'block',
          transform: 'translate3d(0, 0, 0)',
          backfaceVisibility: 'hidden'
        }}
        aria-hidden="true"
      />
    </>
  );
}
