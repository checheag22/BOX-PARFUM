import { buildWhatsAppUrl } from "@/lib/whatsapp";

const phone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE ?? "524779127884";
const defaultMessage =
  process.env.NEXT_PUBLIC_WHATSAPP_DEFAULT_MESSAGE ?? "Hola, me interesa un perfume.";

export function WhatsAppFloatingButton() {
  if (!phone) {
    return null;
  }

  const href = buildWhatsAppUrl(phone, defaultMessage);

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-emerald-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
      aria-label="Abrir WhatsApp"
    >
      <span className="h-2 w-2 rounded-full bg-white/80" />
      WhatsApp
    </a>
  );
}
