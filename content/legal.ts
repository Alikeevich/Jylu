import type { Lang, LegalKey } from "./i18n";

/**
 * Legal texts. Inline syntax inside strings:
 *   {email}            → the contact email as a link
 *   [label](cookies)   → a link to another legal page (privacy | terms | cookies)
 *
 * These are a starting point written for an informational site without forms
 * or analytics. Have them checked by a lawyer and add the operator's legal
 * details (ИП/ТОО, БИН, address) before the site goes public.
 */
export type Block = string | { list: string[] } | { keys: [string, string][] };
export interface LegalSection {
  h: string;
  body: Block[];
}
export interface LegalDoc {
  title: string;
  description: string;
  sections: LegalSection[];
}

const ru: Record<LegalKey, LegalDoc> = {
  privacy: {
    title: "Политика конфиденциальности",
    description: "Как сайт Jylu обращается с персональными данными.",
    sections: [
      {
        h: "Кто обрабатывает данные",
        body: [
          "Сайт проекта Jylu (далее — сайт) принадлежит команде Jylu (далее — мы). По вопросам персональных данных пишите на {email}.",
        ],
      },
      {
        h: "Какие данные мы получаем",
        body: [
          "На сайте нет форм, регистрации и аналитики. Мы получаем ваши данные, только если вы сами пишете нам на почту: адрес электронной почты, имя и другие сведения, которые вы укажете в письме.",
          "Хостинг-провайдер сайта может автоматически записывать технические данные запросов, например IP-адрес и время обращения. Мы не используем эти данные, чтобы установить личность посетителей.",
        ],
      },
      {
        h: "Зачем мы их используем",
        body: [
          "Чтобы ответить на ваше письмо и обсудить пилотный проект или сотрудничество. Мы не используем данные для рекламы и рассылок без вашего согласия.",
        ],
      },
      {
        h: "Кому мы передаём данные",
        body: [
          "Мы не продаём и не передаём ваши данные третьим лицам. Исключения — почтовый сервис, через который приходит письмо, и случаи, предусмотренные законодательством Республики Казахстан.",
        ],
      },
      {
        h: "Сколько мы их храним",
        body: [
          "Мы храним переписку, пока она нужна для ответа и сотрудничества, и удаляем её по вашему запросу, если закон не требует хранить её дольше.",
        ],
      },
      {
        h: "Данные в браузере",
        body: [
          "Сайт сохраняет в вашем браузере выбор темы и языка, а также отметку о том, что вы закрыли уведомление. Подробнее в [Политике cookie](cookies).",
        ],
      },
      {
        h: "Ваши права",
        body: [
          "По Закону Республики Казахстан «О персональных данных и их защите» вы можете узнать, какие ваши данные у нас есть, попросить исправить или удалить их и отозвать согласие на обработку. Для этого напишите на {email}, мы ответим в сроки, установленные законом.",
        ],
      },
      {
        h: "Изменения",
        body: [
          "Мы можем обновлять эту политику. Новая редакция действует с момента публикации на сайте, дата редакции указана вверху страницы.",
        ],
      },
    ],
  },
  terms: {
    title: "Условия использования",
    description: "Правила использования сайта Jylu и его материалов.",
    sections: [
      {
        h: "О сайте",
        body: [
          "Сайт рассказывает о проекте Jylu: тепловой съёмке теплосетей с коммунальной техники и пилотном проекте в Павлодаре. Сайт носит информационный характер и не является публичной офертой.",
        ],
      },
      {
        h: "Материалы сайта",
        body: [
          "Тексты, видео, изображения и оформление сайта принадлежат команде Jylu, если не указано иное. Изображения и видео, отмеченные как иллюстрации, условные и не являются результатами реальной съёмки.",
        ],
      },
      {
        h: "Цифры и источники",
        body: [
          "Статистика на сайте взята из открытых источников, ссылки на них приведены внизу главной страницы. Мы стараемся проверять данные, но не гарантируем их полноту и актуальность.",
        ],
      },
      {
        h: "Как можно использовать материалы",
        body: [
          "Материалы сайта можно цитировать со ссылкой на источник. Нельзя выдавать их за свои, изменять так, чтобы исказить смысл, или использовать, чтобы ввести кого-то в заблуждение.",
        ],
      },
      {
        h: "Ссылки на другие сайты",
        body: [
          "Сайт ссылается на сторонние ресурсы. Мы не отвечаем за их содержание и правила обработки данных.",
        ],
      },
      {
        h: "Ответственность",
        body: [
          "Сайт предоставляется «как есть». Мы не отвечаем за решения, принятые только на основе информации с сайта, и за его временную недоступность.",
        ],
      },
      {
        h: "Применимое право",
        body: ["Эти условия регулируются законодательством Республики Казахстан."],
      },
      {
        h: "Изменения и связь",
        body: ["Мы можем обновлять эти условия. Вопросы присылайте на {email}."],
      },
    ],
  },
  cookies: {
    title: "Политика cookie",
    description: "Что сайт Jylu хранит в вашем браузере.",
    sections: [
      {
        h: "Что это",
        body: [
          "Cookie и похожие технологии, например локальное хранилище браузера, позволяют сайту запоминать ваши настройки между посещениями.",
        ],
      },
      {
        h: "Что хранит наш сайт",
        body: [
          {
            keys: [
              ["jylu-theme", "выбранная тема, светлая или тёмная"],
              ["jylu-lang", "выбранный язык"],
              ["jylu-notice", "отметка о том, что вы закрыли уведомление о cookie"],
            ],
          },
          "Эти записи хранятся только в вашем браузере и не передаются нам.",
        ],
      },
      {
        h: "Чего на сайте нет",
        body: [
          "Аналитических, рекламных и сторонних cookie. Шрифты, изображения и видео загружаются с того же сервера, что и сайт.",
        ],
      },
      {
        h: "Как удалить записи",
        body: [
          "Удалите данные сайта в настройках браузера. После этого сайт снова покажет уведомление и будет использовать тему вашего устройства.",
        ],
      },
      {
        h: "Изменения",
        body: [
          "Если мы добавим аналитику или другие cookie, мы обновим эту политику и попросим ваше согласие там, где это требуется.",
        ],
      },
    ],
  },
};

