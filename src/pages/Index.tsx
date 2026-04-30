import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Activity,
  ArrowRight,
  BarChart3,
  Brain,
  Check,
  CheckCircle2,
  Clock3,
  LayoutGrid,
  MoveRight,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import PageMeta from "@/components/PageMeta";
import { ALL_TESTS } from "@/lib/testRegistry";

const HERO_STATS = [
  { label: "Modul aktif", value: `${ALL_TESTS.length}`, note: "Lintas logika, memori, fokus, verbal" },
  { label: "Durasi efektif", value: "2-5 mnt", note: "Cocok untuk sesi latihan singkat" },
  { label: "Buka cepat", value: "Tanpa login", note: "Langsung mulai dari browser" },
];

const HERO_ACTIVITY = [
  { title: "Kraepelin Digital", detail: "Sesi selesai • 91% akurasi", time: "Baru saja" },
  { title: "Deret Angka", detail: "Latihan lanjutan • 4 menit", time: "2 menit lalu" },
  { title: "Fokus Warna", detail: "Perlu latihan ulang", time: "5 menit lalu" },
];

const TRUST_TAGS = ["BUMN", "CPNS", "Bank", "Admin", "Operator", "QC", "Back Office", "FMCG"];

const WHY_BLOCKS = [
  {
    title: "Pilih kategori dulu, bukan dilempar ke daftar panjang",
    body: "User baru langsung paham harus mulai dari numerik, verbal, fokus, atau ketelitian. Ini membuat pengalaman terasa lebih rapi sejak klik pertama.",
  },
  {
    title: "Setiap modul punya intro yang jelas",
    body: "Halaman intro membantu SEO dan membantu user memahami apa yang sedang mereka kerjakan sebelum masuk ke sesi tes.",
  },
  {
    title: "Hasil inti muncul cepat",
    body: "Akurasi dan ringkasan performa langsung terbaca. Detail visual tetap ada, tetapi tidak lagi menahan keseluruhan halaman.",
  },
];

const PREP_STEPS = [
  {
    step: "01",
    title: "Pilih kategori yang paling dekat dengan target seleksi",
    body: "Numerik untuk admin dan operasional, verbal untuk tes yang banyak bermain bahasa, fokus dan ketelitian untuk role yang butuh akurasi konsisten.",
  },
  {
    step: "02",
    title: "Kerjakan 2 sampai 3 modul inti dalam satu sesi",
    body: "Tidak perlu menyapu semua modul sekaligus. Sesi yang singkat tapi terarah biasanya lebih efektif daripada latihan yang terlalu panjang.",
  },
  {
    step: "03",
    title: "Ulangi area yang performanya masih lemah",
    body: "Begitu hasil terbuka, user bisa langsung memilih modul mana yang perlu diulang tanpa harus menebak-nebak lagi.",
  },
];

const SPOTLIGHTS = [
  {
    title: "Numerik dan logika",
    body: "Deret angka, logika pola, hitung cepat, sampai Kraepelin untuk ritme dan akurasi kerja numerik.",
    items: ["Deret Angka", "Logika Pola", "Kraepelin Digital"],
  },
  {
    title: "Fokus dan ketelitian",
    body: "Fokus warna, konsentrasi, ketelitian visual, dan pemeriksaan kode untuk spotting error dan kontrol impuls.",
    items: ["Fokus Warna", "Pemeriksaan Kode", "Ketelitian Visual"],
  },
  {
    title: "Memori dan verbal",
    body: "Memori visual, daya ingat angka, analogi kata, dan penalaran verbal untuk recall cepat dan pemahaman instruksi.",
    items: ["Memori Visual", "Daya Ingat Angka", "Analogi Kata"],
  },
];

