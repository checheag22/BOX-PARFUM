const DEFAULT_WHATSAPP_PHONES = ["524779127884", "524778960011"];

function normalizePhone(phone: string) {
  return phone.replace(/\D/g, "");
}

export function resolveWhatsAppPhones({
  phones,
  phone,
}: {
  phones?: string;
  phone?: string;
} = {}) {
  const parsedList = phones
    ? phones.split(/[,\s;]+/).filter(Boolean).map(normalizePhone)
    : [];
  if (parsedList.length > 0) {
    return parsedList;
  }

  const parsedSingle = phone ? [normalizePhone(phone)].filter(Boolean) : [];
  if (parsedSingle.length > 0) {
    return parsedSingle;
  }

  return DEFAULT_WHATSAPP_PHONES;
}

export function buildWhatsAppUrl(phone: string, message: string) {
  const normalized = normalizePhone(phone);
  const text = encodeURIComponent(message);
  return `https://wa.me/${normalized}?text=${text}`;
}

export function buildWhatsAppUrlFromPhones(phones: string[], message: string) {
  if (phones.length === 0) {
    return "";
  }
  const selected = phones[Math.floor(Math.random() * phones.length)];
  return buildWhatsAppUrl(selected, message);
}
