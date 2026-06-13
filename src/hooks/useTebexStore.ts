import { useState, useEffect, useCallback, useRef } from "react";
import type { TebexCategory, TebexPackage, TebexBasket } from "@/lib/api/tebex.types";
import {
  fetchCategories,
  createBasket,
  addPackageToBasket,
  normalizeError,
  canRetry,
} from "@/lib/api/tebex";
import { DEMO_CATEGORIES } from "@/lib/api/tebex.demo";

// Detectar si el token de Tebex está configurado
const TEBEX_TOKEN = import.meta.env.VITE_TEBEX_TOKEN as string | undefined;
const IS_DEMO_MODE = !TEBEX_TOKEN || TEBEX_TOKEN.trim() === "";

export { IS_DEMO_MODE };

// === Helper: extraer mensaje de error ===

/**
 * Extrae el mensaje de error de un error lanzado por la capa API.
 * Los errores de tebexFetch ya son NormalizedError { type, message }.
 * Si no, se normaliza con normalizeError.
 */
function extractErrorMessage(error: unknown): string {
  // Si ya es un NormalizedError (lanzado por tebexFetch)
  if (
    error !== null &&
    typeof error === "object" &&
    "message" in error &&
    "type" in error
  ) {
    return (error as { message: string }).message;
  }
  // Fallback: normalizar el error crudo
  const normalized = normalizeError(error);
  return normalized.message;
}

// === Helper: filtrar paquetes por categoría ===

/**
 * Filtra los paquetes de un conjunto de categorías por ID de categoría.
 * Retorna solo los paquetes cuyo category.id coincide con el ID proporcionado.
 */
export function getPackagesForCategory(
  categories: TebexCategory[],
  categoryId: number | null
): TebexPackage[] {
  if (categoryId === null) return [];
  const category = categories.find((c) => c.id === categoryId);
  if (!category) return [];
  return category.packages;
}

// === Hook principal ===

export function useTebexStore() {
  // --- Datos ---
  const [categories, setCategories] = useState<TebexCategory[]>([]);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [basket, setBasket] = useState<TebexBasket | null>(null);

  // --- Estados de carga ---
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(true);
  const [isPackagesLoading, setIsPackagesLoading] = useState(false);
  const [isBuying, setIsBuying] = useState(false);
  const [buyingPackageId, setBuyingPackageId] = useState<number | null>(null);

  // --- Estados de error ---
  const [categoriesError, setCategoriesError] = useState<string | null>(null);
  const [packagesError, setPackagesError] = useState<string | null>(null);
  const [buyError, setBuyError] = useState<string | null>(null);

  // --- Estado de checkout ---
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  // --- Seguimiento de reintentos ---
  const [retryCount, setRetryCount] = useState<Record<string, number>>({
    categories: 0,
    packages: 0,
    buy: 0,
  });

  // Ref para evitar doble fetch en StrictMode
  const hasFetchedRef = useRef(false);

  // --- Paquetes derivados de la categoría activa ---
  const packages = getPackagesForCategory(categories, activeCategory);

  // --- Obtener categorías ---
  const loadCategories = useCallback(async () => {
    setIsCategoriesLoading(true);
    setCategoriesError(null);

    // Modo demo: usar datos simulados sin llamar a la API
    if (IS_DEMO_MODE) {
      const withPackages = DEMO_CATEGORIES.filter((c) => c.packages.length > 0);
      setCategories(withPackages);
      if (withPackages.length > 0) {
        setActiveCategory(withPackages[0].id);
      }
      setIsCategoriesLoading(false);
      return;
    }

    try {
      const data = await fetchCategories();

      // Ocultar categorías sin paquetes disponibles
      const withPackages = data.filter((c) => c.packages.length > 0);
      setCategories(withPackages);

      // Auto-seleccionar la primera categoría con paquetes
      if (withPackages.length > 0) {
        setActiveCategory(withPackages[0].id);
      }

      // Reset retry count on success
      setRetryCount((prev) => ({ ...prev, categories: 0 }));
    } catch (error) {
      const message = extractErrorMessage(error);
      setCategoriesError(message);
      setRetryCount((prev) => ({
        ...prev,
        categories: prev.categories + 1,
      }));
    } finally {
      setIsCategoriesLoading(false);
    }
  }, []);

  // --- Seleccionar categoría ---
  const selectCategory = useCallback((id: number) => {
    setActiveCategory(id);
    setPackagesError(null);
  }, []);

  // --- Reintentar categorías ---
  const retryCategories = useCallback(() => {
    if (!canRetry(retryCount.categories)) return;
    loadCategories();
  }, [retryCount.categories, loadCategories]);

  // --- Reintentar paquetes (re-fetch categorías ya que los paquetes vienen incluidos) ---
  const retryPackages = useCallback(() => {
    if (!canRetry(retryCount.packages)) return;
    loadCategories();
  }, [retryCount.packages, loadCategories]);

  // --- Flujo de compra ---
  const buyPackage = useCallback(
    async (pkg: TebexPackage, playerName: string) => {
      setIsBuying(true);
      setBuyingPackageId(pkg.id);
      setBuyError(null);

      // Modo demo: simular compra sin llamar a la API
      if (IS_DEMO_MODE) {
        // Simular un breve delay como si se procesara
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setBuyError(
          "Modo demo: la compra no se procesó. Configura VITE_TEBEX_TOKEN para habilitar compras reales."
        );
        setIsBuying(false);
        setBuyingPackageId(null);
        return;
      }

      try {
        // Paso 1: Crear carrito
        const newBasket = await createBasket(playerName);

        // Paso 2: Agregar paquete al carrito
        const updatedBasket = await addPackageToBasket(newBasket.ident, pkg.id);
        setBasket(updatedBasket);

        // Reset retry count on success
        setRetryCount((prev) => ({ ...prev, buy: 0 }));

        // El checkout (Tebex.js launch) será manejado por TiendaPage
        // al detectar que basket no es null
      } catch (error) {
        const message = extractErrorMessage(error);
        setBuyError(message);
        setRetryCount((prev) => ({
          ...prev,
          buy: prev.buy + 1,
        }));
        setBasket(null);
      } finally {
        setIsBuying(false);
        setBuyingPackageId(null);
      }
    },
    []
  );

  // --- Descartar error de compra ---
  const dismissBuyError = useCallback(() => {
    setBuyError(null);
  }, []);

  // --- Descartar confirmación de checkout ---
  const dismissCheckoutComplete = useCallback(() => {
    setCheckoutComplete(false);
    setBasket(null);
  }, []);

  // --- Fetch inicial al montar ---
  useEffect(() => {
    if (hasFetchedRef.current) return;
    hasFetchedRef.current = true;
    loadCategories();
  }, [loadCategories]);

  return {
    // Datos
    categories,
    activeCategory,
    packages,

    // Estados de carga
    isCategoriesLoading,
    isPackagesLoading,
    isBuying,
    buyingPackageId,

    // Estados de error
    categoriesError,
    packagesError,
    buyError,

    // Acciones
    selectCategory,
    retryCategories,
    retryPackages,
    buyPackage,
    dismissBuyError,

    // Estado de checkout
    checkoutComplete,
    dismissCheckoutComplete,

    // Exponer basket para que TiendaPage pueda lanzar Tebex.js
    basket,
    setCheckoutComplete,
    setBasket,

    // Retry counts para determinar si mostrar botón de reintento
    retryCount,
  };
}
