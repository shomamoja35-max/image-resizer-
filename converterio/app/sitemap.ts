import type { MetadataRoute } from "next";

import { locales } from "@/lib/i18n/config";

const tools = [
  "",
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
  "blog",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((locale) =>
    tools.map((slug) => ({
      url: `https://converterio.app/${locale}${slug ? `/${slug}` : ""}`,
      changeFrequency: "weekly",
      priority: slug ? 0.8 : 1,
    }))
  );
}
