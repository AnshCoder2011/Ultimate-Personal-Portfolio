import React, { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import emailjs from "@emailjs/browser";
import { Mail, MapPin, Send, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

// =========================================================================
// EMAILJS CONFIG -- replace these three with your own EmailJS credentials.
// Get them at https://dashboard.emailjs.com (Service, Template, Public Key).
// =========================================================================
const EMAILJS_SERVICE_ID = "service_mkpkrij";
const EMAILJS_TEMPLATE_ID = "template_1j5oddl";
const EMAILJS_PUBLIC_KEY = "DvC3JzaH7t2TWVhhZ";

// -------------------------------------------------------------------------
// 3D FLOATING ENVELOPE -- premium pass
// Layered body (back card + lid + glowing seal) for real depth instead of
// flat boxes, brighter emissive accents for the Bloom pass to catch, and a
// rim-light highlight edge. Tilts toward the cursor, idles with a slow
// float/spin.
// -------------------------------------------------------------------------
function Envelope() {
  const group = useRef();
  const sealRef = useRef();
  const target = useRef(new THREE.Vector2(0, 0));

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();

    group.current.rotation.y = Math.sin(t * 0.4) * 0.35 + target.current.x * 0.6;
    group.current.rotation.x = Math.cos(t * 0.3) * 0.08 + target.current.y * 0.3;
    group.current.position.y = Math.sin(t * 0.8) * 0.15;

    if (sealRef.current) {
      // gentle pulse on the seal so it reads as "alive", not static
      const pulse = 0.6 + Math.sin(t * 2.2) * 0.25;
      sealRef.current.material.emissiveIntensity = pulse;
    }
  });

  const handlePointerMove = (e) => {
    target.current.x = (e.clientX / window.innerWidth) * 2 - 1;
    target.current.y = (e.clientY / window.innerHeight) * 2 - 1;
  };

  React.useEffect(() => {
    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  return (
    <group ref={group}>
      {/* back card -- slightly larger, darker, sits behind the lid to give
          the stack actual depth instead of one flat slab */}
      <mesh position={[0, 0, -0.05]}>
        <boxGeometry args={[2.3, 1.58, 0.06]} />
        <meshStandardMaterial
          color="#070b12"
          metalness={0.7}
          roughness={0.25}
          emissive="#0891b2"
          emissiveIntensity={0.05}
        />
      </mesh>

      {/* envelope body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2.2, 1.5, 0.08]} />
        <meshPhysicalMaterial
          color="#0d1420"
          metalness={0.75}
          roughness={0.18}
          clearcoat={0.6}
          clearcoatRoughness={0.2}
          emissive="#0891b2"
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* edge highlight frame -- thin bright outline along the body edge,
          catches the Bloom pass and reads as a premium rim light */}
      <mesh position={[0, 0, 0.001]}>
        <boxGeometry args={[2.24, 1.54, 0.001]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.18} />
      </mesh>

      {/* flap -- flat triangle, brighter material so it pops against the body */}
      <mesh position={[0, 0.05, 0.05]}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[
              new Float32Array([
                -1.1, 0.75, 0,
                 1.1, 0.75, 0,
                 0,   -0.35, 0,
              ]),
              3,
            ]}
          />
        </bufferGeometry>
        <meshPhysicalMaterial
          color="#16293a"
          metalness={0.6}
          roughness={0.2}
          clearcoat={0.5}
          emissive="#22d3ee"
          emissiveIntensity={0.25}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* wax-seal accent -- small glowing disc where the flap meets the
          body, gives the eye a focal point and a strong Bloom highlight */}
      <mesh ref={sealRef} position={[0, -0.05, 0.07]}>
        <circleGeometry args={[0.16, 32]} />
        <meshStandardMaterial
          color="#67e8f9"
          emissive="#67e8f9"
          emissiveIntensity={0.6}
          toneMapped={false}
        />
      </mesh>

      {/* orbit rings -- three layers, different radii/speeds/colors for
          a richer "dramatic" feel instead of two static thin tori */}
      <OrbitRing radius={1.9} speed={0.25} tilt={[Math.PI / 2.3, 0, 0]} color="#22d3ee" opacity={0.45} thickness={0.008} />
      <OrbitRing radius={2.35} speed={-0.18} tilt={[Math.PI / 1.8, 0.5, 0]} color="#a855f7" opacity={0.3} thickness={0.006} />
      <OrbitRing radius={2.8} speed={0.12} tilt={[Math.PI / 2.1, -0.4, 0.3]} color="#38bdf8" opacity={0.18} thickness={0.004} />
    </group>
  );
}

