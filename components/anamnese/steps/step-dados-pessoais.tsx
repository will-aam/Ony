"use client"

import { Controller, useFormContext } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Campo, GrupoCampos } from "../form-field"
import { RadioCards } from "../option-cards"
import { SEXOS } from "@/lib/nutrition/constants"
import { LABEL_SEXO } from "@/lib/nutrition/labels"
import type { AnamneseFormValues } from "@/lib/nutrition/schema"

const OPCOES_SEXO = SEXOS.map((valor) => ({
  valor,
  label: LABEL_SEXO[valor],
}))

export function StepDadosPessoais() {
  const { register, control, formState } = useFormContext<AnamneseFormValues>()
  const { errors } = formState

  return (
    <div className="flex flex-col gap-8">
      <GrupoCampos titulo="Identificação">
        <Campo label="Nome completo" obrigatorio erro={errors.nome?.message}>
          {(props) => (
            <Input
              {...props}
              {...register("nome")}
              autoComplete="name"
              placeholder="Como você prefere ser chamado(a)"
            />
          )}
        </Campo>

        <div className="grid gap-4 sm:grid-cols-2">
          <Campo
            label="Data de nascimento"
            erro={errors.dataNascimento?.message}
          >
            {(props) => (
              <Input {...props} {...register("dataNascimento")} type="date" />
            )}
          </Campo>

          <Campo label="Idade" obrigatorio erro={errors.idade?.message}>
            {(props) => (
              <Input
                {...props}
                {...register("idade")}
                type="number"
                inputMode="numeric"
                min={10}
                max={120}
                placeholder="Ex.: 32"
              />
            )}
          </Campo>
        </div>

        <Campo
          label="Sexo biológico"
          obrigatorio
          erro={errors.sexo?.message}
          dica="Usado apenas para selecionar a equação correta de taxa metabólica basal."
        >
          {() => (
            <Controller
              control={control}
              name="sexo"
              render={({ field }) => (
                <RadioCards
                  opcoes={OPCOES_SEXO}
                  valor={field.value}
                  onChange={field.onChange}
                  name="sexo"
                  ariaLabel="Sexo biológico"
                  colunas={2}
                />
              )}
            />
          )}
        </Campo>
      </GrupoCampos>

      <GrupoCampos
        titulo="Contexto"
        descricao="Informações opcionais que ajudam a interpretar sua rotina."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Campo label="Profissão" erro={errors.profissao?.message}>
            {(props) => (
              <Input
                {...props}
                {...register("profissao")}
                placeholder="Ex.: Analista de sistemas"
              />
            )}
          </Campo>

          <Campo
            label="Carga horária de trabalho"
            erro={errors.cargaHoraria?.message}
          >
            {(props) => (
              <Input
                {...props}
                {...register("cargaHoraria")}
                placeholder="Ex.: 40h por semana"
              />
            )}
          </Campo>
        </div>

        <Campo
          label="Telefone ou e-mail"
          erro={errors.contato?.message}
          dica="Fica apenas no seu navegador; nada é enviado ou armazenado em servidor."
        >
          {(props) => (
            <Input
              {...props}
              {...register("contato")}
              autoComplete="email"
              placeholder="seu@email.com"
            />
          )}
        </Campo>

        <Campo label="Encaminhado por" erro={errors.encaminhadoPor?.message}>
          {(props) => (
            <Input
              {...props}
              {...register("encaminhadoPor")}
              placeholder="Profissional ou indicação, se houver"
            />
          )}
        </Campo>
      </GrupoCampos>
    </div>
  )
}
