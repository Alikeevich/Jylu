import Header from "@/components/Header";
import HeroVideo from "@/components/HeroVideo";
import SpotMeter from "@/components/SpotMeter";
import ReportPreview from "@/components/ReportPreview";

// TODO: заменить на настоящий адрес
const CONTACT_EMAIL = "hello@jylu.kz";

const stats = [
  { value: "78,2%", label: "износ теплосетей в Павлодарской области" },
  { value: "88,6%", label: "износ в Экибастузе" },
  { value: "1438 км", label: "теплосетей в области" },
  { value: "30–35 км", label: "ремонтируют за год" },
];

const steps = [
  {
    title: "Камера на технике",
    text: "Тепловизор-приставку к телефону ставим на мусоровоз или снегоуборочную машину. Мусоровоз заезжает почти в каждый двор, а внутриквартальные сети проходят как раз там.",
  },
  {
    title: "Запись маршрута",
    text: "Телефон записывает тепловые кадры и GPS-координаты, лица и номера машин размываются прямо на устройстве.",
  },
  {
    title: "Поиск аномалий",
    text: "Модель находит проталины, тёплые полосы вдоль трассы и пар над камерами.",
  },
  {
    title: "Карта и рейтинг",
    text: "Аномалии наносим на карту и сортируем по риску и объёму потерь тепла.",
  },
  {
    title: "Список для бригад",
    text: "Акимат и теплосети получают список участков для раскопки и выгрузку в свою ГИС.",
  },
];

const systems = [
  {
    name: "Дежурная карта РГИС",
    sub: "модуль «Аварийно-ремонтные работы»",
    owner: "Акимат области",
    shows: "Где авария или ремонт, SMS жителям",
    when: "После аварии",
  },
  {
    name: "Цифровой двойник",
    sub: "теплоснабжения",
    owner: "ТОО «Павлодарские тепловые сети»",
    shows: "Параметры на тепловых пунктах и в конечных точках сети",
    when: "Когда параметры уже вышли за норму",
  },
  {
    name: "Jylu",
    sub: "тепловая съёмка",
    owner: "Мы",
    shows: "Состояние трубы по всей длине между узлами",
    when: "До аварии",
    accent: true,
  },
];

const reasons = [
  {
    title: "Сети перешли городу",
    text: "В январе 2026 года ЦАЭК безвозмездно передала государству ТОО «Павлодарские тепловые сети». Собственник теперь отдел ЖКХ акимата Павлодара, и расходы на аварии несёт акимат.",
  },
  {
    title: "Деньги выделены",
    text: "До 2029 года на модернизацию энергетики и коммунальных сетей заложено около 13 трлн тенге. Деньги дают под конкретные проекты, поэтому заявке нужно обоснование по участкам.",
  },
  {
    title: "Цифровизация в приоритете",
    text: "2026 год объявлен Годом цифровизации и ИИ. Акимат области планирует подключать удачные проекты коммунальщиков к ситуационно-аналитическому центру.",
  },
  {
    title: "Износ начал снижаться",
    text: "Впервые за 30 лет в области ожидают снижения износа теплосетей. Jylu помогает направить деньги на ремонт туда, где он нужнее всего.",
  },
];

const cycle = [
  { when: "Октябрь — апрель", what: "Скан с коммунальной техники" },
  { when: "Конец апреля", what: "Рейтинг участков: где менять первым" },
  { when: "Май", what: "Опрессовка проверяет прогноз" },
  { when: "Май — сентябрь", what: "Ремонт по списку" },
];

const faq = [
  {
    q: "А летом что?",
    a: "Летом теплосети ремонтируют участки из нашего списка, а опрессовка показывает, насколько точным был прогноз. Камера в это время может искать ямы и неработающие фонари.",
  },
  {
    q: "У нас же есть цифровой двойник",
    a: "Двойник видит параметры на тепловых пунктах. Мы смотрим на трубу между ними.",
  },
  {
    q: "Двойник по датчикам сам предскажет, где порвётся",
    a: "По датчикам двойника риск можно оценить только косвенно, по возрасту трубы и давлению. Мы добавляем прямое наблюдение за трубой, и вместе прогноз точнее.",
  },
  {
    q: "Датчик и так покажет, где протечка",
    a: "Датчик показывает значение в своей точке, но не место утечки. Небольшая течь не выводит параметры за норму, пока в мороз не превратится в порыв.",
  },
  {
    q: "Почему не дроны или спутник?",
    a: "Дрон или спутник дают разовый снимок. Машина проезжает одни и те же дворы регулярно, и съёмка почти ничего не стоит.",
  },
  {
    q: "Где хранятся данные?",
    a: "На серверах в Казахстане. Лица и номера машин размываются ещё на телефоне.",
  },
  {
    q: "Как нам это купить?",
    a: "Пилот бесплатный, затем сервисный договор или ГЧП. В Павлодаре уже была похожая схема: поставщик ставил оборудование за свой счёт, а город расплачивался 3–5 лет.",
  },
];

