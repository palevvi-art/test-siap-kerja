import { useState, useEffect, useCallback, useRef } from "react";
import TestWrapper from "@/components/TestWrapper";

function generatePair(difficulty: number): { left: string; right: string; same: boolean } {
  const len = Math.min(4 + Math.floor(difficulty / 5), 10);
  const digits = Array.from({ length: len }, () => Math.floor(Math.random() * 10)).join("");

  if (Math.random() > 0.45) {
    // different — change 1-2 positions
    const arr = digits.split("");
    const changes = difficulty > 10 ? 1 : (Math.random() > 0.5 ? 1 : 2);
    for (let c = 0; c < changes; c++) {
      const pos = Math.floor(Math.random() * len);
      let newDigit: string;
      do { newDigit = String(Math.floor(Math.random() * 10)); } while (newDigit === arr[pos]);
      arr[pos] = newDigit;
    }
    return { left: digits, right: arr.join(""), same: false };
  }
  return { left: digits, right: digits, same: true };
}

const NumberAccuracyTest = () => (
  <TestWrapper
    testType="ketelitian-angka"
    testName="Ketelitian Angka"
    description="Bandingkan dua deret angka. Tentukan apakah keduanya sama atau berbeda."
    durationSeconds={180}
    segmentDurationSeconds={30}
    initialPhase="trial-intro"
  >
      {({ onResponse, isRunning }) => <NumberAccuracyEngine onResponse={onResponse} isRunning={isRunning} />}

  </TestWrapper>
);

function NumberAccuracyEngine({ onResponse, isRunning }: { onResponse: (c: boolean, t: number) => void; isRunning: boolean }) {
  const [pair, setPair] = useState(() => generatePair(0));
  const showTimeRef = useRef(Date.now());
  const countRef = useRef(0);

  const next = useCallback(() => {
    countRef.current += 1;
    setPair(generatePair(countRef.current));
    showTimeRef.current = Date.now();
  }, []);

  useEffect(() => { if (isRunning) { countRef.current = 0; next(); } }, [isRunning]);

  const handleAnswer = (answeredSame: boolean) => {
    onResponse(answeredSame === pair.same, Date.now() - showTimeRef.current);
    next();
  };

  return (
    <div className="text-center">
      <p className="text-sm text-muted-foreground mb-6">Apakah dua deret angka berikut sama atau berbeda?</p>

      <div className="flex items-center justify-center gap-6 mb-8">
        <div className="bg-card border rounded-lg px-6 py-4 min-w-[120px]">
          <p className="text-2xl font-mono font-bold tracking-widest text-foreground">{pair.left}</p>
        </div>
        <span className="text-muted-foreground text-xl">⟷</span>
        <div className="bg-card border rounded-lg px-6 py-4 min-w-[120px]">
          <p className="text-2xl font-mono font-bold tracking-widest text-foreground">{pair.right}</p>
        </div>
      </div>

      <div className="flex gap-3 justify-center max-w-xs mx-auto">
        <button
          onClick={() => handleAnswer(true)}
          className="flex-1 py-3 rounded-lg border-2 text-lg font-medium hover:border-primary hover:bg-accent transition-colors text-foreground"
        >
          Sama
        </button>
        <button
          onClick={() => handleAnswer(false)}
          className="flex-1 py-3 rounded-lg border-2 text-lg font-medium hover:border-primary hover:bg-accent transition-colors text-foreground"
        >
          Berbeda
        </button>
      </div>
    </div>
  );
}

export default NumberAccuracyTest;
