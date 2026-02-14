import Layout from "@/components/Layout";
import TestCard from "@/components/TestCard";
import { Shapes, Binary, Calculator, Grid3X3, Eye, Radio } from "lucide-react";

const tests = [
  {
    title: "Pengenalan Pola",
    description: "Mengidentifikasi pola visual yang dihasilkan sistem.",
    duration: "3–5 menit",
    path: "/tes/pengenalan-pola",
    icon: <Shapes className="h-5 w-5" />,
  },
  {
    title: "Daya Ingat Kerja",
    description: "Mengingat dan mengulang urutan angka.",
    duration: "3–5 menit",
    path: "/tes/daya-ingat",
    icon: <Binary className="h-5 w-5" />,
  },
  {
    title: "Kecepatan Pemrosesan",
    description: "Menyelesaikan perhitungan sederhana di bawah tekanan waktu.",
    duration: "2–4 menit",
    path: "/tes/kecepatan-pemrosesan",
    icon: <Calculator className="h-5 w-5" />,
  },
  {
    title: "Kecermatan & Ketahanan Hitung",
    description: "Menjumlahkan angka satuan secara vertikal, gaya Kraepelin digital.",
    duration: "3–5 menit",
    path: "/tes/kraepelin",
    icon: <Grid3X3 className="h-5 w-5" />,
  },
  {
    title: "Ketelitian Visual",
    description: "Menemukan simbol target di antara distraktor.",
    duration: "3–4 menit",
    path: "/tes/ketelitian-visual",
    icon: <Eye className="h-5 w-5" />,
  },
  {
    title: "Fokus Berkelanjutan",
    description: "Merespon hanya stimulus tertentu dalam rangkaian cepat.",
    duration: "3–4 menit",
    path: "/tes/fokus-berkelanjutan",
    icon: <Radio className="h-5 w-5" />,
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
