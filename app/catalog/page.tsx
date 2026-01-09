"use client";

export const dynamic = "force-dynamic";

import { Suspense } from "react";
import { CatalogView } from "@/app/catalog/catalog-view";

export default function CatalogPage() {
  return (
    <Suspense fallback={<div />}>
      <CatalogView />
    </Suspense>
  );
}
