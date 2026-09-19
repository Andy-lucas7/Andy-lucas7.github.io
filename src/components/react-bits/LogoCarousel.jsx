import React from 'react';
import './LogoCarousel.css';
import { 
  SiGit, 
  SiPython, 
  SiDatabricks, 
  SiReact, 
  SiNodedotjs, 
  SiDocker, 
  SiTypescript, 
  SiPostgresql, 
  SiNextdotjs 
} from 'react-icons/si';
import { FaAws } from 'react-icons/fa';

const logos = [
  { icon: SiGit, name: 'Git' },
  { icon: SiPython, name: 'Python' },
  { icon: SiDatabricks, name: 'Databricks' },
  { icon: SiReact, name: 'React' },
  { icon: SiNodedotjs, name: 'Node.js' },
  { icon: SiDocker, name: 'Docker' },
  { icon: FaAws, name: 'AWS' },
  { icon: SiTypescript, name: 'TypeScript' },
  { icon: SiPostgresql, name: 'PostgreSQL' },
  { icon: SiNextdotjs, name: 'Next.js' }
];

export default function LogoCarousel() {
  return (
    <div className="logo-carousel-container">
      <div className="logo-carousel-track">
        {/* Renderizado 3 vezes para garantir a fluidez da rolagem infinita */}
        {[...logos, ...logos, ...logos].map((logo, index) => {
          const IconComponent = logo.icon;
          return (
            <div key={index} className="logo-carousel-item" style={{ color: '#ffffff' }} title={logo.name}>
              <IconComponent size={56} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
