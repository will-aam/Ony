"use client"

import { FREQUENCIAS, GRUPOS_ALIMENTARES } from "@/lib/nutrition/constants"
import type { Frequencia, GrupoAlimentar } from "@/lib/nutrition/constants"
import { LABEL_FREQUENCIA, LABEL_GRUPO_ALIMENTAR } from "@/lib/nutrition/labels"
import { cn } from "@/lib/utils"

type Valores = Partial<Record<GrupoAlimentar, Frequencia | undefined>>

interface FrequenciaAlimentarProps {
  valores: Valores
  onChange: (valores: Valores) => void
}

/**
 * Matriz de frequência de consumo alimentar.
 * Implementada como grupos de radio nativos por linha, para que leitores de
 * tela anunciem "grupo alimentar" + "frequência" corretamente.
 */
export function FrequenciaAlimentar({
  valores,
  onChange,
}: FrequenciaAlimentarProps) {
  function selecionar(grupo: GrupoAlimentar, frequencia: Frequencia) {
    onChange({ ...valores, [grupo]: frequencia })
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full border-collapse text-sm">
        <caption className="sr-only">
          Frequência semanal de consumo por grupo alimentar
        </caption>
        <thead>
          <tr className="border-b border-border bg-muted/50">
            <th scope="col" className="p-3 text-left font-semibold">
              Grupo alimentar
            </th>
            {FREQUENCIAS.map((frequencia) => (
              <th
                key={frequencia}
                scope="col"
                className="p-3 text-center text-xs font-semibold whitespace-nowrap"
              >
                {LABEL_FREQUENCIA[frequencia]}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {GRUPOS_ALIMENTARES.map((grupo, indice) => (
            <tr
              key={grupo}
              className={cn(
                "border-b border-border last:border-b-0",
                indice % 2 === 1 && "bg-muted/20"
              )}
            >
              <th
                scope="row"
                className="p-3 text-left font-medium text-foreground"
              >
                {LABEL_GRUPO_ALIMENTAR[grupo]}
              </th>
              {FREQUENCIAS.map((frequencia) => {
                const id = `freq-${grupo}-${frequencia}`
                return (
                  <td key={frequencia} className="p-3 text-center">
                    <input
                      type="radio"
                      id={id}
                      name={`freq-${grupo}`}
                      value={frequencia}
                      checked={valores[grupo] === frequencia}
                      onChange={() => selecionar(grupo, frequencia)}
                      className="size-4 cursor-pointer accent-primary"
                    />
                    <label htmlFor={id} className="sr-only">
                      {`${LABEL_GRUPO_ALIMENTAR[grupo]}: ${LABEL_FREQUENCIA[frequencia]}`}
                    </label>
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
