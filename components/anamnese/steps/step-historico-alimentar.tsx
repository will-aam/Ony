"use client"

import { Controller, useFormContext, useFieldArray } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Campo, GrupoCampos } from "../form-field"
import { CheckboxCards, RadioCards } from "../option-cards"
import { Plus, Trash2 } from "lucide-react"
import {
  AVERSOES_OPTIONS,
  PREFERENCIAS_OPTIONS,
  REFEICOES_DIA_OPTIONS,
  SUPLEMENTOS_OPTIONS,
} from "@/lib/nutrition/constants"
import type { AnamneseFormValues } from "@/lib/nutrition/schema"

const OPCOES_REFEICOES = REFEICOES_DIA_OPTIONS.map((o) => ({
  valor: o.value,
  label: o.label,
}))
const OPCOES_PREFERENCIAS = PREFERENCIAS_OPTIONS.map((o) => ({ valor: o.value, label: o.label }))
const OPCOES_AVERSOES = AVERSOES_OPTIONS.map((o) => ({ valor: o.value, label: o.label }))
const OPCOES_SUPLEMENTOS = SUPLEMENTOS_OPTIONS.map((o) => ({ valor: o.value, label: o.label }))

export function StepHistoricoAlimentar() {
  const { register, control, watch, setValue, formState } =
    useFormContext<AnamneseFormValues>()
  const { errors } = formState
  const e = errors.historicoAlimentar

  const { fields, append, remove } = useFieldArray({
    control,
    name: "historicoAlimentar.recordatorio24h",
  })

  return (
    <div className="flex flex-col gap-8">
      <GrupoCampos titulo="Rotina de refeições">
        <Campo label="Quantas refeições faz por dia?" erro={e?.refeicoesDia?.message}>
          {() => (
            <RadioCards
              opcoes={OPCOES_REFEICOES}
              valor={String(watch("historicoAlimentar.refeicoesDia") ?? "")}
              onChange={(v) => setValue("historicoAlimentar.refeicoesDia", v as never)}
              name="refeicoes-dia"
              ariaLabel="Refeições por dia"
              colunas={2}
            />
          )}
        </Campo>
      </GrupoCampos>

      <GrupoCampos titulo="Preferências e aversões">
        <Campo label="Preferências alimentares" erro={e?.preferencias?.message}>
          {() => (
            <Controller
              control={control}
              name="historicoAlimentar.preferencias"
              render={({ field }) => (
                <CheckboxCards
                  opcoes={OPCOES_PREFERENCIAS}
                  valores={field.value ?? []}
                  onChange={field.onChange}
                  name="preferencias"
                />
              )}
            />
          )}
        </Campo>

        <Campo label="Aversões e intolerâncias" erro={e?.aversoes?.message}>
          {() => (
            <Controller
              control={control}
              name="historicoAlimentar.aversoes"
              render={({ field }) => (
                <CheckboxCards
                  opcoes={OPCOES_AVERSOES}
                  valores={field.value ?? []}
                  onChange={field.onChange}
                  name="aversoes"
                />
              )}
            />
          )}
        </Campo>

        <Campo
          label="Alergias alimentares (texto livre)"
          erro={e?.alergias?.message}
          dica="Liste alimentos que causam reação alérgica."
        >
          {(props) => (
            <Input
              {...props}
              {...register("historicoAlimentar.alergias")}
              placeholder="Ex.: amendoim, frutos do mar, glúten..."
            />
          )}
        </Campo>
      </GrupoCampos>

      <GrupoCampos titulo="Quais suplementos você usa atualmente?">
        <Controller
          control={control}
          name="historicoAlimentar.suplementos"
          render={({ field }) => (
            <CheckboxCards
              opcoes={OPCOES_SUPLEMENTOS}
              valores={field.value ?? []}
              onChange={field.onChange}
              name="suplementos"
            />
          )}
        />

        <Campo
          label="Detalhes dos suplementos (marca, dose, horário)"
          erro={e?.suplementosDetalhes?.message}
        >
          {(props) => (
            <Input
              {...props}
              {...register("historicoAlimentar.suplementosDetalhes")}
              placeholder="Ex.: Whey isolado 30g pós-treino, Ômega 3 2g à noite..."
            />
          )}
        </Campo>
      </GrupoCampos>

      <GrupoCampos
        titulo="Recordatório 24 horas"
        descricao="Descreva tudo que consumiu no dia de ontem, refeição por refeição."
      >
        <div className="flex flex-col gap-3">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="grid gap-3 rounded-lg border border-border bg-card p-4 sm:grid-cols-[1fr_auto_2fr_auto]"
            >
              <Input
                {...register(`historicoAlimentar.recordatorio24h.${index}.refeicao`)}
                placeholder="Refeição (café, almoço…)"
              />
              <Input
                type="time"
                {...register(`historicoAlimentar.recordatorio24h.${index}.horario`)}
                className="w-full sm:w-28"
              />
              <Input
                {...register(`historicoAlimentar.recordatorio24h.${index}.alimentos`)}
                placeholder="Alimentos e quantidades"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => remove(index)}
                className="text-muted-foreground hover:text-destructive shrink-0"
                aria-label="Remover refeição"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}

          {fields.length === 0 && (
            <p className="py-4 text-center text-sm text-muted-foreground italic">
              Nenhuma refeição adicionada ainda.
            </p>
          )}

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => append({ refeicao: "", horario: "", alimentos: "" })}
            className="self-start gap-1.5"
          >
            <Plus className="h-3.5 w-3.5" />
            Adicionar refeição
          </Button>
        </div>
      </GrupoCampos>

      <GrupoCampos titulo="Observações alimentares">
        <Campo label="Anotações adicionais" erro={e?.observacoes?.message}>
          {(props) => (
            <Textarea
              {...props}
              {...register("historicoAlimentar.observacoes")}
              rows={3}
              placeholder="Restrições culturais ou religiosas, contexto adicional..."
              className="resize-none"
            />
          )}
        </Campo>
      </GrupoCampos>
    </div>
  )
}
