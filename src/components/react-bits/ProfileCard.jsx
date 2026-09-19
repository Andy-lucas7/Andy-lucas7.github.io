import React, { useRef, useState, useEffect } from 'react';
import './ProfileCard.css';
import { Users, FolderGit2 } from 'lucide-react';

export default function ProfileCard({
  avatarUrl = '/avatar.jpg',
  name = 'Lucas Andrey',
  title = 'Full Stack / Data Eng.',
  handle = 'Andy-lucas7',
  status = 'trabalhando na Natura',
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
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
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
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#00b1deff" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L14.8 4.6L18.5 4.1L19.8 7.6L23 9.4L21.5 12.8L23 16.2L19.8 18L18.5 21.5L14.8 21L12 23.6L9.2 21L5.5 21.5L4.2 18L1 16.2L2.5 12.8L1 9.4L4.2 7.6L5.5 4.1L9.2 4.6L12 2Z" fill="#00f0ff" />
              <path d="M10.5 16.5L6.5 12.5L7.9 11.1L10.5 13.7L16.1 8.1L17.5 9.5L10.5 16.5Z" fill="white" />
            </svg>
          </div>

          <p className="cpc-bio">
            {title} focado na construção de sistemas modernos e escaláveis. Atualmente {status}.
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
