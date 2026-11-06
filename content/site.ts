import type { Lang } from "./i18n";

// TODO: заменить на настоящий адрес
export const CONTACT_EMAIL = "hello@jylu.kz";

/** Public address of the site, e.g. https://jylu.kz. Enables canonical, hreflang and og:image. */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || undefined;

export const SOURCES: { url: string; title: Record<Lang, string> }[] = [
  {
    url: "https://bizmedia.kz/2022-11-27-na-ekibastuzskom-tecz-proizoshla-avariya/",
    title: {
      ru: "Bizmedia — авария на Экибастузской ТЭЦ, 27.11.2022",
      kz: "Bizmedia — Екібастұз ЖЭО-ындағы апат, 27.11.2022",
      en: "Bizmedia — accident at the Ekibastuz power plant, 27.11.2022",
    },
  },
  {
    url: "https://informburo.kz/fotoreportazh/zdes-sever-zima-ne-proshhaet-takix-osibok-kak-vlasti-dopustili-cto-ekibastuzcy-cut-ne-zamyorzli-v-svoix-domax",
    title: {
      ru: "Informburo — прорыв теплосетей Экибастуза",
      kz: "Informburo — Екібастұз жылу желілерінің жарылуы",
      en: "Informburo — the Ekibastuz heating network failure",
    },
  },
  {
    url: "https://forbes.kz/articles/avariya_na_tets_v_ekibastuze/amp",
    title: {
      ru: "Forbes.kz — дроны нашли 10 повреждений",
      kz: "Forbes.kz — дрондар 10 зақым тапты",
      en: "Forbes.kz — drones found 10 points of damage",
    },
  },
  {
    url: "https://bes.media/news/na-rekonstruktsiyu-teplosetey-v-pavlodarskoy-oblasti-videlili-9-mlrd-tenge-na-chto-etih-deneg-hvatilo/",
    title: {
      ru: "BES.media — 1438 км сетей и темп ремонта",
      kz: "BES.media — 1438 км желі және жөндеу қарқыны",
      en: "BES.media — 1,438 km of networks and the pace of repairs",
    },
  },
  {
    url: "https://www.zakon.kz/obshestvo/6523642-v-pavlodarskoy-oblasti-vpervye-za-30-let-nachali-snizhat-iznos-kommunalnykh-setey.html",
    title: {
      ru: "Zakon.kz — износ 78,2% и 88,6%, июль 2026",
      kz: "Zakon.kz — тозу 78,2% және 88,6%, 2026 жылғы шілде",
      en: "Zakon.kz — wear of 78.2% and 88.6%, July 2026",
    },
  },
  {
    url: "https://forbes.kz/articles/13-trln-tenge-do-2029-goda-vydelyat-na-modernizatsiyu-kommunalnyh-setey-kazahstana-ff08be",
    title: {
      ru: "Forbes.kz — 13 трлн тенге до 2029 года",
      kz: "Forbes.kz — 2029 жылға дейін 13 трлн теңге",
      en: "Forbes.kz — 13 trillion tenge until 2029",
    },
  },
  {
    url: "https://bes.media/news/v-2027-godu-na-modernizatsiyu-teplosetey-kazahstana-potratyat-pochti-74-mlrd-tenge/",
    title: {
      ru: "BES.media — финансирование по конкретным проектам",
      kz: "BES.media — нақты жобаларды қаржыландыру",
      en: "BES.media — funding goes to specific projects",
    },
  },
  {
    url: "https://pavlodarnews.kz/ru/kommunalnie-sluzhbi-pavlodara-budut-rabotat-interaktivno",
    title: {
      ru: "PavlodarNews — модуль РГИС и пилот во Втором Павлодаре",
      kz: "PavlodarNews — РГИС модулі және Екінші Павлодардағы пилот",
      en: "PavlodarNews — the RGIS module and the Second Pavlodar pilot",
    },
  },
  {
    url: "https://www.inform.kz/ru/tsifrovoy-dvoynik-dlyakontrolya-sistemi-teplosnabzheniya-vnedryayut-vpavlodare-afc5087c",
    title: {
      ru: "Kazinform — цифровой двойник теплоснабжения",
      kz: "Kazinform — жылумен жабдықтаудың цифрлық егізі",
      en: "Kazinform — the digital twin of the heat supply system",
    },
  },
  {
    url: "https://bes.media/news/tsaek-klebanova-i-kana-peredala-gosudarstvu-petropavlovskie-teplovie-seti/",
    title: {
      ru: "BES.media — передача теплосетей государству",
      kz: "BES.media — жылу желілерінің мемлекетке берілуі",
      en: "BES.media — heating networks handed over to the state",
    },
  },
  {
    url: "https://kapital.kz/business/148608/gosudarstvo-poluchilo-kontrol-nad-odnim-iz-aktivov-sergeya-kana-i-aleksandra-klebanova.html",
    title: {
      ru: "Kapital.kz — новый собственник теплосетей",
      kz: "Kapital.kz — жылу желілерінің жаңа иесі",
      en: "Kapital.kz — the new owner of the heating networks",
    },
  },
  {
    url: "https://www.gov.kz/memleket/entities/pavlodar/press/news/details/1162437?lang=ru",
    title: {
      ru: "Акимат области — цифровизация и ситуационный центр",
      kz: "Облыс әкімдігі — цифрландыру және ситуациялық орталық",
      en: "Regional akimat — digitalisation and the situation centre",
    },
  },
  {
    url: "https://astanahub.com/ru/article/ai-digital-bridge-2026-otkryvaet-kazakhstanskim-startapam-put-v-kremnievuiu-dolinu",
    title: {
      ru: "Astana Hub — Год цифровизации и ИИ",
      kz: "Astana Hub — Цифрландыру және жасанды интеллект жылы",
      en: "Astana Hub — the Year of Digitalisation and AI",
    },
  },
  {
    url: "https://kazpravda.kz/n/shkola-budushchego",
    title: {
      ru: "Казправда — ГЧП в «Smart Павлодар»",
      kz: "Казправда — «Smart Павлодар» жобасындағы МЖӘ",
      en: "Kazpravda — the PPP behind “Smart Pavlodar”",
    },
  },
  {
    url: "https://silkwaytv.kz/en/unified-drone-infrastructure-being-created-in-akmola-region_53230",
    title: {
      ru: "Silkway TV — дроны для теплосетей в Акмолинской области",
      kz: "Silkway TV — Ақмола облысында жылу желілеріне арналған дрондар",
      en: "Silkway TV — drones for heating networks in Akmola Region",
    },
  },
  {
    url: "https://informburo.kz/novosti/teplopoteri-astany-zapechatleli-iz-kosmosa.html",
    title: {
      ru: "Informburo — тепловая съёмка Астаны из космоса",
      kz: "Informburo — Астананың ғарыштан түсірілген жылулық суреті",
      en: "Informburo — thermal imaging of Astana from space",
    },
  },
];
