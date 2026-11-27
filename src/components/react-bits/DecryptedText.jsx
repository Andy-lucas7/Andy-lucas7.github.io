import React, { useState, useEffect, useRef } from 'react';

/**
 * DecryptedText - React Bits Component
 * Efeito de texto cibernético estilo descriptografia / matriz,
 * onde os caracteres oscilam entre glifos aleatórios até se fixarem.
 */
export default function DecryptedText({
  text,
  speed = 40,
  maxIterations = 12,
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*<>{}',
  triggerOnHover = false,
  className = '',
  style = {}
}) {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef(null);

  const startDecryption = () => {
    let iteration = 0;
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayText(() => {
        return text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iteration / 2) {
              return text[index];
            }
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join('');
      });

      if (iteration >= text.length * 2) {
        clearInterval(intervalRef.current);
        setDisplayText(text);
      }

      iteration += 1;
    }, speed);
  };

  useEffect(() => {
    startDecryption();
    return () => clearInterval(intervalRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  const handleMouseEnter = () => {
    if (triggerOnHover) startDecryption();
  };

  return (
    <span
      onMouseEnter={handleMouseEnter}
      className={className}
      aria-label={text}
      style={{
        fontFamily: 'var(--font-mono)',
        letterSpacing: '0.02em',
        display: 'inline-block',
        ...style
      }}
    >
      {displayText}
    </span>
  );
}
