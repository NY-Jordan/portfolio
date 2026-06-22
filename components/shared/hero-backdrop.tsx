export function HeroBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--color-foreground) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage:
            "radial-gradient(ellipse 65% 55% at 25% 30%, black, transparent)",
        }}
      />
    </div>
  );
}
