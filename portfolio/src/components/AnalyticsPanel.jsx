import { motion, AnimatePresence } from "framer-motion";
import { FiActivity, FiX } from "react-icons/fi";
import { useEffect, useState } from "react";
import { listenVisits } from "../firebase";

const AnalyticsPanel = ({ open, setOpen }) => {
  const [visits, setVisits] = useState([]);

  useEffect(() => {
    const unsub = listenVisits((data) => {
      setVisits(data);
    });

    return () => unsub();
  }, []);

  // 🔥 REAL STATS CALCULATION
  const totalVisits = visits.length;

  // 📅 last 30 days (simple version)
  const thisMonth = visits.filter((v) => {
    const date = v.timestamp?.toDate?.() || new Date(v.timestamp);
    const now = new Date();
    return date.getMonth() === now.getMonth();
  }).length;

  // 🌍 country breakdown
  const countryMap = {};

  visits.forEach((v) => {
    const country = v.country || "Unknown";
    countryMap[country] = (countryMap[country] || 0) + 1;
  });

  const countryData = Object.entries(countryMap).map(([name, count]) => ({
    name,
    percent: totalVisits ? Math.round((count / totalVisits) * 100) : 0,
  }));

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* BACKDROP */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[998]"
          />

          {/* PANEL */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 80 }}
            className="fixed top-0 right-0 h-full w-[360px] bg-[#0a0f1a]/95 backdrop-blur-xl border-l border-white/10 z-[999] p-6"
          >
            {/* HEADER */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2 text-white">
                <FiActivity className="text-[#00d9ff]" />
                <span className="font-semibold">Live Analytics</span>
              </div>

              <button onClick={() => setOpen(false)}>
                <FiX className="text-white/50 hover:text-white" />
              </button>
            </div>

            {/* STATS (REAL NOW) */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                <p className="text-white/40 text-xs">THIS MONTH</p>
                <h3 className="text-green-400 text-xl font-bold">
                  {thisMonth}
                </h3>
                <p className="text-white/30 text-xs">views</p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                <p className="text-white/40 text-xs">ALL TIME</p>
                <h3 className="text-cyan-400 text-xl font-bold">
                  {totalVisits}
                </h3>
                <p className="text-white/30 text-xs">views</p>
              </div>
            </div>

            {/* COUNTRIES (REAL) */}
            <div className="mb-6">
              <p className="text-white/30 text-xs mb-3 uppercase">
                Countries
              </p>

              {countryData.length === 0 && (
                <p className="text-white/40 text-xs">No data yet...</p>
              )}

              {countryData.map((c, i) => (
                <div key={i} className="mb-3">
                  <div className="flex justify-between text-xs text-white/50">
                    <span>{c.name}</span>
                    <span>{c.percent}%</span>
                  </div>

                  <div className="h-[3px] bg-white/10 mt-1 rounded">
                    <div
                      className="h-full bg-[#00d9ff]"
                      style={{ width: `${c.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AnalyticsPanel;