import "server-only";

import type { Locale } from "@/lib/i18n/config";

const dictionaries = {
  en: () => import("@/messages/en.json").then((m) => m.default),
  es: () => import("@/messages/es.json").then((m) => m.default),
  fr: () => import("@/messages/fr.json").then((m) => m.default),
  pt: () => import("@/messages/pt.json").then((m) => m.default),
  ar: () => import("@/messages/ar.json").then((m) => m.default),
};

export async function getDictionary(locale: Locale) {
  return dictionaries[locale]();
}
