"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Alert } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { Info } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [abrirModal, setAbrirModal] = useState(false)
  const [emailRecuperacao, setEmailRecuperacao] = useState("")
  const [mensagemRecuperacao, setMensagemRecuperacao] = useState("")

  function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    // Autenticação não implementada ainda — apenas UI estruturada
  }

  function handleRecuperacao(e: React.FormEvent) {
    e.preventDefault()
    setMensagemRecuperacao(
      "Se este e-mail estiver cadastrado, você receberá o link de recuperação em breve."
    )
  }

  return (
    <div className="mx-auto flex min-h-[calc(100dvh-8rem)] max-w-sm flex-col justify-center px-4 py-12">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-foreground">Entrar</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Acesse sua conta para salvar fichas e histórico.
        </p>
      </div>

      <Alert className="mb-6 flex items-start gap-3 border-primary/30 bg-primary/5 text-sm text-muted-foreground">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
        <p>
          O login ainda está em desenvolvimento. A ficha de anamnese funciona
          sem conta — suas respostas são processadas localmente.
        </p>
      </Alert>

      <form onSubmit={handleLogin} className="flex flex-col gap-5" noValidate>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email">E-mail</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="voce@exemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="senha">Senha</Label>
            <button
              type="button"
              onClick={() => setAbrirModal(true)}
              className="text-xs text-primary hover:underline"
            >
              Esqueceu a senha?
            </button>
          </div>
          <Input
            id="senha"
            type="password"
            autoComplete="current-password"
            placeholder="••••••••"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>

        <Button type="submit" className="w-full" disabled>
          Entrar (em breve)
        </Button>
      </form>

      <Separator className="my-6" />

      <p className="text-center text-sm text-muted-foreground">
        Quer usar sem conta?{" "}
        <Link href="/anamnese" className="font-medium text-primary hover:underline">
          Preencher a ficha agora
        </Link>
      </p>

      {/* Modal recuperação de senha */}
      <Dialog open={abrirModal} onOpenChange={setAbrirModal}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Recuperar senha</DialogTitle>
            <DialogDescription>
              Informe seu e-mail e enviaremos um link de recuperação.
            </DialogDescription>
          </DialogHeader>

          {mensagemRecuperacao ? (
            <p className="text-sm text-muted-foreground leading-relaxed">
              {mensagemRecuperacao}
            </p>
          ) : (
            <form
              onSubmit={handleRecuperacao}
              className="flex flex-col gap-4"
              noValidate
            >
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="reset-email">E-mail</Label>
                <Input
                  id="reset-email"
                  type="email"
                  placeholder="voce@exemplo.com"
                  value={emailRecuperacao}
                  onChange={(e) => setEmailRecuperacao(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" disabled>
                Enviar link (em breve)
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
