import { CheckCircle2 } from "lucide-react";

interface SuccessConfirmationProps {
  onDismiss: () => void;
}

/**
 * Purchase success message with a checkmark icon and a "Continuar comprando" button.
 * Displayed after a successful Tebex checkout completion.
 */
export function SuccessConfirmation({ onDismiss }: SuccessConfirmationProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col items-center gap-4 rounded-xl border border-brand-cyan/30 bg-brand-cyan/5 p-8 text-center"
    >
      <CheckCircle2
        className="h-14 w-14 text-brand-cyan"
        aria-hidden="true"
      />
      <h3 className="font-display text-xl font-bold">
        ¡Compra completada!
      </h3>
      <p className="text-sm text-muted-foreground">
        Tu compra se ha procesado exitosamente. Los artículos serán entregados a tu cuenta en breve.
      </p>
      <button
        type="button"
        onClick={onDismiss}
        className="btn-chunky btn-chunky-sm btn-chunky-cyan"
      >
        Continuar comprando
      </button>
    </div>
  );
}
