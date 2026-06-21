import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Preloader = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const start = Date.now();
    const duration = 3500;

    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const percent = Math.min((elapsed / duration) * 100, 100);

      setProgress(Math.floor(percent));

      if (percent >= 100) {
        clearInterval(interval);

        setTimeout(() => {
          setIsDone(true);
        }, 200);
      }
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-[#04070d] flex items-center justify-center overflow-hidden z-50">

      {/* Top Left Branding */}
      <motion.div
        animate={isDone ? { opacity: 0, y: -20 } : { opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="absolute top-10 left-14 text-white/70 text-[22px] tracking-[0.28em] font-light z-30"
      >
        AnshCoder
      </motion.div>

      {/* Background Marquee */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            duration: 30,
            ease: "linear",
          }}
          className="flex whitespace-nowrap"
        >
          {Array(8)
            .fill("FULL STACK DEVELOPER •")
            .map((item, i) => (
              <span
                key={i}
                className="
                  text-[12vw] 
                  sm:text-[10vw] 
                  md:text-[8vw]
                  font-extrabold
                  text-white/[0.07]
                  px-10
                  tracking-tight
                "
              >
                {item}
              </span>
            ))}
        </motion.div>
      </div>

      {/* Glow Behind Loader */}
      {!isDone && (
        <>
          <div className="absolute w-[550px] h-[220px] rounded-full bg-gradient-to-r from-violet-600/40 via-purple-500/20 to-blue-500/40 blur-[80px]" />

          <div className="absolute w-[430px] h-[150px] rounded-full bg-gradient-to-r from-violet-500/30 to-blue-500/30 blur-[40px]" />
        </>
      )}

      {/* EXPANDING CONTAINER */}
      <motion.div
        initial={{
          width: "420px",
          height: "90px",
          borderRadius: "999px",
          scale: 0.95,
          opacity: 0,
        }}
        animate={
          isDone
            ? {
                width: "100vw",
                height: "100vh",
                borderRadius: "0px",
                scale: 1,
                opacity: 1,
                backgroundColor: "#111111",
              }
            : {
                width: "420px",
                height: "90px",
                borderRadius: "999px",
                scale: 1,
                opacity: 1,
                backgroundColor: "#030303",
              }
        }
        transition={{
          width: {
            duration: 0.8,
            ease: [0.76, 0, 0.24, 1],
          },
          height: {
            duration: 0.8,
            ease: [0.76, 0, 0.24, 1],
          },
          borderRadius: {
            duration: 0.5,
          },
          scale: {
            duration: 0.4,
          },
        }}
        onAnimationComplete={() => {
          if (isDone) {
            onFinish();
          }
        }}
        className="relative overflow-hidden z-20 flex items-center justify-center"
      >
        {!isDone && (
          <>
            {/* Outer Border */}
            <div
              className="
                absolute inset-0
                rounded-full
                p-[4px]
                bg-gradient-to-r
                from-[#9158ff]
                via-[#c8a2ff]
                to-[#4da1ff]
                shadow-[0_0_40px_rgba(139,92,246,0.7)]
              "
            >
              {/* Inner Capsule */}
              <div
                className="
                  relative
                  w-full
                  h-full
                  rounded-full
                  bg-[#050505]
                  overflow-hidden
                "
              >
                {/* Gloss */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/15 via-transparent to-transparent" />

                {/* Progress Track */}
                <div className="absolute top-[8px] left-[18px] right-[18px] h-[6px] bg-black/50 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-violet-500 via-purple-400 to-blue-400"
                    animate={{
                      width: `${progress}%`,
                    }}
                  />
                </div>

                {/* Shine Left */}
                <div className="absolute left-10 top-0 h-full w-16 bg-white/5 blur-xl rotate-12" />

                {/* Shine Right */}
                <div className="absolute right-10 top-0 h-full w-16 bg-white/5 blur-xl -rotate-12" />

                {/* Inner Shadow */}
                <div className="absolute inset-0 rounded-full shadow-[inset_0_0_35px_rgba(0,0,0,1)]" />
              </div>
            </div>

            {/* Loader Text */}
            <motion.div
              animate={{
                opacity: [1, 0.8, 1],
              }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
              }}
              className="relative z-20 flex items-center gap-8"
            >
              <span className="text-white text-[18px] font-black tracking-wide">
                LOADING...
              </span>

              <span className="text-[#9b5cff] text-[18px] font-black drop-shadow-[0_0_15px_rgba(168,85,247,0.8)]">
                {String(progress).padStart(3, "0")}%
              </span>
            </motion.div>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default Preloader;