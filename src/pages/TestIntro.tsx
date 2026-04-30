import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Layout from "@/components/Layout";
import PageMeta from "@/components/PageMeta";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ALL_TESTS, TEST_BY_ID } from "@/lib/testRegistry";

const SITE_NAME = "KognitiF";

const CATEGORY_COPY: Record<
  string,
  {
    label: string;
    heading: string;
    body: string;
  }
> = {
  logika: {
    label: "Cluster Penalaran",
    heading: "Sering dipakai untuk screening kandidat yang harus cepat membaca pola dan aturan.",
    body:
      "Latihan di cluster ini relevan untuk tes logika kerja, reasoning, dan soal abstrak yang sering muncul di BUMN, CPNS, bank, dan perusahaan swasta.",
  },
  memori: {
    label: "Cluster Memori Kerja",
    heading: "Berguna untuk latihan tugas yang menuntut recall cepat dan akurat.",
    body:
      "Jenis soal ini umum dipakai saat perusahaan ingin melihat kapasitas menyimpan informasi singkat, fokus, dan kestabilan performa saat detail harus diingat.",
  },
  hitung: {
    label: "Cluster Numerik",
    heading: "Cocok untuk latihan tes hitung kerja, Kraepelin, dan ritme numerik berbasis waktu.",
    body:
      "Biasanya muncul pada seleksi yang menilai akurasi hitung, kecepatan mental, dan daya tahan menghadapi tugas angka yang repetitif atau bertekanan waktu.",
  },
  ketelitian: {
    label: "Cluster Ketelitian",
    heading: "Paling relevan untuk posisi yang bergantung pada akurasi detail dan spotting error.",
    body:
      "Latihan ini membantu membangun kebiasaan mengecek detail kecil, membedakan angka atau simbol yang mirip, dan menjaga kualitas kerja administratif.",
  },
  fokus: {
    label: "Cluster Fokus",
    heading: "Dirancang untuk latihan konsentrasi berkelanjutan dan ritme kerja yang stabil.",
    body:
      "Sering dipakai untuk melihat apakah peserta bisa menjaga performa dari awal sampai akhir tanpa banyak kesalahan impulsif saat tugas terasa monoton.",
  },
  verbal: {
    label: "Cluster Verbal",
    heading: "Membantu latihan memahami instruksi, relasi kata, dan logika bahasa tertulis.",
    body:
      "Soal verbal umum dipakai pada seleksi yang menuntut pemahaman bacaan cepat, kejernihan berpikir, dan kemampuan menangkap inti informasi secara tepat.",
  },
};

export default function TestIntro() {
  const { testId } = useParams<{ testId: string }>();

  if (!testId || !TEST_BY_ID[testId]) {
    return <Navigate to="/404" replace />;
  }

  const test = TEST_BY_ID[testId];
  const relatedTests = ALL_TESTS.filter((item) => item.id !== test.id && item.category === test.category).slice(0, 3);
  const categoryCopy = CATEGORY_COPY[test.category];
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: SITE_NAME,
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
        name: test.name,
        item: `https://test-siap-kerja.vercel.app${test.path}`,
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: test.faq.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <Layout>
      <PageMeta
        title={test.seoTitle}
        description={test.seoDescription}
        canonicalPath={test.path}
        schema={[breadcrumbSchema, faqSchema]}
      />

      <div className="container mx-auto max-w-5xl px-6 py-12">
        <div className="max-w-3xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-primary">
            Persiapan Tes Kerja
          </p>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground">{test.heroTitle}</h1>
          <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
            {test.seoDescription}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to={test.startPath}
              className="inline-flex items-center gap-2 rounded-lg bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition-opacity hover:opacity-85"
            >
              Mulai Tes
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/tes"
              className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              Lihat Semua Modul
            </Link>
          </div>
        </div>

        <div className="mt-12 grid gap-8 border-t border-border/60 pt-10 md:grid-cols-[1.2fr_0.8fr]">
          <section>
            <h2 className="mb-4 text-xl font-semibold text-foreground">Apa itu {test.name}?</h2>
            <div className="space-y-4">
              {test.intro.map((paragraph) => (
                <p key={paragraph} className="text-sm leading-7 text-muted-foreground">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-8 rounded-lg border border-border bg-card p-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                {categoryCopy.label}
              </p>
              <h2 className="mt-3 text-lg font-semibold tracking-tight text-foreground">
                {categoryCopy.heading}
              </h2>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{categoryCopy.body}</p>
            </div>
          </section>

          <aside className="space-y-6">
            <div className="rounded-lg border border-border bg-card p-5">
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-foreground">
                Format Tes
              </h2>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>Durasi latihan: {test.duration}</p>
                <p>Soal dikerjakan langsung di browser tanpa registrasi.</p>
                <p>Hasil sesi tersimpan lokal agar Anda bisa mengulang dan membandingkan performa.</p>
              </div>
            </div>

            <div className="rounded-lg border border-border bg-card p-5">
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-foreground">
                Yang Diukur
              </h2>
              <ul className="space-y-2">
                {test.measures.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-lg border border-border bg-card p-5">
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-foreground">
                Umum Dipakai Untuk
              </h2>
              <ul className="space-y-2">
                {test.usedFor.map((item) => (
                  <li key={item} className="text-sm leading-6 text-muted-foreground">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>

        <section className="mt-12 border-t border-border/60 pt-10">
          <h2 className="mb-4 text-xl font-semibold text-foreground">FAQ {test.name}</h2>
          <Accordion type="single" collapsible className="max-w-3xl">
            {test.faq.map((faq, index) => (
              <AccordionItem key={faq.question} value={`faq-${index}`}>
                <AccordionTrigger className="text-left text-sm font-semibold text-foreground hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-7 text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {relatedTests.length > 0 && (
          <section className="mt-12 border-t border-border/60 pt-10">
            <h2 className="mb-4 text-xl font-semibold text-foreground">Tes Terkait</h2>
            <div className="grid gap-3 md:grid-cols-3">
              {relatedTests.map((related) => (
                <Link
                  key={related.id}
                  to={related.path}
                  className="rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary hover:bg-accent/40"
                >
                  <p className="text-sm font-semibold text-foreground">{related.name}</p>
                  <p className="mt-1 text-xs leading-6 text-muted-foreground">{related.description}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
}
