"use client"

import { Controller, useFormContext, useWatch } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Campo, GrupoCampos } from "../form-field"
import { CampoSimNao } from "../yes-no-field"
import { RadioCards } from "../option-cards"
import {
  FATOR_ATIVIDADE,
  INTENSIDADES,
  NIVEIS_ATIVIDADE,
  PERFIS_TRABALHO,
} from "@/lib/nutrition/constants"
import {
  LABEL_ATIVIDADE,
  LABEL_INTENSIDADE,
  LABEL_PERFIL_TRABALHO,
} from "@/lib/nutrition/labels"
import type { AnamneseFormValues } from "@/lib/nutrition/schema"

const OPCOES_NIVEL = NIVEIS_ATIVIDADE.map((valor) => ({
  valor,
  label: LABEL_ATIVIDADE[valor],
  descricao: `Fator de atividade ${FATOR_ATIVIDADE[valor].toLocaleString("pt-BR")}`,
}))

const OPCOES_INTENSIDADE = INTENSIDADES.map((valor) => ({
  valor,
  label: LABEL_INTENSIDADE[valor],
}))

const OPCOES_TRABALHO = PERFIS_TRABALHO.map((valor) => ({
  valor,
  label: LABEL_PERFIL_TRABALHO[valor],
}))

export function StepAtividadeFisica() {
  const { register, control, formState } = useFormContext<AnamneseFormValues>()
  const { errors } = formState

  const pratica = useWatch({ control, name: "praticaAtividade" })

  return (
    <div className="flex flex-col gap-8">
      <GrupoCampos titulo="Prática de exercícios">
        <Controller
          control={control}
          name="praticaAtividade"
          render={({ field }) => (
            <CampoSimNao
              label="Você pratica atividade física?"
              valor={field.value}
              onChange={field.onChange}
              name="pratica-atividade"
            />
          )}
        />

        {pratica === true ? (
          <>
            <Campo
              label="Quais atividades?"
              erro={errors.atividadesQuais?.message}
            >
              {(props) => (
                <Textarea
                  {...props}
                  {...register("atividadesQuais")}
                  rows={2}
                  placeholder="Ex.: musculação, corrida, natação"
                />
              )}
            </Campo>

            <div className="grid gap-4 sm:grid-cols-2">
              <Campo
                label="Frequência semanal (dias)"
                erro={errors.frequenciaSemanal?.message}
              >
                {(props) => (
                  <Input
                    {...props}
                    {...register("frequenciaSemanal")}
                    type="number"
                    inputMode="numeric"
                    min={0}
                    max={14}
                    placeholder="Ex.: 4"
                  />
                )}
              </Campo>

              <Campo
                label="Duração média (min/sessão)"
                erro={errors.duracaoSessao?.message}
              >
                {(props) => (
                  <Input
                    {...props}
                    {...register("duracaoSessao")}
                    type="number"
                    inputMode="numeric"
                    min={0}
                    max={600}
                    placeholder="Ex.: 60"
                  />
                )}
              </Campo>
            </div>

            <Campo label="Intensidade percebida" erro={errors.intensidade?.message}>
              {() => (
                <Controller
                  control={control}
                  name="intensidade"
                  render={({ field }) => (
                    <RadioCards
                      opcoes={OPCOES_INTENSIDADE}
                      valor={field.value}
                      onChange={field.onChange}
                      name="intensidade"
                      ariaLabel="Intensidade percebida"
                      colunas={2}
                    />
                  )}
                />
              )}
            </Campo>

            <Campo
              label="Há quanto tempo pratica"
              erro={errors.tempoPratica?.message}
            >
              {(props) => (
                <Input
                  {...props}
                  {...register("tempoPratica")}
                  placeholder="Ex.: 2 anos"
                />
              )}
            </Campo>
          </>
        ) : null}
      </GrupoCampos>

      <GrupoCampos titulo="Esforço no trabalho">
        <Campo
          label="Seu trabalho é predominantemente"
          erro={errors.perfilTrabalho?.message}
        >
          {() => (
            <Controller
              control={control}
              name="perfilTrabalho"
              render={({ field }) => (
                <RadioCards
                  opcoes={OPCOES_TRABALHO}
                  valor={field.value}
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
        titulo="Fator de atividade"
        descricao="Este é o multiplicador aplicado à sua taxa metabólica basal para estimar o gasto energético total. Considere exercícios e esforço no trabalho somados."
      >
        <Campo
          label="Nível de atividade física geral"
          obrigatorio
          erro={errors.nivelAtividade?.message}
        >
          {() => (
            <Controller
              control={control}
              name="nivelAtividade"
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
