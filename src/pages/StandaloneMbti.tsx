import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, RotateCcw } from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import PageMeta from "@/components/PageMeta";

type MbtiAxis = "EI" | "SN" | "TF" | "JP";
type MbtiCode = "E" | "I" | "S" | "N" | "T" | "F" | "J" | "P";

interface MbtiQuestion {
  axis: MbtiAxis;
  leftCode: MbtiCode;
  rightCode: MbtiCode;
  prompt: string;
  leftLabel: string;
  rightLabel: string;
}

interface MbtiProfile {
  title: string;
  summary: string;
  strengths: string[];
  watchouts: string[];
  workStyle: string;
  communication: string;
  idealEnvironment: string;
  developmentFocus: string;
}

const MBTI_QUESTIONS: MbtiQuestion[] = [
  { axis: "EI", leftCode: "E", rightCode: "I", prompt: "Saat energi menurun, Anda biasanya...", leftLabel: "mencari orang atau suasana ramai", rightLabel: "mencari waktu sendiri untuk recharge" },
  { axis: "EI", leftCode: "E", rightCode: "I", prompt: "Ketika berdiskusi, Anda lebih nyaman...", leftLabel: "berpikir sambil bicara", rightLabel: "berpikir dulu baru bicara" },
  { axis: "EI", leftCode: "E", rightCode: "I", prompt: "Pada acara baru, Anda cenderung...", leftLabel: "mudah membuka percakapan", rightLabel: "mengamati dulu sebelum ikut masuk" },
  { axis: "EI", leftCode: "E", rightCode: "I", prompt: "Cara terbaik memulihkan fokus adalah...", leftLabel: "interaksi yang aktif", rightLabel: "ruang tenang tanpa distraksi" },
  { axis: "EI", leftCode: "E", rightCode: "I", prompt: "Saat ide muncul, Anda lebih sering...", leftLabel: "langsung membagikannya ke orang lain", rightLabel: "mengolahnya sendiri lebih dulu" },
  { axis: "EI", leftCode: "E", rightCode: "I", prompt: "Dalam kerja tim, Anda paling sering berperan sebagai...", leftLabel: "penggerak percakapan dan momentum", rightLabel: "penjernih arah dan penimbang yang tenang" },
  { axis: "EI", leftCode: "E", rightCode: "I", prompt: "Setelah hari yang padat, Anda cenderung...", leftLabel: "masih nyaman aktif dan terhubung", rightLabel: "butuh jeda agar energi kembali penuh" },
  { axis: "EI", leftCode: "E", rightCode: "I", prompt: "Dalam rapat, Anda lebih mungkin...", leftLabel: "cepat mengangkat poin meski masih mentah", rightLabel: "menunggu poinnya matang baru bicara" },

  { axis: "SN", leftCode: "S", rightCode: "N", prompt: "Saat belajar hal baru, Anda lebih suka...", leftLabel: "contoh konkret dan langkah jelas", rightLabel: "gambaran besar dan pola umumnya" },
  { axis: "SN", leftCode: "S", rightCode: "N", prompt: "Ketika membaca brief, Anda lebih cepat menangkap...", leftLabel: "detail yang bisa langsung dikerjakan", rightLabel: "makna dan kemungkinan di baliknya" },
  { axis: "SN", leftCode: "S", rightCode: "N", prompt: "Dalam pekerjaan rutin, Anda cenderung...", leftLabel: "menjaga standar yang sudah terbukti", rightLabel: "mencari cara baru yang lebih menarik" },
  { axis: "SN", leftCode: "S", rightCode: "N", prompt: "Saat memecahkan masalah, Anda lebih percaya...", leftLabel: "fakta yang tersedia sekarang", rightLabel: "intuisi tentang arah solusi" },
  { axis: "SN", leftCode: "S", rightCode: "N", prompt: "Waktu menjelaskan sesuatu, Anda lebih mudah...", leftLabel: "menunjukkan langkah demi langkah", rightLabel: "menjelaskan konsep dan koneksinya" },
  { axis: "SN", leftCode: "S", rightCode: "N", prompt: "Hal yang paling sering menarik perhatian Anda adalah...", leftLabel: "apa yang benar-benar terjadi di lapangan", rightLabel: "apa yang mungkin terjadi berikutnya" },
  { axis: "SN", leftCode: "S", rightCode: "N", prompt: "Dalam evaluasi kerja, Anda lebih menghargai...", leftLabel: "indikator yang jelas dan terukur", rightLabel: "arah, potensi, dan peluang pengembangan" },
  { axis: "SN", leftCode: "S", rightCode: "N", prompt: "Saat menyusun prioritas, Anda lebih sering memilih...", leftLabel: "yang paling realistis dieksekusi sekarang", rightLabel: "yang paling potensial berdampak besar" },

  { axis: "TF", leftCode: "T", rightCode: "F", prompt: "Saat mengambil keputusan sulit, Anda lebih dulu mempertimbangkan...", leftLabel: "logika dan dampak objektif", rightLabel: "orang yang terdampak dan harmoninya" },
  { axis: "TF", leftCode: "T", rightCode: "F", prompt: "Ketika memberi feedback, Anda biasanya...", leftLabel: "langsung ke inti masalah", rightLabel: "menjaga agar tetap terasa nyaman" },
  { axis: "TF", leftCode: "T", rightCode: "F", prompt: "Dalam konflik tim, Anda lebih fokus pada...", leftLabel: "solusi yang paling rasional", rightLabel: "cara agar semua pihak tetap terjaga" },
  { axis: "TF", leftCode: "T", rightCode: "F", prompt: "Ukuran keputusan yang baik bagi Anda adalah...", leftLabel: "masuk akal dan konsisten", rightLabel: "selaras dengan nilai dan relasi" },
  { axis: "TF", leftCode: "T", rightCode: "F", prompt: "Waktu menilai ide baru, Anda lebih cepat bertanya...", leftLabel: "apakah ini efektif dan logis", rightLabel: "apakah ini relevan dan bermakna" },
  { axis: "TF", leftCode: "T", rightCode: "F", prompt: "Dalam negosiasi, Anda cenderung...", leftLabel: "mencari posisi paling kuat secara argumen", rightLabel: "mencari titik temu yang tetap manusiawi" },
  { axis: "TF", leftCode: "T", rightCode: "F", prompt: "Jika harus menolak permintaan orang lain, Anda lebih mungkin...", leftLabel: "menjelaskan alasan secara tegas", rightLabel: "mencari cara agar penolakannya lebih halus" },
  { axis: "TF", leftCode: "T", rightCode: "F", prompt: "Anda lebih puas jika keputusan terasa...", leftLabel: "adil secara sistem", rightLabel: "baik untuk hubungan jangka panjang" },

  { axis: "JP", leftCode: "J", rightCode: "P", prompt: "Gaya kerja yang paling nyaman adalah...", leftLabel: "terstruktur, jelas, dan terencana", rightLabel: "fleksibel dan adaptif sesuai situasi" },
  { axis: "JP", leftCode: "J", rightCode: "P", prompt: "Mendekati deadline, Anda biasanya...", leftLabel: "ingin semuanya sudah rapi lebih awal", rightLabel: "tetap membuka ruang revisi sampai akhir" },
  { axis: "JP", leftCode: "J", rightCode: "P", prompt: "Saat agenda berubah mendadak, Anda cenderung...", leftLabel: "butuh waktu menyesuaikan", rightLabel: "mudah switch ke arah baru" },
  { axis: "JP", leftCode: "J", rightCode: "P", prompt: "Dalam rutinitas mingguan, Anda lebih suka...", leftLabel: "jadwal yang bisa diprediksi", rightLabel: "opsi yang tetap cair" },
  { axis: "JP", leftCode: "J", rightCode: "P", prompt: "Dalam proyek baru, Anda lebih dulu...", leftLabel: "membuat kerangka dan milestone", rightLabel: "mencoba sambil melihat bentuk terbaiknya" },
  { axis: "JP", leftCode: "J", rightCode: "P", prompt: "Jika tugas sudah berjalan, Anda paling nyaman ketika...", leftLabel: "scope tetap stabil", rightLabel: "scope masih bisa berevolusi" },
  { axis: "JP", leftCode: "J", rightCode: "P", prompt: "Saat membuat keputusan, Anda lebih suka...", leftLabel: "mengunci pilihan dan lanjut eksekusi", rightLabel: "menunda sedikit sambil lihat opsi lain" },
  { axis: "JP", leftCode: "J", rightCode: "P", prompt: "Tanda minggu yang baik bagi Anda adalah...", leftLabel: "banyak hal selesai sesuai rencana", rightLabel: "masih ada ruang spontan untuk peluang baru" },
];

