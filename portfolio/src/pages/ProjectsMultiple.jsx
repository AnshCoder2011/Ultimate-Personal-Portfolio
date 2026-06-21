import Galaxy from "../components/Galaxy";
import Footer from "./Footer";

// 1. IMPORT YOUR IMAGES HERE (Adjust paths based on your file structure)
// If your images are in the 'src/assets' folder:
import commodityImg from "/images/project1.png";
import fitoImg from "/images/rockclient.png";
// import dollarImg from "/images/project3.jpg";
import trionn from "/images/project2.png";
import chess from "/images/chess.png";
import uber from "/images/Uber.png";

// Note: If your images are stored inside the 'public/' folder instead, 
// you don't need imports. You can just pass string paths like "/images/pic.png"

const projects = [
  {
    title: "PhantomOS",
    desc: "Phantom OS is an interactive smartphone OS simulator featuring a lock screen, passcode system, control center, gesture controls, and fluid animations, built with React, Tailwind CSS, Framer Motion, and Zustand. 🚀",
    tags: ["SCOPE", "TECH"],
    code: "https://github.com/AnshCoder2011/",
    live: "https://commoditychain.live",
    image: commodityImg, // 2. ASSIGN DYNAMIC IMAGE VARIABLES
  },
  {
    title: "RockClient",
    desc: "A premium Minecraft client platform built to showcase and distribute RockClient, featuring a modern UI, authentication system, and seamless user experience.Actually a Client for minecraft user can buy and sell goods.",
    tags: ["SCOPE", "TECH"],
    code: "https://github.com/AnshCoder2011/rockclient",
    live: "https://github.com/AnshCoder2011/rockclient",
    image: fitoImg,
  },
  {
    title: "MERN Chess.com",
    desc: "Chess.com Clone – MERN Edition is a full-stack web application that lets users play classical, blitz, and bullet chess online. It supports real-time multiplayer matches, an AI opponent, move validation, Elo ratings, and a polished, responsive UI.",
    tags: ["SCOPE", "TECH"],
    code: "https://github.com/AnshCoder2011/Chess-com-MERN-Project",
    live: "https://chess-com-mern-project-1.onrender.com/",
    image: chess,
  },

  //title: "AI Code Reviewer",
  // desc: "A MERN-based AI code reviewer that lets developers paste or upload code and get instant feedback on bugs, style, and best practices, using an LLM (like GPT/Claude via API) for the analysis layer. Built with React for the UI, Express/Node", 
  {
    title: "Trionn Agency Clone",
    desc: "Trionn Agency Clone is a responsive agency website featuring smooth animations, interactive effects, and a premium user experience. Built to showcase modern frontend development and pixel-perfect UI implementation. ✨",
    tags: ["SCOPE", "TECH"],
    code: "https://github.com/AnshCoder2011/AI-Code-Reviwer",
    live: "https://404.com",
    image: trionn,
  },
  {
    title: "Backend Project | YT Like Video Player",
    desc: "This project is a full-stack video player application that provides a YouTube-like experience. It includes both backend and frontend components, allowing users to watch videos, search for them, and save their favorite videos.",
    tags: ["SCOPE", "TECH"],
    code: "https://github.com/AnshCoder2011/backend-project-social-media",
    live: "https://404.com",
    image: fitoImg,
  },
  {
    title: "Full Stack | Uber Clone",
    desc: "A full-stack Uber clone built with the MERN stack, replicating core ride-hailing features like live driver tracking, route mapping, fare estimation, and real-time ride requests using WebSockets/Socket.io. Includes separate rider and driver interfaces, with Node/Express handling ride-matching logic and MongoDB storing users, trips, and location data.",
    tags: ["SCOPE", "TECH"],
    code: "https://github.com/AnshCoder2011/uber-clone",
    live: "https://anshuber.netlify.app/",
    image: uber,
  },
];

