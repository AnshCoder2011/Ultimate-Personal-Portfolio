import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Preloader from "./components/loader/Preloader";
import CustomCursor from "./components/CustomCursor";

import Navbar from "./components/Navbar";
import AnalyticsPanel from "./components/AnalyticsPanel";

import Home from "./pages/Home";
import ProjectsMultiple from "./pages/ProjectsMultiple";
import Skills from "./pages/Skills";
import { trackVisit } from "./firebase";
import PersonaPage from "./pages/Persona";
import Nova from "./pages/Nova";
import ContactPage from "./pages/ContactPage";

const App = () => {
// ⏳ TEMPORARILY DISABLED LOADER FOR FAST DEV CHANGES
  const [loading, setLoading] = useState(true); 
  const [isMounted, setIsMounted] = useState(false);
  const [analyticsOpen, setAnalyticsOpen] = useState(false);

  const location = useLocation();

  // 🧠 Mount safety (prevents white flash)
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 📊 Visit tracking (run once)
  useEffect(() => {
    const alreadyTracked = sessionStorage.getItem("visited");

    if (!alreadyTracked) {
      fetch("https://ipapi.co/json/")
        .then((res) => res.json())
        .then((data) => {
          trackVisit({
            country: data.country_name,
            ip: data.ip,
            page: window.location.pathname,
          });

          sessionStorage.setItem("visited", "true");
        });
    }
  }, []);

  // 💀 prevent render until mounted (no white flash)
  if (!isMounted) {
    return <div className="fixed inset-0 bg-[#0a0a0a]" />;
  }

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] overflow-hidden cursor-none select-none">
      
      {/* 🎯 CUSTOM CURSOR (GLOBAL) */}
      <CustomCursor />

      <AnimatePresence>
        {loading && (
          <Preloader key="loader" onFinish={() => setLoading(false)} />
        )}
      </AnimatePresence> 
     

      {/* 🚀 MAIN APP (Rendering immediately) */}
      {!loading && (
        <>
          {/* NAVBAR */}
          <Navbar hidden={analyticsOpen} />

          {/* ROUTES WITH ANIMATIONS */}
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              <Routes location={location}>
                <Route path="/" element={<Home />} />
                <Route path="/projects" element={<ProjectsMultiple />} />
                <Route path="/skills" element={<Skills />} />
                <Route path="/persona" element={<PersonaPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/ai" element={<Nova />} />
              </Routes>
            </motion.div>
          </AnimatePresence>

          {/* FOOTER */}
          {/* <Footer setAnalyticsOpen={setAnalyticsOpen} /> */}

          {/* ANALYTICS */}
          <AnalyticsPanel
            open={analyticsOpen}
            setOpen={setAnalyticsOpen}
          />
        </>
      )}
    </div>
  );
};

export default App;