const MBTI_PROFILES: Record<string, MbtiProfile> = {
  INTJ: {
    title: "Strategic Architect",
    summary: "Anda cenderung menyusun arah, memikirkan sistem, dan bekerja paling baik saat ada ruang untuk membangun sesuatu dengan logika yang bersih.",
    strengths: ["Mudah melihat struktur besar", "Nyaman membuat strategi jangka panjang", "Kuat saat perlu menyederhanakan kompleksitas"],
    watchouts: ["Bisa terasa terlalu dingin atau terlalu cepat menyimpulkan", "Kadang kurang sabar pada proses yang bertele-tele"],
    workStyle: "Mandiri, terarah, dan paling kuat saat diberi masalah besar untuk dirumuskan secara sistematis.",
    communication: "Singkat, langsung, dan menghargai argumen yang rapi.",
    idealEnvironment: "Lingkungan yang menghargai otonomi, kualitas berpikir, dan keputusan berbasis merit.",
    developmentFocus: "Latih empati operasional dan cara menyampaikan kritik agar tetap bisa diterima tim.",
  },
  INTP: {
    title: "Analytical Explorer",
    summary: "Anda cenderung menikmati eksplorasi konsep, pola, dan kemungkinan. Dorongan utamanya adalah memahami, bukan sekadar menutup tugas secepat mungkin.",
    strengths: ["Cepat melihat pola dan inkonsistensi", "Kuat dalam analisis ide", "Nyaman menguji banyak kemungkinan"],
    watchouts: ["Bisa terlalu lama mengeksplorasi tanpa menutup keputusan", "Kadang sulit bertahan di proses yang sangat prosedural"],
    workStyle: "Fleksibel, eksploratif, dan efektif ketika diberi ruang eksperimen intelektual.",
    communication: "Reflektif, argumentatif, dan nyaman dalam diskusi yang substansial.",
    idealEnvironment: "Budaya yang terbuka pada eksperimen dan tidak terlalu kaku pada cara berpikir tunggal.",
    developmentFocus: "Perkuat disiplin eksekusi dan kebiasaan menutup loop, bukan hanya membuka ide.",
  },
  ENTJ: {
    title: "Decisive Builder",
    summary: "Anda cenderung melihat arah, menetapkan standar, lalu menggerakkan orang untuk mengeksekusi dengan cepat dan terukur.",
    strengths: ["Tegas mengambil keputusan", "Kuat menggerakkan tim", "Mampu menjaga orientasi hasil"],
    watchouts: ["Bisa terlalu dominan", "Kadang lupa bahwa tidak semua orang mengejar tempo yang sama"],
    workStyle: "Terstruktur, cepat, dan nyaman memimpin jalur eksekusi.",
    communication: "Jelas, langsung, dan fokus pada prioritas.",
    idealEnvironment: "Tempat yang bergerak cepat dan menghargai ownership serta hasil nyata.",
    developmentFocus: "Jaga sensitivitas sosial agar kecepatan tidak mengorbankan keterlibatan tim.",
  },
  ENTP: {
    title: "Opportunity Shaper",
    summary: "Anda cenderung cepat melihat celah, ide baru, dan pendekatan alternatif. Daya tarik utamanya ada pada kemungkinan.",
    strengths: ["Kreatif dan cepat menangkap peluang", "Adaptif pada perubahan", "Kuat memantik diskusi dan ide"],
    watchouts: ["Bisa cepat bosan setelah ide masuk fase rutin", "Kadang terlalu mudah meloncat ke opsi berikutnya"],
    workStyle: "Dinamis, ideatif, dan paling hidup saat memecahkan masalah terbuka.",
    communication: "Enerjik, spontan, dan suka mengembangkan percakapan.",
    idealEnvironment: "Lingkungan yang cepat, terbuka, dan memberi ruang improviasi yang sehat.",
    developmentFocus: "Perkuat disiplin follow-through agar ide juga sampai ke hasil.",
  },
  INFJ: {
    title: "Quiet Integrator",
    summary: "Anda cenderung melihat makna, arah, dan dinamika manusia secara sekaligus. Banyak keputusan Anda bergerak dari pemahaman yang mendalam.",
    strengths: ["Peka terhadap konteks dan orang", "Mampu merangkai arah dari banyak sinyal", "Stabil dalam refleksi"],
    watchouts: ["Bisa terlalu menanggung semuanya diam-diam", "Kadang menunda kejelasan karena ingin semuanya tepat"],
    workStyle: "Tenang, terarah, dan kuat saat membangun arah yang bermakna.",
    communication: "Empatik, hati-hati, dan cenderung memilih kata dengan presisi.",
    idealEnvironment: "Budaya yang punya kedalaman, arah yang jelas, dan relasi kerja yang sehat.",
    developmentFocus: "Lebih cepat mengartikulasikan kebutuhan dan batas kerja sebelum menumpuk jadi beban.",
  },
  INFP: {
    title: "Value-Driven Creator",
    summary: "Anda cenderung bekerja dari nilai personal yang kuat. Saat merasa selaras, Anda bisa menunjukkan komitmen dan kreativitas yang tinggi.",
    strengths: ["Autentik dan peka pada makna", "Kreatif dalam melihat alternatif", "Kuat menjaga integritas personal"],
    watchouts: ["Bisa kehilangan energi di lingkungan yang terlalu kaku", "Kadang sulit memaksa diri pada struktur yang tak terasa bermakna"],
    workStyle: "Mandiri, fleksibel, dan lebih hidup saat pekerjaan terasa punya nilai.",
    communication: "Lembut, personal, dan menghargai kejujuran emosional.",
    idealEnvironment: "Lingkungan yang memberi ruang ekspresi, otonomi, dan nilai yang konsisten.",
    developmentFocus: "Bangun sistem kerja yang membantu ide dan nilai diterjemahkan jadi output yang selesai.",
  },
  ENFJ: {
    title: "People-Centered Driver",
    summary: "Anda cenderung kuat membaca orang, membangun energi tim, dan menjaga arah tetap terasa jelas sekaligus manusiawi.",
    strengths: ["Mudah menggerakkan orang", "Kuat dalam membangun engagement", "Peka pada suasana dan kebutuhan tim"],
    watchouts: ["Bisa terlalu banyak memikul beban sosial", "Kadang terlalu fokus pada harmoni"],
    workStyle: "Kolaboratif, terarah, dan kuat saat peran membutuhkan koordinasi manusia.",
    communication: "Hangat, persuasif, dan mudah membangun kejelasan relasional.",
    idealEnvironment: "Tempat yang butuh kolaborasi kuat dan orientasi hasil yang tetap manusiawi.",
    developmentFocus: "Perjelas prioritas objektif agar tidak semua hal diselesaikan lewat kompromi sosial.",
  },
  ENFP: {
    title: "Energetic Catalyst",
    summary: "Anda cenderung cepat menangkap potensi, semangat pada ide baru, dan kuat menghidupkan momentum di sekitar Anda.",
    strengths: ["Penuh energi dan ide", "Cepat melihat kemungkinan", "Mudah membangun koneksi"],
    watchouts: ["Bisa mudah terdistraksi", "Kadang sulit menjaga konsistensi pada hal rutin"],
    workStyle: "Fleksibel, interaktif, dan kuat di fase awal pertumbuhan atau inisiasi.",
    communication: "Ekspresif, hangat, dan memancing antusiasme.",
    idealEnvironment: "Budaya terbuka, tidak terlalu birokratis, dan memberi ruang improvisasi.",
    developmentFocus: "Perkuat ritme eksekusi dan sistem follow-up agar energi tidak cepat pecah ke banyak arah.",
  },
  ISTJ: {
    title: "Reliable Operator",
    summary: "Anda cenderung stabil, teliti, dan konsisten. Kekuatan utamanya ada pada struktur, keandalan, dan kemampuan menjaga kualitas eksekusi.",
    strengths: ["Rapi dan konsisten", "Kuat pada detail dan prosedur", "Dapat diandalkan dalam pekerjaan yang butuh standar"],
    watchouts: ["Bisa terlalu hati-hati terhadap perubahan", "Kadang sulit nyaman dengan proses yang ambigu"],
    workStyle: "Terencana, sistematis, dan efektif pada jalur kerja yang jelas.",
    communication: "Lugas, sopan, dan menghargai kejelasan.",
    idealEnvironment: "Lingkungan yang stabil, terstruktur, dan punya ekspektasi kerja yang terdefinisi baik.",
    developmentFocus: "Latih fleksibilitas taktis saat kondisi menuntut respons di luar rencana awal.",
  },
  ISFJ: {
    title: "Steady Support Builder",
    summary: "Anda cenderung menjaga kualitas, stabilitas, dan kebutuhan orang di sekitar. Kontribusi Anda sering terasa kuat justru karena konsisten.",
    strengths: ["Teliti dan suportif", "Kuat menjaga ritme operasional", "Peka terhadap kebutuhan detail orang lain"],
    watchouts: ["Bisa terlalu memendam beban", "Kadang sulit menyuarakan keberatan secara langsung"],
    workStyle: "Tenang, rapi, dan kuat di peran yang menuntut keandalan berkelanjutan.",
    communication: "Hangat, hati-hati, dan cenderung menjaga nada tetap aman.",
    idealEnvironment: "Tim yang punya struktur jelas dan relasi kerja yang saling menghormati.",
    developmentFocus: "Bangun keberanian untuk menetapkan batas dan menyampaikan kebutuhan lebih awal.",
  },
  ESTJ: {
    title: "Structured Executor",
    summary: "Anda cenderung fokus pada hasil, standar, dan kejelasan peran. Anda kuat saat tugas perlu ditata dan didorong selesai.",
    strengths: ["Tegas dan sistematis", "Kuat menjaga akuntabilitas", "Cepat mengubah arahan jadi aksi"],
    watchouts: ["Bisa terlalu kaku pada cara kerja tertentu", "Kadang kurang ruang untuk nuansa personal"],
    workStyle: "Terstruktur, langsung, dan fokus pada output yang terukur.",
    communication: "Jelas, cepat, dan tidak suka berputar terlalu jauh.",
    idealEnvironment: "Lingkungan yang menghargai disiplin, ownership, dan hasil nyata.",
    developmentFocus: "Tambahkan ruang dengar dan adaptasi agar standar tinggi tetap bisa diterima orang lain.",
  },
  ESFJ: {
    title: "Coordinated Caretaker",
    summary: "Anda cenderung kuat menjaga relasi, ritme tim, dan kelancaran operasional yang melibatkan banyak orang.",
    strengths: ["Mudah menjaga harmonisasi", "Kuat dalam follow-up orang dan detail", "Nyaman menjaga stabilitas tim"],
    watchouts: ["Bisa terlalu terdorong memenuhi semua orang", "Kadang sulit nyaman dengan keputusan yang terasa dingin"],
    workStyle: "Kolaboratif, praktis, dan rapi dalam koordinasi.",
    communication: "Hangat, jelas, dan memberi rasa terhubung.",
    idealEnvironment: "Budaya kerja yang kolaboratif dan saling responsif.",
    developmentFocus: "Jaga keseimbangan antara kebutuhan relasi dan objektivitas keputusan.",
  },
  ISTP: {
    title: "Calm Problem Solver",
    summary: "Anda cenderung tenang, tajam saat mengamati, dan efektif saat harus merespons masalah konkret secara cepat.",
    strengths: ["Praktis dan sigap", "Kuat saat troubleshooting", "Tenang di situasi teknis atau mendesak"],
    watchouts: ["Bisa terlalu minim verbal", "Kadang baru bergerak penuh saat masalah sudah nyata"],
    workStyle: "Mandiri, taktis, dan efektif dalam penyelesaian langsung.",
    communication: "Ringkas dan lebih suka hal esensial.",
    idealEnvironment: "Lingkungan yang memberi ruang otonomi dan menghargai kemampuan problem solving nyata.",
    developmentFocus: "Bangun ritme komunikasi proaktif agar insight tidak datang terlambat ke tim.",
  },
  ISFP: {
    title: "Adaptive Individualist",
    summary: "Anda cenderung fleksibel, personal, dan lebih kuat saat diberi ruang bekerja dengan ritme yang terasa otentik.",
    strengths: ["Adaptif dan peka", "Mudah menyesuaikan diri secara halus", "Kuat menjaga kualitas pada hal yang bermakna"],
    watchouts: ["Bisa sulit pada struktur yang terlalu kaku", "Kadang menahan opini terlalu lama"],
    workStyle: "Fleksibel, tenang, dan lebih kuat saat tekanan sosial tidak berlebihan.",
    communication: "Lembut, observan, dan tidak suka konflik yang keras.",
    idealEnvironment: "Tempat yang memberi ruang personal dan ritme kerja yang tidak terlalu menekan.",
    developmentFocus: "Perjelas suara dan preferensi kerja Anda agar tidak selalu tenggelam di balik adaptasi.",
  },
  ESTP: {
    title: "Action-Oriented Improviser",
    summary: "Anda cenderung cepat melihat situasi nyata, bergerak tanpa terlalu banyak drama, dan nyaman di lingkungan yang serba cepat.",
    strengths: ["Sigap, praktis, dan cepat mengambil tindakan", "Nyaman menghadapi situasi dinamis", "Kuat membaca realitas lapangan"],
    watchouts: ["Bisa terlalu cepat tanpa refleksi cukup", "Kadang kurang sabar pada proses yang lambat"],
    workStyle: "Cepat, responsif, dan kuat di medan yang dinamis.",
    communication: "Langsung, santai, dan bergerak dari apa yang nyata.",
    idealEnvironment: "Lingkungan aktif yang menghargai kelincahan dan respons cepat.",
    developmentFocus: "Tambahkan jeda refleksi pada keputusan penting agar energi cepat tetap terarah.",
  },
  ESFP: {
    title: "Engaging Momentum Maker",
    summary: "Anda cenderung membawa energi, kehangatan, dan spontanitas yang membuat situasi terasa hidup dan mudah bergerak.",
    strengths: ["Mudah menghidupkan suasana", "Responsif dan cepat berinteraksi", "Kuat di peran yang butuh energi manusia"],
    watchouts: ["Bisa cepat bosan pada rutinitas kering", "Kadang terlalu bergerak dari momentum sesaat"],
    workStyle: "Interaktif, luwes, dan kuat saat kerja melibatkan orang serta ritme yang aktif.",
    communication: "Ramah, ekspresif, dan mudah diterima.",
    idealEnvironment: "Budaya yang enerjik, kolaboratif, dan tidak terlalu kaku.",
    developmentFocus: "Perkuat sistem prioritas agar energi interpersonal juga menghasilkan output yang konsisten.",
  },
};

