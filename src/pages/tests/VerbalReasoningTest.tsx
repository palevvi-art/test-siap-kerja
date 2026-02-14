import { useState, useEffect, useCallback, useRef } from "react";
import TestWrapper from "@/components/TestWrapper";

// ── Word pools for procedural generation ──

const SYNONYM_PAIRS: [string, string][] = [
  ["cepat", "laju"], ["besar", "raksasa"], ["kecil", "mungil"], ["cantik", "elok"],
  ["marah", "murka"], ["takut", "gentar"], ["berani", "gagah"], ["senang", "gembira"],
  ["sedih", "pilu"], ["pintar", "cerdas"], ["bodoh", "dungu"], ["kuat", "tangguh"],
  ["lemah", "rapuh"], ["rajin", "tekun"], ["malas", "lamban"], ["gelap", "kelam"],
  ["terang", "cerah"], ["dingin", "sejuk"], ["panas", "gerah"], ["tinggi", "jangkung"],
  ["rendah", "pendek"], ["luas", "lapang"], ["sempit", "sesak"], ["cukup", "memadai"],
  ["jauh", "terpencil"], ["dekat", "rapat"], ["tua", "sepuh"], ["muda", "belia"],
  ["indah", "permai"], ["buruk", "jelek"], ["baru", "anyar"], ["lama", "usang"],
  ["keras", "tegar"], ["lunak", "lembut"], ["cerdik", "lihai"], ["jujur", "lurus"],
  ["bohong", "dusta"], ["malu", "segan"], ["aman", "tenteram"], ["bahaya", "ancaman"],
];

const ANTONYM_PAIRS: [string, string][] = [
  ["besar", "kecil"], ["tinggi", "rendah"], ["cepat", "lambat"], ["gelap", "terang"],
  ["panas", "dingin"], ["kuat", "lemah"], ["rajin", "malas"], ["senang", "sedih"],
  ["berani", "pengecut"], ["pintar", "bodoh"], ["baru", "lama"], ["muda", "tua"],
  ["luas", "sempit"], ["jauh", "dekat"], ["keras", "lunak"], ["jujur", "bohong"],
  ["aman", "bahaya"], ["untung", "rugi"], ["menang", "kalah"], ["maju", "mundur"],
  ["naik", "turun"], ["buka", "tutup"], ["masuk", "keluar"], ["hidup", "mati"],
  ["kaya", "miskin"], ["mahal", "murah"], ["berat", "ringan"], ["dalam", "dangkal"],
  ["panjang", "pendek"], ["lebar", "sempit"], ["tebal", "tipis"], ["basah", "kering"],
];

const SENTENCE_TEMPLATES: { template: string; answer: string; distractors: string[] }[] = [
  { template: "Air mengalir dari tempat ___ ke tempat rendah.", answer: "tinggi", distractors: ["jauh", "besar", "luas"] },
  { template: "Orang yang ___ selalu menepati janjinya.", answer: "jujur", distractors: ["cepat", "tinggi", "besar"] },
  { template: "Setelah hujan deras, udara terasa lebih ___.", answer: "sejuk", distractors: ["gelap", "berat", "keras"] },
  { template: "Pekerja yang ___ akan menyelesaikan tugas tepat waktu.", answer: "rajin", distractors: ["mahal", "jauh", "berat"] },
  { template: "Pemimpin yang baik harus ___ mengambil keputusan.", answer: "berani", distractors: ["lambat", "diam", "mahal"] },
  { template: "Seorang atlet membutuhkan fisik yang ___.", answer: "kuat", distractors: ["tipis", "murah", "sempit"] },
  { template: "Lampu yang ___ membantu kita melihat di malam hari.", answer: "terang", distractors: ["berat", "keras", "kasar"] },
  { template: "Anak yang ___ mudah memahami pelajaran baru.", answer: "cerdas", distractors: ["tinggi", "kaya", "tua"] },
  { template: "Jalan yang ___ membuat kendaraan sulit berpapasan.", answer: "sempit", distractors: ["panas", "basah", "mahal"] },
  { template: "Buah yang sudah ___ siap untuk dipetik.", answer: "matang", distractors: ["besar", "mahal", "jauh"] },
  { template: "Pedagang yang ___ menjual barang dengan harga wajar.", answer: "jujur", distractors: ["cepat", "besar", "tinggi"] },
  { template: "Udara di pegunungan biasanya lebih ___ dibanding pantai.", answer: "dingin", distractors: ["sempit", "keras", "berat"] },
  { template: "Orang yang ___ tidak mudah menyerah saat menghadapi masalah.", answer: "tangguh", distractors: ["lambat", "murah", "tipis"] },
  { template: "Keputusan yang ___ dapat merugikan banyak pihak.", answer: "gegabah", distractors: ["besar", "jauh", "tinggi"] },
  { template: "Tim yang ___ bekerja sama akan mencapai hasil lebih baik.", answer: "kompak", distractors: ["mahal", "berat", "jauh"] },
  { template: "Karyawan yang ___ dihargai oleh perusahaan.", answer: "berdedikasi", distractors: ["murah", "kecil", "lambat"] },
];

