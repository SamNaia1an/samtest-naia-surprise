"use client";

import { motion } from "framer-motion";
import { finalBookMessage } from "@/data/content";

const sparkles = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  top: `${8 + (i * 8) % 76}%`,
  left: `${8 + (i * 9) % 84}%`,
  delay: i * 0.16
}));

export function BookSurprise({ onClose }: { onClose: () => void }) {
  return (
    <div className="surprise-overlay book-mode">
      <button className="close-button" onClick={onClose}>×</button>
      <div className="sparkle-field" aria-hidden="true">✦　⋆　♡　✧　⋆　✦　♡</div>
      <div className="book-sparkles" aria-hidden="true">
        {sparkles.map((sparkle) => (
          <motion.span
            key={sparkle.id}
            className="book-sparkle"
            style={{ top: sparkle.top, left: sparkle.left }}
            animate={{ opacity: [0.18, 1, 0.18], scale: [0.7, 1.2, 0.7], rotate: [0, 22, 0] }}
            transition={{ duration: 2.5, delay: sparkle.delay, repeat: Infinity, ease: "easeInOut" }}
          >
            ✦
          </motion.span>
        ))}
      </div>
      <motion.div className="surprise-scene" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <motion.div
          className="sam-gift-figure book-figure"
          initial={{ y: 88, opacity: 0, scale: 0.94 }}
          animate={{ y: [0, -8, 0], opacity: 1, scale: 1 }}
          transition={{
            opacity: { duration: 0.55 },
            scale: { duration: 0.55 },
            y: { type: "spring", damping: 16, stiffness: 76, duration: 0.9, repeat: Infinity, repeatDelay: 1.8 }
          }}
        >
          <img src="/assets/sam.png" alt="Sam" />
          <motion.div
            className="book-prop"
            initial={{ rotateY: -70, scale: 0.6, rotate: 12, opacity: 0 }}
            animate={{ rotateY: 0, scale: 1, rotate: [5, -2, 5], opacity: 1, y: [0, -8, 0] }}
            transition={{
              opacity: { delay: 0.45, duration: 0.35 },
              scale: { delay: 0.45, duration: 0.9 },
              rotateY: { delay: 0.45, duration: 0.9 },
              rotate: { duration: 3.1, repeat: Infinity, ease: "easeInOut", delay: 1.2 },
              y: { duration: 3.1, repeat: Infinity, ease: "easeInOut", delay: 1.2 }
            }}
          >
            <img src="/assets/book-cover.png" alt="Couverture du livre" />
          </motion.div>
        </motion.div>
        <motion.div className="speech-card" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.95 }}>
          <div className="speech-main medium">{finalBookMessage}</div>
          <button className="gold-button compact" onClick={onClose}>♡</button>
        </motion.div>
      </motion.div>
    </div>
  );
}
