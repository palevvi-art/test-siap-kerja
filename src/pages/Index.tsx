import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  Brain,
  Check,
  CheckCircle2,
  Clock3,
  LayoutGrid,
  ShieldCheck,
  Sparkles,
  Target,
} from "lucide-react";
import PageMeta from "@/components/PageMeta";
import { ALL_TESTS } from "@/lib/testRegistry";

const HERO_METRICS = [
  { label: "Modul", value: `${ALL_TESTS.length}` },
  { label: "Durasi", value: "2-5 mnt" },
  { label: "Akses", value: "Tanpa login" },
];

const HERO_ACTIVITY = [
  { title: "Kraepelin Digital", detail: "Sesi selesai • 91% akurasi", time: "Baru saja", progress: 91 },
  { title: "Deret Angka", detail: "Latihan lanjutan • 4 menit", time: "2 menit lalu", progress: 72 },
  { title: "Fokus Warna", detail: "Perlu latihan ulang", time: "5 menit lalu", progress: 58 },
];

const WEEKLY_ACCURACY = [44, 60, 58, 80, 74, 92, 86];
const WEEKLY_DAY_LABELS = ["Sn", "Sl", "Rb", "Km", "Jm", "Sb", "Mg"];
const WEEKLY_CHART_PATH = "M 16 124 C 48 110, 66 88, 82 90 C 98 92, 116 58, 132 48 C 148 38, 168 20, 190 28 C 212 36, 232 12, 260 16";

const TRUST_LABELS = ["BUMN", "CPNS", "Bank", "Admin", "Operator", "QC", "Back Office", "FMCG"];

const KEYWORD_TILES = [
  "Tes kognitif online gratis untuk seleksi kerja",
  "Simulasi tes BUMN dan CPNS tanpa registrasi",
  "Latihan Kraepelin, deret angka, fokus, verbal, dan memori",
];

const BENEFITS = [
  {
    title: "Mulai dari kategori yang paling relevan",
    body: "Modul dibagi rapi agar Anda bisa langsung fokus ke jalur latihan yang paling dekat dengan target seleksi.",
  },
  {
    title: "Buka hasil tanpa menunggu lama",
    body: "Akurasi dan ringkasan performa tampil cepat, sementara detail visual tetap tersedia saat dibutuhkan.",
  },
  {
    title: "Latihan terasa ringan, bukan melelahkan",
    body: "Sesi singkat memudahkan Anda berlatih rutin tanpa harus menyediakan waktu panjang setiap hari.",
  },
];

const HOW_STEPS = [
  {
    step: "01",
    title: "Pilih jalur latihan yang paling dekat dengan target seleksi",
    body: "Numerik untuk ritme hitung dan akurasi, verbal untuk bahasa dan instruksi, fokus untuk konsentrasi dan ketelitian.",
  },
  {
    step: "02",
    title: "Kerjakan dua sampai tiga modul inti dalam satu sesi singkat",
    body: "Sesi pendek lebih realistis untuk dipakai berulang. Ritme latihan jadi lebih mudah dipertahankan.",
  },
  {
    step: "03",
    title: "Ulangi modul yang akurasinya masih turun",
    body: "Setelah hasil terbuka, jalur mana yang perlu diulang langsung terlihat tanpa perlu ditebak.",
  },
];

const CATEGORY_COLUMNS = [
  {
    title: "Numerik dan logika",
    body: "Untuk ritme hitung, pola, dan reasoning yang sering muncul di screening kerja.",
    items: ["Deret Angka", "Logika Pola", "Kraepelin Digital", "Aritmetika Campuran"],
  },
  {
    title: "Fokus dan ketelitian",
    body: "Untuk spotting error, kontrol impuls, dan konsentrasi stabil saat tugas berulang.",
    items: ["Fokus Warna", "Konsentrasi", "Pemeriksaan Kode", "Ketelitian Visual"],
  },
  {
    title: "Memori dan verbal",
    body: "Untuk recall cepat, pemahaman instruksi, analogi kata, dan ketepatan bahasa.",
    items: ["Memori Visual", "Daya Ingat Angka", "Analogi Kata", "Penalaran Verbal"],
  },
];

