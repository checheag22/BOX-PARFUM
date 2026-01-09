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
      className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-emerald-500 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
      aria-label="Abrir WhatsApp"
    >
      <span aria-hidden="true">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12.04 2C6.51 2 2 6.49 2 12.02c0 2 .59 3.87 1.7 5.46L2 22l4.65-1.62a10 10 0 0 0 5.39 1.54h.01c5.52 0 10.02-4.49 10.02-10.02C22.06 6.49 17.56 2 12.04 2zm0 18.2h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-2.76.96.94-2.68-.2-.31a8.2 8.2 0 1 1 6.5 3.36zm4.77-6.12c-.26-.13-1.52-.75-1.76-.84-.24-.09-.41-.13-.58.13-.17.26-.67.84-.82 1.01-.15.17-.3.19-.56.06-.26-.13-1.09-.4-2.08-1.28-.77-.69-1.29-1.53-1.44-1.79-.15-.26-.02-.4.11-.53.12-.12.26-.3.39-.45.13-.15.17-.26.26-.43.09-.17.04-.32-.02-.45-.06-.13-.58-1.4-.79-1.92-.21-.5-.43-.43-.58-.44h-.5c-.17 0-.45.06-.69.32-.24.26-.91.89-.91 2.17 0 1.28.93 2.52 1.06 2.7.13.17 1.83 2.79 4.44 3.91.62.27 1.1.43 1.48.55.62.2 1.19.17 1.64.1.5-.08 1.52-.62 1.73-1.22.21-.6.21-1.12.15-1.22-.06-.1-.24-.16-.5-.29z" />
        </svg>
      </span>
      WhatsApp
    </a>
  );
}
