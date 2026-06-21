import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import * as THREE from "three";

// 1. ICON IMPORTS
import {
  SiReact, SiTailwindcss, SiPython, SiJupyter, SiNextdotjs,
  SiTypescript, SiFirebase, SiMongodb, SiJavascript, SiHtml5, SiGit,
  SiGithub, SiNodedotjs, SiPostgresql, SiVercel,
  SiPostman, SiFramer, SiCplusplus, SiDocker,
  SiNumpy,
  SiThreedotjs,
  SiGsap
} from "react-icons/si";

import { DiCss3 } from "react-icons/di";
import { BiCodeBlock, BiNetworkChart } from "react-icons/bi";
import { TbApi } from "react-icons/tb";
import { VscCode } from "react-icons/vsc";
import { FaLaptopCode } from "react-icons/fa";
import { RiReactjsLine } from "react-icons/ri";

// 2. TECH STACK DATASET
// Note: color is now ONLY used for the icon glyph + tiny border accent.
// Badge background/border/text are uniform so brightness reads consistently,
// matching the reference (no badge looks "faded" relative to another).
const techTools = [
  { name: "React", icon: <SiReact />, color: "#61DAFB" },
  { name: "TailwindCSS", icon: <SiTailwindcss />, color: "#38BDF8" },
  { name: "Python", icon: <SiPython />, color: "#4B8BBE" },
  { name: "Jupyter", icon: <SiJupyter />, color: "#F37626" },
  { name: "Zustand", icon: <FaLaptopCode />, color: "#FFFFFF" },
  { name: "OAuth", icon: <FaLaptopCode />, color: "#FFFFFF" },
  { name: "TypeScript", icon: <SiTypescript />, color: "#3B82F6" },
  { name: "Redux", icon: <BiNetworkChart />, color: "#A78BFA" },
  { name: "Axios", icon: <BiCodeBlock />, color: "#818CF8" },
  { name: "Firebase", icon: <SiFirebase />, color: "#FBBF24" },
  { name: "MongoDB", icon: <SiMongodb />, color: "#4ADE80" },
  { name: "NumPy", icon: <SiNumpy />, color: "#2DD4BF" },
  { name: "JavaScript", icon: <SiJavascript />, color: "#FACC15" },
  { name: "HTML5", icon: <SiHtml5 />, color: "#FB923C" },
  { name: "CSS3", icon: <DiCss3 />, color: "#38BDF8" },
  { name: "Git", icon: <SiGit />, color: "#FB7185" },
  { name: "GitHub", icon: <SiGithub />, color: "#E5E7EB" },
  { name: "Node.js", icon: <SiNodedotjs />, color: "#4ADE80" },
  { name: "GSAP", icon: <SiGsap />, color: "#61DAFB" },
  { name: "ThreeJs", icon: <SiThreedotjs />, color: "#38BDF8" },
  { name: "React3Fibre", icon: <RiReactjsLine />, color: "#4B8BBE" },
  { name: "Jupyter", icon: <SiJupyter />, color: "#F37626" },
  { name: "Next.js", icon: <SiNextdotjs />, color: "#FFFFFF" },
  { name: "TypeScript", icon: <SiTypescript />, color: "#3B82F6" },
  { name: "Redux", icon: <BiNetworkChart />, color: "#A78BFA" },
  { name: "Axios", icon: <BiCodeBlock />, color: "#818CF8" },
  { name: "Firebase", icon: <SiFirebase />, color: "#FBBF24" },
  { name: "MongoDB", icon: <SiMongodb />, color: "#4ADE80" },
  // { name: "FastAPI", icon: <TbApi />, color: "#2DD4BF" },
  { name: "JavaScript", icon: <SiJavascript />, color: "#FACC15" },
  { name: "HTML5", icon: <SiHtml5 />, color: "#FB923C" },
  { name: "CSS3", icon: <DiCss3 />, color: "#38BDF8" },
  { name: "Git", icon: <SiGit />, color: "#FB7185" },
  { name: "GitHub", icon: <SiGithub />, color: "#E5E7EB" },
  { name: "Node.js", icon: <SiNodedotjs />, color: "#4ADE80" },
  { name: "JavaScript", icon: <SiJavascript />, color: "#FACC15" },
  { name: "HTML5", icon: <SiHtml5 />, color: "#FB923C" },
  { name: "CSS3", icon: <DiCss3 />, color: "#38BDF8" },
  { name: "Git", icon: <SiGit />, color: "#FB7185" },
  { name: "GitHub", icon: <SiGithub />, color: "#E5E7EB" },
  { name: "Node.js", icon: <SiNodedotjs />, color: "#4ADE80" },
  {
    name: "Express",
    icon: (
      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
        <path d="M432 320H400a16 16 0 00-16 16v112a16 16 0 0016 16h32a16 16 0 0016-16V336a16 16 0 00-16-16zm-112 0h-48a16 16 0 00-16 16v112a16 16 0 0016 16h48a16 16 0 0016-16V336a16 16 0 00-16-16zm-96 32h-32v32h32a16 16 0 0016-16v-16a16 16 0 00-16-16zM112 320H48a16 16 0 00-16 16v112a16 16 0 0016 16h62a16 16 0 0016-16v-48a16 16 0 00-16-16H80v-32h32a16 16 0 0016-16v-16a16 16 0 00-16-16z"/>
      </svg>
    ),
    color: "#E5E7EB"
  },
  // { name: "PostgreSQL", icon: <SiPostgresql />, color: "#60A5FA" },
  { name: "Vercel", icon: <SiVercel />, color: "#E5E7EB" },
  { name: "Postman", icon: <SiPostman />, color: "#FB923C" },
  { name: "Framer Motion", icon: <SiFramer />, color: "#818CF8" },
  // { name: "C++", icon: <SiCplusplus />, color: "#60A5FA" },
  { name: "VS Code", icon: <VscCode />, color: "#38BDF8" },
  // { name: "Docker", icon: <SiDocker />, color: "#38BDF8" },
];

