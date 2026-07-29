"use client"

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ChevronLeft, ChevronRight, CheckCircle2, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

import { anamneseSchema, STEP_SCHEMAS, type AnamneseFormValues } from "@/lib/nutrition/schema"
import { VALORES_INICIAIS } from "@/lib/nutrition/defaults"
import { STEPS, TOTAL_STEPS, type StepId } from "@/lib/nutrition/steps"
import { paraSearchParams } from "@/lib/nutrition/serialization"
import type { Sexo, NivelAtividade, Biotipo, ObjetivoComposicao, ObjetivoPerformance, FormulaSelecionavel } from "@/lib/nutrition/constants"

import { StepDadosPessoais } from "./steps/step-dados-pessoais"
import { StepQueixa } from "./steps/step-queixa"
import { StepHistoricoClinico } from "./steps/step-historico-clinico"
import { StepAntropometria } from "./steps/step-antropometria"
import { StepAtividadeFisica } from "./steps/step-atividade-fisica"
import { StepEstiloDeVida } from "./steps/step-estilo-de-vida"
import { StepHistoricoAlimentar } from "./steps/step-historico-alimentar"
import { StepFrequenciaAlimentar } from "./steps/step-frequencia-alimentar"
import { StepObjetivos } from "./steps/step-objetivos"

const STEP_COMPONENTS: Record<StepId, React.ComponentType> = {
  "dados-pessoais": StepDadosPessoais,
  "queixa": StepQueixa,
  "historico-clinico": StepHistoricoClinico,
  "antropometria": StepAntropometria,
  "atividade-fisica": StepAtividadeFisica,
  "estilo-vida": StepEstiloDeVida,
  "historico-alimentar": StepHistoricoAlimentar,
  "frequencia-alimentar": StepFrequenciaAlimentar,
  "objetivos": StepObjetivos,
}

export function AnamneseWizard() {
  const router = useRouter()
  const [stepIndex, setStepIndex] = useState(0)
  const [enviando, setEnviando] = useState(false)

  const stepAtual = STEPS[stepIndex]

  const methods = useForm<AnamneseFormValues>({
    resolver: zodResolver(anamneseSchema),
    defaultValues: VALORES_INICIAIS,
    mode: "onTouched",
  })

  const { trigger, getValues, formState: { errors } } = methods

  const ehUltimaEtapa = stepIndex === TOTAL_STEPS - 1

  const avancar = useCallback(async () => {
    // Valida apenas os campos da etapa atual quando há schema definido
    const stepId = stepAtual.id as keyof typeof STEP_SCHEMAS
    const camposParaValidar = stepId in STEP_SCHEMAS
      ? (Object.keys(STEP_SCHEMAS[stepId].shape) as Array<keyof AnamneseFormValues>)
      : []

    const valido = camposParaValidar.length > 0
      ? await trigger(camposParaValidar)
      : true

    if (!valido) return

    if (ehUltimaEtapa) {
      setEnviando(true)
      try {
        const dados = getValues()
        const an = dados.antropometria
        const ob = dados.objetivos
        const at = dados.atividadeFisica
        const dp = dados.dadosPessoais

        const params = paraSearchParams({
          sexo: dp.sexo as Sexo,
          idade: Number(dp.idade),
          peso: Number(an.peso),
          altura: Number(an.altura),
          nivelAtividade: at.nivelAtividade as NivelAtividade,
          biotipo: ob.biotipo as Biotipo,
          objetivoComposicao: ob.objetivoComposicao as ObjetivoComposicao,
          objetivosPerformance: (ob.objetivosPerformance ?? []) as ObjetivoPerformance[],
          formula: (ob.formula ?? "recomendada") as FormulaSelecionavel,
          gordura: an.gordura ? Number(an.gordura) : undefined,
          massaMagra: an.massaMagra ? Number(an.massaMagra) : undefined,
          circunferenciaCintura: an.circunferenciaCintura ? Number(an.circunferenciaCintura) : undefined,
          circunferenciaQuadril: an.circunferenciaQuadril ? Number(an.circunferenciaQuadril) : undefined,
          nome: dp.nome,
        })
        router.push(`/resultado?${params}`)
      } catch {
        setEnviando(false)
      }
      return
    }

    setStepIndex((i) => Math.min(i + 1, TOTAL_STEPS - 1))
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [stepAtual.id, ehUltimaEtapa, trigger, getValues, router])

  const voltar = useCallback(() => {
    setStepIndex((i) => Math.max(i - 1, 0))
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  const irParaEtapa = useCallback((index: number) => {
    if (index < stepIndex) {
      setStepIndex(index)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }, [stepIndex])

  const StepComponent = STEP_COMPONENTS[stepAtual.id]
  const progresso = ((stepIndex + 1) / TOTAL_STEPS) * 100

  return (
    <FormProvider {...methods}>
      <div className="mx-auto max-w-2xl px-4 py-8 sm:py-12">
        {/* Cabeçalho do wizard */}
        <div className="mb-8 flex flex-col gap-4">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span className="font-medium">
              Etapa {stepIndex + 1} de {TOTAL_STEPS}
            </span>
            <span>{Math.round(progresso)}% concluído</span>
          </div>

          <Progress value={progresso} className="h-2" />

          {/* Indicadores de etapas (desktop) */}
          <nav
            aria-label="Progresso do formulário"
            className="hidden sm:flex items-center gap-1"
          >
            {STEPS.map((step, index) => {
              const concluido = index < stepIndex
              const atual = index === stepIndex
              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => irParaEtapa(index)}
                  disabled={index > stepIndex}
                  aria-current={atual ? "step" : undefined}
                  title={step.titulo}
                  className={cn(
                    "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-all",
                    concluido
                      ? "cursor-pointer bg-primary text-primary-foreground hover:opacity-80"
                      : atual
                      ? "bg-primary text-primary-foreground ring-2 ring-primary ring-offset-2 ring-offset-background"
                      : "cursor-not-allowed bg-muted text-muted-foreground",
                  )}
                >
                  {concluido ? (
                    <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    step.numero
                  )}
                </button>
              )
            })}
            <div className="flex-1 h-0.5 bg-border mx-1" />
          </nav>
        </div>

        {/* Título e descrição da etapa */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground text-balance">
            {stepAtual.titulo}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
            {stepAtual.descricao}
          </p>
        </div>

        {/* Conteúdo da etapa */}
        <form
          onSubmit={(e) => {
            e.preventDefault()
            avancar()
          }}
          noValidate
        >
          <div className="min-h-[320px]">
            <StepComponent />
          </div>

          {/* Erro global de validação */}
          {Object.keys(errors).length > 0 && (
            <p role="alert" className="mt-4 text-sm text-destructive">
              Por favor, corrija os campos destacados antes de continuar.
            </p>
          )}

          {/* Navegação */}
          <div className="mt-8 flex items-center justify-between gap-4 border-t border-border pt-6">
            <Button
              type="button"
              variant="ghost"
              onClick={voltar}
              disabled={stepIndex === 0}
              className="gap-1.5"
            >
              <ChevronLeft className="h-4 w-4" />
              Voltar
            </Button>

            <Button
              type="submit"
              disabled={enviando}
              className="min-w-[140px] gap-1.5"
            >
              {enviando ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Calculando...
                </>
              ) : ehUltimaEtapa ? (
                <>
                  <CheckCircle2 className="h-4 w-4" />
                  Ver resultado
                </>
              ) : (
                <>
                  Próximo
                  <ChevronRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </FormProvider>
  )
}
