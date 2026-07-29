"use client"

import { useFormContext } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Campo, GrupoCampos } from "../form-field"
import { RadioCards } from "../option-cards"
import { OBJETIVO_CONSULTA_OPTIONS } from "@/lib/nutrition/constants"
import type { AnamneseFormValues } from "@/lib/nutrition/schema"

const OPCOES_OBJETIVO = OBJETIVO_CONSULTA_OPTIONS.map((o) => ({
  valor: o.value,
  label: o.label,
}))

export function StepQueixa() {
  const { register, watch, setValue, formState } =
    useFormContext<AnamneseFormValues>()
  const { errors } = formState
  const e = errors.queixa

  return (
    <div className="flex flex-col gap-8">
      <GrupoCampos titulo="Motivo da consulta">
        <Campo
          label="Descreva brevemente o que te trouxe aqui"
          erro={e?.motivoConsulta?.message}
          dica="Pode ser uma queixa física, um diagnóstico recente, um objetivo ou qualquer coisa relevante."
        >
          {(props) => (
            <Textarea
              {...props}
              {...register("queixa.motivoConsulta")}
              rows={3}
              placeholder="Ex.: quero perder peso, médico indicou dieta para glicemia..."
              className="resize-none"
            />
          )}
        </Campo>
      </GrupoCampos>

      <GrupoCampos titulo="Objetivo principal">
        <Campo
          label="O que você espera alcançar com o acompanhamento nutricional?"
          erro={e?.objetivoConsulta?.message}
        >
          {() => (
            <RadioCards
              opcoes={OPCOES_OBJETIVO}
              valor={watch("queixa.objetivoConsulta") ?? ""}
              onChange={(v) => setValue("queixa.objetivoConsulta", v)}
              name="objetivo-consulta"
              ariaLabel="Objetivo principal da consulta"
              colunas={2}
            />
          )}
        </Campo>

        <Campo label="Prazo ou meta específica" erro={e?.metaPrazo?.message}>
          {(props) => (
            <Input
              {...props}
              {...register("queixa.metaPrazo")}
              placeholder="Ex.: perder 10 kg em 6 meses, melhorar resistência em 3 meses..."
            />
          )}
        </Campo>
      </GrupoCampos>
    </div>
  )
}
