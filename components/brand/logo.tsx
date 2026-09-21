import Image from "next/image";
import { cn } from "@/lib/utils";

const LOGO_SRC = "/images/logo_nj.png";
const LOGO_RATIO = 223 / 56;

interface LogoProps {
  variant?: "mark" | "horizontal" | "vertical";
  className?: string;
}

export function Logo({ variant = "horizontal", className }: LogoProps) {
  if (variant === "mark") {
    const size = 32;
    return (
      <div
        className={cn("relative overflow-hidden", className)}
        style={{ width: size, height: size }}
      >
        <Image
          src={LOGO_SRC}
          alt="NY-Jordan"
          width={Math.round(size * LOGO_RATIO)}
          height={size}
          className="max-w-none"
          priority
        />
      </div>
    );
  }

  if (variant === "vertical") {
    return (
      <div className={cn("flex justify-center", className)}>
        <Image
          src={LOGO_SRC}
          alt="NY-Jordan — Software Engineer & Product Builder"
          width={Math.round(48 * LOGO_RATIO)}
          height={48}
          priority
        />
      </div>
    );
  }

  return (
    <Image
      src={LOGO_SRC}
      alt="NY-Jordan"
      width={Math.round(32 * LOGO_RATIO)}
      height={32}
      className={className}
      priority
    />
  );
}
