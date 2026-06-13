import { AlertCircle } from "lucide-react";

interface ErrorMessageProps {
  message: string;
  onRetry: () => void;
  canRetry: boolean;
}

/**
 * Inline error component with a message and an optional "Reintentar" button.
 * Used for category/package fetch errors displayed within the content area.
 */
export function ErrorMessage({ message, onRetry, canRetry }: ErrorMessageProps) {
  return (
    <div
      role="alert"
      className="flex flex-col items-center gap-4 rounded-xl border border-destructive/30 bg-destructive/5 p-6 text-center"
    >
      <AlertCircle className="h-10 w-10 text-destructive" aria-hidden="true" />
      <p className="text-sm font-medium text-destructive">{message}</p>
      {canRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="btn-chunky btn-chunky-sm btn-chunky-primary"
        >
          Reintentar
        </button>
      )}
    </div>
  );
}
