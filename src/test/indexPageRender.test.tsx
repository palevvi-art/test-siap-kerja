import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import Index from "@/pages/Index";

describe("Index landing page render", () => {
  it("renders safely even when IntersectionObserver is unavailable", () => {
    const originalObserver = window.IntersectionObserver;
    // Simulate constrained webview / older runtime.
    // @ts-expect-error test override
    delete window.IntersectionObserver;

    render(
      <MemoryRouter>
        <Index />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("heading", {
        name: /Satu tempat untuk melatih ritme tes kerja/i,
      }),
    ).toBeInTheDocument();

    window.IntersectionObserver = originalObserver;
  });
});
