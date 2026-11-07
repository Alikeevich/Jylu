/**
 * Jylu intro deck for newcomers (PPTX).
 *
 *   python3 deck/prep.py && python3 deck/cover.py && node deck/render.js   # assets
 *   node deck/build.js                                                     # deck
 *
 * Structured deck: theme colours, one layout per slide frame, sections.
 * Arial throughout so the deck renders the same on any machine.
 */
const path = require("path");
const pptxgen = require("pptxgenjs");
const { applyTheme } = require(process.env.PPTX_SKILL + "/scripts/apply_theme.js");

const A = (f) => path.join(__dirname, "assets", f);
const OUT = path.join(__dirname, "Jylu-для-новичков.pptx");
const REPO = "https://github.com/alikeevich/jylu/tree/claude/kind-cray-c5cug2/public/brand";

const THEME = {
  name: "Jylu",
  headFontFace: "Arial",
  bodyFontFace: "Arial",
  colors: {
    dk1: "0B0D14", // ink: text on light, dark slides
    lt1: "FFFFFF",
    dk2: "111827",
    lt2: "F4F6F9", // snow-day background
    accent1: "FF6A2B", // ember, the hot pixel
    accent2: "C2410C", // ember for text on light
    accent3: "4B5565", // secondary text on light
    accent4: "A3A9B8", // secondary text on dark
    accent5: "EEF0F5", // text on dark
    accent6: "1A1E28", // raised surface on dark
    hlink: "C2410C",
    folHlink: "7A8296",
  },
};

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.333 x 7.5 in
pres.theme = { headFontFace: THEME.headFontFace, bodyFontFace: THEME.bodyFontFace };
pres.title = "Jylu: знакомство для новичков";
pres.author = "Jylu";
pres.company = "Jylu";
const C = pres.SchemeColor;

const W = 13.333, M = 0.6, CW = W - 2 * M;
const WM = 1392 / 768; // wordmark PNG aspect

// ── layouts (slide frames)
const footer = (dark) => [
  { image: { path: A(dark ? "wm-dark.png" : "wm-light.png"), x: M, y: 6.98, h: 0.2, w: 0.2 * WM } },
];
const slideNumber = (dark) => ({ x: M + 0.48, y: 6.93, w: 0.6, h: 0.3, fontSize: 10, color: dark ? C.accent4 : C.accent3 });
const titlePh = (dark) => ({
  placeholder: {
    options: { name: "title", type: "title", x: M, y: 0.45, w: CW, h: 0.85, fontSize: 34, bold: true, color: dark ? C.accent5 : C.text1, align: "left", valign: "top", margin: 0 },
    text: "",
  },
});

pres.defineSlideMaster({ title: "Cover", background: { path: A("cover.jpg") }, objects: [] });
pres.defineSlideMaster({ title: "Closing", background: { path: A("closing.jpg") }, objects: [] });
pres.defineSlideMaster({ title: "Light", background: { color: "F4F6F9" }, objects: [titlePh(false), ...footer(false)], slideNumber: slideNumber(false) });
pres.defineSlideMaster({ title: "Dark", background: { color: "0B0D14" }, objects: [titlePh(true), ...footer(true)], slideNumber: slideNumber(true) });
pres.defineSlideMaster({ title: "Meme", background: { color: "0B0D14" }, objects: [...footer(true)], slideNumber: slideNumber(true) });
pres.defineSlideMaster({ title: "Board", background: { color: "DCE1E8" }, objects: [] });

// ── helpers
let n = 0;
const id = (name) => `${name}-${++n}`;
const text = (s, t, o) => s.addText(t, { isTextBox: true, margin: 0, valign: "top", objectName: id("text"), ...o });
const pixel = (s, x, y, size = 0.14, color = C.accent1) =>
  s.addShape(pres.shapes.RECTANGLE, { x, y, w: size, h: size, fill: { color }, line: { type: "none" }, objectName: id("hot-pixel") });
const card = (s, x, y, w, h, fill, line) =>
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x, y, w, h, rectRadius: 0.14, fill: { color: fill }, objectName: id("card"),
    line: line ? { color: line, width: 0.75 } : { type: "none" },
  });
const add = (layout, section) => pres.addSlide({ masterName: layout, sectionTitle: section });

