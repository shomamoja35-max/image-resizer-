import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ConverterWorkbench } from "@/components/converter-workbench";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/lib/i18n/config";

const allowedTools = new Set([
  "image-resizer",
  "image-compressor",
  "image-converter",
  "crop-image",
  "rotate-image",
  "flip-image",
  "bulk-image-converter",
  "png-to-jpg",
  "jpg-to-png",
  "png-to-webp",
  "webp-to-jpg",
  "webp-to-png",
  "avif-to-jpg",
]);

function humanizeTool(tool: string) {
  return tool.split("-").join(" ").replace(/\b\w/g, (m) => m.toUpperCase());
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; tool: string }>;
}): Promise<Metadata> {
  const { locale, tool } = await params;
  if (!allowedTools.has(tool)) return {};

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
  if (!allowedTools.has(tool)) notFound();

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

      <section className="container-shell pb-12">
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-2xl font-semibold">How to {title.toLowerCase()}</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-slate-700">
            <li>Upload your image files by drag-drop, file picker, paste or URL.</li>
            <li>Set width, height, quality and output format based on your target use.</li>
            <li>Click convert and download the result as a file or ZIP batch.</li>
          </ol>

          <h3 className="mt-8 text-xl font-semibold">FAQ</h3>
          <div className="mt-3 space-y-3">
            {faqItems.map((item) => (
              <details key={item.q} className="rounded-lg border border-slate-200 p-3">
                <summary className="cursor-pointer font-medium">{item.q}</summary>
                <p className="mt-2 text-slate-700">{item.a}</p>
              </details>
            ))}
          </div>

          <h3 className="mt-8 text-xl font-semibold">Related tools</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {internalLinks.map((slug) => (
              <a
                key={slug}
                href={`/${locale}/${slug}`}
                className="rounded-full border border-slate-300 px-3 py-1 text-sm hover:bg-slate-50"
              >
                {humanizeTool(slug)}
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
