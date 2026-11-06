import { dict } from "@/content/dictionary";
import { href, type Lang } from "@/content/i18n";

/** Hidden until /public/site.js checks whether it was dismissed. */
export default function CookieNotice({ lang }: { lang: Lang }) {
  const t = dict[lang];
  return (
    <aside className="cookie" hidden aria-label={t.cookie.label}>
      <p>{t.cookie.text}</p>
      <div className="cookie__actions">
        <button type="button" className="btn btn--small" data-cookie-ok>
          {t.cookie.ok}
        </button>
        <a href={href(lang, "cookies")}>{t.cookie.more}</a>
      </div>
    </aside>
  );
}