const en: Record<LegalKey, LegalDoc> = {
  privacy: {
    title: "Privacy policy",
    description: "How the Jylu website handles personal data.",
    sections: [
      {
        h: "Who processes the data",
        body: [
          "The Jylu project website (the site) belongs to the Jylu team (we, us). For any questions about personal data, write to {email}.",
        ],
      },
      {
        h: "What data we receive",
        body: [
          "The site has no forms, accounts or analytics. We receive your data only if you email us yourself: your email address, your name and anything else you include in the message.",
          "The site's hosting provider may automatically log technical request data, such as your IP address and the time of access. We do not use this data to identify visitors.",
        ],
      },
      {
        h: "Why we use it",
        body: [
          "To reply to your message and discuss the pilot or other cooperation. We do not use your data for advertising or mailings without your consent.",
        ],
      },
      {
        h: "Who we share it with",
        body: [
          "We do not sell your data or pass it to third parties. The exceptions are the email service your message passes through and cases required by the law of the Republic of Kazakhstan.",
        ],
      },
      {
        h: "How long we keep it",
        body: [
          "We keep correspondence while we need it to reply and to work together, and delete it at your request unless the law requires us to keep it longer.",
        ],
      },
      {
        h: "Data in your browser",
        body: [
          "The site stores your theme and language choice in your browser, along with a note that you closed the notice. See the [cookie policy](cookies) for details.",
        ],
      },
      {
        h: "Your rights",
        body: [
          "Under the Law of the Republic of Kazakhstan “On Personal Data and Their Protection”, you can find out what data we hold about you, ask us to correct or delete it, and withdraw your consent to its processing. To do so, write to {email}. We will reply within the time limits set by law.",
        ],
      },
      {
        h: "Changes",
        body: [
          "We may update this policy. A new version takes effect when it is published on the site. The date of the current version is shown at the top of the page.",
        ],
      },
    ],
  },
  terms: {
    title: "Terms of use",
    description: "Rules for using the Jylu website and its materials.",
    sections: [
      {
        h: "About the site",
        body: [
          "The site describes the Jylu project: thermal surveys of heating networks from municipal vehicles and a pilot in Pavlodar. It is for information only and is not a public offer.",
        ],
      },
      {
        h: "Site materials",
        body: [
          "Unless stated otherwise, the texts, videos, images and design of the site belong to the Jylu team. Images and videos marked as illustrations are conceptual and are not results of real surveys.",
        ],
      },
      {
        h: "Figures and sources",
        body: [
          "Statistics on the site come from public sources, linked at the bottom of the home page. We try to check the data but do not guarantee that it is complete or up to date.",
        ],
      },
      {
        h: "Using the materials",
        body: [
          "You may quote materials from the site with a link to the source. You may not present them as your own, change them in a way that distorts their meaning, or use them to mislead anyone.",
        ],
      },
      {
        h: "Links to other sites",
        body: ["The site links to third-party resources. We are not responsible for their content or how they handle data."],
      },
      {
        h: "Liability",
        body: [
          "The site is provided “as is”. We are not liable for decisions made solely on the basis of information from the site, or for the site being temporarily unavailable.",
        ],
      },
      { h: "Governing law", body: ["These terms are governed by the law of the Republic of Kazakhstan."] },
      { h: "Changes and contact", body: ["We may update these terms. Send any questions to {email}."] },
    ],
  },
  cookies: {
    title: "Cookie policy",
    description: "What the Jylu website stores in your browser.",
    sections: [
      {
        h: "What cookies are",
        body: [
          "Cookies and similar technologies, such as the browser's local storage, let a site remember your settings between visits.",
        ],
      },
      {
        h: "What our site stores",
        body: [
          {
            keys: [
              ["jylu-theme", "the theme you chose, light or dark"],
              ["jylu-lang", "the language you chose"],
              ["jylu-notice", "a note that you closed the cookie notice"],
            ],
          },
          "These entries stay in your browser and are not sent to us.",
        ],
      },
      {
        h: "What the site does not use",
        body: [
          "Analytics, advertising or third-party cookies. Fonts, images and video load from the same server as the site.",
        ],
      },
      {
        h: "How to delete the entries",
        body: [
          "Clear the site's data in your browser settings. After that, the site will show the notice again and use your device's theme.",
        ],
      },
      {
        h: "Changes",
        body: [
          "If we add analytics or other cookies, we will update this policy and ask for your consent where it is required.",
        ],
      },
    ],
  },
};

