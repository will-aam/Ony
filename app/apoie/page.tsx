"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Heart } from "lucide-react"
import { cn } from "@/lib/utils"

const VALORES_PREDEFINIDOS = [5, 10, 20, 50]

export default function ApoiePage() {
  const [valorSelecionado, setValorSelecionado] = useState<number | null>(null)
  const [valorCustom, setValorCustom] = useState("")
  const [erro, setErro] = useState("")
  const [status, setStatus] = useState<"idle" | "redirecionando">("idle")

  const valorFinal = valorCustom
    ? parseFloat(valorCustom)
    : valorSelecionado

  function handleDoar() {
    setErro("")
    if (!valorFinal || valorFinal <= 0) {
      setErro("Por favor, selecione ou informe um valor válido para contribuir.")
      return
    }
    setStatus("redirecionando")
    // Link de pagamento real deve ser configurado aqui
    // window.location.href = `https://link.mercadopago.com.br/SEU_LINK?amount=${valorFinal}`
    setTimeout(() => {
      setStatus("idle")
      setErro(
        "Link de pagamento ainda não configurado. Obrigado pela intenção!"
      )
    }, 1500)
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-12 sm:py-16">
      {/* Cabeçalho */}
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
          <Heart className="h-6 w-6 text-primary" aria-hidden="true" />
        </div>
        <h1 className="text-3xl font-bold text-foreground text-balance">
          Apoie o Ony
        </h1>
        <p className="mt-2 text-muted-foreground leading-relaxed text-pretty">
          Nos ajude a manter este serviço gratuito no ar e em constante
          evolução.
        </p>
      </div>

      {/* Texto explicativo */}
      <section className="mb-8 rounded-xl border border-border bg-card p-5 text-sm text-muted-foreground leading-relaxed space-y-3">
        <p>
          O Ony é um projeto desenvolvido para ajudá-lo a alcançar seus
          objetivos de saúde e bem-estar de forma acessível. Sua doação
          voluntária cobre custos com servidores, desenvolvimento de novas
          funcionalidades e melhorias contínuas na plataforma.
        </p>
        <p>
          As doações são completamente opcionais, mas cada contribuição faz uma
          grande diferença para manter o serviço gratuito para todos.
        </p>
      </section>

      <Separator className="mb-8" />

      {/* Formulário de doação */}
      <section aria-labelledby="doacao-heading">
        <h2
          id="doacao-heading"
          className="mb-4 text-sm font-bold uppercase tracking-wide text-primary"
        >
          Faça sua contribuição
        </h2>

        {/* Valores predefinidos */}
        <div className="mb-5 flex flex-wrap gap-3" role="group" aria-label="Valores sugeridos">
          {VALORES_PREDEFINIDOS.map((valor) => (
            <button
              key={valor}
              type="button"
              onClick={() => {
                setValorSelecionado(valor)
                setValorCustom("")
                setErro("")
              }}
              className={cn(
                "rounded-lg border px-5 py-2.5 text-sm font-semibold transition-colors",
                valorSelecionado === valor && !valorCustom
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-foreground hover:border-primary/60",
              )}
              aria-pressed={valorSelecionado === valor && !valorCustom}
            >
              R$ {valor}
            </button>
          ))}
        </div>

        {/* Valor personalizado */}
        <div className="mb-6 flex flex-col gap-1.5">
          <Label htmlFor="valorCustom">Ou informe outro valor (R$)</Label>
          <Input
            id="valorCustom"
            type="number"
            min={1}
            placeholder="Ex: 15"
            value={valorCustom}
            onChange={(e) => {
              setValorCustom(e.target.value)
              setValorSelecionado(null)
              setErro("")
            }}
          />
        </div>

        {erro && (
          <p role="alert" className="mb-4 text-sm text-destructive">
            {erro}
          </p>
        )}

        <Button
          className="w-full gap-2"
          size="lg"
          onClick={handleDoar}
          disabled={status === "redirecionando"}
        >
          <Heart className="h-4 w-4" aria-hidden="true" />
          {status === "redirecionando"
            ? "Redirecionando..."
            : valorFinal && valorFinal > 0
            ? `Contribuir com R$ ${valorFinal.toFixed(2)}`
            : "Contribuir"}
        </Button>

        <p className="mt-3 text-center text-xs text-muted-foreground">
          Doações processadas via Mercado Pago. Seguro e sem complicação.
        </p>
      </section>
    </div>
  )
}
