import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Mail, Wrench } from "lucide-react"

export const metadata: Metadata = {
  title: "Suporte",
  description: "Página de suporte da Ony — em manutenção.",
  robots: { index: false },
}

export default function SuportePage() {
  return (
    <div className="mx-auto flex min-h-[calc(100dvh-8rem)] max-w-lg flex-col items-center justify-center px-4 py-12 text-center">
      {/* Ícone */}
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
        <Wrench className="h-7 w-7 text-primary" aria-hidden="true" />
      </div>

      <Badge variant="secondary" className="mb-4 text-xs uppercase tracking-wide">
        Em manutenção
      </Badge>

      <h1 className="text-3xl font-bold text-foreground text-balance">
        Suporte temporariamente indisponível
      </h1>
      <p className="mt-3 text-muted-foreground leading-relaxed text-pretty max-w-sm">
        Nossa página de suporte está recebendo melhorias. Agradecemos a
        paciência e voltaremos em breve com uma experiência ainda melhor.
      </p>

      {/* Barra de progresso animada */}
      <div
        className="my-8 h-2 w-64 overflow-hidden rounded-full bg-muted"
        aria-label="Progresso da manutenção"
      >
        <div
          className="h-full rounded-full bg-primary animate-[progressbar_3s_ease-in-out_infinite]"
          style={{
            animation: "progressbar 3s ease-in-out infinite",
          }}
        />
      </div>

      <Separator className="mb-8 max-w-xs" />

      {/* Contato alternativo */}
      <div className="mb-8 rounded-xl border border-border bg-card p-5 text-sm text-muted-foreground leading-relaxed space-y-2 w-full max-w-xs">
        <p className="font-medium text-foreground">Precisa de ajuda urgente?</p>
        <p>
          Envie um e-mail para{" "}
          <a
            href="mailto:suporte@onyapp.com.br"
            className="font-medium text-primary hover:underline"
          >
            suporte@onyapp.com.br
          </a>
        </p>
      </div>

      <Button variant="outline" asChild className="gap-2">
        <Link href="/">
          <ArrowLeft className="h-4 w-4" />
          Voltar à página inicial
        </Link>
      </Button>

      <style>{`
        @keyframes progressbar {
          0%   { width: 0%;   opacity: 1; }
          45%  { width: 85%;  opacity: 1; }
          55%  { width: 85%;  opacity: 1; }
          100% { width: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  )
}
