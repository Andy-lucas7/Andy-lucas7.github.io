import { useEffect, useState } from 'react';

/**
 * Seção ativa da página via IntersectionObserver: uma linha de detecção a 40% da
 * altura da viewport. Substitui o listener de scroll + leitura de offsetTop, que
 * forçava layout e re-renderizava a aplicação inteira a cada troca de seção.
 */
export function useActiveSection(ids, initial = ids[0]) {
  const [active, setActive] = useState(initial);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: '-40% 0px -59% 0px', threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);

  return active;
}
