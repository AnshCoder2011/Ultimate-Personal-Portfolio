import { motion } from "framer-motion";
import { FiActivity } from "react-icons/fi";
import { FaImages, FaDesktop } from "react-icons/fa";
import LiquidGlassButton from "../components/LiquidGlassButton";

const Footer = ({ setAnalyticsOpen = () => {} }) => {
  return (
    <footer className="relative bg-[#05070d] border-t border-white/[0.06] overflow-hidden">

      {/* glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-1/2 w-[500px] h-[500px] bg-[#00d9ff] blur-[180px] opacity-[0.08] -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">

        <div className="flex items-center gap-3 text-white/40 text-sm">
          <motion.div
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-2 h-2 rounded-full bg-[#00d9ff]"
          />
          <p className="font-mono">© 2026 ANSH SHARMA</p>
        </div>

        <div className="flex gap-4 flex-wrap justify-center">

          <LiquidGlassButton
            color="#00d9ff"
            icon={<FiActivity />}
            label="Visitors"
            onClick={() => setAnalyticsOpen(true)}
          />

          <LiquidGlassButton
            color="#38bdf8"
            icon={<FaImages />}
            label="Gallery"
          />

          <LiquidGlassButton
            color="#22c55e"
            icon={<FaDesktop />}
            label="Contact"
          />

        </div>
      </div>

      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#00d9ff]/40 to-transparent" />
    </footer>
  );
};

export default Footer;