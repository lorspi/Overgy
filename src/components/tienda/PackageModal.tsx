import type { TebexPackage } from "@/lib/api/tebex.types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Package } from "lucide-react";

interface PackageModalProps {
  package: TebexPackage | null;
  open: boolean;
  onClose: () => void;
  onBuy: (pkg: TebexPackage) => void;
  isBuying: boolean;
}

/** Formats a price with its currency symbol using Intl. */
function formatPrice(amount: number, currency: string): string {
  try {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
    }).format(amount);
  } catch {
    // Fallback if currency code is invalid
    return `${currency} ${amount.toFixed(2)}`;
  }
}

/**
 * Modal de detalle de paquete usando Radix UI Dialog.
 * Proporciona trampa de foco, escape para cerrar, bloqueo de scroll,
 * y ancho completo en móvil.
 */
export function PackageModal({
  package: pkg,
  open,
  onClose,
  onBuy,
  isBuying,
}: PackageModalProps) {
  if (!pkg) return null;

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent
        className="w-full max-w-[600px] max-h-[90vh] overflow-y-auto p-0 sm:rounded-xl max-sm:!w-full max-sm:!max-w-none max-sm:!translate-x-0 max-sm:!left-0 max-sm:!rounded-none"
        aria-describedby="package-modal-description"
      >
        {/* Image */}
        {pkg.image ? (
          <img
            src={pkg.image}
            alt={pkg.name}
            className="w-full min-h-[200px] max-h-[300px] object-cover sm:rounded-t-xl"
          />
        ) : (
          <div className="flex w-full min-h-[200px] items-center justify-center bg-muted sm:rounded-t-xl">
            <Package className="h-20 w-20 text-muted-foreground opacity-40" />
          </div>
        )}

        <div className="p-6 space-y-4">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl font-bold leading-tight">
              {pkg.name}
            </DialogTitle>
            <DialogDescription className="sr-only" id="package-modal-description">
              Detalles del paquete {pkg.name}
            </DialogDescription>
          </DialogHeader>

          {/* Full description (HTML) */}
          <div
            className="prose prose-sm dark:prose-invert max-w-none text-foreground/80"
            dangerouslySetInnerHTML={{ __html: pkg.description }}
          />

          {/* Price */}
          <p className="font-display text-2xl font-bold text-brand-purple dark:text-brand-cyan">
            {formatPrice(pkg.total_price, pkg.currency)}
          </p>

          {/* Buy button */}
          <button
            type="button"
            onClick={() => onBuy(pkg)}
            disabled={isBuying}
            className="btn-chunky btn-chunky-primary w-full disabled:opacity-60 disabled:pointer-events-none"
          >
            {isBuying ? (
              <span className="inline-flex items-center gap-2">
                <svg
                  className="h-5 w-5 animate-spin"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Comprando…
              </span>
            ) : (
              "Comprar"
            )}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
