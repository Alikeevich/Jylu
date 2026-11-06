import type { Lang } from "./i18n";

export interface Dict {
  meta: { title: string; description: string };
  nav: {
    how: string;
    systems: string;
    cycle: string;
    faq: string;
    pilot: string;
    menu: string;
    home: string;
    sections: string;
    theme: string;
    language: string;
  };
  hero: { kicker: string; title: string; lead: string; primary: string; secondary: string; caption: string };
  stats: { items: { value: string; label: string }[]; note: string };
  problem: {
    label: string;
    title: string;
    p1: string;
    p2: string;
    incident: { date: string; title: string; text: string };
  };
  photo: { alt: string; caption: string };
  how: { label: string; title: string; steps: { title: string; text: string }[]; aside: string };
  systems: {
    label: string;
    title: string;
    rows: { owner: string; shows: string; when: string };
    items: { name: string; sub: string; owner: string; shows: string; when: string; accent?: boolean }[];
    facts: string;
    nums: { value: string; text: string }[];
  };
  now: { label: string; title: string; items: { title: string; text: string }[] };
  cycle: { label: string; title: string; items: { when: string; what: string }[]; model: string[] };
  pilot: {
    label: string;
    title: string;
    intro: string;
    need: { title: string; items: string[] };
    get: { title: string; items: { when: string; what: string }[] };
    aside: string;
  };
  faq: { label: string; title: string; items: { q: string; a: string }[] };
  cta: { title: string; button: string };
  footer: {
    sources: string;
    legal: { privacy: string; terms: string; cookies: string };
    legalLabel: string;
    tagline: string;
    place: string;
  };
  cookie: { label: string; text: string; ok: string; more: string };
  legal: { back: string; updated: string };
}

const nb = " ";

