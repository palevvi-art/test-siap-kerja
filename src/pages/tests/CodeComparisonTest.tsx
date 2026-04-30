import { useCallback, useEffect, useState } from "react";
import TestWrapper from "@/components/TestWrapper";

interface CodeQuestion {
  left: string;
  right: string;
  answer: "sama" | "beda";
}

const CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

function buildCode() {
  return Array.from({ length: 6 }, () => CHARS[Math.floor(Math.random() * CHARS.length)]).join("");
}

function generateQuestion(): CodeQuestion {
  const left = buildCode();
  const identical = Math.random() > 0.5;

  if (identical) {
    return { left, right: left, answer: "sama" };
  }

  const chars = left.split("");
  const changeIndex = Math.floor(Math.random() * chars.length);
  let replacement = chars[changeIndex];
  while (replacement === chars[changeIndex]) {
    replacement = CHARS[Math.floor(Math.random() * CHARS.length)];
  }
  chars[changeIndex] = replacement;
  return { left, right: chars.join(""), answer: "beda" };
}

const CodeComparisonTest = () => (
  <TestWrapper
    testType="pemeriksaan-kode"
    testName="Tes Pemeriksaan Kode"
    description="Membandingkan dua kode alfanumerik untuk mengukur ketelitian visual dan spotting error."
    durationSeconds={180}
    segmentDurationSeconds={30}
    initialPhase="trial-intro"
  >
    {({ onResponse, isRunning }) => (
      <CodeComparisonEngine onResponse={onResponse} isRunning={isRunning} />
    )}
  </TestWrapper>
);

function CodeComparisonEngine({
  onResponse,
  isRunning,
}: {
  onResponse: (correct: boolean, responseTimeMs: number) => void;
  isRunning: boolean;
}) {
  const [question, setQuestion] = useState(generateQuestion);
  const [shownAt, setShownAt] = useState(Date.now());

  const next = useCallback(() => {
    setQuestion(generateQuestion());
    setShownAt(Date.now());
  }, []);

  useEffect(() => {
    if (isRunning) {
      next();
    }
  }, [isRunning, next]);

  const handleAnswer = (answer: "sama" | "beda") => {
    onResponse(answer === question.answer, Date.now() - shownAt);
    next();
  };

  return (
    <div className="text-center">
      <p className="mb-5 text-sm text-muted-foreground">Apakah kedua kode ini sama persis?</p>
      <div className="mb-6 grid gap-3 rounded-lg border border-border bg-card p-5 text-3xl font-semibold tracking-[0.25em] text-foreground">
        <div>{question.left}</div>
        <div>{question.right}</div>
      </div>
      <div className="flex justify-center gap-3">
        <button
          type="button"
          onClick={() => handleAnswer("sama")}
          className="rounded-lg border border-border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:bg-accent"
        >
          Sama
        </button>
        <button
          type="button"
          onClick={() => handleAnswer("beda")}
          className="rounded-lg border border-border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:bg-accent"
        >
          Beda
        </button>
      </div>
    </div>
  );
}

export default CodeComparisonTest;
