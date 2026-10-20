import React, { useRef, useState, useEffect } from 'react';
import './ProfileCard.css';
import { Users, FolderGit2 } from 'lucide-react';

export default function ProfileCard({
  avatarUrl = '/avatar.jpg',
  name = 'Lucas Andrey',
  title = 'Full Stack / Data Eng.',
  handle = 'Andy-lucas7',
  contactText = 'Follow +',
  onContactClick
}) {
  const cardRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [reposCount, setReposCount] = useState('...');

  useEffect(() => {
    fetch(`https://api.github.com/users/${handle}`)
      .then(res => res.json())
      .then(data => {
        if (data && data.public_repos !== undefined) {
          setReposCount(data.public_repos);
        } else {
          setReposCount('20+');
        }
      })
      .catch(() => setReposCount('20+'));
  }, [handle]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const clientX = e.clientX;
    const clientY = e.clientY;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    card.style.transition = 'transform 0.1s ease';
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transition = 'transform 0.5s ease';
    cardRef.current.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(0)';
  };

  return (
    <div
      className="clean-profile-wrapper"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: '1000px' }}
    >
      <div
        ref={cardRef}
        className="clean-profile-card"
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transition: rotation.x === 0 && rotation.y === 0 ? 'transform 0.5s ease' : 'transform 0.1s ease'
        }}
      >
        <div className="cpc-image-container">
          <img src={avatarUrl} alt={name} className="cpc-image" />
        </div>

        <div className="cpc-content">
          <div className="cpc-header">
            <h3>{name}</h3>
            {/* Logo Natura Uploaded */}
            <img 
              src="/natura-logo.jpg" 
              alt="Natura Logo" 
              style={{ width: '32px', height: '32px', borderRadius: '6px', marginLeft: '6px', objectFit: 'cover' }} 
            />
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

            <button className="cpc-button" onClick={onContactClick}>
              {contactText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
