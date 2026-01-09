import type { Metadata } from "next";
import { CatalogView } from "@/app/catalog/catalog-view";

export const metadata: Metadata = {
  title: "Catálogo | Box Parfum",
  description:
    "Explora perfumes seleccionados con filtros por marca, género y concentración.",
};

export default function CatalogPage() {
  return <CatalogView />;
}
