import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface ResultsChartsProps {
  chartData: Array<{
    name: string;
    Benar: number;
    Salah: number;
    "Waktu (ms)": number;
  }>;
}

export default function ResultsCharts({ chartData }: ResultsChartsProps) {
  if (chartData.length === 0) {
    return null;
  }

  return (
    <>
      <div className="mb-3 rounded-lg border border-border p-5">
        <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Performa per segmen
        </p>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={chartData} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(214 20% 91%)" />
            <XAxis dataKey="name" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid hsl(214 20% 90%)" }}
            />
            <Bar dataKey="Benar" fill="hsl(172 50% 36%)" radius={[3, 3, 0, 0]} />
            <Bar dataKey="Salah" fill="hsl(0 72% 51%)" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mb-8 rounded-lg border border-border p-5">
        <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Waktu respons per segmen
        </p>
        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(214 20% 91%)" />
            <XAxis dataKey="name" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid hsl(214 20% 90%)" }}
            />
            <Line
              type="monotone"
              dataKey="Waktu (ms)"
              stroke="hsl(172 50% 36%)"
              strokeWidth={2}
              dot={{ r: 3, fill: "hsl(172 50% 36%)" }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}
