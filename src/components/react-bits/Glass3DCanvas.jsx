/* eslint-disable react/no-unknown-property */
import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';

/**
 * 3D Glass Mesh rendered with Three.js & MeshTransmissionMaterial
 * Gera refração física real, aberração cromática e reflexos de lente na GPU.
 */
function GlassCapsule({ isHovered, isPressed, mousePos, variant = 'primary' }) {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    
    // Inclinação sutil em direção ao cursor (física 3D)
    const targetRotX = isHovered ? -(mousePos.y - 0.5) * 0.4 : 0;
    const targetRotY = isHovered ? (mousePos.x - 0.5) * 0.5 : 0;
    
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetRotX, delta * 8);
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotY, delta * 8);
    
    // Escala tátil
    const targetScale = isPressed ? 0.94 : isHovered ? 1.04 : 1.0;
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 12);
  });

  const primaryColor = variant === 'primary' ? '#00f0ff' : '#a855f7';

  return (
    <>
      <ambientLight intensity={1.8} />
      <directionalLight position={[4, 6, 8]} intensity={3.5} />
      {/* Luzes internas pontuais para alimentar a refração cromática */}
      <pointLight position={[-2, 1, -1.5]} color={primaryColor} intensity={2.5} distance={6} />
      <pointLight position={[2, -1, -1.5]} color="#ffffff" intensity={2} distance={6} />
      <pointLight position={[0, 2, 2]} color="#ffffff" intensity={1.5} distance={5} />

      {/* Geometria 3D de Pílula / Lente Horizontal */}
      <mesh ref={meshRef} rotation={[0, 0, Math.PI / 2]}>
        <capsuleGeometry args={[0.55, 2.8, 24, 48]} />
        <MeshTransmissionMaterial
          ior={1.25}
          thickness={4}
          roughness={0.02}
          transmission={1}
          chromaticAberration={0.14}
          anisotropy={0.08}
          distortion={0.25}
          distortionScale={0.3}
          temporalDistortion={0.1}
          color="#ffffff"
          attenuationColor="#ffffff"
          attenuationDistance={0.5}
        />
      </mesh>
    </>
  );
}

export default function Glass3DCanvas({
  isHovered = false,
  isPressed = false,
  mousePos = { x: 0.5, y: 0.5 },
  variant = 'primary',
  style = {}
}) {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        borderRadius: '9999px',
        ...style
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 40 }}
        gl={{ alpha: true, antialias: true, toneMapping: THREE.NoToneMapping }}
        style={{ width: '100%', height: '100%', display: 'block', background: 'transparent' }}
      >
        <GlassCapsule 
          isHovered={isHovered} 
          isPressed={isPressed} 
          mousePos={mousePos} 
          variant={variant} 
        />
      </Canvas>
    </div>
  );
}
