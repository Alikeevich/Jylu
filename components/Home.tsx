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
  const d = dict[lang];

  return (
    <>
      <Header lang={lang} d={d} page="home" />

      <main id="top">
        {/* ───────── Hero ───────── */}
        <section className="hero on-dark">
          <HeroVideo />
          <div className="hero__content container">
            <p className="hero__kicker">{d.hero.kicker}</p>
            <h1 className="hero__title">{d.hero.title}</h1>
            <p className="hero__lead">{d.hero.lead}</p>
            <div className="hero__actions">
              <a href="#pilot" className="btn">
                {d.hero.primary}
              </a>
              <a href="#how" className="btn btn--secondary">
                {d.hero.secondary}
              </a>
            </div>
          </div>
          <p className="hero__caption container">{d.hero.caption}</p>
        </section>

        {/* ───────── Stats ───────── */}
        <section className="stats">
          <div className="container stats__grid">
            {d.stats.items.map((s) => (
              <div key={s.label} className="stat">
                <p className="stat__value">{s.value}</p>
                <p className="stat__label">{s.label}</p>
              </div>
            ))}
          </div>
          <p className="container note">{d.stats.note}</p>
        </section>

        {/* ───────── Problem ───────── */}
        <section className="section" id="problem">
          <div className="container split">
            <div>
              <Label>{d.problem.label}</Label>
              <h2 className="h2">{d.problem.title}</h2>
            </div>
            <div className="split__body">
              <p className="lead">{d.problem.p1}</p>
              <p className="lead lead--muted">{d.problem.p2}</p>
            </div>
          </div>

          <div className="container">
            <figure className="incident">
              <p className="incident__date">{d.problem.incident.date}</p>
              <div>
                <p className="incident__title">{d.problem.incident.title}</p>
                <p className="incident__text">{d.problem.incident.text}</p>
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
              alt={d.photo.alt}
              loading="lazy"
              decoding="async"
            />
          </div>
          <figcaption className="photo__caption">{d.photo.caption}</figcaption>
        </figure>

        {/* ───────── How ───────── */}
        <section className="section" id="how">
          <div className="container">
            <Label>{d.how.label}</Label>
            <h2 className="h2 h2--wide">{d.how.title}</h2>
            <ol className="steps">
              {d.how.steps.map((s, i) => (
                <li key={s.title} className="step">
                  <span className="step__n">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="step__title">{s.title}</h3>
                  <p className="step__text">{s.text}</p>
                </li>
              ))}
            </ol>
            <p className="aside">{d.how.aside}</p>
          </div>
        </section>

        {/* ───────── Systems ───────── */}
        <section className="section" id="systems">
          <div className="container">
            <Label>{d.systems.label}</Label>
            <h2 className="h2 h2--wide">{d.systems.title}</h2>
            <div className="systems">
              {d.systems.items.map((s) => (
                <article key={s.name} className={`system${s.accent ? " system--accent" : ""}`}>
                  <header className="system__head">
                    <h3 className="system__name">{s.name}</h3>
                    <p className="system__sub">{s.sub}</p>
                  </header>
                  <dl className="system__rows">
                    <div>
                      <dt>{d.systems.rows.owner}</dt>
                      <dd>{s.owner}</dd>
                    </div>
                    <div>
                      <dt>{d.systems.rows.shows}</dt>
                      <dd>{s.shows}</dd>
                    </div>
                    <div>
                      <dt>{d.systems.rows.when}</dt>
                      <dd className="system__when">{s.when}</dd>
                    </div>
                  </dl>
                </article>
              ))}
            </div>
            <div className="facts">
              <p>{d.systems.facts}</p>
              <ul className="facts__nums">
                {d.systems.nums.map((n) => (
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
            <Label>{d.now.label}</Label>
            <h2 className="h2 h2--wide">{d.now.title}</h2>
            <div className="reasons">
              {d.now.items.map((r) => (
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
            <Label>{d.cycle.label}</Label>
            <h2 className="h2 h2--wide">{d.cycle.title}</h2>
            <ol className="cycle">
              {d.cycle.items.map((c) => (
                <li key={c.when} className="cycle__item">
                  <span className="cycle__dot" aria-hidden />
                  <p className="cycle__when">{c.when}</p>
                  <p className="cycle__what">{c.what}</p>
                </li>
              ))}
            </ol>
            <div className="model">
              {d.cycle.model.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
        </section>

        {/* ───────── Pilot ───────── */}
        <section className="section" id="pilot">
          <div className="container">
            <Label>{d.pilot.label}</Label>
            <h2 className="h2 h2--wide">{d.pilot.title}</h2>
            <p className="lead lead--muted pilot__intro">{d.pilot.intro}</p>
            <div className="pilot">
              <div className="pilot__col">
                <h3 className="pilot__title">{d.pilot.need.title}</h3>
                <ul className="pilot__list">
                  {d.pilot.need.items.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
              <div className="pilot__col pilot__col--accent">
                <h3 className="pilot__title">{d.pilot.get.title}</h3>
                <ul className="pilot__list pilot__list--dated">
                  {d.pilot.get.items.map((t) => (
                    <li key={t.when}>
                      <span>{t.when}</span>
                      {t.what}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="aside">{d.pilot.aside}</p>
          </div>
        </section>

        {/* ───────── FAQ ───────── */}
        <section className="section" id="faq">
          <div className="container split">
            <div>
              <Label>{d.faq.label}</Label>
              <h2 className="h2">{d.faq.title}</h2>
            </div>
            <div className="faq">
              {d.faq.items.map((f) => (
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
            <h2 className="cta__title">{d.cta.title}</h2>
            <div className="cta__row">
              <a className="btn btn--large" href={`mailto:${CONTACT_EMAIL}`}>
                {d.cta.button}
              </a>
              <span className="cta__mail">{CONTACT_EMAIL}</span>
            </div>
          </div>
        </section>
      </main>

      <Footer lang={lang} d={d} withSources />
      <CookieNotice lang={lang} d={d} />
    </>
  );
}
