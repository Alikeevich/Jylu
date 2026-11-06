import type { Viewport } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import { notFound } from "next/navigation";
import Script from "next/script";
import { HTML_LANG, LANGS, isLang } from "@/content/i18n";
import "../globals.css";

// cyrillic-ext carries the Kazakh letters (ә, ғ, қ, ң, ө, ұ, ү, һ, і)
const sans = IBM_Plex_Sans({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  weight: ["400", "500"],
  variable: "--font-sans",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const dynamicParams = false;

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

// The home page opens on the dark hero in both themes, so the status bar stays dark there.
// Legal pages override themeColor per scheme; site.js follows the in-page toggle.
export const viewport: Viewport = {
  themeColor: "#0b0d14",
  colorScheme: "dark light",
  viewportFit: "cover",
};

// Applies a saved theme before first paint. Without one the page follows the device.
const THEME_INIT =
  "try{var t=localStorage.getItem('jylu-theme');if(t==='light'||t==='dark')document.documentElement.setAttribute('data-theme',t)}catch(e){}";

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  return (
    <html lang={HTML_LANG[lang]} className={`${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT }} />
      </head>
      <body>
        {children}
        <Script src="/site.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