const sources = [
  ["Bizmedia — авария на Экибастузской ТЭЦ, 27.11.2022", "https://bizmedia.kz/2022-11-27-na-ekibastuzskom-tecz-proizoshla-avariya/"],
  ["Informburo — прорыв теплосетей Экибастуза", "https://informburo.kz/fotoreportazh/zdes-sever-zima-ne-proshhaet-takix-osibok-kak-vlasti-dopustili-cto-ekibastuzcy-cut-ne-zamyorzli-v-svoix-domax"],
  ["Forbes.kz — дроны нашли 10 повреждений", "https://forbes.kz/articles/avariya_na_tets_v_ekibastuze/amp"],
  ["BES.media — 1438 км сетей и темп ремонта", "https://bes.media/news/na-rekonstruktsiyu-teplosetey-v-pavlodarskoy-oblasti-videlili-9-mlrd-tenge-na-chto-etih-deneg-hvatilo/"],
  ["Zakon.kz — износ 78,2% и 88,6%, июль 2026", "https://www.zakon.kz/obshestvo/6523642-v-pavlodarskoy-oblasti-vpervye-za-30-let-nachali-snizhat-iznos-kommunalnykh-setey.html"],
  ["Forbes.kz — 13 трлн тенге до 2029 года", "https://forbes.kz/articles/13-trln-tenge-do-2029-goda-vydelyat-na-modernizatsiyu-kommunalnyh-setey-kazahstana-ff08be"],
  ["BES.media — финансирование по конкретным проектам", "https://bes.media/news/v-2027-godu-na-modernizatsiyu-teplosetey-kazahstana-potratyat-pochti-74-mlrd-tenge/"],
  ["PavlodarNews — модуль РГИС и пилот во Втором Павлодаре", "https://pavlodarnews.kz/ru/kommunalnie-sluzhbi-pavlodara-budut-rabotat-interaktivno"],
  ["Kazinform — цифровой двойник теплоснабжения", "https://www.inform.kz/ru/tsifrovoy-dvoynik-dlyakontrolya-sistemi-teplosnabzheniya-vnedryayut-vpavlodare-afc5087c"],
  ["BES.media — передача теплосетей государству", "https://bes.media/news/tsaek-klebanova-i-kana-peredala-gosudarstvu-petropavlovskie-teplovie-seti/"],
  ["Kapital.kz — новый собственник теплосетей", "https://kapital.kz/business/148608/gosudarstvo-poluchilo-kontrol-nad-odnim-iz-aktivov-sergeya-kana-i-aleksandra-klebanova.html"],
  ["Акимат области — цифровизация и ситуационный центр", "https://www.gov.kz/memleket/entities/pavlodar/press/news/details/1162437?lang=ru"],
  ["Astana Hub — Год цифровизации и ИИ", "https://astanahub.com/ru/article/ai-digital-bridge-2026-otkryvaet-kazakhstanskim-startapam-put-v-kremnievuiu-dolinu"],
  ["Казправда — ГЧП в «Smart Павлодар»", "https://kazpravda.kz/n/shkola-budushchego"],
  ["Silkway TV — дроны для теплосетей в Акмолинской области", "https://silkwaytv.kz/en/unified-drone-infrastructure-being-created-in-akmola-region_53230"],
  ["Informburo — тепловая съёмка Астаны из космоса", "https://informburo.kz/novosti/teplopoteri-astany-zapechatleli-iz-kosmosa.html"],
];

function Label({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <p className="label">
      <span className="label__n">{n}</span>
      {children}
    </p>
  );
}

