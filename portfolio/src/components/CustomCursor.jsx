import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [trailBubbles, setTrailBubbles] = useState([]);
  const nextId = useRef(0);

  // Core Mouse Vectors
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const mouseSpeedX = useMotionValue(0);
  const mouseSpeedY = useMotionValue(0);

  // Springs Physics
  const springConfigOuter = { damping: 20, stiffness: 140, mass: 0.6 };
  const springConfigGlow = { damping: 28, stiffness: 60, mass: 1.4 };

  const outerX = useSpring(mouseX, springConfigOuter);
  const outerY = useSpring(mouseY, springConfigOuter);
  const glowX = useSpring(mouseX, springConfigGlow);
  const glowY = useSpring(mouseY, springConfigGlow);

  const speed = useTransform(() => {
    return Math.sqrt(Math.pow(mouseSpeedX.get(), 2) + Math.pow(mouseSpeedY.get(), 2));
  });

  const scaleX = useTransform(speed, [0, 2000], [1, 1.25]);
  const scaleY = useTransform(speed, [0, 2000], [1, 0.75]);
  const rotate = useTransform(() => {
    return Math.atan2(mouseSpeedY.get(), mouseSpeedX.get()) * (180 / Math.PI);
  });

  useEffect(() => {
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    let lastX = 0;
    let lastY = 0;
    let lastTime = performance.now();
    let spawnThrottle = 0; // Performance shield to prevent loop overloading

    const handleMouseMove = (e) => {
      const currentTime = performance.now();
      const dt = currentTime - lastTime || 1;

      const sX = (e.clientX - lastX) / (dt / 1000);
      const sY = (e.clientY - lastY) / (dt / 1000);
      mouseSpeedX.set(sX);
      mouseSpeedY.set(sY);

      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      // --- BUBBLE GENERATION LOGIC ---
      const currentSpeed = Math.sqrt(sX * sX + sY * sY);
      spawnThrottle++;

      // Bubble tabhi spawn honge jab mouse actual me move karega — kam frequency, kam bubbles
      if (currentSpeed > 80 && spawnThrottle % 7 === 0) {
        const id = nextId.current++;

        // Random drift direction coordinates for the burst displacement
        const angle = Math.random() * Math.PI * 2;
        const driftDistance = Math.random() * 35 + 15;
        const targetX = Math.cos(angle) * driftDistance;
        const targetY = Math.sin(angle) * driftDistance;

        // Bigger, more visible bubble sizes (was 6-20px, now 14-42px)
        const bubbleSize = Math.random() * 28 + 14;

        const newBubble = {
          id,
          x: e.clientX,
          y: e.clientY,
          targetX,
          targetY,
          size: bubbleSize,
        };

        setTrailBubbles((prev) => [...prev.slice(-12), newBubble]); // High-speed tracking cleanup cache

        // Safe auto-destruction after the bubble bursts (slightly longer so bigger bubbles are visible)
        setTimeout(() => {
          setTrailBubbles((prev) => prev.filter((b) => b.id !== id));
        }, 700);
      }

      lastX = e.clientX;
      lastY = e.clientY;
      lastTime = currentTime;

      if (!isVisible) setIsVisible(true);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* 1. DYNAMIC TRAIL BURST EMITTER LAYERS — now bigger & much more visible */}
      {trailBubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className="fixed top-0 left-0 rounded-full pointer-events-none"
          initial={{
            x: bubble.x,
            y: bubble.y,
            scale: 0.4,
            opacity: 0.55,
            backdropFilter: "blur(1px)",
          }}
          animate={{
            x: bubble.x + bubble.targetX,
            y: bubble.y + bubble.targetY,
            // Phase 1: Grow & Floating, Phase 2: Instant scale expansion + burst fade out
            scale: [0.4, 1.1, 1.4, 0],
            opacity: [0.55, 0.6, 0.35, 0],
            backdropFilter: ["blur(1px)", "blur(2px)", "blur(0px)", "blur(0px)"],
          }}
          transition={{
            duration: 0.7,
            ease: [0.215, 0.61, 0.355, 1], // Smooth organic liquid friction curve
          }}
          style={{
            width: bubble.size,
            height: bubble.size,
            backgroundColor: "rgba(255, 255, 255, 0.04)",
            border: "1.5px solid rgba(0, 217, 255, 0.28)",
            boxShadow:
              "inset 0px 2px 3px rgba(255, 255, 255, 0.3), inset 0px -2px 4px rgba(0, 217, 255, 0.1), 0px 0px 10px rgba(0, 217, 255, 0.22)",
            translateX: "-50%",
            translateY: "-50%",
            zIndex: 999995, // Embedded inside the viewport but behind the main glass shell
          }}
        />
      ))}

      {/* 2. BACKGROUND AMBIENT GLOW — toned down so it doesn't dominate the cursor */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none"
        style={{
          width: "150px",
          height: "150px",
          background: "radial-gradient(circle, rgba(0, 217, 255, 0.08) 0%, transparent 70%)",
          filter: "blur(8px)",
          zIndex: 99997,
          x: glowX,
          y: glowY,
          translateX: "-50%",
          translateY: "-50%",
          willChange: "transform",
        }}
      />

      {/* 3. MAIN JELLY GLASS BUBBLE — enlarged & made more defined like the reference */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none"
        style={{
          width: "52px",
          height: "52px",
          backdropFilter: "blur(4px) saturate(160%)",
          WebkitBackdropFilter: "blur(4px) saturate(160%)",
          backgroundColor: "rgba(255, 255, 255, 0.04)",
          border: "1.5px solid rgba(255, 255, 255, 0.25)",
          boxShadow:
            "inset 0px 3px 4px rgba(255, 255, 255, 0.35), inset 0px -3px 6px rgba(0, 217, 255, 0.15), 0px 0px 28px rgba(0, 217, 255, 0.25)",
          zIndex: 99998,
          x: outerX,
          y: outerY,
          translateX: "-50%",
          translateY: "-50%",
          scaleX,
          scaleY,
          rotate,
          willChange: "transform",
        }}
      />

      {/* 4. TARGET BOUNDARY RING — sized up to sit nicely inside the bigger bubble */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none border border-cyan-400/30"
        style={{
          width: "21px",
          height: "21px",
          backgroundColor: "transparent",
          boxShadow: "0px 0px 8px rgba(0, 217, 255, 0.2)",
          zIndex: 999998,
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
          willChange: "transform",
        }}
      />

      {/* 5. NEON CYAN CORE DOT — slightly bigger and brighter to anchor the effect */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none"
        style={{
          width: "6px",
          height: "6px",
          backgroundColor: "rgba(0, 217, 255, 0.95)",
          boxShadow: "0px 0px 12px rgba(0, 217, 255, 0.85)",
          zIndex: 999999,
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
          willChange: "transform",
        }}
      />
    </>
  );
}