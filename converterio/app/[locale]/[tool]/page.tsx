import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ConverterWorkbench } from "@/components/converter-workbench";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/lib/i18n/config";
import { allowedToolsSet } from "@/lib/tools/allowed-tools";

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
  const faqItems = [
    {
      q: `How do I use the ${title} tool?`,
      a: `Upload one or multiple images, choose your settings, then click convert to download the optimized output instantly.`,
    },
    {
      q: "Is Converterio free to use?",
      a: "Yes. You can resize, compress and convert images online without signup.",
    },
    {
      q: "Are my uploaded files stored?",
      a: "No permanent storage is used. Files are processed and removed automatically.",
    },
  ];
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
    step: [
      { "@type": "HowToStep", text: "Upload your image files." },
      { "@type": "HowToStep", text: "Choose output format and quality settings." },
      { "@type": "HowToStep", text: "Click convert and download your optimized file." },
    ],
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

      <ConverterWorkbench
        title={`${title} - ${dict.brand}`}
        subtitle={dict.heroSubtitle}
        convertLabel={dict.convertButton}
        defaultFormat={tool.includes("png") ? "png" : "jpeg"}
      />

      <section className="border-t border-gray-100 bg-slate-50 py-12 dark:border-gray-800 dark:bg-gray-900/40">
        <div className="container-shell">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900 md:p-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">How to {title.toLowerCase()}</h2>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-gray-700 dark:text-gray-300">
            <li>Upload your image files by drag-drop, file picker, paste or URL.</li>
            <li>Set width, height, quality and output format based on your target use.</li>
            <li>Click convert and download the result as a file or ZIP batch.</li>
          </ol>

          <h3 className="mt-8 text-xl font-bold text-gray-900 dark:text-white">FAQ</h3>
          <div className="mt-3 space-y-3">
            {faqItems.map((item) => (
              <details key={item.q} className="rounded-lg border border-gray-200 bg-gray-50/50 p-3 dark:border-gray-700 dark:bg-gray-950/50">
                <summary className="cursor-pointer font-medium text-gray-900 dark:text-white">{item.q}</summary>
                <p className="mt-2 text-gray-700 dark:text-gray-300">{item.a}</p>
              </details>
            ))}
          </div>

          <h3 className="mt-8 text-xl font-bold text-gray-900 dark:text-white">Related tools</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {internalLinks.map((slug) => (
              <a
                key={slug}
                href={`/${locale}/${slug}`}
                className="rounded-full border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-800 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 dark:border-gray-600 dark:bg-gray-950 dark:text-gray-200 dark:hover:border-blue-600 dark:hover:bg-blue-950/40 dark:hover:text-blue-400"
              >
                {humanizeTool(slug)}
              </a>
            ))}
          </div>
        </div>
        </div>
      </section>
    </>
  );
}
