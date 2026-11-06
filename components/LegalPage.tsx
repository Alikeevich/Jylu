import { dict } from "@/content/dictionary";
import { href, type Lang, type LegalKey } from "@/content/i18n";
import { legal, type Block } from "@/content/legal";
import { CONTACT_EMAIL } from "@/content/site";
import CookieNotice from "./CookieNotice";
import Footer from "./Footer";
import Header from "./Header";
import { ArrowLeftIcon } from "./Icons";

/** Renders {email} and [label](privacy|terms|cookies) inside a string. */
function Inline({ text, lang }: { text: string; lang: Lang }) {
  const parts = text.split(/(\{email\}|\[[^\]]+\]\((?:privacy|terms|cookies)\))/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part === "{email}") {
          return (
            <a key={i} href={`mailto:${CONTACT_EMAIL}`}>
              {CONTACT_EMAIL}
            </a>
          );
        }
        const link = part.match(/^\[([^\]]+)\]\((privacy|terms|cookies)\)$/);
        if (link) {
          return (
            <a key={i} href={href(lang, link[2] as LegalKey)}>
              {link[1]}
            </a>
          );
        }
        return part;
      })}
    </>
  );
}

function BlockView({ block, lang }: { block: Block; lang: Lang }) {
  if (typeof block === "string") {
    return (
      <p>
        <Inline text={block} lang={lang} />
      </p>
    );
  }
  if ("list" in block) {
    return (
      <ul>
        {block.list.map((item) => (
          <li key={item}>
            <Inline text={item} lang={lang} />
          </li>
        ))}
      </ul>
    );
  }
  return (
    <ul className="legal__keys">
      {block.keys.map(([key, text]) => (
        <li key={key}>
          <code>{key}</code>
          <span>{text}</span>
        </li>
      ))}
    </ul>
  );
}

export default function LegalPage({ lang, page }: { lang: Lang; page: LegalKey }) {
  const d = dict[lang];
  const doc = legal[lang][page];

  return (
    <>
      <Header lang={lang} d={d} page={page} />
      <main className="legal" id="top">
        <div className="container legal__inner">
          <a className="legal__back" href={href(lang)}>
            <ArrowLeftIcon />
            {d.legal.back}
          </a>
          <h1 className="legal__title">{doc.title}</h1>
          <p className="legal__updated">{d.legal.updated}</p>
          {doc.sections.map((s) => (
            <section key={s.h} className="legal__section">
              <h2>{s.h}</h2>
              {s.body.map((b, i) => (
                <BlockView key={i} block={b} lang={lang} />
              ))}
            </section>
          ))}
        </div>
      </main>
      <Footer lang={lang} d={d} />
      <CookieNotice lang={lang} d={d} />
    </>
  );
}
