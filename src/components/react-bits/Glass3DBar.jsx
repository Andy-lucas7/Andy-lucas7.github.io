/* eslint-disable react/no-unknown-property */
import React, { useRef, useState, useEffect, Suspense, memo } from 'react';
import { Canvas, createPortal, useFrame, useThree } from '@react-three/fiber';
import { useFBO, useGLTF, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { easing } from 'maath';

// Configura o decodificador Draco local
useGLTF.setDecoderPath('/draco/');

/**
 * Cena 3D interna da barra de navegação com Three.js & MeshTransmissionMaterial
 * Utiliza o modelo original bar.glb do React Bits e FBO para refração real
 */
const BarMesh3D = memo(function BarMesh3D({ isHovered, mouseNorm }) {
  const meshRef = useRef();
  const lightGroupRef = useRef();
  const buffer = useFBO();
  const { nodes } = useGLTF('/assets/3d/bar.glb');
  const { viewport: vp, camera } = useThree();
  const [scene] = useState(() => new THREE.Scene());
  const geoWidthRef = useRef(1);

  useEffect(() => {
    const geo = nodes.Cube?.geometry;
    if (geo) {
      geo.computeBoundingBox();
      geoWidthRef.current = (geo.boundingBox.max.x - geo.boundingBox.min.x) || 1;
    }
  }, [nodes]);

  useFrame((state, delta) => {
    const { gl } = state;

    // Inclinação sutil em 3D que acompanha o mouse
    if (meshRef.current) {
      const targetRotX = Math.PI / 2 + (isHovered ? -(mouseNorm.y - 0.5) * 0.22 : 0);
      const targetRotY = isHovered ? (mouseNorm.x - 0.5) * 0.28 : 0;
      easing.damp(meshRef.current.rotation, 'x', targetRotX, 0.12, delta);
      easing.damp(meshRef.current.rotation, 'y', targetRotY, 0.12, delta);

      // Auto-escala para preencher a largura do viewport
      const desiredScale = (vp.width * 0.95) / geoWidthRef.current;
      meshRef.current.scale.set(desiredScale, 0.28, desiredScale * 0.45);
    }

    // Ponto de luz dinâmico na cena de refração (FBO)
    if (lightGroupRef.current) {
      const lx = (mouseNorm.x - 0.5) * vp.width * 0.85;
      const ly = -(mouseNorm.y - 0.5) * vp.height * 0.85;
      easing.damp3(lightGroupRef.current.position, [lx, ly, -0.6], 0.15, delta);
    }

    // Renderiza a cena de luzes no FBO para ser refratada pelo MeshTransmissionMaterial
    gl.setClearColor(0x000000, 0);
    gl.setRenderTarget(buffer);
    gl.render(scene, camera);
    gl.setRenderTarget(null);
    gl.setClearColor(0x000000, 0);
  });

  return (
    <>
      {createPortal(
        <>
          <ambientLight intensity={1.8} />

          {/* Luz especular que acompanha o cursor dentro do vidro */}
          <group ref={lightGroupRef} position={[0, 0, -0.6]}>
            <mesh scale={[0.8, 0.35, 0.1]}>
              <planeGeometry />
              <meshBasicMaterial color="#ffffff" transparent opacity={0.75} toneMapped={false} />
            </mesh>
            <pointLight color="#00f0ff" intensity={4} distance={6} />
            <pointLight color="#a855f7" intensity={3} distance={6} />
          </group>

          {/* Linhas de refração cilíndrica de alta intensidade */}
          <mesh position={[0, 0.25, -1]} scale={[vp.width * 1.8, 0.08, 1]}>
            <planeGeometry />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.85} toneMapped={false} />
          </mesh>
          <mesh position={[0, -0.25, -1]} scale={[vp.width * 1.8, 0.08, 1]}>
            <planeGeometry />
            <meshBasicMaterial color="#00f0ff" transparent opacity={0.55} toneMapped={false} />
          </mesh>
        </>,
        scene
      )}

      {/* Modelo 3D Oficial bar.glb com MeshTransmissionMaterial do React Bits */}
      <mesh
        ref={meshRef}
        geometry={nodes.Cube?.geometry}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <MeshTransmissionMaterial
          buffer={buffer.texture}
          ior={1.15}
          thickness={2}
          transmission={1}
          roughness={0}
          chromaticAberration={0.05}
          anisotropy={0.01}
          distortion={0.12}
          distortionScale={0.15}
          temporalDistortion={0.04}
          color="#ffffff"
          attenuationColor="#ffffff"
          attenuationDistance={0.5}
        />
      </mesh>
    </>
  );
});

/**
 * Glass3DBar - Componente que encapsula o Canvas Three.js transparente
 * para ser injetado como background refrativo da Navbar flutuante.
 */
export default function Glass3DBar({
  isHovered = false,
  mousePos = { x: 50, y: 50 },
  style = {}
}) {
  // Normaliza mousePos para coordenadas de 0 a 1
  const mouseNorm = {
    x: typeof mousePos.x === 'number' ? mousePos.x / 100 : 0.5,
    y: typeof mousePos.y === 'number' ? mousePos.y / 100 : 0.5
  };

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        borderRadius: '9999px',
        zIndex: 1,
        ...style
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 20 }}
        gl={{ alpha: true, antialias: true, toneMapping: THREE.NoToneMapping }}
        style={{ width: '100%', height: '100%', display: 'block', background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <BarMesh3D isHovered={isHovered} mouseNorm={mouseNorm} />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload('/assets/3d/bar.glb');
