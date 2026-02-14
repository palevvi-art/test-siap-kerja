import { useState, useEffect, useCallback, useRef } from "react";
import TestWrapper from "@/components/TestWrapper";

function generateSimpleTask() {
  const a = Math.floor(Math.random() * 9) + 1;
  const b = Math.floor(Math.random() * 9) + 1;
  const answer = a + b;
  return { text: `${a} + ${b}`, answer };
}

const EnduranceTest = () => (
  <TestWrapper
    testType="ketahanan-tugas"
    testName="Tes Ketahanan Kerja"
    description="Tugas hitung berulang dalam durasi panjang untuk mengukur konsistensi dan daya tahan kerja."
    durationSeconds={240}
    segmentDurationSeconds={30}
  >
      {({ onResponse, isRunning }) => <EnduranceEngine onResponse={onResponse} isRunning={isRunning} />}

  </TestWrapper>
);

function EnduranceEngine({ onResponse, isRunning }: { onResponse: (c: boolean, t: number) => void; isRunning: boolean }) {
  const [task, setTask] = useState(generateSimpleTask);
  const [input, setInput] = useState("");
  const showTimeRef = useRef(Date.now());
  const inputRef = useRef<HTMLInputElement>(null);

  const next = useCallback(() => {
    setTask(generateSimpleTask());
    setInput("");
    showTimeRef.current = Date.now();
    setTimeout(() => inputRef.current?.focus(), 50);
  }, []);

  useEffect(() => { if (isRunning) next(); }, [isRunning]);

  const submit = useCallback(() => {
    const val = parseInt(input, 10);
    if (isNaN(val)) return;
    onResponse(val === task.answer, Date.now() - showTimeRef.current);
    next();
  }, [input, task.answer, onResponse, next]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") submit();
  };

  return (
    <div className="text-center">
      <p className="text-sm text-muted-foreground mb-6">Ketik jawaban dan tekan Enter</p>

      <p className="text-5xl font-mono font-bold text-foreground mb-8">{task.text} = ?</p>

      <div className="flex items-center justify-center gap-3 max-w-[200px] mx-auto">
        <input
          ref={inputRef}
          type="number"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-24 text-center text-2xl font-mono py-2 rounded-lg border-2 bg-card text-foreground focus:border-primary focus:outline-none transition-colors"
          autoFocus
        />
        <button
          onClick={submit}
          className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
        >
          OK
        </button>
      </div>
    </div>
  );
}

export default EnduranceTest;
