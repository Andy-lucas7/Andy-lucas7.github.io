import React, { useEffect, useRef } from 'react';

/**
 * PixelSea - Mar de Pixels baseado na arquitetura da classe Pixel do React Bits.
 * Transforma a mecânica de pixels do React Bits (appear, shimmer, disappear)
 * em um oceano fluido de ondas contínuas.
 *
 * Desempenho:
 * - Simulação em passo fixo de 60 Hz: a animação tem a mesma velocidade em telas
 *   de 60/90/120/144 Hz e o canvas só é redesenhado quando um passo é simulado.
 *   Em telas de 120 Hz isso corta pela metade os redesenhos do canvas e, por
 *   consequência, a recomposição de todos os backdrop-filter que ficam sobre ele.
 * - Os pixels ficam em typed arrays (estrutura de arrays) em vez de objetos,
 *   mantendo o loop quente sem alocação e amigável ao cache.
 * - A vinheta é um gradiente CSS estático: dispensa um segundo canvas em tela cheia.
 */

const STEP_MS = 1000 / 60;
const MAX_STEPS_PER_FRAME = 4;
const TIME_STEP = 0.0175;
const SHIMMER_SPEED = 0.028;
const MIN_SIZE = 0.5;
const MAX_SIZE_INTEGER = 3.5;
const DISAPPEAR_STEP = 0.084;
const WAVE_THRESHOLD = 0.45;
const HIGH_ELEVATION = 0.6;

const canvasStyle = {
  position: 'fixed',
  inset: 0,
  width: '100vw',
  height: '100vh',
  zIndex: 0,
  pointerEvents: 'none',
  display: 'block'
};

const vignetteStyle = {
  ...canvasStyle,
  // Mesmo gradiente do antigo canvas de vinheta: raio interno min(w,h)*0.4, externo max(w,h)*0.85
  background: 'radial-gradient(circle at 50% 50%, rgba(3, 3, 5, 0) min(40vw, 40vh), rgba(3, 3, 5, 0.7) max(85vw, 85vh))'
};

function createField(width, height, gap) {
  const cols = Math.ceil((width + gap) / gap);
  const rows = Math.ceil((height + gap) / gap);
  const count = cols * rows;

  const field = {
    count,
    x: new Float32Array(count),
    y: new Float32Array(count),
    // Termos espaciais das três ondas pré-calculados (só o tempo varia por frame)
    phase1: new Float32Array(count),
    phase2: new Float32Array(count),
    phase3: new Float32Array(count),
    size: new Float32Array(count),
    maxSize: new Float32Array(count),
    sizeStep: new Float32Array(count),
    speed: new Float32Array(count),
    delay: new Float32Array(count),
    counter: new Float32Array(count),
    counterStep: new Float32Array(count),
    // bit 0: shimmer | bit 1: reverse
    flags: new Uint8Array(count),
    wave: new Float32Array(count)
  };

  let i = 0;
  for (let c = 0; c < cols; c++) {
    const x = c * gap;
    for (let r = 0; r < rows; r++, i++) {
      const y = r * gap;
      field.x[i] = x;
      field.y[i] = y;
      field.phase1[i] = x * 0.004;
      field.phase2[i] = y * 0.005 + x * 0.002;
      field.phase3[i] = (x + y) * 0.003;
      field.maxSize[i] = MIN_SIZE + Math.random() * (MAX_SIZE_INTEGER - MIN_SIZE);
      field.sizeStep[i] = (0.1 + Math.random() * 0.35) * 0.7;
      field.speed[i] = (0.1 + Math.random() * 0.3) * SHIMMER_SPEED;
      field.delay[i] = Math.abs((Math.sin(x * 0.01) + Math.cos(y * 0.01)) * 5);
      field.counterStep[i] = (Math.random() * 3 + 1) * 0.7;
    }
  }

  return field;
}

