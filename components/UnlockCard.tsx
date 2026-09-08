"use client";

import { motion } from "framer-motion";
import type { Surprise } from "@/data/surprises";

export function UnlockCard({ surprise, onOpen }: { surprise: Surprise; onOpen: () => void }) {
  return (
    <motion.button
      className="unlock-card is-unlocked"
      onClick={onOpen}
      whileHover={{ y: -6, scale: 1.015 }}
      whileTap={{ scale: 0.985 }}
      initial={{ opacity: 0, y: 18 }}
      animate={{
        opacity: 1,
        y: 0,
        boxShadow: [
          "0 14px 42px rgba(91,57,25,.09)",
          "0 18px 52px rgba(202,144,55,.25)",
          "0 14px 42px rgba(91,57,25,.09)"
        ]
      }}
      transition={{ duration: 0.65, boxShadow: { duration: 2.8, repeat: Infinity } }}
    >
      <div className="unlock-icon">♡</div>
      <div>
        <div className="available-now">Disponible maintenant</div>
        <h3>{surprise.title}</h3>
        <p>{surprise.subtitle}</p>
        <div className="open-hint">Ouvrir la surprise →</div>
      </div>
    </motion.button>
  );
}
