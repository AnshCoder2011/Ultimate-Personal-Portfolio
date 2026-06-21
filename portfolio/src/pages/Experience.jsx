import { motion } from "framer-motion";

const timeline = [
  {
    index: "01",
    accent: "cyan",
    tag: "Education",
    period: "2024 — 2028",
    title: "Worked in RockClient Product",
    subtitle: "Minecraft NextGen Client, still working on it!",
    place: "Currently not Published, expected 2028",
    stack: ["Testing", "Statistics", "MERN", "MOJANG"],
    visual: {
      type: "image",
      src: "/images/image.png",
      caption: "RockClient - Wallpaper",
    },
  },
  {
    index: "02",
    accent: "amber",
    tag: "Journey",
    period: "Nov 2022 - Started with HTML, now working with MERN in 2026",
    title: "Full Stack Developer",
    subtitle: "Started Coding at 6th Standard",
    description:
      "I started my journey in 2022 with basic HTML and CSS, experimenting and building small projects on mobile before eventually getting my first laptop. As I progressed, I developed a strong understanding of JavaScript and began exploring modern web development. I was especially drawn to frontend experiences — animations, interactions, and 3D visuals — which shaped my approach to building interfaces. Over time, I expanded into full-stack development with the MERN stack, focusing on creating applications that are both performant and visually engaging, while continuously learning and improving, also trying to implement AI stuff on the WebApps too.",
    stack: [
      "React JS",
      "NodeJs",
      "OAuth2",
      "Frontend",
      "JWT",
      "MongoDB",
      "TypeScript",
      "GSAP",
      "More",
    ],
    visual: {
      type: "metrics",
      items: [
        { label: "Started Year", value: "2022" },
        { label: "Focus", value: "MERN" },
        { label: "Age", value: "15" },
      ],
    },
  },
];

const accent = {
  cyan: {
    text: "text-[#2dd4ee]",
    dot: "bg-[#2dd4ee] shadow-[0_0_12px_rgba(45,212,238,0.6)]",
    tagBg: "bg-[#2dd4ee]/[0.08] border-[#2dd4ee]/20",
    cardBorder: "border-[#2dd4ee]/15",
  },
  amber: {
    text: "text-[#f0a93a]",
    dot: "bg-[#f0a93a] shadow-[0_0_12px_rgba(240,169,58,0.6)]",
    tagBg: "bg-[#f0a93a]/[0.08] border-[#f0a93a]/20",
    cardBorder: "border-[#f0a93a]/15",
  },
};

const Experience = () => {
  return (
    <section className="relative bg-[#07080c] py-28 md:py-32 px-6 md:px-8 overflow-hidden">
      {/* AMBIENT GLOW */}
      <div className="pointer-events-none absolute top-[10%] right-[5%] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(0,217,255,0.06),transparent_70%)]" />

      <div className="max-w-[1040px] mx-auto relative z-10">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-between items-end mb-16 md:mb-20 border-b border-white/[0.08] pb-7"
        >
          <div>
            <p className="text-white/35 tracking-[0.3em] uppercase text-[11px] mb-3 font-semibold">
              Education &amp; Work
            </p>
            <h2 className="text-white text-4xl md:text-5xl font-bold tracking-tight">
              Experience
            </h2>
          </div>
          <p className="hidden md:block text-white/25 text-[13px] font-mono">
            {String(timeline.length).padStart(2, "0")} ENTRIES — 2024 / 2026
          </p>
        </motion.div>

        {/* ROWS */}
        <div className="flex flex-col">
          {timeline.map((item, idx) => {
            const c = accent[item.accent];
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className={`grid grid-cols-1 md:grid-cols-[90px_1fr_320px] gap-5 md:gap-10 py-10 md:py-12 ${
                  idx !== timeline.length - 1
                    ? "border-b border-white/[0.06]"
                    : ""
                } ${idx === 0 ? "md:pt-0" : ""}`}
              >
                {/* INDEX */}
                <div className="flex md:flex-col items-center md:items-start gap-3 md:gap-0">
                  <span className="font-mono text-[13px] text-white/30 md:pt-1">
                    {item.index}
                  </span>
                  <span
                    className={`block w-1.5 h-1.5 rounded-full md:mt-2.5 ${c.dot}`}
                  />
                </div>

                {/* MAIN CONTENT */}
                <div className="min-w-0">
                  <span
                    className={`inline-block text-[10.5px] tracking-[0.15em] uppercase px-2.5 py-1 rounded-md mb-4 font-semibold border ${c.tagBg} ${c.text}`}
                  >
                    {item.tag}
                  </span>

                  <h3 className="text-white text-2xl md:text-[26px] font-bold tracking-tight mb-1.5">
                    {item.title}
                  </h3>

                  <p className={`text-[15px] font-medium mb-0.5 ${c.text}`}>
                    {item.subtitle}
                  </p>

                  {item.place && (
                    <p className="text-white/35 text-[13.5px] mb-4">
                      {item.place}
                    </p>
                  )}

                  <p className="text-white/30 text-[12.5px] font-mono mb-[18px]">
                    {item.period}
                  </p>

                  {item.description && (
                    <p className="text-white/50 text-[14.5px] leading-relaxed max-w-[480px] mb-1">
                      {item.description}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-2 mt-5">
                    {item.stack.map((tag, i) => (
                      <span
                        key={i}
                        className="text-xs px-3 py-1.5 rounded-md font-medium bg-white/[0.04] text-white/60 border border-white/[0.08]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* VISUAL */}
                <div className="relative pt-28">
                  {item.visual.type === "image" ? (
                    <>
                      <motion.div
                        whileHover={{ scale: 1.015 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="rounded-[10px] overflow-hidden relative border border-white/10 aspect-[4/3]"
                      >
                        <img
                          src={item.visual.src}
                          alt={item.title}
                          className="w-full h-full object-cover"
                          style={{ filter: "saturate(1.05) contrast(1.02)" }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50" />
                      </motion.div>
                      <p className="text-[11px] text-white/30 mt-2.5 font-mono tracking-wide">
                        {item.visual.caption}
                      </p>
                    </>
                  ) : (
                    <div
                      className={`rounded-[10px] 
                        border ${c.cardBorder} 
                        bg-gradient-to-br from-[#f0a93a]/[0.06] to-transparent 
                        p-5 
                        aspect-[4/3]   // 👈 THIS IS THE FIX
                        flex flex-col justify-center gap-4`}
                    >
                      {item.visual.items.map((m, i) => (
                        <div key={i}>
                          <div className="flex justify-between items-baseline">
                            <span className="text-[11.5px] text-white/40">
                              {m.label}
                            </span>
                            <span className="text-[13px] text-white font-semibold font-mono">
                              {m.value}
                            </span>
                          </div>
                          {i !== item.visual.items.length - 1 && (
                            <div className="h-px bg-white/[0.06] mt-4" />
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Experience;
