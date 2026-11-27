import { useEffect, useState } from 'react';

/**
 * Observa se um elemento está na viewport via IntersectionObserver.
 * Usado para pausar animações contínuas fora da tela e disparar revelações.
 *
 * @param {React.RefObject<Element>} ref
 * @param {{ rootMargin?: string, threshold?: number, once?: boolean }} options
 *   once: deixa de observar após a primeira interseção (revelações de entrada).
 */
export function useInView(ref, { rootMargin = '0px', threshold = 0, once = false } = {}) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (once && entry.isIntersecting) observer.disconnect();
      },
      { rootMargin, threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, rootMargin, threshold, once]);

  return inView;
}
