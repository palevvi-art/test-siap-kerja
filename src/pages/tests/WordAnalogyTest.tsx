import { useCallback, useEffect, useState } from "react";
import TestWrapper from "@/components/TestWrapper";

interface AnalogyQuestion {
  prompt: string;
  answer: string;
  options: string[];
}

const ANALOGIES = [
  { left: "dokter", right: "rumah sakit", target: "guru", answer: "sekolah", distractors: ["pasar", "kantor", "kebun"] },
  { left: "api", right: "panas", target: "es", answer: "dingin", distractors: ["keras", "gelap", "tajam"] },
  { left: "pena", right: "menulis", target: "gunting", answer: "memotong", distractors: ["menghitung", "menyimpan", "mewarnai"] },
  { left: "pilot", right: "pesawat", target: "nahkoda", answer: "kapal", distractors: ["mobil", "stasiun", "jalan"] },
  { left: "mata", right: "melihat", target: "telinga", answer: "mendengar", distractors: ["menyentuh", "mencium", "berjalan"] },
  { left: "benih", right: "tanaman", target: "telur", answer: "ayam", distractors: ["bulu", "sarang", "paruh"] },
  { left: "murid", right: "belajar", target: "pelari", answer: "berlatih", distractors: ["beristirahat", "mengajar", "menonton"] },
  { left: "kompas", right: "arah", target: "termometer", answer: "suhu", distractors: ["jarak", "angin", "suara"] },
];

function generateQuestion(): AnalogyQuestion {
  const source = ANALOGIES[Math.floor(Math.random() * ANALOGIES.length)];
  const options = [source.answer, ...source.distractors].sort(() => Math.random() - 0.5);
  return {
    prompt: `${source.left} : ${source.right} = ${source.target} : ...`,
    answer: source.answer,
    options,
  };
}

const WordAnalogyTest = () => (
  <TestWrapper
    testType="analogi-kata"
    testName="Tes Analogi Kata"
    description="Melengkapi hubungan kata untuk mengukur penalaran verbal dan kecermatan melihat relasi."
    durationSeconds={240}
    segmentDurationSeconds={40}
    initialPhase="trial-intro"
  >
    {({ onResponse, isRunning }) => <WordAnalogyEngine onResponse={onResponse} isRunning={isRunning} />}
  </TestWrapper>
);

function WordAnalogyEngine({
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

  const handleAnswer = (option: string) => {
    onResponse(option === question.answer, Date.now() - shownAt);
    next();
  };

  return (
    <div className="text-center">
      <p className="mb-4 text-sm text-muted-foreground">Pilih kata yang paling melengkapi hubungan berikut:</p>
      <div className="mb-8 rounded-lg border border-border bg-card px-6 py-8 text-3xl font-semibold tracking-tight text-foreground">
        {question.prompt}
      </div>
      <div className="grid gap-3">
        {question.options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => handleAnswer(option)}
            className="rounded-lg border border-border px-4 py-4 text-left text-sm font-semibold text-foreground transition-colors hover:border-primary hover:bg-accent"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default WordAnalogyTest;
