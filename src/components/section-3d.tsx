'use client';

import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function FloatingCubes({ count = 6 }: { count?: number }) {
  const meshRef = useRef<THREE.Group>(null);
  const data = useMemo(() => {
    return Array.from({ length: count }, () => ({
      pos: [(Math.random() - 0.5) * 8, (Math.random() - 0.5) * 4, (Math.random() - 0.5) * 4 - 1] as [number, number, number],
      rotSpeed: 0.2 + Math.random() * 0.5,
      floatSpeed: 0.3 + Math.random() * 0.4,
      floatAmp: 0.1 + Math.random() * 0.2,
      color: ['#EF4444', '#FFFFFF', '#F87171', '#DC2626'][Math.floor(Math.random() * 4)],
      scale: 0.08 + Math.random() * 0.12,
    }));
  }, [count]);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.children.forEach((child, i) => {
        const d = data[i];
        const t = clock.elapsedTime;
        child.position.y = d.pos[1] + Math.sin(t * d.floatSpeed + i) * d.floatAmp;
        child.rotation.x = t * d.rotSpeed * 0.5 + i;
        child.rotation.y = t * d.rotSpeed + i;
      });
    }
  });

  return (
    <group ref={meshRef}>
      {data.map((d, i) => (
        <mesh key={i} position={d.pos} scale={d.scale}>
          <boxGeometry args={[0.5, 0.5, 0.5]} />
          <meshPhysicalMaterial
            color={d.color}
            transparent
            opacity={0.25}
            metalness={0.5}
            roughness={0.3}
            wireframe={i % 2 === 0}
          />
        </mesh>
      ))}
    </group>
  );
}

function FloatingGeometrics() {
  const groupRef = useRef<THREE.Group>(null);

  const shapes = useMemo(() => {
    const types = ['box', 'sphere', 'icosahedron'];
    return Array.from({ length: 5 }, (_, i) => ({
      type: types[i % 3],
      pos: [(Math.random() - 0.5) * 10, (Math.random() - 0.5) * 5, (Math.random() - 0.5) * 5 - 2] as [number, number, number],
      color: ['#EF4444', '#FFFFFF', '#F87171', '#DC2626'][i],
      scale: 0.15 + Math.random() * 0.2,
      speed: 0.2 + Math.random() * 0.4,
    }));
  }, []);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        const s = shapes[i];
        const t = clock.elapsedTime * s.speed;
        child.rotation.x = t + i;
        child.rotation.y = t * 1.5 + i * 2;
        child.position.y = s.pos[1] + Math.sin(t * 0.8 + i * 1.5) * 0.2;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {shapes.map((s, i) => {
        let geom: React.ReactNode;
        if (s.type === 'box') geom = <boxGeometry args={[0.4, 0.4, 0.4]} />;
        else if (s.type === 'sphere') geom = <sphereGeometry args={[0.25, 8, 8]} />;
        else geom = <icosahedronGeometry args={[0.3, 0]} />;
        return (
          <mesh key={i} position={s.pos} scale={s.scale}>
            {geom}
            <meshPhysicalMaterial
              color={s.color}
              transparent
              opacity={0.15}
              metalness={0.3}
              roughness={0.6}
              wireframe={i % 2 === 0}
            />
          </mesh>
        );
      })}
    </group>
  );
}

function Scene({ variant = 'cubes' }: { variant?: 'cubes' | 'geometrics' }) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 3, 5]} intensity={0.3} color="#EF4444" />
      {variant === 'cubes' ? <FloatingCubes /> : <FloatingGeometrics />}
    </>
  );
}

interface Section3DProps {
  variant?: 'cubes' | 'geometrics';
  className?: string;
}

export function Section3D({ variant = 'cubes', className = '' }: Section3DProps) {
  return (
    <div className={`absolute inset-0 z-0 pointer-events-none opacity-40 ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 1.2]}
        gl={{ antialias: false, alpha: true }}
        style={{ width: '100%', height: '100%' }}
      >
        <Scene variant={variant} />
      </Canvas>
    </div>
  );
}
