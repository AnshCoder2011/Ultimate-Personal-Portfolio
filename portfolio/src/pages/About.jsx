import { motion } from "framer-motion";
import LiquidGlassButton from "../components/LiquidGlassButton";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <section className="relative bg-[#05070d] py-24 px-6 overflow-hidden">
      {/* Title */}
      <div className="max-w-6xl mx-auto mb-14">
        <p className="text-white/30 tracking-[0.35em] uppercase text-sm mb-3">
          Who I Am
        </p>

        <h2 className="text-white text-4xl md:text-6xl font-semibold">
          About Me
        </h2>
      </div>

      {/* TOP CARDS */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6 mb-6">
        {/* LOCATION CARD */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="group relative rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8 overflow-hidden cursor-pointer"
        >
          {/* IMAGE ON HOVER */}
          <motion.img
            src="/images/india.jpg"
            alt="India"
            className="
  absolute inset-0 w-full h-full object-cover z-10
  opacity-0 scale-110
  group-hover:opacity-100
  group-hover:scale-100 
  transition-all duration-700 ease-out
  brightness-150
"
          />

          {/* DARK OVERLAY (for readability) */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-500 z-20" />

          {/* CONTENT */}
          <div className="relative z-30 group-hover:opacity-0 transition duration-300">
            <p className="text-white/30 text-xs tracking-tighter mb-16 uppercase">
              Location • Hover to explore
            </p>

            <h3 className="text-white text-4xl font-semibold mb-3">INDIA</h3>

            <p className="text-white/50 text-sm">
              25.5941° N, 85.1376° E <br />
              GMT +5:30
            </p>
          </div>

          {/* Glow */}
          <div className="absolute -top-20 -left-20 w-60 h-60 bg-[#00d9ff] blur-[120px] opacity-20 z-0" />
        </motion.div>

        {/* ABOUT TEXT */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="relative rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8 overflow-hidden"
        >
          <p className="text-white/30 text-xs tracking-widest mb-4 uppercase">
            / About
          </p>

          <p className="text-white/70 leading-relaxed text-sm">
            I'm Ansh — a developer building at the intersection of full-stack
            systems and creative UI. I focus on clean architecture,
            high-performance apps, and visually insane experiences.
          </p>

          <p className="text-white/30 text-xs mt-12 italic">
            "Where design meets engineering."
          </p>

          {/* Glow */}
          <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-[#a855f7] blur-[120px] opacity-20" />
        </motion.div>
      </div>

      {/* BOTTOM CARDS */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
        {/* CARD 1 */}
        <motion.div
          whileHover={{ y: -6 }}
          className="relative rounded-2xl border border-purple-500/20 bg-white/[0.03] backdrop-blur-xl p-6"
        >
          <p className="text-purple-400 text-xs tracking-widest mb-3 uppercase">
            Growth
          </p>

          <p className="text-white/60 text-sm">
            Exploring systems with curiosity and continuous learning mindset.
          </p>
        </motion.div>

        {/* CARD 2 */}
        <motion.div
          whileHover={{ y: -6 }}
          className="relative rounded-2xl border border-cyan-400/20 bg-white/[0.03] backdrop-blur-xl p-6"
        >
          <p className="text-cyan-400 text-xs tracking-widest mb-3 uppercase">
            Focus
          </p>

          <p className="text-white/60 text-sm">
            Deep work on performance, efficiency and clean execution.
          </p>
        </motion.div>

        {/* CARD 3 */}
        <motion.div
          whileHover={{ y: -6 }}
          className="relative rounded-2xl border border-yellow-400/20 bg-white/[0.03] backdrop-blur-xl p-6"
        >
          <p className="text-yellow-400 text-xs tracking-widest mb-3 uppercase">
            Craft
          </p>

          <p className="text-white/60 text-sm">
            Discipline and precision in every line of code written.
          </p>
        </motion.div>
      </div>

      {/* BUTTON */}
      <div className="flex justify-center mt-14">
        <Link to="/persona">
        <LiquidGlassButton
          color="#00d9ff"
          icon={<FaArrowRight />}
          label="View Persona"
          onClick={() => console.log("persona")}
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

export default About;
