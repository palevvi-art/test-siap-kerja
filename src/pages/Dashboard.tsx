import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { getResults } from "@/lib/storage";
import { TEST_NAME, ALL_TESTS } from "@/lib/testRegistry";
import { ArrowRight, ChevronRight } from "lucide-react";

const Dashboard = () => {
  const [filter, setFilter] = useState("all");

  const allResults = getResults().sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
  const results = filter === "all" ? allResults : allResults.filter((r) => r.testType === filter);
  const testTypes = [...new Set(allResults.map((r) => r.testType))];

  // Summary stats
  const completedModules = new Set(allResults.map((r) => r.testType)).size;
  const avgAccuracy =
    allResults.length > 0
      ? Math.round(allResults.reduce((s, r) => s + r.accuracy, 0) / allResults.length)
      : null;
  const totalSessions = allResults.length;

  return (
    <Layout>
      <div className="container mx-auto px-6 py-10 max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Riwayat dan ringkasan hasil tes kinerja kognitif Anda.
          </p>
        </div>

        {/* Summary cards */}
        {totalSessions > 0 && (
          <div className="grid grid-cols-3 gap-3 mb-8">
            <div className="border border-border rounded-lg p-4">
              <div className="text-2xl font-bold text-foreground tabular-nums">
                {completedModules}
                <span className="text-muted-foreground text-base font-normal">
                  /{ALL_TESTS.length}
                </span>
              </div>
              <div className="text-xs text-muted-foreground mt-0.5">Modul selesai</div>
            </div>
            <div className="border border-border rounded-lg p-4">
              <div className="text-2xl font-bold text-foreground tabular-nums">
                {avgAccuracy}%
              </div>
              <div className="text-xs text-muted-foreground mt-0.5">Rata-rata akurasi</div>
            </div>
            <div className="border border-border rounded-lg p-4">
              <div className="text-2xl font-bold text-foreground tabular-nums">
                {totalSessions}
              </div>
              <div className="text-xs text-muted-foreground mt-0.5">Total sesi</div>
            </div>
          </div>
        )}

        {/* Filter + list */}
        {allResults.length > 0 && (
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Riwayat
            </p>
            {testTypes.length > 1 && (
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="text-xs border border-border rounded-md px-2 py-1.5 bg-background text-foreground"
              >
                <option value="all">Semua tes</option>
                {testTypes.map((t) => (
                  <option key={t} value={t}>
                    {TEST_NAME[t] ?? t}
                  </option>
                ))}
              </select>
            )}
          </div>
        )}

        {results.length === 0 ? (
          <div className="border border-border rounded-lg py-16 px-6 text-center">
            <p className="font-medium text-foreground mb-1">Belum ada sesi tes.</p>
            <p className="text-sm text-muted-foreground mb-5">
              Selesaikan tes pertama untuk melihat hasil di sini.
            </p>
            <Link
              to="/tes"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
            >
              Pilih tes
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        ) : (
          <div className="border border-border rounded-lg divide-y divide-border overflow-hidden">
            {results.map((r) => (
              <Link
                key={r.id}
                to={`/hasil/${r.id}`}
                className="flex items-center gap-4 px-4 py-3.5 hover:bg-muted/50 transition-colors group"
              >
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-card-foreground text-sm truncate">
                    {TEST_NAME[r.testType] ?? r.testName}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {new Date(r.date).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}{" "}
                    · {r.duration} dtk
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <span
                    className={`text-sm font-bold tabular-nums ${
                      r.accuracy >= 80
                        ? "text-primary"
                        : r.accuracy >= 60
                          ? "text-warning"
                          : "text-destructive"
                    }`}
                  >
                    {r.accuracy}%
                  </span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground inline ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* CTA if some modules not done */}
        {completedModules < ALL_TESTS.length && totalSessions > 0 && (
          <div className="mt-6 flex items-center justify-between border border-border/60 rounded-lg px-4 py-3">
            <p className="text-sm text-muted-foreground">
              {ALL_TESTS.length - completedModules} modul belum dikerjakan.
            </p>
            <Link
              to="/tes"
              className="text-sm font-semibold text-primary hover:underline flex items-center gap-1"
            >
              Lanjutkan <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;
