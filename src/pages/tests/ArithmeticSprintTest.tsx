import { useCallback, useEffect, useRef, useState } from "react";
import TestWrapper from "@/components/TestWrapper";

interface ArithmeticQuestion {
  text: string;
  answer: number;
  options: number[];
}

function shuffle<T>(items: T[]) {
  return [...items].sort(() => Math.random() - 0.5);
}

function generateQuestion(): ArithmeticQuestion {
  const type = Math.floor(Math.random() * 4);

  let text = "";
  let answer = 0;

  if (type === 0) {
    const a = Math.floor(Math.random() * 15) + 8;
    const b = Math.floor(Math.random() * 9) + 2;
    text = `${a} × ${b}`;
    answer = a * b;
  } else if (type === 1) {
    const b = Math.floor(Math.random() * 8) + 2;
    const answerBase = Math.floor(Math.random() * 15) + 4;
    const a = b * answerBase;
    text = `${a} ÷ ${b}`;
    answer = answerBase;
  } else if (type === 2) {
    const a = Math.floor(Math.random() * 70) + 20;
    const b = Math.floor(Math.random() * 18) + 2;
    text = `${a} − ${b}`;
    answer = a - b;
  } else {
    const a = Math.floor(Math.random() * 35) + 12;
    const b = Math.floor(Math.random() * 24) + 6;
    text = `${a} + ${b}`;
    answer = a + b;
  }

  const options = new Set<number>([answer]);
  while (options.size < 4) {
    const drift = Math.floor(Math.random() * 12) - 5;
    const value = answer + (drift === 0 ? 3 : drift);
    if (value >= 0) {
      options.add(value);
    }
  }

  return { text, answer, options: shuffle([...options]) };
}

const QUESTION_TIME_MS = 4500;

const ArithmeticSprintTest = () => (
  <TestWrapper
    testType="aritmetika-campuran"
    testName="Tes Aritmetika Campuran"
    description="Operasi hitung campuran berbasis waktu untuk mengukur kecepatan numerik dan akurasi."
    durationSeconds={180}
    segmentDurationSeconds={30}
    initialPhase="trial-intro"
  >
    {({ onResponse, isRunning }) => (
      <ArithmeticSprintEngine onResponse={onResponse} isRunning={isRunning} />
    )}
  </TestWrapper>
);

function ArithmeticSprintEngine({
  onResponse,
  isRunning,
}: {
  onResponse: (correct: boolean, responseTimeMs: number) => void;
  isRunning: boolean;
}) {
  const [question, setQuestion] = useState(generateQuestion);
  const [timeBar, setTimeBar] = useState(100);
  const shownAt = useRef(Date.now());
  const timeoutRef = useRef<number | null>(null);
  const intervalRef = useRef<number | null>(null);

  const clearTimers = useCallback(() => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
    }
  }, []);

  const next = useCallback(() => {
    setQuestion(generateQuestion());
    shownAt.current = Date.now();
    setTimeBar(100);
  }, []);

  useEffect(() => {
    if (!isRunning) {
      clearTimers();
      return;
    }

    next();
  }, [clearTimers, isRunning, next]);

  useEffect(() => {
    if (!isRunning) {
      return;
    }

    clearTimers();

    intervalRef.current = window.setInterval(() => {
      const elapsed = Date.now() - shownAt.current;
      setTimeBar(Math.max(0, 100 - (elapsed / QUESTION_TIME_MS) * 100));
    }, 50);

    timeoutRef.current = window.setTimeout(() => {
      onResponse(false, QUESTION_TIME_MS);
      next();
    }, QUESTION_TIME_MS);

    return clearTimers;
  }, [clearTimers, isRunning, next, onResponse, question]);

  const handleAnswer = (value: number) => {
    clearTimers();
    onResponse(value === question.answer, Date.now() - shownAt.current);
    next();
  };

  return (
    <div className="text-center">
      <div className="mx-auto mb-6 h-1 max-w-xs overflow-hidden rounded-full bg-muted">
        <div className="h-full rounded-full bg-primary transition-all duration-100" style={{ width: `${timeBar}%` }} />
      </div>
      <p className="mb-8 text-4xl font-semibold text-foreground">{question.text} = ?</p>
      <div className="mx-auto grid max-w-md grid-cols-2 gap-3">
        {question.options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => handleAnswer(option)}
            className="rounded-lg border-2 border-border px-4 py-4 text-lg font-semibold text-foreground transition-colors hover:border-primary hover:bg-accent"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ArithmeticSprintTest;