const kz: Record<LegalKey, LegalDoc> = {
  privacy: {
    title: "Құпиялылық саясаты",
    description: "Jylu сайты дербес деректерді қалай өңдейді.",
    sections: [
      {
        h: "Деректерді кім өңдейді",
        body: [
          "Jylu жобасының сайты (бұдан әрі — сайт) Jylu командасына (бұдан әрі — біз) тиесілі. Дербес деректерге қатысты сұрақтар бойынша {email} мекенжайына жазыңыз.",
        ],
      },
      {
        h: "Қандай деректер аламыз",
        body: [
          "Сайтта нысандар, тіркелу және аналитика жоқ. Деректеріңізді сіз бізге электрондық поштамен өзіңіз жазғанда ғана аламыз: электрондық пошта мекенжайы, аты-жөні және хатта көрсеткен басқа мәліметтер.",
          "Сайттың хостинг-провайдері сұраныстардың техникалық деректерін, мысалы IP-мекенжай мен кіру уақытын автоматты түрде жазуы мүмкін. Біз бұл деректерді келушілердің жеке басын анықтау үшін пайдаланбаймыз.",
        ],
      },
      {
        h: "Оларды не үшін пайдаланамыз",
        body: [
          "Хатыңызға жауап беру және пилоттық жобаны немесе ынтымақтастықты талқылау үшін. Деректерді сіздің келісіміңізсіз жарнама мен таратылымдар үшін пайдаланбаймыз.",
        ],
      },
      {
        h: "Деректерді кімге береміз",
        body: [
          "Деректеріңізді сатпаймыз және үшінші тұлғаларға бермейміз. Ерекшеліктер: хат келетін пошта сервисі және Қазақстан Республикасының заңнамасында көзделген жағдайлар.",
        ],
      },
      {
        h: "Қанша уақыт сақтаймыз",
        body: [
          "Хат алмасуды жауап беру мен ынтымақтастық үшін қажет болғанша сақтаймыз және заң ұзағырақ сақтауды талап етпесе, сұрауыңыз бойынша жоямыз.",
        ],
      },
      {
        h: "Браузердегі деректер",
        body: [
          "Сайт браузеріңізде тақырып пен тіл таңдауын, сондай-ақ хабарламаны жапқаныңыз туралы белгіні сақтайды. Толығырақ [Cookie саясатында](cookies).",
        ],
      },
      {
        h: "Сіздің құқықтарыңыз",
        body: [
          "Қазақстан Республикасының «Дербес деректер және оларды қорғау туралы» Заңына сәйкес сіз бізде қандай деректеріңіз бар екенін біле аласыз, оларды түзетуді немесе жоюды сұрай аласыз және өңдеуге берген келісіміңізді кері қайтарып ала аласыз. Ол үшін {email} мекенжайына жазыңыз, біз заңда белгіленген мерзімде жауап береміз.",
        ],
      },
      {
        h: "Өзгерістер",
        body: [
          "Біз бұл саясатты жаңартуымыз мүмкін. Жаңа редакция сайтта жарияланған сәттен бастап күшіне енеді, редакция күні беттің жоғарғы жағында көрсетілген.",
        ],
      },
    ],
  },
  terms: {
    title: "Пайдалану шарттары",
    description: "Jylu сайтын және оның материалдарын пайдалану ережелері.",
    sections: [
      {
        h: "Сайт туралы",
        body: [
          "Сайт Jylu жобасы туралы айтады: коммуналдық техникадан жылу желілерін тепловизиялық түсіру және Павлодардағы пилоттық жоба. Сайт ақпараттық сипатта және жария оферта болып табылмайды.",
        ],
      },
      {
        h: "Сайт материалдары",
        body: [
          "Егер басқасы көрсетілмесе, сайттың мәтіндері, бейнелері, суреттері мен безендірілуі Jylu командасына тиесілі. Иллюстрация деп белгіленген суреттер мен бейнелер шартты және нақты түсірілімнің нәтижесі емес.",
        ],
      },
      {
        h: "Сандар және дереккөздер",
        body: [
          "Сайттағы статистика ашық дереккөздерден алынған, оларға сілтемелер басты беттің төменгі жағында берілген. Біз деректерді тексеруге тырысамыз, бірақ олардың толықтығы мен өзектілігіне кепілдік бермейміз.",
        ],
      },
      {
        h: "Материалдарды қалай пайдалануға болады",
        body: [
          "Сайт материалдарын дереккөзге сілтеме жасап дәйексөз ретінде келтіруге болады. Оларды өзіңіздікі ретінде көрсетуге, мағынасын бұрмалайтындай өзгертуге немесе біреуді адастыру үшін пайдалануға болмайды.",
        ],
      },
      {
        h: "Басқа сайттарға сілтемелер",
        body: [
          "Сайтта үшінші тараптардың ресурстарына сілтемелер бар. Біз олардың мазмұнына және деректерді өңдеу ережелеріне жауап бермейміз.",
        ],
      },
      {
        h: "Жауапкершілік",
        body: [
          "Сайт «сол күйінде» ұсынылады. Біз тек сайттағы ақпаратқа сүйеніп қабылданған шешімдерге және сайттың уақытша қолжетімсіз болуына жауап бермейміз.",
        ],
      },
      {
        h: "Қолданылатын құқық",
        body: ["Бұл шарттар Қазақстан Республикасының заңнамасымен реттеледі."],
      },
      {
        h: "Өзгерістер және байланыс",
        body: ["Біз бұл шарттарды жаңартуымыз мүмкін. Сұрақтарыңызды {email} мекенжайына жіберіңіз."],
      },
    ],
  },
  cookies: {
    title: "Cookie саясаты",
    description: "Jylu сайты браузеріңізде нені сақтайды.",
    sections: [
      {
        h: "Бұл не",
        body: [
          "Cookie және ұқсас технологиялар, мысалы браузердің жергілікті жады, сайтқа баптауларыңызды келесі кіргенге дейін есте сақтауға мүмкіндік береді.",
        ],
      },
      {
        h: "Біздің сайт нені сақтайды",
        body: [
          {
            keys: [
              ["jylu-theme", "таңдалған тақырып, ашық немесе қараңғы"],
              ["jylu-lang", "таңдалған тіл"],
              ["jylu-notice", "cookie туралы хабарламаны жапқаныңыз туралы белгі"],
            ],
          },
          "Бұл жазбалар тек браузеріңізде сақталады және бізге жіберілмейді.",
        ],
      },
      {
        h: "Сайтта не жоқ",
        body: [
          "Аналитикалық, жарнамалық және үшінші тараптың cookie файлдары. Қаріптер, суреттер мен бейне сайт орналасқан серверден жүктеледі.",
        ],
      },
      {
        h: "Жазбаларды қалай жоюға болады",
        body: [
          "Браузер баптауларында сайт деректерін тазалаңыз. Осыдан кейін сайт хабарламаны қайта көрсетеді және құрылғыңыздың тақырыбын пайдаланады.",
        ],
      },
      {
        h: "Өзгерістер",
        body: [
          "Егер біз аналитика немесе басқа cookie қоссақ, бұл саясатты жаңартамыз және қажет жерде келісіміңізді сұраймыз.",
        ],
      },
    ],
  },
};

export const legal: Record<Lang, Record<LegalKey, LegalDoc>> = { ru, en, kz };
