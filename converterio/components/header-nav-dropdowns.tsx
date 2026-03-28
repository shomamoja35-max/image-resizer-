"use client";

import Link from "next/link";
import { useState } from "react";

import { compressMenu, convertMenu, cropMenu, resizeMenu } from "@/lib/nav/header-menus";

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
}

function Dropdown({
  label,
  items,
  locale,
  twoColumn,
}: {
  label: string;
  items: { slug: string; label: string }[];
  locale: string;
  twoColumn?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const prefix = `/${locale}`;

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className="flex items-center gap-1 rounded-md px-2.5 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 hover:text-blue-600 dark:text-gray-300 dark:hover:bg-gray-900 dark:hover:text-blue-400"
        aria-expanded={open}
        aria-haspopup="menu"
      >
        {label}
        <ChevronDown className="h-3 w-3 shrink-0 opacity-70" />
      </button>
      {open ? (
        <div className="absolute left-0 top-full z-[100] flex min-w-max flex-col" role="presentation">
          <div className="h-2 w-full shrink-0" aria-hidden />
          <div
            className={`rounded-lg border border-gray-200 bg-white py-2 shadow-lg ring-1 ring-black/5 dark:border-gray-700 dark:bg-gray-900 dark:ring-white/10 ${
              twoColumn ? "min-w-[min(100vw-2rem,28rem)] px-2 sm:min-w-[28rem]" : "min-w-[14rem]"
            }`}
            role="menu"
          >
            <div className={twoColumn ? "grid grid-cols-1 gap-0.5 sm:grid-cols-2 sm:gap-x-1" : "flex flex-col"}>
              {items.map((item) => (
                <Link
                  key={item.slug}
                  href={`${prefix}/${item.slug}`}
                  role="menuitem"
                  className="block rounded-md px-3 py-2 text-sm text-gray-800 transition hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-800"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export function HeaderNavDropdowns({ locale }: { locale: string }) {
  return (
    <div className="hidden flex-1 items-center justify-center gap-0.5 lg:gap-1 xl:flex">
      <Dropdown label="Resize" items={resizeMenu} locale={locale} />
      <Dropdown label="Crop" items={cropMenu} locale={locale} />
      <Dropdown label="Compress" items={compressMenu} locale={locale} />
      <Dropdown label="Convert" items={convertMenu} locale={locale} twoColumn />
    </div>
  );
}
