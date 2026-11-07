/**
 * "How it works" scene: a garbage truck with a thermal camera on the cab drives
 * a winter courtyard and stops at each of the five steps. Line art in the logo's
 * manner (one stroke weight, flat cuts); the camera is the hot pixel.
 *
 * The markup is a still of step 3, so the block reads without JavaScript.
 * public/site.js plays it: the drive, the scan, the finds, the list. Geometry
 * the script needs travels in data-route, so it lives in one place, here.
 */
const W = 1200;
const H = 340;
const G = 236; // ground line

export const ROUTE = {
  w: W,
  h: H,
  g: G,
  stops: [120, 360, 600, 840, 1080], // truck centre at each step, one fifth of the width apart
  focus: [120, 330, 590, 650, 1000], // what a narrow screen keeps in frame at each step
  half: 84, // truck centre from its rear
  scan: [92, 178], // the camera's footprint on the ground, from the truck centre
  // what the model finds, left to right: a warm strip, steam over a chamber, the leak
  boxes: [
    [248, 220, 352, 252],
    [446, 176, 494, 250],
    [694, 212, 766, 254],
  ],
  pins: [
    { x: 300, top: 128, size: 8, rank: 2 },
    { x: 470, top: 110, size: 11, rank: 1 },
    { x: 730, top: 86, size: 14, rank: 0 },
  ],
  slots: [
    [870, 72],
    [870, 90],
    [870, 108],
  ],
  card: [850, 34, 200, 92],
  hatch: [470, 230],
};

const STILL = 2; // the markup shows the truck at step 3
const still = ROUTE.stops[STILL];

// strip colours follow the hero's thermal palette (scripts/hero-video.py)
const COLD = "#2a303e";
const stripStops: [number, string][] = [
  [0, COLD],
  [250, COLD],
  [300, "#96604a"],
  [350, COLD],
  [452, COLD],
  [470, "#d65c2a"],
  [488, COLD],
  [690, COLD],
  [712, "#d65c2a"],
  [730, "#ffc480"],
  [748, "#d65c2a"],
  [770, COLD],
  [W, COLD],
];

function corners([x0, y0, x1, y1]: number[], c = 8) {
  return `M${x0} ${y0 + c}V${y0}H${x0 + c}M${x1 - c} ${y0}H${x1}V${y0 + c}M${x1} ${y1 - c}V${y1}H${x1 - c}M${x0 + c} ${y1}H${x0}V${y1 - c}`;
}

const lit5 = [
  [86, 154],
  [186, 129],
  [246, 204],
  [946, 179],
  [1106, 129],
];
const lit9 = [
  [506, 140],
  [646, 191],
];

function drift(x0: number, x1: number, h = 5) {
  return `M${x0} ${G}C${x0 + 8} ${G - h} ${x0 + 14} ${G - h} ${x0 + 22} ${G - h}H${x1 - 22}C${x1 - 14} ${G - h} ${x1 - 8} ${G - h} ${x1} ${G}Z`;
}

