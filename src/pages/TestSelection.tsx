import Layout from "@/components/Layout";
import TestCard from "@/components/TestCard";
import { ALL_TESTS } from "@/lib/testRegistry";
import { getResults } from "@/lib/storage";

const TestSelection = () => {
  const results = getResults();
  const completedIds = new Set(results.map((r) => r.testType));
  const doneCount = ALL_TESTS.filter((t) => completedIds.has(t.id)).length;

  return (
    <Layout>
      <div className="container mx-auto px-6 py-10 max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Pilih Tes</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {doneCount === 0
              ? `${ALL_TESTS.length} modul tersedia. Mulai dari mana saja.`
              : `${doneCount} dari ${ALL_TESTS.length} modul telah dikerjakan.`}
          </p>
          {doneCount > 0 && (
            <div className="mt-3 h-1.5 bg-muted rounded-full overflow-hidden max-w-xs">
              <div
                className="h-full bg-primary rounded-full transition-all duration-500"
                style={{ width: `${(doneCount / ALL_TESTS.length) * 100}%` }}
              />
            </div>
          )}
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {ALL_TESTS.map((test) => (
            <TestCard key={test.id} test={test} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default TestSelection;
