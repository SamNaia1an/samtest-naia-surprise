"use client";

import { motion } from "framer-motion";
import { finalFlowerMessage } from "@/data/content";

const petals = Array.from({ length: 42 }, (_, i) => ({
  left: `${(i * 19) % 100}%`,
  delay: (i % 14) * 0.18,
  duration: 4.4 + (i % 8) * 0.42,
  drift: -65 + (i % 11) * 13,
  size: 10 + (i % 6) * 3
}));

const glows = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  top: `${10 + (i * 11) % 70}%`,
  left: `${5 + (i * 13) % 88}%`,
  delay: i * 0.2
}));

export function FlowersSurprise({ onClose }: { onClose: () => void }) {
  return (
    <div className="surprise-overlay">
      {petals.map((p, i) => (
        <motion.span
          key={i}
          className="petal"
          style={{ left: p.left, width: p.size, height: p.size * 0.62 }}
          initial={{ y: -100, rotate: 0, opacity: 0 }}
          animate={{ y: "112vh", x: [0, p.drift, p.drift / 2], rotate: 420, opacity: [0, 1, 1, 0] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "linear" }}
        />
      ))}

      <div className="ambient-glow-field" aria-hidden="true">
        {glows.map((glow) => (
          <motion.span
            key={glow.id}
            className="ambient-glow"
            style={{ top: glow.top, left: glow.left }}
            animate={{ opacity: [0.15, 0.55, 0.15], scale: [0.8, 1.2, 0.9] }}
            transition={{ duration: 2.8, delay: glow.delay, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      <button className="close-button" onClick={onClose}>×</button>
      <motion.div className="surprise-scene" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <motion.div
          className="sam-gift-figure"
          initial={{ x: -220, y: 30, opacity: 0, rotate: -5 }}
          animate={{ x: 0, y: [0, -8, 0], opacity: 1, rotate: [0, 1.4, 0] }}
          transition={{
            x: { type: "spring", damping: 16, stiffness: 66 },
            opacity: { duration: 0.55 },
            y: { duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 1.1 },
            rotate: { duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 1.1 }
          }}
        >
          <img src="/assets/sam.png" alt="Sam" />
          <motion.div
            className="bouquet"
            initial={{ scale: 0, rotate: -18, opacity: 0 }}
            animate={{ scale: 1, rotate: [-4, 4, -4], opacity: 1 }}
            transition={{ delay: 0.55, duration: 1.1, rotate: { duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: 1.4 } }}
          >
            <span>✿</span><span>❀</span><span>✿</span><span>❁</span><span>❀</span>
          </motion.div>
        </motion.div>
        <motion.div
          className="speech-card"
          initial={{ y: 28, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ delay: 0.95, duration: 0.6 }}
        >
          <div className="speech-small">Sam a quelque chose à te dire…</div>
          <div className="speech-main">{finalFlowerMessage}</div>
          <button className="gold-button compact" onClick={onClose}>J'arrive ♡</button>
        </motion.div>
      </motion.div>
    </div>
  );
}