// ════════════════════════ 1. Начало
pres.addSection({ title: "Начало" });
{
  const s = add("Cover", "Начало");
  s.addImage({ path: A("wm-dark.png"), x: 0.95, y: 0.82, h: 0.34, w: 0.34 * WM, objectName: "logo" });
  text(s, "52°17′ N · 76°58′ E", { x: W - 0.95 - 3.2, y: 0.86, w: 3.2, h: 0.3, fontSize: 12, color: C.accent4, align: "right", charSpacing: 1 });
  text(s, [
    { text: "салам, ща начну ", options: { color: C.accent5 } },
    { text: "■", options: { color: C.accent1 } },
  ], { x: M, y: 3.0, w: CW, h: 1.5, fontSize: 80, bold: true, align: "center", valign: "middle" });
  text(s, "ноябрь 2026 · отопительный сезон", { x: 0.95, y: 6.38, w: 4.5, h: 0.3, fontSize: 12, color: C.accent4, charSpacing: 1 });
  text(s, "Павлодар", { x: W - 0.95 - 3.2, y: 6.38, w: 3.2, h: 0.3, fontSize: 12, color: C.accent4, align: "right", charSpacing: 1 });
  s.addNotes("Поздоровайся и дай всем рассесться. Фон — это кадр тепловизора: холодное серое, а оранжевое — тепло, которое уходит из трубы в снег. Об этом весь проект.");
}

