"use client"

import { Controller, useFormContext, useWatch } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Campo, GrupoCampos } from "../form-field"
import { CampoSimNao } from "../yes-no-field"
import { RadioCards } from "../option-cards"
import {
  CONSUMOS_ALCOOL,
  NIVEIS_ESTRESSE,
  QUALIDADES,
} from "@/lib/nutrition/constants"
import {
  LABEL_ALCOOL,
  LABEL_ESTRESSE,
  LABEL_QUALIDADE,
} from "@/lib/nutrition/labels"
import type { AnamneseFormValues } from "@/lib/nutrition/schema"

const OPCOES_QUALIDADE = QUALIDADES.map((valor) => ({
  valor,
  label: LABEL_QUALIDADE[valor],
}))

const OPCOES_ESTRESSE = NIVEIS_ESTRESSE.map((valor) => ({
  valor,
  label: LABEL_ESTRESSE[valor],
}))

const OPCOES_ALCOOL = CONSUMOS_ALCOOL.map((valor) => ({
  valor,
  label: LABEL_ALCOOL[valor],
}))

export function StepEstiloVida() {
  const { register, control, formState } = useFormContext<AnamneseFormValues>()
  const { errors } = formState

  const alcool = useWatch({ control, name: "consumoAlcool" })
  const fuma = useWatch({ control, name: "tabagismo" })

  return (
    <div className="flex flex-col gap-8">
      <GrupoCampos
        titulo="Sono e estresse"
        descricao="Sono insuficiente e estresse elevado alteram apetite, saciedade e recuperação muscular."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Campo label="Horas de sono por noite" erro={errors.horasSono?.message}>
            {(props) => (
              <Input
                {...props}
                {...register("horasSono")}
                type="number"
                inputMode="decimal"
                step="0.5"
                min={0}
                max={24}
                placeholder="Ex.: 7"
              />
            )}
          </Campo>

          <Campo label="Qualidade do sono" erro={errors.qualidadeSono?.message}>
            {() => (
              <Controller
                control={control}
                name="qualidadeSono"
                render={({ field }) => (
                  <RadioCards
                    opcoes={OPCOES_QUALIDADE}
                    valor={field.value}
                    onChange={field.onChange}
                    name="qualidade-sono"
                    ariaLabel="Qualidade do sono"
                  />
                )}
              />
            )}
          </Campo>
        </div>

        <Campo label="Nível de estresse" erro={errors.nivelEstresse?.message}>
          {() => (
            <Controller
              control={control}
              name="nivelEstresse"
              render={({ field }) => (
                <RadioCards
                  opcoes={OPCOES_ESTRESSE}
                  valor={field.value}
                  onChange={field.onChange}
                  name="nivel-estresse"
                  ariaLabel="Nível de estresse"
                  colunas={2}
                />
              )}
            />
          )}
        </Campo>
      </GrupoCampos>

      <GrupoCampos titulo="Hidratação">
        <Campo
          label="Consumo de água por dia (litros)"
          dica="Considere apenas água pura, sem contar café, chá ou sucos."
          erro={errors.consumoAgua?.message}
        >
          {(props) => (
            <Input
              {...props}
              {...register("consumoAgua")}
              type="number"
              inputMode="decimal"
              step="0.1"
              min={0}
              max={15}
              placeholder="Ex.: 2,5"
            />
          )}
        </Campo>
      </GrupoCampos>

      <GrupoCampos titulo="Álcool e tabagismo">
        <Campo label="Consome bebida alcoólica?" erro={errors.consumoAlcool?.message}>
          {() => (
            <Controller
              control={control}
              name="consumoAlcool"
              render={({ field }) => (
                <RadioCards
                  opcoes={OPCOES_ALCOOL}
                  valor={field.value}
                  onChange={field.onChange}
                  name="consumo-alcool"
                  ariaLabel="Consumo de bebida alcoólica"
                  colunas={2}
                />
              )}
            />
          )}
        </Campo>

        {alcool === "socialmente" || alcool === "frequente" ? (
          <Campo
            label="Com que frequência e quanto"
            erro={errors.alcoolQuantidade?.message}
          >
            {(props) => (
              <Input
                {...props}
                {...register("alcoolQuantidade")}
                placeholder="Ex.: 2 latas de cerveja nos fins de semana"
              />
            )}
          </Campo>
        ) : null}

        <Controller
          control={control}
          name="tabagismo"
          render={({ field }) => (
            <CampoSimNao
              label="Você fuma?"
              valor={field.value}
              onChange={field.onChange}
              name="tabagismo"
            />
          )}
        />

        {fuma === true ? (
          <Campo
            label="Quantidade por dia"
            erro={errors.tabagismoQuantidade?.message}
          >
            {(props) => (
              <Input
                {...props}
                {...register("tabagismoQuantidade")}
                placeholder="Ex.: 10 cigarros por dia"
              />
            )}
          </Campo>
        ) : null}
      </GrupoCampos>

      <GrupoCampos titulo="Suplementação">
        <Campo
          label="Usa suplementos ou vitaminas?"
          dica="Inclua nome, dose e há quanto tempo utiliza."
          erro={errors.suplementos?.message}
        >
          {(props) => (
            <Textarea
              {...props}
              {...register("suplementos")}
              rows={3}
              placeholder="Ex.: whey protein 30 g após o treino; vitamina D 2000 UI ao dia"
            />
          )}
        </Campo>
      </GrupoCampos>
    </div>
  )
}
