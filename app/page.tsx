import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  ArrowRight,
  BarChart3,
  ClipboardList,
  HeartPulse,
  Leaf,
  Scale,
  Zap,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Ony — Anamnese e triagem nutricional",
  description:
    "Plataforma de anamnese nutricional completa: calcule TMB, gasto energético total e distribuição de macronutrientes com base em dados clínicos e estilo de vida.",
}

const FEATURES = [
  {
    icon: ClipboardList,
    titulo: "Ficha completa",
    descricao:
      "9 etapas cobrindo dados pessoais, histórico clínico, antropometria, estilo de vida e recordatório alimentar.",
  },
  {
    icon: BarChart3,
    titulo: "Cálculo preciso",
    descricao:
      "Harris-Benedict, Mifflin-St Jeor, Katch-McArdle, OMS e Henry — a fórmula mais adequada ao seu perfil é selecionada automaticamente.",
  },
  {
    icon: Scale,
    titulo: "Macronutrientes",
    descricao:
      "Distribuição de proteínas, carboidratos e gorduras ajustada ao objetivo de composição corporal e nível de atividade.",
  },
  {
    icon: HeartPulse,
    titulo: "Indicadores clínicos",
    descricao:
      "IMC, relação cintura-quadril, massa magra estimada e recomendação de ingestão hídrica calculados automaticamente.",
  },
  {
    icon: Zap,
    titulo: "Resultado imediato",
    descricao:
      "Sem cadastro. O plano nutricional estimado é gerado localmente, sem envio de dados para servidores.",
  },
  {
    icon: Leaf,
    titulo: "Orientação profissional",
    descricao:
      "Os resultados são pontos de partida educativos. A plataforma indica quando buscar avaliação individualizada.",
  },
]

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative border-b border-border bg-gradient-to-b from-primary/5 to-background">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:py-24 text-center">
          <Badge
            variant="secondary"
            className="mb-5 text-xs font-semibold uppercase tracking-wide"
          >
            Triagem nutricional gratuita
          </Badge>
          <h1 className="text-4xl font-bold leading-tight text-foreground text-balance sm:text-5xl">
            Bem-vindo(a) à{" "}
            <span className="text-primary">Ony</span>
          </h1>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed text-pretty max-w-xl mx-auto">
            Preencha a ficha de anamnese nutricional completa e receba
            estimativas de TMB, gasto energético total e distribuição de
            macronutrientes — tudo em minutos, sem cadastro.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button size="lg" asChild className="gap-2">
              <Link href="/anamnese">
                Começar agora
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/blog">Aprender mais</Link>
            </Button>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Sem cadastro. Dados processados localmente no seu navegador.
          </p>
        </div>
      </section>

      {/* Funcionalidades */}
      <section
        aria-labelledby="funcionalidades-heading"
        className="mx-auto max-w-5xl px-4 py-16 sm:py-20"
      >
        <div className="mb-10 text-center">
          <h2
            id="funcionalidades-heading"
            className="text-2xl font-bold text-foreground text-balance sm:text-3xl"
          >
            O que a Ony oferece
          </h2>
          <p className="mt-2 text-muted-foreground text-pretty max-w-lg mx-auto">
            Uma ficha de anamnese nutricional digital pensada para estudantes,
            profissionais e qualquer pessoa que queira entender melhor suas
            necessidades energéticas.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => {
            const Icon = f.icon
            return (
              <div
                key={f.titulo}
                className="flex flex-col gap-3 rounded-xl border border-border bg-card p-5"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                </div>
                <h3 className="font-semibold text-foreground">{f.titulo}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {f.descricao}
                </p>
              </div>
            )
          })}
        </div>
      </section>

      <Separator />

      {/* CTA secundário */}
      <section className="mx-auto max-w-2xl px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-foreground text-balance">
          Por onde começar?
        </h2>
        <p className="mt-3 text-muted-foreground leading-relaxed text-pretty">
          Para montar um plano alimentar personalizado, precisamos entender
          melhor você. O wizard guia cada etapa — de dados pessoais a objetivos
          — e gera seu plano nutricional estimado ao final.
        </p>
        <Button size="lg" className="mt-8 gap-2" asChild>
          <Link href="/anamnese">
            Preencher a ficha de anamnese
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </section>
    </>
  )
}
