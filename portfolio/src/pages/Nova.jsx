import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RiRobot2Line } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";

// ─── FAQ dataset ──────────────────────────────────────────────────────────────
const FAQS = {
  "Who is Ansh?":
    "Ansh Sharma is a school student from Uttar Pradesh, India — studying at St. Joseph's School (ICSE, till 2028). Despite being in school, he's built 20+ major projects, published his own programming language on npm, and even built a simulated mobile OS in the browser. Passionate about dark, futuristic interfaces and making UIs feel alive.",

  "What projects has he built?":
    "20+ major projects: Phantom OS (simulated mobile OS in the browser), Hinglish++ (his own language on npm), RockChess (full-stack chess), YoChat (real-time MERN chat), AI Code Reviewer, 3D Cyberpunk Website, 3D Mac Clone, Trionn & Ochi Agency sites, Full-Stack Chatbot, Uber Mobile Clone — and 85+ more side projects.",

  "What's his tech stack?":
    "Full-Stack MERN: React · Node.js · Express · MongoDB. Styling: Tailwind CSS. State: Redux Toolkit · Zustand. Animations: GSAP · Framer Motion · Three.js/WebGL. Auth: JWT · Axios. Tools: Vite · npm. Languages: JavaScript (main) · Python · HTML · CSS.",

  "Is he open to internships?":
    "Yes! Ansh is open to internships and collaborations. He's not freelancing right now, but if you have an exciting opportunity — especially frontend, full-stack, or animation/UI-heavy — reach out on LinkedIn or GitHub.",

  "What's his coolest project?":
    "Phantom OS — https://anshphantom.netlify.app/ (password: 2011). A fully simulated mobile OS built in the browser with React. Apps, home screen, animations — it feels like a real OS, built entirely from scratch. Also check Hinglish++ — his own programming language on npm.",

  "How do I contact him?":
    "GitHub → https://github.com/AnshCoder2011\nLinkedIn → https://www.linkedin.com/in/ansh-sharma-5820252a0/\nPortfolio → https://anshs.netlify.app/\n\nLinkedIn is best for opportunities.",

  "What's his GitHub?":
    "https://github.com/AnshCoder2011 — 91+ GitHub stars, ranging from full-stack apps to 3D experiences to his own programming language.",

  "Is he available for freelance?":
    "Not right now — Ansh is focused on his studies and personal projects. But he's open to internships and collaborations. Ping him on LinkedIn if you have something exciting!",

  "What is he currently building?":
    "Right now: a proper Minecraft Client for real users, and high-quality portfolio experiences with smooth UI and production-ready features. He's also starting to explore AI/ML as his next frontier.",

  "Show me his live projects":
    "Portfolio → https://anshs.netlify.app/\nPhantom OS → https://anshphantom.netlify.app/ (pw: 2011)\n3D Cyberpunk → https://anshcyberpunk.netlify.app/\nYoChat → https://anshyochat.netlify.app/\nTrionn Agency → https://anshtrionn.netlify.app/\nOchi Agency → https://anshochi.netlify.app/\nMac Clone → https://anshmac.netlify.app/\nChatbot → https://anshchatbot.netlify.app/",

  "Can he do animations & 3D?":
    "Yes — one of his strongest areas. He uses GSAP, Framer Motion, Three.js/WebGL, CSS keyframe animations, and micro-interactions. He cares deeply about timing, easing, and making layouts feel alive instead of static. See the 3D Cyberpunk site or Mac Section clone for proof.",

  "Where is he from?":
    "Uttar Pradesh (UP), India. Currently a school student at St. Joseph's School on the ICSE Board. Everything you see was built while being a full-time student.",
};

// Chips shown at the bottom scrollbar
const QUICK_CHIPS = [
  "Who is Ansh?",
  "What's his tech stack?",
  "What projects has he built?",
  "What's his coolest project?",
  "Is he open to internships?",
  "What's his GitHub?",
  "How do I contact him?",
  "What is he currently building?",
  "Show me his live projects",
  "Can he do animations & 3D?",
  "Is he available for freelance?",
  "Where is he from?",
];

