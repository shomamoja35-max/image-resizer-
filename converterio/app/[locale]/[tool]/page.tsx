import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookOpen, Info, Sparkles } from "lucide-react";

import { ConverterWorkbench } from "@/components/converter-workbench";
import { ToolPageFaq } from "@/components/tool-page-faq";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/lib/i18n/config";
import { allowedToolsSet } from "@/lib/tools/allowed-tools";
import { getToolPageSections } from "@/lib/tools/tool-page-sections";

const TRUST_STRIP = [
  "JPG · PNG · WebP · AVIF",
  "Runs in your browser",
  "No signup",
  "Batch & ZIP",
  "Quality & metadata control",
] as const;

function humanizeTool(tool: string) {
  return tool.split("-").join(" ").replace(/\b\w/g, (m) => m.toUpperCase());
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; tool: string }>;
}): Promise<Metadata> {
  const { locale, tool } = await params;
  if (!allowedToolsSet.has(tool)) return {};

  const humanTitle = humanizeTool(tool);
  const title = `${humanTitle} Online Free`;
  const description = `Use Converterio to ${humanTitle.toLowerCase()} in seconds. No signup, batch support, and secure image processing.`;
  const canonical = `https://converterio.app/${locale}/${tool}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "Converterio",
      locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function ToolPage({
  params,
}: {
  params: Promise<{ locale: Locale; tool: string }>;
}) {
  const { locale, tool } = await params;
  if (!allowedToolsSet.has(tool)) notFound();

  const dict = await getDictionary(locale);
  const title = humanizeTool(tool);
  const sections = getToolPageSections(title);
  const faqItems = [
    {
      q: `How do I use the ${title} tool?`,
      a: `Upload one or multiple images, choose width, height, quality, and format, then run convert to download the result or a ZIP for batches.`,
    },
    {
      q: "Is Converterio free to use?",
      a: "Yes. Resize, compress, and convert images without signup or a paywall for typical use.",
    },
    {
      q: "Are my uploaded files stored on your servers?",
      a: "Files are processed to generate your download and are not kept as a personal library. Use the tool knowing the flow is built for ephemeral handling.",
    },
    {
      q: `Which formats work with ${title}?`,
      a: "You can bring JPG, PNG, WebP, and other raster sources depending on the browser. Export JPEG, PNG, WebP, or AVIF from the converter panel.",
    },
    {
      q: "Can I resize or convert several images at once?",
      a: "Yes. Add multiple files and retrieve a ZIP when you process a batch in one session.",
    },
    {
      q: "Does Converterio add a watermark?",
      a: "No. Downloads are your processed images without a Converterio watermark.",
    },
  ] as const;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `${title} with Converterio`,
    step: sections.steps.map((s) => ({
      "@type": "HowToStep",
      name: s.title,
      text: s.body,
    })),
  };
  const internalLinks = [
    "image-resizer",
    "image-compressor",
    "image-converter",
    "png-to-jpg",
    "webp-to-jpg",
  ].filter((item) => item !== tool);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      <div className="tool-page-master">
        {/* Hero + tool + trust strip */}
        <section className="tool-page-section-rule">
          <div className="tool-page-shell py-28">
            <p className="text-center text-[11px] font-bold uppercase tracking-[0.35em] text-[#d4a373]">Hero section</p>
            <h1 className="mt-5 text-center text-3xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl lg:text-6xl">
              {title}
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-center text-lg leading-relaxed text-slate-600 dark:text-slate-300 md:text-xl">
              {dict.heroSubtitle}
            </p>

            <div
              id="tool"
              className="tool-page-panel tool-page-panel-blur mt-14 scroll-mt-28 p-5 sm:p-8 md:p-10"
            >
              <ConverterWorkbench
                title={`${title} — ${dict.brand}`}
                subtitle={dict.heroSubtitle}
                convertLabel={dict.convertButton}
                defaultFormat={tool.includes("png") ? "png" : "jpeg"}
                constrainWidth={false}
              />
            </div>

            <div className="mt-12 flex flex-wrap justify-center gap-2.5 md:gap-3">
              {TRUST_STRIP.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-slate-200/90 bg-white/70 px-4 py-2 text-xs font-medium text-slate-600 shadow-sm backdrop-blur-sm dark:border-slate-700/90 dark:bg-slate-950/45 dark:text-slate-300 dark:shadow-none"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* 40-word extract */}
        <section className="tool-page-section-rule py-20 md:py-24">
          <div className="tool-page-shell">
            <div className="tool-page-panel tool-page-panel-blur p-1 sm:p-1">
              <div className="flex flex-col gap-4 rounded-[1.35rem] border border-green-200 bg-green-50 p-6 text-green-800 dark:border-green-800 dark:bg-green-950/20 dark:text-green-300 md:flex-row md:items-start md:gap-8 md:p-8">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-green-200/80 bg-white/90 dark:border-green-800 dark:bg-green-950/40">
                  <Info className="h-6 w-6 text-green-700 dark:text-green-400" aria-hidden />
                </span>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-[#d4a373]">{sections.extract.label}</p>
                  <h2 className="mt-3 text-xl font-bold text-green-950 dark:text-white md:text-2xl">{sections.extract.heading}</h2>
                  <p className="mt-3 leading-relaxed text-green-800 dark:text-green-300">{sections.extract.body}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How-to */}
        <section className="tool-page-section-rule py-20 md:py-28">
          <div className="tool-page-shell">
            <p className="text-center text-[11px] font-bold uppercase tracking-[0.35em] text-[#d4a373]">How it works</p>
            <h2 className="mt-5 text-center text-3xl font-bold tracking-tight text-slate-900 dark:text-white md:text-4xl lg:text-5xl">
              How to {title.toLowerCase()}
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-center text-slate-600 dark:text-slate-300">
              Follow the flow below—large step numbers keep orientation while icons highlight each phase.
            </p>

            <div className="mt-16 grid items-start gap-14 lg:grid-cols-2 lg:gap-20">
              <div className="space-y-12">
                {sections.steps.map((step) => (
                  <div key={step.step} className="relative pl-2 md:pl-4">
                    <span
                      aria-hidden
                      className="pointer-events-none absolute -left-1 top-[-0.25rem] select-none text-7xl font-bold tabular-nums leading-none text-slate-100 dark:text-slate-800/55 md:-left-2 md:top-0 md:text-8xl"
                    >
                      {step.step}
                    </span>
                    <div className="relative z-10 flex gap-5 pt-2 md:pt-4">
                      <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-slate-200/90 bg-white/90 shadow-sm backdrop-blur-sm dark:border-slate-800 dark:bg-slate-950/60">
                        <step.Icon className="h-7 w-7 text-[#d4a373]" aria-hidden />
                      </span>
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white md:text-xl">{step.title}</h3>
                        <p className="mt-2 leading-relaxed text-slate-600 dark:text-slate-300">{step.body}</p>
                      </div>
                    </div>
                  </div>
                ))}
                <Link
                  href="#tool"
                  className="relative z-10 inline-flex items-center justify-center rounded-xl border-2 border-[#d4a373] bg-gradient-to-b from-[#d4a373]/10 to-transparent px-10 py-4 text-base font-semibold text-[#b8895a] shadow-sm transition hover:border-[#c4956a] hover:from-[#d4a373]/15 dark:text-[#d4a373] dark:from-[#d4a373]/15 dark:to-transparent dark:hover:from-[#d4a373]/25"
                >
                  Start with the tool
                </Link>
              </div>

              <div className="tool-page-panel tool-page-panel-blur relative flex min-h-[320px] items-center justify-center p-10 md:min-h-[380px] md:p-12">
                <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-slate-100/50 via-transparent to-transparent dark:from-slate-800/30 dark:via-transparent" />
                <div className="relative text-center">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl border border-slate-200/80 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-900/90">
                    <Sparkles className="h-9 w-9 text-[#d4a373]" aria-hidden />
                  </div>
                  <p className="mt-6 text-base font-semibold text-slate-900 dark:text-white">Layered, theme-aware UI</p>
                  <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    Light mode uses airy cream-to-white depth; dark mode stacks charcoal planes with bronze accents—toggle anytime.
                  </p>
                  <div className="mt-8 flex items-center justify-center gap-2 text-slate-500 dark:text-slate-500">
                    <BookOpen className="h-5 w-5 text-[#d4a373]" aria-hidden />
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d4a373]">Converterio</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="tool-page-section-rule py-20 md:py-28">
          <div className="tool-page-shell">
            <p className="text-center text-[11px] font-bold uppercase tracking-[0.35em] text-[#d4a373]">Features</p>
            <h2 className="mt-5 text-center text-3xl font-bold tracking-tight text-slate-900 dark:text-white md:text-4xl lg:text-5xl">
              Built for real projects
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-center text-slate-600 dark:text-slate-300">
              Deep cards with subtle lift in light mode and frosted panels in dark mode—same content, two premium finishes.
            </p>
            <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {sections.features.map((f) => (
                <div
                  key={f.title}
                  className="tool-page-panel tool-page-panel-blur border-slate-100 p-7 shadow-md dark:border-slate-800 dark:shadow-none md:p-8"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-slate-200/80 bg-slate-50/90 dark:border-slate-800 dark:bg-slate-900/80">
                    <f.Icon className="h-6 w-6 text-[#d4a373]" aria-hidden />
                  </span>
                  <h3 className="mt-6 text-lg font-semibold text-slate-900 dark:text-white">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{f.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ — gradient resolves toward slate-50 / black here */}
        <section className="border-b border-slate-100 bg-gradient-to-b from-transparent to-slate-50 py-20 dark:border-slate-800/80 dark:from-transparent dark:to-black md:py-28">
          <ToolPageFaq label="FAQ section" heading="Frequently asked questions" items={faqItems} />
        </section>

        {/* Related */}
        <section className="py-20 md:py-24">
          <div className="tool-page-shell">
            <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-[#d4a373]">More tools</p>
            <h2 className="mt-4 text-2xl font-bold text-slate-900 dark:text-white md:text-3xl">Related tools</h2>
            <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-300">
              Jump between complementary utilities without losing context.
            </p>
            <div className="mt-10 flex flex-wrap gap-2.5">
              {internalLinks.map((slug) => (
                <Link
                  key={slug}
                  href={`/${locale}/${slug}`}
                  className="rounded-full border border-slate-200/90 bg-white/80 px-5 py-2.5 text-sm font-medium text-slate-800 shadow-sm backdrop-blur-sm transition hover:border-[#d4a373]/40 hover:text-[#b8895a] dark:border-slate-800 dark:bg-[#0a0a0a]/80 dark:text-slate-200 dark:hover:border-[#d4a373]/50 dark:hover:text-[#d4a373]"
                >
                  {humanizeTool(slug)}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
