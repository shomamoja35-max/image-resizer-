"use client";

import { useTheme } from "next-themes";
import { startTransition, useEffect, useRef, useState } from "react";

type ThemeValue = "light" | "dark" | "system";

const options: { value: ThemeValue; label: string }[] = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "system", label: "System" },
];

function SunIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>
  );
}

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
      />
    </svg>
  );
}

function MonitorIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  );
}

function OptionIcon({
  value,
  active,
  footerTone,
}: {
  value: ThemeValue;
  active: boolean;
  footerTone?: boolean;
}) {
  const cls = `h-4 w-4 shrink-0 ${
    active
      ? footerTone
        ? "text-blue-400"
        : "text-blue-600 dark:text-blue-400"
      : footerTone
        ? "text-slate-300"
        : "text-gray-700 dark:text-gray-200"
  }`;
  if (value === "light") return <SunIcon className={cls} />;
  if (value === "dark") return <MoonIcon className={cls} />;
  return <MonitorIcon className={cls} />;
}

type ThemeSwitcherProps = {
  /** Dark slate styling for use inside the site footer */
  tone?: "default" | "footer";
};

export function ThemeSwitcher({ tone = "default" }: ThemeSwitcherProps) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    startTransition(() => setMounted(true));
  }, []);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  const current = (theme === "light" || theme === "dark" || theme === "system" ? theme : "system") as ThemeValue;
  const triggerLabel = options.find((o) => o.value === current)?.label ?? "System";

  const iconMuted = tone === "footer" ? "text-slate-200" : "text-gray-800 dark:text-gray-200";

  function triggerIcon() {
    if (current === "system") return <MonitorIcon className={`h-4 w-4 ${iconMuted}`} />;
    if (current === "dark" || resolvedTheme === "dark") return <MoonIcon className={`h-4 w-4 ${iconMuted}`} />;
    return <SunIcon className={`h-4 w-4 ${iconMuted}`} />;
  }

  const footerTone = tone === "footer";

  if (!mounted) {
    return (
      <div
        className={
          footerTone
            ? "h-9 w-[110px] rounded-lg border border-slate-600 bg-slate-800/80"
            : "h-9 w-[110px] rounded-lg border border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-900"
        }
      />
    );
  }

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
            ? "inline-flex items-center gap-2 rounded-lg border border-slate-600 bg-slate-800/90 px-3 py-2 text-sm font-medium text-slate-200 shadow-sm"
            : "inline-flex items-center gap-2 rounded-lg border border-gray-900 bg-white px-3 py-2 text-sm font-medium text-gray-900 shadow-sm dark:border-gray-500 dark:bg-gray-900 dark:text-gray-100"
        }
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        {triggerIcon()}
        <span className="min-w-[3.5rem] text-left">{triggerLabel}</span>
        <svg
          className={`h-3.5 w-3.5 transition ${open ? "rotate-180" : ""} ${footerTone ? "text-slate-400" : "text-gray-600 dark:text-gray-400"}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      </button>

      {open ? (
        <div
          role="listbox"
          className={
            footerTone
              ? "absolute bottom-full left-0 z-[60] mb-1 min-w-[11rem] rounded-xl border border-slate-600 bg-slate-800 py-1 shadow-lg"
              : "absolute bottom-full left-0 z-[60] mb-1 min-w-[11rem] rounded-xl border border-gray-200 bg-white py-1 shadow-lg dark:border-gray-700 dark:bg-gray-900"
          }
        >
          {options.map((opt) => {
            const active = current === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                role="option"
                aria-selected={active}
                className={`flex w-full items-center gap-2 px-3 py-2.5 text-left text-sm ${
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
                  setTheme(opt.value);
                  setOpen(false);
                }}
              >
                <OptionIcon value={opt.value} active={active} footerTone={footerTone} />
                {opt.label}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
