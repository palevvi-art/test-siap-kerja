import { useState, useEffect, useCallback, useRef } from "react";
import TestWrapper from "@/components/TestWrapper";

function generateSimpleQ() {
  const isAdd = Math.random() > 0.4;
  let a: number, b: number, answer: number;
  if (isAdd) {
    a = Math.floor(Math.random() * 20) + 1;
    b = Math.floor(Math.random() * 20) + 1;
    answer = a + b;
  } else {
    a = Math.floor(Math.random() * 20) + 10;
    b = Math.floor(Math.random() * a) + 1;
    answer = a - b;
  }
  const options = [answer];
  while (options.length < 4) {
    const off = Math.floor(Math.random() * 6) - 3;
    const wrong = answer + (off === 0 ? (Math.random() > 0.5 ? 1 : -1) : off);
    if (!options.includes(wrong) && wrong >= 0) options.push(wrong);
  }
  options.sort(() => Math.random() - 0.5);
  return { text: `${a} ${isAdd ? "+" : "−"} ${b}`, answer, options };
}

const QUESTION_TIME_MS = 4000;

const QuickMathTest = () => (
  <TestWrapper
    testType="hitung-cepat"
    testName="Tes Hitung Cepat"
    description="Penjumlahan dan pengurangan dengan batas waktu ketat per soal. Mengukur kecepatan respon."
    durationSeconds={150}
    segmentDurationSeconds={30}
    initialPhase="trial-intro"
  >
      {({ onResponse, isRunning }) => <QuickMathEngine onResponse={onResponse} isRunning={isRunning} />}

  </TestWrapper>
);

function QuickMathEngine({ onResponse, isRunning }: { onResponse: (c: boolean, t: number) => void; isRunning: boolean }) {
  const [q, setQ] = useState(generateSimpleQ);
  const [timeBar, setTimeBar] = useState(100);
  const showTimeRef = useRef(Date.now());
  const autoTimerRef = useRef<number | null>(null);
  const barTimerRef = useRef<number | null>(null);

  const next = useCallback(() => {
    setQ(generateSimpleQ());
    showTimeRef.current = Date.now();
    setTimeBar(100);
  }, []);

  const clearTimers = useCallback(() => {
    if (autoTimerRef.current) clearTimeout(autoTimerRef.current);
    if (barTimerRef.current) clearInterval(barTimerRef.current);
  }, []);

  useEffect(() => {
    if (!isRunning) { clearTimers(); return; }
    next();
  }, [isRunning]);

  useEffect(() => {
    if (!isRunning) return;
    clearTimers();

    barTimerRef.current = window.setInterval(() => {
      const elapsed = Date.now() - showTimeRef.current;
      setTimeBar(Math.max(0, 100 - (elapsed / QUESTION_TIME_MS) * 100));
    }, 50);

    autoTimerRef.current = window.setTimeout(() => {
      onResponse(false, QUESTION_TIME_MS);
      next();
    }, QUESTION_TIME_MS);

    return clearTimers;
  }, [q, isRunning]);

  const handleAnswer = (opt: number) => {
    clearTimers();
    onResponse(opt === q.answer, Date.now() - showTimeRef.current);
    next();
  };

  return (
    <div className="text-center">
      <div className="h-1 bg-muted rounded-full mb-6 overflow-hidden max-w-xs mx-auto">
        <div
          className="h-full bg-primary rounded-full transition-all duration-100"
          style={{ width: `${timeBar}%` }}
        />
      </div>
      <p className="text-4xl font-mono font-bold text-foreground mb-8">{q.text} = ?</p>
      <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto">
        {q.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleAnswer(opt)}
            className="py-3 rounded-lg border-2 text-lg font-mono hover:border-primary hover:bg-accent transition-colors text-foreground"
          >
            {opt}
          </button>
        ))}
      </div>
      <p className="text-xs text-muted-foreground mt-4">Soal berganti otomatis dalam {QUESTION_TIME_MS / 1000} detik</p>
    </div>
  );
}

export default QuickMathTest;
