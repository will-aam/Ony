"use client"

import { Controller, useFormContext } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Campo, GrupoCampos } from "../form-field"
import { RadioCards } from "../option-cards"
import type { AnamneseFormValues } from "@/lib/nutrition/schema"

const OPCOES_SEXO = [
  { valor: "feminino" as const, label: "Feminino" },
  { valor: "masculino" as const, label: "Masculino" },
]

export function StepDadosPessoais() {
  const { register, control, formState } = useFormContext<AnamneseFormValues>()
  const { errors } = formState
  const e = errors.dadosPessoais

  return (
    <div className="flex flex-col gap-8">
      <GrupoCampos titulo="Identificação">
        <Campo label="Nome completo" obrigatorio erro={e?.nome?.message}>
          {(props) => (
            <Input
              {...props}
              {...register("dadosPessoais.nome")}
              autoComplete="name"
              placeholder="Como você prefere ser chamado(a)"
            />
          )}
        </Campo>

        <div className="grid gap-4 sm:grid-cols-2">
          <Campo label="Data de nascimento" erro={e?.dataNascimento?.message}>
            {(props) => (
              <Input
                {...props}
                {...register("dadosPessoais.dataNascimento")}
                type="date"
              />
            )}
          </Campo>

          <Campo label="Idade" obrigatorio erro={e?.idade?.message}>
            {(props) => (
              <Input
                {...props}
                {...register("dadosPessoais.idade")}
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
          erro={e?.sexo?.message}
          dica="Usado apenas para selecionar a equação correta de taxa metabólica basal."
        >
          {() => (
            <Controller
              control={control}
              name="dadosPessoais.sexo"
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
          <Campo label="Profissão" erro={e?.profissao?.message}>
            {(props) => (
              <Input
                {...props}
                {...register("dadosPessoais.profissao")}
                placeholder="Ex.: Analista de sistemas"
              />
            )}
          </Campo>

          <Campo label="Carga horária de trabalho" erro={e?.cargaHoraria?.message}>
            {(props) => (
              <Input
                {...props}
                {...register("dadosPessoais.cargaHoraria")}
                placeholder="Ex.: 40h por semana"
              />
            )}
          </Campo>
        </div>

        <Campo
          label="Telefone ou e-mail"
          erro={e?.contato?.message}
          dica="Fica apenas no seu navegador; nada é enviado ou armazenado em servidor."
        >
          {(props) => (
            <Input
              {...props}
              {...register("dadosPessoais.contato")}
              autoComplete="email"
              placeholder="seu@email.com"
            />
          )}
        </Campo>

        <Campo label="Encaminhado por" erro={e?.encaminhadoPor?.message}>
          {(props) => (
            <Input
              {...props}
              {...register("dadosPessoais.encaminhadoPor")}
              placeholder="Profissional ou indicação, se houver"
            />
          )}
        </Campo>
      </GrupoCampos>
    </div>
  )
}
