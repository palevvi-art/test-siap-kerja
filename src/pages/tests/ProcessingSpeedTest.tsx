import { useState, useEffect, useCallback, useRef } from "react";
import TestWrapper from "@/components/TestWrapper";

function generateMathQ() {
  const ops = ["+", "-", "×"] as const;
  const op = ops[Math.floor(Math.random() * ops.length)];
  let a: number, b: number, answer: number;
  switch (op) {
    case "+":
      a = Math.floor(Math.random() * 50) + 10;
      b = Math.floor(Math.random() * 50) + 10;
      answer = a + b;
      break;
    case "-":
      a = Math.floor(Math.random() * 50) + 30;
      b = Math.floor(Math.random() * 30) + 1;
      answer = a - b;
      break;
    case "×":
      a = Math.floor(Math.random() * 12) + 2;
      b = Math.floor(Math.random() * 12) + 2;
      answer = a * b;
      break;
  }
  const options = [answer!];
  while (options.length < 4) {
    const off = Math.floor(Math.random() * 20) - 10;
    const wrong = answer! + (off === 0 ? 1 : off);
    if (!options.includes(wrong) && wrong >= 0) options.push(wrong);
  }
  options.sort(() => Math.random() - 0.5);
  return { text: `${a!} ${op} ${b!} = ?`, answer: answer!, options };
}

const ProcessingSpeedTest = () => {
  return (
    <TestWrapper
      testType="kecepatan-pemrosesan"
      testName="Tes Kecepatan Hitung"
      description="Menyelesaikan perhitungan dasar secepat mungkin di bawah tekanan waktu."
      durationSeconds={150}
      segmentDurationSeconds={30}
    >
      {({ onResponse, isRunning }) => <MathEngine onResponse={onResponse} isRunning={isRunning} />}

    </TestWrapper>
  );
};

function MathEngine({ onResponse, isRunning }: { onResponse: (c: boolean, t: number) => void; isRunning: boolean }) {
  const [q, setQ] = useState(generateMathQ);
  const showTimeRef = useRef(Date.now());

  const next = useCallback(() => {
    setQ(generateMathQ());
    showTimeRef.current = Date.now();
  }, []);

  useEffect(() => { if (isRunning) next(); }, [isRunning]);

  const handleAnswer = (opt: number) => {
    onResponse(opt === q.answer, Date.now() - showTimeRef.current);
    next();
  };

  return (
    <div className="text-center">
      <p className="text-4xl font-mono font-bold text-foreground mb-8">{q.text}</p>
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
    </div>
  );
}

export default ProcessingSpeedTest;
