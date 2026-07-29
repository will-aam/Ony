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
  const e = errors.historicoClinico

  const sexo = useWatch({ control, name: "dadosPessoais.sexo" })
  const gestante = useWatch({ control, name: "historicoClinico.gestante" })
  const lactante = useWatch({ control, name: "historicoClinico.lactante" })

  return (
    <div className="flex flex-col gap-8">
      <GrupoCampos
        titulo="Condições de saúde"
        descricao="Nada aqui é obrigatório, mas quanto mais completo, mais precisa será a interpretação."
      >
        <Campo
          label="Doenças diagnosticadas"
          erro={e?.doencasDiagnosticadas?.message}
          dica="Diabetes, hipertensão, dislipidemia, tireoide, renal, hepática, gastrointestinal..."
        >
          {(props) => (
            <Textarea
              {...props}
              {...register("historicoClinico.doencasDiagnosticadas")}
              rows={3}
              placeholder="Liste as condições e desde quando"
              className="resize-none"
            />
          )}
        </Campo>

        <Campo
          label="Medicamentos de uso contínuo"
          erro={e?.medicamentosContinuos?.message}
          dica="Inclua nome e dosagem, quando souber."
        >
          {(props) => (
            <Textarea
              {...props}
              {...register("historicoClinico.medicamentosContinuos")}
              rows={3}
              placeholder="Ex.: Levotiroxina 50 mcg, 1x ao dia"
              className="resize-none"
            />
          )}
        </Campo>

        <Campo
          label="Cirurgias realizadas"
          erro={e?.cirurgias?.message}
          dica="Bariátrica e procedimentos abdominais alteram absorção de nutrientes."
        >
          {(props) => (
            <Textarea
              {...props}
              {...register("historicoClinico.cirurgias")}
              rows={2}
              placeholder="Qual cirurgia e em que ano"
              className="resize-none"
            />
          )}
        </Campo>

        <Campo
          label="Alergias ou intolerâncias alimentares"
          erro={e?.alergiasIntolerancias?.message}
          dica="Lactose, glúten, proteína do leite, frutos do mar, amendoim..."
        >
          {(props) => (
            <Textarea
              {...props}
              {...register("historicoClinico.alergiasIntolerancias")}
              rows={2}
              placeholder="Liste as alergias e intolerâncias conhecidas"
              className="resize-none"
            />
          )}
        </Campo>

        <Campo
          label="Histórico familiar de doenças"
          erro={e?.historicoFamiliar?.message}
        >
          {(props) => (
            <Textarea
              {...props}
              {...register("historicoClinico.historicoFamiliar")}
              rows={2}
              placeholder="Diabetes, obesidade, cardiopatias, câncer..."
              className="resize-none"
            />
          )}
        </Campo>

        <Campo
          label="Sintomas gastrointestinais frequentes"
          erro={e?.sintomasGastrointestinais?.message}
          dica="Azia, refluxo, constipação, diarreia, distensão ou gases."
        >
          {(props) => (
            <Textarea
              {...props}
              {...register("historicoClinico.sintomasGastrointestinais")}
              rows={2}
              placeholder="Descreva a frequência e os gatilhos percebidos"
              className="resize-none"
            />
          )}
        </Campo>

        <Controller
          control={control}
          name="historicoClinico.temExamesRecentes"
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
          descricao="Estes fatores afetam as necessidades energéticas e de micronutrientes."
        >
          <Controller
            control={control}
            name="historicoClinico.cicloRegular"
            render={({ field }) => (
              <CampoSimNao
                label="Ciclo menstrual regular?"
                valor={field.value}
                onChange={field.onChange}
                name="ciclo-regular"
              />
            )}
          />

          <Campo label="Uso de anticoncepcional" erro={e?.anticoncepcional?.message}>
            {(props) => (
              <Input
                {...props}
                {...register("historicoClinico.anticoncepcional")}
                placeholder="Qual método, se usa"
              />
            )}
          </Campo>

          <Controller
            control={control}
            name="historicoClinico.gestante"
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
            name="historicoClinico.lactante"
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
            name="historicoClinico.menopausa"
            render={({ field }) => (
              <CampoSimNao
                label="Está na menopausa?"
                valor={field.value}
                onChange={field.onChange}
                name="menopausa"
              />
            )}
          />

          {(gestante === true || lactante === true) && (
            <p
              role="status"
              className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm leading-relaxed text-foreground"
            >
              Gestação e amamentação alteram substancialmente as necessidades
              energéticas e de micronutrientes. As estimativas desta ferramenta{" "}
              <strong>não se aplicam</strong> a esses períodos — procure
              acompanhamento nutricional individualizado.
            </p>
          )}
        </GrupoCampos>
      ) : null}
    </div>
  )
}
