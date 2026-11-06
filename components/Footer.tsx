import type { Dict } from "@/content/dictionary";
import { href, type Lang } from "@/content/i18n";
import { SOURCES } from "@/content/site";
import SpotMeter from "./SpotMeter";

export default function Footer({ lang, d, withSources = false }: { lang: Lang; d: Dict; withSources?: boolean }) {
  return (
    <footer className="footer">
      <div className="container">
        {withSources && (
          <details className="sources">
            <summary>
              {d.footer.sources} <span className="num">{SOURCES.length}</span>
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
          <a className="logo" href={href(lang)}>
            <SpotMeter size={18} className="logo__mark" />
            Jylu
          </a>
          <span>{d.footer.tagline}</span>
          <nav className="footer__legal" aria-label={d.footer.legalLabel}>
            <a href={href(lang, "privacy")}>{d.footer.legal.privacy}</a>
            <a href={href(lang, "terms")}>{d.footer.legal.terms}</a>
            <a href={href(lang, "cookies")}>{d.footer.legal.cookies}</a>
          </nav>
          <span>
            © 2026 Jylu · {d.footer.place}
          </span>
        </div>
      </div>
    </footer>
  );
}