const ProjectsMultiple = () => {
  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-white overflow-hidden">

      {/* 🌌 GALAXY BACKGROUND */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Galaxy />
      </div>

      {/* Subtle dark overlay */}
      <div className="absolute inset-0 bg-black/40 z-0" />

      {/* CONTENT WRAPPER */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-8 pt-24 pb-20">

        {/* HEADER */}
        <div className="text-center mt-14 mb-16">
          <p className="text-cyan-400 tracking-[0.2em] text-xs font-semibold uppercase">
            PORTFOLIO
          </p>
          <h1 className="text-5xl md:text-6xl font-bold mt-3 tracking-tight bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
            Selected Works
          </h1>
        </div>

        {/* CARDS GRID */}
        {/* 💡 Note: Removed 'mx-18' because fixed horizontal margins break responsiveness on smaller viewports */}
        <div className="grid grid-cols-1 mx-14 md:grid-cols-2 lg:grid-cols-3 gap-6 px-2 md:px-0">

          {projects.map((proj, i) => (
            <div
              key={i}
              className="group relative rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-xl p-6 overflow-hidden transition-all duration-500 ease-out hover:-translate-y-1.5 hover:border-cyan-500/30 hover:shadow-[0_20px_50px_rgba(6,182,212,0.15)]"
            >

              {/* Dynamic Glow Spotlight */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-b from-cyan-500/10 via-transparent to-transparent pointer-events-none blur-xl" />

              {/* CARD MEDIA/IMAGE CONTAINER */}
              {/* 3. REPLACED THE GRADIENT DIV WITH A LIVE, RESPONSIVE IMAGE BLOCK */}
              <div className="relative h-44 rounded-xl border border-white/5 bg-[#121212] mb-5 overflow-hidden flex items-center justify-center">
                {/* Real project screenshot/graphic */}
                {proj.image ? (
                  <img 
                    src={proj.image} 
                    alt={proj.title} 
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                ) : (
                  // Fallback ambient gradient if you ever forget to add an image to a new object
                  <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-transparent to-purple-500/10 opacity-60" />
                )}
                
                {/* Cyberpunk UI Hover Overlays */}
                <div className="absolute inset-0 bg-cyan-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none mix-blend-overlay" />
                <div className="absolute h-16 w-16 bg-cyan-500/10 rounded-full blur-xl group-hover:bg-cyan-500/20 transition-colors duration-500 pointer-events-none" />
              </div>

              {/* TITLE */}
              <h2 className="text-xl font-semibold tracking-tight text-white/90 group-hover:text-white transition-colors duration-300">
                {proj.title}
              </h2>

              {/* DESC */}
              <p className="text-white/50 text-sm mt-2.5 font-light leading-relaxed h-12 line-clamp-2 group-hover:text-white/70 transition-colors duration-300">
                {proj.desc}
              </p>

              {/* TAGS */}
              <div className="flex flex-wrap gap-1.5 font-medium mt-5">
                {proj.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-md border border-white/5 bg-white/[0.03] text-white/40 group-hover:border-cyan-500/20 group-hover:text-cyan-400 transition-all duration-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* SEPARATOR LINE */}
              <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent mt-6 mb-4" />

              {/* FOOTER ACTIONS */}
              <div className="flex justify-between items-center text-xs">
                
                <a
                  href={proj.code}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 font-medium text-white/40 hover:text-cyan-400 transition-colors duration-300"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="lucide lucide-github w-3.5 h-3.5"
                  >
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                    <path d="M9 18c-4.51 2-5-2-7-2"></path>
                  </svg>
                  <span>Source Code</span>
                </a>

                <a
                  href={proj.live}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 font-medium text-white/40 hover:text-cyan-400 transition-colors duration-300"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="lucide lucide-external-link w-3.5 h-3.5"
                  >
                    <path d="M15 3h6v6"></path>
                    <path d="M10 14 21 3"></path>
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  </svg>
                  <span>Live Demo</span>
                </a>

              </div>

            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProjectsMultiple;