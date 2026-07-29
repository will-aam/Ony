"use client"

import { Check } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

export interface Opcao<T extends string> {
  valor: T
  label: string
  descricao?: string
}

interface RadioCardsProps<T extends string> {
  opcoes: ReadonlyArray<Opcao<T>>
  valor: T | undefined
  onChange: (valor: T) => void
  name: string
  ariaLabel: string
  colunas?: 1 | 2
}

/** Seleção única apresentada como cartões clicáveis. */
export function RadioCards<T extends string>({
  opcoes,
  valor,
  onChange,
  name,
  ariaLabel,
  colunas = 1,
}: RadioCardsProps<T>) {
  return (
    <RadioGroup
      value={valor ?? ""}
      onValueChange={(novo) => onChange(novo as T)}
      aria-label={ariaLabel}
      className={cn(
        "grid gap-3",
        colunas === 2 ? "sm:grid-cols-2" : "grid-cols-1"
      )}
    >
      {opcoes.map((opcao) => {
        const id = `${name}-${opcao.valor}`
        const selecionado = valor === opcao.valor

        return (
          <Label
            key={opcao.valor}
            htmlFor={id}
            className={cn(
              "flex cursor-pointer items-start gap-3 rounded-lg border-2 bg-card p-4 transition-colors hover:border-primary/50",
              selecionado
                ? "border-primary bg-primary/5"
                : "border-border"
            )}
          >
            <RadioGroupItem value={opcao.valor} id={id} className="mt-0.5" />
            <span className="flex flex-col gap-1">
              <span className="text-sm font-semibold leading-snug text-foreground">
                {opcao.label}
              </span>
              {opcao.descricao ? (
                <span className="text-xs leading-relaxed text-muted-foreground">
                  {opcao.descricao}
                </span>
              ) : null}
            </span>
          </Label>
        )
      })}
    </RadioGroup>
  )
}

interface CheckboxCardsProps<T extends string> {
  opcoes: ReadonlyArray<Opcao<T>>
  valores: T[]
  onChange: (valores: T[]) => void
  name: string
}

/** Seleção múltipla apresentada como cartões clicáveis. */
export function CheckboxCards<T extends string>({
  opcoes,
  valores,
  onChange,
  name,
}: CheckboxCardsProps<T>) {
  function alternar(valor: T, marcado: boolean) {
    if (marcado) {
      onChange([...valores, valor])
    } else {
      onChange(valores.filter((item) => item !== valor))
    }
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {opcoes.map((opcao) => {
        const id = `${name}-${opcao.valor}`
        const selecionado = valores.includes(opcao.valor)

        return (
          <Label
            key={opcao.valor}
            htmlFor={id}
            className={cn(
              "flex cursor-pointer items-start gap-3 rounded-lg border-2 bg-card p-4 transition-colors hover:border-primary/50",
              selecionado ? "border-primary bg-primary/5" : "border-border"
            )}
          >
            <Checkbox
              id={id}
              checked={selecionado}
              onCheckedChange={(marcado) =>
                alternar(opcao.valor, marcado === true)
              }
              className="mt-0.5"
            />
            <span className="flex flex-col gap-1">
              <span className="text-sm font-semibold leading-snug text-foreground">
                {opcao.label}
              </span>
              {opcao.descricao ? (
                <span className="text-xs leading-relaxed text-muted-foreground">
                  {opcao.descricao}
                </span>
              ) : null}
            </span>
          </Label>
        )
      })}
    </div>
  )
}

interface BiotipoCardsProps<T extends string> {
  opcoes: ReadonlyArray<Opcao<T> & { imagem: string }>
  valor: T | undefined
  onChange: (valor: T) => void
}

/** Seleção de biotipo com apoio visual das ilustrações originais. */
export function BiotipoCards<T extends string>({
  opcoes,
  valor,
  onChange,
}: BiotipoCardsProps<T>) {
  return (
    <RadioGroup
      value={valor ?? ""}
      onValueChange={(novo) => onChange(novo as T)}
      aria-label="Biotipo corporal"
      className="grid gap-3 sm:grid-cols-3"
    >
      {opcoes.map((opcao) => {
        const id = `biotipo-${opcao.valor}`
        const selecionado = valor === opcao.valor

        return (
          <Label
            key={opcao.valor}
            htmlFor={id}
            className={cn(
              "relative flex cursor-pointer flex-col items-center gap-3 rounded-xl border-2 bg-card p-4 text-center transition-colors hover:border-primary/50",
              selecionado ? "border-primary bg-primary/5" : "border-border"
            )}
          >
            <RadioGroupItem value={opcao.valor} id={id} className="sr-only" />
            {selecionado ? (
              <span className="absolute right-3 top-3 flex size-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Check className="size-3" aria-hidden="true" />
              </span>
            ) : null}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={opcao.imagem}
              alt={`Ilustração do biotipo ${opcao.label}`}
              width={120}
              height={160}
              loading="lazy"
              className="h-40 w-auto object-contain"
            />
            <span className="flex flex-col gap-1">
              <span className="text-sm font-bold text-foreground">
                {opcao.label}
              </span>
              {opcao.descricao ? (
                <span className="text-xs leading-relaxed text-muted-foreground">
                  {opcao.descricao}
                </span>
              ) : null}
            </span>
          </Label>
        )
      })}
    </RadioGroup>
  )
}