const ru: Dict = {
  meta: {
    title: "Jylu — тепловая съёмка теплосетей",
    description:
      "Тепловизор на коммунальной технике находит участки теплосетей с утечками до аварии. Пилот во Втором Павлодаре.",
  },
  nav: {
    how: "Как работает",
    systems: "Системы",
    cycle: "Цикл",
    faq: "Вопросы",
    pilot: "Пилот",
    menu: "Меню",
    home: "Jylu — на главную",
    sections: "Разделы",
    theme: "Сменить тему",
    language: "Язык",
  },
  hero: {
    kicker: "Павлодар, пилот в отопительный сезон 2026–2027",
    title: `Находим утечки в${nb}теплосетях до${nb}аварии`,
    lead: "Над трубой с утечкой тает снег и прогревается грунт. Тепловизор на коммунальной технике снимает это весь отопительный сезон, а мы сортируем участки по риску.",
    primary: "Обсудить пилот",
    secondary: "Как это работает",
    caption: "Фон: тепловой кадр, иллюстрация",
  },
  stats: {
    items: [
      { value: "78,2%", label: "износ теплосетей в Павлодарской области" },
      { value: "88,6%", label: "износ в Экибастузе" },
      { value: "1438 км", label: "теплосетей в области" },
      { value: "30–35 км", label: "ремонтируют за год" },
    ],
    note: "Источники: Zakon.kz (июль 2026), BES.media",
  },
  problem: {
    label: "Проблема",
    title: "Сети изнашиваются быстрее, чем их успевают менять",
    p1: "У Павлодарской области самый высокий износ теплосетей в стране. При нынешнем темпе ремонта полная замена займёт больше 40 лет.",
    p2: "Заменить всё сразу не получится. Нужно решить, какие 30 км из 1438 менять первыми, и суметь обосновать этот выбор.",
    incident: {
      date: "27.11.2022",
      title: "Экибастуз",
      text: "Ночью прорвало теплосети, на ТЭЦ остановились котлы, и город остался без отопления в тридцатиградусный мороз. Утром подняли дроны и нашли 10 повреждений. Тепловая съёмка работает, её нужно проводить до аварии.",
    },
  },
  photo: {
    alt: "Ночной заснеженный двор между панельными домами: вдоль подземной трубы снег растаял полосой, из люка поднимается пар",
    caption:
      "Иллюстрация. Над трубой с утечкой снег тает полосой, а из камеры идёт пар. Тепловизор замечает такие места с проезжающей машины.",
  },
  how: {
    label: "Как это работает",
    title: "Камера едет туда, где проходят сети",
    steps: [
      {
        title: "Камера на технике",
        text: "Тепловизор-приставку к телефону ставим на мусоровоз или снегоуборочную машину. Мусоровоз заезжает почти в каждый двор, а внутриквартальные сети проходят как раз там.",
      },
      {
        title: "Запись маршрута",
        text: "Телефон записывает тепловые кадры и GPS-координаты, лица и номера машин размываются прямо на устройстве.",
      },
      { title: "Поиск аномалий", text: "Модель находит проталины, тёплые полосы вдоль трассы и пар над камерами." },
      { title: "Карта и рейтинг", text: "Аномалии наносим на карту и сортируем по риску и объёму потерь тепла." },
      {
        title: "Список для бригад",
        text: "Акимат и теплосети получают список участков для раскопки и выгрузку в свою ГИС.",
      },
    ],
    aside:
      "Позже можно добавить термометры Tuya в квартирах. Скан сети показывает, где тепло теряется, а термометры покажут, где его не хватает жильцам.",
  },
  systems: {
    label: "Связь с системами акимата",
    title: `У акимата есть карта аварий и${nb}двойник узлов. Jylu${nb}добавляет трубу между ними`,
    rows: { owner: "Кто ведёт", shows: "Что показывает", when: "Когда срабатывает" },
    items: [
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
    ],
    facts: "Данные Jylu выгружаются в РГИС и в цифровой двойник, сами системы менять не нужно.",
    nums: [
      { value: "460 га", text: "Второго Павлодара уже оцифрованы в РГИС" },
      { value: "49", text: "улиц" },
      { value: "1368", text: "подключений теплоснабжения" },
    ],
  },
  now: {
    label: "Почему сейчас",
    title: "В 2026 году совпали четыре условия",
    items: [
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
    ],
  },
  cycle: {
    label: "Годовой цикл",
    title: `Зимой собираем данные, летом по${nb}ним ремонтируют`,
    items: [
      { when: "Октябрь — апрель", what: "Скан с коммунальной техники" },
      { when: "Конец апреля", what: "Рейтинг участков: где менять первым" },
      { when: "Май", what: "Опрессовка проверяет прогноз" },
      { when: "Май — сентябрь", what: "Ремонт по списку" },
    ],
    model: [
      "Результаты каждой опрессовки идут в обучение модели, и к следующей зиме прогноз становится точнее.",
      "Платят теплосети и акимат: годовая подписка за километр сети. Пилот бесплатный, затем сервисный договор или ГЧП.",
    ],
  },
  pilot: {
    label: "Пилот",
    title: "Второй Павлодар, отопительный сезон 2026–2027",
    intro:
      "Сети Второго Павлодара уже оцифрованы в РГИС, поэтому результаты скана сразу ложатся на схему.",
    need: {
      title: "Что нужно от акимата",
      items: [
        "3 единицы коммунальной техники на отопительный сезон под датчики",
        "Слой сетей Второго Павлодара из РГИС",
        "Точка интеграции с ситуационно-аналитическим центром",
      ],
    },
    get: {
      title: "Что получит акимат",
      items: [
        { when: "Декабрь — март", what: "Регулярный скан и карта аномалий онлайн" },
        { when: "Апрель", what: "Рейтинг участков с оценкой потерь" },
        { when: "Май", what: "Сверка с результатами весенней опрессовки" },
      ],
    },
    aside: "Результат проверяется независимо: опрессовку проводят сами теплосети.",
  },
  faq: {
    label: "Вопросы",
    title: "Что обычно спрашивают",
    items: [
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
    ],
  },
  cta: { title: `Начнём с${nb}одного района этой${nb}зимой`, button: "Написать нам" },
  footer: {
    sources: "Источники",
    legal: { privacy: "Конфиденциальность", terms: "Условия использования", cookies: "Cookie" },
    legalLabel: "Документы",
    tagline: "жылу — «тепло» по-казахски",
    place: "Павлодар, 2026",
  },
  cookie: {
    label: "Уведомление о cookie",
    text: "Сайт хранит в браузере только выбор темы и языка. Аналитики и рекламных cookie нет.",
    ok: "Понятно",
    more: "Подробнее",
  },
  legal: { back: "На главную", updated: "Редакция от 6 ноября 2026 года" },
};

