import { Suspense, lazy, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import PageMeta from "@/components/PageMeta";
import { useToast } from "@/hooks/use-toast";
import { getResultById } from "@/lib/storage";
import { TEST_NAME } from "@/lib/testRegistry";
import { ArrowLeft, Copy, LayoutDashboard, RotateCcw } from "lucide-react";

const ResultsCharts = lazy(() => import("@/components/ResultsCharts"));

function accuracyLabel(pct: number): { text: string; color: string } {
  if (pct >= 90) return { text: "Sangat Baik", color: "text-primary" };
  if (pct >= 75) return { text: "Baik", color: "text-primary" };
  if (pct >= 60) return { text: "Cukup", color: "text-warning" };
  return { text: "Perlu Latihan", color: "text-destructive" };
}

const Results = () => {
  const { id } = useParams<{ id: string }>();
  const result = id ? getResultById(id) : undefined;
  const { toast } = useToast();

  if (!result) {
    return (
      <Layout>
        <div className="container mx-auto px-6 py-20 text-center max-w-md">
          <p className="font-semibold text-foreground mb-1">Hasil tidak ditemukan.</p>
          <p className="text-sm text-muted-foreground mb-6">
            Sesi ini mungkin sudah tidak tersedia atau belum selesai.
          </p>
          <Link
            to="/tes"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Kembali ke Pilih Tes
          </Link>
        </div>
      </Layout>
    );
  }

  const testName = TEST_NAME[result.testType] ?? result.testName;
  const label = accuracyLabel(result.accuracy);
  const chartData = result.segmentData.map((s) => ({
    name: `Seg ${s.segment}`,
    Benar: s.correct,
    Salah: s.incorrect,
    "Waktu (ms)": Math.round(s.avgTime),
  }));

  const dateStr = new Date(result.date).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const schema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "KognitiF",
          item: "https://test-siap-kerja.vercel.app/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Pilih Tes",
          item: "https://test-siap-kerja.vercel.app/tes",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: `Hasil ${testName}`,
          item: `https://test-siap-kerja.vercel.app/hasil/${result.id}`,
        },
      ],
    }),
    [result.id, testName],
  );

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast({
        title: "Tautan hasil disalin",
        description: "Bagikan link ini atau simpan untuk membuka hasil yang sama di perangkat ini.",
      });
    } catch (error) {
      toast({
        title: "Gagal menyalin tautan",
        description: "Coba salin URL dari address bar browser.",
      });
    }
  };

  return (
    <Layout>
      <PageMeta
        title={`Hasil ${testName} | KognitiF`}
        description={`Ringkasan hasil ${testName}: akurasi ${result.accuracy} persen, waktu rata-rata ${result.avgResponseTime} ms, dan performa per segmen.`}
        canonicalPath={`/hasil/${result.id}`}
        schema={schema}
      />
      <div className="container mx-auto px-6 py-10 max-w-3xl">
        {/* Breadcrumb */}
        <Link
          to="/tes"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Pilih Tes
        </Link>

        {/* Header */}
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">
            {dateStr}
          </p>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">{testName}</h1>
          <p className={`text-sm font-semibold mt-1 ${label.color}`}>{label.text}</p>
        </div>

        <div id="result-share-card" className="mb-8 rounded-lg border border-border bg-card p-6">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Bagikan ringkasan hasil
          </p>
          <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <h2 className="text-xl font-bold text-foreground">{result.accuracy}% akurasi</h2>
              <p className="mt-2 max-w-xl text-sm leading-7 text-muted-foreground">
                Hasil ini menunjukkan performa sesi {testName} pada {dateStr}, termasuk akurasi, waktu respons rata-rata,
                dan perubahan performa per segmen.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-md border border-border px-3 py-1 text-xs text-muted-foreground">
                  {result.correctResponses} jawaban benar
                </span>
                <span className="rounded-md border border-border px-3 py-1 text-xs text-muted-foreground">
                  {result.avgResponseTime} ms rata-rata
                </span>
                <span className="rounded-md border border-border px-3 py-1 text-xs text-muted-foreground">
                  Durasi {result.duration} detik
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={handleCopyLink}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              <Copy className="h-3.5 w-3.5" />
              Salin Tautan Hasil
            </button>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {[
            { label: "Total Respons", value: result.totalResponses.toString() },
            { label: "Akurasi", value: `${result.accuracy}%` },
            { label: "Waktu Rata-rata", value: `${result.avgResponseTime} ms` },
            { label: "Durasi", value: `${result.duration} dtk` },
          ].map((s) => (
            <div key={s.label} className="border border-border rounded-lg p-4">
              <div className="text-xl font-bold text-foreground tabular-nums">{s.value}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        <Suspense
          fallback={
            chartData.length > 0 ? (
              <div className="mb-8 rounded-lg border border-border bg-card p-5">
                <p className="text-sm font-semibold text-foreground">Menyiapkan visual hasil</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Grafik performa dimuat terpisah agar halaman hasil lebih cepat terbuka.
                </p>
              </div>
            ) : null
          }
        >
          <ResultsCharts chartData={chartData} />
        </Suspense>

        {/* Disclaimer */}
        <p className="text-xs text-muted-foreground border border-border rounded-lg px-4 py-3 mb-8 leading-relaxed">
          Angka di atas menggambarkan pola performa dalam tugas berbasis waktu pada sesi ini.
          Tidak ada interpretasi klinis atau label psikologis yang diberikan.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-3">
          <Link
            to={`/tes/${result.testType}`}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-sm border border-border rounded-lg text-foreground hover:bg-muted transition-colors font-medium"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Ulangi Tes
          </Link>
          <Link
            to="/tes"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-sm border border-border rounded-lg text-foreground hover:bg-muted transition-colors"
          >
            Pilih Tes Lain
          </Link>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-sm bg-foreground text-background rounded-lg hover:opacity-85 transition-opacity font-medium ml-auto"
          >
            <LayoutDashboard className="h-3.5 w-3.5" />
            Dashboard
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Results;
