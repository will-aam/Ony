import type { AnamneseFormValues } from "./schema"

/** Identificadores estáveis das etapas do wizard. */
export const STEP_IDS = [
  "dados-pessoais",
  "queixa",
  "historico-clinico",
  "antropometria",
  "atividade-fisica",
  "estilo-vida",
  "historico-alimentar",
  "calculo",
  "observacoes",
] as const

export type StepId = (typeof STEP_IDS)[number]

export interface StepDefinition {
  id: StepId
  numero: number
  titulo: string
  descricao: string
  /** Campos validados ao avançar. Etapas opcionais têm lista vazia. */
  campos: ReadonlyArray<keyof AnamneseFormValues>
}

export const STEPS: readonly StepDefinition[] = [
  {
    id: "dados-pessoais",
    numero: 1,
    titulo: "Dados pessoais",
    descricao: "Identificação básica para personalizar sua ficha.",
    campos: ["nome", "idade", "sexo"],
  },
  {
    id: "queixa",
    numero: 2,
    titulo: "Queixa e objetivo",
    descricao: "O que você busca com este atendimento.",
    campos: ["objetivoConsulta", "objetivoComposicao"],
  },
  {
    id: "historico-clinico",
    numero: 3,
    titulo: "Histórico clínico",
    descricao: "Condições de saúde, medicamentos e alergias.",
    campos: [],
  },
  {
    id: "antropometria",
    numero: 4,
    titulo: "Dados antropométricos",
    descricao: "Medidas corporais que alimentam os cálculos.",
    campos: ["peso", "altura", "biotipo"],
  },
  {
    id: "atividade-fisica",
    numero: 5,
    titulo: "Atividade física",
    descricao: "Sua rotina de exercícios e esforço no trabalho.",
    campos: ["nivelAtividade"],
  },
  {
    id: "estilo-vida",
    numero: 6,
    titulo: "Rotina e estilo de vida",
    descricao: "Sono, estresse, hidratação e hábitos.",
    campos: [],
  },
  {
    id: "historico-alimentar",
    numero: 7,
    titulo: "Histórico alimentar",
    descricao: "Rotina de refeições, preferências e frequência alimentar.",
    campos: [],
  },
  {
    id: "calculo",
    numero: 8,
    titulo: "Fórmula de cálculo",
    descricao: "Escolha como estimar sua taxa metabólica basal.",
    campos: ["formula"],
  },
  {
    id: "observacoes",
    numero: 9,
    titulo: "Observações e revisão",
    descricao: "Anotações finais antes de gerar o resultado.",
    campos: [],
  },
]

export const TOTAL_STEPS = STEPS.length
