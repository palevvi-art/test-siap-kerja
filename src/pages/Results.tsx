import { useParams, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { getResultById } from "@/lib/storage";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { ArrowLeft, BarChart3 } from "lucide-react";

const testNames: Record<string, string> = {
  "pengenalan-pola": "Pengenalan Pola",
  "daya-ingat": "Daya Ingat Kerja",
  "kecepatan-pemrosesan": "Kecepatan Pemrosesan",
  "kraepelin": "Kecermatan & Ketahanan Hitung",
  "ketelitian-visual": "Ketelitian Visual",
  "fokus-berkelanjutan": "Fokus Berkelanjutan",
};

const Results = () => {
  const { id } = useParams<{ id: string }>();
  const result = id ? getResultById(id) : undefined;

  if (!result) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <p className="text-muted-foreground">Hasil tidak ditemukan.</p>
          <Link to="/tes" className="text-primary hover:underline text-sm mt-2 inline-block">
            Kembali ke Pilih Tes
          </Link>
        </div>
      </Layout>
    );
  }

  const chartData = result.segmentData.map((s) => ({
    name: `Seg ${s.segment}`,
    Benar: s.correct,
    Salah: s.incorrect,
    "Waktu (ms)": Math.round(s.avgTime),
  }));

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <h1 className="text-2xl font-bold text-foreground mb-1">Ringkasan Hasil</h1>
        <p className="text-sm text-muted-foreground mb-6">
          {testNames[result.testType] || result.testName} — {new Date(result.date).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {[
            { label: "Total Respons", value: result.totalResponses },
            { label: "Akurasi", value: `${result.accuracy}%` },
            { label: "Waktu Rata-rata", value: `${result.avgResponseTime} ms` },
            { label: "Durasi", value: `${result.duration} detik` },
          ].map((s, i) => (
            <div key={i} className="bg-card border rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-foreground">{s.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Chart: Accuracy per segment */}
        <div className="bg-card border rounded-lg p-5 mb-4">
          <h3 className="text-sm font-semibold text-card-foreground mb-4">Performa Per Segmen</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(214 20% 90%)" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="Benar" fill="hsl(172 50% 36%)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Salah" fill="hsl(0 72% 51%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Chart: Response time per segment */}
        <div className="bg-card border rounded-lg p-5 mb-6">
          <h3 className="text-sm font-semibold text-card-foreground mb-4">Waktu Respon Per Segmen</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(214 20% 90%)" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Line type="monotone" dataKey="Waktu (ms)" stroke="hsl(172 50% 36%)" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <p className="text-sm text-muted-foreground mb-6 bg-muted p-3 rounded-lg">
          Hasil ini menggambarkan pola performa Anda dalam menyelesaikan tugas berbasis waktu. Tidak ada interpretasi klinis yang diberikan.
        </p>

        <div className="flex gap-3">
          <Link
            to="/tes"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-sm border rounded-lg text-foreground hover:bg-muted transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Kembali ke Pilih Tes
          </Link>
          <Link
            to="/dashboard"
            className="gradient-primary inline-flex items-center gap-1.5 px-4 py-2 text-sm rounded-lg text-primary-foreground hover:opacity-90 transition-opacity"
          >
            <BarChart3 className="h-3.5 w-3.5" />
            Lihat Dashboard
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Results;
