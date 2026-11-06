import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jylu",
  robots: { index: false, follow: true },
};

// "/" only picks a language: the saved one, Kazakh for a Kazakh browser, otherwise Russian.
const REDIRECT =
  "(function(){var l=null;try{l=localStorage.getItem('jylu-lang')}catch(e){}" +
  "if(l!=='kz'&&l!=='ru'&&l!=='en'){var n=((navigator.languages&&navigator.languages[0])||navigator.language||'').toLowerCase();l=n.indexOf('kk')===0?'kz':'ru'}" +
  "location.replace('/'+l+'/'+location.hash)})();";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <script dangerouslySetInnerHTML={{ __html: REDIRECT }} />
      </head>
      <body style={{ margin: 0, background: "#0b0d14", color: "#eef0f5", font: "16px/1.6 system-ui, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
