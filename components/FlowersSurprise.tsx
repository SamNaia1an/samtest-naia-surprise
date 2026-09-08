"use client";

import { motion } from "framer-motion";
import { finalFlowerMessage } from "@/data/content";

const petals = Array.from({ length: 34 }, (_, i) => ({
  left: `${(i * 31) % 100}%`,
  delay: (i % 11) * 0.28,
  duration: 5.2 + (i % 7) * 0.45,
  drift: -45 + (i % 9) * 12,
  size: 10 + (i % 5) * 3
}));

export function FlowersSurprise({ onClose }: { onClose: () => void }) {
  return (
    <div className="surprise-overlay">
      {petals.map((p, i) => (
        <motion.span
          key={i}
          className="petal"
          style={{ left: p.left, width: p.size, height: p.size * 0.62 }}
          initial={{ y: -80, rotate: 0, opacity: 0 }}
          animate={{ y: "110vh", x: p.drift, rotate: 420, opacity: [0, 1, 1, 0] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "linear" }}
        />
      ))}

      <button className="close-button" onClick={onClose}>×</button>
      <motion.div className="surprise-scene" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <motion.div className="sam-gift-figure" initial={{ x: -180, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ type: "spring", damping: 18, stiffness: 65 }}>
          <img src="/assets/sam.png" alt="Sam" />
          <motion.div className="bouquet" initial={{ scale: 0 }} animate={{ scale: 1, rotate: [-3, 3, -3] }} transition={{ delay: 0.7, duration: 1.2 }}>
            <span>✿</span><span>❀</span><span>✿</span><span>❁</span><span>❀</span>
          </motion.div>
        </motion.div>
        <motion.div className="speech-card" initial={{ y: 25, opacity: 0, scale: 0.9 }} animate={{ y: 0, opacity: 1, scale: 1 }} transition={{ delay: 1.15 }}>
          <div className="speech-small">Sam a quelque chose à te dire…</div>
          <div className="speech-main">{finalFlowerMessage}</div>
          <button className="gold-button compact" onClick={onClose}>J'arrive ♡</button>
        </motion.div>
      </motion.div>
    </div>
  );
}
