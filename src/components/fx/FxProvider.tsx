"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

type FxState = {
  scanlines: boolean;
  matrix: boolean;
  breach: boolean;
  paletteOpen: boolean;
  toggleScanlines: () => void;
  toggleMatrix: () => void;
  triggerBreach: () => void;
  setPaletteOpen: (v: boolean) => void;
};

const FxContext = createContext<FxState | null>(null);

export function FxProvider({ children }: { children: React.ReactNode }) {
  const [scanlines, setScanlines] = useState(true);
  const [matrix, setMatrix] = useState(true);
  const [breach, setBreach] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const breachTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // load persisted fx prefs
  useEffect(() => {
    try {
      const raw = localStorage.getItem("amdjad.fx");
      if (!raw) return;
      const parsed = JSON.parse(raw) as { scanlines?: boolean; matrix?: boolean };
      if (typeof parsed.scanlines === "boolean") setScanlines(parsed.scanlines);
      if (typeof parsed.matrix === "boolean") setMatrix(parsed.matrix);
    } catch {
      /* ignore */
    }
  }, []);

  // persist fx prefs
  useEffect(() => {
    try {
      localStorage.setItem("amdjad.fx", JSON.stringify({ scanlines, matrix }));
    } catch {
      /* ignore */
    }
  }, [scanlines, matrix]);

  const toggleScanlines = useCallback(() => setScanlines((v) => !v), []);
  const toggleMatrix = useCallback(() => setMatrix((v) => !v), []);

  const triggerBreach = useCallback(() => {
    setBreach(true);
    if (breachTimer.current) clearTimeout(breachTimer.current);
    breachTimer.current = setTimeout(() => setBreach(false), 6000);
  }, []);

  useEffect(
    () => () => {
      if (breachTimer.current) clearTimeout(breachTimer.current);
    },
    []
  );

  return (
    <FxContext.Provider
      value={{
        scanlines,
        matrix,
        breach,
        paletteOpen,
        toggleScanlines,
        toggleMatrix,
        triggerBreach,
        setPaletteOpen,
      }}
    >
      {children}
    </FxContext.Provider>
  );
}

export function useFx() {
  const ctx = useContext(FxContext);
  if (!ctx) throw new Error("useFx must be used inside <FxProvider>");
  return ctx;
}
