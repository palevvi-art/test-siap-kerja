import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { getResults } from "@/lib/storage";
import { Eye, Filter } from "lucide-react";

const testNames: Record<string, string> = {
  "pengenalan-pola": "Pengenalan Pola",
  "daya-ingat": "Daya Ingat Kerja",
  "kecepatan-pemrosesan": "Kecepatan Pemrosesan",
  "kraepelin": "Kecermatan & Ketahanan Hitung",
  "ketelitian-visual": "Ketelitian Visual",
  "fokus-berkelanjutan": "Fokus Berkelanjutan",
};

const Dashboard = () => {
  const [filter, setFilter] = useState("all");
  const allResults = getResults().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const results = filter === "all" ? allResults : allResults.filter(r => r.testType === filter);
  const testTypes = [...new Set(allResults.map(r => r.testType))];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground text-sm mt-1">Riwayat hasil tes kinerja kognitif Anda.</p>
          </div>
          {testTypes.length > 0 && (
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="text-sm border rounded-md px-2 py-1.5 bg-card text-card-foreground"
              >
                <option value="all">Semua Tes</option>
                {testTypes.map(t => (
                  <option key={t} value={t}>{testNames[t] || t}</option>
                ))}
              </select>
            </div>
          )}
        </div>

        {results.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground mb-3">Belum ada riwayat tes.</p>
            <Link to="/tes" className="text-primary hover:underline text-sm">
              Mulai tes pertama Anda →
            </Link>
          </div>
        ) : (
          <div className="space-y-2">
            {results.map((r) => (
              <Link
                key={r.id}
                to={`/hasil/${r.id}`}
                className="flex items-center justify-between bg-card border rounded-lg p-4 test-card-hover"
              >
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-card-foreground text-sm">
                    {testNames[r.testType] || r.testName}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {new Date(r.date).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })} · {r.duration} detik · Akurasi {r.accuracy}%
                  </div>
                </div>
                <Eye className="h-4 w-4 text-muted-foreground flex-shrink-0 ml-3" />
              </Link>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;
