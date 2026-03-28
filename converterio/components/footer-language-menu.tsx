"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { isLocale, locales, type Locale } from "@/lib/i18n/config";

const labels: Record<Locale, string> = {
  en: "English",
  es: "Español",
  fr: "Français",
  pt: "Português",
  ar: "العربية",
};

type Props = {
  currentLocale: Locale;
  /** Slate styling for the dark site footer */
  tone?: "default" | "footer";
};

export function FooterLanguageMenu({ currentLocale, tone = "default" }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  function switchLocale(next: Locale) {
    if (!pathname) return;
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length && isLocale(segments[0])) {
      segments[0] = next;
    } else {
      segments.unshift(next);
    }
    router.push(`/${segments.join("/")}`);
    setOpen(false);
  }

  const footerTone = tone === "footer";

  return (
    <div className="relative" ref={rootRef}>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setOpen((v) => !v);
        }}
        className={
          footerTone
            ? "inline-flex items-center gap-1.5 text-slate-300 transition hover:text-white"
            : "inline-flex items-center gap-1.5 text-gray-600 transition hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
        }
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>{labels[currentLocale]}</span>
      </button>

      {open ? (
        <div
          role="listbox"
          className={
            footerTone
              ? "absolute bottom-full right-0 z-[60] mb-1 min-w-[10rem] rounded-xl border border-slate-600 bg-slate-800 py-1 shadow-lg"
              : "absolute bottom-full right-0 z-[60] mb-1 min-w-[10rem] rounded-xl border border-gray-200 bg-white py-1 shadow-lg dark:border-gray-700 dark:bg-gray-900"
          }
        >
          {locales.map((loc) => {
            const active = loc === currentLocale;
            return (
              <button
                key={loc}
                type="button"
                role="option"
                aria-selected={active}
                className={`block w-full px-3 py-2 text-left text-sm ${
                  footerTone
                    ? active
                      ? "font-medium text-blue-400"
                      : "text-slate-200 hover:bg-slate-700/80"
                    : active
                      ? "font-medium text-blue-600 dark:text-blue-400"
                      : "text-gray-900 hover:bg-gray-50 dark:text-gray-100 dark:hover:bg-gray-800"
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  switchLocale(loc);
                }}
              >
                {labels[loc]}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
