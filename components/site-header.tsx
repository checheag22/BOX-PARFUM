"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Buscar", href: "/catalog?focus=1" },
  { label: "Catálogo", href: "/catalog" },
  { label: "Contacto", href: "/contact" },
];

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const shouldScrollHomeRef = useRef(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isSearchOpen) {
      return;
    }
    const timer = window.setTimeout(() => {
      searchInputRef.current?.focus();
    }, 50);
    return () => window.clearTimeout(timer);
  }, [isSearchOpen]);

  useEffect(() => {
    if (pathname === "/" && shouldScrollHomeRef.current) {
      shouldScrollHomeRef.current = false;
      window.requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      });
    }
  }, [pathname]);

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const trimmed = searchValue.trim();
    if (!trimmed) {
      return;
    }
    setIsSearchOpen(false);
    router.push(`/catalog?focus=1&query=${encodeURIComponent(trimmed)}`);
  };

  return (
    <header className="border-b border-line/80 bg-white/80 backdrop-blur max-md:fixed max-md:left-0 max-md:right-0 max-md:top-0 max-md:z-50 md:sticky md:top-0 md:z-50">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-4 py-4 md:px-6 md:py-5">
        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-700 shadow-sm transition hover:bg-neutral-50"
            aria-label="Abrir menu"
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
            onClick={() => setIsOpen((open) => !open)}
          >
            {isOpen ? "✕" : "☰"}
          </button>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-700 shadow-sm transition hover:bg-neutral-50"
            aria-label="Buscar"
            onClick={() => {
              setIsOpen(false);
              setIsSearchOpen(false);
              router.push("/catalog?focus=1");
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
          </button>
        </div>
        <Link
          href="/"
          className="font-display text-lg tracking-[0.28em] text-neutral-900 max-md:absolute max-md:left-1/2 max-md:-translate-x-1/2"
          onClick={(event) => {
            setIsOpen(false);
            setIsSearchOpen(false);
            if (pathname === "/") {
              window.scrollTo({ top: 0, behavior: "smooth" });
              return;
            }
            event.preventDefault();
            shouldScrollHomeRef.current = true;
            router.push("/");
          }}
        >
          BOX PARFUM
        </Link>
        <nav className="hidden items-center gap-8 text-[13px] uppercase tracking-[0.3em] text-neutral-600 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/40"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="h-11 w-11 md:hidden" aria-hidden="true" />
      </div>
      <div
        id="mobile-nav"
        className={`border-t border-line/70 bg-white/80 px-6 py-4 md:hidden ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <nav className="flex flex-col gap-4 text-xs font-semibold uppercase tracking-[0.3em] text-neutral-700">
          {navItems.filter((item) => item.href !== "/catalog?focus=1").map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="transition-colors hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/40"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      <div
        className={`border-t border-line/70 bg-white/80 px-6 py-4 md:hidden ${
          isSearchOpen ? "block" : "hidden"
        }`}
      >
        <form onSubmit={handleSearchSubmit} className="flex items-center gap-3">
          <input
            type="search"
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            placeholder="Buscar perfume o marca"
            ref={searchInputRef}
            className="h-11 w-full rounded-full border border-neutral-200 bg-white px-4 text-base text-neutral-900 outline-none placeholder:text-neutral-400"
          />
          <button
            type="submit"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-neutral-900 text-white"
            aria-label="Buscar"
          >
            ↵
          </button>
        </form>
      </div>
    </header>
  );
}
