import SpotMeter from "./SpotMeter";

/** Illustrative report: what the akimat receives after a scan. Data is an example. */
const rows = [
  { id: "ТК-14 → ТК-15", len: 86, dt: 7.8, risk: 0.92, level: "Высокий" },
  { id: "ТК-07 → ТК-08", len: 120, dt: 5.1, risk: 0.74, level: "Высокий" },
  { id: "ТК-22 → ТК-23", len: 64, dt: 3.6, risk: 0.55, level: "Средний" },
  { id: "ТК-03 → ТК-04", len: 140, dt: 2.2, risk: 0.38, level: "Средний" },
  { id: "ТК-31 → ТК-32", len: 95, dt: 1.4, risk: 0.21, level: "Низкий" },
];

const fmt = (n: number) => n.toFixed(1).replace(".", ",");

// Schematic of a district: blocks, the main line and branches, ranked points.
const blocks = [
  [24, 24, 120, 72], [168, 24, 96, 72], [288, 24, 168, 72],
  [24, 136, 72, 64], [120, 136, 144, 64], [312, 136, 144, 64],
  [24, 240, 168, 56], [216, 240, 96, 56], [336, 240, 120, 56],
];
const points = [
  { x: 292, y: 118, n: 1 },
  { x: 108, y: 168, n: 2 },
  { x: 404, y: 222, n: 3 },
  { x: 200, y: 222, n: 4 },
  { x: 60, y: 118, n: 5 },
];

export default function ReportPreview() {
  return (
    <div className="report">
      <div className="report__bar">
        <span className="report__title">Рейтинг участков</span>
        <span className="report__meta">Второй Павлодар · скан 14.01 · пример</span>
      </div>
      <div className="report__body">
        <div className="report__map">
          <svg viewBox="0 0 480 320" role="img" aria-label="Схема квартала с отмеченными участками">
            {blocks.map(([x, y, w, h], i) => (
              <rect key={i} x={x} y={y} width={w} height={h} rx="4" className="map__block" />
            ))}
            <path d="M8 118 H472 M8 222 H472 M108 118 V222 M292 118 V222 M404 118 V222" className="map__pipe" />
            <path d="M268 118 H316" className="map__hot" />
            {points.map((p) =>
              p.n === 1 ? (
                <g key={p.n} transform={`translate(${p.x - 12} ${p.y - 12})`} className="map__spot">
                  <SpotMeter size={24} />
                </g>
              ) : (
                <g key={p.n}>
                  <circle cx={p.x} cy={p.y} r="9" className="map__point" />
                  <text x={p.x} y={p.y + 3.5} textAnchor="middle" className="map__n">
                    {p.n}
                  </text>
                </g>
              )
            )}
            <text x={310} y={104} className="map__label">+7,8 °C</text>
          </svg>
        </div>
        <ol className="report__list">
          <li className="report__head" aria-hidden>
            <span>№</span>
            <span>Участок</span>
            <span className="r">Длина</span>
            <span className="r">ΔT</span>
            <span>Риск</span>
          </li>
          {rows.map((r, i) => (
            <li key={r.id} className={`report__row${i === 0 ? " report__row--top" : ""}`}>
              <span className="report__n">{i + 1}</span>
              <span>{r.id}</span>
              <span className="r num">{r.len} м</span>
              <span className="r num">+{fmt(r.dt)} °C</span>
              <span className="report__risk">
                <span className="bar">
                  <span style={{ transform: `scaleX(${r.risk})` }} />
                </span>
                <span className="report__level">{r.level}</span>
              </span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
