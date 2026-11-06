import { dict } from "@/content/dictionary";
import { HTML_LANG, LANG_LABEL, LANGS, href, type Lang, type PageKey } from "@/content/i18n";
import { CloseIcon, MenuIcon, MoonIcon, SunIcon } from "./Icons";
import Logo from "./Logo";

/**
 * Static markup only. Behaviour (scroll state, mobile menu, theme toggle)
 * lives in /public/site.js so the same markup works in the standalone build.
 */
export default function Header({ lang, page }: { lang: Lang; page: PageKey }) {
  const t = dict[lang];
  const onHome = page === "home";
  const sectionHref = (id: string) => (onHome ? `#${id}` : href(lang, "home", id));
  const links: [string, string][] = [
    ["how", t.nav.how],
    ["systems", t.nav.systems],
    ["cycle", t.nav.cycle],
    ["faq", t.nav.faq],
  ];

  return (
    <header className={`header${onHome ? "" : " header--solid"}`} data-solid={onHome ? undefined : ""}>
      <div className="header__inner">
        <a href={onHome ? "#top" : href(lang)} className="logo" aria-label={t.nav.home}>
          <Logo />
        </a>
        <nav className="nav" aria-label={t.nav.sections}>
          {links.map(([id, label]) => (
            <a key={id} href={sectionHref(id)}>
              {label}
            </a>
          ))}
          <LangSwitch lang={lang} page={page} label={t.nav.language} variant="menu" />
        </nav>
        <LangSwitch lang={lang} page={page} label={t.nav.language} variant="bar" />
        <button type="button" className="icon-btn theme-toggle" data-theme-toggle aria-label={t.nav.theme} title={t.nav.theme}>
          <SunIcon className="i-sun" />
          <MoonIcon className="i-moon" />
        </button>
        <a href={sectionHref("pilot")} className="btn btn--small header__cta">
          {t.nav.pilot}
        </a>
        <button type="button" className="icon-btn menu" aria-expanded="false" aria-label={t.nav.menu}>
          <MenuIcon className="i-open" />
          <CloseIcon className="i-close" />
        </button>
      </div>
    </header>
  );
}

function LangSwitch({
  lang,
  page,
  label,
  variant,
}: {
  lang: Lang;
  page: PageKey;
  label: string;
  variant: "bar" | "menu";
}) {
  return (
    <div className={`langs langs--${variant}`} role="group" aria-label={label}>
      {LANGS.map((l) => (
        <a
          key={l}
          href={href(l, page)}
          hrefLang={HTML_LANG[l]}
          lang={HTML_LANG[l]}
          data-lang-link={l}
          aria-current={l === lang ? "true" : undefined}
          title={LANG_LABEL[l].name}
        >
          {variant === "bar" ? LANG_LABEL[l].short : LANG_LABEL[l].name}
        </a>
      ))}
    </div>
  );
}
