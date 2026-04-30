import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Layout from "@/components/Layout";
import PageMeta from "@/components/PageMeta";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { TEST_BY_ID } from "@/lib/testRegistry";

const SITE_NAME = "KognitiF";

export default function TestIntro() {
  const { testId } = useParams<{ testId: string }>();

  if (!testId || !TEST_BY_ID[testId]) {
    return <Navigate to="/404" replace />;
  }

  const test = TEST_BY_ID[testId];
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
          </section>

          <aside className="space-y-6">
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
      </div>
    </Layout>
  );
}
