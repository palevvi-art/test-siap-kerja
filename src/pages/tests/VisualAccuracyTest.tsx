import { useState, useEffect, useCallback, useRef } from "react";
import TestWrapper from "@/components/TestWrapper";

const SYMBOLS = ["◆", "●", "■", "▲", "★", "◇", "○", "□", "△", "☆"];
const GRID_SIZE = 25;

function generateGrid(target: string) {
  const distractors = SYMBOLS.filter(s => s !== target);
  const grid: { symbol: string; isTarget: boolean }[] = [];
  const targetCount = Math.floor(Math.random() * 4) + 2;
  const targetPositions = new Set<number>();
  while (targetPositions.size < targetCount) {
    targetPositions.add(Math.floor(Math.random() * GRID_SIZE));
  }
  for (let i = 0; i < GRID_SIZE; i++) {
    if (targetPositions.has(i)) {
      grid.push({ symbol: target, isTarget: true });
    } else {
      grid.push({ symbol: distractors[Math.floor(Math.random() * distractors.length)], isTarget: false });
    }
  }
  return { grid, targetCount };
}

const VisualAccuracyTest = () => {
  return (
    <TestWrapper
      testType="ketelitian-visual"
      testName="Ketelitian Visual"
      description="Temukan dan klik semua simbol target yang muncul di antara distraktor."
      durationSeconds={180}
      segmentDurationSeconds={30}
    >
      {({ onResponse, isRunning }) => <VisualEngine onResponse={onResponse} isRunning={isRunning} />}

    </TestWrapper>
  );
};

function VisualEngine({ onResponse, isRunning }: { onResponse: (c: boolean, t: number) => void; isRunning: boolean }) {
  const [target] = useState(() => SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]);
  const [gridData, setGridData] = useState(() => generateGrid(target));
  const [clicked, setClicked] = useState<Set<number>>(new Set());
  const [found, setFound] = useState(0);
  const showTimeRef = useRef(Date.now());

  const nextGrid = useCallback(() => {
    setGridData(generateGrid(target));
    setClicked(new Set());
    setFound(0);
    showTimeRef.current = Date.now();
  }, [target]);

  useEffect(() => { if (isRunning) nextGrid(); }, [isRunning]);

  const handleClick = (idx: number) => {
    if (clicked.has(idx)) return;
    const cell = gridData.grid[idx];
    const newClicked = new Set(clicked);
    newClicked.add(idx);
    setClicked(newClicked);

    onResponse(cell.isTarget, Date.now() - showTimeRef.current);

    if (cell.isTarget) {
      const newFound = found + 1;
      setFound(newFound);
      if (newFound >= gridData.targetCount) {
        setTimeout(nextGrid, 300);
      }
    }
  };

  return (
    <div className="text-center">
      <p className="text-sm text-muted-foreground mb-2">
        Temukan semua: <span className="text-xl text-primary font-bold mx-1">{target}</span> ({found}/{gridData.targetCount})
      </p>
      <div className="grid grid-cols-5 gap-2 max-w-xs mx-auto mt-4">
        {gridData.grid.map((cell, i) => (
          <button
            key={i}
            onClick={() => handleClick(i)}
            disabled={clicked.has(i)}
            className={`h-12 w-12 rounded-lg border-2 text-lg flex items-center justify-center transition-colors ${
              clicked.has(i)
                ? cell.isTarget
                  ? "bg-accent border-primary text-primary"
                  : "bg-destructive/10 border-destructive/30 text-destructive"
                : "hover:border-primary text-foreground"
            }`}
          >
            {cell.symbol}
          </button>
        ))}
      </div>
    </div>
  );
}

export default VisualAccuracyTest;