// ════════════════════════ 2. Проект
pres.addSection({ title: "Проект" });
{
  const s = add("Light", "Проект");
  s.addText("Короче, идея", { placeholder: "title" });
  s.addImage({ path: A("courtyard-half.jpg"), x: W / 2, y: 0, w: W / 2, h: 7.5, objectName: "photo-courtyard", altText: "Ночной двор: над трубой растаял снег, из люка идёт пар" });
  pixel(s, M, 1.86, 0.16);
  text(s, "Ищем участки теплосетей, которые теряют тепло, раньше, чем они порвутся.", { x: M + 0.36, y: 1.72, w: 5.3, h: 1.3, fontSize: 22, bold: true, color: C.text1 });
  text(s, [
    { text: "Тепловизор ставим на мусоровоз: он и так заезжает почти в каждый двор.", options: { breakLine: true, paraSpaceAfter: 12 } },
    { text: "Зимой над трубой с утечкой тает снег, и на тепловом кадре это видно сразу.", options: { breakLine: true, paraSpaceAfter: 12 } },
    { text: "На выходе у акимата список: где копать первым." },
  ], { x: M + 0.36, y: 3.25, w: 5.3, h: 2.6, fontSize: 17, color: C.accent3 });
  s.addNotes("Одна мысль: мы находим, где течёт, до аварии. Фото справа — сгенерированная иллюстрация, но так это и выглядит зимой в любом дворе: полоса без снега и пар из люка.");
}
{
  const s = add("Light", "Проект");
  s.addText("Сети стареют быстрее, чем их меняют", { placeholder: "title" });
  const stats = [
    ["78,2%", "износ теплосетей в Павлодарской области", true],
    ["1438 км", "сетей в области", false],
    ["30–35 км", "меняют за год", false],
    ["40+ лет", "уйдёт на полную замену при таком темпе", false],
  ];
  const sw = (CW - 3 * 0.27) / 4;
  stats.forEach(([v, l, hot], i) => {
    const x = M + i * (sw + 0.27);
    text(s, v, { x, y: 1.65, w: sw, h: 0.8, fontSize: 44, bold: true, color: hot ? C.accent2 : C.text1 });
    text(s, l, { x, y: 2.5, w: sw - 0.1, h: 0.7, fontSize: 14, color: C.accent3 });
  });
  text(s, "Вся сеть, 1438 км", { x: M, y: 3.5, w: 4, h: 0.3, fontSize: 12, color: C.accent3 });
  s.addShape(pres.shapes.RECTANGLE, { x: M, y: 3.82, w: CW, h: 0.34, fill: { color: C.accent4, transparency: 55 }, line: { type: "none" }, objectName: "bar-network" });
  s.addShape(pres.shapes.RECTANGLE, { x: M, y: 3.82, w: Math.max(0.12, (CW * 35) / 1438), h: 0.34, fill: { color: C.accent1 }, line: { type: "none" }, objectName: "bar-per-year" });
  text(s, "вот столько меняют за год", { x: M, y: 4.26, w: 4, h: 0.3, fontSize: 12, color: C.accent2 });
  card(s, M, 4.85, CW, 1.2, C.background1);
  text(s, "тренд «2016 — прайм»", { x: M + 0.35, y: 5.05, w: 6, h: 0.3, fontSize: 12, color: C.accent3 });
  text(s, "Все выкладывают 2016-й как свой прайм. У этих труб прайм был ещё при Союзе.", { x: M + 0.35, y: 5.38, w: CW - 0.7, h: 0.5, fontSize: 18, color: C.text1 });
  text(s, "Источники: Zakon.kz (июль 2026), BES.media", { x: M, y: 6.3, w: 6, h: 0.3, fontSize: 11, color: C.accent3 });
  s.addNotes("Главная цифра — 78,2%. Если менять по 30–35 км в год, на всю сеть уйдёт больше 40 лет. Значит, нужен способ выбрать, что менять первым.");
}
{
  const s = add("Dark", "Проект");
  s.addText("Как это бывает", { placeholder: "title" });
  s.addImage({ path: A("thermal-half.jpg"), x: W / 2, y: 0, w: W / 2, h: 7.5, objectName: "photo-thermal", altText: "Тепловой кадр: светится участок трубы с утечкой" });
  text(s, "Экибастуз", { x: M, y: 1.7, w: 5.5, h: 0.4, fontSize: 20, color: C.accent4 });
  text(s, "27.11.2022", { x: M, y: 2.08, w: 5.6, h: 1.0, fontSize: 60, bold: true, color: C.accent5 });
  text(s, "Ночью прорвало теплосети, на ТЭЦ встали котлы, и город остался без тепла в мороз под −30. Утром подняли дроны и сразу нашли 10 повреждений.",
    { x: M, y: 3.3, w: 5.5, h: 1.4, fontSize: 17, color: C.accent5 });
  pixel(s, M, 5.08, 0.16);
  text(s, "Дроны всё нашли за утро. Просто уже после аварии.", { x: M + 0.36, y: 4.95, w: 5.2, h: 0.8, fontSize: 20, bold: true, color: C.accent5 });
  text(s, "Мы хотим, чтобы это случалось до.", { x: M + 0.36, y: 5.75, w: 5.2, h: 0.4, fontSize: 16, color: C.accent4 });
  text(s, "Источники: Bizmedia, Forbes.kz", { x: M, y: 6.4, w: 5, h: 0.3, fontSize: 11, color: C.accent4 });
  s.addNotes("Это не упрёк Экибастузу, а доказательство: съёмка сверху быстро находит повреждения. Вопрос только в том, когда её делать.");
}
{
  const s = add("Meme", "Проект");
  card(s, 1.9, 1.3, 9.533, 3.2, C.accent6);
  text(s, "мем весны 2026", { x: 2.45, y: 1.7, w: 6, h: 0.3, fontSize: 13, color: C.accent4 });
  text(s, "— Поменять все 1438 км разом?", { x: 2.45, y: 2.25, w: 8.5, h: 0.75, fontSize: 30, color: C.accent5 });
  text(s, "— Можно. А зачем?", { x: 2.45, y: 3.05, w: 8.5, h: 1.0, fontSize: 48, bold: true, color: C.accent5 });
  pixel(s, 1.9, 5.09, 0.16);
  text(s, "Достаточно найти те 30 км, которые порвутся первыми.", { x: 2.26, y: 4.95, w: 9.2, h: 0.5, fontSize: 22, color: C.accent5 });
  s.addNotes("Шутка про АвтоВАЗ, главный мем весны. Смысл: менять всё сразу не надо и невозможно, надо знать, с чего начать.");
}
{
  const s = add("Light", "Проект");
  s.addText("Как это работает", { placeholder: "title" });
  const steps = [
    ["step-truck", "Камера на технике", "Тепловизор-приставка к телефону, примерно 200 $. Ставим на мусоровоз или снегоуборщик."],
    ["step-route", "Едем по дворам", "Телефон пишет тепловые кадры и GPS. Мусоровоз и так бывает почти в каждом дворе."],
    ["step-scan", "Модель ищет тепло", "Проталины, тёплые полосы над трассой, пар из камер."],
    ["step-map", "Карта и рейтинг", "Все пятна на карте, отсортированы по риску и потерям тепла."],
    ["step-list", "Список для бригад", "Акимат и теплосети видят, где копать первым, и забирают выгрузку в свою ГИС."],
  ];
  const cw = (CW - 4 * 0.25) / 5;
  steps.forEach(([icon, title, body], i) => {
    const x = M + i * (cw + 0.25);
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y: 1.7, w: 0.95, h: 0.95, rectRadius: 0.22, fill: { color: i === 2 ? C.accent1 : C.text1 }, line: { type: "none" }, objectName: id("icon-tile") });
    s.addImage({ path: A(`${icon}.png`), x: x + 0.2, y: 1.9, w: 0.55, h: 0.55, objectName: id("icon"), altText: title });
    text(s, String(i + 1).padStart(2, "0"), { x, y: 2.9, w: cw, h: 0.3, fontSize: 12, color: C.accent3 });
    text(s, title, { x, y: 3.2, w: cw, h: 0.6, fontSize: 17, bold: true, color: C.text1 });
    text(s, body, { x, y: 3.85, w: cw - 0.05, h: 1.8, fontSize: 14, color: C.accent3 });
  });
  text(s, "Данные храним в Казахстане, а лица и номера машин размываются прямо на телефоне.", { x: M, y: 6.0, w: CW, h: 0.4, fontSize: 14, color: C.accent3 });
  s.addNotes("Пять шагов. Оранжевый шаг — главный: модель находит тёплые пятна. Остальное — логистика вокруг него.");
}
{
  const s = add("Meme", "Проект");
  text(s, [
    { text: "Никто:", options: { breakLine: true, paraSpaceAfter: 14 } },
    { text: "Абсолютно никто:", options: { breakLine: true, paraSpaceAfter: 14 } },
    { text: "Снег над дырявой трубой:" },
  ], { x: M, y: 1.6, w: 6.2, h: 2.9, fontSize: 32, bold: true, color: C.accent5 });
  const iw = W - M - 6.9;
  s.addImage({ path: A("meme-strip.jpg"), x: 6.9, y: 1.6, w: iw, h: (iw * 534) / 1140, objectName: "meme-image", altText: "Полоса растаявшего снега над трубой и пар из люка" });
  pixel(s, M, 5.33, 0.16);
  text(s, "Поэтому зимой у нас бесплатный датчик в каждом дворе.", { x: M + 0.36, y: 5.2, w: 11.5, h: 0.5, fontSize: 22, color: C.accent5 });
  s.addNotes("Это и есть вся физика проекта: снег тает там, где течёт тепло. Нам остаётся это заснять и сравнить.");
}
{
  const s = add("Light", "Проект");
  s.addText("Где мы в системе акимата", { placeholder: "title" });
  const cards = [
    ["Дежурная карта РГИС", "ведёт акимат области", "где авария или ремонт, SMS жителям", "после аварии", false],
    ["Цифровой двойник", "ведут «Павлодарские тепловые сети»", "параметры в тепловых пунктах", "когда параметры уже вышли за норму", false],
    ["Jylu", "ведём мы", "трубу целиком, между узлами", "до аварии", true],
  ];
  const w = (CW - 2 * 0.25) / 3;
  cards.forEach(([name, owner, sees, when, hot], i) => {
    const x = M + i * (w + 0.25), p = 0.32;
    card(s, x, 1.65, w, 4.0, hot ? C.text1 : C.background1, hot ? null : "D9DEE6");
    const main = hot ? C.accent5 : C.text1, sub = hot ? C.accent4 : C.accent3;
    text(s, name, { x: x + p, y: 1.95, w: w - 2 * p, h: 0.45, fontSize: 20, bold: true, color: main });
    text(s, owner, { x: x + p, y: 2.45, w: w - 2 * p, h: 0.5, fontSize: 13, color: sub });
    text(s, "что видит", { x: x + p, y: 3.2, w: w - 2 * p, h: 0.3, fontSize: 12, color: sub });
    text(s, sees, { x: x + p, y: 3.5, w: w - 2 * p, h: 0.75, fontSize: 15, color: main });
    text(s, "когда срабатывает", { x: x + p, y: 4.4, w: w - 2 * p, h: 0.3, fontSize: 12, color: sub });
    text(s, when, { x: x + p, y: 4.7, w: w - 2 * p, h: 0.75, fontSize: 17, bold: true, color: hot ? C.accent1 : main });
  });
  text(s, "Данные Jylu ложатся в РГИС и в двойник. Ничего переделывать не надо.", { x: M, y: 5.95, w: CW, h: 0.4, fontSize: 16, color: C.text1 });
  s.addNotes("Карта видит аварию, двойник видит узлы, мы видим трубу между ними. Мы не конкурент их системам, мы источник данных для них.");
}
{
  const s = add("Light", "Проект");
  s.addText("Почему именно сейчас", { placeholder: "title" });
  const reasons = [
    ["Сети теперь у города", "С января 2026 «Павлодарские тепловые сети» принадлежат акимату. Каждая авария бьёт по его бюджету."],
    ["Деньги заложены", "До 2029 года на модернизацию отрасли около 13 трлн ₸. Дают под проекты с обоснованием по участкам."],
    ["Год цифровизации и ИИ", "Акимат ищет проекты с понятной пользой и подключает их к ситуационному центру."],
    ["Износ впервые пошёл вниз", "Впервые за 30 лет его ждут ниже. Хочется, чтобы так и осталось."],
  ];
  const rw = 3.85;
  reasons.forEach(([t, b], i) => {
    const x = M + (i % 2) * (rw + 0.3), y = 1.7 + Math.floor(i / 2) * 2.15;
    pixel(s, x, y + 0.1);
    text(s, t, { x: x + 0.3, y, w: rw - 0.3, h: 0.45, fontSize: 18, bold: true, color: C.text1 });
    text(s, b, { x: x + 0.3, y: y + 0.5, w: rw - 0.3, h: 1.4, fontSize: 14, color: C.accent3 });
  });
  const mx = M + 2 * rw + 0.3 + 0.55, mw = W - M - mx;
  card(s, mx, 1.7, mw, 4.2, C.text1);
  text(s, "мем осени 2026", { x: mx + 0.35, y: 2.0, w: mw - 0.7, h: 0.3, fontSize: 12, color: C.accent4 });
  text(s, "«это ноябрьский мем из 2026, вы пока не поймёте»", { x: mx + 0.35, y: 2.4, w: mw - 0.7, h: 1.5, fontSize: 20, bold: true, color: C.accent5 });
  text(s, "Ноябрь наступил. Отопительный сезон тоже. Теперь понимаем.", { x: mx + 0.35, y: 4.1, w: mw - 0.7, h: 1.2, fontSize: 16, color: C.accent4 });
  s.addNotes("Четыре причины: город теперь сам владеет сетями, деньги есть, цифровизация в приоритете, и тренд на износ впервые развернулся. Мем — чтобы выдохнуть.");
}
{
  const s = add("Light", "Проект");
  s.addText("Пилот: Второй Павлодар", { placeholder: "title" });
  text(s, "Сети района уже оцифрованы в РГИС: 460 га, 49 улиц, 1368 подключений. Скан сразу ложится на схему.", { x: M, y: 1.5, w: CW, h: 0.5, fontSize: 16, color: C.text1 });
  const w = (CW - 0.25) / 2;
  card(s, M, 2.3, w, 3.2, C.background1, "D9DEE6");
  text(s, "Просим у акимата", { x: M + 0.35, y: 2.6, w: w - 0.7, h: 0.45, fontSize: 20, bold: true, color: C.text1 });
  ["3 машины коммунальной техники на сезон", "Слой сетей Второго Павлодара из РГИС", "Точку подключения к ситуационному центру"].forEach((t, i) => {
    pixel(s, M + 0.35, 3.33 + i * 0.6, 0.12, C.accent4);
    text(s, t, { x: M + 0.65, y: 3.22 + i * 0.6, w: w - 1.0, h: 0.4, fontSize: 15, color: C.text1 });
  });
  const x2 = M + w + 0.25;
  card(s, x2, 2.3, w, 3.2, C.text1);
  text(s, "Что получит акимат", { x: x2 + 0.35, y: 2.6, w: w - 0.7, h: 0.45, fontSize: 20, bold: true, color: C.accent5 });
  [["декабрь — март", "скан и карта аномалий онлайн"], ["апрель", "рейтинг участков с оценкой потерь"], ["май", "сверка с весенней опрессовкой"]].forEach(([d, t], i) => {
    text(s, d, { x: x2 + 0.35, y: 3.2 + i * 0.7, w: w - 0.7, h: 0.28, fontSize: 12, color: C.accent4 });
    text(s, t, { x: x2 + 0.35, y: 3.46 + i * 0.7, w: w - 0.7, h: 0.35, fontSize: 15, color: C.accent5 });
  });
  text(s, "Как говорит Черемша: тихо, не спеша, без суеты. Один район, одна зима, а опрессовка честно покажет, угадали мы или нет.", { x: M, y: 5.8, w: CW, h: 0.8, fontSize: 15, color: C.accent3 });
  s.addNotes("Просим мало: три машины, слой из РГИС и точку интеграции. Взамен через полгода у акимата рейтинг участков, проверенный опрессовкой. Риска для них почти нет.");
}

