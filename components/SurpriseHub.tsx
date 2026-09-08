"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { surprises, Surprise } from "@/data/surprises";
import { UnlockCard } from "./UnlockCard";
import { FlowersSurprise } from "./FlowersSurprise";
import { BookSurprise } from "./BookSurprise";

function useServerClock() {
  const [now, setNow] = useState(new Date(0));
  const anchor = useRef<{ server: number; local: number } | null>(null);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    let syncTimer: ReturnType<typeof setInterval>;

    const sync = async () => {
      try {
        const res = await fetch("/api/time", { cache: "no-store" });
        const data = await res.json();
        anchor.current = { server: new Date(data.now).getTime(), local: Date.now() };
        setNow(new Date(anchor.current.server));
      } catch {
        anchor.current = { server: Date.now(), local: Date.now() };
        setNow(new Date());
      }
    };

    void sync();
    timer = setInterval(() => {
      if (!anchor.current) return;
      setNow(new Date(anchor.current.server + (Date.now() - anchor.current.local)));
    }, 1000);
    syncTimer = setInterval(sync, 60_000);
    return () => {
      clearInterval(timer);
      clearInterval(syncTimer);
    };
  }, []);

  return now;
}

type TestPreset = "real" | "morning" | "afternoon";

export function SurpriseHub() {
  const serverNow = useServerClock();
  const [active, setActive] = useState<Surprise | null>(null);
  const [testAuthorized, setTestAuthorized] = useState(false);
  const [testChecking, setTestChecking] = useState(false);
  const [testPreset, setTestPreset] = useState<TestPreset>("real");

  useEffect(() => {
    const key = new URLSearchParams(window.location.search).get("samtest");
    if (!key) return;

    let cancelled = false;
    setTestChecking(true);

    fetch("/api/test-mode", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
      body: JSON.stringify({ key })
    })
      .then(async (res) => {
        const data = (await res.json()) as { ok?: boolean };
        if (!cancelled) setTestAuthorized(Boolean(res.ok && data.ok));
      })
      .catch(() => {
        if (!cancelled) setTestAuthorized(false);
      })
      .finally(() => {
        if (!cancelled) setTestChecking(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const now = useMemo(() => {
    if (!testAuthorized || testPreset === "real") return serverNow;
    if (testPreset === "morning") return new Date("2026-11-27T07:35:10+01:00");
    return new Date("2026-11-27T15:00:10+01:00");
  }, [serverNow, testAuthorized, testPreset]);

  const modeLabel = testPreset === "morning"
    ? "Simulation : 27 novembre, 07:35"
    : testPreset === "afternoon"
      ? "Simulation : 27 novembre, 15:00"
      : "Heure réelle du serveur";

  return (
    <section className="hub-stage">
      <motion.div className="hub-heading" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
        <div className="eyebrow">Une journée rien que pour toi</div>
        <h1 className="display-title">La journée n'est pas encore terminée… ♡</h1>
        <p className="soft-copy">Chaque petite carte s'ouvrira au bon moment.</p>
      </motion.div>

      <div className="avatar-pair" aria-hidden="true">
        <motion.img src="/assets/naia.png" alt="" initial={{ x: -12, opacity: 0 }} animate={{ x: 0, opacity: 1 }} />
        <motion.img src="/assets/sam.png" alt="" initial={{ x: 12, opacity: 0 }} animate={{ x: 0, opacity: 1 }} />
      </div>

      {testAuthorized && (
        <motion.aside
          className="sam-test-panel"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <div className="sam-test-badge">MODE TEST SAM</div>
          <div className="sam-test-label">{modeLabel}</div>
          <div className="sam-test-actions">
            <button className={testPreset === "real" ? "active" : ""} onClick={() => setTestPreset("real")}>Heure réelle</button>
            <button className={testPreset === "morning" ? "active" : ""} onClick={() => setTestPreset("morning")}>Tester 07:35</button>
            <button className={testPreset === "afternoon" ? "active" : ""} onClick={() => setTestPreset("afternoon")}>Tester 15:00</button>
          </div>
          <div className="sam-test-note">Ce panneau n'apparaît que si la clé secrète est correcte.</div>
        </motion.aside>
      )}

      {!testAuthorized && testChecking && (
        <div className="sam-test-checking">Vérification du mode test…</div>
      )}

      <div className="unlock-grid">
        {surprises.map((s) => (
          <UnlockCard key={s.id} surprise={s} now={now} onOpen={() => setActive(s)} />
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
