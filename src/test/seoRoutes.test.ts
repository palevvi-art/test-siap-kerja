import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

function readProjectFile(relativePath: string) {
  return readFileSync(resolve(__dirname, "../..", relativePath), "utf-8");
}

describe("SEO route scaffolding", () => {
  it("test registry defines FAQ and start paths for all modules", async () => {
    const { ALL_TESTS } = await import("../lib/testRegistry");

    expect(ALL_TESTS).toHaveLength(10);

    for (const test of ALL_TESTS) {
      expect(test.startPath).toBe(`${test.path}/mulai`);
      expect(test.faq.length).toBeGreaterThanOrEqual(2);
      expect(test.seoTitle.length).toBeGreaterThan(10);
      expect(test.seoDescription.length).toBeGreaterThan(40);
    }
  });

  it("app routes support intro pages and /mulai test runners", () => {
    const appSource = readProjectFile("src/App.tsx");

    expect(appSource).toContain('path="/tes/:testId"');
    expect(appSource).toContain('path="/tes/:testId/mulai"');
  });

  it("index meta references a shareable og image", () => {
    const html = readProjectFile("index.html");

    expect(html).toContain('property="og:image"');
    expect(html).toContain('name="twitter:image"');
    expect(html).toContain('/og-image.png');
  });
});