export default function RouteScene() {
  const scanFrom = ROUTE.stops[0] + ROUTE.scan[0];
  const scanTo = still + ROUTE.scan[1];
  return (
    <div className="route__scene on-dark">
      <svg className="route__svg" viewBox={`0 0 ${W} ${H}`} aria-hidden="true" focusable="false">
        <defs>
          <pattern id="rs-win5" width="20" height="25" patternUnits="userSpaceOnUse">
            <rect x="6" y="4" width="8" height="10" className="rs-win" />
          </pattern>
          <pattern id="rs-win9" width="20" height="17" patternUnits="userSpaceOnUse">
            <rect x="6" y="4" width="8" height="8" className="rs-win" />
          </pattern>
          <pattern id="rs-frames" width="24" height="10" patternUnits="userSpaceOnUse">
            <rect width="1.5" height="10" className="rs-frame" />
          </pattern>
          <linearGradient id="rs-strip" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={W} y2="0">
            {stripStops.map(([x, c]) => (
              <stop key={x} offset={(x / W).toFixed(4)} stopColor={c} />
            ))}
          </linearGradient>
          <radialGradient id="rs-h1">
            <stop offset="0" stopColor="#96604a" stopOpacity="0.55" />
            <stop offset="1" stopColor="#96604a" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="rs-h2">
            <stop offset="0" stopColor="#d65c2a" stopOpacity="0.5" />
            <stop offset="1" stopColor="#d65c2a" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="rs-h3">
            <stop offset="0" stopColor="#ffc480" stopOpacity="0.75" />
            <stop offset="0.35" stopColor="#f68434" stopOpacity="0.5" />
            <stop offset="1" stopColor="#d65c2a" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="rs-steam">
            <stop offset="0" stopColor="#eef0f5" stopOpacity="0.26" />
            <stop offset="0.55" stopColor="#eef0f5" stopOpacity="0.12" />
            <stop offset="1" stopColor="#eef0f5" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="rs-beam" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#eef0f5" stopOpacity="0.16" />
            <stop offset="1" stopColor="#eef0f5" stopOpacity="0.03" />
          </linearGradient>
          {/* what the camera has passed: the strip ends sharp, the heat in the ground fades out */}
          <clipPath id="rs-scan">
            <rect data-r="scan" x={scanFrom} y="0" width={scanTo - scanFrom} height={H} />
          </clipPath>
          <linearGradient data-r="feather" id="rs-feather" gradientUnits="userSpaceOnUse" x1={scanTo - 60} y1="0" x2={scanTo} y2="0">
            <stop offset="0" stopColor="#fff" />
            <stop offset="1" stopColor="#000" />
          </linearGradient>
          <mask id="rs-heat" maskUnits="userSpaceOnUse" x="-100" y="0" width={W + 200} height={H}>
            <rect data-r="heat" x={scanFrom - 60} y="0" width={scanTo - scanFrom + 60} height={H} fill="url(#rs-feather)" />
          </mask>
        </defs>

        {/* panel blocks across the yard, drawn faint; on a phone they drift slower than the street */}
        <g data-r="far" className="rs-far">
          <rect x="-60" y="110" width="360" height="126" className="rs-house" />
          <rect x="-44" y="122" width="332" height="100" fill="url(#rs-win5)" />
          <rect x="380" y="82" width="380" height="154" className="rs-house" />
          <rect x="392" y="92" width="356" height="130" fill="url(#rs-win9)" />
          <rect x="860" y="110" width="440" height="126" className="rs-house" />
          <rect x="872" y="122" width="416" height="100" fill="url(#rs-win5)" />
          {lit5.map(([x, y]) => (
            <rect key={`${x}-${y}`} x={x} y={y} width="8" height="10" className="rs-lit" />
          ))}
          {lit9.map(([x, y]) => (
            <rect key={`${x}-${y}`} x={x} y={y} width="8" height="8" className="rs-lit" />
          ))}
        </g>

        {/* ground: the road, snow with two bare patches (over the chamber and over the leak), the pipe */}
        <g className="rs-ground">
          <path d={`M-80 ${G}H${W + 120}`} className="rs-road" />
          {/* snow banks; bare over the chamber and over the leak, where the ground is warm */}
          <path d={[drift(-80, 446), drift(494, 694), drift(766, W + 120)].join("")} className="rs-snow" />
          <path d={`M-80 292H${W + 120}`} className="rs-pipe" />
          <rect x="444" y="262" width="52" height="58" className="rs-chamber" />
          <path d={`M462 ${G}V262M478 ${G}V262`} className="rs-chamber" />
          <path d={`M456 ${G - 1}H484`} className="rs-hatch" />
        </g>

        <g data-r="steam">
          <circle cx="474" cy="210" r="12" fill="url(#rs-steam)" />
          <circle cx="478" cy="182" r="18" fill="url(#rs-steam)" />
          <circle cx="483" cy="152" r="24" fill="url(#rs-steam)" opacity="0.7" />
          <circle cx="488" cy="124" r="30" fill="url(#rs-steam)" opacity="0.4" />
        </g>

        {/* what the drive leaves behind; fades out before the next lap */}
        <g data-r="state">
          <g data-r="scanned">
            <g mask="url(#rs-heat)">
              <ellipse cx="300" cy="280" rx="95" ry="34" fill="url(#rs-h1)" />
              <ellipse cx="470" cy="286" rx="52" ry="44" fill="url(#rs-h2)" />
              <ellipse cx="730" cy="282" rx="84" ry="58" fill="url(#rs-h3)" />
            </g>
            <g clipPath="url(#rs-scan)">
              <rect x="-80" y={G + 3} width={W + 200} height="10" fill="url(#rs-strip)" />
              <rect x="-80" y={G + 3} width={W + 200} height="10" fill="url(#rs-frames)" />
            </g>
          </g>

          {ROUTE.boxes.map((b, i) => (
            <path key={i} data-r="box" d={corners(b)} className={i === 2 ? "rs-box rs-box--hot" : "rs-box"} />
          ))}

          <g data-r="card" opacity="0">
            <rect x={ROUTE.card[0]} y={ROUTE.card[1]} width={ROUTE.card[2]} height={ROUTE.card[3]} rx="8" className="rs-card" />
            <rect x="866" y="48" width="72" height="5" className="rs-bar rs-bar--title" />
            {ROUTE.slots.map(([x, y], i) => (
              <g key={i}>
                <rect x={x - 4} y={y - 4} width="8" height="8" className="rs-slot" />
                <rect data-r="bar" x="882" y={y - 2.5} width={[132, 110, 92][i]} height="5" className={i === 0 ? "rs-bar rs-bar--top" : "rs-bar"} transform="scale(0 1)" />
              </g>
            ))}
          </g>

          {ROUTE.pins.map((p) => (
            <g key={p.x}>
              <path data-r="stem" d={`M${p.x} ${G - 20}V${G - 20}`} className="rs-stem" opacity="0" />
              <rect data-r="mark" x="-0.5" y="-0.5" width="1" height="1" className="rs-mark" opacity="0" transform={`translate(${p.x} ${p.top}) scale(${p.size})`} />
            </g>
          ))}
        </g>

        {/* the truck: rear loader, cab, and the camera on the cab roof (the hot pixel) */}
        <g data-r="truck" transform={`translate(${still - ROUTE.half} ${G})`}>
          <g data-r="body">
            <g data-r="beam">
              <path d="M147 -92L262 0H176Z" fill="url(#rs-beam)" />
              <path d="M176 -1H262" className="rs-foot" />
            </g>
            <path d="M4 -27H166" className="rs-truck" />
            <path d="M16 -92L7 -85L3 -46L11 -31H16Z" className="rs-truck" />
            <rect x="16" y="-96" width="94" height="69" rx="6" className="rs-truck" />
            <path d="M44 -88V-35M66 -88V-35M88 -88V-35" className="rs-rib" />
            <path d="M116 -27V-80A6 6 0 0 1 122 -86H148L166 -60V-27Z" className="rs-truck" />
            <path d="M124 -56V-76H146L159 -58V-56Z" className="rs-glass" />
            <g data-r="cam">
              <path d="M141 -86V-91" className="rs-truck" />
              <rect x="134" y="-104" width="14" height="13" className="rs-truck" />
              <rect data-r="lit" x="134" y="-104" width="14" height="13" className="rs-cam-on" />
            </g>
          </g>
          {[30, 58, 138].map((x) => (
            <g key={x} data-r="wheel" data-cx={x}>
              <circle cx={x} cy="-13" r="13" className="rs-truck" />
              <circle cx={x} cy="-13" r="7" className="rs-rim" />
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}
