"use client"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { AlertTriangle, Info } from "lucide-react"
import type { ResultadoCalculo } from "@/lib/nutrition/calculations"
import { LABEL_FORMULA } from "@/lib/nutrition/labels"

// ── Card base ──────────────────────────────────────────────────────────────────

function CardMetrica({
  titulo,
  valor,
  unidade,
  detalhe,
  destaque,
  dica,
}: {
  titulo: string
  valor: string | number
  unidade?: string
  detalhe?: string
  destaque?: boolean
  dica?: string
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-1.5 rounded-xl border p-5",
        destaque
          ? "border-primary/40 bg-primary/5"
          : "border-border bg-card",
      )}
    >
      <div className="flex items-center gap-1.5">
        <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {titulo}
        </span>
        {dica && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button type="button" aria-label={`Informação sobre ${titulo}`}>
                  <Info className="h-3.5 w-3.5 text-muted-foreground/60" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="top" className="max-w-60 text-xs">
                {dica}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      <div className="flex items-baseline gap-1.5">
        <span
          className={cn(
            "text-3xl font-bold tabular-nums",
            destaque ? "text-primary" : "text-foreground",
          )}
        >
          {typeof valor === "number" ? valor.toLocaleString("pt-BR") : valor}
        </span>
        {unidade && (
          <span className="text-sm text-muted-foreground">{unidade}</span>
        )}
      </div>
      {detalhe && (
        <span className="text-xs text-muted-foreground leading-relaxed">
          {detalhe}
        </span>
      )}
    </div>
  )
}

// ── Barra de macro ─────────────────────────────────────────────────────────────

