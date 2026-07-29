"use client"

import { Controller, useFormContext } from "react-hook-form"
import { Textarea } from "@/components/ui/textarea"
import { Campo, GrupoCampos } from "../form-field"
import { BiotipoCards, CheckboxCards, RadioCards } from "../option-cards"
import {
  BIOTIPOS,
  BIOTIPO_OPTIONS,
  FORMULA_OPTIONS,
  OBJETIVO_COMPOSICAO_OPTIONS,
  OBJETIVO_PERFORMANCE_OPTIONS,
} from "@/lib/nutrition/constants"
import { DESCRICAO_BIOTIPO, LABEL_BIOTIPO } from "@/lib/nutrition/labels"
import type { AnamneseFormValues } from "@/lib/nutrition/schema"

const OPCOES_BIOTIPO = BIOTIPOS.map((valor) => ({
  valor,
  label: LABEL_BIOTIPO[valor],
  descricao: DESCRICAO_BIOTIPO[valor],
  imagem: `/images/${valor}.png`,
}))

const OPCOES_COMPOSICAO = OBJETIVO_COMPOSICAO_OPTIONS.map((o) => ({
  valor: o.value,
  label: o.label,
  descricao: o.descricao,
}))

const OPCOES_PERFORMANCE = OBJETIVO_PERFORMANCE_OPTIONS.map((o) => ({
  valor: o.value,
  label: o.label,
}))

const OPCOES_FORMULA = FORMULA_OPTIONS.map((o) => ({
  valor: o.value,
  label: o.label,
  descricao: o.descricao,
}))

export function StepObjetivos() {
  const { register, control, formState } = useFormContext<AnamneseFormValues>()
  const { errors } = formState
  const e = errors.objetivos

  return (
    <div className="flex flex-col gap-8">
      <GrupoCampos titulo="Biotipo corporal">
        <Campo
          label="Selecione o biotipo que mais se aproxima do seu"
          obrigatorio
          erro={e?.biotipo?.message}
        >
          {() => (
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
        </Campo>
      </GrupoCampos>

      <GrupoCampos
        titulo="Composição corporal"
        descricao="Define o ajuste calórico aplicado ao seu gasto energético total."
      >
        <Campo
          label="Objetivo de composição corporal"
          obrigatorio
          erro={e?.objetivoComposicao?.message}
        >
          {() => (
            <Controller
              control={control}
              name="objetivos.objetivoComposicao"
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
        descricao="Opcional — influencia a quantidade de proteína recomendada."
      >
        <Controller
          control={control}
          name="objetivos.objetivosPerformance"
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

      <GrupoCampos
        titulo="Fórmula de cálculo"
        descricao="Escolha como estimar sua taxa metabólica basal. A opção Recomendada seleciona automaticamente a mais adequada ao seu perfil."
      >
        <Campo
          label="Fórmula para cálculo da TMB"
          obrigatorio
          erro={e?.formula?.message}
        >
          {() => (
            <Controller
              control={control}
              name="objetivos.formula"
              render={({ field }) => (
                <RadioCards
                  opcoes={OPCOES_FORMULA}
                  valor={field.value}
                  onChange={field.onChange}
                  name="formula"
                  ariaLabel="Fórmula para cálculo da TMB"
                />
              )}
            />
          )}
        </Campo>
      </GrupoCampos>

      <GrupoCampos titulo="Observações finais">
        <Campo
          label="Informações adicionais para o nutricionista"
          erro={e?.observacoes?.message}
          dica="Expectativas, restrições de tempo, preferências culinárias, metas específicas..."
        >
          {(props) => (
            <Textarea
              {...props}
              {...register("objetivos.observacoes")}
              rows={4}
              placeholder="Escreva aqui qualquer informação relevante que não foi abordada nas etapas anteriores..."
              className="resize-none"
            />
          )}
        </Campo>
      </GrupoCampos>
    </div>
  )
}
