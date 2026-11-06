import LegalPage from "@/components/LegalPage";
import { LEGAL_KEYS, isLang, isLegalKey } from "@/content/i18n";
import { legal } from "@/content/legal";
import { pageMeta } from "@/content/meta";
import { legalViewport } from "@/content/viewport";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ lang: string; doc: string }> };

export const dynamicParams = false;
export const viewport = legalViewport;

export function generateStaticParams() {
  return LEGAL_KEYS.map((doc) => ({ doc }));
}

export async function generateMetadata({ params }: Props) {
  const { lang, doc } = await params;
  if (!isLang(lang) || !isLegalKey(doc)) return {};
  const { title, description } = legal[lang][doc];
  return pageMeta(lang, doc, `${title} — Jylu`, description);
}

export default async function Page({ params }: Props) {
  const { lang, doc } = await params;
  if (!isLang(lang) || !isLegalKey(doc)) notFound();
  return <LegalPage lang={lang} page={doc} />;
}