// Solid-sphere occlusion model: a badge on the far hemisphere (relative to the
// CAMERA's current position, which OrbitControls moves freely around the
// scene) is hidden almost immediately past the horizon, not gradually faded
// across the whole depth range. Near-side badges are all rendered at FULL,
// EQUAL brightness (no per-depth fade among visible badges) -- like flat
// icons pasted on a globe that you either see or don't, from wherever you're
// currently looking.
function Badge({ basePosition, tool, groupRef, sphereCenter }) {
  const { camera } = useThree();
  const htmlRef = useRef();

  useFrame(() => {
    if (!groupRef.current || !htmlRef.current) return;

    const world = basePosition.clone().applyMatrix4(groupRef.current.matrixWorld);
    const normal = world.clone().sub(sphereCenter).normalize();
    const toCamera = camera.position.clone().sub(world).normalize();
    const facing = normal.dot(toCamera); // 1 = facing camera dead on, -1 = facing away

    const el = htmlRef.current;
    if (facing < -0.06) {
      el.style.display = "none";
    } else {
      el.style.display = "flex";
      const edgeT = THREE.MathUtils.clamp((facing + 0.06) / 0.22, 0, 1);
      el.style.opacity = THREE.MathUtils.lerp(0, 1, edgeT);
    }
  });

  return (
    <Html
      position={basePosition}
      center
      distanceFactor={6.5}
      zIndexRange={[100, 0]}
      occlude={false}
      className="select-none pointer-events-none"
    >
      <div
        ref={htmlRef}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border whitespace-nowrap"
        style={{
          backgroundColor: `${tool.color}1F`,
          borderColor: `${tool.color}40`,
          boxShadow: "0 2px 10px rgba(0,0,0,0.35)",
          transition: "opacity 0.15s linear",
        }}
      >
        <span
          style={{ color: tool.color }}
          className="text-sm leading-none flex items-center justify-center"
        >
          {tool.icon}
        </span>
        <span
          style={{ color: tool.color }}
          className="text-[11px] font-semibold tracking-wide whitespace-nowrap"
        >
          {tool.name}
        </span>
      </div>
    </Html>
  );
}

