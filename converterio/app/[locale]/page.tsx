import { ConverterWorkbench } from "@/components/converter-workbench";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/lib/i18n/config";

export default async function LocaleHome({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <ConverterWorkbench
      title={dict.heroTitle}
      subtitle={dict.heroSubtitle}
      convertLabel={dict.convertButton}
      defaultFormat="jpeg"
    />
  );
}
