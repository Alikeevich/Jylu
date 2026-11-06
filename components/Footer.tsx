import { dict } from "@/content/dictionary";
import { href, type Lang } from "@/content/i18n";
import { SOURCES } from "@/content/site";
import Logo from "./Logo";

export default function Footer({ lang, withSources = false }: { lang: Lang; withSources?: boolean }) {
  const t = dict[lang];
  return (
    <footer className="footer">
      <div className="container">
        {withSources && (
          <details className="sources">
            <summary>
              {t.footer.sources} <span className="num">{SOURCES.length}</span>
            </summary>
            <ol>
              {SOURCES.map((s) => (
                <li key={s.url}>
                  <a href={s.url} target="_blank" rel="noreferrer">
                    {s.title[lang]}
                  </a>
                </li>
              ))}
            </ol>
          </details>
        )}
        <div className="footer__bar">
          <a className="logo" href={href(lang)} aria-label={t.nav.home}>
            <Logo />
          </a>
          <span>{t.footer.tagline}</span>
          <nav className="footer__legal" aria-label={t.footer.legalLabel}>
            <a href={href(lang, "privacy")}>{t.footer.legal.privacy}</a>
            <a href={href(lang, "terms")}>{t.footer.legal.terms}</a>
            <a href={href(lang, "cookies")}>{t.footer.legal.cookies}</a>
          </nav>
          <span>
            © 2026 Jylu · {t.footer.place}
          </span>
        </div>
      </div>
    </footer>
  );
}
