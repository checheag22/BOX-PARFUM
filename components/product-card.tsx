import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/helpers";

const tagStyles = [
  "bg-amber-100 text-amber-900",
  "bg-rose-100 text-rose-900",
  "bg-emerald-100 text-emerald-900",
  "bg-sky-100 text-sky-900",
];

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-100">
        <Image
          src={product.images[0]}
          alt={`${product.brand} ${product.name}`}
          fill
          className="object-cover transition duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 px-5 py-5">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-neutral-400">
            {product.brand}
          </p>
          <h3 className="mt-2 text-lg font-semibold text-neutral-900">
            {product.name}
          </h3>
        </div>
        <div className="text-sm font-semibold text-neutral-900">
          {formatPrice(product.price, product.currency)}
        </div>
        <div className="mt-auto flex flex-wrap gap-2">
          {product.tags.slice(0, 3).map((tag, index) => (
            <span
              key={tag}
              className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                tagStyles[index % tagStyles.length]
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