// ════════════════════════ 3. Шпаргалка к питчу
pres.addSection({ title: "Шпаргалка к питчу" });
const glossary = (part, total, terms) => {
  const s = add("Light", "Шпаргалка к питчу");
  s.addText("Словарь, чтобы не потеряться", { placeholder: "title" });
  text(s, `${part}/${total}`, { x: W - M - 1, y: 0.62, w: 1, h: 0.3, fontSize: 12, color: C.accent3, align: "right" });
  const w = (CW - 0.35) / 2;
  terms.forEach(([term, def], i) => {
    const x = M + (i % 2) * (w + 0.35), y = 1.65 + Math.floor(i / 2) * 1.6;
    pixel(s, x, y + 0.1);
    text(s, term, { x: x + 0.3, y, w: w - 0.3, h: 0.4, fontSize: 18, bold: true, color: C.text1 });
    text(s, def, { x: x + 0.3, y: y + 0.45, w: w - 0.3, h: 1.0, fontSize: 14, color: C.accent3 });
  });
  return s;
};
glossary(1, 2, [
  ["Опрессовка", "Весной трубы нагружают давлением и смотрят, где не держат. Для нас это бесплатная проверка прогноза."],
  ["РГИС", "Электронная карта области. В ней модуль «Аварийно-ремонтные работы» и уже оцифрованный Второй Павлодар."],
  ["Цифровой двойник", "Модель теплосети у «Павлодарских тепловых сетей». Видит параметры на тепловых пунктах."],
  ["Узел, тепловой пункт", "Место, где стоят датчики. Труба между узлами для них слепая, это наша зона."],
  ["Внутриквартальные сети", "Трубы во дворах, от магистрали до домов. Ровно там ездит мусоровоз."],
  ["ТЭЦ", "Станция, которая даёт городу тепло и свет. В Экибастузе в 2022-м на ней встали котлы."],
]).addNotes("Эти слова точно прозвучат на питче. Достаточно понимать их своими словами, заучивать определения не нужно.");
glossary(2, 2, [
  ["Акимат и отдел ЖКХ", "Местная власть. С 2026 года отдел ЖКХ владеет теплосетями Павлодара."],
  ["ЦАЭК", "Энергокомпания, которая раньше владела теплосетями и в январе 2026 передала их государству."],
  ["МЭКС", "Нацпроект модернизации энергетики и ЖКХ. На него до 2029 года около 13 трлн ₸."],
  ["ГЧП", "Государственно-частное партнёрство: компания вкладывается сама, город платит частями несколько лет."],
  ["Ситуационный центр", "Пульт акимата, куда стекаются городские данные. Туда хотим отдавать нашу карту."],
  ["Аномалия и ΔT", "Аномалия — место теплее, чем должно быть. ΔT — на сколько градусов оно теплее соседей."],
]).addNotes("Вторая половина словаря: кто владеет сетями, откуда деньги и как это купить.");
{
  const s = add("Dark", "Шпаргалка к питчу");
  s.addText("Цифры, которые надо помнить", { placeholder: "title" });
  const nums = [
    ["78,2%", "износ сетей в области", true], ["88,6%", "износ в Экибастузе"], ["1438 км", "теплосетей в области"], ["30–35 км", "меняют за год"], ["40+ лет", "на полную замену при таком темпе"],
    ["27.11.2022", "авария в Экибастузе, мороз под −30"], ["10", "повреждений нашли дроны за утро"], ["13 трлн ₸", "на модернизацию до 2029 года"], ["460 га", "Второго Павлодара в РГИС: 49 улиц, 1368 подключений"], ["3", "машины просим на пилот"],
  ];
  const w = (CW - 4 * 0.25) / 5;
  nums.forEach(([v, l, hot], i) => {
    const x = M + (i % 5) * (w + 0.25), y = 1.7 + Math.floor(i / 5) * 2.0;
    text(s, v, { x, y, w, h: 0.6, fontSize: 30, bold: true, color: hot ? C.accent1 : C.accent5 });
    text(s, l, { x, y: y + 0.68, w: w - 0.05, h: 1.0, fontSize: 13, color: C.accent4 });
  });
  pixel(s, M, 6.13, 0.14);
  text(s, "И да, 6-7 в этом списке нет. Мы проверили.", { x: M + 0.32, y: 6.02, w: 9, h: 0.4, fontSize: 16, color: C.accent4 });
  s.addNotes("Десять чисел. Если запомнить только одно — 78,2%. Остальное можно подсмотреть, но лучше знать.");
}
{
  const s = add("Light", "Шпаргалка к питчу");
  s.addText("Если спросят", { placeholder: "title" });
  text(s, "Каждый ответ укладывается в 10 секунд", { x: M, y: 1.3, w: 8, h: 0.35, fontSize: 14, color: C.accent3 });
  const qa = [
    ["«А летом что?»", "Летом по нашему списку ремонтируют, опрессовка проверяет прогноз, а камера ищет ямы и тёмные фонари."],
    ["«У нас же есть цифровой двойник»", "Двойник видит узлы, мы видим трубу между ними. Вместе прогноз точнее."],
    ["«Датчик и так покажет протечку»", "Датчик знает значение у себя, но не место утечки. Маленькая течь сидит в норме до первого мороза."],
    ["«Почему не дроны или спутник?»", "Это разовый снимок. Машина ездит по тем же дворам регулярно и почти бесплатно."],
    ["«Где хранятся данные?»", "В Казахстане. Лица и номера машин размываются прямо на телефоне."],
    ["«Как нам это купить?»", "Пилот бесплатный, дальше сервисный договор или ГЧП. Похожая схема в Павлодаре уже работала."],
  ];
  const w = (CW - 0.35) / 2;
  qa.forEach(([q, a], i) => {
    const x = M + (i % 2) * (w + 0.35), y = 1.95 + Math.floor(i / 2) * 1.5;
    text(s, q, { x, y, w, h: 0.4, fontSize: 17, bold: true, color: C.text1 });
    text(s, a, { x, y: y + 0.45, w, h: 0.95, fontSize: 14, color: C.accent3 });
  });
  s.addNotes("Самые частые вопросы жюри. Отвечаем спокойно и коротко, без оправданий.");
}
{
  const s = add("Dark", "Шпаргалка к питчу");
  s.addText("Как не стать воздуханом на питче", { placeholder: "title" });
  text(s, "Воздухан — тот, кто много обещает и мало делает. Главный мем лета 2026, не будем им.", { x: M, y: 1.3, w: CW, h: 0.35, fontSize: 14, color: C.accent4 });
  const tips = [
    "Обещаем только то, что проверит весенняя опрессовка.",
    "Экибастуз приводим как доказательство, что метод работает, а не как упрёк.",
    "Каждую цифру называем с источником: «по данным Zakon.kz».",
    "Не знаем ответа — говорим «уточним на пилоте» и записываем вопрос.",
    "Показываем фото двора с проталиной. Это понятнее любой таблицы.",
    "Одна мысль на ответ, десять секунд.",
  ];
  const w = (CW - 0.35) / 2;
  tips.forEach((t, i) => {
    const x = M + (i % 2) * (w + 0.35), y = 2.05 + Math.floor(i / 2) * 1.35;
    pixel(s, x, y + 0.1);
    text(s, t, { x: x + 0.32, y, w: w - 0.32, h: 1.0, fontSize: 18, color: C.accent5 });
  });
  s.addNotes("Правила хорошего тона на питче. Главное — не обещать того, что нельзя проверить.");
}
{
  const s = add("Light", "Шпаргалка к питчу");
  s.addText("Что делаем до питча", { placeholder: "title" });
  const steps = [
    "Купить тепловизор-приставку к телефону",
    "Ночью проехать свой район и записать видео с GPS",
    "Отметить тёплые точки на карте",
    "Пешком проверить 2–3 точки и сфотографировать проталины или пар",
    "Собрать демо: точка на карте, тепловой кадр, оценка риска",
  ];
  const w = (CW - 4 * 0.25) / 5;
  s.addShape(pres.shapes.LINE, { x: M, y: 2.0, w: CW, h: 0, line: { color: C.accent4, width: 1 }, objectName: "timeline" });
  steps.forEach((t, i) => {
    const x = M + i * (w + 0.25);
    s.addShape(pres.shapes.OVAL, { x, y: 1.87, w: 0.26, h: 0.26, fill: { color: i === 0 ? C.accent1 : C.background2 }, line: { color: i === 0 ? C.accent1 : C.accent3, width: 1.25 }, objectName: id("node") });
    text(s, `шаг ${i + 1}`, { x, y: 2.35, w, h: 0.3, fontSize: 12, color: C.accent3 });
    text(s, t, { x, y: 2.68, w: w - 0.05, h: 1.6, fontSize: 16, color: C.text1 });
  });
  card(s, M, 4.75, CW, 1.25, C.background1, "D9DEE6");
  pixel(s, M + 0.35, 5.25, 0.16);
  text(s, "На питче показываем свою карту и свои фотографии. Это убеждает лучше любых картинок из интернета.", { x: M + 0.75, y: 5.05, w: CW - 1.1, h: 0.7, fontSize: 17, color: C.text1 });
  s.addNotes("План на ближайшие ночи. Первый шаг — купить приставку, дальше всё делается за пару выездов.");
}

