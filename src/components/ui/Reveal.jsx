import React, { useRef } from 'react';
import { useInView } from '../../hooks/useInView';

const REVEAL_OPTIONS = { rootMargin: '0px 0px -10% 0px', once: true };

/**
 * Revelação de entrada ao rolar: anima apenas `opacity` e `translate` (composição
 * pura na GPU, sem layout/paint) e deixa de observar após a primeira aparição.
 *
 * Em elementos com backdrop-filter, use o hook no próprio elemento (nunca um
 * wrapper): um ancestral com opacity < 1 vira "backdrop root" e o vidro deixaria
 * de enxergar o fundo durante a animação.
 */
export function useRevealClass(ref, enabled = true) {
  const visible = useInView(ref, REVEAL_OPTIONS);
  if (!enabled) return '';
  return visible ? 'reveal is-visible' : 'reveal';
}

export default function Reveal({ as: Tag = 'div', delay = 0, className = '', style, children, ...props }) {
  const ref = useRef(null);
  const revealClass = useRevealClass(ref);

  return (
    <Tag
      ref={ref}
      className={`${revealClass} ${className}`.trim()}
      style={delay ? { ...style, '--reveal-delay': `${delay}ms` } : style}
      {...props}
    >
      {children}
    </Tag>
  );
}
