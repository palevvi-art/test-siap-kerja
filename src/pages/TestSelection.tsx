import Layout from "@/components/Layout";
import TestCard from "@/components/TestCard";
import { ALL_TESTS, type TestMeta } from "@/lib/testRegistry";
import { getResults } from "@/lib/storage";
import { Link } from "react-router-dom";

const EXTRA_TOOLS = [
  {
    title: "Tes Koran Digital",
    description:
      "Versi terpisah untuk melatih ritme penjumlahan berulang, kestabilan akurasi, dan daya tahan fokus.",
    duration: "3 menit",
    href: "/eksplorasi/koran-digital",
    badge: "Tambahan",
  },
  {
    title: "Tes MBTI Mendalam",
    description:
      "Eksplorasi preferensi kerja, gaya komunikasi, cara mengambil keputusan, dan area pengembangan secara lebih menyeluruh.",
    duration: "32 pertanyaan",
    href: "/eksplorasi/mbti",
    badge: "Kepribadian",
  },
] as const;

const CATEGORY_ORDER: TestMeta["category"][] = [
  "logika",
  "memori",
  "hitung",
  "ketelitian",
  "fokus",
  "verbal",
];

const CATEGORY_META: Record<
  TestMeta["category"],
  { title: string; description: string }
> = {
  logika: {
    title: "Logika dan Reasoning",
    description: "Untuk membaca pola, aturan, dan hubungan numerik atau visual dengan cepat.",
  },
  memori: {
    title: "Memori",
    description: "Untuk melatih recall jangka pendek, fokus visual, dan kapasitas memori kerja.",
  },
  hitung: {
    title: "Hitung dan Numerik",
    description: "Untuk melatih ritme hitung, kecepatan mental, dan akurasi numerik dasar.",
  },
  ketelitian: {
    title: "Ketelitian",
    description: "Untuk spotting error, membandingkan detail kecil, dan menjaga akurasi administratif.",
  },
  fokus: {
    title: "Fokus dan Daya Tahan",
    description: "Untuk melatih konsentrasi, kontrol impuls, dan ritme performa yang stabil.",
  },
  verbal: {
    title: "Verbal dan Bahasa",
    description: "Untuk melatih makna kata, analogi, pemahaman bacaan, dan logika verbal.",
  },
};

const TestSelection = () => {
  const results = getResults();
  const completedIds = new Set(results.map((r) => r.testType));
  const doneCount = ALL_TESTS.filter((t) => completedIds.has(t.id)).length;
  const groupedTests = CATEGORY_ORDER.map((category) => ({
    category,
    meta: CATEGORY_META[category],
    tests: ALL_TESTS.filter((test) => test.category === category),
  })).filter((group) => group.tests.length > 0);

  return (
    <Layout>
      <div className="container mx-auto max-w-6xl px-6 py-10">
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

        <div className="space-y-10">
          <section>
            <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="text-lg font-semibold tracking-tight text-foreground">
                  Tes Tambahan
                </h2>
                <p className="text-sm leading-6 text-muted-foreground">
                  Modul terpisah dari katalog utama untuk eksplorasi khusus dan sesi latihan yang lebih spesifik.
                </p>
              </div>
              <div className="rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
                {EXTRA_TOOLS.length} modul tambahan
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {EXTRA_TOOLS.map((tool) => (
                <Link
                  key={tool.href}
                  to={tool.href}
                  className="group flex flex-col rounded-lg border border-border bg-card p-4 transition-all duration-150 hover:-translate-y-px hover:border-primary/30 hover:shadow-sm"
                >
                  <div className="mb-3 flex items-start justify-between">
                    <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                      {tool.badge}
                    </span>
                    <span className="text-xs text-muted-foreground/70">{tool.duration}</span>
                  </div>
                  <h3 className="mb-1 text-sm font-semibold leading-snug text-card-foreground group-hover:text-primary transition-colors">
                    {tool.title}
                  </h3>
                  <p className="flex-1 text-xs leading-relaxed text-muted-foreground">
                    {tool.description}
                  </p>
                </Link>
              ))}
            </div>
          </section>

          {groupedTests.map((group) => (
            <section key={group.category}>
              <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                <div>
                  <h2 className="text-lg font-semibold tracking-tight text-foreground">
                    {group.meta.title}
                  </h2>
                  <p className="text-sm leading-6 text-muted-foreground">{group.meta.description}</p>
                </div>
                <div className="rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
                  {group.tests.length} modul
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {group.tests.map((test) => (
                  <TestCard key={test.id} test={test} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default TestSelection;
