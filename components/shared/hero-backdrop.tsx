export function HeroBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -top-40 right-[-12%] size-[34rem] rounded-full bg-white/10 blur-[130px]" />
      <div className="absolute bottom-[-20%] left-[-12%] size-[26rem] rounded-full bg-white/[0.04] blur-[130px]" />

      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--color-foreground) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage:
            "radial-gradient(ellipse 55% 45% at 25% 30%, black, transparent)",
        }}
      />
    </div>
  );
}
