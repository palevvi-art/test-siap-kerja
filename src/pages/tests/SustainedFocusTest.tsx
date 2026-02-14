import { useState, useEffect, useCallback, useRef } from "react";
import TestWrapper from "@/components/TestWrapper";

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const TARGET_LETTER = "X";
const DISPLAY_MS = 800;
const BLANK_MS = 200;

const SustainedFocusTest = () => {
  return (
    <TestWrapper
      testType="fokus-berkelanjutan"
      testName="Tes Konsentrasi"
      description="Merespon stimulus tertentu dalam rangkaian cepat untuk mengukur fokus dan konsentrasi."
      durationSeconds={180}
      segmentDurationSeconds={30}
    >
      {({ onResponse, isRunning }) => <FocusEngine onResponse={onResponse} isRunning={isRunning} />}
    </TestWrapper>
  );
};

function FocusEngine({ onResponse, isRunning }: { onResponse: (c: boolean, t: number) => void; isRunning: boolean }) {
  const [currentLetter, setCurrentLetter] = useState("");
  const [showLetter, setShowLetter] = useState(false);
  const isTargetRef = useRef(false);
  const respondedRef = useRef(false);
  const showTimeRef = useRef(Date.now());
  const timerRef = useRef<number | null>(null);

  const nextLetter = useCallback(() => {
    // If previous was target and no response, count as miss
    if (isTargetRef.current && !respondedRef.current) {
      onResponse(false, DISPLAY_MS);
    }

    const isTarget = Math.random() < 0.25; // 25% chance target
    const letter = isTarget ? TARGET_LETTER : LETTERS[Math.floor(Math.random() * LETTERS.length)];
    isTargetRef.current = isTarget;
    respondedRef.current = false;
    setCurrentLetter(letter);
    setShowLetter(true);
    showTimeRef.current = Date.now();

    // Hide after display time, then show next
    timerRef.current = window.setTimeout(() => {
      setShowLetter(false);
      timerRef.current = window.setTimeout(nextLetter, BLANK_MS);
    }, DISPLAY_MS);
  }, [onResponse]);

  useEffect(() => {
    if (isRunning) {
      nextLetter();
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isRunning]);

  const handlePress = useCallback(() => {
    if (respondedRef.current) return;
    respondedRef.current = true;
    const time = Date.now() - showTimeRef.current;
    onResponse(isTargetRef.current, time);
  }, [onResponse]);

  // Keyboard support
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.key === " ") {
        e.preventDefault();
        handlePress();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [handlePress]);

  return (
    <div className="text-center">
      <p className="text-sm text-muted-foreground mb-6">
        Tekan tombol atau spasi hanya saat huruf <span className="font-bold text-primary">X</span> muncul.
      </p>
      <div className="h-32 flex items-center justify-center">
        {showLetter && (
          <span className={`text-7xl font-bold font-mono ${currentLetter === TARGET_LETTER ? "text-primary" : "text-foreground"}`}>
            {currentLetter}
          </span>
        )}
      </div>
      <button
        onClick={handlePress}
        className="mt-6 gradient-primary text-primary-foreground px-10 py-4 rounded-xl text-lg font-semibold hover:opacity-90 transition-opacity active:scale-95"
      >
        TEKAN
      </button>
      <p className="text-xs text-muted-foreground mt-3">Atau tekan Spasi di keyboard</p>
    </div>
  );
}

export default SustainedFocusTest;
