"use client"

import { useFormContext } from "react-hook-form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { FREQUENCIA_ALIMENTAR_ITEMS, FREQUENCIA_OPTIONS } from "@/lib/nutrition/constants"
import type { AnamneseFormValues } from "@/lib/nutrition/schema"

export function StepFrequenciaAlimentar() {
  const { watch, setValue } = useFormContext<AnamneseFormValues>()
  const fa = watch("frequenciaAlimentar") ?? {}

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-sm font-bold uppercase tracking-wide text-primary">
          Frequência de consumo
        </h2>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
          Indique com que frequência você consome cada grupo alimentar. Não precisa ser exato — use a sua percepção habitual.
        </p>
      </div>

      <div className="overflow-hidden rounded-lg border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/40">
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                Grupo alimentar
              </th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                Frequência
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {FREQUENCIA_ALIMENTAR_ITEMS.map((item, idx) => (
              <tr
                key={item.key}
                className={idx % 2 === 0 ? "bg-background" : "bg-muted/10"}
              >
                <td className="px-4 py-3 text-foreground">{item.label}</td>
                <td className="px-4 py-3">
                  <Select
                    value={(fa as Record<string, string>)[item.key] ?? ""}
                    onValueChange={(v) =>
                      setValue(
                        `frequenciaAlimentar.${item.key}`,
                        v,
                      )
                    }
                  >
                    <SelectTrigger className="h-8 bg-background text-xs">
                      <SelectValue placeholder="Selecione..." />
                    </SelectTrigger>
                    <SelectContent>
                      {FREQUENCIA_OPTIONS.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value} className="text-xs">
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