export default function Home() {
  return (
    <>
      <Header />

      <main id="top">
        {/* ───────── Hero ───────── */}
        <section className="hero">
          <HeroVideo />
          <div className="hero__content container">
            <p className="hero__kicker">Павлодар, пилот в отопительный сезон 2026–2027</p>
            <h1 className="hero__title">Находим утечки в&nbsp;теплосетях до&nbsp;аварии</h1>
            <p className="hero__lead">
              Над трубой с утечкой тает снег и прогревается грунт. Тепловизор на коммунальной
              технике снимает это весь отопительный сезон, а мы сортируем участки по риску.
            </p>
            <div className="hero__actions">
              <a href="#pilot" className="btn">
                Обсудить пилот
              </a>
              <a href="#how" className="btn btn--secondary">
                Как это работает
              </a>
            </div>
          </div>
          <div className="hero__product container">
            <ReportPreview />
            <p className="hero__caption">Фон: тепловой кадр, иллюстрация. Отчёт: пример, данные условные</p>
          </div>
        </section>

        {/* ───────── Stats ───────── */}
        <section className="stats">
          <div className="container stats__grid">
            {stats.map((s, i) => (
              <div key={s.label} className="stat">
                <p className="stat__value">{s.value}</p>
                <p className="stat__label">{s.label}</p>
              </div>
            ))}
          </div>
          <p className="container note">Zakon.kz и BES.media, июль 2026</p>
        </section>

        {/* ───────── Problem ───────── */}
        <section className="section" id="problem">
          <div className="container split">
            <div>
              <Label n="01">Проблема</Label>
              <h2 className="h2">
                Сети изнашиваются быстрее, чем их успевают менять
              </h2>
            </div>
            <div className="split__body">
              <p className="lead">
                У Павлодарской области самый высокий износ теплосетей в стране. При нынешнем темпе
                ремонта полная замена займёт больше 40 лет.
              </p>
              <p className="lead lead--muted">
                Заменить всё сразу не получится. Нужно решить, какие 30 км из 1438 менять первыми,
                и суметь обосновать этот выбор.
              </p>
            </div>
          </div>

          <div className="container">
            <figure className="incident">
              <p className="incident__date">27.11.2022</p>
              <div>
                <p className="incident__title">Экибастуз</p>
                <p className="incident__text">
                  Ночью прорвало теплосети, на ТЭЦ остановились котлы, и город остался без отопления
                  в тридцатиградусный мороз. Утром подняли дроны и нашли 10 повреждений.
                  Тепловая съёмка работает, её нужно проводить до аварии.
                </p>
              </div>
            </figure>
          </div>
        </section>

        {/* ───────── How ───────── */}
        <section className="section" id="how">
          <div className="container">
            <Label n="02">Как это работает</Label>
            <h2 className="h2 h2--wide">
              Камера едет туда, где проходят сети
            </h2>
            <ol className="steps">
              {steps.map((s, i) => (
                <li key={s.title} className="step">
                  <span className="step__n">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="step__title">{s.title}</h3>
                  <p className="step__text">{s.text}</p>
                </li>
              ))}
            </ol>
            <p className="aside">
              Позже можно добавить термометры Tuya в квартирах. Скан сети показывает, где тепло
              теряется, а термометры покажут, где его не хватает жильцам.
            </p>
          </div>
        </section>

        {/* ───────── Systems ───────── */}
        <section className="section" id="systems">
          <div className="container">
            <Label n="03">Связь с системами акимата</Label>
            <h2 className="h2 h2--wide">
              У акимата есть карта аварий и&nbsp;двойник узлов. Jylu&nbsp;добавляет трубу между ними
            </h2>
            <div className="systems">
              {systems.map((s, i) => (
                <article
                  key={s.name}
                  className={`system${s.accent ? " system--accent" : ""}`}
                 
                 
                >
                  <header className="system__head">
                    <h3 className="system__name">{s.name}</h3>
                    <p className="system__sub">{s.sub}</p>
                  </header>
                  <dl className="system__rows">
                    <div>
                      <dt>Кто ведёт</dt>
                      <dd>{s.owner}</dd>
                    </div>
                    <div>
                      <dt>Что показывает</dt>
                      <dd>{s.shows}</dd>
                    </div>
                    <div>
                      <dt>Когда срабатывает</dt>
                      <dd className="system__when">{s.when}</dd>
                    </div>
                  </dl>
                </article>
              ))}
            </div>
            <div className="facts">
              <p>
                Данные Jylu выгружаются в РГИС и в цифровой двойник, сами системы менять не нужно.
              </p>
              <ul className="facts__nums">
                <li><b>460 га</b> Второго Павлодара уже оцифрованы в РГИС</li>
                <li><b>49</b> улиц</li>
                <li><b>1368</b> подключений теплоснабжения</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ───────── Why now ───────── */}
        <section className="section" id="now">
          <div className="container">
            <Label n="04">Почему сейчас</Label>
            <h2 className="h2 h2--wide">
              В 2026 году совпали четыре условия
            </h2>
            <div className="reasons">
              {reasons.map((r, i) => (
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
            <Label n="05">Годовой цикл</Label>
            <h2 className="h2 h2--wide">
              Зимой собираем данные, летом по&nbsp;ним ремонтируют
            </h2>
            <ol className="cycle">
              {cycle.map((c, i) => (
                <li key={c.when} className="cycle__item">
                  <span className="cycle__dot" aria-hidden />
                  <p className="cycle__when">{c.when}</p>
                  <p className="cycle__what">{c.what}</p>
                </li>
              ))}
            </ol>
            <div className="model">
              <p>
                Результаты каждой опрессовки идут в обучение модели, и к следующей зиме прогноз
                становится точнее.
              </p>
              <p>
                Платят теплосети и акимат: годовая подписка за километр сети. Пилот бесплатный,
                затем сервисный договор или ГЧП.
              </p>
            </div>
          </div>
        </section>

        {/* ───────── Pilot ───────── */}
        <section className="section section--pilot" id="pilot">
          <div className="container">
            <Label n="06">Пилот</Label>
            <h2 className="h2 h2--wide">
              Второй Павлодар, отопительный сезон 2026–2027
            </h2>
            <p className="lead lead--muted pilot__intro">
              Сети Второго Павлодара уже оцифрованы в РГИС, поэтому результаты скана сразу ложатся
              на схему.
            </p>
            <div className="pilot">
              <div className="pilot__col">
                <h3 className="pilot__title">Что нужно от акимата</h3>
                <ul className="pilot__list">
                  <li>3 единицы коммунальной техники на отопительный сезон под датчики</li>
                  <li>Слой сетей Второго Павлодара из РГИС</li>
                  <li>Точка интеграции с ситуационно-аналитическим центром</li>
                </ul>
              </div>
              <div className="pilot__col pilot__col--accent">
                <h3 className="pilot__title">Что получит акимат</h3>
                <ul className="pilot__list pilot__list--dated">
                  <li><span>Декабрь — март</span>Регулярный скан и карта аномалий онлайн</li>
                  <li><span>Апрель</span>Рейтинг участков с оценкой потерь</li>
                  <li><span>Май</span>Сверка с результатами весенней опрессовки</li>
                </ul>
              </div>
            </div>
            <p className="aside">
              Результат проверяется независимо: опрессовку проводят сами теплосети.
            </p>
          </div>
        </section>

        {/* ───────── FAQ ───────── */}
        <section className="section" id="faq">
          <div className="container split">
            <div>
              <Label n="07">Вопросы</Label>
              <h2 className="h2">
                Что обычно спрашивают
              </h2>
            </div>
            <div className="faq">
              {faq.map((f) => (
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

        {/* ───────── Team + CTA ───────── */}
        <section className="section cta">
          <div className="container">
            <div className="team">
              <Label n="08">Команда</Label>
              <p className="team__name">Алихан Кенжебаев</p>
              <p className="team__role">
                Основатель. Embedded-разработка (ISS.AI), full-stack (Next.js, Supabase), интеграция
                IoT-устройств Tuya. Резидент Astana Hub.
              </p>
            </div>
            <h2 className="cta__title">
              Начнём с одного района этой зимой
            </h2>
            <a className="btn btn--large" href={`mailto:${CONTACT_EMAIL}`}>
              Написать нам
            </a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <details className="sources">
            <summary>Источники <span className="num">{sources.length}</span></summary>
            <ol>
              {sources.map(([t, href]) => (
                <li key={href}>
                  <a href={href} target="_blank" rel="noreferrer">
                    {t}
                  </a>
                </li>
              ))}
            </ol>
          </details>
          <div className="footer__bar">
            <span className="logo">
              <SpotMeter size={18} className="logo__mark" />
              Jylu
            </span>
            <span>жылу — «тепло» по-казахски</span>
            <span>Павлодар, 2026</span>
          </div>
        </div>
      </footer>
    </>
  );
}
