import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Catálogo | Box Parfum",
  description:
    "Explora perfumes seleccionados con filtros por marca, género y concentración.",
};

export default function CatalogLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
