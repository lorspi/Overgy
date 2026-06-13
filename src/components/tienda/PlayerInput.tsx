import { useEffect, useId } from "react";
import { filterPlayerName } from "@/lib/playerName";
import { cn } from "@/lib/utils";

const SESSION_STORAGE_KEY = "orb_player_name";

interface PlayerInputProps {
  value: string;
  onChange: (value: string) => void;
  error: string | null;
}

/**
 * Controlled input for the player's in-game name.
 * Filters disallowed characters on input, persists to session storage,
 * and displays validation errors.
 */
export function PlayerInput({ value, onChange, error }: PlayerInputProps) {
  const id = useId();
  const errorId = `${id}-error`;

  // Restore from session storage on mount
  useEffect(() => {
    const stored = sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (stored) {
      onChange(stored);
    }
    // Only run on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Persist to session storage on every valid change
  useEffect(() => {
    sessionStorage.setItem(SESSION_STORAGE_KEY, value);
  }, [value]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const filtered = filterPlayerName(e.target.value);
    onChange(filtered);
  }

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="font-sans text-sm font-medium text-foreground"
      >
        Nombre de jugador
      </label>
      <input
        id={id}
        type="text"
        value={value}
        onChange={handleChange}
        maxLength={16}
        autoComplete="off"
        spellCheck={false}
        placeholder="Tu nombre en el juego"
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={cn(
          "min-h-[44px] w-full rounded-md border bg-transparent px-3 py-2 font-sans text-base shadow-sm transition-colors",
          "placeholder:text-muted-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "sm:min-h-[36px] sm:text-sm",
          error
            ? "border-destructive focus-visible:ring-destructive"
            : "border-input",
        )}
      />
      {error && (
        <p
          id={errorId}
          role="alert"
          className="font-sans text-sm text-destructive"
        >
          {error}
        </p>
      )}
    </div>
  );
}
