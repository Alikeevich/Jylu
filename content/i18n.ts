/** Languages of the site. Order is the order of the switcher. */
export const LANGS = ["kz", "ru", "en"] as const;
export type Lang = (typeof LANGS)[number];

export const DEFAULT_LANG: Lang = "ru";

/** URL segment → value for the html lang attribute (Kazakh is "kk"). */
export const HTML_LANG: Record<Lang, string> = { kz: "kk", ru: "ru", en: "en" };

export const LANG_LABEL: Record<Lang, { short: string; name: string }> = {
  kz: { short: "KZ", name: "Қазақша" },
  ru: { short: "RU", name: "Русский" },
  en: { short: "EN", name: "English" },
};

export type LegalKey = "privacy" | "terms" | "cookies";
export type PageKey = "home" | LegalKey;

export function href(lang: Lang, page: PageKey = "home", hash?: string) {
  const base = page === "home" ? `/${lang}/` : `/${lang}/${page}/`;
  return hash ? `${base}#${hash}` : base;
}

export function isLang(value: string): value is Lang {
  return (LANGS as readonly string[]).includes(value);
}
