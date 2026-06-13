import type { ReactNode } from "react";

export function Section({
  bg,
  children,
  className = "",
  overlay = "bg-background/85",
  id,
}: {
  bg?: string;
  children: ReactNode;
  className?: string;
  overlay?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={`relative ${bg ? "section-fixed-bg" : ""} ${className}`}
      style={bg ? { backgroundImage: `url(${bg})` } : undefined}
    >
      {bg && <div className={`absolute inset-0 ${overlay}`} />}
      <div className="relative container max-w-5xl mx-auto px-5 py-20 md:py-28">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  light = false,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  light?: boolean;
}) {
  return (
    <div className="max-w-3xl mx-auto text-center mb-14">
      {eyebrow && (
        <span
          className={`inline-block text-xs font-bold uppercase tracking-[0.25em] mb-3 ${
            light ? "text-[var(--brand-cyan)]" : "text-[var(--brand-purple)]"
          }`}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={`text-4xl md:text-5xl font-display font-extrabold ${
          light ? "text-white" : "text-foreground"
        }`}
        style={{ textShadow: light ? "2px 2px 0 rgba(0,0,0,0.15)" : "2px 2px 0 rgba(0,0,0,0.08)" }}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 text-lg ${
            light ? "text-white/85" : "text-muted-foreground"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}