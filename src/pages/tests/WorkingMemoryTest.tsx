import { useState, useEffect, useCallback, useRef } from "react";
import TestWrapper from "@/components/TestWrapper";

const WorkingMemoryTest = () => {
  return (
    <TestWrapper
      testType="daya-ingat"
      testName="Tes Daya Ingat Angka"
      description="Mengingat dan mengulang urutan angka untuk mengukur kapasitas daya ingat kerja."
      durationSeconds={180}
      segmentDurationSeconds={30}
    >
      {({ onResponse, isRunning }) => <MemoryEngine onResponse={onResponse} isRunning={isRunning} />}
    </TestWrapper>
  );
};

function generateSequence(length: number): number[] {
  return Array.from({ length }, () => Math.floor(Math.random() * 10));
}

function MemoryEngine({ onResponse, isRunning }: { onResponse: (c: boolean, t: number) => void; isRunning: boolean }) {
  const [phase, setPhase] = useState<"show" | "input">("show");
  const [sequence, setSequence] = useState<number[]>([]);
  const [seqLength, setSeqLength] = useState(4);
  const [input, setInput] = useState("");
  const [showIndex, setShowIndex] = useState(0);
  const showTimeRef = useRef(Date.now());

  const startRound = useCallback(() => {
    const seq = generateSequence(seqLength);
    setSequence(seq);
    setPhase("show");
    setShowIndex(0);
    setInput("");
  }, [seqLength]);

  useEffect(() => {
    if (isRunning) startRound();
  }, [isRunning]);

  // Show digits one by one
  useEffect(() => {
    if (phase !== "show") return;
    if (showIndex >= sequence.length) {
      showTimeRef.current = Date.now();
      setPhase("input");
      return;
    }
    const timer = setTimeout(() => setShowIndex(i => i + 1), 700);
    return () => clearTimeout(timer);
  }, [phase, showIndex, sequence.length]);

  const handleSubmit = () => {
    const time = Date.now() - showTimeRef.current;
    const correct = input === sequence.join("");
    onResponse(correct, time);
    if (correct) setSeqLength(l => Math.min(l + 1, 9));
    else setSeqLength(l => Math.max(l - 1, 3));
    startRound();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div className="text-center">
      {phase === "show" && (
        <div>
          <p className="text-sm text-muted-foreground mb-6">Perhatikan angka berikut:</p>
          <div className="text-5xl font-mono font-bold text-primary h-20 flex items-center justify-center">
            {showIndex > 0 ? sequence[showIndex - 1] : ""}
          </div>
          <p className="text-xs text-muted-foreground mt-4">{showIndex}/{sequence.length}</p>
        </div>
      )}
      {phase === "input" && (
        <div>
          <p className="text-sm text-muted-foreground mb-4">Ketik urutan angka yang Anda ingat:</p>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value.replace(/\D/g, ""))}
            onKeyDown={handleKeyDown}
            autoFocus
            maxLength={sequence.length}
            className="text-center text-2xl font-mono tracking-[0.5em] border-2 rounded-lg px-4 py-3 w-48 bg-card text-foreground focus:border-primary focus:outline-none transition-colors"
            placeholder={"_".repeat(sequence.length)}
          />
          <div className="mt-4">
            <button
              onClick={handleSubmit}
              className="gradient-primary text-primary-foreground px-6 py-2 rounded-lg font-medium text-sm hover:opacity-90 transition-opacity"
            >
              Kirim
            </button>
          </div>
          <p className="text-xs text-muted-foreground mt-3">{sequence.length} digit</p>
        </div>
      )}
    </div>
  );
}

export default WorkingMemoryTest;
