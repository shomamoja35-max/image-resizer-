import Link from "next/link";
import { notFound } from "next/navigation";

import { isLocale, locales } from "@/lib/i18n/config";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const isRTL = locale === "ar";

  return (
    <div dir={isRTL ? "rtl" : "ltr"} lang={locale} className="min-h-screen">
      <header className="border-b border-slate-200 bg-white">
        <div className="container-shell flex h-16 items-center justify-between">
          <Link href={`/${locale}`} className="text-xl font-semibold">
            Converterio
          </Link>
          <nav className="flex items-center gap-4 text-sm">
            <Link href={`/${locale}/image-converter`}>Tools</Link>
            <Link href={`/${locale}/blog`}>Blog</Link>
          </nav>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
