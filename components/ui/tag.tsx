import { cn } from "@/lib/utils";

export function Tag({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "label-mono inline-flex items-center rounded-sm border border-border px-2 py-1 text-muted-foreground",
        className
      )}
      {...props}
    />
  );
}
