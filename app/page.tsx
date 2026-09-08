"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { AmbientDecor } from "@/components/AmbientDecor";
import { PhotoGate } from "@/components/PhotoGate";
import { LetterScene } from "@/components/LetterScene";
import { SurpriseHub } from "@/components/SurpriseHub";

type Step = "gate" | "letter" | "hub";

export default function Home() {
  // À chaque ouverture/rechargement du site, on recommence toujours par
  // l'identification photo. Rien n'est mémorisé dans localStorage.
  const [step, setStep] = useState<Step>("gate");

  function go(next: Step) {
    // On garde la progression uniquement pendant cette visite.
    // Dès que la page est rechargée/rouverte, React repart de "gate".
    setStep(next);
  }

  return (
    <main className="site-shell">
      <AmbientDecor />
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          className="page-layer"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.6 }}
        >
          {step === "gate" && <PhotoGate onComplete={() => go("letter")} />}
          {step === "letter" && <LetterScene onContinue={() => go("hub")} />}
          {step === "hub" && <SurpriseHub />}
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
