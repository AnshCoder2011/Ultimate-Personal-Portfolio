import { motion } from "framer-motion";
import LiquidGlassButton from "../components/LiquidGlassButton";
import { FaArrowRight } from "react-icons/fa";
import DistortedImage from "../components/DistortedImage";
import { Link } from "react-router-dom";

const projects = [
  {
    title: "PhantomOS",
    desc: "Phantom OS is an interactive smartphone OS simulator featuring a lock screen, passcode system, control center, gesture controls, and fluid animations, built with React, Tailwind CSS, Framer Motion, and Zustand. 🚀",
    tags: ["React.js", "NodeJs", "Premium look", "Own Design"],
    color: "#00d9ff",
    image: "/images/project1.png",
  },
  {
    title: "AI Code Reviewer",
    desc: "A MERN-based AI code reviewer that lets developers paste or upload code and get instant feedback on bugs, style, and best practices, using an LLM (like GPT/Claude via API) for the analysis layer. Built with React for the UI, Express/Node",
    tags: ["React", "Node", "Express", "AI/API"],
    color: "#f59e0b",
    image: "/images/codereview.jpg",
  },
  {
    title: "Ansh Chat Application",
    desc: "Ansh Chat is a real-time chat application with instant messaging, responsive interfaces, and a smooth user experience. Built to demonstrate modern web development, real-time communication, and scalable application architecture. 🚀",
    tags: ["React", "FastAPI", "Docker"],
    color: "#a855f7",
    image: "/images/project3.png",
  },
];

const Projects = () => {
  <svg className="absolute w-0 h-0">
    <filter id="wavy">
      <feTurbulence
        type="turbulence"
        baseFrequency="0.02"
        numOctaves="2"
        result="turbulence"
      >
        <animate
          attributeName="baseFrequency"
          dur="8s"
          values="0.02;0.04;0.02"
          repeatCount="indefinite"
        />
      </feTurbulence>

      <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="20" />
    </filter>
  </svg>;
  return (
    <section className="relative bg-[#05070d] py-24 px-6 overflow-hidden">
      {/* Title */}
      <div className="max-w-6xl mx-auto mb-14">
        <p className="text-white/30 tracking-[0.35em] uppercase text-sm mb-3">
          Featured Work
        </p>

        <h2 className="text-white text-4xl md:text-6xl font-semibold">
          Projects
        </h2>
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
        {projects.map((project, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            viewport={{ once: true }}
            className="
      group relative 
      rounded-2xl 
      border border-white/10 
      bg-white/[0.03] 
      backdrop-blur-xl 
      p-6 
      cursor-pointer 
      overflow-hidden
    "
          >
            {/* 3D IMAGE */}
            <motion.div
              className="
        absolute inset-0 
        z-[20]
        opacity-0 
        group-hover:opacity-100 
        transition duration-500
      "
            >
              <div
                className="
          absolute 
          left-1/2 top-1/2 
          -translate-x-1/2 -translate-y-1/2 
          w-[150%] h-[150%]
        "
              >
                <DistortedImage image={project.image} />
              </div>
            </motion.div>

            {/* DARK OVERLAY */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-40 z-[10] transition" />

            {/* CONTENT */}
            <div className="relative z-[30] group-hover:opacity-0 transition duration-300">
              {/* Glow */}
              <div
                className="absolute -top-20 -left-20 w-40 h-40 blur-[90px] opacity-20 group-hover:opacity-40 transition"
                style={{ background: project.color }}
              />

              {/* Accent */}
              <div
                className="w-10 h-[3px] mb-4 rounded-full"
                style={{ background: project.color }}
              />

              <h3 className="text-white text-lg font-semibold mb-3">
                {project.title}
              </h3>

              <p className="text-white/50 text-sm leading-relaxed mb-5">
                {project.desc}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-3 py-1 rounded-full border"
                    style={{
                      borderColor: project.color + "55",
                      color: project.color,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Button */}
      <div className="flex justify-center mt-12">
        <Link to="/projects">
          <LiquidGlassButton
            color="#00d9ff"
            icon={<FaArrowRight />}
            label="View All Projects"
            onClick={() => console.log("View all projects")}
            style={{
              padding: "12px 26px",
              fontSize: "14px",
            }}
          />
        </Link>
      </div>
    </section>
  );
};

export default Projects;
