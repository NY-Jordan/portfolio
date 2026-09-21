"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

import { Logo } from "@/components/brand/logo";
import { LocaleSwitcher } from "@/components/layout/locale-switcher";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";
import type { Dictionary } from "@/lib/i18n/dictionaries/en";
import type { Locale } from "@/types";
import Image from "next/image";

interface NavbarProps {
  locale: Locale;
  nav: Dictionary["nav"];
}

export function Navbar({ locale, nav }: NavbarProps) {
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(false);

  const links: { href: string; label: string }[] = [
    { href: `/${locale}/work`, label: nav.work },
    { href: `/${locale}/writing`, label: nav.writing },
    { href: `/${locale}/about`, label: nav.about },
    { href: `/${locale}/now`, label: nav.now },
    { href: `/${locale}/contact`, label: nav.contact },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-sm">
      <Container className="flex h-16 items-center justify-between">
        <Link href={`/${locale}`} onClick={() => setOpen(false)}>
          <Image width={130} height={130} src="/images/logo_nj.png"  alt="logo"/>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm transition-colors hover:text-foreground",
                  isActive ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            <LocaleSwitcher locale={locale} />
          </div>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="flex size-9 items-center justify-center text-foreground md:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </Container>

      {open && (
        <nav className="border-t border-border md:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="py-2 text-sm text-muted-foreground hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2">
              <LocaleSwitcher locale={locale} />
            </div>
          </Container>
        </nav>
      )}
    </header>
  );
}
