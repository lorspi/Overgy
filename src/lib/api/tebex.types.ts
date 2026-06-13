// === Tipos de Respuesta de la API Tebex ===

export interface TebexCategory {
  id: number;
  name: string;
  slug: string;
  parent: Record<string, unknown>;
  description: string;
  packages: TebexPackage[];
  order: number;
  display_type: string;
}

export interface TebexPackage {
  id: number;
  name: string;
  description: string; // Cadena HTML
  image: string | null;
  type: string; // "single" | "subscription" etc.
  category: {
    id: number;
    name: string;
  };
  base_price: number;
  sales_tax: number;
  total_price: number;
  currency: string; // "USD", "EUR", etc.
  discount: number;
  disable_quantity: boolean;
  disable_gifting: boolean;
  expiration_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface TebexBasket {
  id: number;
  ident: string;
  complete: boolean;
  email: string | null;
  username: string | null;
  base_price: number;
  sales_tax: number;
  total_price: number;
  currency: string;
  packages: TebexBasketPackage[];
  links: {
    payment: string;
    checkout: string;
  };
}

export interface TebexBasketPackage {
  qty: number;
  type: string;
}

// === Wrappers de Respuesta de API ===

export interface TebexListResponse<T> {
  data: T[];
}

export interface TebexSingleResponse<T> {
  data: T;
}

// === Tipos Internos de la Aplicación ===

export interface PlayerNameState {
  value: string;
  error: string | null;
}

export interface StoreState {
  categories: TebexCategory[];
  activeCategory: number | null;
  packages: TebexPackage[];
  basket: TebexBasket | null;
  isCategoriesLoading: boolean;
  isPackagesLoading: boolean;
  isBuying: boolean;
  buyingPackageId: number | null;
  categoriesError: string | null;
  packagesError: string | null;
  buyError: string | null;
  checkoutComplete: boolean;
  retryCount: Record<string, number>; // clave: identificador de operación
}