const FAQ_PREVIEW = [
  "Tes kognitif online gratis untuk latihan seleksi kerja",
  "Simulasi tes BUMN dan CPNS tanpa registrasi",
  "Latihan Kraepelin, deret angka, fokus, verbal, dan memori",
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

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <PageMeta
        title="Tes Kognitif Online Gratis untuk Latihan Seleksi Kerja | KognitiF"
        description={`Latihan ${ALL_TESTS.length} tes kognitif online gratis untuk persiapan BUMN, CPNS, dan seleksi kerja swasta. Tanpa registrasi, tanpa bank soal, langsung mulai.`}
        canonicalPath="/"
        schema={homepageSchema}
      />

      <header className="border-b border-border/60 bg-background/95 backdrop-blur">
        <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <div>
            <p className="text-base font-semibold tracking-tight text-foreground">KognitiF</p>
            <p className="text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
              Tes Kerja Online
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/tes"
              className="hidden text-sm font-medium text-muted-foreground transition-colors hover:text-foreground md:inline-flex"
            >
              Modul Tes
            </Link>
            <Link
              to="/tes"
              className="inline-flex items-center gap-2 rounded-lg bg-foreground px-4 py-2 text-sm font-semibold text-background transition-opacity hover:opacity-85"
            >
              Mulai Tes
            </Link>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden border-b border-border/60">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(29,155,139,0.11),transparent_24%),radial-gradient(circle_at_85%_18%,rgba(15,23,42,0.06),transparent_20%)]" />
        <div className="container relative mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-[0.95fr_1.05fr] md:items-center md:py-20">
          <div className="max-w-xl">
            <p className="landing-hero-copy landing-stagger-1 text-xs font-semibold uppercase tracking-[0.26em] text-primary">
              Platform Tes Kinerja Kognitif
            </p>
            <h1 className="landing-hero-copy landing-stagger-2 mt-4 text-4xl font-bold leading-[1.02] tracking-tight text-foreground md:text-[4rem]">
              Landing page yang sekarang langsung terasa seperti produk yang siap dipakai.
            </h1>
            <p className="landing-hero-copy landing-stagger-3 mt-5 text-base leading-8 text-muted-foreground md:text-lg">
              {ALL_TESTS.length} modul latihan kognitif gratis untuk BUMN, CPNS, bank, dan swasta.
              Tanpa registrasi. Tanpa alur yang bikin capek. User datang, pilih kategori, lalu langsung latihan.
            </p>

            <div className="landing-hero-copy landing-stagger-4 mt-8 flex flex-wrap gap-3">
              <Link
                to="/tes"
                className="inline-flex items-center gap-2 rounded-lg bg-foreground px-5 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-85"
              >
                Mulai Tes Gratis
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/tes/kraepelin"
                className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
              >
                Coba Kraepelin Digital
              </Link>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {HERO_STATS.map((item, index) => (
                <div
                  key={item.label}
                  className={`landing-hero-copy landing-stat-card landing-stagger-${index + 5} rounded-2xl border border-border bg-card/90 p-4 backdrop-blur-sm`}
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                    {item.label}
                  </p>
                  <p className="mt-3 text-2xl font-semibold tracking-tight text-foreground">
                    {item.value}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">{item.note}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="landing-float landing-hero-panel rounded-[28px] border border-border bg-card p-4 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
              <div className="rounded-[22px] border border-border/80 bg-background p-4">
                <div className="flex items-center justify-between border-b border-border/70 pb-4">
                  <div>
                    <p className="landing-hero-copy landing-stagger-2 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                      Dashboard latihan
                    </p>
                    <h2 className="landing-hero-copy landing-stagger-3 mt-2 text-xl font-semibold tracking-tight text-foreground">
                      Ringkasan sesi hari ini
                    </h2>
                  </div>
                  <div className="landing-hero-copy landing-stagger-4 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
                    Real-time lokal
                  </div>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  <div className="landing-hero-copy landing-stat-card landing-stagger-5 rounded-2xl border border-border bg-card p-4">
                    <Clock3 className="h-4 w-4 text-primary" />
                    <p className="mt-3 text-2xl font-semibold text-foreground">18:40</p>
                    <p className="text-xs text-muted-foreground">Durasi latihan aktif minggu ini</p>
                  </div>
                  <div className="landing-hero-copy landing-stat-card landing-stagger-6 rounded-2xl border border-border bg-card p-4">
                    <BarChart3 className="h-4 w-4 text-primary" />
                    <p className="mt-3 text-2xl font-semibold text-foreground">84%</p>
                    <p className="text-xs text-muted-foreground">Rata-rata akurasi lintas modul</p>
                  </div>
                  <div className="landing-hero-copy landing-stat-card landing-stagger-7 rounded-2xl border border-border bg-card p-4">
                    <Brain className="h-4 w-4 text-primary" />
                    <p className="mt-3 text-2xl font-semibold text-foreground">4 jalur</p>
                    <p className="text-xs text-muted-foreground">Kategori paling sering dipakai</p>
                  </div>
                </div>

                <div className="mt-4 grid gap-4 lg:grid-cols-[0.92fr_1.08fr]">
                  <div className="landing-hero-copy landing-stagger-6 rounded-2xl border border-border bg-card p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-foreground">Riwayat latihan terakhir</p>
                      <span className="rounded-full bg-accent px-2.5 py-1 text-[11px] font-medium text-accent-foreground">
                        Live
                      </span>
                    </div>
                    <div className="mt-4 space-y-3">
                      {HERO_ACTIVITY.map((item, index) => (
                        <div
                          key={item.title}
                          className={`landing-hero-copy landing-stream-item landing-stagger-${index + 6} flex items-start justify-between gap-3 rounded-xl border border-border/70 px-3 py-3`}
                        >
                          <div>
                            <p className="text-sm font-medium text-foreground">{item.title}</p>
                            <p className="text-xs text-muted-foreground">{item.detail}</p>
                          </div>
                          <span className="text-[11px] text-muted-foreground">{item.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="landing-hero-copy landing-stagger-7 rounded-2xl border border-border bg-card p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-foreground">Tren akurasi mingguan</p>
                      <div className="flex items-center gap-1 text-xs text-success">
                        <Activity className="h-3.5 w-3.5" />
                        Stabil meningkat
                      </div>
                    </div>

                    <div className="mt-5 flex h-36 items-end gap-2">
                      {[40, 61, 56, 78, 70, 92, 85].map((height, index) => (
                        <div key={height} className="flex flex-1 flex-col items-center gap-2">
                          <div
                            className="landing-rise landing-bar-glow w-full rounded-t-md bg-[linear-gradient(180deg,rgba(29,155,139,0.82),rgba(29,155,139,0.18))]"
                            style={{ height: `${height}%`, animationDelay: `${index * 110}ms` }}
                          />
                          <span className="text-[11px] text-muted-foreground">
                            {["Sn", "Sl", "Rb", "Km", "Jm", "Sb", "Mg"][index]}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="landing-hero-copy landing-stagger-8 mt-4 rounded-xl border border-dashed border-border px-3 py-3 text-sm text-muted-foreground">
                      Halaman hasil dibuka cepat, angka utama langsung terbaca, dan detail visual menyusul tanpa menahan keseluruhan layar.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="landing-float-delay absolute -left-4 top-8 hidden rounded-2xl border border-border bg-card px-3 py-2 shadow-[0_16px_40px_rgba(15,23,42,0.06)] md:block">
              <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                <ShieldCheck className="h-4 w-4 text-primary" />
                Tanpa registrasi
              </div>
              <p className="mt-1 text-xs text-muted-foreground">Langsung mulai dari browser</p>
            </div>

            <div className="landing-float-slow absolute -bottom-5 right-6 hidden rounded-2xl border border-border bg-card px-3 py-2 shadow-[0_16px_40px_rgba(15,23,42,0.06)] md:block">
              <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                <Sparkles className="h-4 w-4 text-primary" />
                Hasil transparan
              </div>
              <p className="mt-1 text-xs text-muted-foreground">Tanpa label psikologis generik</p>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto max-w-6xl px-6 py-12" data-reveal>
        <div className="rounded-[26px] border border-border bg-card px-6 py-6 md:px-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                Intent pencarian yang dilayani
              </p>
              <h2 className="mt-3 text-[2.15rem] font-semibold leading-tight tracking-tight text-foreground">
                User bisa datang dari keyword, mendarat di intro yang tepat, lalu langsung masuk ke tes.
              </h2>
            </div>
            <div className="rounded-full border border-border bg-background px-4 py-2 text-sm text-muted-foreground">
              SEO yang tetap terasa seperti produk
            </div>
          </div>
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {FAQ_PREVIEW.map((item) => (
              <div key={item} className="rounded-2xl border border-border/80 bg-background px-4 py-4 text-sm leading-7 text-muted-foreground">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto max-w-6xl px-6 py-12" data-reveal>
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              Cara pakai untuk persiapan tes kerja
            </p>
            <h2 className="mt-3 text-[2.35rem] font-semibold leading-tight tracking-tight text-foreground">
              Jangan mulai dari semua modul. Mulai dari jalur yang paling dekat dengan target seleksi Anda.
            </h2>
          </div>
          <Link
            to="/tes"
            className="inline-flex items-center gap-2 rounded-lg bg-foreground px-5 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-85"
          >
            Susun Latihan Sekarang
            <MoveRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {PREP_STEPS.map((item) => (
            <div key={item.step} className="rounded-[24px] border border-border bg-card p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background text-sm font-semibold text-foreground">
                {item.step}
              </div>
              <p className="mt-5 text-lg font-semibold leading-8 text-foreground">{item.title}</p>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto max-w-6xl px-6 py-12" data-reveal>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              Yang dibuat lebih benar
            </p>
            <h2 className="mt-3 text-[2.1rem] font-semibold leading-tight tracking-tight text-foreground">
              Landing page ini sekarang dibangun untuk membantu user memilih, bukan membuat user membaca terlalu banyak.
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground">
              Yang penting bukan banyak elemen, tapi urutan yang masuk akal. Hero meyakinkan, intro mengarahkan, modul memudahkan eksplorasi, dan hasil menjaga user kembali berlatih.
            </p>
          </div>
          <div className="grid gap-4">
            {WHY_BLOCKS.map((item) => (
              <div key={item.title} className="rounded-[22px] border border-border bg-card p-5">
                <p className="text-base font-semibold leading-7 text-foreground">{item.title}</p>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto max-w-6xl px-6 py-12" data-reveal>
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              Katalog modul
            </p>
            <h2 className="mt-3 text-[2.2rem] font-semibold leading-tight tracking-tight text-foreground">
              {ALL_TESTS.length} modul tersedia, tapi sekarang ditampilkan dengan rasa yang lebih terkurasi.
            </h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              Bukan grid panjang yang dingin. Bagian ini memperlihatkan spektrum latihan yang tersedia sambil tetap menjaga rasa premium dan scanability yang baik.
            </p>
          </div>
          <Link
            to="/tes"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            Lihat katalog lengkap
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {SPOTLIGHTS.map((group) => (
            <div key={group.title} className="rounded-[24px] border border-border bg-card p-6">
              <div className="flex items-center gap-2">
                <LayoutGrid className="h-4 w-4 text-primary" />
                <p className="text-lg font-semibold tracking-tight text-foreground">{group.title}</p>
              </div>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{group.body}</p>
              <div className="mt-5 space-y-2.5">
                {group.items.map((item) => (
                  <div
                    key={item}
                    className="flex items-center justify-between rounded-2xl border border-border/80 bg-background px-4 py-3"
                  >
                    <span className="text-sm font-medium text-foreground">{item}</span>
                    <Check className="h-4 w-4 text-primary" />
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
              className="group rounded-[20px] border border-border bg-background px-4 py-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/60 hover:bg-card"
            >
              <p className="text-sm font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
                {test.name}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">{test.duration}</p>
              <div className="mt-4 flex items-center gap-2 text-xs font-medium text-muted-foreground">
                <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                Buka intro modul
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="container mx-auto max-w-6xl px-6 py-12" data-reveal>
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              Bukti yang terlihat di produk
            </p>
            <h2 className="mt-3 text-[2.2rem] font-semibold leading-tight tracking-tight text-foreground">
              Karena belum ada backend dan social proof publik, bukti terbaik harus datang dari struktur produknya sendiri.
            </h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              Itu kenapa saya pakai proof yang lebih jujur: intro per modul, katalog yang terasa teratur, dan hasil yang lebih cepat terbuka. Bukan klaim kosong yang terdengar seperti template.
            </p>
          </div>
          <div className="grid gap-3">
            {[
              "Setiap modul punya intro, bukan langsung lempar user ke soal.",
              "Kategori membantu user memilih jalur latihan yang relevan.",
              "Halaman hasil terasa cepat dan tetap informatif.",
            ].map((item) => (
              <div key={item} className="rounded-[20px] border border-border bg-card px-5 py-4 text-sm leading-7 text-foreground">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto max-w-6xl px-6 py-12" data-reveal>
        <div className="rounded-[28px] border border-border bg-card px-6 py-8 md:px-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                Siap mulai latihan
              </p>
              <h2 className="mt-3 text-[2.3rem] font-semibold leading-tight tracking-tight text-foreground">
                Kalau tujuannya siap tes kerja, langkah terbaik setelah ini adalah mulai dari 2 sampai 3 modul inti.
              </h2>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                Tidak perlu menunggu setup apa pun. Buka katalog, pilih kategori, lalu kerjakan modul yang paling mendekati pola tes target Anda.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/tes"
                className="inline-flex items-center gap-2 rounded-lg bg-foreground px-5 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-85"
              >
                Mulai dari Katalog
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/tes/kraepelin"
                className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
              >
                Coba modul populer
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border/60 py-8">
        <div className="container mx-auto flex max-w-6xl items-center justify-between px-6">
          <div>
            <p className="text-sm font-semibold text-foreground">KognitiF</p>
            <p className="text-xs text-muted-foreground">Latihan tes kinerja kognitif online gratis.</p>
          </div>
          <Link to="/tes" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Buka Modul Tes
          </Link>
        </div>
      </footer>
    </div>
  );
}
