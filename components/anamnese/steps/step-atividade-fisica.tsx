"use client"

import { Controller, useFormContext, useWatch } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Campo, GrupoCampos } from "../form-field"
import { CampoSimNao } from "../yes-no-field"
import { RadioCards } from "../option-cards"
import {
  FATOR_ATIVIDADE,
  INTENSIDADE_OPTIONS,
  NIVEL_ATIVIDADE_OPTIONS,
  PERFIL_TRABALHO_OPTIONS,
} from "@/lib/nutrition/constants"
import type { AnamneseFormValues } from "@/lib/nutrition/schema"

const OPCOES_NIVEL = NIVEL_ATIVIDADE_OPTIONS.map((o) => ({
  valor: o.value,
  label: o.label,
  descricao: `Fator ${FATOR_ATIVIDADE[o.value].toLocaleString("pt-BR")} × TMB`,
}))

const OPCOES_INTENSIDADE = INTENSIDADE_OPTIONS.map((o) => ({
  valor: o.value,
  label: o.label,
}))

const OPCOES_TRABALHO = PERFIL_TRABALHO_OPTIONS.map((o) => ({
  valor: o.value,
  label: o.label,
}))

export function StepAtividadeFisica() {
  const { register, control, formState } = useFormContext<AnamneseFormValues>()
  const { errors } = formState
  const e = errors.atividadeFisica

  const pratica = useWatch({ control, name: "atividadeFisica.praticaAtividade" })

  return (
    <div className="flex flex-col gap-8">
      <GrupoCampos titulo="Prática de exercícios">
        <Controller
          control={control}
          name="atividadeFisica.praticaAtividade"
          render={({ field }) => (
            <CampoSimNao
              label="Você pratica atividade física atualmente?"
              valor={field.value}
              onChange={field.onChange}
              name="pratica-atividade"
            />
          )}
        />

        {pratica === true && (
          <>
            <Campo label="Quais atividades?" erro={e?.atividadesQuais?.message}>
              {(props) => (
                <Textarea
                  {...props}
                  {...register("atividadeFisica.atividadesQuais")}
                  rows={2}
                  placeholder="Ex.: musculação, corrida, natação, yoga..."
                  className="resize-none"
                />
              )}
            </Campo>

            <div className="grid gap-4 sm:grid-cols-2">
              <Campo
                label="Frequência semanal (dias)"
                erro={e?.frequenciaSemanal?.message}
              >
                {(props) => (
                  <Input
                    {...props}
                    {...register("atividadeFisica.frequenciaSemanal")}
                    type="number"
                    inputMode="numeric"
                    min={0}
                    max={14}
                    placeholder="Ex.: 4"
                  />
                )}
              </Campo>

              <Campo
                label="Duração média por sessão (min)"
                erro={e?.duracaoSessao?.message}
              >
                {(props) => (
                  <Input
                    {...props}
                    {...register("atividadeFisica.duracaoSessao")}
                    type="number"
                    inputMode="numeric"
                    min={0}
                    max={600}
                    placeholder="Ex.: 60"
                  />
                )}
              </Campo>
            </div>

            <Campo label="Intensidade percebida" erro={e?.intensidade?.message}>
              {() => (
                <Controller
                  control={control}
                  name="atividadeFisica.intensidade"
                  render={({ field }) => (
                    <RadioCards
                      opcoes={OPCOES_INTENSIDADE}
                      valor={field.value ?? ""}
                      onChange={field.onChange}
                      name="intensidade"
                      ariaLabel="Intensidade percebida"
                      colunas={2}
                    />
                  )}
                />
              )}
            </Campo>

            <Campo label="Há quanto tempo pratica" erro={e?.tempoPratica?.message}>
              {(props) => (
                <Input
                  {...props}
                  {...register("atividadeFisica.tempoPratica")}
                  placeholder="Ex.: 2 anos"
                />
              )}
            </Campo>
          </>
        )}
      </GrupoCampos>

      <GrupoCampos titulo="Esforço no trabalho">
        <Campo
          label="Seu trabalho é predominantemente"
          erro={e?.perfilTrabalho?.message}
        >
          {() => (
            <Controller
              control={control}
              name="atividadeFisica.perfilTrabalho"
              render={({ field }) => (
                <RadioCards
                  opcoes={OPCOES_TRABALHO}
                  valor={field.value ?? ""}
                  onChange={field.onChange}
                  name="perfil-trabalho"
                  ariaLabel="Perfil de esforço no trabalho"
                />
              )}
            />
          )}
        </Campo>
      </GrupoCampos>

      <GrupoCampos
        titulo="Fator de atividade geral"
        descricao="Multiplicador aplicado à taxa metabólica basal. Considere exercícios e esforço no trabalho somados."
      >
        <Campo
          label="Nível de atividade física geral"
          obrigatorio
          erro={e?.nivelAtividade?.message}
        >
          {() => (
            <Controller
              control={control}
              name="atividadeFisica.nivelAtividade"
              render={({ field }) => (
                <RadioCards
                  opcoes={OPCOES_NIVEL}
                  valor={field.value}
                  onChange={field.onChange}
                  name="nivel-atividade"
                  ariaLabel="Nível de atividade física geral"
                />
              )}
            />
          )}
        </Campo>
      </GrupoCampos>
    </div>
  )
}
