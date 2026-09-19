import React, { useState } from 'react';
import { Sliders, Sparkles, Zap } from 'lucide-react';
import FluidGlass from '../react-bits/FluidGlass';
import GlassSurface from '../react-bits/GlassSurface';
import FluidGlassButton from '../react-bits/FluidGlassButton';
import SpotlightCard from '../react-bits/SpotlightCard';

/**
 * FluidPlayground - Showcase Oficial do Componente <FluidGlass /> do React Bits
 * Executa a cena 3D original com ScrollControls, fotografias 3D, tipografia e
 * a lente/barra refrativa de vidro com MeshTransmissionMaterial na GPU.
 */
export default function FluidPlayground() {
  const [glassMode, setGlassMode] = useState('lens'); // 'lens' | 'bar' | 'cube'
  const [clickCount, setClickCount] = useState(0);

  return (
    <section id="playground" style={{ padding: '6rem 0', position: 'relative' }}>
      <div className="container">

        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-cyan)', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>
            <Sliders size={16} /> Showcase Oficial React Bits
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#fff', marginBottom: '1rem' }}>
            &lt;FluidGlass /&gt; 3D Engine Original
          </h2>
          <p style={{ maxWidth: '640px', margin: '0 auto', color: 'var(--text-secondary)' }}>
            O componente oficial de vidro físico 3D do React Bits com Three.js, modelos GLB e <code>MeshTransmissionMaterial</code>.
          </p>
        </div>

        <SpotlightCard
          spotlightColor="rgba(0, 240, 255, 0.2)"
          borderColor="rgba(0, 240, 255, 0.5)"
          style={{ maxWidth: '1000px', margin: '0 auto' }}
        >
          <div style={{ padding: '1.25rem' }}>
            
            {/* Controles de Modo 3D (Lens, Bar, Cube) */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
              {[
                { id: 'lens', label: '3D Lens (Lente Seguidora)' },
                { id: 'bar', label: '3D Bar (Pílula de Navegação)' },
                { id: 'cube', label: '3D Cube (Cubo Refrativo)' }
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => setGlassMode(m.id)}
                  style={{
                    background: glassMode === m.id ? 'rgba(255, 255, 255, 0.18)' : 'rgba(255, 255, 255, 0.04)',
                    border: `1px solid ${glassMode === m.id ? 'rgba(0, 240, 255, 0.6)' : 'rgba(255, 255, 255, 0.12)'}`,
                    color: glassMode === m.id ? '#ffffff' : 'var(--text-secondary)',
                    padding: '0.55rem 1.25rem',
                    borderRadius: '9999px',
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.88rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    boxShadow: glassMode === m.id ? '0 0 20px rgba(0, 240, 255, 0.25)' : 'none',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {m.label}
                </button>
              ))}
            </div>

            {/* Container Oficial do <FluidGlass /> com exatamente 600px de altura */}
            <div 
              style={{ 
                height: '600px', 
                position: 'relative', 
                borderRadius: '20px', 
                overflow: 'hidden', 
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.9)'
              }}
            >
              <FluidGlass 
                mode={glassMode}
                lensProps={{
                  scale: 0.25,
                  ior: 1.15,
                  thickness: 5,
                  chromaticAberration: 0.1,
                  anisotropy: 0.01
                }}
                barProps={{
                  navItems: [
                    { label: 'Início', link: '#hero' },
                    { label: 'Projetos', link: '#projects' },
                    { label: 'Tecnologias', link: '#tech' },
                    { label: 'Contato', link: '#contact' }
                  ],
                  thickness: 10,
                  ior: 1.15,
                  chromaticAberration: 0.1,
                  anisotropy: 0.01
                }}
                cubeProps={{
                  scale: 0.15,
                  ior: 1.15,
                  thickness: 5,
                  chromaticAberration: 0.1,
                  anisotropy: 0.01
                }}
                backgroundColor="#120F17"
                textColor="#ffffff"
              />
            </div>

            <div style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.82rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              ✦ Role o cursor dentro da janela acima para ativar o scroll 3D e passe o mouse para mover a lente de vidro óptico
            </div>

            {/* Demonstração Oficial do Componente <GlassSurface /> do React Bits */}
            <div style={{ textAlign: 'center', paddingTop: '2.5rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)', marginTop: '2.5rem' }}>
              <div style={{ fontSize: '0.9rem', color: 'var(--accent-cyan)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>
                Novo: &lt;GlassSurface /&gt; React Bits (SVG Displacement)
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', maxWidth: '580px', margin: '0 auto 1.75rem' }}>
                Refração óptica avançada diretamente no DOM através de displacement maps SVG, separação de canais de cor e <code>backdrop-filter</code>.
              </p>

              <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
                {/* Basic usage */}
                <GlassSurface 
                  width={300} 
                  height={130}
                  borderRadius={24}
                  className="my-custom-class"
                >
                  <div style={{ textAlign: 'center' }}>
                    <h3 style={{ fontSize: '1.1rem', color: '#fff', margin: 0, fontWeight: 700 }}>Glass Surface Basic</h3>
                    <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.7)', margin: '0.35rem 0 0' }}>Refração limpa e suave</p>
                  </div>
                </GlassSurface>

                {/* Custom displacement effects */}
                <GlassSurface
                  width={320}
                  height={130}
                  borderRadius={50}
                  borderWidth={0.07}
                  brightness={50}
                  opacity={1}
                  blur={12}
                  displace={1.9}
                  backgroundOpacity={0.1}
                  saturation={1}
                  distortionScale={-180}
                  redOffset={0}
                  greenOffset={10}
                  blueOffset={20}
                >
                  <div style={{ textAlign: 'center' }}>
                    <span style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff' }}>Advanced Glass Distortion</span>
                    <p style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)', margin: '0.35rem 0 0' }}>Aberração cromática líquida R/G/B</p>
                  </div>
                </GlassSurface>
              </div>

              {/* Demonstração dos Botões com GlassSurface */}
              <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
                Botões construídos com &lt;GlassSurface /&gt;:
              </div>
              <div style={{ display: 'flex', gap: '1.25rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <FluidGlassButton
                  variant="primary"
                  icon={Sparkles}
                  onClick={() => setClickCount(c => c + 1)}
                >
                  GlassSurface Primário ({clickCount} cliques)
                </FluidGlassButton>

                <FluidGlassButton
                  variant="secondary"
                  icon={Zap}
                >
                  GlassSurface Secundário
                </FluidGlassButton>
              </div>
            </div>

          </div>
        </SpotlightCard>

      </div>
    </section>
  );
}
