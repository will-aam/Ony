"use client"

import { Controller, useFormContext, useWatch } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Campo, GrupoCampos } from "../form-field"
import { CampoSimNao } from "../yes-no-field"
import { CheckboxCards } from "../option-cards"
import {
  HABITOS_INTESTINAIS_OPTIONS,
  QUALIDADE_SONO_OPTIONS,
} from "@/lib/nutrition/constants"
import type { AnamneseFormValues } from "@/lib/nutrition/schema"

const OPCOES_HABITOS = HABITOS_INTESTINAIS_OPTIONS.map((o) => ({
  valor: o.value,
  label: o.label,
}))

const OPCOES_SONO = QUALIDADE_SONO_OPTIONS.map((o) => ({
  valor: o.value,
  label: o.label,
}))

export function StepEstiloDeVida() {
  const { register, control, formState } = useFormContext<AnamneseFormValues>()
  const { errors } = formState
  const e = errors.estilo

  const consumeAlcool = useWatch({ control, name: "estilo.consumeAlcool" })
  const fumante = useWatch({ control, name: "estilo.fumante" })
  const nivelEstresse = useWatch({ control, name: "estilo.nivelEstresse" })

  return (
    <div className="flex flex-col gap-8">
      <GrupoCampos titulo="Sono e descanso">
        <div className="grid gap-4 sm:grid-cols-2">
          <Campo
            label="Horas de sono por noite"
            erro={e?.horasSono?.message}
            dica="Média dos dias da semana."
          >
            {(props) => (
              <Input
                {...props}
                {...register("estilo.horasSono")}
                type="number"
                min={0}
                max={24}
                step={0.5}
                inputMode="decimal"
                placeholder="Ex.: 7.5"
              />
            )}
          </Campo>

          <Campo label="Qualidade do sono" erro={e?.qualidadeSono?.message}>
            {() => (
              <Controller
                control={control}
                name="estilo.qualidadeSono"
                render={({ field }) => (
                  <div className="flex gap-3">
                    {OPCOES_SONO.map((o) => {
                      const sel = field.value === o.valor
                      return (
                        <button
                          key={o.valor}
                          type="button"
                          onClick={() => field.onChange(o.valor)}
                          aria-pressed={sel}
                          className={`flex-1 rounded-lg border-2 py-2 text-sm font-medium transition-colors ${
                            sel
                              ? "border-primary bg-primary/10 text-primary"
                              : "border-border bg-card text-muted-foreground hover:border-primary/40"
                          }`}
                        >
                          {o.label}
                        </button>
                      )
                    })}
                  </div>
                )}
              />
            )}
          </Campo>
        </div>
      </GrupoCampos>

      <GrupoCampos titulo="Hidratação e estresse">
        <Campo
          label="Consumo de água por dia (litros)"
          erro={e?.consumoAgua?.message}
          dica="Inclua todos os líquidos: água, chás, sucos naturais."
        >
          {(props) => (
            <Input
              {...props}
              {...register("estilo.consumoAgua")}
              type="number"
              min={0}
              max={10}
              step={0.5}
              inputMode="decimal"
              placeholder="Ex.: 2.0"
            />
          )}
        </Campo>

        <Campo
          label={`Nível de estresse percebido: ${nivelEstresse ?? 5}/10`}
          erro={e?.nivelEstresse?.message}
          dica="1 = muito baixo, 10 = extremamente alto."
        >
          {(props) => (
            <input
              {...props}
              type="range"
              min={1}
              max={10}
              step={1}
              {...register("estilo.nivelEstresse")}
              className="w-full cursor-pointer accent-primary"
            />
          )}
        </Campo>
      </GrupoCampos>

      <GrupoCampos titulo="Álcool e tabagismo">
        <Controller
          control={control}
          name="estilo.consumeAlcool"
          render={({ field }) => (
            <CampoSimNao
              label="Consome bebidas alcoólicas?"
              valor={field.value}
              onChange={field.onChange}
              name="consumo-alcool"
            />
          )}
        />

        {consumeAlcool === true && (
          <Campo label="Frequência do consumo de álcool" erro={e?.frequenciaAlcool?.message}>
            {(props) => (
              <Input
                {...props}
                {...register("estilo.frequenciaAlcool")}
                placeholder="Ex.: 1–2 vezes por semana, finais de semana..."
              />
            )}
          </Campo>
        )}

        <Controller
          control={control}
          name="estilo.fumante"
          render={({ field }) => (
            <CampoSimNao
              label="Fumante?"
              valor={field.value}
              onChange={field.onChange}
              name="fumante"
            />
          )}
        />

        {fumante === true && (
          <Campo
            label="Há quanto tempo fuma? Quantos cigarros por dia?"
            erro={e?.detalheTabagismo?.message}
          >
            {(props) => (
              <Input
                {...props}
                {...register("estilo.detalheTabagismo")}
                placeholder="Ex.: 5 anos, 10 cigarros/dia"
              />
            )}
          </Campo>
        )}
      </GrupoCampos>

      <GrupoCampos titulo="Hábito intestinal">
        <Controller
          control={control}
          name="estilo.habitosIntestinais"
          render={({ field }) => (
            <CheckboxCards
              opcoes={OPCOES_HABITOS}
              valores={field.value ?? []}
              onChange={field.onChange}
              name="habitos-intestinais"
            />
          )}
        />
      </GrupoCampos>

      <GrupoCampos titulo="Observações de estilo de vida">
        <Campo label="Anotações adicionais" erro={e?.observacoes?.message}>
          {(props) => (
            <Textarea
              {...props}
              {...register("estilo.observacoes")}
              rows={3}
              placeholder="Rotina diferenciada, turnos noturnos, particularidades..."
              className="resize-none"
            />
          )}
        </Campo>
      </GrupoCampos>
    </div>
  )
}