const READING_PASSAGES: { text: string; question: string; answer: string; distractors: string[] }[] = [
  {
    text: "Sebuah perusahaan memutuskan untuk mengurangi penggunaan kertas dengan menerapkan sistem digital. Hasilnya, biaya operasional turun 20% dalam setahun pertama.",
    question: "Apa dampak utama penerapan sistem digital?",
    answer: "Penurunan biaya operasional",
    distractors: ["Kenaikan jumlah karyawan", "Peningkatan penggunaan kertas", "Penurunan kualitas layanan"],
  },
  {
    text: "Karyawan yang mendapat pelatihan berkala menunjukkan produktivitas 30% lebih tinggi dibanding yang tidak. Perusahaan kemudian mewajibkan pelatihan bulanan.",
    question: "Mengapa perusahaan mewajibkan pelatihan bulanan?",
    answer: "Pelatihan meningkatkan produktivitas",
    distractors: ["Karyawan meminta pelatihan", "Biaya pelatihan sangat murah", "Peraturan pemerintah mewajibkan"],
  },
  {
    text: "Survei menunjukkan 70% pelanggan lebih memilih layanan cepat daripada harga murah. Toko tersebut kemudian menambah kasir untuk mempercepat antrian.",
    question: "Apa prioritas utama pelanggan menurut survei?",
    answer: "Kecepatan layanan",
    distractors: ["Harga murah", "Variasi produk", "Lokasi toko"],
  },
  {
    text: "Rapat mingguan yang singkat dan terarah terbukti lebih efektif daripada rapat bulanan yang panjang. Tim mulai menerapkan standup meeting 15 menit setiap pagi.",
    question: "Mengapa tim beralih ke standup meeting harian?",
    answer: "Rapat singkat lebih efektif",
    distractors: ["Rapat bulanan terlalu mahal", "Ruang rapat tidak tersedia", "Karyawan menolak rapat bulanan"],
  },
  {
    text: "Data menunjukkan bahwa tingkat kesalahan produksi meningkat pada shift malam. Manajemen memutuskan untuk menambah istirahat 15 menit di tengah shift malam.",
    question: "Apa penyebab keputusan menambah waktu istirahat?",
    answer: "Kesalahan produksi lebih tinggi di shift malam",
    distractors: ["Karyawan meminta tambahan gaji", "Mesin sering rusak di malam hari", "Produksi malam terlalu banyak"],
  },
  {
    text: "Perusahaan yang menerapkan kerja fleksibel mengalami penurunan tingkat resign karyawan hingga 40%. Kebijakan ini juga meningkatkan kepuasan kerja secara keseluruhan.",
    question: "Apa hasil dari penerapan kerja fleksibel?",
    answer: "Penurunan tingkat resign karyawan",
    distractors: ["Peningkatan biaya operasional", "Penurunan produktivitas", "Kenaikan jumlah proyek"],
  },
  {
    text: "Studi internal menunjukkan bahwa komunikasi antar departemen yang buruk menyebabkan keterlambatan proyek hingga 25%. Perusahaan lalu menyediakan platform komunikasi terpadu.",
    question: "Apa masalah utama yang ditemukan studi internal?",
    answer: "Komunikasi antar departemen yang buruk",
    distractors: ["Kurangnya anggaran proyek", "Karyawan kurang terlatih", "Teknologi yang usang"],
  },
  {
    text: "Pengiriman yang tepat waktu meningkatkan kepercayaan pelanggan. Perusahaan logistik tersebut menginvestasikan teknologi pelacakan real-time untuk memastikan akurasi pengiriman.",
    question: "Mengapa perusahaan menginvestasikan teknologi pelacakan?",
    answer: "Untuk meningkatkan ketepatan waktu pengiriman",
    distractors: ["Untuk mengurangi jumlah karyawan", "Untuk menurunkan harga layanan", "Untuk memperluas jangkauan wilayah"],
  },
];

type QuestionType = "synonym" | "antonym" | "sentence" | "reading";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

interface VerbalQuestion {
  type: QuestionType;
  prompt: string;
  context?: string;
  options: string[];
  answer: string;
}

function generateSynonymQ(): VerbalQuestion {
  const pair = pickRandom(SYNONYM_PAIRS);
  const [word, synonym] = Math.random() > 0.5 ? pair : [pair[1], pair[0]];
  const distractors: string[] = [];
  while (distractors.length < 3) {
    const other = pickRandom(SYNONYM_PAIRS);
    const d = pickRandom(other);
    if (d !== synonym && d !== word && !distractors.includes(d)) distractors.push(d);
  }
  const options = shuffle([synonym, ...distractors]);
  return { type: "synonym", prompt: `Sinonim dari "${word}" adalah:`, options, answer: synonym };
}

