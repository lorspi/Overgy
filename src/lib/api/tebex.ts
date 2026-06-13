import type {
  TebexCategory,
  TebexPackage,
  TebexBasket,
  TebexListResponse,
  TebexSingleResponse,
} from "./tebex.types";

// === Constantes ===

const TEBEX_BASE_URL = "https://headless.tebex.io/api";
const TEBEX_TOKEN = import.meta.env.VITE_TEBEX_TOKEN as string;
const REQUEST_TIMEOUT_MS = 15_000;
const MAX_RETRIES = 3;

// === Tipos de error internos ===

type ErrorType = "network" | "timeout" | "client" | "server" | "unknown";

interface NormalizedError {
  type: ErrorType;
  message: string;
}

// === Mensajes de error en español ===

const ERROR_MESSAGES: Record<ErrorType, string> = {
  network:
    "No se pudo conectar al servidor. Verifica tu conexión a internet.",
  timeout: "La solicitud tardó demasiado. Intenta de nuevo.",
  server:
    "El servidor de la tienda no está disponible. Intenta más tarde.",
  client: "Ocurrió un error al procesar tu solicitud.",
  unknown: "Ocurrió un error inesperado. Intenta de nuevo.",
};

// === Normalización de errores ===

/**
 * Clasifica un error y retorna un mensaje amigable en español.
 * Categorías: network, timeout, client (4xx), server (5xx), unknown.
 */
export function normalizeError(error: unknown): NormalizedError {
  // Timeout: AbortController signal aborted
  if (error instanceof DOMException && error.name === "AbortError") {
    return { type: "timeout", message: ERROR_MESSAGES.timeout };
  }

  // Network: TypeError from fetch (e.g., "Failed to fetch")
  if (error instanceof TypeError) {
    return { type: "network", message: ERROR_MESSAGES.network };
  }

  // HTTP errors passed as Response-like objects or custom error with status
  if (
    error instanceof Response ||
    (error !== null &&
      typeof error === "object" &&
      "status" in error &&
      typeof (error as { status: unknown }).status === "number")
  ) {
    const status = (error as { status: number }).status;
    if (status >= 500 && status <= 599) {
      return { type: "server", message: ERROR_MESSAGES.server };
    }
    if (status >= 400 && status <= 499) {
      return { type: "client", message: ERROR_MESSAGES.client };
    }
  }

  return { type: "unknown", message: ERROR_MESSAGES.unknown };
}

// === Control de reintentos ===

/**
 * Determina si una operación puede reintentarse basándose en el conteo
 * de fallos consecutivos. Retorna false después de MAX_RETRIES (3) fallos.
 */
export function canRetry(consecutiveFailures: number): boolean {
  return consecutiveFailures < MAX_RETRIES;
}

// === Wrapper principal de fetch ===

/**
 * Wrapper de fetch con timeout (AbortController a 15s) y normalización de errores.
 * Lanza un NormalizedError en caso de fallo.
 */
async function tebexFetch<T>(
  path: string,
  options?: RequestInit
): Promise<T> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(`${TEBEX_BASE_URL}${path}`, {
      ...options,
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });

    if (!response.ok) {
      throw response;
    }

    const data = (await response.json()) as T;
    return data;
  } catch (error) {
    const normalized = normalizeError(error);
    throw normalized;
  } finally {
    clearTimeout(timeoutId);
  }
}

// === Funciones públicas de la API ===

/**
 * Obtiene todas las categorías de la tienda con sus paquetes incluidos.
 */
export async function fetchCategories(): Promise<TebexCategory[]> {
  const response = await tebexFetch<TebexListResponse<TebexCategory>>(
    `/accounts/${TEBEX_TOKEN}/categories?includePackages=1`
  );
  return response.data;
}

/**
 * Obtiene los paquetes de una categoría específica.
 */
export async function fetchCategoryPackages(
  categoryId: number
): Promise<TebexPackage[]> {
  const response = await tebexFetch<TebexListResponse<TebexPackage>>(
    `/accounts/${TEBEX_TOKEN}/categories/${categoryId}/packages`
  );
  return response.data;
}

/**
 * Crea un nuevo carrito (basket) de Tebex asociado a un nombre de jugador.
 */
export async function createBasket(
  playerName: string
): Promise<TebexBasket> {
  const response = await tebexFetch<TebexSingleResponse<TebexBasket>>(
    `/accounts/${TEBEX_TOKEN}/baskets`,
    {
      method: "POST",
      body: JSON.stringify({
        username: playerName,
        complete_auto_redirect: false,
      }),
    }
  );
  return response.data;
}

/**
 * Agrega un paquete al carrito existente.
 */
export async function addPackageToBasket(
  basketIdent: string,
  packageId: number
): Promise<TebexBasket> {
  const response = await tebexFetch<TebexSingleResponse<TebexBasket>>(
    `/baskets/${basketIdent}/packages`,
    {
      method: "POST",
      body: JSON.stringify({
        package_id: packageId,
        quantity: 1,
      }),
    }
  );
  return response.data;
}
