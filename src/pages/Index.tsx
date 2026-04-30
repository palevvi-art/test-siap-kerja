import { useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";
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

const WEEKLY_ACCURACY = [40, 54, 52, 68, 62, 78, 72];
const WEEKLY_DAY_LABELS = ["Sn", "Sl", "Rb", "Km", "Jm", "Sb", "Mg"];
const WEEKLY_CHART_PATH = "M 10 108 C 22 100, 34 90, 53 86 C 70 82, 82 86, 96 88 C 110 90, 122 64, 139 54 C 154 46, 168 62, 182 60 C 198 58, 212 34, 225 26 C 238 18, 248 22, 266 32";
const WEEKLY_CHART_AREA_PATH = "M 10 108 C 22 100, 34 90, 53 86 C 70 82, 82 86, 96 88 C 110 90, 122 64, 139 54 C 154 46, 168 62, 182 60 C 198 58, 212 34, 225 26 C 238 18, 248 22, 266 32 L 266 132 L 10 132 Z";
const WEEKLY_CHART_POINTS = [
  { cx: 10, cy: 108 },
  { cx: 53, cy: 86 },
  { cx: 96, cy: 88 },
  { cx: 139, cy: 54 },
  { cx: 182, cy: 60 },
  { cx: 225, cy: 26 },
  { cx: 266, cy: 32 },
];

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
  const shouldReduceMotion = useReducedMotion();
  const hasViewportObserver =
    typeof window !== "undefined" && typeof window.IntersectionObserver !== "undefined";
  const heroMotionViewport =
    !shouldReduceMotion && hasViewportObserver ? { once: true, amount: 0.55 } : undefined;
  const heroMotionEase = [0.22, 1, 0.36, 1] as const;

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
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl border border-slate-200 bg-white text-sm font-semibold text-slate-950 shadow-[0_8px_20px_rgba(15,23,42,0.06)]">
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
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-950 shadow-[0_10px_24px_rgba(15,23,42,0.08)] transition-all hover:-translate-y-0.5 hover:border-emerald-200 hover:bg-emerald-50/80"
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

            <h1 className="landing-hero-copy landing-stagger-2 mx-auto mt-6 max-w-[16.25ch] text-balance text-[2.42rem] font-semibold leading-[1.04] tracking-[-0.052em] text-slate-950 sm:max-w-[17ch] sm:text-[3rem] md:max-w-[17.6ch] md:text-[3.65rem] lg:max-w-[18.2ch] lg:text-[4.2rem]">
              <span className="block">Latihan tes kerja yang rapi,</span>
              <span className="mt-1.5 block">cepat, dan mudah diulang.</span>
            </h1>

            <p className="landing-hero-copy landing-stagger-3 mx-auto mt-5 max-w-2xl text-[15px] leading-7 text-slate-600 sm:text-base md:text-[17px] md:leading-8">
              {ALL_TESTS.length} modul gratis untuk numerik, memori, fokus, verbal, dan ketelitian.
              Langsung mulai dari browser tanpa akun dan tanpa alur yang membuang waktu.
            </p>

            <div className="landing-hero-copy landing-stagger-4 mt-8 flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
              <Link
                to="/tes"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-950 shadow-[0_10px_24px_rgba(15,23,42,0.08)] transition-all hover:-translate-y-0.5 hover:border-emerald-200 hover:bg-emerald-50/80"
              >
                Mulai Tes Gratis
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/tes/kraepelin"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-[#f5f7f2] px-5 py-3 text-sm font-medium text-slate-800 transition-colors hover:bg-white"
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

          <div className="relative mx-auto mt-12 max-w-[70rem] md:mt-14">
            <div className="landing-hero-panel relative z-10 rounded-[32px] border border-white/90 bg-white/96 p-3 text-slate-950 shadow-[0_28px_90px_rgba(15,23,42,0.12)] sm:p-4 md:p-5">
              <div className="rounded-[26px] border border-slate-200/80 bg-[linear-gradient(180deg,#ffffff_0%,#f6f8f3_100%)] p-3 sm:p-4 md:p-5">
                <div className="mb-5 flex items-center justify-between rounded-[18px] border border-slate-200 bg-white/90 px-3 py-2.5">
                  <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-slate-500">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    Sesi aktif
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                    <span className="h-2 w-2 rounded-full bg-slate-300" />
                    Tersimpan lokal
                  </div>
                </div>
                <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-5">
                  <div>
                    <p className="landing-hero-copy landing-stagger-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-700">
                      Dashboard latihan
                    </p>
                    <h2 className="landing-hero-copy landing-stagger-3 mt-2 text-[1.3rem] font-semibold tracking-tight text-slate-950 sm:text-[1.45rem]">
                      Ringkasan performa hari ini
                    </h2>
                    <p className="mt-2 max-w-[32rem] text-sm leading-6 text-slate-500">
                      Progress harian, sesi aktif, dan tren akurasi ditata dalam satu panel yang lebih mudah dipindai.
                    </p>
                  </div>
                  <div className="landing-hero-copy landing-stagger-4 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs text-emerald-800">
                    Real-time lokal
                  </div>
                </div>

                <div className="mt-5 grid gap-3 md:grid-cols-3">
                  <div className="landing-hero-copy landing-stagger-5 rounded-[24px] border border-slate-200 bg-white/92 p-4 shadow-[0_12px_28px_rgba(15,23,42,0.04)] md:p-5">
                    <Clock3 className="h-4 w-4 text-emerald-400" />
                    <p className="mt-3 text-2xl font-semibold text-slate-950">18:40</p>
                    <p className="text-xs text-slate-500">Durasi latihan minggu ini</p>
                  </div>
                  <div className="landing-hero-copy landing-stagger-6 rounded-[24px] border border-slate-200 bg-white/92 p-4 shadow-[0_12px_28px_rgba(15,23,42,0.04)] md:p-5">
                    <BarChart3 className="h-4 w-4 text-emerald-400" />
                    <p className="mt-3 text-2xl font-semibold text-slate-950">84%</p>
                    <p className="text-xs text-slate-500">Rata-rata akurasi</p>
                  </div>
                  <div className="landing-hero-copy landing-stagger-7 rounded-[24px] border border-slate-200 bg-white/92 p-4 shadow-[0_12px_28px_rgba(15,23,42,0.04)] md:p-5">
                    <Brain className="h-4 w-4 text-emerald-400" />
                    <p className="mt-3 text-2xl font-semibold text-slate-950">4 jalur</p>
                    <p className="text-xs text-slate-500">Kategori yang sering dipakai</p>
                  </div>
                </div>

                <div className="mt-5 grid gap-4 xl:grid-cols-[1.03fr_0.97fr]">
                  <div className="landing-hero-copy landing-stagger-6 rounded-[24px] border border-slate-200 bg-white/92 p-4 shadow-[0_12px_28px_rgba(15,23,42,0.04)] md:p-5">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div>
                        <p className="text-sm font-semibold text-slate-950">Riwayat latihan</p>
                        <p className="mt-1 text-xs text-slate-500">Tiga sesi terakhir yang paling sering diulang.</p>
                      </div>
                      <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-700">
                        Live
                      </span>
                    </div>
                    <div className="mt-4 space-y-3">
                      {HERO_ACTIVITY.map((item, index) => (
                        <div
                          key={item.title}
                          className={`landing-hero-copy landing-stream-item landing-stream-card landing-stagger-${index + 6} rounded-[20px] border border-slate-200 bg-[#fbfcf8] px-3.5 py-3.5`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-start gap-3">
                              <span className="landing-live-dot mt-1.5 h-2.5 w-2.5 rounded-full bg-emerald-400" />
                              <div>
                                <p className="text-sm font-medium text-slate-950">{item.title}</p>
                                <p className="text-xs text-slate-500">{item.detail}</p>
                              </div>
                            </div>
                            <span className="text-[11px] text-slate-500">{item.time}</span>
                          </div>
                          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-emerald-100">
                            <motion.div
                              className="h-full rounded-full bg-[linear-gradient(90deg,#10b981,#6ee7b7)]"
                              initial={shouldReduceMotion ? false : { scaleX: 0.02, opacity: 0.45 }}
                              animate={!hasViewportObserver || shouldReduceMotion ? { scaleX: 1, opacity: 1 } : undefined}
                              whileInView={hasViewportObserver ? { scaleX: 1, opacity: 1 } : undefined}
                              viewport={heroMotionViewport}
                              transition={{ delay: index * 0.08 + 1.04, duration: 0.92, ease: heroMotionEase }}
                              style={{ width: `${item.progress}%`, originX: 0 }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="landing-hero-copy landing-stagger-7 rounded-[24px] border border-slate-200 bg-white/92 p-4 shadow-[0_12px_28px_rgba(15,23,42,0.04)] md:p-5">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div>
                        <p className="text-sm font-semibold text-slate-950">Tren akurasi mingguan</p>
                        <p className="mt-1 text-xs text-slate-500">Garis besar performa selama tujuh sesi terakhir.</p>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-emerald-700">
                        <Target className="h-3.5 w-3.5" />
                        Stabil meningkat
                      </div>
                    </div>
                    <div className="relative mt-4 h-[10.5rem] overflow-hidden rounded-[20px] border border-slate-200 bg-[#fbfcf8] px-3.5 pb-3 pt-4 sm:h-[11.75rem]">
                      <div className="pointer-events-none absolute inset-x-3 top-5 h-px bg-slate-200" />
                      <div className="pointer-events-none absolute inset-x-3 top-1/2 h-px -translate-y-1/2 bg-slate-100" />
                      <motion.svg
                        viewBox="0 0 276 132"
                        className="pointer-events-none absolute inset-x-3 bottom-10 h-[112px] w-[calc(100%-24px)] overflow-visible"
                        aria-hidden="true"
                      >
                        <defs>
                          <linearGradient id="weekly-line" x1="0%" x2="100%" y1="0%" y2="0%">
                            <stop offset="0%" stopColor="#86efac" />
                            <stop offset="55%" stopColor="#10b981" />
                            <stop offset="100%" stopColor="#34d399" />
                          </linearGradient>
                          <linearGradient id="weekly-area" x1="0%" x2="0%" y1="0%" y2="100%">
                            <stop offset="0%" stopColor="rgba(16,185,129,0.18)" />
                            <stop offset="100%" stopColor="rgba(16,185,129,0.02)" />
                          </linearGradient>
                        </defs>
                        <motion.path
                          d={WEEKLY_CHART_AREA_PATH}
                          fill="url(#weekly-area)"
                          initial={shouldReduceMotion ? false : { opacity: 0 }}
                          animate={!hasViewportObserver || shouldReduceMotion ? { opacity: 1 } : undefined}
                          whileInView={hasViewportObserver ? { opacity: 1 } : undefined}
                          viewport={heroMotionViewport}
                          transition={{ duration: 0.78, delay: 0.14, ease: heroMotionEase }}
                        />
                        <motion.path
                          d={WEEKLY_CHART_PATH}
                          fill="none"
                          stroke="url(#weekly-line)"
                          strokeWidth="3.5"
                          strokeLinecap="round"
                          initial={shouldReduceMotion ? false : { pathLength: 0, opacity: 0.4 }}
                          animate={!hasViewportObserver || shouldReduceMotion ? { pathLength: 1, opacity: 1 } : undefined}
                          whileInView={hasViewportObserver ? { pathLength: 1, opacity: 1 } : undefined}
                          viewport={heroMotionViewport}
                          transition={{ duration: 1.12, delay: 0.36, ease: heroMotionEase }}
                          style={{ filter: "drop-shadow(0 0 10px rgba(16,185,129,0.22))" }}
                        />
                        {WEEKLY_CHART_POINTS.map((point, index) => (
                          <motion.circle
                            key={`${point.cx}-${point.cy}`}
                            cx={point.cx}
                            cy={point.cy}
                            r="4.5"
                            fill="#10b981"
                            initial={shouldReduceMotion ? false : { scale: 0.5, opacity: 0 }}
                            animate={!hasViewportObserver || shouldReduceMotion ? { scale: 1, opacity: 1 } : undefined}
                            whileInView={hasViewportObserver ? { scale: 1, opacity: 1 } : undefined}
                            viewport={heroMotionViewport}
                            transition={{ delay: index * 0.06 + 0.92, duration: 0.38, ease: heroMotionEase }}
                          />
                        ))}
                      </motion.svg>
                      <div className="relative z-10 flex h-full items-end gap-2.5">
                      {WEEKLY_ACCURACY.map((height, index) => (
                        <div key={height} className="flex flex-1 flex-col items-center gap-2">
                          <motion.div
                            className="landing-bar-glow w-full max-w-[22px] rounded-t-[8px] bg-[linear-gradient(180deg,rgba(16,185,129,0.82),rgba(16,185,129,0.12))]"
                            initial={shouldReduceMotion ? false : { scaleY: 0.18, opacity: 0.35 }}
                            animate={!hasViewportObserver || shouldReduceMotion ? { scaleY: 1, opacity: 1 } : undefined}
                            whileInView={hasViewportObserver ? { scaleY: 1, opacity: 1 } : undefined}
                            viewport={heroMotionViewport}
                            transition={{ delay: index * 0.07 + 1.18, duration: 0.62, ease: heroMotionEase }}
                            style={{ height: `${height}%`, originY: 1 }}
                          />
                          <motion.span
                            initial={shouldReduceMotion ? false : { opacity: 0, y: 4 }}
                            animate={!hasViewportObserver || shouldReduceMotion ? { opacity: 1, y: 0 } : undefined}
                            whileInView={hasViewportObserver ? { opacity: 1, y: 0 } : undefined}
                            viewport={heroMotionViewport}
                            transition={{ delay: index * 0.05 + 1.34, duration: 0.32, ease: heroMotionEase }}
                            className="text-[11px] text-slate-500"
                          >
                            {WEEKLY_DAY_LABELS[index]}
                          </motion.span>
                        </div>
                      ))}
                    </div>
                    </div>
                    <div className="landing-hero-copy landing-stagger-8 mt-4 rounded-[20px] border border-dashed border-slate-200 bg-[#fbfcf8] px-3.5 py-3 text-sm leading-6 text-slate-500">
                      Hasil inti terbuka cepat. Breakdown detail tetap ada saat dibutuhkan.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="landing-float-delay absolute right-10 top-3 z-20 hidden rounded-full border border-emerald-200 bg-white/96 px-4 py-2 text-slate-950 shadow-[0_18px_40px_rgba(15,23,42,0.08)] 2xl:block">
              <div className="flex items-center gap-2 text-sm font-medium">
                <ShieldCheck className="h-4 w-4 text-emerald-700" />
                Tanpa registrasi
              </div>
            </div>

            <div className="landing-float-slow absolute -bottom-4 left-8 z-20 hidden rounded-[22px] border border-emerald-200 bg-white/96 px-3 py-2 text-slate-950 shadow-[0_18px_40px_rgba(15,23,42,0.08)] 2xl:block">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Sparkles className="h-4 w-4 text-emerald-700" />
                Hasil transparan
              </div>
              <p className="mt-1 text-xs text-slate-500">Tanpa label generik</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-black/10 bg-[#f1f5ef]" data-reveal>
        <div className="container mx-auto max-w-6xl px-5 py-12 md:px-6">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
                Intent pencarian yang dilayani
              </p>
              <h2 className="mt-3 text-[1.82rem] font-semibold leading-tight tracking-tight text-slate-950 md:text-[2.02rem]">
                Dari keyword ke modul yang relevan tanpa membuat pengunjung tersesat di halaman.
              </h2>
            </div>
            <div className="rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm text-slate-600">
              SEO yang tetap terasa seperti produk
            </div>
          </div>
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {KEYWORD_TILES.map((item) => (
              <div key={item} className="rounded-[24px] border border-slate-200 bg-white px-4 py-4 text-sm leading-7 text-slate-600 shadow-[0_10px_24px_rgba(15,23,42,0.03)] transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-[0_16px_30px_rgba(15,23,42,0.06)]">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto max-w-6xl px-5 py-16 md:px-6 md:py-18" data-reveal>
        <div className="grid gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
              Kenapa lebih enak dipakai
            </p>
            <h2 className="mt-3 text-[1.88rem] font-semibold leading-tight tracking-tight text-slate-950 md:text-[2.14rem]">
              Alur yang rapi membuat latihan terasa ringan sejak sesi pertama.
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-600">
              Fokus halaman ini sederhana: membantu pengunjung paham konteks, memilih jalur latihan, lalu masuk ke tes secepat mungkin.
            </p>
          </div>

          <div className="grid gap-4">
            {BENEFITS.map((item) => (
              <div key={item.title} className="rounded-[24px] border border-black/10 bg-white px-5 py-5 shadow-[0_10px_24px_rgba(15,23,42,0.03)] transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-[0_16px_28px_rgba(15,23,42,0.06)]">
                <p className="text-base font-semibold leading-7 text-slate-950">{item.title}</p>
                <p className="mt-2 text-sm leading-7 text-slate-600">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto max-w-6xl px-5 py-16 md:px-6 md:py-18" data-reveal>
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
              Cara pakai untuk persiapan tes kerja
            </p>
            <h2 className="mt-3 text-[1.92rem] font-semibold leading-tight tracking-tight text-slate-950 md:text-[2.18rem]">
              Mulai dari kategori yang paling dekat dengan target Anda. Bukan dari semua modul sekaligus.
            </h2>
          </div>
          <Link
            to="/tes"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-950 shadow-[0_10px_24px_rgba(15,23,42,0.08)] transition-all hover:-translate-y-0.5 hover:border-emerald-200 hover:bg-emerald-50/80"
          >
            Susun Latihan Sekarang
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {HOW_STEPS.map((item) => (
            <div key={item.step} className="rounded-[24px] border border-black/10 bg-white p-6 shadow-[0_10px_24px_rgba(15,23,42,0.03)] transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-[0_16px_28px_rgba(15,23,42,0.06)]">
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-slate-50 text-sm font-semibold text-slate-950">
                {item.step}
              </div>
              <p className="mt-5 text-lg font-semibold leading-8 text-slate-950">{item.title}</p>
              <p className="mt-3 text-sm leading-7 text-slate-600">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto max-w-6xl px-5 py-16 md:px-6 md:py-18" data-reveal>
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
              Katalog modul
            </p>
            <h2 className="mt-3 text-[1.9rem] font-semibold leading-tight tracking-tight text-slate-950 md:text-[2.16rem]">
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
            <div key={group.title} className="rounded-[24px] border border-black/10 bg-white p-6 shadow-[0_10px_24px_rgba(15,23,42,0.03)] transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-[0_16px_28px_rgba(15,23,42,0.06)]">
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
              className="group rounded-[24px] border border-black/10 bg-white px-4 py-4 shadow-[0_10px_24px_rgba(15,23,42,0.03)] transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-700/35 hover:bg-emerald-50/30 hover:shadow-[0_16px_28px_rgba(15,23,42,0.06)]"
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
            <h2 className="mt-3 text-[1.9rem] font-semibold leading-tight tracking-tight text-slate-950 md:text-[2.12rem]">
              Kredibilitas datang dari struktur yang rapi, bukan dari klaim yang terdengar seperti template.
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              Intro per modul, katalog yang teratur, dan hasil yang cepat terbuka memberi bukti yang lebih jujur daripada copy yang terlalu menjanjikan.
            </p>
          </div>
          <div className="grid gap-3">
            {PRODUCT_PROOF.map((item) => (
              <div key={item} className="rounded-[24px] border border-black/10 bg-white px-5 py-4 text-sm leading-7 text-slate-950 shadow-[0_10px_24px_rgba(15,23,42,0.03)] transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-[0_16px_28px_rgba(15,23,42,0.06)]">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto max-w-6xl px-5 py-14 md:px-6" data-reveal>
        <div className="rounded-[32px] border border-slate-200 bg-white px-6 py-8 text-slate-950 shadow-[0_20px_60px_rgba(15,23,42,0.06)] md:px-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
                Siap mulai latihan
              </p>
              <h2 className="mt-3 text-[2.05rem] font-semibold leading-tight tracking-tight text-slate-950 md:text-[2.3rem]">
                Mulai dari dua atau tiga modul inti, lalu bangun ritme latihan yang konsisten.
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                Buka katalog, pilih kategori yang paling relevan, lalu kerjakan modul yang mendekati pola tes target Anda.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/tes"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-[#f5f7f2] px-5 py-3 text-sm font-semibold text-slate-950 transition-colors hover:bg-white"
              >
                Buka Katalog Tes
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/tes/kraepelin"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition-colors hover:bg-[#f5f7f2]"
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
