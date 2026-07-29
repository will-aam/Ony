"use client"

import { Controller, useFormContext, useWatch } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Campo, GrupoCampos } from "../form-field"
import { CampoSimNao } from "../yes-no-field"
import { RadioCards } from "../option-cards"
import { FrequenciaAlimentar } from "../frequencia-alimentar"
import { REFEICOES, PREPARADORES_REFEICAO } from "@/lib/nutrition/constants"
import { LABEL_PREPARADOR, LABEL_REFEICAO } from "@/lib/nutrition/labels"
import type { AnamneseFormValues } from "@/lib/nutrition/schema"

const OPCOES_PREPARADOR = PREPARADORES_REFEICAO.map((valor) => ({
  valor,
  label: LABEL_PREPARADOR[valor],
}))

export function StepHistoricoAlimentar() {
  const { register, control, formState } = useFormContext<AnamneseFormValues>()
  const { errors } = formState

  const belisca = useWatch({ control, name: "beliscaEntreRefeicoes" })

  return (
    <div className="flex flex-col gap-8">
      <GrupoCampos titulo="Rotina de refeições">
        <div className="grid gap-4 sm:grid-cols-2">
          <Campo
            label="Refeições por dia"
            erro={errors.refeicoesPorDia?.message}
          >
            {(props) => (
              <Input
                {...props}
                {...register("refeicoesPorDia")}
                type="number"
                inputMode="numeric"
                min={1}
                max={12}
                placeholder="Ex.: 5"
              />
            )}
          </Campo>

          <Campo
            label="Quem prepara as refeições"
            erro={errors.preparadorRefeicoes?.message}
          >
            {() => (
              <Controller
                control={control}
                name="preparadorRefeicoes"
                render={({ field }) => (
                  <RadioCards
                    opcoes={OPCOES_PREPARADOR}
                    valor={field.value}
                    onChange={field.onChange}
                    name="preparador-refeicoes"
                    ariaLabel="Quem prepara as refeições"
                  />
                )}
              />
            )}
          </Campo>
        </div>

        <Campo
          label="Com que frequência come fora de casa"
          erro={errors.comeFora?.message}
        >
          {(props) => (
            <Input
              {...props}
              {...register("comeFora")}
              placeholder="Ex.: almoço em restaurante de segunda a sexta"
            />
          )}
        </Campo>

        <Controller
          control={control}
          name="beliscaEntreRefeicoes"
          render={({ field }) => (
            <CampoSimNao
              label="Costuma beliscar entre as refeições?"
              valor={field.value}
              onChange={field.onChange}
              name="belisca"
            />
          )}
        />

        {belisca === true ? (
          <Campo label="O que costuma beliscar" erro={errors.beliscaOQue?.message}>
            {(props) => (
              <Input
                {...props}
                {...register("beliscaOQue")}
                placeholder="Ex.: biscoitos, castanhas, chocolate"
              />
            )}
          </Campo>
        ) : null}
      </GrupoCampos>

      <GrupoCampos
        titulo="Recordatório alimentar de 24 horas"
        descricao="Descreva o que você consumiu em um dia habitual, incluindo bebidas e quantidades aproximadas."
      >
        <div className="flex flex-col gap-4">
          {REFEICOES.map((refeicao, indice) => (
            <div
              key={refeicao}
              className="flex flex-col gap-3 rounded-lg border border-border bg-card p-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h4 className="text-sm font-bold text-foreground">
                  {LABEL_REFEICAO[refeicao]}
                </h4>
                <div className="flex items-center gap-2">
                  <label
                    htmlFor={`horario-${refeicao}`}
                    className="text-xs font-medium text-muted-foreground"
                  >
                    Horário
                  </label>
                  <Input
                    id={`horario-${refeicao}`}
                    type="time"
                    {...register(`recordatorio.${indice}.horario`)}
                    className="w-28"
                  />
                </div>
              </div>

              <Textarea
                {...register(`recordatorio.${indice}.alimentos`)}
                rows={2}
                aria-label={`Alimentos consumidos no ${LABEL_REFEICAO[refeicao]}`}
                placeholder="Ex.: 1 pão francês, 1 ovo mexido, café com leite sem açúcar"
              />
            </div>
          ))}
        </div>
      </GrupoCampos>

      <GrupoCampos
        titulo="Frequência de consumo por grupo alimentar"
        descricao="Marque quantas vezes por semana você costuma consumir cada grupo."
      >
        <Controller
          control={control}
          name="frequenciaAlimentar"
          render={({ field }) => (
            <FrequenciaAlimentar
              valores={field.value ?? {}}
              onChange={field.onChange}
            />
          )}
        />
      </GrupoCampos>

      <GrupoCampos titulo="Preferências e histórico">
        <Campo
          label="Alimentos preferidos"
          erro={errors.alimentosPreferidos?.message}
        >
          {(props) => (
            <Textarea
              {...props}
              {...register("alimentosPreferidos")}
              rows={2}
              placeholder="Alimentos que você gosta e gostaria de manter no plano"
            />
          )}
        </Campo>

        <Campo
          label="Alimentos que não consome"
          erro={errors.alimentosRecusados?.message}
        >
          {(props) => (
            <Textarea
              {...props}
              {...register("alimentosRecusados")}
              rows={2}
              placeholder="Alimentos que você não gosta ou evita"
            />
          )}
        </Campo>

        <Campo
          label="Restrições por escolha ou crença"
          dica="Por exemplo: vegetariano, vegano, restrição religiosa."
          erro={errors.restricoesEscolha?.message}
        >
          {(props) => (
            <Input
              {...props}
              {...register("restricoesEscolha")}
              placeholder="Ex.: vegetariano desde 2020"
            />
          )}
        </Campo>

        <Campo
          label="Já fez dietas anteriormente?"
          dica="Descreva quais, por quanto tempo e com qual resultado."
          erro={errors.dietasAnteriores?.message}
        >
          {(props) => (
            <Textarea
              {...props}
              {...register("dietasAnteriores")}
              rows={3}
              placeholder="Ex.: low carb por 6 meses, perdi 8 kg e recuperei depois"
            />
          )}
        </Campo>

        <Campo
          label="Como você descreve sua relação com a comida"
          erro={errors.relacaoComComida?.message}
        >
          {(props) => (
            <Textarea
              {...props}
              {...register("relacaoComComida")}
              rows={3}
              placeholder="Ex.: como por ansiedade no fim do dia"
            />
          )}
        </Campo>
      </GrupoCampos>
    </div>
  )
}
