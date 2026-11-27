import { useEffect, useLayoutEffect, useRef, useId } from 'react';
import './GlassSurface.css';

/**
 * Modo de renderização do vidro, decidido uma vez por sessão (é propriedade do
 * navegador/aparelho, não da instância):
 * - 'svg': refração real com feDisplacementMap (desktop Chromium)
 * - 'lite': aparelhos de toque com Chromium. O filtro SVG refaz 3 deslocamentos
 *   + blends por frame sobre o fundo animado e derruba o celular para ~20 fps;
 *   aqui o vidro usa as mesmas sombras e fundo, com refração leve em CSS na GPU
 * - 'fallback': Safari/Firefox, que não suportam filtro SVG em backdrop-filter
 */
let glassMode;
function getGlassMode() {
  if (glassMode !== undefined) return glassMode;
  if (typeof window === 'undefined' || typeof document === 'undefined') return 'fallback';
  const ua = navigator.userAgent;
  const isWebkit = /Safari/.test(ua) && !/Chrome/.test(ua);
  const isFirefox = /Firefox/.test(ua);
  const probe = document.createElement('div');
  probe.style.backdropFilter = 'url(#glass-probe)';
  if (isWebkit || isFirefox || probe.style.backdropFilter === '') {
    glassMode = 'fallback';
  } else if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
    glassMode = 'lite';
  } else {
    glassMode = 'svg';
  }
  return glassMode;
}

