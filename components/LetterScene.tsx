"use client";

import { motion } from "framer-motion";
import { letterText } from "@/data/content";

type Props = { onContinue: () => void };

const sparkles = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  top: `${8 + (i * 7) % 72}%`,
  left: `${6 + (i * 11) % 84}%`,
  delay: i * 0.12,
  duration: 2.2 + (i % 4) * 0.35
}));

const hearts = Array.from({ length: 7 }, (_, i) => ({
  id: i,
  top: `${18 + (i * 10) % 52}%`,
  delay: i * 0.2,
  size: 18 + (i % 3) * 4
}));

export function LetterScene({ onContinue }: Props) {
  return (
    <section className="letter-stage">
      <div className="letter-sparkles" aria-hidden="true">
        {sparkles.map((sparkle) => (
          <motion.span
            key={sparkle.id}
            className="letter-sparkle"
            style={{ top: sparkle.top, left: sparkle.left }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: [0.2, 1, 0.2], scale: [0.7, 1.15, 0.75], rotate: [0, 18, 0] }}
            transition={{ duration: sparkle.duration, delay: sparkle.delay, repeat: Infinity, ease: "easeInOut" }}
          >
            ✦
          </motion.span>
        ))}
      </div>

      <motion.div
        className="sam-letter-avatar"
        initial={{ x: "-95vw", y: 60, opacity: 0, rotate: -10, scale: 0.92 }}
        animate={{ x: 0, y: [0, -10, 0], opacity: 1, rotate: [0, 2, 0], scale: 1 }}
        transition={{
          x: { type: "spring", stiffness: 64, damping: 16, duration: 1.8 },
          opacity: { duration: 0.55 },
          rotate: { duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 1.4 },
          y: { duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 1.4 },
          scale: { duration: 0.9 }
        }}
      >
        <img src="/assets/sam.png" alt="Avatar de Sam" />

        {hearts.map((heart) => (
          <motion.span
            key={heart.id}
            className="flying-heart"
            style={{ top: heart.top, fontSize: `${heart.size}px` }}
            initial={{ x: 10, opacity: 0, scale: 0.8 }}
            animate={{ x: [0, 26, 56], y: [0, -14, -36], opacity: [0, 0.95, 0], scale: [0.8, 1, 1.06] }}
            transition={{ duration: 2.7, delay: 1.1 + heart.delay, repeat: Infinity, ease: "easeOut" }}
          >
            ♡
          </motion.span>
        ))}

        <motion.div
          className="carried-envelope"
          initial={{ y: -30, rotate: -18, opacity: 0 }}
          animate={{ y: [0, -7, 0], rotate: [-8, 5, -8], opacity: 1 }}
          transition={{ duration: 2.5, delay: 0.7, repeat: Infinity, ease: "easeInOut" }}
        >
          ♡
        </motion.div>
      </motion.div>

      <motion.div
        className="envelope-wrap"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.65, duration: 0.9 }}
      >
        <motion.div
          className="envelope"
          initial={{ scale: 0.88, rotate: -2 }}
          animate={{ scale: 1, rotate: [0, 1.5, 0] }}
          transition={{
            scale: { duration: 0.7, delay: 0.85 },
            rotate: { duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1.55 }
          }}
        >
          <motion.div
            className="envelope-flap"
            initial={{ rotateX: 0 }}
            animate={{ rotateX: [-2, -12, -2] }}
            transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut", delay: 1.6 }}
          />
          <div className="heart-seal">♡</div>
        </motion.div>

        <motion.article
          className="letter-paper"
          initial={{ y: 170, scaleY: 0.15, opacity: 0, rotateX: -18 }}
          animate={{ y: -28, scaleY: 1, opacity: 1, rotateX: 0 }}
          transition={{ delay: 1.45, duration: 1.25, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="letter-kicker"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.05, duration: 0.55 }}
          >
            Pour toi, mon amour
          </motion.div>
          {letterText.split("\n").map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.18 + i * 0.08, duration: 0.42 }}
            >
              {line || "\u00A0"}
            </motion.p>
          ))}
          <motion.div
            className="letter-signature"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.65, duration: 0.55 }}
          >
            Sam ♡
          </motion.div>
          <motion.button
            className="gold-button compact"
            onClick={onContinue}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.8, duration: 0.4 }}
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Continuer ♡
          </motion.button>
        </motion.article>
      </motion.div>
    </section>
  );
}