// ════════════════════════ 4. Логотип
pres.addSection({ title: "Логотип" });
{
  // designer board: no text, just the mark on different grounds
  const s = add("Board", "Логотип");
  const tile = (x, y, w, h, fill) => card(s, x, y, w, h, fill);
  const centred = (file, x, y, w, h, ih, aspect) => s.addImage({ path: A(file), x: x + (w - ih * aspect) / 2, y: y + (h - ih) / 2, w: ih * aspect, h: ih, objectName: id("logo") });
  const Y1 = 0.45, Y2 = 3.85, H = 3.2;
  tile(0.45, Y1, 6.1, H, C.text1); centred("wm-dark.png", 0.45, Y1, 6.1, H, 1.3, WM);
  tile(6.75, Y1, 3.0, H, C.background1); centred("wm-light.png", 6.75, Y1, 3.0, H, 0.62, WM);
  tile(9.95, Y1, 2.933, H, C.accent1); centred("icon-dark.png", 9.95, Y1, 2.933, H, 1.5, 1);
  s.addImage({ path: A("tile-photo.png"), x: 0.45, y: Y2, w: 3.6, h: H, objectName: "tile-photo" });
  tile(4.25, Y2, 2.6, H, C.background1); centred("wm-black.png", 4.25, Y2, 2.6, H, 0.62, WM);
  s.addImage({ path: A("tile-phone.png"), x: 7.05, y: Y2, w: 2.4, h: H, objectName: "tile-phone" });
  s.addImage({ path: A("tile-tab.png"), x: 9.65, y: Y2, w: 3.233, h: H, objectName: "tile-tab" });
  s.addNotes("Слайд без слов: знак на тёмном, на светлом, иконка на «жаре», белый на фото, одноцветный, иконка на телефоне и фавиконка во вкладке.");
}
{
  const s = add("Light", "Логотип");
  s.addText("Как построен знак", { placeholder: "title" });
  const iw = 9.0, ih = (iw * 483) / 904;
  s.addImage({ path: A("construction.png"), x: (W - iw) / 2, y: 1.45, w: iw, h: ih, objectName: "construction", altText: "Построение знака jylu: линии асцендера, высоты строчных, базовой линии и выносных; штрих 24, радиус 32" });
  text(s, "Одна толщина, один радиус изгиба, пиксель вровень с верхом l.", { x: M, y: 1.45 + ih + 0.15, w: CW, h: 0.35, fontSize: 14, color: C.accent3, align: "center" });
  s.addNotes("Буквы нарисованы как трубы: одна толщина, изгибы одного радиуса, плоские срезы. Оранжевый квадрат — горячий пиксель, как на кадре тепловизора.");
}
{
  const s = add("Light", "Логотип");
  s.addText("Лого в деле", { placeholder: "title" });
  const bw = 7.5;
  s.addImage({ path: A("browser.png"), x: M - 0.1, y: 1.45, w: bw, h: bw / 1.6, objectName: "mock-browser", altText: "Сайт Jylu в браузере, знак в шапке и фавиконка во вкладке" });
  const rx = M + bw + 0.2, rw = W - M - rx;
  s.addImage({ path: A("chat.png"), x: rx, y: 1.5, w: rw, h: (rw * 560) / 920, objectName: "mock-chat", altText: "Ссылка на сайт в мессенджере с превью" });
  s.addImage({ path: A("homescreen.png"), x: rx, y: 1.5 + (rw * 560) / 920 + 0.2, w: rw, h: (rw * 370) / 920, objectName: "mock-homescreen", altText: "Иконка Jylu на экране телефона" });
  text(s, [
    { text: "Все логотипы, SVG и PNG: ", options: { color: C.text1 } },
    { text: "github.com/alikeevich/jylu → public/brand", options: { color: C.accent2, hyperlink: { url: REPO, tooltip: "Папка с логотипами" } } },
  ], { x: M, y: 6.3, w: CW, h: 0.4, fontSize: 14 });
  s.addNotes("Так знак живёт на сайте, в мессенджере и на телефоне. Все файлы лежат в репозитории, папка public/brand.");
}

