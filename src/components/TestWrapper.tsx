import { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { SegmentData, saveResult, generateId } from "@/lib/storage";
import { Play, Square, SkipForward, CheckCircle2, XCircle } from "lucide-react";

interface TestWrapperProps {
  testType: string;
  testName: string;
  description: string;
  durationSeconds: number;
  segmentDurationSeconds: number;
  children: (props: {
    onResponse: (correct: boolean, responseTimeMs: number) => void;
    isRunning: boolean;
    isTrial: boolean;
    timeLeft: number;
    currentSegment: number;
  }) => React.ReactNode;
}

const TRIAL_COUNT = 5;

const TestWrapper = ({ testType, testName, description, durationSeconds, segmentDurationSeconds, children }: TestWrapperProps) => {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<"intro" | "trial-intro" | "trial" | "trial-done" | "running" | "done">("intro");
  const [timeLeft, setTimeLeft] = useState(durationSeconds);
  const [currentSegment, setCurrentSegment] = useState(1);
  const [trialCount, setTrialCount] = useState(0);
  const [trialFeedback, setTrialFeedback] = useState<"correct" | "incorrect" | null>(null);

  const timerRef = useRef<number | null>(null);
  const startTimeRef = useRef(0);
  const responsesRef = useRef<{ correct: boolean; time: number; segment: number }[]>([]);
  const feedbackTimerRef = useRef<number | null>(null);

  const stop = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setPhase("done");

    const responses = responsesRef.current;
    const totalResponses = responses.length;
    const correctResponses = responses.filter(r => r.correct).length;
    const accuracy = totalResponses > 0 ? Math.round((correctResponses / totalResponses) * 100) : 0;
    const avgTime = totalResponses > 0 ? Math.round(responses.reduce((s, r) => s + r.time, 0) / totalResponses) : 0;

    const segmentCount = Math.ceil(durationSeconds / segmentDurationSeconds);
    const segmentData: SegmentData[] = [];
    for (let i = 1; i <= segmentCount; i++) {
      const segR = responses.filter(r => r.segment === i);
      segmentData.push({
        segment: i,
        correct: segR.filter(r => r.correct).length,
        incorrect: segR.filter(r => !r.correct).length,
        avgTime: segR.length > 0 ? Math.round(segR.reduce((s, r) => s + r.time, 0) / segR.length) : 0,
      });
    }

    const elapsed = Math.round((Date.now() - startTimeRef.current) / 1000);
    const id = generateId();
    saveResult({
      id,
      testType,
      testName,
      date: new Date().toISOString(),
      duration: elapsed,
      totalResponses,
      correctResponses,
      accuracy,
      avgResponseTime: avgTime,
      segmentData,
    });

    navigate(`/hasil/${id}`);
  }, [durationSeconds, segmentDurationSeconds, testType, testName, navigate]);

  const startMain = useCallback(() => {
    setPhase("running");
    startTimeRef.current = Date.now();
    responsesRef.current = [];
    setCurrentSegment(1);
    setTimeLeft(durationSeconds);

    timerRef.current = window.setInterval(() => {
      const elapsed = (Date.now() - startTimeRef.current) / 1000;
      const remaining = Math.max(0, durationSeconds - elapsed);
      setTimeLeft(Math.ceil(remaining));
      setCurrentSegment(Math.min(Math.ceil(durationSeconds / segmentDurationSeconds), Math.floor(elapsed / segmentDurationSeconds) + 1));

      if (remaining <= 0) {
        stop();
      }
    }, 250);
  }, [durationSeconds, segmentDurationSeconds, stop]);

  const startTrial = useCallback(() => {
    setTrialCount(0);
    setTrialFeedback(null);
    setPhase("trial");
  }, []);

  const onTrialResponse = useCallback((correct: boolean, _responseTimeMs: number) => {
    setTrialFeedback(correct ? "correct" : "incorrect");
    if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
    feedbackTimerRef.current = window.setTimeout(() => setTrialFeedback(null), 600);

    setTrialCount(prev => {
      const next = prev + 1;
      if (next >= TRIAL_COUNT) {
        setTimeout(() => setPhase("trial-done"), 700);
      }
      return next;
    });
  }, []);

  const onResponse = useCallback((correct: boolean, responseTimeMs: number) => {
    const elapsed = (Date.now() - startTimeRef.current) / 1000;
    const seg = Math.floor(elapsed / segmentDurationSeconds) + 1;
    responsesRef.current.push({ correct, time: responseTimeMs, segment: seg });
  }, [segmentDurationSeconds]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* INTRO */}
        {phase === "intro" && (
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-foreground mb-2">{testName}</h1>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">{description}</p>
            <p className="text-sm text-muted-foreground mb-6">Durasi: ~{Math.ceil(durationSeconds / 60)} menit</p>
            <button
              onClick={() => setPhase("trial-intro")}
              className="gradient-primary inline-flex items-center gap-2 text-primary-foreground px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              <Play className="h-4 w-4" />
              Mulai
            </button>
          </div>
        )}

        {/* TRIAL INTRO */}
        {phase === "trial-intro" && (
          <div className="text-center py-12">
            <div className="inline-block bg-accent text-accent-foreground text-xs font-semibold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">
              Latihan
            </div>
            <h2 className="text-xl font-bold text-foreground mb-3">Latihan Singkat</h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Latihan ini bertujuan untuk membantu Anda memahami cara pengerjaan. Hasil latihan tidak akan disimpan dan tidak mempengaruhi hasil tes.
            </p>
            <p className="text-sm text-muted-foreground mb-8">{TRIAL_COUNT} soal latihan</p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={startTrial}
                className="gradient-primary inline-flex items-center gap-2 text-primary-foreground px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                <Play className="h-4 w-4" />
                Mulai Latihan
              </button>
              <button
                onClick={startMain}
                className="inline-flex items-center gap-2 border rounded-lg px-6 py-3 font-medium text-muted-foreground hover:text-foreground hover:border-primary transition-colors"
              >
                <SkipForward className="h-4 w-4" />
                Lewati Latihan
              </button>
            </div>
          </div>
        )}

        {/* TRIAL RUNNING */}
        {phase === "trial" && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="inline-block bg-accent text-accent-foreground text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                Latihan (Tidak Dinilai)
              </div>
              <div className="text-sm text-muted-foreground font-medium">{trialCount}/{TRIAL_COUNT}</div>
            </div>
            {/* Trial progress */}
            <div className="h-1 bg-muted rounded-full mb-6 overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-300"
                style={{ width: `${(trialCount / TRIAL_COUNT) * 100}%` }}
              />
            </div>
            {/* Feedback flash */}
            {trialFeedback && (
              <div className={`flex items-center justify-center gap-2 mb-4 text-sm font-medium ${trialFeedback === "correct" ? "text-primary" : "text-destructive"}`}>
                {trialFeedback === "correct" ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                {trialFeedback === "correct" ? "Benar" : "Salah"}
              </div>
            )}
            {children({ onResponse: onTrialResponse, isRunning: true, isTrial: true, timeLeft: 0, currentSegment: 0 })}
          </div>
        )}

        {/* TRIAL DONE */}
        {phase === "trial-done" && (
          <div className="text-center py-12">
            <CheckCircle2 className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="text-xl font-bold text-foreground mb-3">Latihan selesai</h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Tes utama akan dimulai. Hasil mulai dari sini akan dicatat.
            </p>
            <button
              onClick={startMain}
              className="gradient-primary inline-flex items-center gap-2 text-primary-foreground px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              <Play className="h-4 w-4" />
              Mulai Tes
            </button>
          </div>
        )}

        {/* MAIN TEST RUNNING */}
        {phase === "running" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="text-sm text-muted-foreground">Segmen {currentSegment}</div>
              <div className="flex items-center gap-3">
                <div className="text-lg font-mono font-bold text-foreground">{formatTime(timeLeft)}</div>
                <button
                  onClick={stop}
                  className="p-1.5 rounded-md border text-muted-foreground hover:text-foreground transition-colors"
                  title="Hentikan"
                >
                  <Square className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="h-1 bg-muted rounded-full mb-6 overflow-hidden">
              <div
                className="h-full gradient-primary rounded-full transition-all duration-500"
                style={{ width: `${((durationSeconds - timeLeft) / durationSeconds) * 100}%` }}
              />
            </div>
            {children({ onResponse, isRunning: true, isTrial: false, timeLeft, currentSegment })}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default TestWrapper;
