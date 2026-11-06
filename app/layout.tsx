import type { Metadata, Viewport } from "next";
import { Onest, JetBrains_Mono, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const sans = Onest({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const serif = Cormorant_Garamond({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500"],
  style: ["italic"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jylu — тепловой контроль теплосетей",
  description:
    "Тепловизор на коммунальной технике находит участки теплосетей с утечками до аварии. Пилот во Втором Павлодаре.",
  openGraph: {
    title: "Jylu — тепловой контроль теплосетей",
    description: "Находим утечки в теплосетях до аварии.",
    images: ["/video/poster.jpg"],
    locale: "ru_RU",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0908",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${sans.variable} ${mono.variable} ${serif.variable}`}>
      <body>{children}</body>
    </html>
  );
}
