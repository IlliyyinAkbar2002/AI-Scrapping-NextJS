"use client";

import { useState } from "react";
import { weeklyActivity } from "@/lib/mock-data";

export function ActivityChart() {
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  const maxTotal = Math.max(
    ...weeklyActivity.map((d) => d.successful + d.failed)
  );

  const totalSuccessful = weeklyActivity.reduce((s, d) => s + d.successful, 0);
  const totalFailed = weeklyActivity.reduce((s, d) => s + d.failed, 0);

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mb-5 flex items-start justify-between">
        <div>
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            Scraping Activity
          </h3>
          <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
            Nov 10 – Nov 16, 2026
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
            <span className="text-zinc-600 dark:text-zinc-400">
              Successful ({totalSuccessful})
            </span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
            <span className="text-zinc-600 dark:text-zinc-400">
              Failed ({totalFailed})
            </span>
          </span>
        </div>
      </div>

      <div className="flex items-end gap-3 h-44">
        {weeklyActivity.map((d, i) => {
          const successH = Math.max(4, ((d.successful / maxTotal) * 100));
          const failH = Math.max(2, ((d.failed / maxTotal) * 100));
          const isHovered = hoveredBar === i;

          return (
            <div
              key={d.day}
              className="flex flex-1 flex-col items-center gap-2"
              onMouseEnter={() => setHoveredBar(i)}
              onMouseLeave={() => setHoveredBar(null)}
            >
              <div className="relative flex w-full flex-1 flex-col justify-end">
                {isHovered && (
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 z-10 whitespace-nowrap rounded-md bg-zinc-900 px-2.5 py-1.5 text-xs text-white shadow-lg dark:bg-zinc-100 dark:text-zinc-900">
                    <span className="font-medium">{d.successful}</span> ok
                    <span className="mx-1 text-zinc-500">·</span>
                    <span className="font-medium">{d.failed}</span> fail
                  </div>
                )}
                <div className="flex w-full flex-col items-center gap-0.5">
                  <div
                    className="w-full max-w-[36px] rounded-t-md bg-red-400 transition-opacity dark:bg-red-500"
                    style={{
                      height: `${failH}%`,
                      opacity: isHovered ? 1 : 0.7,
                    }}
                  />
                  <div
                    className="w-full max-w-[36px] rounded-t-md bg-emerald-500 transition-opacity dark:bg-emerald-400"
                    style={{
                      height: `${successH}%`,
                      opacity: isHovered ? 1 : 0.85,
                    }}
                  />
                </div>
              </div>
              <span className="text-[11px] font-medium text-zinc-400 dark:text-zinc-500">
                {d.day}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
