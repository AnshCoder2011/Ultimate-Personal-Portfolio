import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useState } from "react";

// 1. DYNAMIC DISTORTION ENGINE (Particles layer ke andar animation)
function GalaxyParticles({ isHovered }) {
  const ref = useRef();
  const { mouse, viewport } = useThree();

  const count = 1200; 
  const branches = 4; 
  const radiusMax = 3.2; 

  // Store original positions taaki hover hatne par exact configuration wapas aaye
  const [basePositions, positions, colors] = useMemo(() => {
    const basePos = new Float32Array(count * 3);
    const posArr = new Float32Array(count * 3);
    const colorArr = new Float32Array(count * 3);

    const colorInside = new THREE.Color("#00f0ff"); 
    const colorOutside = new THREE.Color("#007c99"); 

    for (let i = 0; i < count; i++) {
      const radius = Math.random() * radiusMax;
      const branchAngle = ((i % branches) / branches) * Math.PI * 2;
      const spinAngle = radius * 1.8;

      const randomX = Math.pow(Math.random(), 4) * (Math.random() < 0.5 ? 1 : -1) * 0.1 * radius;
      const randomY = Math.pow(Math.random(), 4) * (Math.random() < 0.5 ? 1 : -1) * 0.1 * radius;

      const angle = branchAngle + spinAngle;

      const x = Math.cos(angle) * radius + randomX;
      const y = Math.sin(angle) * radius + randomY;

      basePos[i * 3] = x;
      basePos[i * 3 + 1] = y;
      basePos[i * 3 + 2] = 0;

      posArr[i * 3] = x;
      posArr[i * 3 + 1] = y;
      posArr[i * 3 + 2] = 0;

      const mixedColor = colorInside.clone();
      mixedColor.lerp(colorOutside, radius / radiusMax);

      colorArr[i * 3] = mixedColor.r;
      colorArr[i * 3 + 1] = mixedColor.g;
      colorArr[i * 3 + 2] = mixedColor.b;
    }

    return [basePos, posArr, colorArr];
  }, []);

  // Targets for tracking smooth animation state
  const hoverIntensity = useRef(0);

  useFrame((state) => {
    if (!ref.current) return;

    const time = state.clock.getElapsedTime();
    const currentPositions = ref.current.geometry.attributes.position.array;

    // Smoothly blend distortion intensity (0 lock to 1 max on hover)
    hoverIntensity.current += ((isHovered ? 1 : 0) - hoverIntensity.current) * 0.1;

    // Base spin rotation
    ref.current.rotation.z = time * 0.025;

    // Normalizing screen space coordinates for mouse mapping
    const mX = (mouse.x * viewport.width) / 2;
    const mY = (mouse.y * viewport.height) / 2;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Base target coordinates
      const bx = basePositions[i3];
      const by = basePositions[i3 + 1];

      // Calculate dynamic liquid waves offset using Sine/Cosine waves
      // Yeh parameters random static noise ke mukable true water fluidity produce karte hain
      const waveOffset = Math.sin(bx * 2.5 + time * 4.0) * Math.cos(by * 2.5 + time * 4.0) * 0.18;
      
      // Calculate cursor distortion vector push
      const distToMouse = Math.sqrt(Math.pow(bx - mX, 2) + Math.pow(by - mY, 2));
      let mousePush = 0;
      if (distToMouse < 1.5) {
        // Creates a fluid ripple bubble around the cursor pointer
        mousePush = Math.sin((1.5 - distToMouse) * Math.PI) * 0.12;
      }

      // Final position mix calculation: original placement + interactive animated distortion layer
      currentPositions[i3] = bx + (waveOffset + mousePush) * hoverIntensity.current;
      currentPositions[i3 + 1] = by + (waveOffset + mousePush) * hoverIntensity.current;
    }

    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <Points ref={ref} positions={positions} colors={colors} stride={3}>
      <PointMaterial
        transparent
        size={0.015} 
        sizeAttenuation={true}
        depthWrite={false}
        vertexColors
        blending={THREE.AdditiveBlending} 
      />
    </Points>
  );
}

// 2. MAIN EXPORT COMPONENT
export default function Galaxy() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative w-full h-full flex items-center justify-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* SOLID LOCKED MINIMAL CENTER CYAN GLOW */}
      <div 
        className="absolute rounded-full pointer-events-none"
        style={{
          left: "50%",
          top: "50%",
          width: "60px",
          height: "60px",
          background: "radial-gradient(circle, rgba(0,240,255,0.6) 0%, rgba(0,240,255,0.15) 50%, rgba(0,0,0,0) 70%)",
          filter: "blur(12px)",
          zIndex: 1,
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* RENDER VIEWPORT LAYER */}
      <div className="w-full h-full z-10">
        <Canvas
          camera={{
            position: [0, 0, 5], 
            fov: 60,
          }}
          onCreated={({ gl }) => {
            gl.clearColor();
          }}
        >
          <GalaxyParticles isHovered={isHovered} />
        </Canvas>
      </div>
    </div>
  );
}