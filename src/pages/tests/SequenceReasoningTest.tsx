import { useCallback, useEffect, useState } from "react";
import TestWrapper from "@/components/TestWrapper";

interface SequenceQuestion {
  prompt: string;
  answer: number;
  options: number[];
}

function shuffle<T>(items: T[]) {
  return [...items].sort(() => Math.random() - 0.5);
}

function generateArithmeticQuestion(): SequenceQuestion {
  const start = Math.floor(Math.random() * 12) + 3;
  const diff = Math.floor(Math.random() * 5) + 2;
  const sequence = Array.from({ length: 4 }, (_, index) => start + diff * index);
  const answer = start + diff * 4;
  const options = shuffle([answer, answer + diff, answer - diff, answer + diff + 2]);
  return { prompt: `${sequence.join(", ")}, ...`, answer, options };
}

function generateAlternatingQuestion(): SequenceQuestion {
  const start = Math.floor(Math.random() * 20) + 12;
  const minus = Math.floor(Math.random() * 4) + 1;
  const plus = Math.floor(Math.random() * 5) + 3;
  const sequence = [start];
  for (let index = 1; index < 5; index += 1) {
    const previous = sequence[index - 1];
    sequence.push(index % 2 === 1 ? previous - minus : previous + plus);
  }
  const answer = sequence[4] - minus;
  const options = shuffle([answer, answer + plus, answer - plus, answer + minus]);
  return { prompt: `${sequence.join(", ")}, ...`, answer, options };
}

function generateQuestion() {
  return Math.random() > 0.5 ? generateArithmeticQuestion() : generateAlternatingQuestion();
}

const SequenceReasoningTest = () => (
  <TestWrapper
    testType="deret-angka"
    testName="Tes Deret Angka"
    description="Melanjutkan pola angka untuk mengukur logika numerik dan kemampuan membaca aturan."
    durationSeconds={180}
    segmentDurationSeconds={30}
    initialPhase="trial-intro"
  >
    {({ onResponse, isRunning }) => (
      <SequenceReasoningEngine onResponse={onResponse} isRunning={isRunning} />
    )}
  </TestWrapper>
);

function SequenceReasoningEngine({
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

  const handleAnswer = (value: number) => {
    onResponse(value === question.answer, Date.now() - shownAt);
    next();
  };

  return (
    <div className="text-center">
      <p className="mb-3 text-sm text-muted-foreground">Angka berikutnya yang paling tepat adalah:</p>
      <div className="mb-8 rounded-lg border border-border bg-card px-6 py-8 text-4xl font-semibold tracking-tight text-foreground">
        {question.prompt}
      </div>
      <div className="grid max-w-md grid-cols-2 gap-3 mx-auto">
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

export default SequenceReasoningTest;