function OrbitRing({ radius, speed, tilt, color, opacity, thickness }) {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.getElapsedTime();
      // precess the ring's tilt slowly over time -- visible motion, unlike
      // spinning a uniformly-colored torus around its own axis (which
      // produces no visible change since the ring has no asymmetry)
      ref.current.rotation.x = tilt[0] + Math.sin(t * speed) * 0.15;
      ref.current.rotation.y = tilt[1] + t * speed * 0.3;
      ref.current.rotation.z = tilt[2];
    }
  });
  return (
    <group ref={ref} rotation={tilt}>
      <mesh>
        <torusGeometry args={[radius, thickness, 8, 120]} />
        <meshBasicMaterial color={color} transparent opacity={opacity} toneMapped={false} />
      </mesh>
    </group>
  );
}

function Particles() {
  const count = 220;
  const { positions, sizes, seeds } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const siz = new Float32Array(count);
    const sd = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 11;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 7 - 1.5;
      siz[i] = Math.random() * 0.03 + 0.012;
      sd[i] = Math.random() * Math.PI * 2;
    }
    return { positions: pos, sizes: siz, seeds: sd };
  }, [count]);

  const ref = useRef();
  const matRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ref.current) ref.current.rotation.y = t * 0.012;
    if (matRef.current) {
      // gentle collective twinkle via opacity oscillation
      matRef.current.opacity = 0.45 + Math.sin(t * 1.4) * 0.12;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        ref={matRef}
        color="#5eead4"
        size={0.028}
        transparent
        opacity={0.5}
        sizeAttenuation
        toneMapped={false}
      />
    </points>
  );
}

// A second, sparser layer of larger "embers" drifting slowly, warm-toned
// against the cool envelope for contrast and a more dramatic depth feel.
function Embers() {
  const count = 28;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 7;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4 + 1;
    }
    return pos;
  }, [count]);

  const ref = useRef();
  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = -state.clock.getElapsedTime() * 0.02;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#a855f7"
        size={0.05}
        transparent
        opacity={0.35}
        sizeAttenuation
        toneMapped={false}
      />
    </points>
  );
}

function Scene3D() {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 2]}>
      {/* 3-point lighting: soft ambient fill, cyan key light, violet accent, blue fill from below */}
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 4, 5]} intensity={1.8} color="#22d3ee" />
      <pointLight position={[-5, -2, 3]} intensity={0.8} color="#a855f7" />
      <pointLight position={[0, -4, -3]} intensity={0.5} color="#38bdf8" />

      <Particles />
      <Embers />
      <Float speed={1.2} rotationIntensity={0} floatIntensity={0.4}>
        <Envelope />
      </Float>

      <EffectComposer>
        <Bloom
          intensity={0.9}
          luminanceThreshold={0.15}
          luminanceSmoothing={0.4}
          mipmapBlur
          radius={0.6}
        />
      </EffectComposer>
    </Canvas>
  );
}

