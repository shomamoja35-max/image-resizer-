"use client";

import { useState } from "react";

type Item = { q: string; a: string };

type Props = {
  items: readonly Item[];
  label: string;
  heading: string;
};

export function ToolPageFaq({ items, label, heading }: Props) {
  const mid = Math.ceil(items.length / 2);
  const left = items.slice(0, mid);
  const right = items.slice(mid);
  const [openKey, setOpenKey] = useState<string | null>("0-left");

  function toggle(key: string) {
    setOpenKey((prev) => (prev === key ? null : key));
  }

  function column(col: readonly Item[], side: "left" | "right") {
    return (
      <div className="flex flex-col gap-3">
        {col.map((item, i) => {
          const key = `${i}-${side}`;
          const expanded = openKey === key;
          return (
            <div
              key={item.q}
              className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white/90 shadow-sm backdrop-blur-sm dark:border-slate-800 dark:bg-[#0a0a0a]/95 dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.03)]"
            >
              <button
                type="button"
                className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-50/90 dark:text-slate-100 dark:hover:bg-slate-900/60 sm:px-5 sm:text-base"
                onClick={() => toggle(key)}
                aria-expanded={expanded}
              >
                <span>{item.q}</span>
                <svg
                  className={`h-5 w-5 shrink-0 text-[#d4a373] transition-transform duration-300 ease-out ${expanded ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {expanded ? (
                <div className="border-t border-slate-100 px-4 py-4 text-sm leading-relaxed text-slate-600 dark:border-slate-800 dark:text-slate-300 sm:px-5">
                  {item.a}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="tool-page-shell">
      <p className="text-center text-[11px] font-bold uppercase tracking-[0.35em] text-[#d4a373]">{label}</p>
      <h2 className="mt-4 text-center text-3xl font-bold tracking-tight text-slate-900 dark:text-white md:text-4xl">
        {heading}
      </h2>
      <div className="mt-14 grid gap-8 lg:grid-cols-2 lg:gap-12">
        {column(left, "left")}
        {column(right, "right")}
      </div>
    </div>
  );
}
