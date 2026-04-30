import { useState, useEffect, useCallback, useRef } from "react";
import TestWrapper from "@/components/TestWrapper";

function generateColumn(): number[] {
  return Array.from({ length: 20 }, () => Math.floor(Math.random() * 9) + 1);
}

const KraepelinTest = () => {
  return (
    <TestWrapper
      testType="kraepelin"
      testName="Tes Kraepelin Digital (Tes Koran)"
      description="Menjumlahkan angka secara vertikal untuk mengukur ketelitian dan konsistensi kerja."
      durationSeconds={180}
      segmentDurationSeconds={30}
      initialPhase="trial-intro"
    >
      {({ onResponse, isRunning }) => <KraepelinEngine onResponse={onResponse} isRunning={isRunning} />}

    </TestWrapper>
  );
};

function KraepelinEngine({ onResponse, isRunning }: { onResponse: (c: boolean, t: number) => void; isRunning: boolean }) {
  const [column, setColumn] = useState<number[]>(generateColumn);
  const [currentPair, setCurrentPair] = useState(0);
  const showTimeRef = useRef(Date.now());

  const resetColumn = useCallback(() => {
    setColumn(generateColumn());
    setCurrentPair(0);
    showTimeRef.current = Date.now();
  }, []);

  useEffect(() => { if (isRunning) resetColumn(); }, [isRunning]);

  const a = column[currentPair];
  const b = column[currentPair + 1];
  const correctAnswer = (a + b) % 10;

  const handleAnswer = (digit: number) => {
    onResponse(digit === correctAnswer, Date.now() - showTimeRef.current);
    showTimeRef.current = Date.now();
    if (currentPair + 2 >= column.length - 1) {
      resetColumn();
    } else {
      setCurrentPair(p => p + 1);
    }
  };

  // Show a few numbers in context
  const visibleStart = Math.max(0, currentPair - 1);
  const visibleEnd = Math.min(column.length, currentPair + 5);

  return (
    <div className="flex flex-col items-center">
      <p className="text-sm text-muted-foreground mb-4">Jumlahkan dua angka → masukkan digit satuan</p>
      
      <div className="bg-card border rounded-lg p-6 mb-6 min-w-[80px]">
        {column.slice(visibleStart, visibleEnd).map((num, i) => {
          const actualIdx = visibleStart + i;
          const isActive = actualIdx === currentPair || actualIdx === currentPair + 1;
          return (
            <div
              key={actualIdx}
              className={`text-center text-2xl font-mono py-1 ${
                isActive ? "text-primary font-bold" : "text-muted-foreground/40"
              }`}
            >
              {num}
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-2 mb-4 text-lg font-mono text-foreground">
        <span className="font-bold text-primary">{a}</span>
        <span>+</span>
        <span className="font-bold text-primary">{b}</span>
        <span>=</span>
        <span className="text-muted-foreground">?</span>
      </div>

      <div className="grid grid-cols-5 gap-2 max-w-xs">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((d) => (
          <button
            key={d}
            onClick={() => handleAnswer(d)}
            className="h-11 w-11 rounded-lg border-2 text-lg font-mono hover:border-primary hover:bg-accent transition-colors text-foreground"
          >
            {d}
          </button>
        ))}
      </div>
    </div>
  );
}

export default KraepelinTest;
