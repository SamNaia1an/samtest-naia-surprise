"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { surprises, Surprise } from "@/data/surprises";
import { UnlockCard } from "./UnlockCard";
import { FlowersSurprise } from "./FlowersSurprise";
import { BookSurprise } from "./BookSurprise";

export function SurpriseHub() {
  const [active, setActive] = useState<Surprise | null>(null);

  return (
    <section className="hub-stage">
      <motion.div
        className="hub-heading"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        <div className="eyebrow">Une journée rien que pour toi</div>
        <h1 className="display-title">Tes surprises t'attendent déjà… ♡</h1>
        <p className="soft-copy">Tu peux tout ouvrir maintenant.</p>
      </motion.div>

      <div className="avatar-pair" aria-hidden="true">
        <motion.img
          src="/assets/naia.png"
          alt=""
          initial={{ x: -12, opacity: 0, rotate: -3 }}
          animate={{ x: 0, opacity: 1, rotate: [0, -2, 0], y: [0, -4, 0] }}
          transition={{ opacity: { duration: 0.5 }, x: { duration: 0.45 }, rotate: { duration: 3, repeat: Infinity }, y: { duration: 3, repeat: Infinity } }}
        />
        <motion.img
          src="/assets/sam.png"
          alt=""
          initial={{ x: 12, opacity: 0, rotate: 3 }}
          animate={{ x: 0, opacity: 1, rotate: [0, 2, 0], y: [0, -4, 0] }}
          transition={{ opacity: { duration: 0.5 }, x: { duration: 0.45 }, rotate: { duration: 3, repeat: Infinity, delay: 0.25 }, y: { duration: 3, repeat: Infinity, delay: 0.25 } }}
        />
      </div>

      <div className="unlock-grid">
        {surprises.map((s) => (
          <UnlockCard key={s.id} surprise={s} onOpen={() => setActive(s)} />
        ))}
      </div>

      <div className="tiny-footer">Fait avec beaucoup trop d'amour par Sam. ♡</div>

      <AnimatePresence>
        {active?.kind === "flowers" && <FlowersSurprise onClose={() => setActive(null)} />}
        {active?.kind === "book" && <BookSurprise onClose={() => setActive(null)} />}
      </AnimatePresence>
    </section>
  );
}
