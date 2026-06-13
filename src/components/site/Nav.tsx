import { NavLink, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { to: "/", label: "Inicio" },
  { to: "/ayuda/general", label: "Ayuda" },
  { to: "/reglas", label: "Reglas" },
  { to: "/noticias", label: "Noticias" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Nav estático — se va con el scroll */}
      <header className="absolute inset-x-0 top-0 z-40 py-5">
        <div className="container max-w-5xl mx-auto flex items-center justify-between px-5">
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/images/logo-full.png"
              alt="Overgy"
              className="h-10 w-auto"
            />
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  `px-4 py-2 text-sm font-semibold transition-colors ${
                    isActive ? "text-white" : "text-white/90 hover:text-white"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <a
              href="https://discord.mochos.xyz"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 text-sm font-semibold text-white/90 hover:text-white transition-colors"
            >
              Discord
            </a>
            <Link
              to="/tienda"
              className="btn-chunky btn-chunky-primary btn-chunky-sm ml-3"
            >
              Tienda
            </Link>
          </nav>

          <button
            className="md:hidden p-2 text-white transition-colors"
            aria-label="Menú"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {/* Nav flotante — baja desde arriba cuando se hace scroll */}
      <header
        className={`fixed inset-x-0 top-0 z-50 flex justify-center pointer-events-none transition-transform duration-500 ease-in-out ${
          scrolled || open ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div
          className={`pointer-events-auto mt-4 mx-4 md:mx-auto w-[calc(100%-2rem)] max-w-5xl backdrop-blur-md border border-foreground/10 rounded-[32px] md:rounded-full pt-2 pb-3 px-4 shadow-lg shadow-black/10 transition-all duration-300 ease-in-out ${
            open ? "bg-background rounded-[24px]" : "bg-background/70"
          }`}
        >
          <div className="flex items-center justify-between px-4">
            <Link to="/" className="flex items-center gap-2">
              <img
                src="/images/logo-full.png"
                alt="Overgy"
                className="h-10 w-auto"
              />
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.to === "/"}
                  className={({ isActive }) =>
                    `px-4 py-2 text-sm font-semibold transition-colors ${
                      isActive ? "text-primary" : "text-foreground/80 hover:text-primary"
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
              <a
                href="https://discord.mochos.xyz"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 text-sm font-semibold text-foreground/80 hover:text-primary transition-colors"
              >
                Discord
              </a>
              <Link
                to="/tienda"
                className="btn-chunky btn-chunky-primary btn-chunky-sm ml-3"
              >
                Tienda
              </Link>
            </nav>

            <button
              className="md:hidden p-2 text-foreground transition-colors"
              aria-label="Menú"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X /> : <Menu />}
            </button>
          </div>

          <div
            className="md:hidden grid transition-[grid-template-rows] duration-300 ease-in-out"
            style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
          >
            <div className="overflow-hidden">
              <nav className="flex flex-col gap-1 px-5 py-4">
                {links.map((l) => (
                  <NavLink
                    key={l.to}
                    to={l.to}
                    end={l.to === "/"}
                    onClick={() => setOpen(false)}
                    className="px-3 py-2 rounded-md text-base font-semibold text-foreground/90 hover:bg-secondary"
                  >
                    {l.label}
                  </NavLink>
                ))}
                <a
                  href="https://discord.mochos.xyz"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-2 rounded-md text-base font-semibold text-foreground/90 hover:bg-secondary"
                >
                  Discord
                </a>
                <Link
                  to="/tienda"
                  onClick={() => setOpen(false)}
                  className="btn-chunky btn-chunky-primary btn-chunky-sm mt-2 self-start"
                >
                  Tienda
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