// -------------------------------------------------------------------------
// CONTACT FORM
// -------------------------------------------------------------------------
function ContactForm() {
  const formRef = useRef();
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [values, setValues] = useState({ name: "", email: "", subject: "", message: "" });

  const handleChange = (e) => {
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY
      );
      setStatus("success");
      setValues({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 4000);
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs tracking-wide text-white/50 mb-2">
            YOUR NAME
          </label>
          <input
            type="text"
            name="name"
            required
            value={values.name}
            onChange={handleChange}
            placeholder="Jane Doe"
            className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 outline-none focus:border-cyan-400/50 focus:bg-white/[0.05] transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs tracking-wide text-white/50 mb-2">
            YOUR EMAIL
          </label>
          <input
            type="email"
            name="email"
            required
            value={values.email}
            onChange={handleChange}
            placeholder="jane@example.com"
            className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 outline-none focus:border-cyan-400/50 focus:bg-white/[0.05] transition-colors"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs tracking-wide text-white/50 mb-2">
          SUBJECT
        </label>
        <input
          type="text"
          name="subject"
          required
          value={values.subject}
          onChange={handleChange}
          placeholder="Let's build something"
          className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 outline-none focus:border-cyan-400/50 focus:bg-white/[0.05] transition-colors"
        />
      </div>

      <div>
        <label className="block text-xs tracking-wide text-white/50 mb-2">
          MESSAGE
        </label>
        <textarea
          name="message"
          required
          rows={5}
          value={values.message}
          onChange={handleChange}
          placeholder="Tell me about your project, timeline, and budget..."
          className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 outline-none focus:border-cyan-400/50 focus:bg-white/[0.05] transition-colors resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium text-sm rounded-xl py-3.5 transition-all shadow-lg shadow-cyan-500/20"
      >
        {status === "sending" && (
          <>
            <Loader2 size={16} className="animate-spin" />
            Sending...
          </>
        )}
        {status === "success" && (
          <>
            <CheckCircle2 size={16} />
            Message Sent
          </>
        )}
        {status === "error" && (
          <>
            <AlertCircle size={16} />
            Failed — Try Again
          </>
        )}
        {status === "idle" && (
          <>
            <Send size={16} />
            Send Message
          </>
        )}
      </button>

      {status === "success" && (
        <p className="text-center text-xs text-emerald-400/80">
          Thanks for reaching out — I'll get back to you soon.
        </p>
      )}
      {status === "error" && (
        <p className="text-center text-xs text-red-400/80">
          Something went wrong. Please try again or email me directly.
        </p>
      )}
    </form>
  );
}

// -------------------------------------------------------------------------
// PAGE
// -------------------------------------------------------------------------
export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#05070a] text-white relative overflow-hidden">
      {/* ambient glows */}
      <div className="absolute top-[10%] left-[10%] w-72 h-72 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[10%] w-72 h-72 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-[1150px] mx-auto px-6 pt-20 pb-24">
        {/* header */}
        <div className="text-center mb-16">
          <p className="text-cyan-400 text-xs tracking-[0.25em] font-semibold mb-3">
            GET IN TOUCH
          </p>
          <h1 className="text-6xl font-semibold tracking-tight mb-4">Contact</h1>
          <p className="text-white/50 max-w-md mx-auto">
            Have a project in mind, or just want to say hi? Drop a message
            below and I'll respond within a day or two.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* LEFT: 3D scene + contact info */}
          <div>
            <div className="h-[360px] -mb-4">
              <Scene3D />
            </div>

            <div className="space-y-4 mt-2">
              <div className="flex items-center gap-3 bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5">
                <div className="w-9 h-9 rounded-lg bg-cyan-400/10 border border-cyan-400/25 flex items-center justify-center text-cyan-400 flex-shrink-0">
                  <Mail size={16} />
                </div>
                <div>
                  <p className="text-xs text-white/40">Email</p>
                  <p className="text-sm text-white/85">anshsharma20118@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5">
                <div className="w-9 h-9 rounded-lg bg-purple-400/10 border border-purple-400/25 flex items-center justify-center text-purple-400 flex-shrink-0">
                  <MapPin size={16} />
                </div>
                <div>
                  <p className="text-xs text-white/40">Location</p>
                  <p className="text-sm text-white/85">India · Greater Noida</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: form */}
          <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}