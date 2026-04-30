import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import TestWrapper from "@/components/TestWrapper";

const ARROWS = ["↑", "→", "↓", "←"] as const;

interface MemoryQuestion {
  sequence: string[];
  answer: string;
  options: string[];
}

function buildOption(sequence: string[], offset: number) {
  return sequence
    .map((item, index) => ARROWS[(ARROWS.indexOf(item as (typeof ARROWS)[number]) + offset + index) % ARROWS.length])
    .join(" ");
}

function generateQuestion(length: number): MemoryQuestion {
  const sequence = Array.from({ length }, () => ARROWS[Math.floor(Math.random() * ARROWS.length)]);
  const answer = sequence.join(" ");
  const options = new Set<string>([answer]);

  while (options.size < 4) {
    options.add(buildOption(sequence, Math.floor(Math.random() * 3) + 1));
  }

  return {
    sequence,
    answer,
    options: [...options].sort(() => Math.random() - 0.5),
  };
}

const VisualMemorySequenceTest = () => (
  <TestWrapper
    testType="memori-visual"
    testName="Tes Memori Visual"
    description="Mengingat urutan simbol arah untuk mengukur memori visual jangka pendek."
    durationSeconds={180}
    segmentDurationSeconds={30}
    initialPhase="trial-intro"
  >
    {({ onResponse, isRunning }) => (
      <VisualMemorySequenceEngine onResponse={onResponse} isRunning={isRunning} />
    )}
  </TestWrapper>
);

function VisualMemorySequenceEngine({
  onResponse,
  isRunning,
}: {
  onResponse: (correct: boolean, responseTimeMs: number) => void;
  isRunning: boolean;
}) {
  const [length, setLength] = useState(3);
  const [question, setQuestion] = useState<MemoryQuestion>(() => generateQuestion(3));
  const [phase, setPhase] = useState<"show" | "answer">("show");
  const [index, setIndex] = useState(0);
  const startedAt = useRef(Date.now());

  const sequencePreview = useMemo(() => question.sequence.slice(0, index + 1), [index, question.sequence]);

  const next = useCallback(
    (nextLength: number) => {
      setQuestion(generateQuestion(nextLength));
      setPhase("show");
      setIndex(0);
    },
    [],
  );

  useEffect(() => {
    if (isRunning) {
      setLength(3);
      next(3);
    }
  }, [isRunning, next]);

  useEffect(() => {
    if (phase !== "show") {
      return;
    }

    if (index >= question.sequence.length) {
      startedAt.current = Date.now();
      setPhase("answer");
      return;
    }

    const timer = window.setTimeout(() => setIndex((value) => value + 1), 650);
    return () => window.clearTimeout(timer);
  }, [index, phase, question.sequence.length]);

  const handleAnswer = (option: string) => {
    const correct = option === question.answer;
    onResponse(correct, Date.now() - startedAt.current);
    const nextLength = correct ? Math.min(length + 1, 6) : Math.max(length - 1, 3);
    setLength(nextLength);
    next(nextLength);
  };

  return (
    <div className="text-center">
      {phase === "show" ? (
        <>
          <p className="mb-4 text-sm text-muted-foreground">Perhatikan urutan simbol berikut:</p>
          <div className="flex min-h-28 items-center justify-center rounded-lg border border-border bg-card px-6 py-8 text-4xl font-semibold tracking-[0.25em] text-primary">
            {sequencePreview.join(" ")}
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Simbol {Math.min(index, question.sequence.length)} dari {question.sequence.length}
          </p>
        </>
      ) : (
        <>
          <p className="mb-4 text-sm text-muted-foreground">Pilih urutan yang sama persis:</p>
          <div className="grid gap-3">
            {question.options.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => handleAnswer(option)}
                className="rounded-lg border border-border bg-card px-4 py-4 text-lg font-semibold tracking-[0.2em] text-foreground transition-colors hover:border-primary hover:bg-accent"
              >
                {option}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default VisualMemorySequenceTest;