const GlassSurface = ({
  children,
  width = 200,
  height = 80,
  borderRadius = 50,
  borderWidth = 0.07,
  brightness = 50,
  opacity = 1,
  blur = 12,
  displace = 1.9,
  backgroundOpacity = 0.1,
  saturation = 1,
  distortionScale = -180,
  redOffset = 0,
  greenOffset = 10,
  blueOffset = 20,
  xChannel = 'R',
  yChannel = 'G',
  mixBlendMode = 'difference',
  className = '',
  style = {}
}) => {
  const uniqueId = useId().replace(/:/g, '-');
  const filterId = `glass-filter-${uniqueId}`;
  const redGradId = `red-grad-${uniqueId}`;
  const blueGradId = `blue-grad-${uniqueId}`;

  const mode = getGlassMode();
  const svgSupported = mode === 'svg';

  const containerRef = useRef(null);
  const feImageRef = useRef(null);
  const redChannelRef = useRef(null);
  const greenChannelRef = useRef(null);
  const blueChannelRef = useRef(null);
  const gaussianBlurRef = useRef(null);

  const lastSizeRef = useRef({ w: 0, h: 0 });

  const generateDisplacementMap = (actualWidth, actualHeight) => {
    const edgeSize = Math.min(actualWidth, actualHeight) * (borderWidth * 0.5);
    const svgContent = `
      <svg viewBox="0 0 ${actualWidth} ${actualHeight}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="${redGradId}" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stop-color="#0000"/>
            <stop offset="100%" stop-color="red"/>
          </linearGradient>
          <linearGradient id="${blueGradId}" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#0000"/>
            <stop offset="100%" stop-color="blue"/>
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="${actualWidth}" height="${actualHeight}" fill="black"></rect>
        <rect x="0" y="0" width="${actualWidth}" height="${actualHeight}" rx="${borderRadius}" fill="url(#${redGradId})" />
        <rect x="0" y="0" width="${actualWidth}" height="${actualHeight}" rx="${borderRadius}" fill="url(#${blueGradId})" style="mix-blend-mode: ${mixBlendMode}" />
        <rect x="${edgeSize}" y="${edgeSize}" width="${actualWidth - edgeSize * 2}" height="${actualHeight - edgeSize * 2}" rx="${borderRadius}" fill="hsl(0 0% ${brightness}% / ${opacity})" style="filter:blur(${blur}px)" />
      </svg>
    `;

    return `data:image/svg+xml,${encodeURIComponent(svgContent)}`;
  };

  const updateDisplacementMap = (force = false) => {
    const el = containerRef.current;
    if (!el || !feImageRef.current) return;
    // offsetWidth/Height ignoram transforms (ex.: dock animando com translate/scale),
    // evitando regenerar o mapa durante animações.
    const w = el.offsetWidth || 400;
    const h = el.offsetHeight || 200;
    const last = lastSizeRef.current;
    if (!force && last.w === w && last.h === h) return;
    lastSizeRef.current = { w, h };
    feImageRef.current.setAttribute('href', generateDisplacementMap(w, h));
  };

  // Parâmetros do filtro: aplicados de forma síncrona antes da pintura
  useLayoutEffect(() => {
    if (!svgSupported) return;
    [
      { ref: redChannelRef, offset: redOffset },
      { ref: greenChannelRef, offset: greenOffset },
      { ref: blueChannelRef, offset: blueOffset }
    ].forEach(({ ref, offset }) => {
      if (ref.current) {
        ref.current.setAttribute('scale', (distortionScale + offset).toString());
        ref.current.setAttribute('xChannelSelector', xChannel);
        ref.current.setAttribute('yChannelSelector', yChannel);
      }
    });
    gaussianBlurRef.current?.setAttribute('stdDeviation', displace.toString());
    updateDisplacementMap(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [svgSupported, borderRadius, borderWidth, brightness, opacity, blur, displace, distortionScale, redOffset, greenOffset, blueOffset, xChannel, yChannel, mixBlendMode]);

  // Mapa de deslocamento só é regenerado quando o tamanho real muda
  useEffect(() => {
    if (!svgSupported || !containerRef.current) return;
    const resizeObserver = new ResizeObserver(() => updateDisplacementMap());
    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [svgSupported]);

  const containerStyle = {
    ...style,
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
    borderRadius: `${borderRadius}px`,
    '--glass-frost': backgroundOpacity,
    // saturate(1) é identidade: omitido para não custar um passe extra de GPU por frame
    '--glass-backdrop': saturation === 1 ? `url(#${filterId})` : `url(#${filterId}) saturate(${saturation})`
  };

  return (
    <div
      ref={containerRef}
      className={`glass-surface glass-surface--${mode} ${className}`}
      style={containerStyle}
    >
      {svgSupported && (
        <svg className="glass-surface__filter" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <defs>
            <filter id={filterId} colorInterpolationFilters="sRGB" x="0%" y="0%" width="100%" height="100%">
              <feImage ref={feImageRef} x="0" y="0" width="100%" height="100%" preserveAspectRatio="none" result="map" />

              <feDisplacementMap ref={redChannelRef} in="SourceGraphic" in2="map" result="dispRed" />
              <feColorMatrix
                in="dispRed"
                type="matrix"
                values="1 0 0 0 0
                        0 0 0 0 0
                        0 0 0 0 0
                        0 0 0 1 0"
                result="red"
              />

              <feDisplacementMap ref={greenChannelRef} in="SourceGraphic" in2="map" result="dispGreen" />
              <feColorMatrix
                in="dispGreen"
                type="matrix"
                values="0 0 0 0 0
                        0 1 0 0 0
                        0 0 0 0 0
                        0 0 0 1 0"
                result="green"
              />

              <feDisplacementMap ref={blueChannelRef} in="SourceGraphic" in2="map" result="dispBlue" />
              <feColorMatrix
                in="dispBlue"
                type="matrix"
                values="0 0 0 0 0
                        0 0 0 0 0
                        0 0 1 0 0
                        0 0 0 1 0"
                result="blue"
              />

              <feBlend in="red" in2="green" mode="screen" result="rg" />
              <feBlend in="rg" in2="blue" mode="screen" result="output" />
              <feGaussianBlur ref={gaussianBlurRef} in="output" stdDeviation="0.7" />
            </filter>
          </defs>
        </svg>
      )}

      <div className="glass-surface__content">{children}</div>
    </div>
  );
};

export default GlassSurface;
