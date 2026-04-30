import { Link } from "react-router-dom";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { getResults } from "@/lib/storage";
import type { TestMeta } from "@/lib/testRegistry";

interface TestCardProps {
  test: TestMeta;
}

const CATEGORY_LABELS: Record<TestMeta["category"], string> = {
  logika: "Logika",
  memori: "Memori",
  hitung: "Hitung",
  ketelitian: "Ketelitian",
  fokus: "Fokus",
  verbal: "Verbal",
};

const TestCard = ({ test }: TestCardProps) => {
  const attempts = getResults().filter((r) => r.testType === test.id);
  const best = attempts.length > 0
    ? Math.max(...attempts.map((r) => r.accuracy))
    : null;

  return (
    <Link
      to={test.path}
      className={`group flex flex-col rounded-lg border p-4 transition-all duration-150 hover:-translate-y-px hover:shadow-sm ${
        best !== null
          ? "border-primary/30 bg-accent/30"
          : "border-border bg-card hover:border-border/80"
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          {CATEGORY_LABELS[test.category]}
        </span>
        {best !== null ? (
          <span className="flex items-center gap-1 text-xs text-primary font-semibold">
            <CheckCircle2 className="h-3.5 w-3.5" />
            {best}%
          </span>
        ) : (
          <span className="text-xs text-muted-foreground/60">—</span>
        )}
      </div>

      <h3 className="font-semibold text-card-foreground text-sm leading-snug mb-1 group-hover:text-primary transition-colors">
        {test.name}
      </h3>
      <p className="text-xs text-muted-foreground leading-relaxed mb-4 flex-1">
        {test.description}
      </p>

      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">{test.duration}</span>
        <span className="flex items-center gap-1 text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
          {best !== null ? "Ulangi" : "Mulai"}
          <ArrowRight className="h-3 w-3" />
        </span>
      </div>
    </Link>
  );
};

export default TestCard;
