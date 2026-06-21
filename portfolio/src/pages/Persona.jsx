import { useState } from "react";
import Footer from "./Footer";

// const navItems = ["PROJECTS", "CREDENTIALS", "FORGE", "PERSONA"];

const stats = [
  { value: "20+", label: "Major Projects Built" },
  { value: "85+", label: "Nornal Projects", sub: "" },
  { value: "91+", label: "GitHub Stars" },
  { value: "28+", label: "LeetCode Solved" },
  { value: "10+", label: "Deployed / Hosted" },
];

function EducationCard() {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative bg-[#0d1117]/80 border border-white/10 rounded-2xl p-5"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Hover tooltip image */}
      <div
        className={`absolute left-1/2 -translate-x-1/2 bottom-full mb-3 w-[60%] transition-all duration-300 ease-out pointer-events-none ${
          hovered
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-2 scale-95"
        }`}
      >
        <div className="rounded-xl overflow-hidden border border-white/15 shadow-2xl shadow-black/60">
          <img
            src="/images/school.png"
            alt="India"
            className="w-full h-32 object-cover"
          />
        </div>
        <div className="absolute left-1/2 -translate-x-1/2 top-full w-3 h-3 -mt-1.5 rotate-45 bg-[#0d1117] border-r border-b border-white/15" />
      </div>

      <div className="group relative flex items-start gap-4 p-4 rounded-2xl border border-white/5 bg-[#0d0d0d]/40 backdrop-blur-sm transition-all duration-300 hover:border-cyan-500/30 hover:bg-cyan-500/[0.02] hover:shadow-[0_0_30px_rgba(6,182,212,0.04)] cursor-pointer">
  
  {/* Left Logo Badge - Glows on Hover */}
  <div className="w-12 h-12 flex-shrink-0 rounded-xl bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400 text-sm font-bold tracking-wide transition-all duration-300 group-hover:bg-cyan-400/20 group-hover:border-cyan-400/60 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.25)]">
    IIT
  </div>

  <div className="flex-1 min-w-0">
    <div className="flex items-baseline gap-2 flex-wrap">
      <h3 className="text-white font-semibold text-base transition-colors duration-300 group-hover:text-cyan-300">
        St. Joseph's School
      </h3>
      {/* Subtle styling change to note interaction without popups */}
      <span className="text-white/20 text-xs transition-colors duration-300 group-hover:text-cyan-400/50">
        verified profile
      </span>
    </div>

    <p className="text-cyan-400 text-sm leading-snug mt-1 transition-colors duration-300 group-hover:text-cyan-300">
      Student of High School, ICSE Board &amp; Currently Giving Boards
    </p>

    <p className="text-white/50 text-sm mt-2">2024 – 2028</p>

    <div className="flex items-center justify-between mt-4">
      <div className="flex items-baseline gap-1.5 font-mono text-xs text-white/40 tracking-wide">
        <span>Last Year Percentage</span>
        <span className="text-amber-400 font-semibold text-base font-sans filter drop-shadow-[0_0_6px_rgba(251,191,36,0.15)] transition-transform duration-300 group-hover:scale-105">
          82%
        </span>
        <span className="text-white/30">/100%</span>
      </div>
      
      {/* Pill Badge - Illuminates on Hover */}
      <span className="text-[11px] text-cyan-300/80 border border-cyan-400/25 rounded-full px-2.5 py-1 whitespace-nowrap transition-all duration-300 group-hover:border-cyan-400/50 group-hover:bg-cyan-400/10 group-hover:text-cyan-200">
        Avg std.
      </span>
    </div>
  </div>
</div>
    </div>
  );
}

export default function PersonaPage() {
  return (
    <div className="min-h-screen bg-[#05070a] mx-10 text-white relative overflow-hidden">
      {/* ambient starfield dots */}
      <div className="absolute inset-0 pointer-events-none opacity-60">
        <div className="absolute top-[8%] left-[44%] w-1 h-1 rounded-full bg-white/40" />
        <div className="absolute top-[20%] left-[16%] w-1 h-1 rounded-full bg-white/20" />
        <div className="absolute top-[30%] left-[88%] w-1 h-1 rounded-full bg-white/30" />
        <div className="absolute top-[44%] left-[60%] w-1 h-1 rounded-full bg-white/20" />
        <div className="absolute top-[60%] left-[8%] w-1 h-1 rounded-full bg-white/20" />
        <div className="absolute top-[15%] left-[70%] w-1.5 h-1.5 rounded-full bg-white/30" />
      </div>

      {/* glow accent */}
      <div className="absolute top-[28%] left-[58%] w-40 h-40 bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative max-w-[1150px] mt-30 mx-auto px-6">
       

        {/* HEADER */}
        <div className="text-center mb-16">
          <p className="text-cyan-400 text-xs tracking-[0.25em] font-semibold mb-3">
            WHO I AM
          </p>
          <h1 className="text-6xl font-semibold tracking-tight">Persona</h1>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 mx-20 md:grid-cols-2 gap-12 mb-16">
          {/* LEFT: BIO */}
          <div>
          <h2 className="text-xl font-semibold mb-5">Hi, I'm Ansh</h2>

            <p className="text-white/70 leading-relaxed font-light mb-4">
              A student and full-stack developer focused on building clean, modern web apps.
              I enjoy turning ideas into real, functional products using the MERN stack and React-based UI systems.
            </p>

            <p className="text-white/70 font-light leading-relaxed mb-6">
              Right now, I'm deep into building advanced projects like a Proper Minecraft Client for users and
              high-quality portfolio experiences with smooth UI, analytics, and real-world features.
              Currently having interest in diving in to new field that is AI/ML, will soon take up that tech too.
              I care about performance, design consistency, and making everything feel production-ready.
            </p>

            <div className="flex items-center gap-3">
              <span className="text-xs text-white/60 border border-white/15 rounded-full px-3.5 py-1.5">
                Uttar Pradesh (UP), India
              </span>
              <span className="text-xs text-white/60 border border-white/15 rounded-full px-3.5 py-1.5">
                St. Joseph's School · till 2028
              </span>
            </div>
          </div>

          {/* RIGHT: EDUCATION */}
          <div>
            <h2 className="text-xl font-semibold mb-5">Education</h2>
            <EducationCard />
          </div>
        </div>

        {/* STATS ROW */}
        <div className="grid grid-cols-2 mx-20 sm:grid-cols-3 md:grid-cols-5 gap-4 pb-20">
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-[#161616] border border-white/10 rounded-2xl py-7 px-4 text-center"
            >
              <div className="text-cyan-400 text-3xl font-semibold mb-1.5">
                {s.value}
              </div>
              <div className="text-white/70 text-sm">{s.label}</div>
              {s.sub && (
                <div className="text-white/30 text-xs mt-0.5">{s.sub}</div>
              )}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}