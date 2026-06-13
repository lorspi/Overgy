import { useEffect } from "react";
import { AlertTriangle, X } from "lucide-react";

interface ErrorNotificationProps {
  message: string;
  onDismiss: () => void;
}

const AUTO_DISMISS_MS = 8000;

/**
 * Dismissible toast-style notification for purchase/cart errors.
 * Auto-dismisses after ~8 seconds or on user click.
 */
export function ErrorNotification({ message, onDismiss }: ErrorNotificationProps) {
  useEffect(() => {
    const timer = setTimeout(onDismiss, AUTO_DISMISS_MS);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  return (
    <div
      role="alert"
      aria-live="assertive"
      className="fixed bottom-6 left-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 animate-[slide-up_300ms_ease-out] rounded-xl border border-destructive/30 bg-card p-4 shadow-lg"
    >
      <div className="flex items-start gap-3">
        <AlertTriangle
          className="mt-0.5 h-5 w-5 shrink-0 text-destructive"
          aria-hidden="true"
        />
        <p className="flex-1 text-sm font-medium text-card-foreground">
          {message}
        </p>
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Cerrar notificación"
          className="shrink-0 rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
