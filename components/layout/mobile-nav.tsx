"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

const LINKS = [
  { href: "/anamnese", label: "Iniciar anamnese" },
  { href: "/blog", label: "Blog" },
  { href: "/suporte", label: "Suporte" },
  { href: "/apoie", label: "Apoie" },
  { href: "/entrar", label: "Entrar" },
] as const

export function MobileNav() {
  const [aberto, setAberto] = useState(false)

  return (
    <Dialog open={aberto} onOpenChange={setAberto}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <Menu className="size-5" aria-hidden="true" />
          <span className="sr-only">Abrir menu de navegação</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Navegação</DialogTitle>
        </DialogHeader>
        <nav aria-label="Navegação móvel">
          <ul className="flex flex-col gap-1">
            {LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setAberto(false)}
                  className="block rounded-md px-3 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </DialogContent>
    </Dialog>
  )
}
