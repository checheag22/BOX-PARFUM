import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { formatPrice } from "@/lib/helpers";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { getAllProducts, getProductBySlug } from "@/services/catalog";
import { ProductGallery } from "@/app/product/[slug]/product-gallery";

type PageProps = {
  params: { slug: string };
};

export function generateMetadata({ params }: PageProps): Metadata {
  const product = getProductBySlug(params.slug);

  if (!product) {
    return {
      title: "Producto no encontrado | Box Parfum",
      description: "El producto solicitado no existe.",
    };
  }

  return {
    title: `${product.name} | ${product.brand} | Box Parfum`,
    description: product.description,
  };
}

export default function ProductPage({ params }: PageProps) {
  const product = getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  const headersList = headers();
  const host =
    headersList.get("x-forwarded-host") ?? headersList.get("host") ?? "";
  const protocol = headersList.get("x-forwarded-proto") ?? "http";
  const origin = host ? `${protocol}://${host}` : "";
  const currentUrl = origin ? `${origin}/product/${product.slug}` : "";

  const phone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE ?? "524779127884";
  const defaultMessage =
    process.env.NEXT_PUBLIC_WHATSAPP_DEFAULT_MESSAGE ??
    "Hola, me interesa este perfume.";
  const waMessage = `${defaultMessage}\nProducto: ${product.brand} ${product.name}\nPrecio: ${formatPrice(
    product.price,
    product.currency,
  )}\nLink: ${currentUrl}`;
  const waHref = phone ? buildWhatsAppUrl(phone, waMessage) : "";

  const recommendations = getAllProducts()
    .filter((item) => item.slug !== product.slug)
    .slice(0, 4);

  return (
    <div className="px-6 pb-20 pt-10">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <div className="flex flex-col gap-6 text-sm text-neutral-500">
          <Link href="/catalog" className="inline-flex items-center gap-2">
            ← Volver al catalogo
          </Link>
        </div>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <ProductGallery
            images={product.images}
            alt={`${product.brand} ${product.name}`}
          />

          <div className="flex flex-col gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-neutral-400">
                {product.brand}
              </p>
              <h1 className="mt-3 text-3xl font-semibold text-neutral-900 sm:text-4xl">
                {product.name}
              </h1>
              <div className="mt-4 text-xl font-semibold text-neutral-900">
                {formatPrice(product.price, product.currency)}
              </div>
              <p className="mt-2 text-sm text-neutral-500">
                {product.concentration} · {product.size_ml} ml
              </p>
            </div>

            <div className="rounded-3xl border border-line bg-white px-6 py-5 text-sm text-neutral-600">
              <p>{product.description}</p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs">
                <span className="rounded-full bg-neutral-100 px-3 py-1 text-neutral-600">
                  {product.gender}
                </span>
                <span className="rounded-full bg-neutral-100 px-3 py-1 text-neutral-600">
                  {product.season}
                </span>
                <span className="rounded-full bg-neutral-100 px-3 py-1 text-neutral-600">
                  {product.stock_status.replace("_", " ")}
                </span>
              </div>
            </div>

            <div className="grid gap-4 rounded-3xl border border-line bg-white px-6 py-5 text-sm text-neutral-600">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-neutral-400">
                  Notas
                </p>
                <div className="mt-3 grid gap-2">
                  <div>
                    <span className="font-semibold text-neutral-700">Salida:</span>{" "}
                    {product.notes.top.join(", ")}
                  </div>
                  <div>
                    <span className="font-semibold text-neutral-700">Corazon:</span>{" "}
                    {product.notes.heart.join(", ")}
                  </div>
                  <div>
                    <span className="font-semibold text-neutral-700">Fondo:</span>{" "}
                    {product.notes.base.join(", ")}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-full border border-neutral-300 bg-white px-6 py-3 text-sm font-semibold text-neutral-800 transition hover:border-neutral-500"
              >
                Agregar a wishlist
              </button>
              {waHref ? (
                <a
                  href={waHref}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500"
                >
                  Pedir por WhatsApp
                </a>
              ) : null}
            </div>
          </div>
        </div>

        <div className="mt-10">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-neutral-900">
              Tambien te puede gustar
            </h2>
            <Link href="/catalog" className="text-sm font-semibold text-accent">
              Ver catalogo
            </Link>
          </div>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {recommendations.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
