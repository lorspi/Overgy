import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Copy, Check, Search } from "lucide-react";

const SERVER_IP = "overgy.mochos.xyz";

export function PlayDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(SERVER_IP);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* no-op */
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[calc(100%-2rem)] sm:max-w-lg rounded-2xl border-[3px] border-foreground p-0 overflow-hidden max-h-[85dvh] overflow-y-auto">
        <div className="bg-gradient-to-br from-[var(--brand-purple)] to-[var(--brand-purple-deep)] px-6 py-6 text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-display">¡Únete a Overgy!</DialogTitle>
            <DialogDescription className="text-white/85">
              Elige cómo quieres entrar al servidor.
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="p-6 space-y-4 bg-background">
          <div className="rounded-xl border-2 border-foreground/15 p-4">
            <div className="flex items-center gap-3 mb-2">
              <span className="rounded-full bg-[var(--brand-cyan)]/20 p-2 text-[var(--brand-navy)]">
                <Search className="size-5" />
              </span>
              <h3 className="font-display text-lg">Buscar dentro del juego</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Abre Hytale, ve al navegador de servidores y busca{" "}
              <span className="font-semibold text-foreground">Overgy</span>.
            </p>
          </div>

          <div className="rounded-xl border-2 border-foreground/15 p-4">
            <div className="flex items-center gap-3 mb-3">
              <span className="rounded-full bg-[var(--brand-purple)]/15 p-2 text-[var(--brand-purple)]">
                <Copy className="size-5" />
              </span>
              <h3 className="font-display text-lg">Copiar IP</h3>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch gap-2">
              <code className="rounded-lg bg-secondary px-4 py-3 font-mono text-sm flex items-center justify-center">
                {SERVER_IP}
              </code>
              <button
                onClick={copy}
                className="btn-chunky btn-chunky-cyan btn-chunky-sm whitespace-nowrap"
              >
                {copied ? (
                  <>
                    <Check className="size-4" /> Copiado
                  </>
                ) : (
                  <>
                    <Copy className="size-4" /> Copiar
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}