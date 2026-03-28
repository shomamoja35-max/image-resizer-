import type { MetadataRoute } from "next";

import { locales } from "@/lib/i18n/config";
import { ALLOWED_TOOL_SLUGS } from "@/lib/tools/allowed-tools";

const tools = ["", ...ALLOWED_TOOL_SLUGS, "blog"];

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((locale) =>
    tools.map((slug) => ({
      url: `https://converterio.app/${locale}${slug ? `/${slug}` : ""}`,
      changeFrequency: "weekly" as const,
      priority: slug ? 0.8 : 1,
    }))
  );
}
