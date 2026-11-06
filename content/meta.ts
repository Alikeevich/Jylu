import type { Metadata } from "next";
import { HTML_LANG, LANGS, href, type Lang, type PageKey } from "./i18n";
import { SITE_URL } from "./site";

const OG_LOCALE: Record<Lang, string> = { ru: "ru_RU", en: "en_US", kz: "kk_KZ" };

/** Page metadata. Canonical, hreflang and og:image need NEXT_PUBLIC_SITE_URL. */
export function pageMeta(lang: Lang, page: PageKey, title: string, description: string): Metadata {
  const meta: Metadata = {
    title,
    description,
    openGraph: { title, description, locale: OG_LOCALE[lang], type: "website", siteName: "Jylu" },
  };
  if (SITE_URL) {
    meta.metadataBase = new URL(SITE_URL);
    meta.alternates = {
      canonical: href(lang, page),
      languages: Object.fromEntries(LANGS.map((l) => [HTML_LANG[l], href(l, page)])),
    };
    meta.openGraph = { ...meta.openGraph, images: [{ url: "/images/og.jpg", width: 1200, height: 630 }] };
  }
  return meta;
}