const en: Dict = {
  meta: {
    title: "Jylu — thermal surveys of heating networks",
    description:
      "A thermal camera on municipal vehicles finds leaking heating network sections before they fail. Pilot in Second Pavlodar, Kazakhstan.",
  },
  nav: {
    how: "How it works",
    systems: "Systems",
    cycle: "Cycle",
    faq: "Questions",
    pilot: "Pilot",
    menu: "Menu",
    home: "Jylu home",
    sections: "Sections",
    theme: "Switch theme",
    language: "Language",
  },
  hero: {
    kicker: "Pavlodar, pilot for the 2026–2027 heating season",
    title: `We find heating leaks before the${nb}pipes${nb}fail`,
    lead: "Above a leaking pipe, snow melts and the ground warms up. A thermal camera on municipal vehicles records this all heating season, and we rank pipe sections by risk.",
    primary: "Discuss the pilot",
    secondary: "How it works",
    caption: "Background: thermal frame, illustration",
  },
  stats: {
    items: [
      { value: "78.2%", label: "heating network wear in Pavlodar Region" },
      { value: "88.6%", label: "wear in Ekibastuz" },
      { value: "1,438 km", label: "of heating networks in the region" },
      { value: "30–35 km", label: "repaired per year" },
    ],
    note: "Sources: Zakon.kz (July 2026), BES.media",
  },
  problem: {
    label: "The problem",
    title: "The networks wear out faster than they can be replaced",
    p1: "Pavlodar Region has the most worn-out heating networks in the country. At the current pace of repairs, replacing them all would take more than 40 years.",
    p2: "Replacing everything at once is not possible. The question is which 30 km out of 1,438 to replace first, and how to justify that choice.",
    incident: {
      date: "27.11.2022",
      title: "Ekibastuz",
      text: "One night the heating mains burst, the boilers at the power plant stopped, and the city was left without heating at minus 30. In the morning drones went up and found 10 points of damage. Thermal imaging works. It just has to happen before the failure.",
    },
  },
  photo: {
    alt: "A snowy courtyard between panel apartment blocks at night: snow has melted in a strip along an underground pipe and steam rises from a manhole",
    caption:
      "Illustration. Above a leaking pipe, snow melts in a strip and steam rises from the chamber. A thermal camera spots places like this from a passing vehicle.",
  },
  how: {
    label: "How it works",
    title: "The camera goes where the pipes run",
    steps: [
      {
        title: "Camera on the truck",
        text: "We mount a thermal camera attachment for a phone on a garbage truck or snowplough. Garbage trucks enter almost every courtyard, and that is where the in-block pipes run.",
      },
      {
        title: "Route recording",
        text: "The phone records thermal frames and GPS coordinates. Faces and licence plates are blurred on the device.",
      },
      {
        title: "Finding anomalies",
        text: "The model finds melted patches, warm strips along the pipeline and steam above chambers.",
      },
      { title: "Map and ranking", text: "We put the anomalies on a map and rank them by risk and heat loss." },
      {
        title: "List for repair crews",
        text: "The akimat (local administration) and the heating utility get a list of sections to dig up and an export for their GIS.",
      },
    ],
    aside:
      "Later we can add Tuya thermometers in apartments. The network scan shows where heat is lost, and the thermometers will show where residents don't get enough of it.",
  },
  systems: {
    label: "How it fits the akimat's systems",
    title: `The akimat has an incident map and a${nb}twin of the nodes. Jylu${nb}adds the pipe in between`,
    rows: { owner: "Run by", shows: "Shows", when: "Triggers" },
    items: [
      {
        name: "RGIS duty map",
        sub: "“Emergency and repair works” module",
        owner: "Regional akimat",
        shows: "Where an incident or repair is, SMS alerts to residents",
        when: "After an incident",
      },
      {
        name: "Digital twin",
        sub: "of the heat supply system",
        owner: "Pavlodar Heating Networks LLP",
        shows: "Readings at heating substations and network end points",
        when: "When readings are already out of range",
      },
      {
        name: "Jylu",
        sub: "thermal survey",
        owner: "Us",
        shows: "Pipe condition along the full length between nodes",
        when: "Before an incident",
        accent: true,
      },
    ],
    facts: "Jylu data is exported to RGIS and to the digital twin. The systems themselves stay as they are.",
    nums: [
      { value: "460 ha", text: "of Second Pavlodar already digitised in RGIS" },
      { value: "49", text: "streets" },
      { value: "1,368", text: "heat supply connections" },
    ],
  },
  now: {
    label: "Why now",
    title: "In 2026, four conditions came together",
    items: [
      {
        title: "The networks now belong to the city",
        text: "In January 2026, CAEPCO handed Pavlodar Heating Networks LLP over to the state free of charge. Its owner is now the housing and utilities department of the Pavlodar akimat, which bears the cost of failures.",
      },
      {
        title: "The money is allocated",
        text: "Around 13 trillion tenge is earmarked for modernising energy and utility networks until 2029. Funding goes to specific projects, so an application needs a section-by-section justification.",
      },
      {
        title: "Digitalisation is a priority",
        text: "2026 has been declared the Year of Digitalisation and AI. The regional akimat plans to connect successful utility projects to its situation and analytics centre.",
      },
      {
        title: "Wear has started to decline",
        text: "For the first time in 30 years, heating network wear in the region is expected to go down. Jylu helps direct repair money to where it is needed most.",
      },
    ],
  },
  cycle: {
    label: "The yearly cycle",
    title: `We collect data in winter, repairs follow in${nb}summer`,
    items: [
      { when: "October — April", what: "Scanning from municipal vehicles" },
      { when: "End of April", what: "Section ranking: what to replace first" },
      { when: "May", what: "Pressure testing checks the forecast" },
      { when: "May — September", what: "Repairs from the list" },
    ],
    model: [
      "The results of every pressure test go into training the model, so the forecast is more accurate by the next winter.",
      "The heating utility and the akimat pay an annual subscription per kilometre of network. The pilot is free, followed by a service contract or a PPP.",
    ],
  },
  pilot: {
    label: "Pilot",
    title: "Second Pavlodar, heating season 2026–2027",
    intro:
      "The Second Pavlodar networks are already digitised in RGIS, so scan results land straight on the network map.",
    need: {
      title: "What we need from the akimat",
      items: [
        "3 municipal vehicles for the heating season to carry the sensors",
        "The Second Pavlodar network layer from RGIS",
        "An integration point with the situation and analytics centre",
      ],
    },
    get: {
      title: "What the akimat gets",
      items: [
        { when: "December — March", what: "Regular scanning and an online anomaly map" },
        { when: "April", what: "Section ranking with heat loss estimates" },
        { when: "May", what: "Comparison with the spring pressure test results" },
      ],
    },
    aside: "The result is verified independently: the heating utility runs the pressure tests itself.",
  },
  faq: {
    label: "Questions",
    title: "What people usually ask",
    items: [
      {
        q: "What about summer?",
        a: "In summer the heating utility repairs the sections on our list, and pressure testing shows how accurate the forecast was. Meanwhile the camera can look for potholes and broken streetlights.",
      },
      {
        q: "We already have a digital twin",
        a: "The twin sees readings at heating substations. We look at the pipe between them.",
      },
      {
        q: "The twin can predict failures from its sensors",
        a: "From the twin's sensors, risk can only be estimated indirectly, from pipe age and pressure. We add direct observation of the pipe itself, and together the forecast is more accurate.",
      },
      {
        q: "Sensors will show where the leak is anyway",
        a: "A sensor shows the value at its own point, not where the leak is. A small leak keeps readings within range until frost turns it into a burst.",
      },
      {
        q: "Why not drones or satellites?",
        a: "A drone or a satellite gives a one-off image. A vehicle passes the same courtyards regularly, and the survey costs almost nothing.",
      },
      {
        q: "Where is the data stored?",
        a: "On servers in Kazakhstan. Faces and licence plates are blurred on the phone.",
      },
      {
        q: "How can we buy this?",
        a: "The pilot is free, then a service contract or a PPP. Pavlodar has used a similar model before: the supplier installed equipment at its own expense and the city paid over 3–5 years.",
      },
    ],
  },
  cta: { title: "Let's start with one district this winter", button: "Write to us" },
  footer: {
    sources: "Sources",
    legal: { privacy: "Privacy", terms: "Terms of use", cookies: "Cookies" },
    legalLabel: "Legal",
    tagline: "jylu means “warmth” in Kazakh",
    place: "Pavlodar, 2026",
  },
  cookie: {
    label: "Cookie notice",
    text: "This site stores only your theme and language choice in your browser. No analytics or advertising cookies.",
    ok: "Got it",
    more: "Learn more",
  },
  legal: { back: "Back to home", updated: "Last updated 6 November 2026" },
};

