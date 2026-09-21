import Link from "next/link";
import { Container } from "@/components/ui/container";
import { socialLinks } from "@/lib/content/social";
import type { Dictionary } from "@/lib/i18n/dictionaries/en";
import type { Locale } from "@/types";
import Image from "next/image";

interface FooterProps {
  locale: Locale;
  dict: Dictionary;
}

export function Footer({ locale, dict }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <Container className="flex flex-col gap-8 py-12">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <div className="flex flex-col gap-3">
          <Image width={130} height={130} src="/images/logo_nj.png"  alt="logo"/>
            <p className="max-w-sm text-sm text-muted-foreground">
              {dict.footer.tagline}
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noreferrer noopener" : undefined}
                className="transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex flex-col-reverse items-start justify-between gap-4 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>
            &copy; {year} Yvan Jordan Nguetse — NY-Jordan. {dict.footer.rights}
          </p>
          <Link href={`/${locale}/contact`} className="hover:text-foreground">
            {dict.nav.contact}
          </Link>
        </div>
      </Container>
    </footer>
  );
}
