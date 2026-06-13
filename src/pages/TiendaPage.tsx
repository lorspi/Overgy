import { useState, useEffect, useCallback, useRef } from "react";
import Tebex from "@tebexio/tebex.js";
import { PageShell } from "@/components/site/PageShell";
import { PlayerInput } from "@/components/tienda/PlayerInput";
import { CategoryTabs } from "@/components/tienda/CategoryTabs";
import { PackageGrid } from "@/components/tienda/PackageGrid";
import { PackageModal } from "@/components/tienda/PackageModal";
import { ErrorMessage } from "@/components/tienda/ErrorMessage";
import { ErrorNotification } from "@/components/tienda/ErrorNotification";
import { SuccessConfirmation } from "@/components/tienda/SuccessConfirmation";
import { useTebexStore } from "@/hooks/useTebexStore";
import { IS_DEMO_MODE } from "@/hooks/useTebexStore";
import { isValidPlayerName } from "@/lib/playerName";
import { canRetry } from "@/lib/api/tebex";
import type { TebexPackage } from "@/lib/api/tebex.types";

/**
 * TiendaPage — Main store page that orchestrates the purchase flow:
 * validate player name → create basket → add package → launch Tebex.js checkout.
 *
 * Handles Tebex.js events: payment:complete, close, payment:error.
 */
export function TiendaPage() {
  // --- Player name state ---
  const [playerName, setPlayerName] = useState("");
  const [playerNameError, setPlayerNameError] = useState<string | null>(null);

  // --- Modal state ---
  const [selectedPackage, setSelectedPackage] = useState<TebexPackage | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // --- Store state from hook ---
  const {
    categories,
    activeCategory,
    packages,
    isCategoriesLoading,
    isPackagesLoading,
    isBuying,
    buyingPackageId,
    categoriesError,
    buyError,
    selectCategory,
    retryCategories,
    retryPackages,
    buyPackage,
    dismissBuyError,
    checkoutComplete,
    dismissCheckoutComplete,
    basket,
    setCheckoutComplete,
    setBasket,
    retryCount,
  } = useTebexStore();

  // Ref to track if checkout has been launched for the current basket
  const checkoutLaunchedRef = useRef(false);

  // --- Player name validation ---
  const validatePlayerName = useCallback((): boolean => {
    if (!playerName.trim()) {
      setPlayerNameError("Ingresa tu nombre de jugador para comprar");
      return false;
    }
    if (playerName.length < 3) {
      setPlayerNameError("El nombre debe tener al menos 3 caracteres");
      return false;
    }
    if (!isValidPlayerName(playerName)) {
      setPlayerNameError("El nombre debe tener al menos 3 caracteres");
      return false;
    }
    setPlayerNameError(null);
    return true;
  }, [playerName]);

  // --- Handle buy action (from card or modal) ---
  const handleBuy = useCallback(
    (pkg: TebexPackage) => {
      if (!validatePlayerName()) return;
      setPlayerNameError(null);
      // Close modal if open
      setModalOpen(false);
      setSelectedPackage(null);
      buyPackage(pkg, playerName);
    },
    [validatePlayerName, buyPackage, playerName]
  );

  // --- Handle view details ---
  const handleViewDetails = useCallback((pkg: TebexPackage) => {
    setSelectedPackage(pkg);
    setModalOpen(true);
  }, []);

  // --- Handle modal close ---
  const handleModalClose = useCallback(() => {
    setModalOpen(false);
    setSelectedPackage(null);
  }, []);

  // --- Launch Tebex.js checkout when basket becomes non-null ---
  useEffect(() => {
    if (!basket || checkoutLaunchedRef.current) return;

    checkoutLaunchedRef.current = true;

    Tebex.checkout.init({
      ident: basket.ident,
      colors: [
        { name: "primary", color: "#8600c9" },
        { name: "secondary", color: "#46caff" },
      ],
    });

    Tebex.checkout.on("payment:complete", () => {
      setCheckoutComplete(true);
      setBasket(null);
      checkoutLaunchedRef.current = false;
    });

    Tebex.checkout.on("close", () => {
      setBasket(null);
      checkoutLaunchedRef.current = false;
    });

    Tebex.checkout.on("payment:error", () => {
      setBasket(null);
      checkoutLaunchedRef.current = false;
    });

    Tebex.checkout.launch();
  }, [basket, setCheckoutComplete, setBasket]);

  // --- Clear player name error when user types ---
  const handlePlayerNameChange = useCallback((value: string) => {
    setPlayerName(value);
    setPlayerNameError(null);
  }, []);

  // --- Determine retry state for categories ---
  const categoriesCanRetry = canRetry(retryCount.categories);

  // --- Render ---
  return (
    <PageShell
      title="Tienda"
      subtitle="Explora y compra paquetes para tu experiencia en el servidor"
    >
      <div className="container max-w-5xl mx-auto px-5 py-8 space-y-8">
        {/* Player Input section */}
        <section className="max-w-sm">
          <PlayerInput
            value={playerName}
            onChange={handlePlayerNameChange}
            error={playerNameError}
          />
        </section>

        {/* Demo mode banner */}
        {IS_DEMO_MODE && (
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
            <strong>Modo demo:</strong> Estás viendo contenido de ejemplo. Configura{" "}
            <code className="rounded bg-amber-500/20 px-1 py-0.5 font-mono text-xs">
              VITE_TEBEX_TOKEN
            </code>{" "}
            para cargar los productos reales de tu tienda.
          </div>
        )}

        {/* Success Confirmation */}
        {checkoutComplete && (
          <SuccessConfirmation onDismiss={dismissCheckoutComplete} />
        )}

        {/* Categories Error */}
        {categoriesError && (
          <ErrorMessage
            message={categoriesError}
            onRetry={retryCategories}
            canRetry={categoriesCanRetry}
          />
        )}

        {/* Empty store state */}
        {!isCategoriesLoading && !categoriesError && categories.length === 0 && (
          <p className="py-12 text-center text-muted-foreground">
            La tienda no está disponible en este momento
          </p>
        )}

        {/* Category Tabs */}
        {!categoriesError && categories.length > 0 && (
          <CategoryTabs
            categories={categories}
            activeId={activeCategory}
            onSelect={selectCategory}
            isLoading={isCategoriesLoading}
          />
        )}

        {/* Package Grid */}
        {!categoriesError && (isCategoriesLoading || categories.length > 0) && (
          <div
            id={activeCategory ? `tabpanel-category-${activeCategory}` : undefined}
            role="tabpanel"
            aria-label={
              categories.find((c) => c.id === activeCategory)?.name ?? "Paquetes"
            }
          >
            <PackageGrid
              packages={packages}
              isLoading={isCategoriesLoading || isPackagesLoading}
              onViewDetails={handleViewDetails}
              onBuy={handleBuy}
              buyingPackageId={buyingPackageId}
            />
          </div>
        )}

        {/* Package Modal */}
        <PackageModal
          package={selectedPackage}
          open={modalOpen}
          onClose={handleModalClose}
          onBuy={handleBuy}
          isBuying={isBuying}
        />
      </div>

      {/* Buy Error Notification (fixed position toast) */}
      {buyError && (
        <ErrorNotification message={buyError} onDismiss={dismissBuyError} />
      )}
    </PageShell>
  );
}
