import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import LiquidGlassButton from "../components/LiquidGlassButton";
import About from "./About";
import Experience from "./Experience";
import ReachOut from "./ReachOut";
import Projects from "./Projects";
import {
  FaReact,
  FaNodeJs,
  FaDocker,
  FaGitAlt,
  FaBolt,
  FaFileAlt,
  FaDownload,
} from "react-icons/fa";

import Galaxy from "../components/Galaxy";

import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiMongodb,
  SiVite,
  SiPython,
} from "react-icons/si";
import Footer from "./Footer";

const Home = ({setAnalyticsOpen}) => {
  const words = [
    "DEVELOPER",
    "PROGRAMMER",
    "CREATOR",
    "BUILDER",
    "DESIGNER",
    "STUDENT",
  ];
  
  const orbitIcons = [
    { icon: FaReact, name: "React", color: "#61DAFB" },
    { icon: SiNextdotjs, name: "Next.js", color: "#FFFFFF" },
    { icon: SiTypescript, name: "TypeScript", color: "#3178C6" },
    { icon: SiPython, name: "Python", color: "#FFD43B" },
    { icon: FaNodeJs, name: "Node.js", color: "#68A063" },
    { icon: SiTailwindcss, name: "Tailwind", color: "#38BDF8" },
    { icon: FaDocker, name: "Docker", color: "#2496ED" },
    { icon: SiVite, name: "Vite", color: "#A855F7" },
    { icon: SiMongodb, name: "MongoDB", color: "#13AA52" },
    { icon: FaGitAlt, name: "Git", color: "#F1502F" },
  ];

  const positions = [
    { angle: -90, radius: 265 }, // top
  
    { angle: -38, radius: 310 },
    { angle: -10, radius: 355 },
  
    { angle: 15, radius: 380 },
    { angle: 49, radius: 360 },
  
    { angle: 90, radius: 330 }, // bottom
  
    { angle: 125, radius: 360 },
    { angle: 155, radius: 370 },
  
    { angle: 195, radius: 350 },
    { angle: 225, radius: 310 },
  ];
  

  const [currentWord, setCurrentWord] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 2500);
  
    return () => clearInterval(interval);
  }, []);

  return (
    <>
    <section className="relative min-h-screen overflow-hidden bg-[#0a0a0a] flex items-center justify-center">


{/* Galaxy */}
<div
  className="
    absolute
    left-1/2
    top-1/2
    -translate-x-1/2
    -translate-y-1/2
    w-[650px]
    h-[650px]
    pointer-events-none
    z-0
  "
>
  <Galaxy />
</div>


      {/* Orbit Rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">

        <div className="absolute w-[280px] h-[280px] rounded-full border border-white/10" />

        <div className="absolute w-[500px] h-[500px] rounded-full border border-white/10" />

        <div className="absolute w-[720px] h-[720px] rounded-full border border-white/10" />

        <div className="absolute w-[940px] h-[940px] rounded-full border border-white/10" />

      </div>

      {/* Floating Icons Placeholder */}
      {/* Orbit Icons */}
      {orbitIcons.map((tech, i) => {
  const TechIcon = tech.icon;

  const { angle, radius } = positions[i];

  const x = Math.cos((angle * Math.PI) / 180) * radius;
  const y = Math.sin((angle * Math.PI) / 180) * radius;

  return (
    <motion.div
      key={i}
      initial={{ x, y }}
      animate={{
        x,
        y: [y, y - 10, y],
      }}
      transition={{
        duration: 4 + (i % 3),
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="
        absolute
        left-1/2
        top-1/2
        -translate-x-1/2
        -translate-y-1/2
        z-20
      "
    >
      <div className="flex flex-col items-center">

        <div
          className="
            w-12
            h-12
            rounded-xl
            border
            bg-white/5
            backdrop-blur-md
            flex
            items-center
            justify-center
          "
          style={{
            borderColor: `${tech.color}40`,
          }}
        >
          <TechIcon
            size={24}
            color={tech.color}
        />
        </div>

        <span
          className="
            mt-2
            text-[10px]
            font-light
            tracking-[0.18em]
            uppercase
            whitespace-nowrap
          "
          style={{
            color: tech.color,
          }}
        >
          {tech.name}
        </span>

      </div>
    </motion.div>
  );
})}

{/* Hero Content */}
<div className="relative z-30 text-center px-6 max-w-6xl mx-auto">

  {/* Top Label */}
  <motion.p
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    className="
      text-white/35
      tracking-[0.35em]
      uppercase
      text-sm
      md:text-lg
      mt-4
      mb-4
      font-light
    "
  >
    HELLO! I'M
  </motion.p>

  {/* Name */}
  <motion.h1
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1 }}
  style={{
    fontSize: "64px",
    fontWeight: "700",
    lineHeight: "0.95",
    letterSpacing: "-4px",
    color: "#ffffff",
    fontFamily: "Comfortaa, sans-serif",
  }}
>
  Ansh Sharma
</motion.h1>

  {/* Subtitle */}
  <motion.p
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.3, duration: 0.8 }}
    className="
      mt-3
      md:text-3xl
      text-white/45
      font-light
    "
  >
   <span className="text-xl font-semibold opacity-80"> A passionate{" "}</span>
    <span className="text-[#00d9ff] text-xl pl-1 font-semibold opacity-80">
      Full-Stack
    </span>{" "}
    <span className="text-xl opacity-80 font-semibold">Developer</span>
  </motion.p>

  {/* Massive Gradient Word */}
  <div className="mt-4 h-[140px] flex justify-center items-center">
  <AnimatePresence mode="wait">
  <motion.h2
  key={words[currentWord]}
  initial={{
    opacity: 0,
    y: 40,
    filter: "blur(12px)",
  }}
  animate={{
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
  }}
  exit={{
    opacity: 0,
    y: -40,
    filter: "blur(12px)",
  }}
  transition={{
    duration: 0.7,
  }}
  className="
    font-bold 
    select-none 
    text-[42px] 
    sm:text-[90px] 
    md:text-[90px] 
    lg:text-[120px]
    leading-[1]
    tracking-[-1px] 
    sm:tracking-[-2px] 
    md:tracking-[-3px] 
    lg:tracking-[-4px]
  "
  style={{
    background:
      "linear-gradient(90deg,#f0b429 0%,#b8d96c 35%,#79d8b6 65%,#35d9ff 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  }}
>
  {words[currentWord]}
</motion.h2>
  </AnimatePresence>
</div>

  {/* Bottom Description */}
  <motion.p
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.8, duration: 1 }}
    className="
      mt-6
      max-w-2xl
      mx-auto
      text-white/40
      text-base
      md:text-lg
      leading-relaxed
    "
  >
    Building intelligent systems and modern web
    experiences through <span className="text-white opacity-55">full-stack development.</span>
  </motion.p>

  {/* Action Buttons — liquid glass pills */}
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 1.1, duration: 0.8 }}
    className="mt-8 flex flex-wrap items-center justify-center gap-4"
  >
    <LiquidGlassButton
      color="#ff7a30"
      icon={<FaBolt />}
      label="Lounge"
      badge={1}
      onClick={() => console.log("Lounge clicked")}
    />
    <LiquidGlassButton
      color="#00d9ff"
      icon={<FaFileAlt />}
      label="Resume & CV"
      onClick={() => window.open("/Resume.pdf", "_blank")}
    />
    <LiquidGlassButton
      color="#34d399"
      icon={<FaDownload />}
      label="Get Source"
      onClick={() => window.open("https://github.com/AnshCoder2011", "_blank")}
    />
  </motion.div>

</div>

    </section>
    <Projects />
    <About />
    <Experience />
    <ReachOut/> 
    <Footer setAnalyticsOpen={setAnalyticsOpen}/>
    </>
  );
};

export default Home;