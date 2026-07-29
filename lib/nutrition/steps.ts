export const STEP_IDS = [
  "dados-pessoais",
  "queixa",
  "historico-clinico",
  "antropometria",
  "atividade-fisica",
  "estilo-vida",
  "historico-alimentar",
  "frequencia-alimentar",
  "objetivos",
] as const

export type StepId = (typeof STEP_IDS)[number]

export interface StepDefinition {
  id: StepId
  numero: number
  titulo: string
  descricao: string
}

export const STEPS: readonly StepDefinition[] = [
  {
    id: "dados-pessoais",
    numero: 1,
    titulo: "Dados pessoais",
    descricao: "Identificação básica para personalizar sua ficha.",
  },
  {
    id: "queixa",
    numero: 2,
    titulo: "Queixa e objetivo",
    descricao: "O que você busca com este atendimento.",
  },
  {
    id: "historico-clinico",
    numero: 3,
    titulo: "Histórico clínico",
    descricao: "Condições de saúde, medicamentos e alergias.",
  },
  {
    id: "antropometria",
    numero: 4,
    titulo: "Dados antropométricos",
    descricao: "Medidas corporais que alimentam os cálculos.",
  },
  {
    id: "atividade-fisica",
    numero: 5,
    titulo: "Atividade física",
    descricao: "Sua rotina de exercícios e esforço no trabalho.",
  },
  {
    id: "estilo-vida",
    numero: 6,
    titulo: "Estilo de vida",
    descricao: "Sono, estresse, hidratação e hábitos.",
  },
  {
    id: "historico-alimentar",
    numero: 7,
    titulo: "Histórico alimentar",
    descricao: "Rotina de refeições, preferências e recordatório 24h.",
  },
  {
    id: "frequencia-alimentar",
    numero: 8,
    titulo: "Frequência alimentar",
    descricao: "Com que frequência você consome cada grupo alimentar.",
  },
  {
    id: "objetivos",
    numero: 9,
    titulo: "Objetivos e configuração",
    descricao: "Biotipo, objetivo final e fórmula de cálculo.",
  },
]

export const TOTAL_STEPS = STEPS.length
