import Link from "next/link";

import { HeaderNavDropdowns } from "@/components/header-nav-dropdowns";

type Props = {
  locale: string;
};

export function SiteHeader({ locale }: Props) {
  const p = `/${locale}`;

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/90 dark:border-gray-800 dark:bg-gray-950/95">
      <div className="container-shell flex h-16 items-center justify-between gap-3 md:gap-6">
        <Link href={p} className="flex shrink-0 items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-blue-600 text-white shadow-sm">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </span>
          <span className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">Converterio</span>
        </Link>

        <HeaderNavDropdowns locale={locale} />

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <Link
            href="#"
            className="hidden text-sm font-medium text-gray-700 transition hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 sm:inline"
          >
            Login
          </Link>
          <Link
            href="#"
            className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 sm:px-4"
          >
            Signup
          </Link>
        </div>
      </div>
      <div className="border-t border-gray-100 bg-gray-50/90 dark:border-gray-800 dark:bg-gray-900/90 xl:hidden">
        <div className="container-shell flex gap-1 overflow-x-auto py-2 text-sm font-medium text-gray-700 [-ms-overflow-style:none] [scrollbar-width:none] dark:text-gray-300 [&::-webkit-scrollbar]:hidden">
          <Link href={`${p}/image-resizer`} className="shrink-0 rounded-md px-2 py-1.5 hover:bg-white hover:text-blue-600 dark:hover:bg-gray-950 dark:hover:text-blue-400">
            Resize
          </Link>
          <Link href={`${p}/crop-image`} className="shrink-0 rounded-md px-2 py-1.5 hover:bg-white hover:text-blue-600 dark:hover:bg-gray-950 dark:hover:text-blue-400">
            Crop
          </Link>
          <Link href={`${p}/image-compressor`} className="shrink-0 rounded-md px-2 py-1.5 hover:bg-white hover:text-blue-600 dark:hover:bg-gray-950 dark:hover:text-blue-400">
            Compress
          </Link>
          <Link href={`${p}/image-converter`} className="shrink-0 rounded-md px-2 py-1.5 hover:bg-white hover:text-blue-600 dark:hover:bg-gray-950 dark:hover:text-blue-400">
            Convert
          </Link>
          <Link href={`${p}/bulk-image-converter`} className="shrink-0 rounded-md px-2 py-1.5 hover:bg-white hover:text-blue-600 dark:hover:bg-gray-950 dark:hover:text-blue-400">
            Bulk
          </Link>
        </div>
      </div>
    </header>
  );
}
