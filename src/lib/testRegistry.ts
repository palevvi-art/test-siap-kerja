export interface TestFaq {
  question: string;
  answer: string;
}

export interface TestMeta {
  id: string;
  name: string;
  description: string;
  duration: string;
  path: string;
  startPath: string;
  category: "logika" | "memori" | "hitung" | "ketelitian" | "fokus" | "verbal";
  seoTitle: string;
  seoDescription: string;
  heroTitle: string;
  intro: string[];
  measures: string[];
  usedFor: string[];
  faq: TestFaq[];
}

function buildTestMeta(config: Omit<TestMeta, "startPath">): TestMeta {
  return {
    ...config,
    startPath: `${config.path}/mulai`,
  };
}

export const ALL_TESTS: TestMeta[] = [
  buildTestMeta({
    id: "pengenalan-pola",
    name: "Logika Pola",
    description: "Identifikasi dan lanjutkan pola visual. Mengukur kemampuan analisis cepat.",
    duration: "3-5 menit",
    path: "/tes/pengenalan-pola",
    category: "logika",
    seoTitle: "Tes Logika Pola Online Gratis untuk Seleksi Kerja",
    seoDescription:
      "Latihan tes logika pola online gratis untuk persiapan seleksi kerja, BUMN, CPNS, dan perusahaan swasta. Ukur analisis visual, konsentrasi, dan konsistensi respons.",
    heroTitle: "Tes Logika Pola Online Gratis",
    intro: [
      "Tes logika pola menguji kemampuan Anda membaca hubungan visual, menemukan aturan perubahan, lalu memilih pola berikutnya secara cepat.",
      "Jenis tes ini sering muncul dalam seleksi kerja karena membantu melihat cara berpikir analitis, ketepatan observasi, dan konsistensi pengambilan keputusan di bawah waktu terbatas.",
    ],
    measures: ["Analisis pola visual", "Kecepatan mengenali aturan", "Ketepatan keputusan saat waktu berjalan"],
    usedFor: ["Latihan seleksi BUMN", "Persiapan CPNS dan bank", "Assessment reasoning untuk perusahaan swasta"],
    faq: [
      {
        question: "Apa itu tes logika pola?",
        answer:
          "Tes logika pola adalah tes visual yang meminta Anda menemukan aturan perubahan bentuk, arah, atau susunan, lalu menentukan pola yang paling tepat berikutnya.",
      },
      {
        question: "Apa yang diukur dari tes logika pola?",
        answer:
          "Tes ini terutama mengukur penalaran abstrak, kecepatan analisis visual, dan ketelitian saat membandingkan beberapa pilihan jawaban.",
      },
    ],
  }),
  buildTestMeta({
    id: "daya-ingat",
    name: "Daya Ingat Angka",
    description: "Ingat dan ulangi urutan angka. Mengukur kapasitas memori kerja.",
    duration: "3-5 menit",
    path: "/tes/daya-ingat",
    category: "memori",
    seoTitle: "Tes Daya Ingat Angka Online Gratis",
    seoDescription:
      "Tes daya ingat angka online gratis untuk melatih memori kerja, fokus, dan akurasi recall. Cocok untuk persiapan tes psikologi kerja dan assessment online.",
    heroTitle: "Tes Daya Ingat Angka Online",
    intro: [
      "Tes daya ingat angka meminta Anda menyimpan urutan angka dalam ingatan jangka pendek lalu mengulanginya dengan tepat.",
      "Latihan ini relevan untuk seleksi kerja yang menilai kapasitas memori kerja, fokus sesaat, dan kemampuan mempertahankan informasi saat beban tugas meningkat.",
    ],
    measures: ["Memori kerja jangka pendek", "Fokus terhadap detail angka", "Ketahanan recall di bawah tekanan"],
    usedFor: ["Tes psikologi kerja online", "Latihan memori untuk seleksi administrasi", "Persiapan assessment entry-level"],
    faq: [
      {
        question: "Apa itu tes daya ingat angka?",
        answer:
          "Tes daya ingat angka adalah latihan memori kerja yang meminta peserta mengingat urutan angka lalu menjawab kembali secara akurat.",
      },
      {
        question: "Kenapa tes daya ingat angka sering dipakai saat seleksi?",
        answer:
          "Tes ini membantu melihat kemampuan menyimpan informasi singkat, menjaga fokus, dan tetap akurat saat informasi diberikan cepat.",
      },
    ],
  }),
  buildTestMeta({
    id: "kecepatan-pemrosesan",
    name: "Kecepatan Hitung",
    description: "Selesaikan perhitungan dasar di bawah tekanan waktu. Mengukur kecepatan pemrosesan.",
    duration: "2-4 menit",
    path: "/tes/kecepatan-pemrosesan",
    category: "hitung",
    seoTitle: "Tes Kecepatan Hitung Online Gratis",
    seoDescription:
      "Latihan tes kecepatan hitung online gratis untuk mengukur kecepatan pemrosesan, respons mental, dan akurasi perhitungan dasar saat tes kerja.",
    heroTitle: "Tes Kecepatan Hitung Online",
    intro: [
      "Tes kecepatan hitung menuntut Anda memproses perhitungan dasar dengan cepat sambil tetap menjaga akurasi jawaban.",
      "Soal seperti ini umum dipakai untuk memetakan kecepatan kerja mental, ritme respons, dan kemampuan menjaga fokus saat volume tugas meningkat.",
    ],
    measures: ["Kecepatan pemrosesan mental", "Akurasi hitungan dasar", "Stabilitas performa di bawah waktu singkat"],
    usedFor: ["Seleksi administrasi dan operasional", "Latihan tes numerik kerja", "Persiapan assessment perusahaan swasta"],
    faq: [
      {
        question: "Apa yang dinilai dalam tes kecepatan hitung?",
        answer:
          "Tes ini menilai seberapa cepat Anda memproses soal hitung sederhana dan seberapa konsisten Anda menjaga jawaban tetap benar.",
      },
      {
        question: "Apakah tes kecepatan hitung sama dengan tes matematika sekolah?",
        answer:
          "Tidak. Fokusnya bukan rumus kompleks, tetapi kecepatan respons dan akurasi pada operasi hitung dasar dalam waktu terbatas.",
      },
    ],
  }),
  buildTestMeta({
    id: "kraepelin",
    name: "Kraepelin Digital",
    description: "Jumlahkan angka vertikal secara berurutan. Mengukur ketelitian dan konsistensi hitung.",
    duration: "3-5 menit",
    path: "/tes/kraepelin",
    category: "hitung",
    seoTitle: "Tes Kraepelin Digital Online Gratis",
    seoDescription:
      "Tes Kraepelin digital online gratis untuk latihan seleksi kerja BUMN, CPNS, bank, dan swasta. Ukur ketelitian hitung, konsistensi kerja, fokus, dan ritme respons.",
    heroTitle: "Tes Kraepelin Digital Online Gratis",
    intro: [
      "Tes Kraepelin adalah tes penjumlahan angka vertikal berulang yang digunakan untuk melihat ritme kerja, ketelitian, dan konsistensi saat peserta harus terus fokus.",
      "Dalam seleksi kerja, tes ini sering dipakai karena mampu menunjukkan kecenderungan performa saat tugas terasa monoton, menekan, dan menuntut akurasi stabil.",
    ],
    measures: ["Ketelitian penjumlahan angka", "Konsistensi performa antar-segmen", "Daya tahan fokus pada tugas repetitif"],
    usedFor: ["Seleksi BUMN dan CPNS", "Tes psikologi bank dan FMCG", "Assessment operasional dan administrasi"],
    faq: [
      {
        question: "Apa itu tes Kraepelin?",
        answer:
          "Tes Kraepelin adalah tes penjumlahan angka vertikal yang dikerjakan berurutan untuk mengukur ketelitian, kecepatan kerja, dan konsistensi performa.",
      },
      {
        question: "Kenapa tes Kraepelin sering dipakai saat seleksi kerja?",
        answer:
          "Karena tes ini membantu melihat ritme kerja, daya tahan menghadapi tugas repetitif, serta kestabilan akurasi saat tekanan waktu tetap berjalan.",
      },
    ],
  }),
  buildTestMeta({
    id: "ketelitian-visual",
    name: "Ketelitian Visual",
    description: "Temukan simbol target di antara pengecoh. Mengukur akurasi persepsi visual.",
    duration: "3-4 menit",
    path: "/tes/ketelitian-visual",
    category: "ketelitian",
    seoTitle: "Tes Ketelitian Visual Online Gratis",
    seoDescription:
      "Tes ketelitian visual online gratis untuk mengukur akurasi persepsi, fokus detail, dan kecepatan membedakan simbol. Cocok untuk latihan tes kerja.",
    heroTitle: "Tes Ketelitian Visual Online",
    intro: [
      "Tes ketelitian visual mengharuskan Anda menemukan target tertentu di antara banyak simbol yang mirip dalam waktu singkat.",
      "Model soal ini efektif untuk melihat kecermatan observasi, fokus pada detail kecil, dan kemampuan menghindari kesalahan karena terburu-buru.",
    ],
    measures: ["Akurasi persepsi visual", "Fokus terhadap detail kecil", "Kecepatan membedakan target dan pengecoh"],
    usedFor: ["Latihan seleksi administrasi", "Tes ketelitian operator", "Assessment back office dan quality control"],
    faq: [
      {
        question: "Apa tujuan tes ketelitian visual?",
        answer:
          "Tujuannya adalah mengukur kemampuan Anda membedakan objek yang mirip, menemukan target dengan cepat, dan menjaga akurasi di bawah tekanan.",
      },
      {
        question: "Siapa yang cocok berlatih tes ketelitian visual?",
        answer:
          "Peserta seleksi kerja untuk peran administrasi, operator, quality control, atau posisi lain yang menuntut perhatian tinggi pada detail.",
      },
    ],
  }),
  buildTestMeta({
    id: "fokus-berkelanjutan",
    name: "Konsentrasi",
    description: "Respons stimulus tertentu dalam rangkaian cepat. Mengukur fokus berkelanjutan.",
    duration: "3-4 menit",
    path: "/tes/fokus-berkelanjutan",
    category: "fokus",
    seoTitle: "Tes Konsentrasi Online Gratis untuk Seleksi Kerja",
    seoDescription:
      "Tes konsentrasi online gratis untuk mengukur fokus berkelanjutan, kontrol impuls, dan konsistensi respons. Cocok untuk latihan tes psikologi kerja.",
    heroTitle: "Tes Konsentrasi Online Gratis",
    intro: [
      "Tes konsentrasi mengukur kemampuan Anda menjaga perhatian pada stimulus tertentu dalam rangkaian yang bergerak cepat dan berulang.",
      "Soal semacam ini sering dipakai untuk menilai apakah peserta mampu tetap fokus, tidak mudah terpancing, dan minim salah tekan saat durasi berjalan terus.",
    ],
    measures: ["Fokus berkelanjutan", "Kontrol impuls", "Konsistensi respons dari awal sampai akhir"],
    usedFor: ["Seleksi operator dan administrasi", "Assessment konsentrasi kerja", "Latihan menghadapi tes fokus online"],
    faq: [
      {
        question: "Apa yang dimaksud tes konsentrasi kerja?",
        answer:
          "Tes konsentrasi kerja adalah latihan yang menilai kemampuan mempertahankan perhatian, menahan respons yang tidak perlu, dan tetap akurat selama rangkaian soal.",
      },
      {
        question: "Apakah tes konsentrasi hanya mengukur cepat atau lambat?",
        answer:
          "Tidak. Yang dinilai adalah gabungan antara kecepatan, kestabilan fokus, dan kemampuan menekan kesalahan impulsif.",
      },
    ],
  }),
  buildTestMeta({
    id: "hitung-cepat",
    name: "Hitung Cepat",
    description: "Penjumlahan dan pengurangan dengan batas waktu ketat per soal. Mengukur kecepatan respons.",
    duration: "2-4 menit",
    path: "/tes/hitung-cepat",
    category: "hitung",
    seoTitle: "Tes Hitung Cepat Online Gratis",
    seoDescription:
      "Tes hitung cepat online gratis untuk melatih kecepatan respons numerik, ketepatan hitung, dan fokus di bawah waktu singkat. Cocok untuk tes kerja numerik.",
    heroTitle: "Tes Hitung Cepat Online",
    intro: [
      "Tes hitung cepat berfokus pada penjumlahan dan pengurangan singkat yang harus dijawab segera tanpa banyak waktu berpikir ulang.",
      "Latihan ini membantu melihat ketangkasan numerik dasar, kecepatan membaca angka, dan kestabilan akurasi saat waktu per soal sangat ketat.",
    ],
    measures: ["Respons numerik cepat", "Akurasi hitung sederhana", "Stabilitas saat tekanan waktu tinggi"],
    usedFor: ["Tes numerik kerja", "Latihan operator kasir dan admin", "Persiapan assessment entry-level"],
    faq: [
      {
        question: "Apa bedanya tes hitung cepat dan tes kecepatan hitung?",
        answer:
          "Tes hitung cepat lebih menekankan ritme per soal yang ketat, sedangkan tes kecepatan hitung dapat melihat performa umum dalam satu durasi yang lebih kontinu.",
      },
      {
        question: "Bagaimana cara berlatih tes hitung cepat?",
        answer:
          "Fokus pada akurasi dasar dulu, lalu bangun ritme menjawab tanpa banyak berhenti. Hindari terlalu lama di satu soal agar performa tetap stabil.",
      },
    ],
  }),
  buildTestMeta({
    id: "ketelitian-angka",
    name: "Ketelitian Angka",
    description: "Bandingkan deret angka dan tentukan kesamaannya. Mengukur akurasi kerja detail.",
    duration: "3-4 menit",
    path: "/tes/ketelitian-angka",
    category: "ketelitian",
    seoTitle: "Tes Ketelitian Angka Online Gratis",
    seoDescription:
      "Tes ketelitian angka online gratis untuk melatih akurasi membandingkan deret angka, perhatian pada detail, dan kecepatan kerja administratif.",
    heroTitle: "Tes Ketelitian Angka Online",
    intro: [
      "Tes ketelitian angka meminta Anda membandingkan deret angka dan menemukan apakah ada perbedaan sekecil apa pun.",
      "Jenis soal ini sering dipakai untuk melihat ketelitian administrasi, kemampuan spotting error, dan fokus terhadap detail numerik berulang.",
    ],
    measures: ["Pemeriksaan detail angka", "Akurasi spotting error", "Konsistensi kerja administratif"],
    usedFor: ["Seleksi admin dan data entry", "Latihan ketelitian numerik", "Assessment back office"],
    faq: [
      {
        question: "Apa yang diukur dalam tes ketelitian angka?",
        answer:
          "Tes ini mengukur kemampuan membedakan angka yang mirip, menemukan kesalahan kecil, dan menjaga akurasi pada pekerjaan yang detail.",
      },
      {
        question: "Apakah tes ketelitian angka cocok untuk latihan data entry?",
        answer:
          "Ya. Pola soalnya sangat relevan untuk pekerjaan yang menuntut pengecekan angka, dokumen, atau input data dengan risiko salah ketik kecil.",
      },
    ],
  }),
  buildTestMeta({
    id: "ketahanan-tugas",
    name: "Ketahanan Kerja",
    description: "Tugas hitung berulang dalam durasi panjang. Mengukur konsistensi dan daya tahan.",
    duration: "3-5 menit",
    path: "/tes/ketahanan-tugas",
    category: "fokus",
    seoTitle: "Tes Ketahanan Kerja Online Gratis",
    seoDescription:
      "Tes ketahanan kerja online gratis untuk mengukur daya tahan fokus, konsistensi saat tugas berulang, dan stabilitas performa hingga akhir sesi.",
    heroTitle: "Tes Ketahanan Kerja Online",
    intro: [
      "Tes ketahanan kerja menilai apakah performa Anda tetap stabil ketika harus mengerjakan tugas yang mirip secara berulang dalam satu sesi.",
      "Di dunia kerja, kemampuan seperti ini penting untuk peran yang menuntut ritme stabil, kontrol kesalahan, dan fokus yang tidak cepat turun.",
    ],
    measures: ["Daya tahan fokus", "Konsistensi saat tugas repetitif", "Stabilitas akurasi sampai akhir"],
    usedFor: ["Latihan tes psikologi kerja", "Assessment operasional berulang", "Seleksi peran yang menuntut ritme stabil"],
    faq: [
      {
        question: "Apa tujuan tes ketahanan kerja?",
        answer:
          "Tujuannya adalah melihat apakah peserta mampu mempertahankan kualitas kerja saat tugas terasa monoton dan harus dilakukan terus menerus.",
      },
      {
        question: "Kenapa tes ketahanan kerja penting untuk seleksi?",
        answer:
          "Karena banyak posisi kerja membutuhkan kestabilan performa jangka pendek, bukan hanya kemampuan menjawab cepat di awal sesi saja.",
      },
    ],
  }),
  buildTestMeta({
    id: "penalaran-verbal",
    name: "Penalaran Verbal",
    description: "Sinonim, antonim, dan pemahaman bacaan. Mengukur logika dan penalaran bahasa.",
    duration: "25 menit",
    path: "/tes/penalaran-verbal",
    category: "verbal",
    seoTitle: "Tes Penalaran Verbal Online Gratis",
    seoDescription:
      "Tes penalaran verbal online gratis untuk melatih sinonim, antonim, logika bahasa, dan pemahaman bacaan. Cocok untuk seleksi kerja dan tes psikologi verbal.",
    heroTitle: "Tes Penalaran Verbal Online",
    intro: [
      "Tes penalaran verbal mengukur kemampuan memahami makna kata, hubungan bahasa, serta menangkap inti informasi dari teks singkat.",
      "Latihan ini sering dipakai untuk melihat kejernihan berpikir, ketepatan memahami instruksi, dan kemampuan menalar melalui bahasa tertulis.",
    ],
    measures: ["Relasi kata dan makna", "Pemahaman bacaan singkat", "Ketepatan logika verbal"],
    usedFor: ["Tes verbal seleksi kerja", "Latihan CPNS dan BUMN", "Assessment role yang menuntut komunikasi tertulis"],
    faq: [
      {
        question: "Apa yang dimaksud tes penalaran verbal?",
        answer:
          "Tes penalaran verbal adalah tes yang mengukur kemampuan memahami kata, kalimat, makna, dan hubungan logis dalam bahasa tertulis.",
      },
      {
        question: "Apakah tes penalaran verbal penting untuk seleksi kerja?",
        answer:
          "Ya. Banyak perusahaan menggunakannya untuk melihat kejelasan berpikir, pemahaman instruksi, dan kemampuan memproses informasi tertulis secara akurat.",
      },
    ],
  }),
];

export const TEST_NAME: Record<string, string> = Object.fromEntries(ALL_TESTS.map((test) => [test.id, test.name]));

export const TEST_BY_ID: Record<string, TestMeta> = Object.fromEntries(ALL_TESTS.map((test) => [test.id, test]));