const AXIS_META = [
  { axis: "E / I", left: "E", right: "I", leftLabel: "Ekstrovert", rightLabel: "Introvert" },
  { axis: "S / N", left: "S", right: "N", leftLabel: "Sensing", rightLabel: "Intuition" },
  { axis: "T / F", left: "T", right: "F", leftLabel: "Thinking", rightLabel: "Feeling" },
  { axis: "J / P", left: "J", right: "P", leftLabel: "Judging", rightLabel: "Perceiving" },
] as const;

function axisBalance(left: number, right: number) {
  const total = left + right;
  if (total === 0) return { dominant: 50, secondary: 50 };
  return {
    dominant: Math.round((Math.max(left, right) / total) * 100),
    secondary: Math.round((Math.min(left, right) / total) * 100),
  };
}

export default function StandaloneMbti() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, MbtiCode>>({});

  const question = MBTI_QUESTIONS[current];
  const answeredCount = Object.keys(answers).length;
  const isComplete = answeredCount === MBTI_QUESTIONS.length;

  const result = useMemo(() => {
    if (!isComplete) return null;

    const score: Record<MbtiCode, number> = {
      E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0,
    };

    Object.values(answers).forEach((value) => {
      score[value] += 1;
    });

    const type = `${score.E >= score.I ? "E" : "I"}${score.S >= score.N ? "S" : "N"}${score.T >= score.F ? "T" : "F"}${score.J >= score.P ? "J" : "P"}`;
    const profile = MBTI_PROFILES[type] ?? {
      title: "Balanced Profile",
      summary: "Profil ini menggambarkan kombinasi preferensi kerja dan pengambilan keputusan Anda secara umum.",
      strengths: [],
      watchouts: [],
      workStyle: "",
      communication: "",
      idealEnvironment: "",
      developmentFocus: "",
    };

    return { type, score, profile };
  }, [answers, isComplete]);

  const progress = Math.round((answeredCount / MBTI_QUESTIONS.length) * 100);

  const answerQuestion = (value: MbtiCode) => {
    setAnswers((prev) => ({ ...prev, [current]: value }));
    if (current < MBTI_QUESTIONS.length - 1) {
      setCurrent((valueIndex) => valueIndex + 1);
    }
  };

  const goPrevious = () => {
    if (current === 0) return;
    setCurrent((value) => value - 1);
  };

  const reset = () => {
    setAnswers({});
    setCurrent(0);
  };

  const answeredCurrent = answers[current];

  return (
    <Layout>
      <PageMeta
        title="Tes MBTI Mendalam | KognitiF"
        description="Tes MBTI mendalam untuk melihat preferensi kerja, gaya komunikasi, pola keputusan, dan profil kerja menyeluruh dalam format terpisah."
        canonicalPath="/eksplorasi/mbti"
      />
      <div className="container mx-auto max-w-5xl px-6 py-10">
        <Link
          to="/tes"
          className="mb-6 inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Kembali ke Pilih Tes
        </Link>

        {!result ? (
          <div className="rounded-[28px] border border-border bg-card p-6 shadow-[0_18px_50px_rgba(15,23,42,0.04)] md:p-8">
            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">Tes Tambahan</p>
                <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground md:text-[2.4rem]">
                  Tes MBTI Mendalam
                </h1>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
                  Versi ini tidak lagi ringkas. Anda akan menjawab lebih banyak pertanyaan untuk melihat kecenderungan preferensi kerja,
                  cara berkomunikasi, pengambilan keputusan, gaya kolaborasi, dan area pengembangan yang lebih menyeluruh.
                </p>
                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {[
                    { label: "Pertanyaan", value: `${MBTI_QUESTIONS.length}` },
                    { label: "Dimensi", value: "4 sumbu MBTI" },
                    { label: "Output", value: "Profil kerja detail" },
                  ].map((item) => (
                    <div key={item.label} className="rounded-2xl border border-border bg-background px-4 py-4">
                      <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">{item.label}</p>
                      <p className="mt-2 text-sm font-semibold text-foreground">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[24px] border border-border bg-background p-5">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Progress</p>
                    <p className="mt-1 text-2xl font-semibold text-foreground">{progress}%</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Terjawab</p>
                    <p className="mt-1 text-sm font-medium text-foreground">
                      {answeredCount} / {MBTI_QUESTIONS.length}
                    </p>
                  </div>
                </div>
                <div className="mt-5 h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="mt-5 grid gap-2">
                  {AXIS_META.map((item) => (
                    <div key={item.axis} className="flex items-center justify-between rounded-xl border border-border bg-card px-3 py-2">
                      <span className="text-xs font-semibold text-foreground">{item.axis}</span>
                      <span className="text-[11px] text-muted-foreground">
                        {item.leftLabel} vs {item.rightLabel}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-[24px] border border-border bg-background p-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                    Pertanyaan {current + 1} dari {MBTI_QUESTIONS.length}
                  </p>
                  <h2 className="mt-3 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
                    {question.prompt}
                  </h2>
                </div>
                {answeredCurrent && (
                  <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Jawaban tersimpan
                  </div>
                )}
              </div>

              <div className="mt-6 grid gap-3">
                <button
                  onClick={() => answerQuestion(question.leftCode)}
                  className={`rounded-2xl border px-5 py-4 text-left transition-all ${
                    answeredCurrent === question.leftCode
                      ? "border-primary bg-primary/10"
                      : "border-border bg-card hover:border-primary hover:bg-accent"
                  }`}
                >
                  <p className="text-sm font-semibold text-foreground">{question.leftLabel}</p>
                  <p className="mt-1 text-xs text-muted-foreground">Pilih jika ini lebih mendekati kebiasaan Anda.</p>
                </button>
                <button
                  onClick={() => answerQuestion(question.rightCode)}
                  className={`rounded-2xl border px-5 py-4 text-left transition-all ${
                    answeredCurrent === question.rightCode
                      ? "border-primary bg-primary/10"
                      : "border-border bg-card hover:border-primary hover:bg-accent"
                  }`}
                >
                  <p className="text-sm font-semibold text-foreground">{question.rightLabel}</p>
                  <p className="mt-1 text-xs text-muted-foreground">Pilih jika ini lebih sering muncul dalam cara kerja Anda.</p>
                </button>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={goPrevious}
                disabled={current === 0}
                className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
              >
                Sebelumnya
              </button>
              <span className="text-xs text-muted-foreground">
                Hasil akhir akan merangkum tipe, keseimbangan per dimensi, gaya kerja, kekuatan, dan area pengembangan.
              </span>
            </div>
          </div>
        ) : (
          <div className="rounded-[28px] border border-border bg-card p-6 shadow-[0_18px_50px_rgba(15,23,42,0.04)] md:p-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">Hasil MBTI</p>
                <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground md:text-[2.5rem]">
                  {result.type} · {result.profile.title}
                </h1>
                <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">
                  {result.profile.summary}
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-background px-5 py-4">
                <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Arah dominan</p>
                <p className="mt-1 text-xl font-semibold text-foreground">{result.type}</p>
              </div>
            </div>

            <div className="mt-8 grid gap-4 xl:grid-cols-2">
              {AXIS_META.map((item) => {
                const left = result.score[item.left];
                const right = result.score[item.right];
                const balance = axisBalance(left, right);
                const dominantCode = left >= right ? item.left : item.right;
                const dominantLabel = left >= right ? item.leftLabel : item.rightLabel;
                return (
                  <div key={item.axis} className="rounded-2xl border border-border bg-background p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">{item.axis}</p>
                        <p className="mt-2 text-base font-semibold text-foreground">{dominantCode} lebih dominan</p>
                        <p className="mt-1 text-sm text-muted-foreground">{dominantLabel}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-foreground">
                          {left} : {right}
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">{balance.dominant}% dominan</p>
                      </div>
                    </div>
                    <div className="mt-4 h-2 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{ width: `${balance.dominant}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 grid gap-4 xl:grid-cols-2">
              <div className="rounded-2xl border border-border bg-background p-5">
                <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Kekuatan utama</p>
                <div className="mt-4 space-y-3">
                  {result.profile.strengths.map((item) => (
                    <div key={item} className="rounded-xl border border-border bg-card px-4 py-3 text-sm leading-6 text-foreground">
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-background p-5">
                <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Area yang perlu dijaga</p>
                <div className="mt-4 space-y-3">
                  {result.profile.watchouts.map((item) => (
                    <div key={item} className="rounded-xl border border-border bg-card px-4 py-3 text-sm leading-6 text-foreground">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {[
                { title: "Gaya kerja", body: result.profile.workStyle },
                { title: "Gaya komunikasi", body: result.profile.communication },
                { title: "Lingkungan ideal", body: result.profile.idealEnvironment },
                { title: "Fokus pengembangan", body: result.profile.developmentFocus },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl border border-border bg-background p-5">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">{item.title}</p>
                  <p className="mt-3 text-sm leading-7 text-foreground">{item.body}</p>
                </div>
              ))}
            </div>

            <p className="mt-8 rounded-2xl border border-dashed border-border bg-background px-5 py-4 text-sm leading-7 text-muted-foreground">
              MBTI di halaman ini diposisikan sebagai alat refleksi preferensi kerja dan interaksi, bukan alat diagnostik psikologis klinis.
              Gunakan hasilnya sebagai bahan membaca pola diri, bukan label kaku yang membatasi perkembangan.
            </p>

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
