import React from 'react';
import GlassSurface from './GlassSurface';

/**
 * FluidGlassButton - Botão que utiliza estritamente o componente <GlassSurface /> do React Bits
 */
export default function FluidGlassButton({
  children,
  onClick,
  href,
  icon: Icon,
  className = '',
  style = {},
  ...props
}) {
  const Component = href ? 'a' : 'button';

  return (
    <Component
      href={href}
      onClick={onClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        textDecoration: 'none',
        outline: 'none',
        border: 'none',
        background: 'transparent',
        padding: 0,
        cursor: 'pointer',
        userSelect: 'none',
        ...style
      }}
      className={className}
      {...props}
    >
      <GlassSurface
        width="auto"
        height={50}
        borderRadius={50}
      >
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.65rem',
            color: '#ffffff',
            fontFamily: 'var(--font-display)',
            fontWeight: 600,
            fontSize: '0.95rem',
            letterSpacing: '-0.01em',
            padding: '0 1rem',
            pointerEvents: 'none'
          }}
        >
          {Icon && <Icon size={18} />}
          <span>{children}</span>
        </span>
      </GlassSurface>
    </Component>
  );
}
