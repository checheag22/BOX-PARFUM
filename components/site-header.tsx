import Link from "next/link";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Buscar", href: "/catalog?focus=1" },
  { label: "Catálogo", href: "/catalog" },
  { label: "Contacto", href: "/contact" },
];

export function SiteHeader() {
  return (
    <header className="border-b border-line/80 bg-white/70 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-6 py-5">
        <Link
          href="/"
          className="font-display text-lg tracking-[0.28em] text-neutral-900"
        >
          BOX PARFUM
        </Link>
        <nav className="flex items-center gap-8 text-[13px] uppercase tracking-[0.3em] text-neutral-600">
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
      </div>
    </header>
  );
}