function stepField(f, time) {
  const t1 = time * 0.8;
  const t2 = time * 0.6;
  const t3 = time * 0.4;
  const { size, maxSize, flags, counter } = f;

  for (let i = 0; i < f.count; i++) {
    // Frentes de onda senoidais entrelaçadas, normalizadas para 0..1
    const wave =
      (Math.sin(f.phase1[i] + t1) + Math.cos(f.phase2[i] - t2) + Math.sin(f.phase3[i] + t3) + 3) * 0.16666667;
    f.wave[i] = wave;

    if (wave > WAVE_THRESHOLD) {
      // appear
      if (counter[i] <= f.delay[i]) {
        counter[i] += f.counterStep[i];
        continue;
      }
      let fl = flags[i];
      if (size[i] >= maxSize[i]) fl |= 1;
      if (fl & 1) {
        // shimmer
        if (size[i] >= maxSize[i]) fl |= 2;
        else if (size[i] <= MIN_SIZE) fl &= ~2;
        size[i] += fl & 2 ? -f.speed[i] : f.speed[i];
      } else {
        size[i] += f.sizeStep[i];
      }
      flags[i] = fl;
    } else {
      // disappear
      flags[i] &= ~1;
      counter[i] = 0;
      size[i] = size[i] <= 0.1 ? 0 : size[i] - DISAPPEAR_STEP;
    }
  }
}

function drawField(ctx, f, width, height, lowColor, highColor) {
  ctx.fillStyle = '#030305';
  ctx.fillRect(0, 0, width, height);

  const { size } = f;
  // Duas passadas por cor: evita trocar fillStyle dentro do loop
  ctx.fillStyle = lowColor;
  for (let i = 0; i < f.count; i++) {
    const s = size[i];
    if (s > 0.2 && f.wave[i] <= HIGH_ELEVATION) {
      const o = (MAX_SIZE_INTEGER - s) * 0.5;
      ctx.fillRect(f.x[i] + o, f.y[i] + o, s, s);
    }
  }
  ctx.fillStyle = highColor;
  for (let i = 0; i < f.count; i++) {
    const s = size[i];
    if (s > 0.2 && f.wave[i] > HIGH_ELEVATION) {
      const o = (MAX_SIZE_INTEGER - s) * 0.5;
      ctx.fillRect(f.x[i] + o, f.y[i] + o, s, s);
    }
  }
}

export default function PixelSea({ gap = 20, colors = '#ffffff,#00f0ff,#a855f7,#7dd3fc' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d', { alpha: false });
    if (!ctx) return;

    const [highColor, lowColor = highColor] = colors.split(',').map((c) => c.trim());
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    let width = 0;
    let height = 0;
    let field = null;
    let time = 0;
    let frameId = 0;
    let lastNow = 0;
    let accumulator = 0;

    const initField = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      field = createField(width, height, gap);
    };

    const loop = (now) => {
      frameId = requestAnimationFrame(loop);
      accumulator += Math.min(now - lastNow, STEP_MS * MAX_STEPS_PER_FRAME);
      lastNow = now;
      if (accumulator < STEP_MS) return;

      while (accumulator >= STEP_MS) {
        time += TIME_STEP;
        stepField(field, time);
        accumulator -= STEP_MS;
      }
      drawField(ctx, field, width, height, lowColor, highColor);
    };

    const stop = () => {
      cancelAnimationFrame(frameId);
      frameId = 0;
    };

    const start = () => {
      if (frameId || document.hidden) return;
      if (reducedMotion.matches) {
        // Quadro estático já assentado: mantém a composição sem movimento contínuo
        for (let i = 0; i < 240; i++) stepField(field, (time += TIME_STEP));
        drawField(ctx, field, width, height, lowColor, highColor);
        return;
      }
      lastNow = performance.now();
      accumulator = STEP_MS;
      frameId = requestAnimationFrame(loop);
    };

    const restart = () => {
      stop();
      start();
    };

    const handleResize = () => {
      const newW = window.innerWidth;
      const newH = window.innerHeight;
      // Barra de endereço do mobile retraindo/expandindo não recria o grid
      if (newW === width && newH <= height && height - newH < 140) return;
      initField();
      if (!frameId) restart();
    };

    const handleVisibility = () => (document.hidden ? stop() : start());

    initField();
    start();

    window.addEventListener('resize', handleResize, { passive: true });
    document.addEventListener('visibilitychange', handleVisibility);
    reducedMotion.addEventListener('change', restart);

    return () => {
      stop();
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibility);
      reducedMotion.removeEventListener('change', restart);
    };
  }, [gap, colors]);

  return (
    <>
      <canvas ref={canvasRef} style={canvasStyle} aria-hidden="true" />
      <div style={vignetteStyle} aria-hidden="true" />
    </>
  );
}
