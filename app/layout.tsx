import type { Metadata, Viewport } from "next"
import { Nunito, Geist_Mono } from "next/font/google"
import { TooltipProvider } from "@/components/ui/tooltip"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import "./globals.css"

const nunito = Nunito({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-nunito",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-mono",
})

export const metadata: Metadata = {
  title: {
    default: "Ony — Anamnese e triagem nutricional",
    template: "%s | Ony",
  },
  description:
    "Plataforma de anamnese nutricional completa: calcule TMB, gasto energético total e distribuição de macronutrientes com base em dados clínicos, antropométricos e de estilo de vida.",
  keywords: [
    "anamnese nutricional",
    "TMB",
    "gasto energético total",
    "macronutrientes",
    "nutrição",
    "Harris-Benedict",
    "Mifflin-St Jeor",
    "Katch-McArdle",
  ],
  authors: [{ name: "Ony" }],
  openGraph: {
    title: "Ony — Anamnese e triagem nutricional",
    description:
      "Ficha de anamnese nutricional completa com cálculo de TMB, GET e macronutrientes.",
    type: "website",
    locale: "pt_BR",
  },
  icons: {
    icon: "/images/logo-brand/favicon-32x32.png",
    apple: "/images/logo-brand/apple-touch-icon.png",
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7faf8" },
    { media: "(prefers-color-scheme: dark)", color: "#0f2124" },
  ],
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      className={`bg-background ${nunito.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-dvh font-sans antialiased">
        <TooltipProvider delayDuration={200}>
          <a
            href="#conteudo"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
          >
            Ir para o conteúdo principal
          </a>
          <div className="flex min-h-dvh flex-col">
            <SiteHeader />
            <main id="conteudo" className="flex-1">
              {children}
            </main>
            <SiteFooter />
          </div>
        </TooltipProvider>
      </body>
    </html>
  )
}
