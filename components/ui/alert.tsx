import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const alertVariants = cva(
  "rounded-sm border px-4 py-3 text-sm",
  {
    variants: {
      variant: {
        success: "border-accent/40 bg-accent/10 text-accent",
        error: "border-red-500/40 bg-red-500/10 text-red-400",
      },
    },
    defaultVariants: {
      variant: "success",
    },
  }
);

function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      role="status"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Alert, alertVariants };