// ─── Render answer with auto-linked URLs ─────────────────────────────────────
function AnswerText({ text }) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return (
    <>
      {text.split("\n").map((line, li, arr) => (
        <span key={li}>
          {line.split(urlRegex).map((part, pi) =>
            urlRegex.test(part) ? (
              <a
                key={pi}
                href={part}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 underline underline-offset-2 hover:text-cyan-300 transition-colors break-all"
              >
                {part}
              </a>
            ) : (
              <span key={pi}>{part}</span>
            )
          )}
          {li < arr.length - 1 && <br />}
        </span>
      ))}
    </>
  );
}

// ─── Typing dots ──────────────────────────────────────────────────────────────
function TypingDots() {
  return (
    <div className="flex items-center gap-1.5 py-0.5">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-cyan-400"
          animate={{ y: [0, -5, 0], opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.18, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

// ─── Bot avatar ───────────────────────────────────────────────────────────────
function BotAv({ size = "sm" }) {
  const s = size === "lg" ? "w-9 h-9 rounded-xl" : "w-[26px] h-[26px] rounded-lg";
  return (
    <div
      className={`${s} flex-shrink-0 flex items-center justify-center`}
      style={{ background: "rgba(0,255,200,0.07)", border: "1px solid rgba(0,255,200,0.22)" }}
    >
      <RiRobot2Line
        size={size === "lg" ? 18 : 13}
        color="#0ff9c8"
      />
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function Nova() {
  const [messages, setMessages] = useState([]); // {role:'user'|'bot', text}
  const [typing, setTyping] = useState(false);
  const chatRef = useRef(null);
  const chipsRef = useRef(null);

  // auto-scroll chat
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, typing]);

  function ask(question) {
    const q = question.trim();
    if (!q || typing) return;

    setMessages((prev) => [...prev, { role: "user", text: q }]);
    setTyping(true);

    const delay = 600 + Math.random() * 400;
    setTimeout(() => {
      const answer =
        FAQS[q] ||
        "Ansh hasn't shared that detail yet — reach out on GitHub or LinkedIn!";
      setMessages((prev) => [...prev, { role: "bot", text: answer }]);
      setTyping(false);
    }, delay);
  }

  const isEmpty = messages.length === 0 && !typing;

  return (
    <section className="relative min-h-screen bg-[#060a0e] flex items-center justify-center px-4 py-16 overflow-hidden">

      {/* Ambient glows */}
      <div
        className="absolute pointer-events-none rounded-full"
        style={{ top: "28%", left: "20%", width: 320, height: 320, background: "rgba(0,217,255,0.04)", filter: "blur(100px)" }}
      />
      <div
        className="absolute pointer-events-none rounded-full"
        style={{ bottom: "20%", right: "18%", width: 240, height: 240, background: "rgba(0,255,200,0.04)", filter: "blur(80px)" }}
      />

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="w-full max-w-xl flex flex-col overflow-hidden rounded-2xl"
        style={{
          height: "680px",
          background: "#07090d",
          border: "1px solid #0d2020",
        }}
      >

        {/* ── Top bar ── */}
        <div
          className="flex items-center gap-3 px-4 py-3 flex-shrink-0"
          style={{ background: "#060810", borderBottom: "1px solid #0c1e1e" }}
        >
          {/* Avatar with pulse ring */}
          <div className="relative flex-shrink-0">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: "rgba(0,255,200,0.06)", border: "1.5px solid rgba(0,255,200,0.28)" }}
            >
              <RiRobot2Line size={18} color="#0ff9c8" />
            </div>
            <motion.div
              className="absolute inset-[-3px] rounded-xl pointer-events-none"
              style={{ border: "1px solid rgba(0,255,200,0.2)" }}
              animate={{ scale: [1, 1.14, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          <div className="flex-1">
            <p
              className="text-sm font-bold tracking-[4px]"
              style={{ fontFamily: "'Space Mono', monospace", color: "#dff9f0" }}
            >
              NOVA
            </p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <motion.div
                className="w-1.5 h-1.5 rounded-full bg-cyan-400"
                animate={{ opacity: [1, 0.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              <p
                className="text-[10px] tracking-[1.5px]"
                style={{ fontFamily: "'Space Mono', monospace", color: "#1e7a5c" }}
              >
                ONLINE · AI ASSISTANT FOR ANSH
              </p>
            </div>
          </div>

          <BsThreeDotsVertical size={14} color="#1a5040" />
        </div>

        {/* ── Chat area ── */}
        <div
          ref={chatRef}
          className="flex-1 overflow-y-auto px-4 py-5 flex flex-col gap-3"
          style={{ scrollbarWidth: "thin", scrollbarColor: "#0d2020 transparent" }}
        >

          {/* Empty state */}
          <AnimatePresence>
            {isEmpty && (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center flex-1 gap-5 py-8"
              >
                <p
                  className="text-[10px] tracking-[2.5px] text-center"
                  style={{ fontFamily: "'Space Mono', monospace", color: "#1e5a44" }}
                >
                  ASK ANYTHING ABOUT ANSH OR HIS WORK
                </p>
                <div className="flex flex-wrap justify-center gap-2 max-w-sm">
                  {[
                    "Who is Ansh?",
                    "What projects has he built?",
                    "What's his tech stack?",
                    "Is he open to internships?",
                    "What's his coolest project?",
                    "How do I contact him?",
                  ].map((q) => (
                    <button
                      key={q}
                      onClick={() => ask(q)}
                      className="text-xs rounded-full px-4 py-2 transition-all duration-200 text-left"
                      style={{
                        fontFamily: "'Space Mono', monospace",
                        background: "rgba(0,255,200,0.04)",
                        border: "1px solid #0c2e28",
                        color: "#3a9878",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "rgba(0,255,200,0.1)";
                        e.currentTarget.style.borderColor = "rgba(0,255,200,0.45)";
                        e.currentTarget.style.color = "#0ff9c8";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "rgba(0,255,200,0.04)";
                        e.currentTarget.style.borderColor = "#0c2e28";
                        e.currentTarget.style.color = "#3a9878";
                      }}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Messages */}
          <AnimatePresence initial={false}>
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className={`flex gap-2 items-end ${msg.role === "user" ? "flex-row-reverse" : ""}`}
              >
                {msg.role === "bot" && <BotAv />}
                <div
                  className="max-w-[78%] px-3.5 py-2.5 rounded-2xl text-[13px] leading-relaxed"
                  style={
                    msg.role === "bot"
                      ? {
                          background: "rgba(255,255,255,0.035)",
                          border: "1px solid rgba(255,255,255,0.07)",
                          color: "#b8d8d0",
                          borderBottomLeftRadius: "4px",
                        }
                      : {
                          background: "rgba(0,255,200,0.09)",
                          border: "1px solid rgba(0,255,200,0.2)",
                          color: "#80e8cc",
                          borderBottomRightRadius: "4px",
                        }
                  }
                >
                  {msg.role === "bot" ? (
                    <AnswerText text={msg.text} />
                  ) : (
                    msg.text
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing indicator */}
          {typing && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-2 items-end"
            >
              <BotAv />
              <div
                className="px-3.5 py-2.5 rounded-2xl"
                style={{
                  background: "rgba(255,255,255,0.035)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderBottomLeftRadius: "4px",
                }}
              >
                <TypingDots />
              </div>
            </motion.div>
          )}
        </div>

        {/* ── Bottom quick-chips bar ── */}
        <div style={{ borderTop: "1px solid #0b1c1c" }}>
          <div
            ref={chipsRef}
            className="flex gap-2 px-4 pt-3 pb-1 overflow-x-auto"
            style={{ scrollbarWidth: "none" }}
          >
            {QUICK_CHIPS.map((q) => (
              <button
                key={q}
                onClick={() => ask(q)}
                className="text-[11px] rounded-full px-3 py-1.5 whitespace-nowrap flex-shrink-0 transition-all duration-150"
                style={{
                  fontFamily: "'Space Mono', monospace",
                  background: "rgba(0,255,200,0.04)",
                  border: "1px solid #0b2820",
                  color: "#2e8060",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(0,255,200,0.1)";
                  e.currentTarget.style.borderColor = "rgba(0,255,200,0.4)";
                  e.currentTarget.style.color = "#0ff9c8";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(0,255,200,0.04)";
                  e.currentTarget.style.borderColor = "#0b2820";
                  e.currentTarget.style.color = "#2e8060";
                }}
              >
                {q}
              </button>
            ))}
          </div>
          <p
            className="text-center text-[9px] tracking-[1.5px] py-2"
            style={{ fontFamily: "'Space Mono', monospace", color: "#112a22" }}
          >
            TAP A QUESTION TO ASK NOVA
          </p>
        </div>
      </motion.div>
    </section>
  );
}