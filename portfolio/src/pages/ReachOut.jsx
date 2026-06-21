import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaLightbulb,
  FaClipboardList,
  FaBrain,
  FaCode,
  FaSearch,
  FaFlask,
  FaBook,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import LiquidGlassButton from "../components/LiquidGlassButton";

const steps = [
  { icon: <FaLightbulb />, label: "Idea", color: "#f59e0b" },
  { icon: <FaClipboardList />, label: "Plan", color: "#fb923c" },
  { icon: <FaBrain />, label: "AI Help", color: "#a78bfa" },
  { icon: <FaCode />, label: "Code", color: "#00d9ff" },
  { icon: <FaSearch />, label: "Review", color: "#ec4899" },
  { icon: <FaFlask />, label: "Test", color: "#f43f5e" },
  { icon: <FaBook />, label: "Learn", color: "#9ca3af" },
];

const ReachOut = () => {
  const [activeStep, setActiveStep] = useState(3);

  return (
    <section className="relative bg-[#03050a] py-32 px-6 overflow-hidden min-h-screen flex flex-col justify-center">
      {/* PREMIUM BACKGROUND GLOWS */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            backgroundColor: steps[activeStep].color,
            x: (activeStep - 3) * 50, // Dynamics shifting based on selection
          }}
          transition={{ type: "spring", stiffness: 50, damping: 25 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[140px] opacity-[0.08] mix-blend-screen"
        />
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* TITLE SECTION */}
      <div className="max-w-5xl w-full mx-auto mb-16 relative z-10">
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-white/40 tracking-[0.4em] uppercase text-xs font-medium mb-4"
        >
          Skills · Workflow · Identity
        </motion.p>

        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-white text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-gradient bg-gradient-to-b from-white to-white/60"
        >
          Reach Out
        </motion.h2>
      </div>

      {/* CORE BENTO CARD */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 60 }}
        className="max-w-5xl w-full mx-auto relative z-10"
      >
        <div className="relative rounded-3xl border border-white/[0.07] bg-[#090d16]/40 backdrop-blur-2xl p-8 md:p-12 shadow-2xl shadow-black/50 overflow-hidden group">
          {/* Subtle Card Shine Overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.01] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

          {/* WORKFLOW HEADER */}
          <div className="flex items-center justify-between mb-14">
            <p className="text-white/40 text-xs font-semibold tracking-[0.2em] uppercase">
              Workflow - Click the boxes you want
            </p>
            <span 
              className="text-xs font-mono px-3 py-1 rounded-full border border-white/5 bg-white/5 text-white/80 transition-all duration-300"
              style={{ color: steps[activeStep].color, borderColor: steps[activeStep].color + "30" }}
            >
              0{activeStep + 1} / 0{steps.length} — {steps[activeStep].label}
            </span>
          </div>

          {/* WORKFLOW LINE + STEPS CONTAINER */}
          <div className="relative my-16 py-4">
            
            {/* PROGRESS TRACK LINE */}
            <div className="hidden md:block absolute top-[37px] left-6 right-6 h-[2px] bg-white/[0.04] rounded-full overflow-hidden">
              {/* Dynamic filling colored bar */}
              <motion.div 
                className="h-full bg-gradient-to-r from-transparent"
                animate={{ 
                  width: `${(activeStep / (steps.length - 1)) * 100}%`,
                  backgroundImage: `linear-gradient(90deg, ${steps[0].color}, ${steps[activeStep].color})`
                }}
                transition={{ type: "spring", stiffness: 80, damping: 20 }}
              />
            </div>

            {/* INTERACTIVE NODES */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-2 relative z-10">
              {steps.map((step, i) => {
                const isSelected = i === activeStep;
                return (
                  <button
                    key={i}
                    onClick={() => setActiveStep(i)}
                    className="flex md:flex-col items-center gap-4 md:gap-0 text-left md:text-center cursor-pointer group relative outline-none focus:none w-full md:w-auto"
                  >
                    {/* ICON BUBBLE WRAPPER */}
                    <div className="relative flex items-center justify-center w-14 h-14 rounded-2xl transition-all duration-300">
                      
                      {/* Shared Layout Ring Component (CRAZY FLUID TRANSITION EFFECT) */}
                      {isSelected && (
                        <motion.div
                          layoutId="activeGlowRing"
                          className="absolute inset-0 rounded-2xl mix-blend-screen opacity-100"
                          style={{
                            boxShadow: `0 0 25px 2px ${step.color}40`,
                            border: `2px solid ${step.color}`,
                            background: `${step.color}12`
                          }}
                          transition={{ type: "spring", stiffness: 140, damping: 18 }}
                        />
                      )}

                      {/* Default Unselected Border/State */}
                      {!isSelected && (
                        <div className="absolute inset-0 rounded-2xl border border-white/[0.08] bg-[#0d1321]/60 group-hover:border-white/20 group-hover:scale-105 transition-all duration-300" />
                      )}

                      {/* THE ICON ACCENT */}
                      <span 
                        className="relative z-10 text-xl transition-all duration-300"
                        style={{ color: isSelected ? "#ffffff" : step.color }}
                      >
                        {step.icon}
                      </span>
                    </div>

                    {/* LABEL ACCENT */}
                    <span
                      className={`text-sm md:text-xs mt-0 md:mt-3 font-medium tracking-wide transition-all duration-300 relative z-10 ${
                        isSelected ? "text-white scale-105 font-semibold" : "text-white/40 group-hover:text-white/80"
                      }`}
                    >
                      {step.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* SPLIT EMBEDDED DIVIDER */}
          <div className="relative h-px w-full bg-gradient-to-r from-transparent via-white/[0.08] to-transparent my-12" />

          {/* CONNECT CONTROLS SECTION */}
          <div>
  <p className="text-white/40 text-xs font-semibold tracking-[0.2em] uppercase mb-8 text-center md:text-left">
    Drop a transmission
  </p>

  <div className="flex flex-wrap gap-4 justify-center md:justify-start">
    {/* Email Link */}
    <LiquidGlassButton
      color="#ef4444"
      icon={<FiMail />}
      label="Mail"
      onClick={() => window.open("mailto:anshsharma20118@gmail.com", "_blank")}
    />

    {/* GitHub Link */}
    <LiquidGlassButton
      color="#f3f4f6"
      icon={<FaGithub />}
      label="GitHub"
      onClick={() => window.open("https://github.com/AnshCoder2011", "_blank")}
    />

    {/* LinkedIn Link */}
    <LiquidGlassButton
      color="#0077b5"
      icon={<FaLinkedin />}
      label="LinkedIn"
      onClick={() => window.open("https://www.linkedin.com/in/ansh-sharma-5820252a0/", "_blank")}
    />

    {/* Instagram Link */}
    <LiquidGlassButton
      color="#e1306c"
      icon={<FaInstagram />}
      label="Instagram"
      onClick={() => window.open("https://www.instagram.com", "_blank")}
    />
  </div>
</div>

        </div>
      </motion.div>
    </section>
  );
};

export default ReachOut;