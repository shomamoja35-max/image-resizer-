"use client";

import { useState } from "react";

type Item = { q: string; a: string };

type Props = {
  items: readonly Item[];
};

export function HomeFaqAccordion({ items }: Props) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="space-y-2">
      {items.map((item, i) => {
        const expanded = open === i;
        return (
          <div key={i} className="overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900/50">
            <button
              type="button"
              className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left text-sm font-semibold text-slate-900 transition hover:bg-slate-50 dark:text-white dark:hover:bg-slate-800 sm:px-5 sm:text-base"
              onClick={() => setOpen(expanded ? null : i)}
              aria-expanded={expanded}
            >
              {item.q}
              <svg
                className={`h-5 w-5 shrink-0 text-slate-500 transition dark:text-slate-400 ${expanded ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {expanded ? (
              <div className="border-t border-slate-100 px-4 py-4 text-sm leading-relaxed text-slate-600 dark:border-slate-700 dark:text-slate-400 sm:px-5">
                {item.a}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
