import { useCallback, useEffect, useRef, useState } from "react";
import TestWrapper from "@/components/TestWrapper";

const COLOR_OPTIONS = [
  { label: "Merah", className: "text-red-500", key: "merah" },
  { label: "Biru", className: "text-sky-500", key: "biru" },
  { label: "Hijau", className: "text-emerald-500", key: "hijau" },
  { label: "Kuning", className: "text-amber-500", key: "kuning" },
] as const;

function generateQuestion() {
  const word = COLOR_OPTIONS[Math.floor(Math.random() * COLOR_OPTIONS.length)];
  const color = COLOR_OPTIONS[Math.floor(Math.random() * COLOR_OPTIONS.length)];
  return { word, color };
}

const StroopFocusTest = () => (
  <TestWrapper
    testType="stroop-warna"
    testName="Tes Fokus Warna"
    description="Memilih warna teks yang tampil, bukan membaca katanya. Mengukur fokus dan kontrol impuls."
    durationSeconds={180}
    segmentDurationSeconds={30}
    initialPhase="trial-intro"
  >
    {({ onResponse, isRunning }) => (
      <StroopFocusEngine onResponse={onResponse} isRunning={isRunning} />
    )}
  </TestWrapper>
);

function StroopFocusEngine({
  onResponse,
  isRunning,
}: {
  onResponse: (correct: boolean, responseTimeMs: number) => void;
  isRunning: boolean;
}) {
  const [question, setQuestion] = useState(generateQuestion);
  const shownAt = useRef(Date.now());

  const next = useCallback(() => {
    setQuestion(generateQuestion());
    shownAt.current = Date.now();
  }, []);

  useEffect(() => {
    if (isRunning) {
      next();
    }
  }, [isRunning, next]);

  const handleAnswer = (key: string) => {
    onResponse(key === question.color.key, Date.now() - shownAt.current);
    next();
  };

  return (
    <div className="text-center">
      <p className="mb-4 text-sm text-muted-foreground">
        Pilih <span className="font-semibold text-foreground">warna teks</span>, bukan kata yang terbaca.
      </p>
      <div className={`mb-8 rounded-lg border border-border bg-card px-6 py-10 text-5xl font-bold ${question.color.className}`}>
        {question.word.label}
      </div>
      <div className="grid grid-cols-2 gap-3">
        {COLOR_OPTIONS.map((option) => (
          <button
            key={option.key}
            type="button"
            onClick={() => handleAnswer(option.key)}
            className="rounded-lg border border-border px-4 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:bg-accent"
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default StroopFocusTest;
