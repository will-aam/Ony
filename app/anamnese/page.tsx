import type { Metadata } from "next"
import { AnamneseWizard } from "@/components/anamnese/anamnese-wizard"

export const metadata: Metadata = {
  title: "Ficha de Anamnese Nutricional | Ony",
  description:
    "Preencha a ficha de anamnese nutricional completa e receba estimativas de TMB, gasto energético total e distribuição de macronutrientes personalizadas.",
}

export default function AnanesePage() {
  return (
    <main>
      <AnamneseWizard />
    </main>
  )
}
