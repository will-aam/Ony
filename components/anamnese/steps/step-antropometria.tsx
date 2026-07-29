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

  const peso = useWatch({ control, name: "peso" })
  const altura = useWatch({ control, name: "altura" })

  const pesoNumero = Number(peso)
  const alturaNumero = Number(altura)
  const imcValido =
    Number.isFinite(pesoNumero) &&
    Number.isFinite(alturaNumero) &&
    pesoNumero > 0 &&
    alturaNumero > 0

  const imc = imcValido ? calcularImc(pesoNumero, alturaNumero) : null

  return (
    <div className="flex flex-col gap-8">
      <GrupoCampos titulo="Medidas principais">
        <div className="grid gap-4 sm:grid-cols-2">
          <Campo label="Peso atual (kg)" obrigatorio erro={errors.peso?.message}>
            {(props) => (
              <Input
                {...props}
                {...register("peso")}
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
            erro={errors.altura?.message}
            dica="Em centímetros: use 170, não 1,70."
          >
            {(props) => (
              <Input
                {...props}
                {...register("altura")}
                type="number"
                step="1"
                inputMode="numeric"
                placeholder="Ex.: 170"
              />
            )}
          </Campo>

          <Campo
            label="Peso habitual (kg)"
            erro={errors.pesoHabitual?.message}
            dica="O peso em que você costuma se manter."
          >
            {(props) => (
              <Input
                {...props}
                {...register("pesoHabitual")}
                type="number"
                step="0.1"
                inputMode="decimal"
                placeholder="Ex.: 70"
              />
            )}
          </Campo>

          <Campo label="Peso desejado (kg)" erro={errors.pesoMeta?.message}>
            {(props) => (
              <Input
                {...props}
                {...register("pesoMeta")}
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
            <span className="text-muted-foreground">
              {classificarImc(imc)}
            </span>
          </p>
        ) : null}
      </GrupoCampos>

      <GrupoCampos
        titulo="Composição corporal"
        descricao="Se você tem bioimpedância ou dobras cutâneas, estes campos habilitam a fórmula Katch-McArdle, mais precisa."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Campo
            label="Percentual de gordura (%)"
            erro={errors.gordura?.message}
            dica="Informe apenas o número, sem o símbolo de porcentagem."
          >
            {(props) => (
              <Input
                {...props}
                {...register("gordura")}
                type="number"
                step="0.1"
                inputMode="decimal"
                placeholder="Ex.: 18"
              />
            )}
          </Campo>

          <Campo
            label="Massa magra (kg)"
            erro={errors.massaMagra?.message}
            dica="Se informada, tem prioridade sobre o percentual de gordura."
          >
            {(props) => (
              <Input
                {...props}
                {...register("massaMagra")}
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
        descricao="Opcionais. Cintura e quadril permitem calcular a relação cintura-quadril, um indicador de risco cardiometabólico."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Campo
            label="Cintura (cm)"
            erro={errors.circunferenciaCintura?.message}
          >
            {(props) => (
              <Input
                {...props}
                {...register("circunferenciaCintura")}
                type="number"
                step="0.5"
                inputMode="decimal"
                placeholder="Ex.: 84"
              />
            )}
          </Campo>

          <Campo
            label="Quadril (cm)"
            erro={errors.circunferenciaQuadril?.message}
          >
            {(props) => (
              <Input
                {...props}
                {...register("circunferenciaQuadril")}
                type="number"
                step="0.5"
                inputMode="decimal"
                placeholder="Ex.: 98"
              />
            )}
          </Campo>

          <Campo label="Braço (cm)" erro={errors.circunferenciaBraco?.message}>
            {(props) => (
              <Input
                {...props}
                {...register("circunferenciaBraco")}
                type="number"
                step="0.5"
                inputMode="decimal"
                placeholder="Ex.: 32"
              />
            )}
          </Campo>

          <Campo
            label="Panturrilha (cm)"
            erro={errors.circunferenciaPanturrilha?.message}
          >
            {(props) => (
              <Input
                {...props}
                {...register("circunferenciaPanturrilha")}
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
                Embora o biotipo influencie características físicas e o
                metabolismo, ele <strong>não define sozinho</strong> sua
                capacidade de emagrecer ou ganhar massa muscular. A genética
                pode contribuir com 30% a 40% em condições como obesidade ou
                diabetes, mas alimentação adequada, atividade física e
                acompanhamento profissional têm papel ainda mais decisivo.
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
          erro={errors.biotipo?.message}
        >
          {() => (
            <Controller
              control={control}
              name="biotipo"
              render={({ field }) => (
                <BiotipoCards
                  opcoes={OPCOES_BIOTIPO}
                  valor={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          )}
        </Campo>
      </GrupoCampos>
    </div>
  )
}
