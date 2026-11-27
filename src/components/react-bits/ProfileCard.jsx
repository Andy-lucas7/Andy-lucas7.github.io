import React, { useRef, useState, useEffect } from 'react';
import './ProfileCard.css';
import { Users, FolderGit2 } from 'lucide-react';

const FALLBACK_REPOS = '20+';
// Contagem de repositórios guardada por sessão: reabrir o modal não refaz a requisição
let reposCache;

export default function ProfileCard({
  avatarUrl = '/avatar.jpg',
  name = 'Lucas Andrey',
  title = 'Full Stack / Data Eng.',
  handle = 'Andy-lucas7',
  contactText = 'Follow +',
  onContactClick
}) {
  const cardRef = useRef(null);
  const frameRef = useRef(0);
  const [reposCount, setReposCount] = useState(reposCache ?? '...');

  useEffect(() => {
    if (reposCache !== undefined) return undefined;
    const controller = new AbortController();
    fetch(`https://api.github.com/users/${handle}`, { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((data) => {
        reposCache = data.public_repos ?? FALLBACK_REPOS;
        setReposCount(reposCache);
      })
      .catch((err) => {
        if (err?.name !== 'AbortError') setReposCount(FALLBACK_REPOS);
      });
    return () => controller.abort();
  }, [handle]);

  useEffect(() => () => cancelAnimationFrame(frameRef.current), []);

  // Tilt 3D: uma leitura de layout + uma escrita de transform por frame, no máximo
  const handlePointerMove = (e) => {
    const { clientX, clientY } = e;
    cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      const card = cardRef.current;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((clientY - rect.top - centerY) / centerY) * -10;
      const rotateY = ((clientX - rect.left - centerX) / centerX) * 10;
      card.style.transition = 'transform 0.1s ease';
      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0)`;
    });
  };

  const handlePointerLeave = () => {
    cancelAnimationFrame(frameRef.current);
    const card = cardRef.current;
    if (!card) return;
    card.style.transition = 'transform 0.5s ease';
    card.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(0)';
  };

  return (
    <div
      className="clean-profile-wrapper"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{ perspective: '1000px' }}
    >
      <div
        ref={cardRef}
        className="clean-profile-card"
        style={{ transform: 'rotateX(0deg) rotateY(0deg)', transition: 'transform 0.5s ease' }}
      >
        <div className="cpc-image-container">
          <img src={avatarUrl} alt={name} className="cpc-image" decoding="async" />
        </div>

        <div className="cpc-content">
          <div className="cpc-header">
            <h3>{name}</h3>
            <img src="/natura-logo.jpg" alt="Natura" className="cpc-company-logo" width="32" height="32" decoding="async" />
          </div>

          <p className="cpc-bio">
            {title} focado na construção de sistemas modernos e escaláveis. Atualmente trabalhando na Natura.
          </p>

          <div className="cpc-footer">
            <div className="cpc-stats">
              <div className="cpc-stat" title="Conexões no LinkedIn">
                <Users size={16} /> +250
              </div>
              <div className="cpc-stat" title="Repositórios Públicos no GitHub">
                <FolderGit2 size={16} /> {reposCount}
              </div>
            </div>

            <button type="button" className="cpc-button" onClick={onContactClick}>
              {contactText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
