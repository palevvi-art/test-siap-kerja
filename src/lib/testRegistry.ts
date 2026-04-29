export interface TestMeta {
  id: string;
  name: string;
  description: string;
  duration: string;
  path: string;
  category: "logika" | "memori" | "hitung" | "ketelitian" | "fokus" | "verbal";
}

export const ALL_TESTS: TestMeta[] = [
  {
    id: "pengenalan-pola",
    name: "Logika Pola",
    description: "Identifikasi dan lanjutkan pola visual — mengukur kemampuan analisis cepat.",
    duration: "3–5 menit",
    path: "/tes/pengenalan-pola",
    category: "logika",
  },
  {
    id: "daya-ingat",
    name: "Daya Ingat Angka",
    description: "Ingat dan ulangi urutan angka — mengukur kapasitas memori kerja.",
    duration: "3–5 menit",
    path: "/tes/daya-ingat",
    category: "memori",
  },
  {
    id: "kecepatan-pemrosesan",
    name: "Kecepatan Hitung",
    description: "Selesaikan perhitungan dasar di bawah tekanan waktu — mengukur kecepatan pemrosesan.",
    duration: "2–4 menit",
    path: "/tes/kecepatan-pemrosesan",
    category: "hitung",
  },
  {
    id: "kraepelin",
    name: "Kraepelin Digital",
    description: "Jumlahkan angka vertikal secara berurutan — mengukur ketelitian dan konsistensi hitung.",
    duration: "3–5 menit",
    path: "/tes/kraepelin",
    category: "hitung",
  },
  {
    id: "ketelitian-visual",
    name: "Ketelitian Visual",
    description: "Temukan simbol target di antara pengecoh — mengukur akurasi persepsi visual.",
    duration: "3–4 menit",
    path: "/tes/ketelitian-visual",
    category: "ketelitian",
  },
  {
    id: "fokus-berkelanjutan",
    name: "Konsentrasi",
    description: "Respons stimulus tertentu dalam rangkaian cepat — mengukur fokus berkelanjutan.",
    duration: "3–4 menit",
    path: "/tes/fokus-berkelanjutan",
    category: "fokus",
  },
  {
    id: "hitung-cepat",
    name: "Hitung Cepat",
    description: "Penjumlahan dan pengurangan dengan batas waktu ketat per soal — mengukur kecepatan respons.",
    duration: "2–4 menit",
    path: "/tes/hitung-cepat",
    category: "hitung",
  },
  {
    id: "ketelitian-angka",
    name: "Ketelitian Angka",
    description: "Bandingkan deret angka dan tentukan kesamaannya — mengukur akurasi kerja detail.",
    duration: "3–4 menit",
    path: "/tes/ketelitian-angka",
    category: "ketelitian",
  },
  {
    id: "ketahanan-tugas",
    name: "Ketahanan Kerja",
    description: "Tugas hitung berulang dalam durasi panjang — mengukur konsistensi dan daya tahan.",
    duration: "3–5 menit",
    path: "/tes/ketahanan-tugas",
    category: "fokus",
  },
  {
    id: "penalaran-verbal",
    name: "Penalaran Verbal",
    description: "Sinonim, antonim, dan pemahaman bacaan — mengukur logika dan penalaran bahasa.",
    duration: "~25 menit",
    path: "/tes/penalaran-verbal",
    category: "verbal",
  },
];

export const TEST_NAME: Record<string, string> = Object.fromEntries(
  ALL_TESTS.map((t) => [t.id, t.name]),
);
