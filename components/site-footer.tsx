const footerLinks = [
  { label: "Sobre nosotros", href: "/about" },
  { label: "Preguntas frecuentes", href: "/faq" },
  { label: "Envios", href: "/shipping" },
  { label: "Devoluciones", href: "/returns" },
  { label: "Privacidad", href: "/privacy" },
  { label: "Terminos", href: "/terms" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-neutral-200/70 bg-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-8 text-sm text-neutral-600 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex flex-col gap-2">
          <span className="text-xs uppercase tracking-[0.3em] text-neutral-400">
            Box Parfum
          </span>
          <span>Curated scents for every mood.</span>
          <span>Hecho en Mexico. Envios nacionales.</span>
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
          {footerLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-neutral-600 transition hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/40"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
