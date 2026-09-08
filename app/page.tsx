"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { AmbientDecor } from "@/components/AmbientDecor";
import { PhotoGate } from "@/components/PhotoGate";
import { LetterScene } from "@/components/LetterScene";
import { SurpriseHub } from "@/components/SurpriseHub";

type Step = "gate" | "letter" | "hub";

export default function Home() {
  const [step, setStep] = useState<Step>("gate");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const reset = new URLSearchParams(window.location.search).get("reset") === "1";
    if (reset) {
      localStorage.removeItem("sam-naia-step");
      setStep("gate");
    } else {
      const saved = localStorage.getItem("sam-naia-step") as Step | null;
      if (saved === "letter" || saved === "hub") setStep(saved);
    }
    setReady(true);
  }, []);

  function go(next: Step) {
    setStep(next);
    localStorage.setItem("sam-naia-step", next);
  }

  if (!ready) return null;

  return (
    <main className="site-shell">
      <AmbientDecor />
      <AnimatePresence mode="wait">
        <motion.div key={step} className="page-layer" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.6 }}>
          {step === "gate" && <PhotoGate onComplete={() => go("letter")} />}
          {step === "letter" && <LetterScene onContinue={() => go("hub")} />}
          {step === "hub" && <SurpriseHub />}
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