// ════════════════════════ 5. Финал
pres.addSection({ title: "Финал" });
{
  const s = add("Closing", "Финал");
  s.addImage({ path: A("wm-dark.png"), x: 0.95, y: 0.82, h: 0.34, w: 0.34 * WM, objectName: "logo" });
  text(s, [
    { text: "рахмет, я всё ", options: { color: C.accent5 } },
    { text: "■", options: { color: C.accent1 } },
  ], { x: M, y: 3.0, w: CW, h: 1.5, fontSize: 80, bold: true, align: "center", valign: "middle" });
  text(s, "вопросы?", { x: M, y: 4.55, w: CW, h: 0.5, fontSize: 24, color: C.accent4, align: "center" });
  text(s, "github.com/alikeevich/jylu", { x: 0.95, y: 6.38, w: 5, h: 0.3, fontSize: 12, color: C.accent4, charSpacing: 1, hyperlink: { url: "https://github.com/alikeevich/jylu" } });
  text(s, "Павлодар", { x: W - 0.95 - 3.2, y: 6.38, w: 3.2, h: 0.3, fontSize: 12, color: C.accent4, align: "right", charSpacing: 1 });
  s.addNotes("Спасибо. Спроси, кто хочет поехать на ночной объезд с тепловизором.");
}

(async () => {
  await pres.writeFile({ fileName: OUT });
  await applyTheme(OUT, THEME);
  // folder entries in the zip make some cloud editors refuse the file
  try {
    require("child_process").execFileSync("zip", ["-dq", OUT, "*/"]);
  } catch (e) {}
  console.log("deck", OUT);
})();
