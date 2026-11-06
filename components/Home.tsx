import { dict } from "@/content/dictionary";
import type { Lang } from "@/content/i18n";
import { CONTACT_EMAIL } from "@/content/site";
import CookieNotice from "./CookieNotice";
import Footer from "./Footer";
import Header from "./Header";
import HeroVideo from "./HeroVideo";

function Label({ children }: { children: React.ReactNode }) {
  return <p className="label">{children}</p>;
}

export default function Home({ lang }: { lang: Lang }) {
  const t = dict[lang];

  return (
    <>
      <Header lang={lang} page="home" />

      <main id="top">
        {/* ───────── Hero ───────── */}
        <section className="hero on-dark">
          <HeroVideo />
          <div className="hero__content container">
            <p className="hero__kicker">{t.hero.kicker}</p>
            <h1 className="hero__title">{t.hero.title}</h1>
            <p className="hero__lead">{t.hero.lead}</p>
            <div className="hero__actions">
              <a href="#pilot" className="btn">
                {t.hero.primary}
              </a>
              <a href="#how" className="btn btn--secondary">
                {t.hero.secondary}
              </a>
            </div>
          </div>
          <p className="hero__caption container">{t.hero.caption}</p>
        </section>

        {/* ───────── Stats ───────── */}
        <section className="stats">
          <div className="container stats__grid">
            {t.stats.items.map((s) => (
              <div key={s.label} className="stat">
                <p className="stat__value">{s.value}</p>
                <p className="stat__label">{s.label}</p>
              </div>
            ))}
          </div>
          <p className="container note">{t.stats.note}</p>
        </section>

        {/* ───────── Problem ───────── */}
        <section className="section" id="problem">
          <div className="container split">
            <div>
              <Label>{t.problem.label}</Label>
              <h2 className="h2">{t.problem.title}</h2>
            </div>
            <div className="split__body">
              <p className="lead">{t.problem.p1}</p>
              <p className="lead lead--muted">{t.problem.p2}</p>
            </div>
          </div>

          <div className="container">
            <figure className="incident">
              <p className="incident__date">{t.problem.incident.date}</p>
              <div>
                <p className="incident__title">{t.problem.incident.title}</p>
                <p className="incident__text">{t.problem.incident.text}</p>
              </div>
            </figure>
          </div>
        </section>

        {/* ───────── Photo ───────── */}
        <figure className="photo container">
          <div className="photo__frame">
            <img
              src="/images/courtyard-1536.webp"
              srcSet="/images/courtyard-960.webp 960w, /images/courtyard-1536.webp 1536w"
              sizes="(max-width: 860px) 100vw, 1296px"
              width={1536}
              height={864}
              alt={t.photo.alt}
              loading="lazy"
              decoding="async"
            />
          </div>
          <figcaption className="photo__caption">{t.photo.caption}</figcaption>
        </figure>

        {/* ───────── How ───────── */}
        <section className="section" id="how">
          <div className="container">
            <Label>{t.how.label}</Label>
            <h2 className="h2 h2--wide">{t.how.title}</h2>
            <ol className="steps">
              {t.how.steps.map((s, i) => (
                <li key={s.title} className="step">
                  <span className="step__n">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="step__title">{s.title}</h3>
                  <p className="step__text">{s.text}</p>
                </li>
              ))}
            </ol>
            <p className="aside">{t.how.aside}</p>
          </div>
        </section>

        {/* ───────── Systems ───────── */}
        <section className="section" id="systems">
          <div className="container">
            <Label>{t.systems.label}</Label>
            <h2 className="h2 h2--wide">{t.systems.title}</h2>
            <div className="systems">
              {t.systems.items.map((s) => (
                <article key={s.name} className={`system${s.accent ? " system--accent" : ""}`}>
                  <header className="system__head">
                    <h3 className="system__name">{s.name}</h3>
                    <p className="system__sub">{s.sub}</p>
                  </header>
                  <dl className="system__rows">
                    <div>
                      <dt>{t.systems.rows.owner}</dt>
                      <dd>{s.owner}</dd>
                    </div>
                    <div>
                      <dt>{t.systems.rows.shows}</dt>
                      <dd>{s.shows}</dd>
                    </div>
                    <div>
                      <dt>{t.systems.rows.when}</dt>
                      <dd className="system__when">{s.when}</dd>
                    </div>
                  </dl>
                </article>
              ))}
            </div>
            <div className="facts">
              <p>{t.systems.facts}</p>
              <ul className="facts__nums">
                {t.systems.nums.map((n) => (
                  <li key={n.value}>
                    <b>{n.value}</b> {n.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ───────── Why now ───────── */}
        <section className="section" id="now">
          <div className="container">
            <Label>{t.now.label}</Label>
            <h2 className="h2 h2--wide">{t.now.title}</h2>
            <div className="reasons">
              {t.now.items.map((r) => (
                <div key={r.title} className="reason">
                  <h3 className="reason__title">{r.title}</h3>
                  <p className="reason__text">{r.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ───────── Cycle ───────── */}
        <section className="section" id="cycle">
          <div className="container">
            <Label>{t.cycle.label}</Label>
            <h2 className="h2 h2--wide">{t.cycle.title}</h2>
            <ol className="cycle">
              {t.cycle.items.map((c) => (
                <li key={c.when} className="cycle__item">
                  <span className="cycle__dot" aria-hidden />
                  <p className="cycle__when">{c.when}</p>
                  <p className="cycle__what">{c.what}</p>
                </li>
              ))}
            </ol>
            <div className="model">
              {t.cycle.model.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
        </section>

        {/* ───────── Pilot ───────── */}
        <section className="section" id="pilot">
          <div className="container">
            <Label>{t.pilot.label}</Label>
            <h2 className="h2 h2--wide">{t.pilot.title}</h2>
            <p className="lead lead--muted pilot__intro">{t.pilot.intro}</p>
            <div className="pilot">
              <div className="pilot__col">
                <h3 className="pilot__title">{t.pilot.need.title}</h3>
                <ul className="pilot__list">
                  {t.pilot.need.items.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
              <div className="pilot__col pilot__col--accent">
                <h3 className="pilot__title">{t.pilot.get.title}</h3>
                <ul className="pilot__list pilot__list--dated">
                  {t.pilot.get.items.map((t) => (
                    <li key={t.when}>
                      <span>{t.when}</span>
                      {t.what}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="aside">{t.pilot.aside}</p>
          </div>
        </section>

        {/* ───────── FAQ ───────── */}
        <section className="section" id="faq">
          <div className="container split">
            <div>
              <Label>{t.faq.label}</Label>
              <h2 className="h2">{t.faq.title}</h2>
            </div>
            <div className="faq">
              {t.faq.items.map((f) => (
                <details key={f.q} className="faq__item">
                  <summary>
                    <span>{f.q}</span>
                    <span className="faq__icon" aria-hidden />
                  </summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ───────── CTA ───────── */}
        <section className="section cta">
          <div className="container">
            <h2 className="cta__title">{t.cta.title}</h2>
            <div className="cta__row">
              <a className="btn btn--large" href={`mailto:${CONTACT_EMAIL}`}>
                {t.cta.button}
              </a>
              <span className="cta__mail">{CONTACT_EMAIL}</span>
            </div>
          </div>
        </section>
      </main>

      <Footer lang={lang} withSources />
      <CookieNotice lang={lang} />
    </>
  );
}
