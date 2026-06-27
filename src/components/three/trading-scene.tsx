'use client';

import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function Candlestick({ position, color, scale = 1 }: { position: [number, number, number]; color: string; scale?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const startY = position[1];

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const float = Math.sin(clock.elapsedTime * 0.5 + position[0]) * 0.2;
      meshRef.current.position.y = startY + float;
      meshRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.3 + position[0]) * 0.05;
      meshRef.current.rotation.z = Math.cos(clock.elapsedTime * 0.4 + position[2]) * 0.05;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <boxGeometry args={[0.08, 0.6, 0.08]} />
      <meshPhysicalMaterial
        color={color}
        metalness={0.8}
        roughness={0.2}
        transparent
        opacity={0.6}
      />
    </mesh>
  );
}

function FloatingGlobe() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.15) * 0.3;
      meshRef.current.rotation.y += 0.003;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={meshRef} position={[2, 0.5, -3]} scale={0.8}>
        <icosahedronGeometry args={[1, 2]} />
        <MeshDistortMaterial
          color="#EF4444"
          transparent
          opacity={0.08}
          wireframe
          distort={0.3}
          speed={2}
        />
      </mesh>
    </Float>
  );
}

function RingParticles() {
  const count = 200;
  const meshRef = useRef<THREE.Points>(null);

  const { positions, sizes } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const siz = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const radius = 1.5 + Math.random() * 2.5;
      const height = (Math.random() - 0.5) * 3;
      pos[i * 3] = Math.cos(theta) * radius;
      pos[i * 3 + 1] = height;
      pos[i * 3 + 2] = Math.sin(theta) * radius;
      siz[i] = 0.02 + Math.random() * 0.04;
    }
    return { positions: pos, sizes: siz };
  }, [count]);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const attr = meshRef.current.geometry.attributes.position;
      if (attr) {
        const array = attr.array as Float32Array;
        for (let i = 0; i < count; i++) {
          const theta = Math.atan2(array[i * 3 + 2], array[i * 3]);
          const radius = Math.sqrt(array[i * 3] ** 2 + array[i * 3 + 2] ** 2);
          const newTheta = theta + 0.002;
          const floatY = Math.sin(clock.elapsedTime * 0.2 + i * 0.1) * 0.2;
          array[i * 3] = Math.cos(newTheta) * radius;
          array[i * 3 + 2] = Math.sin(newTheta) * radius;
          array[i * 3 + 1] += (floatY - array[i * 3 + 1]) * 0.01;
        }
        attr.needsUpdate = true;
      }
    }
  });

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    return geo;
  }, [positions, sizes]);

  return (
    <points ref={meshRef} geometry={geometry}>
      <pointsMaterial
        size={0.03}
        color="#EF4444"
        transparent
        opacity={0.25}
        sizeAttenuation
      />
    </points>
  );
}

function DynamicLighting() {
  const light1Ref = useRef<THREE.PointLight>(null);
  const light2Ref = useRef<THREE.PointLight>(null);

  useFrame(({ clock }) => {
    if (light1Ref.current) {
      light1Ref.current.position.x = Math.sin(clock.elapsedTime * 0.3) * 4;
      light1Ref.current.position.z = Math.cos(clock.elapsedTime * 0.4) * 4;
      light1Ref.current.intensity = 0.4 + Math.sin(clock.elapsedTime * 0.7) * 0.2;
    }
    if (light2Ref.current) {
      light2Ref.current.position.x = Math.sin(clock.elapsedTime * 0.5 + 1) * 3;
      light2Ref.current.position.z = Math.cos(clock.elapsedTime * 0.3 + 1) * 3;
      light2Ref.current.intensity = 0.3 + Math.cos(clock.elapsedTime * 0.5) * 0.15;
    }
  });

  return (
    <>
      <pointLight ref={light1Ref} position={[3, 2, 3]} intensity={0.5} color="#EF4444" />
      <pointLight ref={light2Ref} position={[-3, -1, 3]} intensity={0.3} color="#FFFFFF" />
    </>
  );
}

