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
    q: "Mulai dari tugas yang paling relevan.",
    a: "Katalog dibagi per kategori agar user bisa langsung memilih jalur latihan: logika, memori, hitung, ketelitian, fokus, atau verbal.",
  },
  {
    q: "Latihan tanpa friksi.",
    a: `Semua ${ALL_TESTS.length} modul tersedia tanpa registrasi, tanpa biaya, dan tanpa langkah masuk yang menghambat user yang ingin langsung berlatih.`,
  },
  {
    q: "Relevan untuk pola tes kerja nyata.",
    a: "Ada Kraepelin, deret angka, analogi kata, fokus warna, sampai pemeriksaan kode. Bukan cuma satu jenis soal yang diulang-ulang.",
  },
  {
    q: "Hasilnya langsung terbaca.",
    a: "Akurasi, respons, dan per segmen tampil jelas. User tidak perlu menafsirkan halaman hasil yang terlalu akademis atau terlalu kosong.",
  },
];

const LIVE_STATS = [
  { label: "Modul latihan", value: `${ALL_TESTS.length}`, note: "Siap dipakai kapan saja" },
  { label: "Durasi per sesi", value: "2-5 mnt", note: "Ringkas untuk latihan harian" },
  { label: "Penyimpanan hasil", value: "Lokal", note: "Privat di browser Anda" },
];

const HERO_STREAM = [
  { name: "Kraepelin Digital", detail: "Sesi selesai • 91% akurasi", time: "Baru saja" },
  { name: "Deret Angka", detail: "Latihan lanjutan • 4 menit", time: "2 menit lalu" },
  { name: "Fokus Warna", detail: "Perlu latihan ulang", time: "5 menit lalu" },
];

const FEATURE_SECTIONS = [
  {
    eyebrow: "Masuk, pilih, kerjakan",
    title: "Landing page ini sekarang menjual alur produknya, bukan hanya menjelaskan bahwa produknya ada.",
    body:
      "User melihat value paling penting dulu: modul yang relevan, pengalaman tanpa login, dan hasil yang cepat terbaca. Struktur ini lebih dekat ke cara product landing yang meyakinkan bekerja.",
    panelTitle: "Alur latihan harian",
    panelBody: "Pilih kategori, buka intro singkat, mulai tes, lalu baca hasil inti tanpa tersesat ke elemen yang tidak perlu.",
    badges: ["Kategori jelas", "Intro singkat", "Masuk ke tes cepat"],
  },
  {
    eyebrow: "Baca hasil tanpa menunggu",
    title: "Shell hasil muncul cepat, lalu detail visual menyusul. Ini terasa lebih seperti produk modern, bukan halaman laporan berat.",
    body:
      "Pendekatan ini penting untuk mobile dan koneksi biasa. User tetap langsung memahami sesi yang baru dikerjakan, lalu baru masuk ke grafik saat ingin melihat detail performa.",
    panelTitle: "Distribusi informasi",
    panelBody: "Headline hasil, akurasi, dan CTA tampil dulu. Grafik serta breakdown tetap ada, tetapi tidak lagi memblokir keseluruhan halaman.",
    badges: ["Faster first view", "Chart terpisah", "Lebih fokus"],
  },
];

const TRUST_LOGOS = ["BUMN", "CPNS", "Bank", "FMCG", "Admin", "Operator", "QC", "Back Office"];

const PROOF_ITEMS = [
  {
    title: "16 modul, tidak terasa numpuk",
    detail: "Karena dipisah per kategori dan per intent, user tidak merasa dilempar ke grid panjang yang semuanya terlihat sama.",
  },
  {
    title: "Hero menunjukkan produk, bukan ilustrasi abstrak",
    detail: "Mockup kanan sekarang memperlihatkan ritme penggunaan yang lebih konkret: sesi, tren, dan alur latihan yang terasa operasional.",
  },
  {
    title: "Setiap bagian punya tugas yang jelas",
    detail: "Hero untuk meyakinkan, blok intent untuk SEO, katalog untuk eksplorasi, dan hasil untuk retensi user yang ingin berlatih ulang.",
  },
];

