import Link from "next/link"
import { Separator } from "@/components/ui/separator"

export function SiteFooter() {
  return (
    <footer className="border-t border-border/70 bg-secondary/40">
      <div className="mx-auto w-full max-w-6xl px-4 py-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-md">
            <p className="text-base font-extrabold tracking-tight text-foreground">
              Ony
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Anamnese nutricional completa com estimativa de taxa metabólica
              basal, gasto energético total e distribuição de macronutrientes.
            </p>
          </div>

          <nav aria-label="Links do rodapé">
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
              {[
                { href: "/anamnese", label: "Anamnese" },
                { href: "/blog", label: "Blog" },
                { href: "/suporte", label: "Suporte" },
                { href: "/apoie", label: "Apoie" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-semibold text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <Separator className="my-6" />

        <p className="text-pretty text-xs leading-relaxed text-muted-foreground">
          Esta ferramenta é um ponto de partida educativo e não substitui a
          consulta com nutricionista ou médico. Para orientação individualizada,
          procure um profissional habilitado.
        </p>
        <p className="mt-2 text-xs text-muted-foreground">
          {`© ${new Date().getFullYear()} Ony. Todos os direitos reservados.`}
        </p>
      </div>
    </footer>
  )
}
