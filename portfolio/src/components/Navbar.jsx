import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { House, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = ({hidden}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* NAVBAR */}
      <motion.nav
        initial={{ opacity: 0, y: -25 }}
        animate={{ opacity: 1, y: 0 }}
        className="
          fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50
          w-[90%] md:w-[85%] max-w-[1050px]
          h-[60px] md:h-[58px]
          rounded-[20px] md:rounded-[20px]
          border border-white/10
          bg-white/[0.03]
          backdrop-blur-xl
          shadow-[0_0_40px_rgba(0,217,255,0.05)]
          flex items-center justify-between
          px-4 md:px-8
        "
      >
       {/* LOGO */}
<div className="relative group cursor-pointer select-none">
  {/* The main advanced text logo */}
  <div className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] via-[#00d9ff] to-[#7000ff] font-bold text-xl tracking-[0.012em] transition-all duration-300 drop-shadow-[0_0_8px_rgba(0,217,255,0.5)] group-hover:drop-shadow-[0_0_15px_rgba(0,217,255,0.8)] group-hover:tracking-[0.15em]">
    AnshCoder
  </div>
  
  {/* Cyberpunk sub-border or accent flash (Optional visual candy) */}
  <div className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gradient-to-r from-[#00d9ff] to-purple-500 transition-all duration-300 group-hover:w-full opacity-70" />
</div>

        {/* DESKTOP LINKS */}
        <div className="hidden md:flex items-center font-normal text-xs gap-8">
          <Link to="/" className="flex items-center gap-2 text-white">
            <div className="w-9 h-9 rounded-full bg-[#00d9ff]/10 border border-[#00d9ff]/30 flex items-center justify-center">
              <House size={16} className="text-[#00d9ff]" />
            </div>
          </Link>

          <Link to="/projects" className="text-white/65 hover:text-[#00d9ff] uppercase transition">
            Projects
          </Link>
          <Link to="/skills" className="text-white/65 hover:text-[#00d9ff] uppercase transition">
            Skills
          </Link>
          <Link to="/persona" className="text-white/65 hover:text-[#00d9ff] uppercase transition">
            Persona
          </Link>
          <Link to="/contact" className="text-white/65 hover:text-[#00d9ff] uppercase transition">
            Contact
          </Link>
        </div>

        {/* RIGHT SIDE (DESKTOP) */}
        <div className="hidden md:flex font-normal text-xs items-center gap-4">
          <Link to="/ai" className="px-5 py-2 rounded-2xl border border-[#00d9ff]/30 text-[#00d9ff] bg-[#00d9ff]/5">
            Nova AI
          </Link>

          <button className="px-5 py-2 rounded-full border border-white/10 text-white/70 bg-white/[0.03]">
            Dark
          </button>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </motion.nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <>
            {/* BLUR BACKGROUND */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            />

            {/* MENU PANEL */}
            <motion.div
              initial={{ y: "-100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="
                fixed top-0 left-0 w-full
                bg-[#0a0a0a]/95 backdrop-blur-xl
                border-b border-white/10
                z-50
                flex flex-col items-center gap-6
                py-20
              "
            >
              {/* LINKS */}
              <Link to="/" className="text-white text-lg">Home</Link>
              <Link to="/projects" className="text-white/70 hover:text-[#00d9ff] text-lg">
                Projects
              </Link>
              <Link to="/skills" className="text-white/70 hover:text-[#00d9ff] text-lg">
                Skills
              </Link>
              <Link to="/persona" className="text-white/70 hover:text-[#00d9ff] text-lg">
                Persona
              </Link>
              <Link to="/contact" className="text-white/70 hover:text-[#00d9ff] text-lg">
                Contact
              </Link>

              {/* BUTTONS */}
              <div className="flex flex-col gap-4 mt-4">
                <button className="px-6 py-3 rounded-xl border border-[#00d9ff]/30 text-[#00d9ff]">
                  Portfolio
                </button>
                <button className="px-6 py-3 rounded-xl border border-white/10 text-white/70">
                  Dark Mode
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;