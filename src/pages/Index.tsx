import { Link } from "react-router-dom";
import {
  Activity,
  ArrowRight,
  BarChart3,
  Brain,
  Clock3,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import PageMeta from "@/components/PageMeta";
import { ALL_TESTS } from "@/lib/testRegistry";

const PILLARS = [
  {
    label: "Berbasis Tugas",
    detail:
      "Soal dihasilkan sistem secara acak setiap sesi. Tidak ada bank soal yang bisa dihafalkan.",
  },
  {
    label: "Terukur Objektif",
    detail:
      "Akurasi, kecepatan respons, dan konsistensi antar-segmen dicatat otomatis selama pengerjaan.",
  },
  {
    label: "Hasil Transparan",
    detail:
      "Ringkasan performa disajikan apa adanya. Tidak ada label kepribadian atau klaim klinis.",
  },
];

const WHY_ITEMS = [
  {
    q: "Bukan bank soal.",
    a: "Setiap sesi menghasilkan soal baru secara acak. Hasilnya mencerminkan performa aktual, bukan hafalan.",
  },
  {
    q: "Gratis sepenuhnya.",
    a: `Semua ${ALL_TESTS.length} modul tersedia tanpa registrasi, tanpa biaya, tanpa batas pengulangan.`,
  },
  {
    q: "Relevan untuk seleksi kerja.",
    a: "Modul seperti Kraepelin, logika pola, dan daya ingat umum digunakan di assessment BUMN, CPNS, dan perusahaan swasta.",
  },
  {
    q: "Tidak ada label kepribadian.",
    a: "Tes ini mengukur performa pada tugas spesifik, bukan mengklasifikasikan tipe kepribadian Anda.",
  },
];

const LIVE_STATS = [
  { label: "Modul latihan", value: `${ALL_TESTS.length}`, note: "Siap dipakai kapan saja" },
  { label: "Durasi per sesi", value: "2-5 mnt", note: "Ringkas untuk latihan harian" },
  { label: "Penyimpanan hasil", value: "Lokal", note: "Privat di browser Anda" },
];

const HERO_STREAM = [
  { name: "Kraepelin Digital", detail: "Sesi selesai", time: "Baru saja" },
  { name: "Logika Pola", detail: "Akurasi 84%", time: "2 menit lalu" },
  { name: "Konsentrasi", detail: "Latihan ulang", time: "5 menit lalu" },
];

const FEATURE_SECTIONS = [
  {
    eyebrow: "Alur latihan yang jelas",
    title: "Mulai dari halaman intro yang bisa dirayapi, lanjut ke tes, lalu buka hasil tanpa bingung.",
    body:
      "Setiap modul sekarang punya halaman pengantar yang menjelaskan apa yang diukur, cocok untuk siapa, dan link langsung ke sesi tes. Ini membantu SEO sekaligus memperjelas niat user sebelum klik mulai.",
    panelTitle: "Preview alur modul",
    panelBody: "Intro SEO, sesi browser-based, hasil lokal, dan dashboard latihan terhubung dalam alur yang rapi.",
    badges: ["Intro crawlable", "FAQ per modul", "CTA langsung"],
  },
  {
    eyebrow: "Hasil yang mudah dibaca",
    title: "Ringkasan performa dibuat lebih cepat terbuka, lalu grafik dimuat terpisah saat benar-benar dibutuhkan.",
    body:
      "Halaman hasil tetap kaya informasi, tetapi beban chart tidak lagi menahan keseluruhan halaman. Ini menjaga pengalaman tetap cepat tanpa membuang detail performa yang penting.",
    panelTitle: "Optimasi hasil",
    panelBody: "Stat ringkas muncul dulu, visual performa masuk setelahnya. Pengguna dapat memahami hasil inti tanpa menunggu penuh.",
    badges: ["Lazy chart", "Load lebih cepat", "Tetap informatif"],
  },
];

const TRUST_LOGOS = ["BUMN", "CPNS", "Bank", "FMCG", "Admin", "Operator", "QC", "Back Office"];

const PROOF_ITEMS = [
  {
    title: "Intro SEO per modul",
    detail: "Setiap tes punya halaman pengantar sendiri, lengkap dengan FAQ dan CTA yang jelas.",
  },
  {
    title: "Hasil terbuka lebih cepat",
    detail: "Stat inti dimuat lebih dulu, sedangkan chart berat dipisah agar pengalaman awal tetap ringan.",
  },
  {
    title: "Latihan lintas kategori",
    detail: "Katalog sekarang dikelompokkan per kategori agar user cepat memilih jalur latihan yang paling relevan.",
  },
];

const TESTIMONIAL_STYLE_ITEMS = [
  {
    quote: "Saya butuh latihan yang langsung bisa dipakai sebelum tes kerja, tanpa login dan tanpa cari-cari menu.",
    role: "Intent pengguna paling umum",
  },
  {
    quote: "Yang penting bukan ramai fiturnya, tapi jelas modul mana yang harus saya kerjakan lebih dulu.",
    role: "Masalah yang paling sering muncul",
  },
  {
    quote: "Begitu selesai, saya ingin hasil yang ringkas dulu. Detail grafik boleh menyusul.",
    role: "Ekspektasi pengalaman yang benar",
  },
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

const Index = () => (
  <div className="min-h-screen bg-background">
    <PageMeta
      title="Tes Kognitif Online Gratis untuk Latihan Seleksi Kerja | KognitiF"
      description={`Latihan ${ALL_TESTS.length} tes kognitif online gratis untuk persiapan BUMN, CPNS, dan seleksi kerja swasta. Tanpa registrasi, tanpa bank soal, langsung mulai.`}
      canonicalPath="/"
      schema={homepageSchema}
    />
    {/* Nav */}
    <header className="border-b border-border/60">
      <div className="container mx-auto flex items-center justify-between h-14 px-6 max-w-5xl">
        <span className="font-semibold text-foreground tracking-tight">KognitiF</span>
        <Link
          to="/tes"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Mulai Tes
        </Link>
      </div>
    </header>

    {/* Hero */}
    <section className="relative overflow-hidden border-b border-border/60">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(29,155,139,0.12),transparent_28%),radial-gradient(circle_at_80%_20%,rgba(15,23,42,0.08),transparent_24%)]" />
      <div className="container relative mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-[1.05fr_0.95fr] md:items-center">
        <div className="max-w-2xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
            Platform Tes Kinerja Kognitif
          </p>
          <h1 className="max-w-2xl text-4xl font-bold leading-[1.08] tracking-tight text-foreground md:text-[3.6rem]">
            Latihan tes kerja online yang terasa cepat, jelas, dan serius.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-8 text-muted-foreground md:text-lg">
            {ALL_TESTS.length} modul tes kognitif gratis untuk latihan BUMN, CPNS, bank, dan swasta.
            Tanpa registrasi. Tanpa bank soal. Fokus pada performa nyata, bukan label kepribadian.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/tes"
              className="inline-flex items-center gap-2 rounded-lg bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition-opacity hover:opacity-85"
            >
              Mulai Tes Gratis
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/tes/kraepelin"
              className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              Coba Kraepelin Digital
            </Link>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {LIVE_STATS.map((item) => (
              <div key={item.label} className="rounded-lg border border-border bg-card/80 p-4 backdrop-blur-sm">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  {item.label}
                </p>
                <p className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
                  {item.value}
                </p>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">{item.note}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="landing-float rounded-[20px] border border-border bg-card p-4 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
            <div className="rounded-[16px] border border-border/80 bg-background p-4">
              <div className="flex items-center justify-between border-b border-border/70 pb-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                    Dashboard latihan
                  </p>
                  <h2 className="mt-2 text-xl font-semibold tracking-tight text-foreground">
                    Ringkasan sesi hari ini
                  </h2>
                </div>
                <div className="rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
                  Real-time lokal
                </div>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <div className="rounded-xl border border-border bg-card p-4">
                  <Clock3 className="h-4 w-4 text-primary" />
                  <p className="mt-3 text-2xl font-semibold text-foreground">18:40</p>
                  <p className="text-xs text-muted-foreground">Total latihan minggu ini</p>
                </div>
                <div className="rounded-xl border border-border bg-card p-4">
                  <BarChart3 className="h-4 w-4 text-primary" />
                  <p className="mt-3 text-2xl font-semibold text-foreground">84%</p>
                  <p className="text-xs text-muted-foreground">Akurasi rata-rata</p>
                </div>
                <div className="rounded-xl border border-border bg-card p-4">
                  <Brain className="h-4 w-4 text-primary" />
                  <p className="mt-3 text-2xl font-semibold text-foreground">4 modul</p>
                  <p className="text-xs text-muted-foreground">Sedang aktif dilatih</p>
                </div>
              </div>

              <div className="mt-4 grid gap-4 md:grid-cols-[0.9fr_1.1fr]">
                <div className="rounded-xl border border-border bg-card p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-foreground">Aktivitas terbaru</p>
                    <span className="rounded-full bg-accent px-2.5 py-1 text-[11px] font-medium text-accent-foreground">
                      Live
                    </span>
                  </div>
                  <div className="mt-4 space-y-3">
                    {HERO_STREAM.map((item) => (
                      <div key={item.name} className="flex items-start justify-between gap-3 rounded-lg border border-border/70 px-3 py-2">
                        <div>
                          <p className="text-sm font-medium text-foreground">{item.name}</p>
                          <p className="text-xs text-muted-foreground">{item.detail}</p>
                        </div>
                        <span className="text-[11px] text-muted-foreground">{item.time}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl border border-border bg-card p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-foreground">Tren performa</p>
                    <div className="flex items-center gap-1 text-xs text-success">
                      <Activity className="h-3.5 w-3.5" />
                      Stabil meningkat
                    </div>
                  </div>
                  <div className="mt-5 flex h-32 items-end gap-2">
                    {[42, 68, 55, 80, 74, 92, 88].map((height, index) => (
                      <div key={height} className="flex flex-1 flex-col items-center gap-2">
                        <div
                          className="landing-rise w-full rounded-t-md bg-[linear-gradient(180deg,rgba(29,155,139,0.78),rgba(29,155,139,0.2))]"
                          style={{ height: `${height}%`, animationDelay: `${index * 120}ms` }}
                        />
                        <span className="text-[11px] text-muted-foreground">
                          {["Sn", "Sl", "Rb", "Km", "Jm", "Sb", "Mg"][index]}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 rounded-lg border border-dashed border-border px-3 py-3 text-sm text-muted-foreground">
                    Hasil inti muncul cepat, grafik detail menyusul. Pengalaman tetap ringan di perangkat mobile.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="landing-float-delay absolute -left-4 top-10 hidden rounded-xl border border-border bg-card px-3 py-2 shadow-[0_14px_36px_rgba(15,23,42,0.06)] md:block">
            <div className="flex items-center gap-2 text-sm font-medium text-foreground">
              <ShieldCheck className="h-4 w-4 text-primary" />
              Tanpa registrasi
            </div>
            <p className="mt-1 text-xs text-muted-foreground">Langsung mulai dari browser</p>
          </div>

          <div className="landing-float-slow absolute -bottom-4 right-6 hidden rounded-xl border border-border bg-card px-3 py-2 shadow-[0_14px_36px_rgba(15,23,42,0.06)] md:block">
            <div className="flex items-center gap-2 text-sm font-medium text-foreground">
              <Sparkles className="h-4 w-4 text-primary" />
              Hasil transparan
            </div>
            <p className="mt-1 text-xs text-muted-foreground">Tidak ada label psikologis</p>
          </div>
        </div>
      </div>
    </section>

    <section className="container mx-auto px-6 py-16 max-w-5xl">
      <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-start">
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
            Cocok untuk latihan tes kerja online
          </h2>
          <h3 className="max-w-2xl text-2xl font-semibold tracking-tight text-foreground">
            Dirancang untuk latihan cepat sebelum tes BUMN, CPNS, dan seleksi perusahaan swasta.
          </h3>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
            Fokus platform ini adalah latihan mandiri yang relevan dengan pola tes kerja umum:
            kecepatan hitung, daya tahan, memori kerja, fokus, dan penalaran verbal. Anda bisa
            mulai dari modul spesifik atau menyusun rutinitas latihan harian dari dashboard hasil.
          </p>
        </div>
        <div className="rounded-lg border border-border bg-card p-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Keyword intent utama
          </p>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-muted-foreground">
            <li>Tes kognitif online gratis untuk latihan seleksi kerja</li>
            <li>Simulasi tes BUMN dan CPNS tanpa registrasi</li>
            <li>Latihan Kraepelin digital, logika pola, memori kerja, dan fokus</li>
          </ul>
        </div>
      </div>
    </section>

    <div className="border-t border-border/60" />

    <section className="container mx-auto max-w-6xl px-6 py-10">
      <p className="text-center text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
        Relevan untuk pola seleksi yang sering dicari
      </p>
      <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5">
        {TRUST_LOGOS.map((item) => (
          <div
            key={item}
            className="rounded-full border border-border bg-card px-4 py-2 text-xs font-medium text-muted-foreground"
          >
            {item}
          </div>
        ))}
      </div>
    </section>

    <div className="border-t border-border/60" />

    {/* Why section */}
    <section className="container mx-auto px-6 py-16 max-w-5xl">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-8">
        Kenapa KognitiF
      </h2>
      <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
        {WHY_ITEMS.map((item) => (
          <div key={item.q}>
            <h3 className="font-semibold text-foreground text-sm mb-1">{item.q}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{item.a}</p>
          </div>
        ))}
      </div>
    </section>

    <div className="border-t border-border/60" />

    <section className="container mx-auto max-w-6xl px-6 py-16">
      <div className="space-y-12">
        {FEATURE_SECTIONS.map((section, index) => (
          <div
            key={section.title}
            className="grid gap-8 rounded-[20px] border border-border bg-card p-6 md:grid-cols-[1.05fr_0.95fr] md:p-8"
          >
            <div className={index % 2 === 1 ? "md:order-2" : ""}>
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                {section.eyebrow}
              </p>
              <h2 className="mt-3 max-w-2xl text-2xl font-semibold tracking-tight text-foreground md:text-[2rem]">
                {section.title}
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
                {section.body}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {section.badges.map((badge) => (
                  <span
                    key={badge}
                    className="rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            <div className={index % 2 === 1 ? "md:order-1" : ""}>
              <div className="rounded-[18px] border border-border bg-background p-4">
                <div className="rounded-[14px] border border-border bg-card p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-foreground">{section.panelTitle}</p>
                    <span className="rounded-full bg-accent px-2.5 py-1 text-[11px] text-accent-foreground">
                      Aktif
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{section.panelBody}</p>
                  <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    {[0, 1, 2].map((item) => (
                      <div key={item} className="rounded-xl border border-border px-3 py-3">
                        <div className="h-2 rounded-full bg-muted">
                          <div
                            className="h-2 rounded-full bg-primary/80"
                            style={{ width: `${62 + item * 12}%` }}
                          />
                        </div>
                        <p className="mt-3 text-xs text-muted-foreground">
                          {item === 0
                            ? "User mendapat konteks dulu"
                            : item === 1
                              ? "Sesi dibuka lebih cepat"
                              : "Hasil tetap mudah dipindai"}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>

    <div className="border-t border-border/60" />

    <section className="container mx-auto max-w-6xl px-6 py-16">
      <div className="grid gap-8 md:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
            Bukti yang terlihat di produk
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground md:text-[2rem]">
            Proof section ini tidak mengandalkan klaim kosong. Semuanya muncul dari cara produk bekerja.
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground">
            Karena belum ada backend dan testimoni publik yang tervalidasi, bukti terbaik saat ini adalah
            alur produk itu sendiri: modul yang jelas, hasil yang cepat dibaca, dan struktur latihan yang
            memudahkan user kembali berlatih.
          </p>
        </div>

        <div className="grid gap-3">
          {PROOF_ITEMS.map((item) => (
            <div key={item.title} className="rounded-[18px] border border-border bg-card p-5">
              <p className="text-sm font-semibold text-foreground">{item.title}</p>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {TESTIMONIAL_STYLE_ITEMS.map((item) => (
          <div key={item.quote} className="rounded-[18px] border border-border bg-background p-5">
            <p className="text-base leading-7 text-foreground">"{item.quote}"</p>
            <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              {item.role}
            </p>
          </div>
        ))}
      </div>
    </section>

    {/* Pillars */}
    <section className="container mx-auto px-6 py-16 max-w-5xl">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-8">
        Prinsip Pengukuran
      </h2>
      <div className="grid md:grid-cols-3 gap-10">
        {PILLARS.map((p) => (
          <div key={p.label}>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">
              {p.label}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{p.detail}</p>
          </div>
        ))}
      </div>
    </section>

    <div className="border-t border-border/60" />

    {/* Module grid */}
    <section className="container mx-auto px-6 py-16 max-w-5xl">
      <div className="flex items-baseline justify-between mb-6">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          {ALL_TESTS.length} Modul Tersedia
        </h2>
        <Link to="/tes" className="text-xs text-primary hover:underline font-medium">
          Lihat semua
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2.5">
        {ALL_TESTS.map((t) => (
          <Link
            key={t.id}
            to={t.path}
            className="group border border-border rounded-lg px-3 py-3 hover:border-primary hover:bg-accent/50 transition-all duration-150"
          >
            <p className="text-sm font-medium text-foreground leading-snug group-hover:text-primary transition-colors">
              {t.name}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">{t.duration}</p>
          </Link>
        ))}
      </div>
    </section>

    {/* Footer */}
    <footer className="border-t border-border/60 py-8">
      <div className="container mx-auto px-6 max-w-5xl flex items-center justify-between">
        <span className="text-sm font-semibold text-foreground">KognitiF</span>
        <p className="text-xs text-muted-foreground">
          Latihan tes kinerja kognitif online gratis.
        </p>
      </div>
    </footer>
  </div>
);

export default Index;
