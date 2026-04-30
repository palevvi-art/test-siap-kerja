import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

function readProjectFile(relativePath: string) {
  return readFileSync(resolve(__dirname, "../..", relativePath), "utf-8");
}

describe("Shareable results and sitemap scaffolding", () => {
  it("results page exposes a shareable preview surface and copy-link CTA", () => {
    const source = readProjectFile("src/pages/Results.tsx");
    const chartsSource = readProjectFile("src/components/ResultsCharts.tsx");

    expect(source).toContain('id="result-share-card"');
    expect(source).toContain("Salin Tautan Hasil");
    expect(source).toContain("Bagikan ringkasan hasil");
    expect(source).toContain('lazy(() => import("@/components/ResultsCharts"))');
    expect(chartsSource).toContain("Performa per segmen");
    expect(chartsSource).toContain("Waktu respons per segmen");
  });

  it("sitemap keeps all test intro URLs crawlable", async () => {
    const sitemap = readProjectFile("public/sitemap.xml");
    const { ALL_TESTS } = await import("../lib/testRegistry");

    for (const test of ALL_TESTS) {
      expect(sitemap).toContain(`<loc>https://test-siap-kerja.vercel.app${test.path}</loc>`);
    }
  });

  it("test selection groups modules by category for easier scanning", () => {
    const source = readProjectFile("src/pages/TestSelection.tsx");

    expect(source).toContain("Logika dan Reasoning");
    expect(source).toContain("Memori");
    expect(source).toContain("Verbal dan Bahasa");
  });
});
