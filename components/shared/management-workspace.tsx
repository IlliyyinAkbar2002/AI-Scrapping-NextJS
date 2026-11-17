"use client";

import { useMemo, useState, type FormEvent } from "react";
import { StatusBadge } from "@/components/shared/status-badge";
import { hotelsConfig, publishingConfig, schedulesConfig, scrapingConfig, type ManagementConfig, type ManagementRow } from "@/lib/management-data";

interface ManagementWorkspaceProps {
  configKey: "hotels" | "scraping" | "publishing" | "schedules";
}

const managementConfigs: Record<ManagementWorkspaceProps["configKey"], ManagementConfig> = {
  hotels: hotelsConfig,
  scraping: scrapingConfig,
  publishing: publishingConfig,
  schedules: schedulesConfig,
};

const controlClassName =
  "h-9 rounded-lg border border-zinc-700 bg-zinc-900 px-3 text-sm text-zinc-200 outline-none placeholder:text-zinc-500 focus:border-zinc-500";

export function ManagementWorkspace({ configKey }: ManagementWorkspaceProps) {
  const config = managementConfigs[configKey];
  const [rows, setRows] = useState(config.rows);
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [modal, setModal] = useState<"create" | "edit" | "details" | null>(null);
  const [selected, setSelected] = useState<ManagementRow | null>(null);
  const [values, setValues] = useState<Record<string, string>>({});

  const visibleRows = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return rows.filter((row) => {
      const matchesQuery = !normalizedQuery || Object.values(row).some((value) => value.toLowerCase().includes(normalizedQuery));
      return matchesQuery && config.filters.every(({ key }) => !filters[key] || row[key] === filters[key]);
    });
  }, [config.filters, filters, query, rows]);

  function openCreate() {
    setSelected(null);
    setValues({});
    setModal("create");
  }

  function openDetails(row: ManagementRow) {
    setSelected(row);
    setModal("details");
  }

  function openEdit(row: ManagementRow) {
    setSelected(row);
    setValues(config.getFormValues?.(row) ?? { ...row });
    setModal("edit");
  }

  function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (modal === "edit" && selected) {
      const updated = { ...selected, ...values };
      if (configKey === "schedules" && values.startDate && values.startTime) {
        updated.nextRun = `${values.startDate} · ${values.startTime}`;
      }
      if (configKey === "publishing" && values.publishDate) {
        updated.publishDate = new Date(values.publishDate).toLocaleString();
      } else if (configKey === "publishing") {
        updated.publishDate = selected.publishDate;
      }
      setRows((current) => current.map((row) => (row.id === selected.id ? updated : row)));
    } else {
      const id = `${Date.now()}`;
      const created = config.toRow?.(values, id) ?? { ...values, id };
      setRows((current) => [created, ...current]);
    }
    setModal(null);
  }

  function toggleSchedule(row: ManagementRow) {
    const status = row.status === "Active" ? "Paused" : "Active";
    setRows((current) => current.map((item) => item.id === row.id ? { ...item, status } : item));
  }

  return (
    <div className="space-y-5 text-zinc-100">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">{config.title}</h1>
          <p className="mt-1 text-sm text-zinc-400">{config.description}</p>
        </div>
        <button onClick={openCreate} className="inline-flex h-9 shrink-0 items-center justify-center gap-2 rounded-lg bg-zinc-100 px-3.5 text-sm font-medium text-zinc-900 transition-colors hover:bg-white">
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true"><path d="M12 5v14m7-7H5" strokeWidth="1.8" strokeLinecap="round" /></svg>
          {config.actionLabel}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        {config.stats.map((stat) => (
          <div key={stat.label} className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 sm:p-5">
            <p className="text-sm text-zinc-400">{stat.label}</p>
            <p className="mt-2 text-2xl font-semibold tracking-tight">{stat.value(rows)}</p>
          </div>
        ))}
      </div>

      <section className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900">
        <div className="flex flex-col gap-3 border-b border-zinc-800 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-sm font-semibold">{config.title === "Hotels" ? "Hotel data" : config.title === "Scraping" ? "Scraping jobs" : config.title === "Publishing" ? "Content" : "Automated schedules"}</h2>
            <p className="mt-1 text-xs text-zinc-500">{visibleRows.length} {visibleRows.length === 1 ? "record" : "records"}</p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            <label className="relative min-w-48 flex-1">
              <span className="sr-only">{config.searchPlaceholder}</span>
              <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true"><circle cx="11" cy="11" r="7" strokeWidth="1.7"/><path d="m16 16 4 4" strokeWidth="1.7" strokeLinecap="round"/></svg>
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={config.searchPlaceholder} className={`${controlClassName} w-full pl-9`} />
            </label>
            {config.filters.map((filter) => (
              <select key={filter.key} aria-label={`Filter by ${filter.label.toLowerCase()}`} value={filters[filter.key] ?? ""} onChange={(event) => setFilters((current) => ({ ...current, [filter.key]: event.target.value }))} className={`${controlClassName} min-w-32`}>
                <option value="">All {filter.label}</option>
                {filter.options.map((option) => <option key={option} value={option}>{option}</option>)}
              </select>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-zinc-950/40 text-xs font-medium uppercase tracking-wide text-zinc-500">
              <tr>{config.columns.map((column) => <th key={column.key} className="px-4 py-3">{column.label}</th>)}<th className="px-4 py-3 text-right">Action</th></tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/80">
              {visibleRows.map((row) => (
                <tr key={row.id} className="transition-colors hover:bg-zinc-800/30">
                  {config.columns.map((column) => <td key={column.key} className={`max-w-64 px-4 py-3.5 ${column.key === "name" || column.key === "title" ? "font-medium text-zinc-200" : "text-zinc-400"}`}>
                    {column.key === "status" ? <StatusBadge status={row[column.key].toLowerCase() as Parameters<typeof StatusBadge>[0]["status"]} /> : <span className="block truncate" title={row[column.key]}>{row[column.key]}</span>}
                  </td>)}
                  <td className="px-4 py-3.5 text-right">
                    {config.title === "Hotels" ? (
                      <button onClick={() => openDetails(row)} className="text-xs font-medium text-zinc-300 hover:text-white">View Details</button>
                    ) : (
                      <details className="relative inline-block text-left">
                        <summary aria-label={`Actions for ${row.name ?? row.title}`} className="flex h-8 w-8 cursor-pointer list-none items-center justify-center rounded-md text-zinc-500 hover:bg-zinc-800 hover:text-zinc-200 [&::-webkit-details-marker]:hidden">
                          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="5" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="19" cy="12" r="1.6"/></svg>
                        </summary>
                        <div className="absolute right-0 z-10 mt-1 w-36 rounded-lg border border-zinc-700 bg-zinc-900 p-1 shadow-xl">
                          <button onClick={() => openDetails(row)} className="block w-full rounded px-2.5 py-2 text-left text-xs text-zinc-300 hover:bg-zinc-800">View details</button>
                          <button onClick={() => openEdit(row)} className="block w-full rounded px-2.5 py-2 text-left text-xs text-zinc-300 hover:bg-zinc-800">Edit</button>
                          {config.title === "Schedules" && <button onClick={() => toggleSchedule(row)} className="block w-full rounded px-2.5 py-2 text-left text-xs text-zinc-300 hover:bg-zinc-800">{row.status === "Active" ? "Pause" : "Resume"}</button>}
                        </div>
                      </details>
                    )}
                  </td>
                </tr>
              ))}
              {visibleRows.length === 0 && <tr><td colSpan={config.columns.length + 1} className="px-4 py-12 text-center"><p className="text-sm font-medium text-zinc-300">No results found</p><p className="mt-1 text-xs text-zinc-500">Try another search or adjust your filters.</p></td></tr>}
            </tbody>
          </table>
        </div>
      </section>

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" onMouseDown={(event) => { if (event.target === event.currentTarget) setModal(null); }}>
          <section role="dialog" aria-modal="true" aria-labelledby="workspace-modal-title" className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl border border-zinc-700 bg-zinc-900 shadow-2xl">
            <div className="flex items-start justify-between border-b border-zinc-800 px-5 py-4">
              <div>
                <h2 id="workspace-modal-title" className="text-base font-semibold">{modal === "details" ? "Details" : modal === "edit" ? `Edit ${config.title === "Publishing" ? "Post" : config.title === "Schedules" ? "Schedule" : "Job"}` : config.actionLabel}</h2>
                <p className="mt-1 text-xs text-zinc-500">{modal === "details" ? "Review the saved information." : "Enter the details below. Changes are stored locally for this session."}</p>
              </div>
              <button onClick={() => setModal(null)} aria-label="Close dialog" className="rounded-md p-1 text-zinc-500 hover:bg-zinc-800 hover:text-zinc-200"><svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="m6 6 12 12M18 6 6 18" strokeWidth="1.7" strokeLinecap="round"/></svg></button>
            </div>
            {modal === "details" && selected ? (
              <dl className="grid gap-4 p-5 sm:grid-cols-2">
                {config.columns.map((column) => <div key={column.key}><dt className="text-xs text-zinc-500">{column.label}</dt><dd className="mt-1 text-sm text-zinc-200">{selected[column.key]}</dd></div>)}
                {selected.description && <div className="sm:col-span-2"><dt className="text-xs text-zinc-500">Description</dt><dd className="mt-1 text-sm text-zinc-300">{selected.description}</dd></div>}
              </dl>
            ) : (
              <form onSubmit={submitForm} className="space-y-4 p-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  {config.fields.map((field) => <label key={field.key} className={`block space-y-1.5 ${field.type === "textarea" ? "sm:col-span-2" : ""}`}>
                    <span className="text-xs font-medium text-zinc-300">{field.label}</span>
                    {field.type === "textarea" ? <textarea required={field.required} value={values[field.key] ?? ""} onChange={(event) => setValues((current) => ({ ...current, [field.key]: event.target.value }))} placeholder={field.placeholder} rows={3} className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-200 outline-none placeholder:text-zinc-600 focus:border-zinc-500" /> : field.type === "select" ? <select required={field.required} value={values[field.key] ?? ""} onChange={(event) => setValues((current) => ({ ...current, [field.key]: event.target.value }))} className="h-9 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 text-sm text-zinc-200 outline-none focus:border-zinc-500"><option value="" disabled>Select {field.label.toLowerCase()}</option>{field.options?.map((option) => <option key={option} value={option}>{option}</option>)}</select> : <input required={field.required} type={field.type ?? "text"} min={field.type === "number" ? "0" : undefined} step={field.type === "number" ? "0.1" : undefined} value={values[field.key] ?? ""} onChange={(event) => setValues((current) => ({ ...current, [field.key]: event.target.value }))} placeholder={field.placeholder} className="h-9 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 text-sm text-zinc-200 outline-none placeholder:text-zinc-600 focus:border-zinc-500" />}
                  </label>)}
                </div>
                <div className="flex justify-end gap-2 border-t border-zinc-800 pt-4">
                  <button type="button" onClick={() => setModal(null)} className="h-9 rounded-lg border border-zinc-700 px-3.5 text-sm font-medium text-zinc-300 hover:bg-zinc-800">Cancel</button>
                  <button type="submit" className="h-9 rounded-lg bg-zinc-100 px-3.5 text-sm font-medium text-zinc-900 hover:bg-white">{modal === "edit" ? "Save Changes" : config.title === "Scraping" ? "Create Scraping" : config.title === "Publishing" ? "Save Post" : config.title === "Schedules" ? "Create Schedule" : "Start Scrape"}</button>
                </div>
              </form>
            )}
          </section>
        </div>
      )}
    </div>
  );
}
