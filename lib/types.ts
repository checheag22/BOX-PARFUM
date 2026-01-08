export type CurrencyCode = "MXN" | "USD";

export type Concentration = "EDT" | "EDP" | "Parfum" | "Extrait" | "EDC";

export type Gender = "feminine" | "masculine" | "unisex";

export type Season = "spring" | "summer" | "autumn" | "winter" | "all";

export type StockStatus = "in_stock" | "low_stock" | "out_of_stock";

export type ProductNotes = {
  top: string[];
  heart: string[];
  base: string[];
};

export type Product = {
  id: string;
  slug: string;
  brand: string;
  name: string;
  price: number;
  currency: CurrencyCode;
  images: string[];
  notes: ProductNotes;
  concentration: Concentration;
  size_ml: number;
  gender: Gender;
  season: Season;
  stock_status: StockStatus;
  description: string;
  tags: string[];
};

export type CatalogFilters = {
  brands: string[];
  concentrations: Concentration[];
  genders: Gender[];
  seasons: Season[];
  stockStatuses: StockStatus[];
  sizes: number[];
};
