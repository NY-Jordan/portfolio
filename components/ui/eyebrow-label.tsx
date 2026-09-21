import { cn } from "@/lib/utils";

export function EyebrowLabel({
  className,
  children,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      className={cn(
        "label-mono flex items-center gap-2 text-accent",
        className
      )}
      {...props}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
      {children}
    </p>
  );
}
