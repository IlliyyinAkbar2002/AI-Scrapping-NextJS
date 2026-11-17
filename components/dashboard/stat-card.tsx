interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change: string;
  trend: "up" | "down" | "neutral";
}

const trendStyles = {
  up: "text-emerald-600 dark:text-emerald-400",
  down: "text-red-600 dark:text-red-400",
  neutral: "text-zinc-500 dark:text-zinc-400",
};

export function StatCard({ title, value, icon, change, trend }: StatCardProps) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 transition-shadow hover:shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
          {title}
        </span>
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
          {icon}
        </span>
      </div>
      <div className="mt-3">
        <span className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          {value}
        </span>
      </div>
      <div className="mt-1.5 flex items-center gap-1.5">
        <span
          className={`inline-flex items-center gap-0.5 text-xs font-medium ${trendStyles[trend]}`}
        >
          {change}
        </span>
        {trend !== "neutral" && (
          <span className="text-xs text-zinc-400 dark:text-zinc-500">
            vs last week
          </span>
        )}
      </div>
    </div>
  );
}
