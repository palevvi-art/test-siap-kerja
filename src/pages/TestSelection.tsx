import Layout from "@/components/Layout";
import TestCard from "@/components/TestCard";
import { Shapes, Binary, Calculator, Grid3X3, Eye, Radio, Zap, Hash, Brain, BookOpen } from "lucide-react";

const tests = [
  {
    title: "Tes Logika Pola",
    description: "Mengidentifikasi dan melanjutkan pola visual untuk mengukur kemampuan analisis.",
    duration: "3–5 menit",
    path: "/tes/pengenalan-pola",
    icon: <Shapes className="h-5 w-5" />,
  },
  {
    title: "Tes Daya Ingat Angka",
    description: "Mengingat dan mengulang urutan angka untuk mengukur kapasitas daya ingat kerja.",
    duration: "3–5 menit",
    path: "/tes/daya-ingat",
    icon: <Binary className="h-5 w-5" />,
  },
  {
    title: "Tes Kecepatan Hitung",
    description: "Menyelesaikan perhitungan dasar secepat mungkin di bawah tekanan waktu.",
    duration: "2–4 menit",
    path: "/tes/kecepatan-pemrosesan",
    icon: <Calculator className="h-5 w-5" />,
  },
  {
    title: "Tes Kraepelin Digital (Tes Koran)",
    description: "Menjumlahkan angka secara vertikal untuk mengukur ketelitian dan konsistensi kerja.",
    duration: "3–5 menit",
    path: "/tes/kraepelin",
    icon: <Grid3X3 className="h-5 w-5" />,
  },
  {
    title: "Tes Ketelitian Visual",
    description: "Menemukan simbol target di antara pengecoh untuk mengukur ketelitian visual.",
    duration: "3–4 menit",
    path: "/tes/ketelitian-visual",
    icon: <Eye className="h-5 w-5" />,
  },
  {
    title: "Tes Konsentrasi",
    description: "Merespon stimulus tertentu dalam rangkaian cepat untuk mengukur fokus dan konsentrasi.",
    duration: "3–4 menit",
    path: "/tes/fokus-berkelanjutan",
    icon: <Radio className="h-5 w-5" />,
  },
  {
    title: "Tes Hitung Cepat",
    description: "Penjumlahan dan pengurangan dengan batas waktu ketat per soal. Mengukur kecepatan respon.",
    duration: "2–4 menit",
    path: "/tes/hitung-cepat",
    icon: <Zap className="h-5 w-5" />,
  },
  {
    title: "Tes Ketelitian Angka",
    description: "Membandingkan deret angka untuk mengukur ketelitian dan akurasi dalam bekerja.",
    duration: "3–4 menit",
    path: "/tes/ketelitian-angka",
    icon: <Hash className="h-5 w-5" />,
  },
  {
    title: "Tes Ketahanan Kerja",
    description: "Tugas hitung berulang dalam durasi panjang untuk mengukur konsistensi dan daya tahan kerja.",
    duration: "3–5 menit",
    path: "/tes/ketahanan-tugas",
    icon: <Brain className="h-5 w-5" />,
  },
  {
    title: "Tes Penalaran Verbal",
    description: "Mengukur pemahaman verbal dan logika komunikasi melalui sinonim, antonim, dan pemahaman bacaan.",
    duration: "~25 menit",
    path: "/tes/penalaran-verbal",
    icon: <BookOpen className="h-5 w-5" />,
  },
];

const TestSelection = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">Pilih Tes</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Pilih tes kinerja kognitif yang ingin Anda kerjakan.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tests.map((test) => (
            <TestCard key={test.path} {...test} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default TestSelection;
