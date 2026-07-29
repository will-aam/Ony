"use client"

import { Controller, useFormContext, useWatch } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Campo, GrupoCampos } from "../form-field"
import { CampoSimNao } from "../yes-no-field"
import type { AnamneseFormValues } from "@/lib/nutrition/schema"

export function StepHistoricoClinico() {
  const { register, control, formState } = useFormContext<AnamneseFormValues>()
  const { errors } = formState

  const sexo = useWatch({ control, name: "sexo" })
  const gestante = useWatch({ control, name: "gestante" })
  const lactante = useWatch({ control, name: "lactante" })

  return (
    <div className="flex flex-col gap-8">
      <GrupoCampos
        titulo="Condições de saúde"
        descricao="Nada aqui é obrigatório, mas quanto mais completo, melhor a interpretação dos resultados."
      >
        <Campo
          label="Doenças diagnosticadas"
          erro={errors.doencasDiagnosticadas?.message}
          dica="Diabetes, hipertensão, dislipidemia, tireoide, renal, hepática, gastrointestinal, entre outras."
        >
          {(props) => (
            <Textarea
              {...props}
              {...register("doencasDiagnosticadas")}
              rows={3}
              placeholder="Liste as condições e desde quando"
            />
          )}
        </Campo>

        <Campo
          label="Medicamentos de uso contínuo"
          erro={errors.medicamentosContinuos?.message}
          dica="Inclua o nome e a dosagem, quando souber."
        >
          {(props) => (
            <Textarea
              {...props}
              {...register("medicamentosContinuos")}
              rows={3}
              placeholder="Ex.: Levotiroxina 50 mcg, 1x ao dia"
            />
          )}
        </Campo>

        <Campo
          label="Cirurgias realizadas"
          erro={errors.cirurgias?.message}
          dica="Cirurgia bariátrica e procedimentos abdominais alteram absorção de nutrientes."
        >
          {(props) => (
            <Textarea
              {...props}
              {...register("cirurgias")}
              rows={2}
              placeholder="Qual cirurgia e em que ano"
            />
          )}
        </Campo>

        <Campo
          label="Alergias ou intolerâncias alimentares"
          erro={errors.alergiasIntolerancias?.message}
          dica="Lactose, glúten, proteína do leite, frutos do mar, entre outras."
        >
          {(props) => (
            <Textarea
              {...props}
              {...register("alergiasIntolerancias")}
              rows={2}
              placeholder="Liste as alergias e intolerâncias conhecidas"
            />
          )}
        </Campo>

        <Campo
          label="Histórico familiar de doenças"
          erro={errors.historicoFamiliar?.message}
        >
          {(props) => (
            <Textarea
              {...props}
              {...register("historicoFamiliar")}
              rows={2}
              placeholder="Diabetes, obesidade, cardiopatias, câncer..."
            />
          )}
        </Campo>

        <Campo
          label="Sintomas gastrointestinais frequentes"
          erro={errors.sintomasGastrointestinais?.message}
          dica="Azia, refluxo, constipação, diarreia, distensão abdominal ou gases."
        >
          {(props) => (
            <Textarea
              {...props}
              {...register("sintomasGastrointestinais")}
              rows={2}
              placeholder="Descreva a frequência e os gatilhos percebidos"
            />
          )}
        </Campo>

        <Controller
          control={control}
          name="temExamesRecentes"
          render={({ field }) => (
            <CampoSimNao
              label="Possui exames laboratoriais recentes?"
              valor={field.value}
              onChange={field.onChange}
              name="exames-recentes"
            />
          )}
        />
      </GrupoCampos>

      {sexo === "feminino" ? (
        <GrupoCampos
          titulo="Saúde da mulher"
          descricao="Estes fatores afetam necessidades energéticas e de micronutrientes."
        >
          <Controller
            control={control}
            name="cicloRegular"
            render={({ field }) => (
              <CampoSimNao
                label="Ciclo menstrual regular?"
                valor={field.value}
                onChange={field.onChange}
                name="ciclo-regular"
              />
            )}
          />

          <Campo
            label="Uso de anticoncepcional"
            erro={errors.anticoncepcional?.message}
          >
            {(props) => (
              <Input
                {...props}
                {...register("anticoncepcional")}
                placeholder="Qual método, se usa"
              />
            )}
          </Campo>

          <Controller
            control={control}
            name="gestante"
            render={({ field }) => (
              <CampoSimNao
                label="Está gestante?"
                valor={field.value}
                onChange={field.onChange}
                name="gestante"
              />
            )}
          />

          <Controller
            control={control}
            name="lactante"
            render={({ field }) => (
              <CampoSimNao
                label="Está amamentando?"
                valor={field.value}
                onChange={field.onChange}
                name="lactante"
              />
            )}
          />

          <Controller
            control={control}
            name="menopausa"
            render={({ field }) => (
              <CampoSimNao
                label="Está na menopausa?"
                valor={field.value}
                onChange={field.onChange}
                name="menopausa"
              />
            )}
          />

          {gestante === true || lactante === true ? (
            <p
              role="status"
              className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm leading-relaxed text-foreground"
            >
              Gestação e amamentação alteram substancialmente as necessidades
              energéticas e de micronutrientes. As estimativas desta ferramenta{" "}
              <strong>não se aplicam</strong> a esses períodos — procure
              acompanhamento nutricional individualizado.
            </p>
          ) : null}
        </GrupoCampos>
      ) : null}
    </div>
  )
}