function TradeParticles() {
  const count = 120;
  const meshRef = useRef<THREE.Points>(null);
  const speeds = useMemo(() => Float32Array.from({ length: count }, () => 0.3 + Math.random() * 0.7), [count]);
  const offsets = useMemo(() => Float32Array.from({ length: count }, () => Math.random() * Math.PI * 2), [count]);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 1] = -2 + Math.random() * 0.5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 5 - 1;
    }
    return pos;
  }, [count]);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const attr = meshRef.current.geometry.attributes.position;
      if (attr) {
        const array = attr.array as Float32Array;
        for (let i = 0; i < count; i++) {
          array[i * 3 + 1] += speeds[i] * 0.008;
          array[i * 3] += Math.sin(clock.elapsedTime * 0.3 + offsets[i]) * 0.003;
          if (array[i * 3 + 1] > 3) {
            array[i * 3 + 1] = -2;
            array[i * 3] = (Math.random() - 0.5) * 8;
          }
        }
        attr.needsUpdate = true;
      }
    }
  });

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [positions]);

  return (
    <points ref={meshRef} geometry={geometry}>
      <pointsMaterial
        size={0.04}
        color="#EF4444"
        transparent
        opacity={0.25}
        sizeAttenuation
      />
    </points>
  );
}

function OrderBook3D() {
  const groupRef = useRef<THREE.Group>(null);
  const bidMeshes = useRef<(THREE.Mesh | null)[]>([]);
  const askMeshes = useRef<(THREE.Mesh | null)[]>([]);

  const barCount = 14;
  const barWidth = 0.1;
  const barDepth = 0.06;
  const spacing = 0.16;

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    for (let i = 0; i < barCount; i++) {
      const bidBase = 0.8 - i * 0.05;
      const askBase = 0.8 - i * 0.05;
      const bidNoise = Math.sin(t * 1.2 + i * 0.9) * 0.15 + Math.sin(t * 2.3 + i * 1.7) * 0.08;
      const askNoise = Math.sin(t * 1.5 + i * 1.1 + 1.2) * 0.15 + Math.sin(t * 2.7 + i * 1.3) * 0.08;
      const bidH = Math.max(0.1, bidBase + bidNoise);
      const askH = Math.max(0.1, askBase + askNoise);

      const bm = bidMeshes.current[i];
      if (bm) {
        bm.scale.y = bidH;
        bm.position.y = bidH / 2;
      }
      const am = askMeshes.current[i];
      if (am) {
        am.scale.y = askH;
        am.position.y = askH / 2;
      }
    }
  });

  return (
    <group ref={groupRef} position={[-1.3, -1.3, -0.5]}>
      {Array.from({ length: barCount }).map((_, i) => {
        const xPos = (i - barCount / 2 + 0.5) * spacing;
        const initialH = 0.3;
        return (
          <group key={`bar-${i}`}>
            <mesh
              position={[xPos, initialH / 2, 0.03]}
              ref={(el) => { bidMeshes.current[i] = el; }}
            >
              <boxGeometry args={[barWidth, 1, barDepth]} />
              <meshPhysicalMaterial
                color="#22C55E"
                transparent
                opacity={0.35}
                metalness={0.3}
                roughness={0.4}
              />
            </mesh>
            <mesh
              position={[xPos, initialH / 2, -0.03]}
              ref={(el) => { askMeshes.current[i] = el; }}
            >
              <boxGeometry args={[barWidth, 1, barDepth]} />
              <meshPhysicalMaterial
                color="#EF4444"
                transparent
                opacity={0.35}
                metalness={0.3}
                roughness={0.4}
              />
            </mesh>
          </group>
        );
      })}

      <mesh position={[0, -0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[barCount * spacing, 0.15]} />
        <meshBasicMaterial color="#EF4444" transparent opacity={0.1} />
      </mesh>
    </group>
  );
}

