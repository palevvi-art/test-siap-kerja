import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, Play, RotateCcw } from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import PageMeta from "@/components/PageMeta";

function generateColumn(length = 24): number[] {
  return Array.from({ length }, () => Math.floor(Math.random() * 9) + 1);
}

const DURATION_SECONDS = 180;

export default function StandaloneKoranDigital() {
  const [phase, setPhase] = useState<"intro" | "running" | "done">("intro");
  const [column, setColumn] = useState<number[]>(() => generateColumn());
  const [currentPair, setCurrentPair] = useState(0);
  const [timeLeft, setTimeLeft] = useState(DURATION_SECONDS);
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);

  const timerRef = useRef<number | null>(null);
  const startedAtRef = useRef(0);
  const lastPromptAtRef = useRef(0);
  const responsesRef = useRef<number[]>([]);

  const accuracy = useMemo(() => {
    const total = correct + incorrect;
    return total === 0 ? 0 : Math.round((correct / total) * 100);
  }, [correct, incorrect]);

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, []);

  const resetColumn = () => {
    setColumn(generateColumn());
    setCurrentPair(0);
    lastPromptAtRef.current = Date.now();
  };

  const stopSession = () => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setPhase("done");
  };

  const startSession = () => {
    setCorrect(0);
    setIncorrect(0);
    setTimeLeft(DURATION_SECONDS);
    responsesRef.current = [];
    startedAtRef.current = Date.now();
    resetColumn();
    setPhase("running");

    timerRef.current = window.setInterval(() => {
      const elapsed = (Date.now() - startedAtRef.current) / 1000;
      const remaining = Math.max(0, DURATION_SECONDS - elapsed);
      setTimeLeft(Math.ceil(remaining));
      if (remaining <= 0) stopSession();
    }, 250);
  };

  const handleAnswer = (digit: number) => {
    const a = column[currentPair];
    const b = column[currentPair + 1];
    const answer = (a + b) % 10;
    const isCorrect = digit === answer;
    responsesRef.current.push(Date.now() - lastPromptAtRef.current);
    if (isCorrect) setCorrect((value) => value + 1);
    else setIncorrect((value) => value + 1);

    if (currentPair + 2 >= column.length - 1) {
      resetColumn();
    } else {
      setCurrentPair((value) => value + 1);
      lastPromptAtRef.current = Date.now();
    }
  };

  const averageResponse = responsesRef.current.length
    ? Math.round(responsesRef.current.reduce((sum, value) => sum + value, 0) / responsesRef.current.length)
    : 0;

  const a = column[currentPair] ?? 0;
  const b = column[currentPair + 1] ?? 0;
  const visibleStart = Math.max(0, currentPair - 1);
  const visibleEnd = Math.min(column.length, currentPair + 6);

  return (
    <Layout>
      <PageMeta
        title="Tes Koran Digital | KognitiF"
        description="Tes koran digital terpisah untuk melatih ritme hitung, konsistensi, dan ketelitian numerik secara berulang."
        canonicalPath="/eksplorasi/koran-digital"
      />
      <div className="container mx-auto max-w-3xl px-6 py-10">
        <Link
          to="/tes"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Kembali ke Pilih Tes
        </Link>

        {phase === "intro" && (
          <div className="rounded-2xl border border-border bg-card p-8 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">Tes Tambahan</p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground">Tes Koran Digital</h1>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-muted-foreground">
              Versi terpisah dari latihan utama untuk melatih ritme penjumlahan berulang, ketahanan fokus,
              dan kestabilan akurasi dalam format yang lebih panjang.
            </p>
            <div className="mt-8 grid gap-3 md:grid-cols-3">
              {[
                { label: "Durasi", value: "3 menit" },
                { label: "Format", value: "Penjumlahan vertikal" },
                { label: "Fokus", value: "Konsistensi hitung" },
              ].map((item) => (
                <div key={item.label} className="rounded-xl border border-border bg-background px-4 py-4">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">{item.label}</p>
                  <p className="mt-2 text-sm font-semibold text-foreground">{item.value}</p>
                </div>
              ))}
            </div>
            <button
              onClick={startSession}
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-foreground px-6 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90"
            >
              <Play className="h-4 w-4" />
              Mulai Tes Koran
            </button>
          </div>
        )}

        {phase === "running" && (
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Sesi Aktif</p>
                <h1 className="mt-1 text-xl font-semibold text-foreground">Tes Koran Digital</h1>
              </div>
              <div className="rounded-lg border border-border bg-background px-4 py-2 text-right">
                <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Waktu</p>
                <p className="text-lg font-mono font-semibold text-foreground">
                  {Math.floor(timeLeft / 60)}:{`${timeLeft % 60}`.padStart(2, "0")}
                </p>
              </div>
            </div>

            <div className="mb-6 grid gap-3 sm:grid-cols-3">
              {[
                { label: "Benar", value: correct },
                { label: "Salah", value: incorrect },
                { label: "Akurasi", value: `${accuracy}%` },
              ].map((item) => (
                <div key={item.label} className="rounded-xl border border-border bg-background px-4 py-4">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">{item.label}</p>
                  <p className="mt-2 text-xl font-semibold text-foreground">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="mb-6 rounded-2xl border border-border bg-background p-6">
              <p className="mb-4 text-sm text-muted-foreground">Jumlahkan dua angka aktif, lalu masukkan digit satuannya.</p>
              <div className="flex justify-center">
                <div className="min-w-[96px] rounded-xl border border-border bg-card px-6 py-5">
                  {column.slice(visibleStart, visibleEnd).map((num, index) => {
                    const actualIndex = visibleStart + index;
                    const active = actualIndex === currentPair || actualIndex === currentPair + 1;
                    return (
                      <div
                        key={actualIndex}
                        className={`text-center font-mono text-2xl leading-10 ${
                          active ? "font-bold text-primary" : "text-muted-foreground/35"
                        }`}
                      >
                        {num}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="mt-5 flex items-center justify-center gap-2 text-lg font-mono text-foreground">
                <span className="font-bold text-primary">{a}</span>
                <span>+</span>
                <span className="font-bold text-primary">{b}</span>
                <span>=</span>
                <span className="text-muted-foreground">?</span>
              </div>
            </div>

            <div className="grid grid-cols-5 gap-2 sm:max-w-sm sm:mx-auto">
              {Array.from({ length: 10 }, (_, digit) => (
                <button
                  key={digit}
                  onClick={() => handleAnswer(digit)}
                  className="rounded-xl border border-border bg-background py-3 text-lg font-mono text-foreground transition-colors hover:border-primary hover:bg-accent"
                >
                  {digit}
                </button>
              ))}
            </div>
          </div>
        )}

        {phase === "done" && (
          <div className="rounded-2xl border border-border bg-card p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">Selesai</p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground">Ringkasan Tes Koran</h1>
            <div className="mt-8 grid gap-3 sm:grid-cols-4">
              {[
                { label: "Benar", value: correct },
                { label: "Salah", value: incorrect },
                { label: "Akurasi", value: `${accuracy}%` },
                { label: "Rata-rata", value: averageResponse ? `${averageResponse} ms` : "—" },
              ].map((item) => (
                <div key={item.label} className="rounded-xl border border-border bg-background px-4 py-4">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">{item.label}</p>
                  <p className="mt-2 text-xl font-semibold text-foreground">{item.value}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm leading-7 text-muted-foreground">
              Gunakan sesi ini untuk melihat apakah ritme hitung dan akurasi Anda tetap stabil saat tugas terasa monoton dan repetitif.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={startSession}
                className="inline-flex items-center gap-2 rounded-lg bg-foreground px-5 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90"
              >
                <RotateCcw className="h-4 w-4" />
                Ulangi Tes
              </button>
              <Link
                to="/tes"
                className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
              >
                Kembali ke Pilih Tes
              </Link>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