function BarraMacro({
  nome,
  gramas,
  kcal,
  percentual,
  cor,
}: {
  nome: string
  gramas: number
  kcal: number
  percentual: number
  cor: string
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-foreground">{nome}</span>
        <span className="text-muted-foreground tabular-nums">
          {gramas}g · {kcal} kcal · {percentual}%
        </span>
      </div>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
        <div
          className={cn("h-full rounded-full transition-all", cor)}
          style={{ width: `${percentual}%` }}
          role="progressbar"
          aria-valuenow={percentual}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${nome}: ${percentual}%`}
        />
      </div>
    </div>
  )
}

// ── Componente principal ───────────────────────────────────────────────────────

export function ResultadoCards({
  resultado,
  nome,
}: {
  resultado: ResultadoCalculo
  nome?: string
}) {
  const { macros } = resultado

  const ajusteSinal = resultado.ajustePercentual > 0 ? "+" : ""
  const ajustePct = `${ajusteSinal}${Math.round(resultado.ajustePercentual * 100)}%`

  return (
    <div className="flex flex-col gap-8">
      {/* Avisos */}
      {resultado.avisos.length > 0 && (
        <div className="flex flex-col gap-2">
          {resultado.avisos.map((aviso, i) => (
            <div
              key={i}
              role="alert"
              className="flex items-start gap-3 rounded-lg border border-amber-500/30 bg-amber-500/5 px-4 py-3"
            >
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
              <p className="text-sm text-foreground leading-relaxed">{aviso}</p>
            </div>
          ))}
        </div>
      )}

      {/* Saudação */}
      {nome && (
        <div>
          <h2 className="text-lg font-semibold text-foreground">
            Resultado para {nome}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
            Fórmula utilizada:{" "}
            <strong className="text-foreground">
              {LABEL_FORMULA[resultado.formulaUtilizada]}
            </strong>
            {resultado.formulaFoiAutomatica && " (selecionada automaticamente)"}
          </p>
        </div>
      )}

      {/* IMC */}
      <section aria-labelledby="secao-imc">
        <h3
          id="secao-imc"
          className="mb-3 text-sm font-bold uppercase tracking-wide text-primary"
        >
          Composição e IMC
        </h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <CardMetrica
            titulo="IMC"
            valor={resultado.imc ?? "—"}
            detalhe={resultado.classificacaoImc ?? undefined}
            dica="Índice de Massa Corporal. Triagem simples, não substitui avaliação clínica."
          />
          {resultado.massaMagraEstimada != null && (
            <CardMetrica
              titulo="Massa magra est."
              valor={resultado.massaMagraEstimada}
              unidade="kg"
              dica="Calculada a partir do % de gordura informado."
            />
          )}
          {resultado.aguaRecomendadaLitros != null && (
            <CardMetrica
              titulo="Água recomendada"
              valor={resultado.aguaRecomendadaLitros}
              unidade="L/dia"
              dica="Estimativa de 35 mL por kg de peso corporal."
            />
          )}
          {resultado.relacaoCinturaQuadril != null && (
            <CardMetrica
              titulo="Relação cintura-quadril"
              valor={resultado.relacaoCinturaQuadril}
              dica="RCQ: indicador de risco cardiometabólico. Risco elevado acima de 0,90 (H) e 0,85 (M)."
            />
          )}
        </div>
      </section>

      <Separator />

      {/* Metabolismo */}
      <section aria-labelledby="secao-metabolismo">
        <h3
          id="secao-metabolismo"
          className="mb-3 text-sm font-bold uppercase tracking-wide text-primary"
        >
          Gasto energético
        </h3>
        <div className="grid gap-3 sm:grid-cols-3">
          <CardMetrica
            titulo="TMB"
            valor={resultado.tmb}
            unidade="kcal/dia"
            detalhe="Taxa Metabólica Basal — energia em repouso total."
            dica="Energia mínima para manter funções vitais, calculada pela fórmula selecionada."
          />
          <CardMetrica
            titulo="GET"
            valor={resultado.get}
            unidade="kcal/dia"
            detalhe={`Fator × ${resultado.fatorAtividade.toLocaleString("pt-BR")}`}
            dica="Gasto Energético Total. TMB multiplicado pelo fator de atividade."
          />
          <CardMetrica
            titulo="Meta calórica"
            valor={resultado.caloriasObjetivo}
            unidade="kcal/dia"
            detalhe={`Ajuste ${ajustePct} sobre o GET`}
            destaque
            dica="Calorias-alvo para o seu objetivo de composição corporal."
          />
        </div>
      </section>

      <Separator />

      {/* Macros */}
      <section aria-labelledby="secao-macros">
        <h3
          id="secao-macros"
          className="mb-1 text-sm font-bold uppercase tracking-wide text-primary"
        >
          Distribuição de macronutrientes
        </h3>
        <p className="mb-4 text-xs text-muted-foreground">
          Proteína em{" "}
          <strong>
            {resultado.macros.proteinaPorKg.toLocaleString("pt-BR")} g/kg
          </strong>{" "}
          de peso corporal. Valores indicativos — ajuste com nutricionista.
        </p>
        <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-5">
          <BarraMacro
            nome="Proteína"
            gramas={macros.proteina.gramas}
            kcal={macros.proteina.kcal}
            percentual={macros.proteina.percentual}
            cor="bg-primary"
          />
          <BarraMacro
            nome="Carboidrato"
            gramas={macros.carboidrato.gramas}
            kcal={macros.carboidrato.kcal}
            percentual={macros.carboidrato.percentual}
            cor="bg-primary/50"
          />
          <BarraMacro
            nome="Gordura"
            gramas={macros.gordura.gramas}
            kcal={macros.gordura.kcal}
            percentual={macros.gordura.percentual}
            cor="bg-primary/25"
          />
        </div>
      </section>

      {/* Justificativa da fórmula */}
      <section
        className="rounded-xl border border-border bg-muted/30 p-5"
        aria-labelledby="secao-justificativa"
      >
        <h3
          id="secao-justificativa"
          className="mb-2 text-sm font-semibold text-foreground"
        >
          Por que esta fórmula foi escolhida?
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {resultado.justificativa}
        </p>
      </section>

      {/* Aviso legal */}
      <p className="text-xs text-muted-foreground leading-relaxed border-t border-border pt-4">
        Estes resultados são estimativas baseadas em equações populacionais e{" "}
        <strong>não substituem avaliação nutricional individualizada</strong>. Consulte um
        nutricionista para um plano alimentar personalizado e seguro.
      </p>
    </div>
  )
}