const PRODUCT_PROOF = [
  "Setiap modul punya intro sebelum sesi dimulai.",
  "Kategori memudahkan memilih jalur latihan yang relevan.",
  "Halaman hasil terbuka cepat dan tetap informatif.",
];

const homepageSchema = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "KognitiF",
    url: "https://test-siap-kerja.vercel.app/",
    description:
      "Platform tes kinerja kognitif gratis untuk latihan seleksi kerja, BUMN, CPNS, dan perusahaan swasta.",
  },
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Daftar Tes Kognitif Online",
    itemListElement: ALL_TESTS.map((test, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: test.name,
      url: `https://test-siap-kerja.vercel.app${test.path}`,
    })),
  },
];

export default function Index() {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (nodes.length === 0) return;

    if (typeof window === "undefined" || typeof window.IntersectionObserver === "undefined") {
      nodes.forEach((node) => node.classList.add("reveal-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -10% 0px" },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#f7f6f1] text-slate-950">
      <PageMeta
        title="Tes Kognitif Online Gratis untuk Latihan Seleksi Kerja | KognitiF"
        description={`Latihan ${ALL_TESTS.length} tes kognitif online gratis untuk persiapan BUMN, CPNS, dan seleksi kerja swasta. Tanpa registrasi, tanpa bank soal, langsung mulai.`}
        canonicalPath="/"
        schema={homepageSchema}
      />

      <header className="border-b border-black/10 bg-[#f7f6f1]/95 backdrop-blur">
        <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-black text-sm font-semibold text-white">
              K
            </div>
            <div>
              <p className="text-sm font-semibold tracking-tight text-slate-950">KognitiF</p>
              <p className="text-[11px] uppercase tracking-[0.24em] text-slate-500">
                Tes Kerja Online
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/tes"
              className="hidden text-sm font-medium text-slate-500 transition-colors hover:text-slate-950 md:inline-flex"
            >
              Katalog Tes
            </Link>
            <Link
              to="/tes"
              className="inline-flex items-center gap-2 rounded-full bg-black px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-85"
            >
              Mulai
            </Link>
          </div>
        </div>
      </header>

      <section className="overflow-hidden border-b border-black/10">
        <div className="container mx-auto max-w-6xl px-5 py-12 md:px-6 md:py-16 lg:py-20">
          <div className="mx-auto max-w-4xl text-center">
            <div className="landing-hero-copy landing-stagger-1 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-slate-600">
              <Sparkles className="h-3.5 w-3.5 text-emerald-700" />
              Latihan Kognitif untuk Seleksi Kerja
            </div>

            <h1 className="landing-hero-copy landing-stagger-2 mx-auto mt-6 max-w-[12.5ch] text-balance text-[2.65rem] font-semibold leading-[1.02] tracking-[-0.045em] text-slate-950 sm:text-[3.15rem] md:text-[3.8rem] lg:text-[4.35rem]">
              <span className="block">Latihan tes kerja</span>
              <span className="mt-1 block">yang rapi, cepat,</span>
              <span className="mt-1 block">dan mudah diulang.</span>
            </h1>

            <p className="landing-hero-copy landing-stagger-3 mx-auto mt-5 max-w-2xl text-[15px] leading-7 text-slate-600 sm:text-base md:text-[17px] md:leading-8">
              {ALL_TESTS.length} modul gratis untuk numerik, memori, fokus, verbal, dan ketelitian.
              Langsung mulai dari browser tanpa akun dan tanpa alur yang membuang waktu.
            </p>

            <div className="landing-hero-copy landing-stagger-4 mt-8 flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
              <Link
                to="/tes"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-black px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-85"
              >
                Mulai Tes Gratis
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/tes/kraepelin"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-black/10 bg-white px-5 py-3 text-sm font-medium text-slate-950 transition-colors hover:bg-slate-50"
              >
                Coba Kraepelin
              </Link>
            </div>

            <div className="mx-auto mt-8 grid max-w-3xl gap-3 sm:grid-cols-3">
              {HERO_METRICS.map((metric, index) => (
                <div
                  key={metric.label}
                  className={`landing-hero-copy landing-stagger-${index + 5} rounded-[24px] border border-black/10 bg-white px-4 py-4`}
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                    {metric.label}
                  </p>
                  <p className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
                    {metric.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto mt-12 max-w-5xl">
            <div className="landing-hero-panel relative z-10 rounded-[28px] border border-black bg-[#111111] p-3 text-white shadow-[0_24px_80px_rgba(15,23,42,0.18)] sm:p-4">
              <div className="rounded-[22px] border border-white/10 bg-[#161616] p-3 sm:p-4">
                <div className="mb-4 flex items-center justify-between rounded-[18px] border border-white/8 bg-white/[0.03] px-3 py-2">
                  <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-slate-500">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    Sesi aktif
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                    <span className="h-2 w-2 rounded-full bg-slate-600" />
                    Tersimpan lokal
                  </div>
                </div>
                <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
                  <div>
                    <p className="landing-hero-copy landing-stagger-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-400">
                      Dashboard latihan
                    </p>
                    <h2 className="landing-hero-copy landing-stagger-3 mt-2 text-xl font-semibold tracking-tight text-white">
                      Ringkasan performa hari ini
                    </h2>
                  </div>
                  <div className="landing-hero-copy landing-stagger-4 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
                    Real-time lokal
                  </div>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  <div className="landing-hero-copy landing-stagger-5 rounded-[22px] border border-white/10 bg-white/[0.03] p-4">
                    <Clock3 className="h-4 w-4 text-emerald-400" />
                    <p className="mt-3 text-2xl font-semibold text-white">18:40</p>
                    <p className="text-xs text-slate-400">Durasi latihan minggu ini</p>
                  </div>
                  <div className="landing-hero-copy landing-stagger-6 rounded-[22px] border border-white/10 bg-white/[0.03] p-4">
                    <BarChart3 className="h-4 w-4 text-emerald-400" />
                    <p className="mt-3 text-2xl font-semibold text-white">84%</p>
                    <p className="text-xs text-slate-400">Rata-rata akurasi</p>
                  </div>
                  <div className="landing-hero-copy landing-stagger-7 rounded-[22px] border border-white/10 bg-white/[0.03] p-4">
                    <Brain className="h-4 w-4 text-emerald-400" />
                    <p className="mt-3 text-2xl font-semibold text-white">4 jalur</p>
                    <p className="text-xs text-slate-400">Kategori yang sering dipakai</p>
                  </div>
                </div>

                <div className="mt-4 grid gap-4 xl:grid-cols-[0.94fr_1.06fr]">
                  <div className="landing-hero-copy landing-stagger-6 rounded-[22px] border border-white/10 bg-white/[0.03] p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-white">Riwayat latihan</p>
                      <span className="rounded-full bg-emerald-500/12 px-2.5 py-1 text-[11px] font-medium text-emerald-300">
                        Live
                      </span>
                    </div>
                    <div className="mt-4 space-y-3">
                      {HERO_ACTIVITY.map((item, index) => (
                        <div
                          key={item.title}
                          className={`landing-hero-copy landing-stream-item landing-stream-card landing-stagger-${index + 6} rounded-[18px] border border-white/10 bg-white/[0.025] px-3 py-3`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-start gap-3">
                              <span className="landing-live-dot mt-1.5 h-2.5 w-2.5 rounded-full bg-emerald-400" />
                              <div>
                                <p className="text-sm font-medium text-white">{item.title}</p>
                                <p className="text-xs text-slate-400">{item.detail}</p>
                              </div>
                            </div>
                            <span className="text-[11px] text-slate-500">{item.time}</span>
                          </div>
                          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
                            <div
                              className="landing-progress-line h-full rounded-full bg-[linear-gradient(90deg,rgba(16,185,129,0.85),rgba(110,231,183,0.95))]"
                              style={{ width: `${item.progress}%`, animationDelay: `${index * 140 + 240}ms` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="landing-hero-copy landing-stagger-7 rounded-[22px] border border-white/10 bg-white/[0.03] p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-white">Tren akurasi mingguan</p>
                      <div className="flex items-center gap-1 text-xs text-emerald-300">
                        <Target className="h-3.5 w-3.5" />
                        Stabil meningkat
                      </div>
                    </div>
                    <div className="relative mt-5 h-36 overflow-hidden rounded-[18px] border border-white/8 bg-white/[0.025] px-3 pb-3 pt-4 sm:h-40">
                      <div className="pointer-events-none absolute inset-x-3 top-5 h-px bg-white/10" />
                      <div className="pointer-events-none absolute inset-x-3 top-1/2 h-px -translate-y-1/2 bg-white/6" />
                      <svg
                        viewBox="0 0 276 132"
                        className="pointer-events-none absolute inset-x-3 bottom-10 h-[112px] w-[calc(100%-24px)] overflow-visible"
                        aria-hidden="true"
                      >
                        <defs>
                          <linearGradient id="weekly-line" x1="0%" x2="100%" y1="0%" y2="0%">
                            <stop offset="0%" stopColor="rgba(52,211,153,0.35)" />
                            <stop offset="55%" stopColor="rgba(52,211,153,0.95)" />
                            <stop offset="100%" stopColor="rgba(167,243,208,0.6)" />
                          </linearGradient>
                        </defs>
                        <path
                          d={WEEKLY_CHART_PATH}
                          fill="none"
                          stroke="url(#weekly-line)"
                          strokeWidth="3.5"
                          strokeLinecap="round"
                          className="landing-chart-line"
                        />
                        {[
                          { cx: 16, cy: 124 },
                          { cx: 52, cy: 98 },
                          { cx: 88, cy: 92 },
                          { cx: 124, cy: 52 },
                          { cx: 160, cy: 64 },
                          { cx: 214, cy: 18 },
                          { cx: 260, cy: 28 },
                        ].map((point, index) => (
                          <circle
                            key={`${point.cx}-${point.cy}`}
                            cx={point.cx}
                            cy={point.cy}
                            r="4.5"
                            fill="#a7f3d0"
                            className="landing-chart-dot"
                            style={{ animationDelay: `${index * 140 + 360}ms` }}
                          />
                        ))}
                      </svg>
                      <div className="relative z-10 flex h-full items-end gap-2">
                      {WEEKLY_ACCURACY.map((height, index) => (
                        <div key={height} className="flex flex-1 flex-col items-center gap-2">
                          <div
                            className="landing-rise landing-bar-glow w-full rounded-t-md bg-[linear-gradient(180deg,rgba(16,185,129,0.95),rgba(16,185,129,0.18))]"
                            style={{ height: `${height}%`, animationDelay: `${index * 110}ms` }}
                          />
                          <span className="text-[11px] text-slate-500">
                            {WEEKLY_DAY_LABELS[index]}
                          </span>
                        </div>
                      ))}
                    </div>
                    </div>
                    <div className="landing-hero-copy landing-stagger-8 mt-4 rounded-[18px] border border-dashed border-white/10 px-3 py-3 text-sm text-slate-400">
                      Hasil inti terbuka cepat. Breakdown detail tetap ada saat dibutuhkan.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="landing-float-delay absolute left-8 top-0 z-20 hidden -translate-y-1/2 rounded-full border border-black/10 bg-white/96 px-4 py-2 text-slate-950 shadow-[0_18px_40px_rgba(15,23,42,0.08)] 2xl:block">
              <div className="flex items-center gap-2 text-sm font-medium">
                <ShieldCheck className="h-4 w-4 text-emerald-700" />
                Tanpa registrasi
              </div>
            </div>

            <div className="landing-float-slow absolute bottom-6 -right-5 z-20 hidden rounded-[22px] border border-black/10 bg-white/96 px-3 py-2 text-slate-950 shadow-[0_18px_40px_rgba(15,23,42,0.08)] 2xl:block">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Sparkles className="h-4 w-4 text-emerald-700" />
                Hasil transparan
              </div>
              <p className="mt-1 text-xs text-slate-500">Tanpa label generik</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-black text-white" data-reveal>
        <div className="container mx-auto max-w-6xl px-5 py-12 md:px-6">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300">
                Intent pencarian yang dilayani
              </p>
              <h2 className="mt-3 text-[1.95rem] font-semibold leading-tight tracking-tight text-white md:text-[2.1rem]">
                Dari keyword ke modul yang relevan tanpa membuat pengunjung tersesat di halaman.
              </h2>
            </div>
            <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
              SEO yang tetap terasa seperti produk
            </div>
          </div>
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {KEYWORD_TILES.map((item) => (
              <div key={item} className="rounded-[22px] border border-white/10 bg-white/[0.04] px-4 py-4 text-sm leading-7 text-slate-300">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto max-w-6xl px-5 py-14 md:px-6" data-reveal>
        <div className="grid gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
              Kenapa lebih enak dipakai
            </p>
            <h2 className="mt-3 text-[2rem] font-semibold leading-tight tracking-tight text-slate-950 md:text-[2.3rem]">
              Alur yang rapi membuat latihan terasa ringan sejak sesi pertama.
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-600">
              Fokus halaman ini sederhana: membantu pengunjung paham konteks, memilih jalur latihan, lalu masuk ke tes secepat mungkin.
            </p>
          </div>

          <div className="grid gap-4">
            {BENEFITS.map((item) => (
              <div key={item.title} className="rounded-[26px] border border-black/10 bg-white px-5 py-5">
                <p className="text-base font-semibold leading-7 text-slate-950">{item.title}</p>
                <p className="mt-2 text-sm leading-7 text-slate-600">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto max-w-6xl px-5 py-14 md:px-6" data-reveal>
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
              Cara pakai untuk persiapan tes kerja
            </p>
            <h2 className="mt-3 text-[2.05rem] font-semibold leading-tight tracking-tight text-slate-950 md:text-[2.35rem]">
              Mulai dari kategori yang paling dekat dengan target Anda. Bukan dari semua modul sekaligus.
            </h2>
          </div>
          <Link
            to="/tes"
            className="inline-flex items-center gap-2 rounded-full bg-black px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-85"
          >
            Susun Latihan Sekarang
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {HOW_STEPS.map((item) => (
            <div key={item.step} className="rounded-[28px] border border-black/10 bg-white p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-slate-50 text-sm font-semibold text-slate-950">
                {item.step}
              </div>
              <p className="mt-5 text-lg font-semibold leading-8 text-slate-950">{item.title}</p>
              <p className="mt-3 text-sm leading-7 text-slate-600">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto max-w-6xl px-5 py-14 md:px-6" data-reveal>
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
              Katalog modul
            </p>
            <h2 className="mt-3 text-[2rem] font-semibold leading-tight tracking-tight text-slate-950 md:text-[2.3rem]">
              {ALL_TESTS.length} modul, dibagi lebih rapi supaya tidak terasa seperti daftar yang datar.
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              Spektrum latihan ditunjukkan lebih terkurasi, lalu katalog lengkap tetap bisa dibuka saat dibutuhkan.
            </p>
          </div>
          <Link
            to="/tes"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-slate-950"
          >
            Lihat katalog lengkap
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {CATEGORY_COLUMNS.map((group) => (
            <div key={group.title} className="rounded-[28px] border border-black/10 bg-white p-6">
              <div className="flex items-center gap-2">
                <LayoutGrid className="h-4 w-4 text-emerald-700" />
                <p className="text-lg font-semibold tracking-tight text-slate-950">{group.title}</p>
              </div>
              <p className="mt-3 text-sm leading-7 text-slate-600">{group.body}</p>
              <div className="mt-5 space-y-2.5">
                {group.items.map((item) => (
                  <div
                    key={item}
                    className="flex items-center justify-between rounded-[20px] border border-black/10 bg-slate-50 px-4 py-3"
                  >
                    <span className="text-sm font-medium text-slate-950">{item}</span>
                    <Check className="h-4 w-4 text-emerald-700" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {ALL_TESTS.slice(0, 8).map((test) => (
            <Link
              key={test.id}
              to={test.path}
              className="group rounded-[22px] border border-black/10 bg-white px-4 py-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-700/35 hover:bg-emerald-50/30"
            >
              <p className="text-sm font-semibold leading-snug text-slate-950 transition-colors group-hover:text-emerald-800">
                {test.name}
              </p>
              <p className="mt-1 text-xs text-slate-500">{test.duration}</p>
              <div className="mt-4 flex items-center gap-2 text-xs font-medium text-slate-500">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-700" />
                Buka intro modul
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-[#ece9df]" data-reveal>
        <div className="container mx-auto grid max-w-6xl gap-8 px-5 py-14 md:px-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
              Bukti yang terlihat di produk
            </p>
            <h2 className="mt-3 text-[2rem] font-semibold leading-tight tracking-tight text-slate-950 md:text-[2.25rem]">
              Kredibilitas datang dari struktur yang rapi, bukan dari klaim yang terdengar seperti template.
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              Intro per modul, katalog yang teratur, dan hasil yang cepat terbuka memberi bukti yang lebih jujur daripada copy yang terlalu menjanjikan.
            </p>
          </div>
          <div className="grid gap-3">
            {PRODUCT_PROOF.map((item) => (
              <div key={item} className="rounded-[22px] border border-black/10 bg-white px-5 py-4 text-sm leading-7 text-slate-950">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto max-w-6xl px-5 py-14 md:px-6" data-reveal>
        <div className="rounded-[32px] border border-black bg-black px-6 py-8 text-white md:px-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300">
                Siap mulai latihan
              </p>
              <h2 className="mt-3 text-[2.05rem] font-semibold leading-tight tracking-tight text-white md:text-[2.3rem]">
                Mulai dari dua atau tiga modul inti, lalu bangun ritme latihan yang konsisten.
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-300">
                Buka katalog, pilih kategori yang paling relevan, lalu kerjakan modul yang mendekati pola tes target Anda.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/tes"
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition-opacity hover:opacity-90"
              >
                Buka Katalog Tes
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/tes/kraepelin"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
              >
                Coba modul populer
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto max-w-6xl px-5 py-10 md:px-6" data-reveal>
        <p className="text-center text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
          Relevan untuk pola seleksi yang sering dicari
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5">
          {TRUST_LABELS.map((item) => (
            <div
              key={item}
              className="rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-medium text-slate-600"
            >
              {item}
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-black/10 py-8">
        <div className="container mx-auto flex max-w-6xl items-center justify-between px-5 md:px-6">
          <div>
            <p className="text-sm font-semibold text-slate-950">KognitiF</p>
            <p className="text-xs text-slate-500">Latihan tes kinerja kognitif online gratis.</p>
          </div>
          <Link
            to="/tes"
            className="text-sm font-medium text-slate-500 transition-colors hover:text-slate-950"
          >
            Buka Modul Tes
          </Link>
        </div>
      </footer>
    </div>
  );
}