const kz: Dict = {
  meta: {
    title: "Jylu — жылу желілерін тепловизиялық түсіру",
    description:
      "Коммуналдық техникаға орнатылған тепловизор жылу желісіндегі ағып кетулерді апатқа дейін табады. Пилоттық жоба Екінші Павлодарда.",
  },
  nav: {
    how: "Қалай жұмыс істейді",
    systems: "Жүйелер",
    cycle: "Цикл",
    faq: "Сұрақтар",
    pilot: "Пилот",
    menu: "Мәзір",
    home: "Jylu — басты бет",
    sections: "Бөлімдер",
    theme: "Тақырыпты ауыстыру",
    language: "Тіл",
  },
  hero: {
    kicker: "Павлодар, 2026–2027 жылыту маусымындағы пилоттық жоба",
    title: `Жылу желісіндегі ағып кетулерді апатқа${nb}дейін табамыз`,
    lead: "Ағып тұрған құбырдың үстінде қар ериді, топырақ жылиды. Коммуналдық техникаға орнатылған тепловизор мұны бүкіл жылыту маусымы бойы түсіреді, ал біз учаскелерді тәуекел деңгейіне қарай сұрыптаймыз.",
    primary: "Пилотты талқылау",
    secondary: "Қалай жұмыс істейді",
    caption: "Фон: жылулық кадр, иллюстрация",
  },
  stats: {
    items: [
      { value: "78,2%", label: "Павлодар облысындағы жылу желілерінің тозуы" },
      { value: "88,6%", label: "Екібастұздағы тозу" },
      { value: "1438 км", label: "облыстағы жылу желілері" },
      { value: "30–35 км", label: "жылына жөнделеді" },
    ],
    note: "Дереккөздер: Zakon.kz (2026 жылғы шілде), BES.media",
  },
  problem: {
    label: "Мәселе",
    title: "Желілер оларды ауыстырып үлгергеннен тезірек тозып жатыр",
    p1: "Павлодар облысында жылу желілерінің тозуы елдегі ең жоғары деңгейде. Қазіргі жөндеу қарқынымен желілерді толық ауыстыруға 40 жылдан астам уақыт кетеді.",
    p2: "Бәрін бірден ауыстыру мүмкін емес. 1438 шақырымның қай 30 шақырымын бірінші ауыстыру керегін шешіп, бұл таңдауды негіздей білу қажет.",
    incident: {
      date: "27.11.2022",
      title: "Екібастұз",
      text: "Түнде жылу желілері жарылып, ЖЭО-дағы қазандықтар тоқтады, қала отыз градустық аязда жылусыз қалды. Таңертең дрондар ұшырылып, 10 зақым табылды. Тепловизиялық түсірілім нәтиже береді, оны тек апатқа дейін жүргізу керек.",
    },
  },
  photo: {
    alt: "Түнгі қарлы аула, панельді үйлердің арасы: жер астындағы құбыр бойымен қар жолақ болып еріген, құдықтан бу көтеріліп тұр",
    caption:
      "Иллюстрация. Ағып тұрған құбырдың үстінде қар жолақ болып ериді, ал жылу камерасынан бу шығады. Тепловизор мұндай жерлерді жүріп бара жатқан көліктен байқайды.",
  },
  how: {
    label: "Қалай жұмыс істейді",
    title: "Камера желілер өтетін жерге барады",
    steps: [
      {
        title: "Техникадағы камера",
        text: "Телефонға арналған тепловизор-қондырманы қоқыс таситын немесе қар тазалайтын көлікке орнатамыз. Қоқыс көлігі әр аулаға дерлік кіреді, ал квартал ішіндегі желілер дәл сол жерден өтеді.",
      },
      {
        title: "Маршрутты жазу",
        text: "Телефон жылулық кадрлар мен GPS-координаттарды жазады. Адамдардың беті мен көлік нөмірлері құрылғының өзінде бұлдыратылады.",
      },
      {
        title: "Аномалияларды іздеу",
        text: "Модель қар еріген жерлерді, трасса бойындағы жылы жолақтарды және камералардың үстіндегі буды табады.",
      },
      {
        title: "Карта және рейтинг",
        text: "Аномалияларды картаға түсіріп, тәуекел мен жылу шығынының көлемі бойынша сұрыптаймыз.",
      },
      {
        title: "Бригадаларға тізім",
        text: "Әкімдік пен жылу желілері қазып тексеретін учаскелер тізімін және өз ГАЖ-ына арналған экспортты алады.",
      },
    ],
    aside:
      "Кейін пәтерлерге Tuya термометрлерін қосуға болады. Желіні сканерлеу жылудың қайда жоғалатынын көрсетеді, ал термометрлер тұрғындарға жылу қайда жетпейтінін көрсетеді.",
  },
  systems: {
    label: "Әкімдік жүйелерімен байланыс",
    title: `Әкімдікте апаттар картасы мен тораптардың цифрлық егізі бар. Jylu${nb}олардың арасындағы құбырды қосады`,
    rows: { owner: "Кім жүргізеді", shows: "Нені көрсетеді", when: "Қашан іске қосылады" },
    items: [
      {
        name: "РГИС кезекші картасы",
        sub: "«Апаттық-жөндеу жұмыстары» модулі",
        owner: "Облыс әкімдігі",
        shows: "Апат немесе жөндеу қайда, тұрғындарға SMS",
        when: "Апаттан кейін",
      },
      {
        name: "Цифрлық егіз",
        sub: "жылумен жабдықтау жүйесі",
        owner: "«Павлодар жылу желілері» ЖШС",
        shows: "Жылу пункттеріндегі және желінің соңғы нүктелеріндегі көрсеткіштер",
        when: "Көрсеткіштер нормадан шығып кеткенде",
      },
      {
        name: "Jylu",
        sub: "тепловизиялық түсірілім",
        owner: "Біз",
        shows: "Тораптар арасындағы құбырдың бүкіл ұзындығы бойынша жай-күйі",
        when: "Апатқа дейін",
        accent: true,
      },
    ],
    facts: "Jylu деректері РГИС-ке және цифрлық егізге жүктеледі, жүйелердің өзін өзгертудің қажеті жоқ.",
    nums: [
      { value: "460 га", text: "Екінші Павлодар аумағы РГИС-те цифрландырылған" },
      { value: "49", text: "көше" },
      { value: "1368", text: "жылумен жабдықтауға қосылу" },
    ],
  },
  now: {
    label: "Неге дәл қазір",
    title: "2026 жылы төрт жағдай тұспа-тұс келді",
    items: [
      {
        title: "Желілер қалаға өтті",
        text: "2026 жылғы қаңтарда ЦАЭК «Павлодар жылу желілері» ЖШС-ін мемлекетке тегін берді. Енді меншік иесі Павлодар қаласы әкімдігінің ТКШ бөлімі, апаттардың шығынын әкімдік көтереді.",
      },
      {
        title: "Қаржы бөлінді",
        text: "2029 жылға дейін энергетика мен коммуналдық желілерді жаңғыртуға шамамен 13 трлн теңге қарастырылған. Қаржы нақты жобаларға беріледі, сондықтан өтінімге учаскелер бойынша негіздеме қажет.",
      },
      {
        title: "Цифрландыру басымдықта",
        text: "2026 жыл Цифрландыру және жасанды интеллект жылы болып жарияланды. Облыс әкімдігі коммуналдық қызметтердің сәтті жобаларын ситуациялық-талдау орталығына қосуды жоспарлап отыр.",
      },
      {
        title: "Тозу азая бастады",
        text: "Облыста 30 жылда алғаш рет жылу желілерінің тозуы төмендейді деп күтілуде. Jylu жөндеу қаржысын ең қажет жерге бағыттауға көмектеседі.",
      },
    ],
  },
  cycle: {
    label: "Жылдық цикл",
    title: `Қыста деректер жинаймыз, жазда соларға сүйеніп${nb}жөндейді`,
    items: [
      { when: "Қазан — сәуір", what: "Коммуналдық техникадан сканерлеу" },
      { when: "Сәуірдің соңы", what: "Учаскелер рейтингі: алдымен нені ауыстыру керек" },
      { when: "Мамыр", what: "Гидравликалық сынау болжамды тексереді" },
      { when: "Мамыр — қыркүйек", what: "Тізім бойынша жөндеу" },
    ],
    model: [
      "Әр гидравликалық сынаудың нәтижелері модельді оқытуға жіберіледі, сондықтан келесі қысқа қарай болжам дәлірек болады.",
      "Жылу желілері мен әкімдік төлейді: желінің әр шақырымы үшін жылдық жазылым. Пилоттық жоба тегін, кейін сервистік келісімшарт немесе МЖӘ.",
    ],
  },
  pilot: {
    label: "Пилот",
    title: "Екінші Павлодар, 2026–2027 жылыту маусымы",
    intro:
      "Екінші Павлодардың желілері РГИС-те цифрландырылған, сондықтан сканерлеу нәтижелері бірден сызбаға түседі.",
    need: {
      title: "Әкімдіктен не қажет",
      items: [
        "Жылыту маусымына датчиктер орнату үшін 3 бірлік коммуналдық техника",
        "РГИС-тен Екінші Павлодар желілерінің қабаты",
        "Ситуациялық-талдау орталығымен интеграция нүктесі",
      ],
    },
    get: {
      title: "Әкімдік не алады",
      items: [
        { when: "Желтоқсан — наурыз", what: "Тұрақты сканерлеу және онлайн аномалиялар картасы" },
        { when: "Сәуір", what: "Шығыны бағаланған учаскелер рейтингі" },
        { when: "Мамыр", what: "Көктемгі гидравликалық сынау нәтижелерімен салыстыру" },
      ],
    },
    aside: "Нәтиже тәуелсіз тексеріледі: гидравликалық сынауды жылу желілерінің өзі жүргізеді.",
  },
  faq: {
    label: "Сұрақтар",
    title: "Жиі қойылатын сұрақтар",
    items: [
      {
        q: "Ал жазда ше?",
        a: "Жазда жылу желілері біздің тізімдегі учаскелерді жөндейді, ал гидравликалық сынау болжамның қаншалықты дәл болғанын көрсетеді. Бұл уақытта камера жолдағы шұңқырлар мен жанбай тұрған шамдарды іздей алады.",
      },
      {
        q: "Бізде цифрлық егіз бар ғой",
        a: "Егіз жылу пункттеріндегі көрсеткіштерді көреді. Біз олардың арасындағы құбырды қараймыз.",
      },
      {
        q: "Егіз датчиктер арқылы қай жер жарылатынын өзі болжайды",
        a: "Егіздің датчиктері бойынша тәуекелді тек жанама түрде, құбырдың жасы мен қысымы бойынша бағалауға болады. Біз құбырдың өзін тікелей бақылауды қосамыз, бірге болжам дәлірек болады.",
      },
      {
        q: "Датчик ағып кетудің қай жерде екенін бәрібір көрсетеді",
        a: "Датчик өз нүктесіндегі мәнді көрсетеді, ағып кетудің орнын емес. Шағын ағу аязда жарылысқа айналғанға дейін көрсеткіштерді нормадан шығармайды.",
      },
      {
        q: "Неге дрондар немесе спутник емес?",
        a: "Дрон немесе спутник бір реттік сурет береді. Көлік бір аулалардан тұрақты өтеді, ал түсірілім шығыны өте аз.",
      },
      {
        q: "Деректер қайда сақталады?",
        a: "Қазақстандағы серверлерде. Адамдардың беті мен көлік нөмірлері телефонның өзінде бұлдыратылады.",
      },
      {
        q: "Мұны қалай сатып аламыз?",
        a: "Пилоттық жоба тегін, кейін сервистік келісімшарт немесе МЖӘ. Павлодарда бұған ұқсас схема болған: жеткізуші жабдықты өз есебінен орнатып, қала 3–5 жыл бойы төлеген.",
      },
    ],
  },
  cta: { title: "Осы қыста бір аудандан бастайық", button: "Бізге жазыңыз" },
  footer: {
    sources: "Дереккөздер",
    legal: { privacy: "Құпиялылық", terms: "Пайдалану шарттары", cookies: "Cookie" },
    legalLabel: "Құжаттар",
    tagline: "Атауы «жылу» сөзінен",
    place: "Павлодар, 2026",
  },
  cookie: {
    label: "Cookie туралы хабарлама",
    text: "Сайт браузерде тек тақырып пен тіл таңдауын сақтайды. Аналитикалық және жарнамалық cookie жоқ.",
    ok: "Түсінікті",
    more: "Толығырақ",
  },
  legal: { back: "Басты бетке", updated: "2026 жылғы 6 қарашадағы редакция" },
};

export const dict: Record<Lang, Dict> = { ru, en, kz };
