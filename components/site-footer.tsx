const exploreLinks = [
  { label: "Inicio", href: "/" },
  { label: "Fragancias", href: "/catalog" },
  { label: "Nosotros", href: "/about" },
  { label: "Preguntas frecuentes", href: "/faq" },
  { label: "Contacto directo", href: "/contact" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-neutral-200/70 bg-[#f5efe7]">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-12 text-sm text-neutral-700 lg:grid-cols-[1.2fr_1fr_1fr]">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black">
              <img src="/images/logo.png" alt="Box Parfum" className="h-8 w-8" />
            </div>
            <span className="text-xs font-semibold uppercase tracking-[0.4em] text-neutral-900">
              Box Parfum
            </span>
          </div>
          <p className="max-w-sm text-base text-neutral-600">
            Perfumes árabes inspirados seleccionados con criterio y enfoque en
            calidad.
          </p>
        </div>

        <div className="flex flex-col gap-3 text-base text-neutral-600">
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-neutral-900">
            Explorar
          </span>
          {exploreLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition hover:text-neutral-900"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex flex-col gap-3 text-base text-neutral-600">
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-neutral-900">
            Atención
          </span>
          <span>Asesoría personalizada por WhatsApp</span>
          <span>WhatsApp: +52 477 896 0011</span>
          <span>Instagram: @boxparfum</span>
          <span>Email: boxparfum@outlook.com</span>
        </div>
      </div>
    </footer>
  );
}
