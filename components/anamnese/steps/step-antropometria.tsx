"use client"

import { Controller, useFormContext, useWatch } from "react-hook-form"
import { Input } from "@/components/ui/input"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Campo, GrupoCampos } from "../form-field"
import { BiotipoCards } from "../option-cards"
import { TesteDoPulso } from "../teste-do-pulso"
import { PesoIdealInfo } from "../peso-ideal-info"
import { BIOTIPOS } from "@/lib/nutrition/constants"
import { DESCRICAO_BIOTIPO, LABEL_BIOTIPO } from "@/lib/nutrition/labels"
import { calcularImc, classificarImc } from "@/lib/nutrition/calculations"
import type { AnamneseFormValues } from "@/lib/nutrition/schema"

const OPCOES_BIOTIPO = BIOTIPOS.map((valor) => ({
  valor,
  label: LABEL_BIOTIPO[valor],
  descricao: DESCRICAO_BIOTIPO[valor],
  imagem: `/images/${valor}.png`,
}))

export function StepAntropometria() {
  const { register, control, formState } = useFormContext<AnamneseFormValues>()
  const { errors } = formState
  const e = errors.antropometria

  const peso = useWatch({ control, name: "antropometria.peso" })
  const altura = useWatch({ control, name: "antropometria.altura" })

  const pesoN = Number(peso)
  const alturaN = Number(altura)
  const imcValido =
    Number.isFinite(pesoN) && Number.isFinite(alturaN) && pesoN > 0 && alturaN > 0

  const imc = imcValido ? calcularImc(pesoN, alturaN) : null

  return (
    <div className="flex flex-col gap-8">
      <GrupoCampos titulo="Medidas principais">
        <div className="grid gap-4 sm:grid-cols-2">
          <Campo label="Peso atual (kg)" obrigatorio erro={e?.peso?.message}>
            {(props) => (
              <Input
                {...props}
                {...register("antropometria.peso")}
                type="number"
                step="0.1"
                inputMode="decimal"
                placeholder="Ex.: 72.5"
              />
            )}
          </Campo>

          <Campo
            label="Altura (cm)"
            obrigatorio
            erro={e?.altura?.message}
            dica="Em centímetros: use 170, não 1,70."
          >
            {(props) => (
              <Input
                {...props}
                {...register("antropometria.altura")}
                type="number"
                step="1"
                inputMode="numeric"
                placeholder="Ex.: 170"
              />
            )}
          </Campo>

          <Campo
            label="Peso habitual (kg)"
            erro={e?.pesoHabitual?.message}
            dica="O peso em que você costuma se manter."
          >
            {(props) => (
              <Input
                {...props}
                {...register("antropometria.pesoHabitual")}
                type="number"
                step="0.1"
                inputMode="decimal"
                placeholder="Ex.: 70"
              />
            )}
          </Campo>

          <Campo label="Peso desejado (kg)" erro={e?.pesoMeta?.message}>
            {(props) => (
              <Input
                {...props}
                {...register("antropometria.pesoMeta")}
                type="number"
                step="0.1"
                inputMode="decimal"
                placeholder="Ex.: 68"
              />
            )}
          </Campo>
        </div>

        {imc !== null ? (
          <p
            role="status"
            aria-live="polite"
            className="flex flex-wrap items-baseline gap-x-2 gap-y-1 rounded-lg border border-primary/25 bg-primary/5 px-4 py-3 text-sm"
          >
            <span className="font-semibold text-foreground">
              IMC calculado: {imc.toFixed(1)}
            </span>
            <span className="text-muted-foreground">{classificarImc(imc)}</span>
          </p>
        ) : null}

        <PesoIdealInfo />
      </GrupoCampos>

      <GrupoCampos
        titulo="Composição corporal"
        descricao="Se você tem bioimpedância ou dobras cutâneas, estes campos habilitam a fórmula Katch-McArdle, mais precisa."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Campo
            label="Percentual de gordura (%)"
            erro={e?.gordura?.message}
            dica="Informe apenas o número, sem o símbolo %."
          >
            {(props) => (
              <Input
                {...props}
                {...register("antropometria.gordura")}
                type="number"
                step="0.1"
                inputMode="decimal"
                placeholder="Ex.: 18"
              />
            )}
          </Campo>

          <Campo
            label="Massa magra (kg)"
            erro={e?.massaMagra?.message}
            dica="Se informada, tem prioridade sobre o percentual de gordura."
          >
            {(props) => (
              <Input
                {...props}
                {...register("antropometria.massaMagra")}
                type="number"
                step="0.1"
                inputMode="decimal"
                placeholder="Ex.: 58"
              />
            )}
          </Campo>
        </div>
      </GrupoCampos>

      <GrupoCampos
        titulo="Circunferências"
        descricao="Opcionais. Cintura e quadril permitem calcular a relação cintura-quadril, indicador de risco cardiometabólico."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Campo label="Cintura (cm)" erro={e?.circunferenciaCintura?.message}>
            {(props) => (
              <Input
                {...props}
                {...register("antropometria.circunferenciaCintura")}
                type="number"
                step="0.5"
                inputMode="decimal"
                placeholder="Ex.: 84"
              />
            )}
          </Campo>

          <Campo label="Quadril (cm)" erro={e?.circunferenciaQuadril?.message}>
            {(props) => (
              <Input
                {...props}
                {...register("antropometria.circunferenciaQuadril")}
                type="number"
                step="0.5"
                inputMode="decimal"
                placeholder="Ex.: 98"
              />
            )}
          </Campo>

          <Campo label="Braço (cm)" erro={e?.circunferenciaBraco?.message}>
            {(props) => (
              <Input
                {...props}
                {...register("antropometria.circunferenciaBraco")}
                type="number"
                step="0.5"
                inputMode="decimal"
                placeholder="Ex.: 32"
              />
            )}
          </Campo>

          <Campo label="Panturrilha (cm)" erro={e?.circunferenciaPanturrilha?.message}>
            {(props) => (
              <Input
                {...props}
                {...register("antropometria.circunferenciaPanturrilha")}
                type="number"
                step="0.5"
                inputMode="decimal"
                placeholder="Ex.: 36"
              />
            )}
          </Campo>
        </div>
      </GrupoCampos>

      <GrupoCampos titulo="Biotipo corporal">
        <Accordion type="single" collapsible className="rounded-lg border">
          <AccordionItem value="sobre" className="border-b-0">
            <AccordionTrigger className="px-4 text-sm">
              Saiba mais sobre biotipo corporal
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-3 px-4 text-sm leading-relaxed text-muted-foreground">
              <p>
                O biotipo influencia características físicas e o metabolismo, mas{" "}
                <strong>não define sozinho</strong> sua capacidade de emagrecer ou
                ganhar massa. A genética contribui com 30–40% em condições como
                obesidade, mas alimentação, atividade física e acompanhamento
                profissional têm papel ainda mais decisivo.
              </p>
              <p>
                Aqui, o biotipo é usado para escolher a fórmula mais adequada de
                estimativa calórica — não como limite para seus resultados.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <TesteDoPulso />

        <Campo
          label="Selecione o biotipo que mais se aproxima do seu"
          obrigatorio
          erro={e?.gordura?.message}
        >
          {() => (
            <Controller
              control={control}
              name="antropometria.gordura"
              render={() => (
                <Controller
                  control={control}
                  name="objetivos.biotipo"
                  render={({ field }) => (
                    <BiotipoCards
                      opcoes={OPCOES_BIOTIPO}
                      valor={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
              )}
            />
          )}
        </Campo>
      </GrupoCampos>
    </div>
  )
}
