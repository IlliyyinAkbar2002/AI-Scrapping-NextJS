"use client";

import { Suspense, useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";

function SidebarSkeleton() {
  return (
    <>
      <aside className="hidden w-56 shrink-0 border-r border-zinc-200 bg-white lg:block dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex h-14 items-center gap-2.5 px-4">
          <div className="h-7 w-7 rounded-lg bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-4 w-16 rounded bg-zinc-200 dark:bg-zinc-800" />
        </div>
        <div className="space-y-1 px-3 py-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-9 rounded-lg bg-zinc-100 dark:bg-zinc-800/50" />
          ))}
        </div>
      </aside>
    </>
  );
}

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-zinc-50 dark:bg-zinc-950">
      <Suspense fallback={<SidebarSkeleton />}>
        <Sidebar
          mobileOpen={mobileOpen}
          onClose={() => setMobileOpen(false)}
        />
      </Suspense>
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header onMenuClick={() => setMobileOpen(true)} />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
