import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassSurface from '../react-bits/GlassSurface';
import ProfileCard from '../react-bits/ProfileCard';
import { portfolioData } from '../../data/portfolioData';

const SPRING = { type: 'spring', stiffness: 300, damping: 30 };

/**
 * Pílula fixa com o nome que se expande (shared layout do Framer Motion) no
 * ProfileCard em modal. Estado isolado aqui: abrir/fechar não re-renderiza a página.
 */
export default function ProfileLauncher() {
  const { personal } = portfolioData;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <div className="profile-pill-fixed">
        <AnimatePresence>
          {!open && (
            <motion.button
              type="button"
              layoutId="profile-widget"
              className="profile-pill"
              onClick={() => setOpen(true)}
              transition={SPRING}
              aria-haspopup="dialog"
              aria-label={`Abrir perfil de ${personal.name}`}
            >
              <GlassSurface width="auto" height={44} borderRadius={50} style={{ padding: '0 1rem' }}>
                <span className="profile-pill-label">
                  <img src="/avatar.jpg" alt="" className="profile-pill-avatar" width="22" height="22" decoding="async" />
                  <span>{personal.name}</span>
                </span>
              </GlassSurface>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="profile-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              layoutId="profile-widget"
              className="profile-modal"
              role="dialog"
              aria-modal="true"
              aria-label={`Perfil de ${personal.name}`}
              onClick={(e) => e.stopPropagation()}
              transition={SPRING}
            >
              <motion.button
                type="button"
                className="profile-modal-close"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setOpen(false)}
                aria-label="Fechar perfil"
              >
                &times;
              </motion.button>
              <ProfileCard
                name={personal.name}
                title="Full Stack / Data Eng."
                handle="Andy-lucas7"
                contactText="Falar Comigo"
                avatarUrl="/avatar.jpg"
                onContactClick={() => {
                  setOpen(false);
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
