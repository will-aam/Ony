"use client"

import { HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const RESULTADOS = [
  {
    biotipo: "Ectomorfo",
    condicao: "Os dedos se sobrepõem facilmente",
    detalhe: "Ossos finos",
  },
  {
    biotipo: "Mesomorfo",
    condicao: "Os dedos se tocam ou quase se tocam",
    detalhe: "Ossos médios",
  },
  {
    biotipo: "Endomorfo",
    condicao: "Os dedos não se encontram",
    detalhe: "Ossos largos",
  },
] as const

export function TesteDoPulso() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" variant="outline" size="sm" className="self-start">
          <HelpCircle className="size-4" aria-hidden="true" />
          Não sei meu biotipo — fazer o teste do pulso
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[85dvh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Teste do pulso</DialogTitle>
          <DialogDescription>
            Método simples proposto por William Sheldon para estimar a estrutura
            óssea e, com ela, o biotipo corporal.
          </DialogDescription>
        </DialogHeader>

        <ol className="flex flex-col gap-3 text-sm leading-relaxed text-foreground">
          <li className="flex gap-3">
            <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
              1
            </span>
            <span>
              Com a mão direita, envolva o pulso esquerdo usando o polegar e o
              dedo médio.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
              2
            </span>
            <span>Observe como os dedos se encontram:</span>
          </li>
        </ol>

        <ul className="flex flex-col gap-2">
          {RESULTADOS.map((item) => (
            <li
              key={item.biotipo}
              className="rounded-lg border border-border bg-secondary/40 p-3"
            >
              <p className="text-sm font-semibold text-foreground">
                {item.condicao}
              </p>
              <p className="text-sm text-muted-foreground">
                {`${item.biotipo} — ${item.detalhe.toLowerCase()}`}
              </p>
            </li>
          ))}
        </ul>

        <p className="text-xs leading-relaxed text-muted-foreground">
          Use o teste como referência aproximada. Ele estima a estrutura óssea,
          não a composição corporal atual.
        </p>
      </DialogContent>
    </Dialog>
  )
}
