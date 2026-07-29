import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MobileNav } from "./mobile-nav"

export const NAV_LINKS = [
  { href: "/blog", label: "Blog" },
  { href: "/suporte", label: "Suporte" },
  { href: "/apoie", label: "Apoie" },
] as const

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
        >
          <Image
            src="/images/logo-brand/Icon.png"
            alt=""
            width={32}
            height={32}
            className="size-8 rounded-md object-contain"
            priority
          />
          <span className="text-lg font-extrabold tracking-tight text-foreground">
            Ony
          </span>
        </Link>

        <nav aria-label="Navegação principal" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="rounded-md px-3 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm" className="hidden sm:flex">
            <Link href="/login">Entrar</Link>
          </Button>
          <Button asChild size="sm" className="hidden sm:flex">
            <Link href="/anamnese">Iniciar anamnese</Link>
          </Button>
          <MobileNav />
        </div>
      </div>
    </header>
  )
}
