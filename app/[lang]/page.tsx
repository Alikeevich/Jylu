import Home from "@/components/Home";
import { dict } from "@/content/dictionary";
import { isLang } from "@/content/i18n";
import { pageMeta } from "@/content/meta";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props) {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  return pageMeta(lang, "home", dict[lang].meta.title, dict[lang].meta.description);
}

export default async function Page({ params }: Props) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  return <Home lang={lang} />;
}
