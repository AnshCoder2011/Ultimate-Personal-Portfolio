import TechGlobe from "../components/TechGlobe"; // 1. IMPORT YOUR GLOBE COMPONENT
import Galaxy from "../components/Galaxy";     // (Optional: Import if you want your galaxy stars background)
import Footer from './Footer';

const Skills = () => {
  return (
    <>
    <div className="relative min-h-screen bg-[#0a0a0a] text-white overflow-hidden flex flex-col justify-center items-center">
      
      {/* 🌌 OPTIONAL BACKGROUND LAYERS */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Galaxy />
      </div>
      <div className="absolute inset-0 bg-black/40 z-0" />

      {/* CONTENT WRAPPER */}
      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 md:px-8 pt-24 pb-20 flex flex-col items-center">
        
        {/* HEADER SECTION */}
        <div className="text-center mb-12">
          <p className="text-cyan-400 tracking-[0.2em] text-xs font-semibold uppercase">
            EXPERTISE
          </p>
          <h1 className="text-5xl md:text-6xl font-bold mt-3 tracking-tight bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
            Technical Expertise
          </h1>
        </div>

        {/* 🌐 3D GLOBE MOUNTING POINT */}
        <div className="w-full max-w-[800px] mx-auto">
          <TechGlobe />
        </div>

      </div>

    </div>
    <Footer />
    </>
  );
};

export default Skills;