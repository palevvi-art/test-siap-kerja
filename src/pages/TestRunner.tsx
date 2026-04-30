import { Suspense, lazy } from "react";
import { Navigate, useParams } from "react-router-dom";

const TEST_COMPONENTS = {
  "pengenalan-pola": lazy(() => import("./tests/PatternTest")),
  "deret-angka": lazy(() => import("./tests/SequenceReasoningTest")),
  "daya-ingat": lazy(() => import("./tests/WorkingMemoryTest")),
  "memori-visual": lazy(() => import("./tests/VisualMemorySequenceTest")),
  "kecepatan-pemrosesan": lazy(() => import("./tests/ProcessingSpeedTest")),
  "aritmetika-campuran": lazy(() => import("./tests/ArithmeticSprintTest")),
  kraepelin: lazy(() => import("./tests/KraepelinTest")),
  "ketelitian-visual": lazy(() => import("./tests/VisualAccuracyTest")),
  "pemeriksaan-kode": lazy(() => import("./tests/CodeComparisonTest")),
  "fokus-berkelanjutan": lazy(() => import("./tests/SustainedFocusTest")),
  "stroop-warna": lazy(() => import("./tests/StroopFocusTest")),
  "hitung-cepat": lazy(() => import("./tests/QuickMathTest")),
  "ketelitian-angka": lazy(() => import("./tests/NumberAccuracyTest")),
  "ketahanan-tugas": lazy(() => import("./tests/EnduranceTest")),
  "penalaran-verbal": lazy(() => import("./tests/VerbalReasoningTest")),
  "analogi-kata": lazy(() => import("./tests/WordAnalogyTest")),
} as const;

export default function TestRunner() {
  const { testId } = useParams<{ testId: keyof typeof TEST_COMPONENTS }>();

  if (!testId || !(testId in TEST_COMPONENTS)) {
    return <Navigate to="/tes" replace />;
  }

  const Component = TEST_COMPONENTS[testId];
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-background px-6">
          <div className="w-full max-w-sm rounded-lg border border-border bg-card px-5 py-4 text-center">
            <p className="text-sm font-semibold text-foreground">Memuat modul tes</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Menyiapkan sesi latihan dan komponen yang Anda butuhkan.
            </p>
          </div>
        </div>
      }
    >
      <Component />
    </Suspense>
  );
}
