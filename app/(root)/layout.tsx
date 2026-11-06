import type { Metadata } from "next";
import { DEFAULT_LANG, HTML_LANG, LANGS } from "@/content/i18n";

export const metadata: Metadata = {
  title: "Jylu",
  robots: { index: false, follow: true },
};

// "/" only picks a language: the saved one, Kazakh for a Kazakh browser, otherwise Russian.
const REDIRECT =
  `(function(){var langs=${JSON.stringify(LANGS)},l=null;try{l=localStorage.getItem('jylu-lang')}catch(e){}` +
  "if(langs.indexOf(l)<0){var n=((navigator.languages&&navigator.languages[0])||navigator.language||'').toLowerCase();" +
  `l=n.indexOf('${HTML_LANG.kz}')===0?'kz':'${DEFAULT_LANG}'}` +
  "location.replace('/'+l+'/'+location.hash)})();";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={HTML_LANG[DEFAULT_LANG]}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: REDIRECT }} />
      </head>
      <body style={{ margin: 0, background: "#0b0d14", color: "#eef0f5", font: "16px/1.6 system-ui, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