// 4. GLOBE WIREFRAME -- subtle, matches reference (thin, low-opacity grid lines)
function CleanGlobeWireframe({ radius }) {
  const lines = useMemo(() => {
    const segments = [];

    const latCount = 11;
    for (let i = 1; i < latCount; i++) {
      const phi = (Math.PI * i) / latCount;
      const ringRadius = radius * Math.sin(phi);
      const y = radius * Math.cos(phi);

      const points = [];
      for (let j = 0; j <= 64; j++) {
        const theta = (Math.PI * 2 * j) / 64;
        points.push(new THREE.Vector3(ringRadius * Math.cos(theta), y, ringRadius * Math.sin(theta)));
      }
      segments.push(new THREE.BufferGeometry().setFromPoints(points));
    }

    const lonCount = 14;
    for (let i = 0; i < lonCount; i++) {
      const theta = (Math.PI * i) / lonCount;
      const points = [];
      for (let j = 0; j <= 64; j++) {
        const phi = (Math.PI * 2 * j) / 64;
        points.push(new THREE.Vector3(radius * Math.sin(phi) * Math.cos(theta), radius * Math.cos(phi), radius * Math.sin(phi) * Math.sin(theta)));
      }
      segments.push(new THREE.BufferGeometry().setFromPoints(points));
    }

    return segments;
  }, [radius]);

  return (
    <group>
      {lines.map((geo, idx) => (
        <lineLoop key={idx} geometry={geo}>
          <lineBasicMaterial color="#1d4e63" transparent opacity={0.3} linewidth={1} />
        </lineLoop>
      ))}
    </group>
  );
}

// 5. CORE FIELD
function GlobeGroup({ isDraggingRef }) {
  const groupRef = useRef();
  const radius = 2.8;
  const sphereCenter = useMemo(() => new THREE.Vector3(0, 0, 0), []);

  const count = techTools.length;
  const basePositions = useMemo(() => {
    const points = [];
    for (let i = 0; i < count; i++) {
      const k = i + 0.5;
      const phi = Math.acos(1 - (2 * k) / count);
      const theta = Math.PI * (1 + Math.sqrt(5)) * k;

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      points.push(new THREE.Vector3(x, y, z));
    }
    return points;
  }, [count, radius]);

  useFrame(() => {
    if (groupRef.current && !isDraggingRef.current) {
      groupRef.current.rotation.y += 0.0018;
    }
  });

  return (
    <group ref={groupRef}>
      <CleanGlobeWireframe radius={radius} />
      {techTools.map((tool, idx) => (
        <Badge
          key={idx}
          basePosition={basePositions[idx]}
          tool={tool}
          groupRef={groupRef}
          sphereCenter={sphereCenter}
          radius={radius}
        />
      ))}
    </group>
  );
}

// 6. VIEWPORT WRAPPER
const TechGlobe = () => {
  const isDraggingRef = useRef(false);

  return (
    <>
    <div className="w-full h-[520px] relative bg-[#05080a] rounded-3xl border border-white/5 overflow-hidden">
      <Canvas camera={{ position: [0, 0, 8.5], fov: 45 }}>
        <ambientLight intensity={0.9} />
        <pointLight position={[10, 10, 10]} intensity={0.6} />

        <GlobeGroup isDraggingRef={isDraggingRef} />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          dampingFactor={0.08}
          rotateSpeed={0.55}
          onStart={() => (isDraggingRef.current = true)}
          onEnd={() => (isDraggingRef.current = false)}
        />
      </Canvas>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none z-0" />

      <div className="absolute bottom-4 left-1/2 mt-4 -translate-x-1/2 text-[10px] tracking-[0.2em] font-semibold text-white/30 uppercase pointer-events-none select-none">
        ⊙ Drag to rotate
      </div>
    </div>
    </>
  );
};

export default TechGlobe;