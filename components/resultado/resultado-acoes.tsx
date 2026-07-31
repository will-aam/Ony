"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { FileDown, RefreshCcw } from "lucide-react"
import { baixarAnamnese } from "@/lib/nutrition/pdf-generator"
import { carregarRascunho, limparRascunho } from "@/lib/nutrition/form-persistence"
import type { AnamneseFormValues } from "@/lib/nutrition/schema"

export function ResultadoAcoes() {
  const router = useRouter()
  const [dadosLocais, setDadosLocais] = useState<AnamneseFormValues | null>(null)

  useEffect(() => {
    // Carrega o rascunho salvo no navegador (que não foi apagado para gerar o PDF)
    const rascunho = carregarRascunho()
    if (rascunho) {
      setDadosLocais(rascunho as AnamneseFormValues)
    }
  }, [])

  const handleNovaFicha = () => {
    limparRascunho()
    router.push("/anamnese")
  }

  const handleBaixarPdf = () => {
    if (dadosLocais) {
      baixarAnamnese(dadosLocais)
    } else {
      alert("Não foi possível carregar os dados da ficha para gerar o PDF. Eles podem ter expirado ou sido apagados do navegador.")
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={handleNovaFicha}
        className="gap-1.5"
      >
        <RefreshCcw className="h-4 w-4" />
        Nova ficha
      </Button>
      
      {dadosLocais && (
        <Button
          size="sm"
          onClick={handleBaixarPdf}
          className="gap-1.5 bg-green-600 hover:bg-green-700 text-white"
        >
          <FileDown className="h-4 w-4" />
          Baixar PDF Completo
        </Button>
      )}
    </div>
  )
}