function FloatingLabels() {
  const groupRef = useRef<THREE.Group>(null);
  const spriteRefs = useRef<(THREE.Sprite | null)[]>([]);

  const labelInfo = useMemo(() => [
    { text: '+32.4% APR', pos: [-2.8, 1.8, -1.5] as [number, number, number], color: '#22C55E' },
    { text: '5ms EXEC', pos: [3, 1.2, -2] as [number, number, number], color: '#EF4444' },
    { text: '99.9% UPTIME', pos: [3.5, -0.5, -2.5] as [number, number, number], color: '#22C55E' },
    { text: '500Cr AUM', pos: [-3.2, -1, -2] as [number, number, number], color: '#F59E0B' },
  ], []);

  const textures = useMemo(() => {
    return labelInfo.map((info) => {
      const c = document.createElement('canvas');
      c.width = 256;
      c.height = 64;
      const ctx = c.getContext('2d');
      if (!ctx) return new THREE.CanvasTexture(c);

      ctx.clearRect(0, 0, 256, 64);

      ctx.globalAlpha = 0.5;
      ctx.fillStyle = '#050816';
      ctx.beginPath();
      ctx.moveTo(12, 8);
      ctx.lineTo(244, 8);
      ctx.lineTo(244, 56);
      ctx.lineTo(12, 56);
      ctx.closePath();
      ctx.fill();
      ctx.globalAlpha = 1;

      ctx.strokeStyle = info.color + '50';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(12, 8);
      ctx.lineTo(244, 8);
      ctx.lineTo(244, 56);
      ctx.lineTo(12, 56);
      ctx.closePath();
      ctx.stroke();

      ctx.fillStyle = info.color;
      ctx.font = 'bold 22px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(info.text, 128, 32);

      const tex = new THREE.CanvasTexture(c);
      tex.needsUpdate = true;
      return tex;
    });
  }, [labelInfo]);

  useFrame(({ clock }) => {
    spriteRefs.current.forEach((sprite, i) => {
      if (sprite) {
        const base = labelInfo[i].pos;
        sprite.position.x = base[0] + Math.sin(clock.elapsedTime * 0.2 + i * 3) * 0.1;
        sprite.position.y = base[1] + Math.sin(clock.elapsedTime * 0.4 + i * 2) * 0.15;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {textures.map((tex, i) => (
        <sprite
          key={i}
          position={labelInfo[i].pos}
          ref={(el) => { spriteRefs.current[i] = el; }}
          scale={[1.2, 0.3, 1]}
        >
          <spriteMaterial map={tex} transparent opacity={0.7} depthTest={false} />
        </sprite>
      ))}
    </group>
  );
}

function Scene({ scrollY }: { scrollY: { current: number } }) {
  const sceneRef = useRef<THREE.Group>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouse, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  useFrame(({ camera }) => {
    if (sceneRef.current) {
      const targetRotY = mouseRef.current.x * 0.03;
      const targetRotX = -mouseRef.current.y * 0.02;
      sceneRef.current.rotation.y += (targetRotY - sceneRef.current.rotation.y) * 0.03;
      sceneRef.current.rotation.x += (targetRotX - sceneRef.current.rotation.x) * 0.03;

      const scrollOffset = scrollY.current * 3;
      const targetCamZ = 5 - scrollOffset * 0.3;
      const targetCamY = 0.5 + scrollOffset * 0.15;
      camera.position.z += (Math.max(3.5, targetCamZ) - camera.position.z) * 0.03;
      camera.position.y += (targetCamY - camera.position.y) * 0.03;
      camera.lookAt(0, 0, 0);
    }
  });

  return (
    <group ref={sceneRef}>
      <ambientLight intensity={0.3} />
      <DynamicLighting />
      <directionalLight position={[2, 5, 3]} intensity={0.2} />

      <TradeParticles />
      <RingParticles />
      <FloatingGlobe />
      <OrderBook3D />
      <FloatingLabels />

      {candlesticks.map((c, i) => (
        <Candlestick key={i} {...c} />
      ))}
    </group>
  );
}

const candlesticks = [
  { position: [-3, -0.5, -2] as [number, number, number], color: '#22C55E', scale: 1 },
  { position: [-1.5, 0, -1.5] as [number, number, number], color: '#EF4444', scale: 0.8 },
  { position: [0, 0.3, -2.5] as [number, number, number], color: '#22C55E', scale: 1.2 },
  { position: [1.5, -0.2, -1.8] as [number, number, number], color: '#22C55E', scale: 0.9 },
  { position: [3, 0.1, -2.2] as [number, number, number], color: '#EF4444', scale: 1.1 },
  { position: [-2, -0.8, -3.5] as [number, number, number], color: '#22C55E', scale: 0.7 },
  { position: [2.5, 0.4, -3] as [number, number, number], color: '#22C55E', scale: 1 },
  { position: [-3.5, -0.3, -1] as [number, number, number], color: '#EF4444', scale: 0.9 },
];

export function TradingScene({ scrollY }: { scrollY: { current: number } }) {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none opacity-50 lg:opacity-70">
      <Canvas
        camera={{ position: [0, 0.5, 5], fov: 55 }}
        dpr={[1, 1]} // Clamp to 1x for performance; TradingScene is already deferred to desktop only
        gl={{ antialias: false, alpha: true }}
      >
        <Scene scrollY={scrollY} />
      </Canvas>
    </div>
  );
}