const TESTIMONIAL_STYLE_ITEMS = [
  {
    quote: "Saya ingin langsung latihan tanpa daftar akun, tapi tetap merasa ini alat yang serius dan bukan bank soal asal jadi.",
    role: "Problem yang paling sering muncul",
  },
  {
    quote: "Kalau semua modul terlihat sama, saya tidak tahu harus mulai dari mana. Pengelompokan kategori menyelesaikan itu.",
    role: "Decision friction",
  },
  {
    quote: "Saya tidak butuh landing page yang ramai copy. Saya butuh struktur yang langsung mendorong saya klik mulai.",
    role: "Ekspektasi user yang benar",
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
          <p className="landing-hero-copy landing-stagger-1 mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
            Platform Tes Kinerja Kognitif
          </p>
          <h1 className="landing-hero-copy landing-stagger-2 max-w-2xl text-4xl font-bold leading-[1.03] tracking-tight text-foreground md:text-[3.85rem]">
            Persiapan tes kerja yang langsung terasa rapi sejak layar pertama.
          </h1>
          <p className="landing-hero-copy landing-stagger-3 mt-5 max-w-xl text-base leading-8 text-muted-foreground md:text-lg">
            {ALL_TESTS.length} modul latihan kognitif gratis untuk BUMN, CPNS, bank, dan swasta.
            Tanpa registrasi. Tanpa bank soal statis. Fokus pada performa tugas yang benar-benar dilatih, bukan hasil yang terasa generik.
          </p>
          <div className="landing-hero-copy landing-stagger-4 mt-8 flex flex-wrap gap-3">
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
            {LIVE_STATS.map((item, index) => (
              <div
                key={item.label}
                className={`landing-hero-copy landing-stat-card landing-stagger-${index + 5} rounded-lg border border-border bg-card/80 p-4 backdrop-blur-sm`}
              >
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
          <div className="landing-float landing-hero-panel rounded-[20px] border border-border bg-card p-4 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
            <div className="rounded-[16px] border border-border/80 bg-background p-4">
              <div className="flex items-center justify-between border-b border-border/70 pb-4">
                <div>
                  <p className="landing-hero-copy landing-stagger-2 text-xs font-semibold uppercase tracking-widest text-primary">
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
                <div className="landing-hero-copy landing-stat-card landing-stagger-5 rounded-xl border border-border bg-card p-4">
                  <Clock3 className="h-4 w-4 text-primary" />
                  <p className="mt-3 text-2xl font-semibold text-foreground">18:40</p>
                  <p className="text-xs text-muted-foreground">Durasi latihan aktif minggu ini</p>
                </div>
                <div className="landing-hero-copy landing-stat-card landing-stagger-6 rounded-xl border border-border bg-card p-4">
                  <BarChart3 className="h-4 w-4 text-primary" />
                  <p className="mt-3 text-2xl font-semibold text-foreground">84%</p>
                  <p className="text-xs text-muted-foreground">Rata-rata akurasi lintas modul</p>
                </div>
                <div className="landing-hero-copy landing-stat-card landing-stagger-7 rounded-xl border border-border bg-card p-4">
                  <Brain className="h-4 w-4 text-primary" />
                  <p className="mt-3 text-2xl font-semibold text-foreground">4 jalur</p>
                  <p className="text-xs text-muted-foreground">Kategori paling sering dipakai</p>
                </div>
              </div>

              <div className="mt-4 grid gap-4 md:grid-cols-[0.9fr_1.1fr]">
                <div className="landing-hero-copy landing-stagger-6 rounded-xl border border-border bg-card p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-foreground">Riwayat latihan terakhir</p>
                    <span className="rounded-full bg-accent px-2.5 py-1 text-[11px] font-medium text-accent-foreground">
                      Live
                    </span>
                  </div>
                  <div className="mt-4 space-y-3">
                    {HERO_STREAM.map((item, index) => (
                      <div
                        key={item.name}
                        className={`landing-hero-copy rounded-lg border border-border/70 px-3 py-2 landing-stream-item landing-stagger-${index + 6} flex items-start justify-between gap-3`}
                      >
                        <div>
                          <p className="text-sm font-medium text-foreground">{item.name}</p>
                          <p className="text-xs text-muted-foreground">{item.detail}</p>
                        </div>
                        <span className="text-[11px] text-muted-foreground">{item.time}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="landing-hero-copy landing-stagger-7 rounded-xl border border-border bg-card p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-foreground">Tren akurasi mingguan</p>
                    <div className="flex items-center gap-1 text-xs text-success">
                      <Activity className="h-3.5 w-3.5" />
                      Stabil meningkat
                    </div>
                  </div>
                  <div className="mt-5 flex h-32 items-end gap-2">
                    {[42, 68, 55, 80, 74, 92, 88].map((height, index) => (
                      <div key={height} className="flex flex-1 flex-col items-center gap-2">
                        <div
                          className="landing-rise landing-bar-glow w-full rounded-t-md bg-[linear-gradient(180deg,rgba(29,155,139,0.78),rgba(29,155,139,0.2))]"
                          style={{
                            height: `${height}%`,
                            animationDelay: `${index * 120}ms`,
                          }}
                        />
                        <span className="text-[11px] text-muted-foreground">
                          {["Sn", "Sl", "Rb", "Km", "Jm", "Sb", "Mg"][index]}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="landing-hero-copy landing-stagger-8 mt-4 rounded-lg border border-dashed border-border px-3 py-3 text-sm text-muted-foreground">
                    Halaman hasil dibuka cepat, angka utama langsung terbaca, dan detail visual menyusul tanpa menahan keseluruhan layar.
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
            Untuk user yang ingin cepat siap
          </h2>
          <h3 className="max-w-2xl text-[2.15rem] font-semibold leading-tight tracking-tight text-foreground">
            Bukan hanya banyak tes. Urutannya sekarang lebih enak dipakai dan lebih masuk akal untuk user baru.
          </h3>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
            User bisa masuk dari kata kunci pencarian, mendarat di intro modul yang tepat, lalu lanjut ke sesi tes tanpa harus memahami sistem yang rumit. Ini membuat landing page lebih kuat secara SEO dan lebih meyakinkan secara produk.
          </p>
        </div>
        <div className="rounded-[20px] border border-border bg-card p-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Intent pencarian yang dilayani
          </p>
          <div className="mt-4 space-y-3">
            {[
              "Tes kognitif online gratis untuk seleksi kerja",
              "Simulasi tes BUMN dan CPNS tanpa registrasi",
              "Latihan Kraepelin, deret angka, memori, dan fokus",
            ].map((item) => (
              <div key={item} className="rounded-xl border border-border/80 bg-background px-4 py-3 text-sm leading-6 text-muted-foreground">
                {item}
              </div>
            ))}
          </div>
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
        Yang dibuat lebih benar
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
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground md:text-[2.15rem]">
            Bagian ini sekarang berfungsi sebagai proof, bukan sekadar blok penjelasan tambahan.
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground">
            Karena belum ada backend dan testimoni publik tervalidasi, bukti paling jujur datang dari struktur produk itu sendiri. Jadi saya pertahankan credibility dengan menunjukkan cara kerja, bukan memalsukan social proof.
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
