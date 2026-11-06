import type { Dict } from "@/content/dictionary";
import { href, type Lang } from "@/content/i18n";

/** Hidden until /public/site.js checks whether it was dismissed. */
export default function CookieNotice({ lang, d }: { lang: Lang; d: Dict }) {
  return (
    <aside className="cookie" hidden aria-label={d.cookie.label}>
      <p>{d.cookie.text}</p>
      <div className="cookie__actions">
        <button type="button" className="btn btn--small" data-cookie-ok>
          {d.cookie.ok}
        </button>
        <a href={href(lang, "cookies")}>{d.cookie.more}</a>
      </div>
    </aside>
  );
}
