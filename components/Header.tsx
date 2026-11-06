"use client";

import { useEffect, useState } from "react";

const links = [
  { href: "#how", label: "Как работает" },
  { href: "#systems", label: "Системы" },
  { href: "#cycle", label: "Цикл" },
  { href: "#faq", label: "Вопросы" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`header${scrolled ? " header--scrolled" : ""}`}>
      <div className="header__inner">
        <a href="#top" className="logo" aria-label="Jylu — на главную">
          <span className="logo__mark" aria-hidden />
          Jylu
        </a>
        <nav className="nav" aria-label="Разделы">
          {links.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>
        <a href="#pilot" className="btn btn--small">
          Пилот
        </a>
      </div>
    </header>
  );
}
