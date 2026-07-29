"use client"

import { useId } from "react"
import { AlertCircle } from "lucide-react"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

interface CampoProps {
  label: string
  /** Mensagem de erro da validação; quando presente ativa aria-invalid. */
  erro?: string | undefined
  dica?: string | undefined
  obrigatorio?: boolean
  className?: string
  children: (props: {
    id: string
    "aria-invalid": boolean
    "aria-describedby": string | undefined
  }) => React.ReactNode
}

/**
 * Envelope de campo que conecta label, dica e mensagem de erro via
 * aria-describedby, garantindo leitura correta por leitores de tela.
 */
export function Campo({
  label,
  erro,
  dica,
  obrigatorio = false,
  className,
  children,
}: CampoProps) {
  const id = useId()
  const idDica = dica ? `${id}-dica` : undefined
  const idErro = erro ? `${id}-erro` : undefined
  const describedBy =
    [idDica, idErro].filter(Boolean).join(" ") || undefined

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Label htmlFor={id} className="text-sm font-semibold">
        {label}
        {obrigatorio ? (
          <span className="text-destructive" aria-hidden="true">
            *
          </span>
        ) : (
          <span className="text-xs font-normal text-muted-foreground">
            (opcional)
          </span>
        )}
      </Label>

      {children({
        id,
        "aria-invalid": Boolean(erro),
        "aria-describedby": describedBy,
      })}

      {dica ? (
        <p id={idDica} className="text-xs leading-relaxed text-muted-foreground">
          {dica}
        </p>
      ) : null}

      {erro ? (
        <p
          id={idErro}
          role="alert"
          className="flex items-start gap-1.5 text-xs font-medium text-destructive"
        >
          <AlertCircle className="mt-px size-3.5 shrink-0" aria-hidden="true" />
          {erro}
        </p>
      ) : null}
    </div>
  )
}

interface GrupoProps {
  titulo: string
  descricao?: string
  children: React.ReactNode
  className?: string
}

/** Agrupamento semântico de campos relacionados dentro de uma etapa. */
export function GrupoCampos({
  titulo,
  descricao,
  children,
  className,
}: GrupoProps) {
  return (
    <fieldset className={cn("flex flex-col gap-4", className)}>
      <legend className="flex flex-col gap-1">
        <span className="text-sm font-bold uppercase tracking-wide text-primary">
          {titulo}
        </span>
        {descricao ? (
          <span className="text-sm leading-relaxed text-muted-foreground">
            {descricao}
          </span>
        ) : null}
      </legend>
      {children}
    </fieldset>
  )
}
