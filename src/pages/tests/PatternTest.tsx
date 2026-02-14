import { useState, useEffect, useCallback } from "react";
import TestWrapper from "@/components/TestWrapper";

// Generate a pattern: sequence of shapes/colors with a rule
function generatePatternQuestion() {
  const shapes = ["●", "■", "▲", "◆", "★"];
  const patternLen = 3;
  const baseIdx = Math.floor(Math.random() * shapes.length);
  const pattern: string[] = [];
  for (let i = 0; i < patternLen; i++) {
    pattern.push(shapes[(baseIdx + i) % shapes.length]);
  }
  // Repeat pattern twice, then ask for next
  const sequence = [...pattern, ...pattern];
  const answer = shapes[(baseIdx) % shapes.length]; // next in pattern
  const options = [answer];
  while (options.length < 4) {
    const s = shapes[Math.floor(Math.random() * shapes.length)];
    if (!options.includes(s)) options.push(s);
  }
  // Shuffle options
  options.sort(() => Math.random() - 0.5);
  return { sequence, answer, options };
}

const PatternTest = () => {
  return (
    <TestWrapper
      testType="pengenalan-pola"
      testName="Tes Logika Pola"
      description="Mengidentifikasi dan melanjutkan pola visual untuk mengukur kemampuan analisis."
      durationSeconds={180}
      segmentDurationSeconds={30}
    >
      {({ onResponse, isRunning }) => <PatternEngine onResponse={onResponse} isRunning={isRunning} />}
    </TestWrapper>
  );
};

function PatternEngine({ onResponse, isRunning }: { onResponse: (c: boolean, t: number) => void; isRunning: boolean }) {
  const [question, setQuestion] = useState(generatePatternQuestion);
  const [showTime, setShowTime] = useState(Date.now());

  const next = useCallback(() => {
    setQuestion(generatePatternQuestion());
    setShowTime(Date.now());
  }, []);

  useEffect(() => {
    if (isRunning) next();
  }, [isRunning]);

  const handleAnswer = (opt: string) => {
    const time = Date.now() - showTime;
    onResponse(opt === question.answer, time);
    next();
  };

  return (
    <div className="text-center">
      <p className="text-sm text-muted-foreground mb-3">Apa simbol berikutnya?</p>
      <div className="flex items-center justify-center gap-3 text-3xl mb-8 tracking-widest">
        {question.sequence.map((s, i) => (
          <span key={i} className="text-foreground">{s}</span>
        ))}
        <span className="text-primary font-bold">?</span>
      </div>
      <div className="flex justify-center gap-3">
        {question.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleAnswer(opt)}
            className="h-14 w-14 rounded-lg border-2 text-xl hover:border-primary hover:bg-accent transition-colors flex items-center justify-center text-foreground"
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

export default PatternTest;
