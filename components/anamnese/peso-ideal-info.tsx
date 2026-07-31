"use client"

import { useFormContext, useWatch } from "react-hook-form"
import {
  calcularPesoIdealImc,
  calcularPesoIdealLorentz,
} from "@/lib/nutrition/calculations"
import type { AnamneseFormValues } from "@/lib/nutrition/schema"

/**
 * Card informativo — exibido na etapa de Antropometria quando altura e sexo
 * já estão preenchidos. Mostra a faixa de peso ideal (OMS/IMC) e o peso
 * de referência pela fórmula de Lorentz.
 *
 * Não é um campo de formulário: só lê dados e apresenta uma estimativa
 * educativa para o profissional e o paciente.
 */
export function PesoIdealInfo() {
  const { control } = useFormContext<AnamneseFormValues>()

  const altura = useWatch({ control, name: "antropometria.altura" })
  const sexo = useWatch({ control, name: "dadosPessoais.sexo" })

  const alturaN = Number(altura)
  const sexoValido = sexo === "masculino" || sexo === "feminino"
  const alturaValida = Number.isFinite(alturaN) && alturaN >= 100 && alturaN <= 250

  if (!alturaValida) return null

  const faixaImc = calcularPesoIdealImc(alturaN)
  const lorentz = sexoValido
    ? calcularPesoIdealLorentz(alturaN, sexo)
    : null

  return (
    <div
      role="note"
      aria-label="Estimativa de peso ideal"
      className="mt-4 rounded-lg border border-border bg-muted/40 px-4 py-4 text-sm"
    >
      <p className="mb-3 font-semibold text-foreground">
        Estimativa de peso ideal
      </p>

      <div className="flex flex-col gap-2">
        {/* Faixa IMC — OMS */}
        <div className="flex items-start gap-2">
          <span className="mt-0.5 shrink-0 text-primary">◆</span>
          <div>
            <span className="font-medium text-foreground">
              Faixa OMS / IMC:&nbsp;
            </span>
            <span className="text-foreground">
              {faixaImc.min.toFixed(1)} – {faixaImc.max.toFixed(1)} kg
            </span>
            <span className="ml-1.5 text-muted-foreground">
              (IMC 18,5 – 24,9)
            </span>
          </div>
        </div>

        {/* Lorentz — só exibe se o sexo estiver preenchido */}
        {lorentz !== null && (
          <div className="flex items-start gap-2">
            <span className="mt-0.5 shrink-0 text-primary">◆</span>
            <div>
              <span className="font-medium text-foreground">
                Lorentz ({sexo === "masculino" ? "masc." : "fem."}):&nbsp;
              </span>
              <span className="text-foreground">
                {lorentz.toFixed(1)} kg
              </span>
            </div>
          </div>
        )}
      </div>

      <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
        Estas são <strong>estimativas de referência</strong> — não um alvo
        obrigatório. A avaliação clínica, histórico e composição corporal do
        paciente devem sempre guiar a conduta nutricional.
      </p>
    </div>
  )
}
