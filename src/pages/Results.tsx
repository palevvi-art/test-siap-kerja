import { useParams, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { getResultById } from "@/lib/storage";
import { TEST_NAME } from "@/lib/testRegistry";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { ArrowLeft, LayoutDashboard, RotateCcw } from "lucide-react";

function accuracyLabel(pct: number): { text: string; color: string } {
  if (pct >= 90) return { text: "Sangat Baik", color: "text-primary" };
  if (pct >= 75) return { text: "Baik", color: "text-primary" };
  if (pct >= 60) return { text: "Cukup", color: "text-warning" };
  return { text: "Perlu Latihan", color: "text-destructive" };
}

const Results = () => {
  const { id } = useParams<{ id: string }>();
  const result = id ? getResultById(id) : undefined;

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

  return (
    <Layout>
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

        {/* Bar chart */}
        {chartData.length > 0 && (
          <div className="border border-border rounded-lg p-5 mb-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
              Performa per segmen
            </p>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={chartData} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(214 20% 91%)" />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid hsl(214 20% 90%)" }}
                />
                <Bar dataKey="Benar" fill="hsl(172 50% 36%)" radius={[3, 3, 0, 0]} />
                <Bar dataKey="Salah" fill="hsl(0 72% 51%)" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Line chart */}
        {chartData.length > 0 && (
          <div className="border border-border rounded-lg p-5 mb-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
              Waktu respons per segmen
            </p>
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(214 20% 91%)" />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid hsl(214 20% 90%)" }}
                />
                <Line
                  type="monotone"
                  dataKey="Waktu (ms)"
                  stroke="hsl(172 50% 36%)"
                  strokeWidth={2}
                  dot={{ r: 3, fill: "hsl(172 50% 36%)" }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

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
