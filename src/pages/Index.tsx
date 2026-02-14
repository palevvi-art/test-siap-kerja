import { Link } from "react-router-dom";
import { Brain, Target, Zap, BarChart3, ArrowRight } from "lucide-react";

const features = [
  { icon: <Target className="h-5 w-5" />, title: "Berbasis Tugas", desc: "Tes dihasilkan sistem secara acak, bukan dari bank soal." },
  { icon: <Zap className="h-5 w-5" />, title: "Terukur Objektif", desc: "Metrik performa dicatat otomatis: akurasi, kecepatan, konsistensi." },
  { icon: <BarChart3 className="h-5 w-5" />, title: "Hasil Transparan", desc: "Ringkasan performa netral tanpa klaim klinis atau pelabelan." },
];

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="gradient-hero">
        <div className="container mx-auto px-4 py-24 md:py-32 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-medium mb-6">
            <Brain className="h-4 w-4" />
            Platform Tes Kinerja Kognitif
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-foreground leading-tight mb-4">
            Ukur Fokus, Ketelitian, dan Konsistensi Kerja Secara Objektif
          </h1>
          <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
            Enam tes berbasis tugas yang dihasilkan sistem untuk mengukur pola kinerja kognitif Anda.
            Tanpa bank soal, tanpa klaim klinis.
          </p>
          <Link
            to="/tes"
            className="gradient-primary inline-flex items-center gap-2 text-primary-foreground px-6 py-3 rounded-lg font-medium text-base hover:opacity-90 transition-opacity"
          >
            Mulai Tes
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {features.map((f, i) => (
            <div key={i} className="bg-card border rounded-lg p-5">
              <div className="h-10 w-10 rounded-lg bg-accent flex items-center justify-center text-primary mb-3">
                {f.icon}
              </div>
              <h3 className="font-semibold text-card-foreground mb-1">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-6 text-center text-sm text-muted-foreground">
        <div className="container mx-auto px-4">
          KognitiF — Platform Tes Kinerja Kognitif Berbasis Tugas
        </div>
      </footer>
    </div>
  );
};

export default Index;
