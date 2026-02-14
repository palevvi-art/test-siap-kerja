import { Link } from "react-router-dom";
import { Clock, CheckCircle2, ChevronRight } from "lucide-react";
import { getResults } from "@/lib/storage";

interface TestCardProps {
  title: string;
  description: string;
  duration: string;
  path: string;
  icon: React.ReactNode;
}

const TestCard = ({ title, description, duration, path, icon }: TestCardProps) => {
  const testType = path.split("/").pop() || "";
  const results = getResults().filter(r => r.testType === testType);
  const completed = results.length > 0;

  return (
    <div className="bg-card border rounded-lg p-5 test-card-hover flex flex-col">
      <div className="flex items-start justify-between mb-3">
        <div className="h-10 w-10 rounded-lg bg-accent flex items-center justify-center text-primary">
          {icon}
        </div>
        {completed ? (
          <span className="flex items-center gap-1 text-xs text-success font-medium">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Selesai ({results.length}x)
          </span>
        ) : (
          <span className="text-xs text-muted-foreground">Belum dikerjakan</span>
        )}
      </div>
      <h3 className="font-semibold text-card-foreground mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground mb-3 flex-1">{description}</p>
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" />
          {duration}
        </span>
        <Link
          to={path}
          className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
        >
          Mulai
          <ChevronRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
};

export default TestCard;
