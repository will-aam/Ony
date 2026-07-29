"use client"

import { Controller, useFormContext, useWatch } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Campo, GrupoCampos } from "../form-field"
import { CheckboxCards, RadioCards } from "../option-cards"
import {
  OBJETIVOS_COMPOSICAO,
  OBJETIVOS_CONSULTA,
  OBJETIVOS_PERFORMANCE,
} from "@/lib/nutrition/constants"
import {
  LABEL_OBJETIVO_COMPOSICAO,
  LABEL_OBJETIVO_CONSULTA,
  LABEL_OBJETIVO_PERFORMANCE,
} from "@/lib/nutrition/labels"
import type { AnamneseFormValues } from "@/lib/nutrition/schema"

const OPCOES_CONSULTA = OBJETIVOS_CONSULTA.map((valor) => ({
  valor,
  label: LABEL_OBJETIVO_CONSULTA[valor],
}))

const OPCOES_COMPOSICAO = OBJETIVOS_COMPOSICAO.map((valor) => ({
  valor,
  label: LABEL_OBJETIVO_COMPOSICAO[valor],
}))

const OPCOES_PERFORMANCE = OBJETIVOS_PERFORMANCE.map((valor) => ({
  valor,
  label: LABEL_OBJETIVO_PERFORMANCE[valor],
}))

export function StepQueixa() {
  const { register, control, formState } = useFormContext<AnamneseFormValues>()
  const { errors } = formState

  const objetivoConsulta = useWatch({ control, name: "objetivoConsulta" })
  const precisaDetalhe =
    objetivoConsulta === "controle-doenca" || objetivoConsulta === "outro"

  return (
    <div className="flex flex-col gap-8">
      <GrupoCampos titulo="Motivo da consulta">
        <Campo
          label="O que te trouxe até aqui?"
          erro={errors.motivoConsulta?.message}
        >
          {(props) => (
            <Textarea
              {...props}
              {...register("motivoConsulta")}
              rows={3}
              placeholder="Descreva com suas palavras o que você espera resolver."
            />
          )}
        </Campo>

        <Campo
          label="Objetivo principal do atendimento"
          obrigatorio
          erro={errors.objetivoConsulta?.message}
        >
          {() => (
            <Controller
              control={control}
              name="objetivoConsulta"
              render={({ field }) => (
                <RadioCards
                  opcoes={OPCOES_CONSULTA}
                  valor={field.value}
                  onChange={field.onChange}
                  name="objetivo-consulta"
                  ariaLabel="Objetivo principal do atendimento"
                  colunas={2}
                />
              )}
            />
          )}
        </Campo>

        {precisaDetalhe ? (
          <Campo
            label={
              objetivoConsulta === "controle-doenca"
                ? "Qual doença?"
                : "Descreva o objetivo"
            }
            erro={errors.objetivoConsultaDetalhe?.message}
          >
            {(props) => (
              <Input
                {...props}
                {...register("objetivoConsultaDetalhe")}
                placeholder={
                  objetivoConsulta === "controle-doenca"
                    ? "Ex.: diabetes tipo 2"
                    : "Descreva brevemente"
                }
              />
            )}
          </Campo>
        ) : null}
      </GrupoCampos>

      <GrupoCampos
        titulo="Composição corporal"
        descricao="Define o ajuste calórico aplicado ao seu gasto energético total."
      >
        <Campo
          label="Objetivo de composição corporal"
          obrigatorio
          erro={errors.objetivoComposicao?.message}
        >
          {() => (
            <Controller
              control={control}
              name="objetivoComposicao"
              render={({ field }) => (
                <RadioCards
                  opcoes={OPCOES_COMPOSICAO}
                  valor={field.value}
                  onChange={field.onChange}
                  name="objetivo-composicao"
                  ariaLabel="Objetivo de composição corporal"
                  colunas={2}
                />
              )}
            />
          )}
        </Campo>
      </GrupoCampos>

      <GrupoCampos
        titulo="Performance"
        descricao="Opcional. Influencia a quantidade de proteína recomendada."
      >
        <Controller
          control={control}
          name="objetivosPerformance"
          render={({ field }) => (
            <CheckboxCards
              opcoes={OPCOES_PERFORMANCE}
              valores={field.value ?? []}
              onChange={field.onChange}
              name="objetivo-performance"
            />
          )}
        />
      </GrupoCampos>

      <GrupoCampos titulo="Expectativa de prazo">
        <Campo label="Meta de prazo desejada" erro={errors.metaPrazo?.message}>
          {(props) => (
            <Input
              {...props}
              {...register("metaPrazo")}
              placeholder="Ex.: 6 meses"
            />
          )}
        </Campo>
      </GrupoCampos>
    </div>
  )
}
