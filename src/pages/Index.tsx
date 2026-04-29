import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
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
    a: "Semua 10 modul tersedia tanpa registrasi, tanpa biaya, tanpa batas pengulangan.",
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

const Index = () => (
  <div className="min-h-screen bg-background">
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
    <section className="container mx-auto px-6 pt-20 pb-16 max-w-5xl">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">
          Platform Tes Kinerja Kognitif
        </p>
        <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-[1.15] tracking-tight mb-5">
          Ukur cara kerja otak Anda.{" "}
          <span className="text-muted-foreground font-normal">Bukan kepribadian.</span>
        </h1>
        <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-xl">
          {ALL_TESTS.length} modul tes kinerja kognitif gratis. Cocok untuk persiapan seleksi kerja
          BUMN, CPNS, dan swasta. Tanpa registrasi. Tanpa bank soal.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/tes"
            className="inline-flex items-center gap-2 bg-foreground text-background px-5 py-2.5 rounded-lg text-sm font-semibold hover:opacity-85 transition-opacity"
          >
            Mulai Tes Gratis
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/tes/kraepelin"
            className="inline-flex items-center gap-2 border border-border px-5 py-2.5 rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors"
          >
            Coba Kraepelin Digital
          </Link>
        </div>
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
          10 Modul Tersedia
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
