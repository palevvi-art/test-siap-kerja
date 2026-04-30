import { Navigate, useParams } from "react-router-dom";
import PatternTest from "./tests/PatternTest";
import WorkingMemoryTest from "./tests/WorkingMemoryTest";
import ProcessingSpeedTest from "./tests/ProcessingSpeedTest";
import KraepelinTest from "./tests/KraepelinTest";
import VisualAccuracyTest from "./tests/VisualAccuracyTest";
import SustainedFocusTest from "./tests/SustainedFocusTest";
import QuickMathTest from "./tests/QuickMathTest";
import NumberAccuracyTest from "./tests/NumberAccuracyTest";
import EnduranceTest from "./tests/EnduranceTest";
import VerbalReasoningTest from "./tests/VerbalReasoningTest";

const TEST_COMPONENTS = {
  "pengenalan-pola": PatternTest,
  "daya-ingat": WorkingMemoryTest,
  "kecepatan-pemrosesan": ProcessingSpeedTest,
  kraepelin: KraepelinTest,
  "ketelitian-visual": VisualAccuracyTest,
  "fokus-berkelanjutan": SustainedFocusTest,
  "hitung-cepat": QuickMathTest,
  "ketelitian-angka": NumberAccuracyTest,
  "ketahanan-tugas": EnduranceTest,
  "penalaran-verbal": VerbalReasoningTest,
} as const;

export default function TestRunner() {
  const { testId } = useParams<{ testId: keyof typeof TEST_COMPONENTS }>();

  if (!testId || !(testId in TEST_COMPONENTS)) {
    return <Navigate to="/tes" replace />;
  }

  const Component = TEST_COMPONENTS[testId];
  return <Component />;
}
