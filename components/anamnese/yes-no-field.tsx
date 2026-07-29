"use client"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from "@/lib/utils"

interface SimNaoProps {
  label: string
  valor: boolean | undefined
  onChange: (valor: boolean) => void
  name: string
  className?: string
}

/**
 * Par de opções sim/não com estado indeterminado inicial.
 * Usa string internamente porque RadioGroup só trabalha com strings.
 */
export function CampoSimNao({
  label,
  valor,
  onChange,
  name,
  className,
}: SimNaoProps) {
  const valorString = valor === undefined ? "" : valor ? "sim" : "nao"

  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-card px-4 py-3",
        className
      )}
    >
      <span className="text-sm font-medium text-foreground">{label}</span>
      <RadioGroup
        value={valorString}
        onValueChange={(novo) => onChange(novo === "sim")}
        className="flex items-center gap-4"
        aria-label={label}
      >
        <div className="flex items-center gap-2">
          <RadioGroupItem value="sim" id={`${name}-sim`} />
          <Label htmlFor={`${name}-sim`} className="text-sm font-normal">
            Sim
          </Label>
        </div>
        <div className="flex items-center gap-2">
          <RadioGroupItem value="nao" id={`${name}-nao`} />
          <Label htmlFor={`${name}-nao`} className="text-sm font-normal">
            Não
          </Label>
        </div>
      </RadioGroup>
    </div>
  )
}
