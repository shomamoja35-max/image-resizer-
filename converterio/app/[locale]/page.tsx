import Link from "next/link";

import { ConverterWorkbench } from "@/components/converter-workbench";
import { HomeFaqAccordion } from "@/components/home-faq-accordion";
import { HomeFeatureIcon } from "@/components/home-feature-icon";
import { homeContent } from "@/config/home-content";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/lib/i18n/config";

export default async function LocaleHome({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const p = `/${locale}`;

  return (
    <>
      {/* Hero */}
      <section className="bg-white pt-12 pb-10 dark:bg-gray-950 md:pt-20 md:pb-14">
        <div className="container-shell text-center">
          <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
            {homeContent.hero.title}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-600 dark:text-gray-400 md:text-xl">
            {homeContent.hero.subtitle}
          </p>
          <div className="mt-8 flex flex-col items-center gap-4">
            <Link
              href={`${p}/image-resizer`}
              className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-8 py-3.5 text-base font-semibold text-white shadow-md transition hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              {homeContent.hero.primaryCta}
            </Link>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{homeContent.hero.trustBadge}</p>
          </div>
        </div>
      </section>

      {/* Tool / workbench */}
      <section id="tool" className="scroll-mt-20">
        <ConverterWorkbench
          variant="landing"
          hideTitle
          title={dict.heroTitle}
          subtitle={dict.heroSubtitle}
          convertLabel={dict.convertButton}
          defaultFormat="jpeg"
        />
      </section>

      {/* How it works */}
      <section className="bg-white py-16 dark:bg-gray-950 md:py-20">
        <div className="container-shell">
          <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl">
            How it works
          </h2>
          <div className="mt-12 grid gap-12 md:grid-cols-3 md:gap-8 lg:mt-16 lg:gap-12">
            {homeContent.howItWorks.map((item) => (
              <div key={item.step} className="relative pt-4 text-center md:text-left">
                <span
                  className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 select-none text-7xl font-bold leading-none text-slate-100 dark:text-slate-800/80 md:left-0 md:translate-x-0 md:text-8xl"
                  aria-hidden
                >
                  {item.step}
                </span>
                <div className="relative z-10">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features (3 icons) */}
      <section className="border-y border-slate-100 bg-slate-50/50 py-16 dark:border-slate-800 dark:bg-slate-900/20 md:py-20">
        <div className="container-shell">
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-16">
            {homeContent.features.map((f) => (
              <div key={f.title} className="flex flex-col items-center text-center sm:items-start sm:text-left">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
                  <HomeFeatureIcon name={f.icon} className="h-6 w-6" />
                </span>
                <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services / tool grid */}
      <section className="bg-white py-16 dark:bg-gray-950 md:py-20">
        <div className="container-shell">
          <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl">
            Our tools
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-gray-600 dark:text-gray-400">
            Everything you need to prepare images for the web or social media.
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-8">
            {homeContent.services.map((s) => (
              <div
                key={s.slug}
                className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-blue-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/40 dark:hover:border-blue-900"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{s.name}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600 dark:text-gray-400">{s.desc}</p>
                <Link
                  href={`${p}/${s.slug}`}
                  className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-blue-600 transition group-hover:gap-2 dark:text-blue-400"
                >
                  Learn more
                  <span aria-hidden>→</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About & stats */}
      <section className="bg-white py-16 dark:bg-gray-950 md:py-20">
        <div className="container-shell">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl">
                {homeContent.about.heading}
              </h2>
              <p className="mt-4 leading-relaxed text-gray-600 dark:text-gray-400">{homeContent.about.content}</p>
            </div>
            <div className="grid grid-cols-2 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
              {homeContent.stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className={[
                    "flex flex-col items-center justify-center px-4 py-8 text-center sm:px-6 sm:py-10",
                    i === 0 ? "border-b border-r border-slate-200 dark:border-slate-800" : "",
                    i === 1 ? "border-b border-slate-200 dark:border-slate-800" : "",
                    i === 2 ? "border-r border-slate-200 dark:border-slate-800" : "",
                    i === 3 ? "" : "",
                  ].join(" ")}
                >
                  <p className="text-2xl font-bold tabular-nums text-gray-900 dark:text-white sm:text-3xl">{stat.value}</p>
                  <p className="mt-1 text-xs font-medium text-gray-600 dark:text-gray-400 sm:text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-slate-50 py-16 dark:bg-slate-900/30 md:py-20">
        <div className="container-shell">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl">
              Frequently asked questions
            </h2>
            <div className="mt-12 lg:mt-16">
              <HomeFaqAccordion items={homeContent.faqs} />
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-blue-600 py-14 dark:bg-blue-700 md:py-16">
        <div className="container-shell text-center">
          <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl lg:text-4xl">{homeContent.cta.title}</h2>
          <Link
            href={`${p}/image-resizer`}
            className="mt-8 inline-flex items-center justify-center rounded-lg bg-white px-8 py-3.5 text-base font-semibold text-blue-600 shadow-md transition hover:bg-slate-50"
          >
            {homeContent.cta.buttonText}
          </Link>
        </div>
      </section>
    </>
  );
}
