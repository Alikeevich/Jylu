import LegalPage from "@/components/LegalPage";
import { isLang } from "@/content/i18n";
import { legal } from "@/content/legal";
import { pageMeta } from "@/content/meta";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props) {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const doc = legal[lang].privacy;
  return pageMeta(lang, "privacy", `${doc.title} — Jylu`, doc.description);
}

export default async function Page({ params }: Props) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  return <LegalPage lang={lang} page="privacy" />;
}
