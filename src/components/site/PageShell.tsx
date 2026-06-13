import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Nav } from "./Nav";
import { Footer } from "./Footer";

export function PageShell({
  title,
  subtitle,
  breadcrumb,
  children,
}: {
  title: string;
  subtitle?: string;
  breadcrumb?: { label: string; to?: string }[];
  children: ReactNode;
}) {
  const crumbs = breadcrumb ?? [
    { label: "Inicio", to: "/" },
    { label: title },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <header
        className="relative section-fixed-bg pt-28 pb-10 md:pt-32 md:pb-14"
        style={{ backgroundImage: `url(/images/fondo-degradado.svg)` }}
      >
        <div className="absolute inset-0 bg-[var(--brand-navy)]/50" />
        <div className="relative container max-w-5xl mx-auto px-5 text-left text-white">
          <nav className="flex items-center gap-2 text-sm text-white/70 mb-4">
            {crumbs.map((c, i) => (
              <span key={i} className="flex items-center gap-2">
                {i > 0 && <span className="text-white/40">/</span>}
                {c.to ? (
                  <Link to={c.to} className="hover:text-white transition-colors">
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-white/90">{c.label}</span>
                )}
              </span>
            ))}
          </nav>
          <h1 className="text-3xl md:text-5xl font-display font-extrabold">{title}</h1>
          {subtitle && (
            <p className="mt-3 max-w-2xl text-base text-white/80">{subtitle}</p>
          )}
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