function generateAntonymQ(): VerbalQuestion {
  const [word, antonym] = pickRandom(ANTONYM_PAIRS);
  const distractors: string[] = [];
  while (distractors.length < 3) {
    const other = pickRandom(ANTONYM_PAIRS);
    const d = pickRandom(other);
    if (d !== antonym && d !== word && !distractors.includes(d)) distractors.push(d);
  }
  const options = shuffle([antonym, ...distractors]);
  return { type: "antonym", prompt: `Antonim dari "${word}" adalah:`, options, answer: antonym };
}

function generateSentenceQ(): VerbalQuestion {
  const t = pickRandom(SENTENCE_TEMPLATES);
  const options = shuffle([t.answer, ...t.distractors]);
  return { type: "sentence", prompt: t.template, options, answer: t.answer };
}

function generateReadingQ(): VerbalQuestion {
  const p = pickRandom(READING_PASSAGES);
  const options = shuffle([p.answer, ...p.distractors]);
  return { type: "reading", prompt: p.question, context: p.text, options, answer: p.answer };
}

function generateQuestion(index: number): VerbalQuestion {
  // Distribute question types across the test
  const cycle = index % 4;
  switch (cycle) {
    case 0: return generateSynonymQ();
    case 1: return generateAntonymQ();
    case 2: return generateSentenceQ();
    case 3: return generateReadingQ();
    default: return generateSynonymQ();
  }
}

const TYPE_LABELS: Record<QuestionType, string> = {
  synonym: "Sinonim",
  antonym: "Antonim",
  sentence: "Logika Kalimat",
  reading: "Pemahaman Bacaan",
};

const VerbalReasoningTest = () => (
  <TestWrapper
    testType="penalaran-verbal"
    testName="Tes Penalaran Verbal"
    description="Mengukur pemahaman verbal dan logika komunikasi melalui sinonim, antonim, logika kalimat, dan pemahaman bacaan."
    durationSeconds={1500}
    segmentDurationSeconds={300}
    maxQuestions={30}
  >
    {({ onResponse, isRunning }) => <VerbalEngine onResponse={onResponse} isRunning={isRunning} />}
  </TestWrapper>
);

function VerbalEngine({ onResponse, isRunning }: { onResponse: (c: boolean, t: number) => void; isRunning: boolean }) {
  const [question, setQuestion] = useState<VerbalQuestion>(() => generateQuestion(0));
  const [selected, setSelected] = useState<string | null>(null);
  const indexRef = useRef(0);
  const showTimeRef = useRef(Date.now());

  const next = useCallback(() => {
    indexRef.current += 1;
    setQuestion(generateQuestion(indexRef.current));
    setSelected(null);
    showTimeRef.current = Date.now();
  }, []);

  useEffect(() => {
    if (isRunning) {
      indexRef.current = 0;
      setQuestion(generateQuestion(0));
      setSelected(null);
      showTimeRef.current = Date.now();
    }
  }, [isRunning]);

  const handleAnswer = (opt: string) => {
    if (selected) return;
    setSelected(opt);
    onResponse(opt === question.answer, Date.now() - showTimeRef.current);
    setTimeout(next, 400);
  };

  return (
    <div className="text-left max-w-lg mx-auto">
      <div className="inline-block bg-accent text-accent-foreground text-xs font-medium px-2 py-0.5 rounded mb-4">
        {TYPE_LABELS[question.type]}
      </div>

      {question.context && (
        <div className="bg-muted/50 border rounded-lg p-4 mb-4 text-sm text-foreground leading-relaxed">
          {question.context}
        </div>
      )}

      <p className="text-lg font-medium text-foreground mb-5">{question.prompt}</p>

      <div className="flex flex-col gap-2">
        {question.options.map((opt, i) => {
          const letter = String.fromCharCode(65 + i);
          const isSelected = selected === opt;
          const isCorrect = opt === question.answer;
          let cls = "border rounded-lg px-4 py-3 text-left text-sm transition-colors cursor-pointer flex items-center gap-3 ";
          if (selected) {
            if (isCorrect) cls += "border-primary bg-primary/10 text-foreground";
            else if (isSelected) cls += "border-destructive bg-destructive/10 text-foreground";
            else cls += "border-muted text-muted-foreground";
          } else {
            cls += "border-border hover:border-primary hover:bg-accent text-foreground";
          }
          return (
            <button key={i} onClick={() => handleAnswer(opt)} className={cls} disabled={!!selected}>
              <span className="h-6 w-6 rounded-full border flex items-center justify-center text-xs font-semibold shrink-0">
                {letter}
              </span>
              <span>{opt}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default VerbalReasoningTest;
