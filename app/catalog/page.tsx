import type { Metadata } from "next";
import { CatalogView } from "@/app/catalog/catalog-view";

export const metadata: Metadata = {
  title: "Catalogo | Box Parfum",
  description:
    "Explora perfumes seleccionados con filtros por marca, genero y concentracion.",
};

export default function CatalogPage() {
  return <CatalogView />;
}
