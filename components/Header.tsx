"use client";

import { useEffect, useState } from "react";
import SpotMeter from "./SpotMeter";

const links = [
  { href: "#how", label: "Как работает" },
  { href: "#systems", label: "Системы" },
  { href: "#cycle", label: "Цикл" },
  { href: "#faq", label: "Вопросы" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`header${scrolled || open ? " header--solid" : ""}`}>
      <div className="header__inner">
        <a href="#top" className="logo" aria-label="Jylu — на главную">
          <SpotMeter size={18} className="logo__mark" />
          Jylu
        </a>
        <nav className={`nav${open ? " nav--open" : ""}`} aria-label="Разделы">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
        </nav>
        <a href="#pilot" className="btn btn--nav">
          Пилот
        </a>
        <button
          type="button"
          className="menu"
          aria-expanded={open}
          aria-label="Меню"
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
            {open ? <path d="M4 4l10 10M14 4L4 14" strokeLinecap="round" /> : <path d="M2.5 6h13M2.5 12h13" strokeLinecap="round" />}
          </svg>
        </button>
      </div>
    </header>
  );
}
