import Link from "next/link";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Catalogo", href: "/catalog" },
  { label: "Contacto", href: "/contact" },
];

export function SiteHeader() {
  return (
    <header className="border-b border-neutral-200/70 bg-white/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-6 py-4">
        <Link href="/" className="text-lg font-semibold tracking-[0.2em] text-neutral-900">
          BOX PARFUM
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium text-neutral-700">
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
