import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import PageMeta from "@/components/PageMeta";

type MbtiAxis = "EI" | "SN" | "TF" | "JP";

interface MbtiQuestion {
  axis: MbtiAxis;
  leftCode: string;
  rightCode: string;
  prompt: string;
  leftLabel: string;
  rightLabel: string;
}

const MBTI_QUESTIONS: MbtiQuestion[] = [
  { axis: "EI", leftCode: "E", rightCode: "I", prompt: "Saat energi menurun, Anda biasanya...", leftLabel: "mencari orang atau suasana ramai", rightLabel: "mencari waktu sendiri untuk recharge" },
  { axis: "EI", leftCode: "E", rightCode: "I", prompt: "Ketika berdiskusi, Anda lebih nyaman...", leftLabel: "berpikir sambil bicara", rightLabel: "berpikir dulu baru bicara" },
  { axis: "EI", leftCode: "E", rightCode: "I", prompt: "Pada acara baru, Anda cenderung...", leftLabel: "mudah membuka percakapan", rightLabel: "mengamati dulu sebelum ikut masuk" },
  { axis: "EI", leftCode: "E", rightCode: "I", prompt: "Cara terbaik memulihkan fokus adalah...", leftLabel: "interaksi yang aktif", rightLabel: "ruang tenang tanpa distraksi" },
  { axis: "SN", leftCode: "S", rightCode: "N", prompt: "Saat belajar hal baru, Anda lebih suka...", leftLabel: "contoh konkret dan langkah jelas", rightLabel: "gambaran besar dan pola umumnya" },
  { axis: "SN", leftCode: "S", rightCode: "N", prompt: "Ketika membaca brief, Anda lebih cepat menangkap...", leftLabel: "detail yang bisa langsung dikerjakan", rightLabel: "makna dan kemungkinan di baliknya" },
  { axis: "SN", leftCode: "S", rightCode: "N", prompt: "Dalam pekerjaan rutin, Anda cenderung...", leftLabel: "menjaga standar yang sudah terbukti", rightLabel: "mencari cara baru yang lebih menarik" },
  { axis: "SN", leftCode: "S", rightCode: "N", prompt: "Saat memecahkan masalah, Anda lebih percaya...", leftLabel: "fakta yang tersedia sekarang", rightLabel: "intuisi tentang arah solusi" },
  { axis: "TF", leftCode: "T", rightCode: "F", prompt: "Saat mengambil keputusan sulit, Anda lebih dulu mempertimbangkan...", leftLabel: "logika dan dampak objektif", rightLabel: "orang yang terdampak dan harmoninya" },
  { axis: "TF", leftCode: "T", rightCode: "F", prompt: "Ketika memberi feedback, Anda biasanya...", leftLabel: "langsung ke inti masalah", rightLabel: "menjaga agar tetap terasa nyaman" },
  { axis: "TF", leftCode: "T", rightCode: "F", prompt: "Dalam konflik tim, Anda lebih fokus pada...", leftLabel: "solusi yang paling rasional", rightLabel: "cara agar semua pihak tetap terjaga" },
  { axis: "TF", leftCode: "T", rightCode: "F", prompt: "Ukuran keputusan yang baik bagi Anda adalah...", leftLabel: "masuk akal dan konsisten", rightLabel: "selaras dengan nilai dan relasi" },
  { axis: "JP", leftCode: "J", rightCode: "P", prompt: "Gaya kerja yang paling nyaman adalah...", leftLabel: "terstruktur, jelas, dan terencana", rightLabel: "fleksibel dan adaptif sesuai situasi" },
  { axis: "JP", leftCode: "J", rightCode: "P", prompt: "Mendekati deadline, Anda biasanya...", leftLabel: "ingin semuanya sudah rapi lebih awal", rightLabel: "tetap membuka ruang revisi sampai akhir" },
  { axis: "JP", leftCode: "J", rightCode: "P", prompt: "Saat agenda berubah mendadak, Anda cenderung...", leftLabel: "butuh waktu menyesuaikan", rightLabel: "mudah switch ke arah baru" },
  { axis: "JP", leftCode: "J", rightCode: "P", prompt: "Dalam rutinitas mingguan, Anda lebih suka...", leftLabel: "jadwal yang bisa diprediksi", rightLabel: "opsi yang tetap cair" },
];

const MBTI_SUMMARY: Record<string, string> = {
  INTJ: "Cenderung strategis, mandiri, dan suka merancang sistem yang efisien.",
  INTP: "Cenderung analitis, eksploratif, dan tertarik memahami pola serta konsep.",
  ENTJ: "Cenderung tegas, visioner, dan nyaman memimpin arah kerja yang jelas.",
  ENTP: "Cenderung cepat ide, suka tantangan intelektual, dan mudah melihat alternatif.",
  INFJ: "Cenderung reflektif, terarah, dan peka terhadap makna yang lebih dalam.",
  INFP: "Cenderung idealis, fleksibel, dan bergerak kuat dari nilai personal.",
  ENFJ: "Cenderung suportif, persuasif, dan kuat membangun keterlibatan orang lain.",
  ENFP: "Cenderung antusias, ekspresif, dan cepat melihat peluang baru.",
  ISTJ: "Cenderung stabil, teliti, dan kuat pada struktur kerja yang konsisten.",
  ISFJ: "Cenderung rapi, suportif, dan menjaga detail serta kebutuhan sekitar.",
  ESTJ: "Cenderung praktis, langsung, dan fokus pada eksekusi yang tertib.",
  ESFJ: "Cenderung kolaboratif, hangat, dan menjaga ritme tim tetap harmonis.",
  ISTP: "Cenderung tenang, observan, dan cepat bertindak saat masalah konkret muncul.",
  ISFP: "Cenderung adaptif, personal, dan nyaman bekerja dengan sensitivitas tinggi.",
  ESTP: "Cenderung sigap, berani, dan suka keputusan cepat di situasi nyata.",
  ESFP: "Cenderung ekspresif, spontan, dan mudah menghidupkan suasana.",
};

