import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, RefreshCcw } from "lucide-react"
import { deSearchParams } from "@/lib/nutrition/serialization"
import { calcularPlanoNutricional } from "@/lib/nutrition/calculations"
import { ResultadoCards } from "@/components/resultado/resultado-cards"
import { ResultadoAcoes } from "@/components/resultado/resultado-acoes"

export const metadata: Metadata = {
  title: "Resultado Nutricional | Ony",
  description: "Seu plano nutricional estimado com TMB, GET e distribuição de macronutrientes.",
  robots: { index: false },
}

interface PageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export default async function ResultadoPage({ searchParams }: PageProps) {
  const params = await searchParams
  const { entrada, nome, camposFaltantes } = deSearchParams(params)

  if (!entrada) {
    return (
      <main className="mx-auto max-w-xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-foreground mb-3">
          Dados insuficientes
        </h1>
        <p className="text-muted-foreground mb-2">
          Não foi possível calcular o plano nutricional. Os seguintes campos
          obrigatórios estão ausentes:
        </p>
        <ul className="mb-8 text-sm text-destructive font-medium space-y-1">
          {camposFaltantes.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
        <Button asChild>
          <Link href="/anamnese">
            <RefreshCcw className="h-4 w-4 mr-2" />
            Preencher a ficha
          </Link>
        </Button>
      </main>
    )
  }

  const resultado = calcularPlanoNutricional(entrada)

  return (
    <main className="mx-auto max-w-2xl px-4 py-8 sm:py-12">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground text-balance">
            Plano Nutricional Estimado
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Com base nas informações da sua ficha de anamnese.
          </p>
        </div>
        <ResultadoAcoes />
      </div>

      <ResultadoCards resultado={resultado} nome={nome} />
    </main>
  )
}