export default function StandaloneMbti() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const question = MBTI_QUESTIONS[current];
  const isComplete = Object.keys(answers).length === MBTI_QUESTIONS.length;

  const result = useMemo(() => {
    if (!isComplete) return null;

    const score = {
      E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0,
    };

    Object.values(answers).forEach((value) => {
      score[value as keyof typeof score] += 1;
    });

    const type = `${score.E >= score.I ? "E" : "I"}${score.S >= score.N ? "S" : "N"}${score.T >= score.F ? "T" : "F"}${score.J >= score.P ? "J" : "P"}`;
    return {
      type,
      summary: MBTI_SUMMARY[type] ?? "Profil ini menunjukkan kecenderungan kerja dan preferensi pengambilan keputusan Anda.",
      score,
    };
  }, [answers, isComplete]);

  const answerQuestion = (value: string) => {
    setAnswers((prev) => ({ ...prev, [current]: value }));
    if (current < MBTI_QUESTIONS.length - 1) {
      setCurrent((valueIndex) => valueIndex + 1);
    }
  };

  const reset = () => {
    setAnswers({});
    setCurrent(0);
  };

  const progress = Math.round((Object.keys(answers).length / MBTI_QUESTIONS.length) * 100);

  return (
    <Layout>
      <PageMeta
        title="Tes MBTI Ringkas | KognitiF"
        description="Eksplorasi gaya kerja dan kecenderungan preferensi Anda lewat tes MBTI ringkas yang dipisahkan dari katalog utama."
        canonicalPath="/eksplorasi/mbti"
      />
      <div className="container mx-auto max-w-3xl px-6 py-10">
        <Link
          to="/tes"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Kembali ke Pilih Tes
        </Link>

        {!result ? (
          <div className="rounded-2xl border border-border bg-card p-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">Tes Tambahan</p>
                <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground">Tes MBTI Ringkas</h1>
                <p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground">
                  Bukan alat diagnostik. Ini adalah eksplorasi ringan untuk melihat kecenderungan preferensi kerja, komunikasi, dan pengambilan keputusan Anda.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-background px-4 py-3 text-right">
                <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Progress</p>
                <p className="mt-1 text-lg font-semibold text-foreground">{progress}%</p>
              </div>
            </div>

            <div className="mt-6 h-2 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="mt-8 rounded-2xl border border-border bg-background p-6">
              <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                Pertanyaan {current + 1} dari {MBTI_QUESTIONS.length}
              </p>
              <h2 className="mt-3 text-xl font-semibold tracking-tight text-foreground">{question.prompt}</h2>
              <div className="mt-6 grid gap-3">
                <button
                  onClick={() => answerQuestion(question.leftCode)}
                  className="rounded-xl border border-border bg-card px-5 py-4 text-left transition-all hover:border-primary hover:bg-accent"
                >
                  <p className="text-sm font-semibold text-foreground">{question.leftLabel}</p>
                </button>
                <button
                  onClick={() => answerQuestion(question.rightCode)}
                  className="rounded-xl border border-border bg-card px-5 py-4 text-left transition-all hover:border-primary hover:bg-accent"
                >
                  <p className="text-sm font-semibold text-foreground">{question.rightLabel}</p>
                </button>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <button
                onClick={() => setCurrent((value) => Math.max(0, value - 1))}
                disabled={current === 0}
                className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors disabled:cursor-not-allowed disabled:opacity-40 hover:bg-muted"
              >
                Sebelumnya
              </button>
              <span className="text-xs text-muted-foreground">Jawaban bisa diubah sebelum selesai.</span>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-border bg-card p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">Hasil</p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground">Profil {result.type}</h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">{result.summary}</p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {[
                { axis: "E / I", left: "E", right: "I" },
                { axis: "S / N", left: "S", right: "N" },
                { axis: "T / F", left: "T", right: "F" },
                { axis: "J / P", left: "J", right: "P" },
              ].map((item) => (
                <div key={item.axis} className="rounded-xl border border-border bg-background px-4 py-4">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">{item.axis}</p>
                  <p className="mt-2 text-lg font-semibold text-foreground">
                    {result.score[item.left as keyof typeof result.score]} : {result.score[item.right as keyof typeof result.score]}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={reset}
                className="inline-flex items-center gap-2 rounded-lg bg-foreground px-5 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90"
              >
                <RotateCcw className="h-4 w-4" />
                Ulangi MBTI
              </button>
              <Link
                to="/tes"
                className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
              >
                Kembali ke Pilih Tes
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
