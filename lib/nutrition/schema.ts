import { z } from "zod"
import {
  BIOTIPOS,
  FORMULAS,
  NIVEIS_ATIVIDADE,
  OBJETIVOS_COMPOSICAO,
  OBJETIVOS_PERFORMANCE,
  SEXOS,
  LIMITES,
} from "./constants"

// ─── helpers ──────────────────────────────────────────────────────────────────

function numOpt(min: number, max: number, label: string) {
  return z
    .union([z.literal(""), z.coerce.number()])
    .optional()
    .refine(
      (v) => v === "" || v === undefined || (typeof v === "number" && v >= min && v <= max),
      { message: `Informe um valor entre ${min} e ${max} ${label}.` },
    )
}

function numReq(min: number, max: number, label: string, msg: string) {
  return z
    .union([z.literal(""), z.coerce.number()])
    .refine((v) => v !== "" && v !== undefined, { message: msg })
    .refine(
      (v) => typeof v === "number" && Number.isFinite(v) && v >= min && v <= max,
      { message: `Informe um valor entre ${min} e ${max} ${label}.` },
    )
    .transform((v) => Number(v))
}

const strOpt = z.string().trim().max(2000).optional().or(z.literal(""))
const boolOpt = z.boolean().optional()

// ─── Etapa 1 – Dados pessoais ─────────────────────────────────────────────────
export const dadosPessoaisSchema = z.object({
  nome: z.string().trim().min(2, "Informe o nome.").max(120, "Nome muito longo."),
  dataNascimento: strOpt,
  idade: numReq(LIMITES.idade.min, LIMITES.idade.max, "anos", "Informe a idade."),
  sexo: z.enum(SEXOS, { message: "Selecione o sexo biológico." }),
  profissao: strOpt,
  cargaHoraria: strOpt,
  contato: strOpt,
  encaminhadoPor: strOpt,
})

// ─── Etapa 2 – Queixa ────────────────────────────────────────────────────────
export const queixaSchema = z.object({
  motivoConsulta: strOpt,
  objetivoConsulta: z.string().optional(),
  metaPrazo: strOpt,
})

// ─── Etapa 3 – Histórico clínico ──────────────────────────────────────────────
export const historicoClinicoSchema = z.object({
  doencasDiagnosticadas: strOpt,
  medicamentosContinuos: strOpt,
  cirurgias: strOpt,
  alergiasIntolerancias: strOpt,
  historicoFamiliar: strOpt,
  temExamesRecentes: boolOpt,
  sintomasGastrointestinais: strOpt,
  cicloRegular: boolOpt,
  anticoncepcional: strOpt,
  gestante: boolOpt,
  lactante: boolOpt,
  menopausa: boolOpt,
})

// ─── Etapa 4 – Antropometria ──────────────────────────────────────────────────
export const antropometriaSchema = z.object({
  peso: numReq(LIMITES.peso.min, LIMITES.peso.max, "kg", "Informe o peso atual."),
  pesoHabitual: numOpt(LIMITES.peso.min, LIMITES.peso.max, "kg"),
  altura: numReq(LIMITES.altura.min, LIMITES.altura.max, "cm", "Informe a altura."),
  pesoMeta: numOpt(LIMITES.peso.min, LIMITES.peso.max, "kg"),
  circunferenciaCintura: numOpt(LIMITES.circunferencia.min, LIMITES.circunferencia.max, "cm"),
  circunferenciaQuadril: numOpt(LIMITES.circunferencia.min, LIMITES.circunferencia.max, "cm"),
  circunferenciaBraco: numOpt(LIMITES.circunferencia.min, LIMITES.circunferencia.max, "cm"),
  circunferenciaPanturrilha: numOpt(LIMITES.circunferencia.min, LIMITES.circunferencia.max, "cm"),
  gordura: numOpt(LIMITES.gordura.min, LIMITES.gordura.max, "%"),
  massaMagra: numOpt(LIMITES.peso.min, LIMITES.peso.max, "kg"),
})

// ─── Etapa 5 – Atividade física ───────────────────────────────────────────────
export const atividadeFisicaSchema = z.object({
  nivelAtividade: z.enum(NIVEIS_ATIVIDADE, { message: "Selecione o nível de atividade." }),
  praticaAtividade: boolOpt,
  atividadesQuais: strOpt,
  frequenciaSemanal: numOpt(0, 14, "dias"),
  duracaoSessao: numOpt(0, 600, "min"),
  intensidade: z.string().optional(),
  tempoPratica: strOpt,
  perfilTrabalho: z.string().optional(),
})

// ─── Etapa 6 – Estilo de vida ─────────────────────────────────────────────────
export const estiloSchema = z.object({
  horasSono: numOpt(0, 24, "horas"),
  qualidadeSono: z.string().optional(),
  nivelEstresse: numOpt(1, 10, ""),
  consumoAgua: numOpt(0, 15, "litros"),
  consumeAlcool: boolOpt,
  frequenciaAlcool: strOpt,
  fumante: boolOpt,
  detalheTabagismo: strOpt,
  habitosIntestinais: z.array(z.string()).default([]),
  observacoes: strOpt,
})

// ─── Etapa 7 – Histórico alimentar ───────────────────────────────────────────
export const recordatorio24hItemSchema = z.object({
  refeicao: z.string(),
  horario: strOpt,
  alimentos: z.string(),
})

export const historicoAlimentarSchema = z.object({
  refeicoesDia: z
    .union([z.literal(""), z.coerce.number()])
    .optional()
    .transform((v) => (v === "" || v === undefined ? undefined : Number(v))),
  preferencias: z.array(z.string()).default([]),
  aversoes: z.array(z.string()).default([]),
  alergias: strOpt,
  suplementos: z.array(z.string()).default([]),
  suplementosDetalhes: strOpt,
  recordatorio24h: z.array(recordatorio24hItemSchema).default([]),
  observacoes: strOpt,
})

// ─── Etapa 8 – Frequência alimentar ──────────────────────────────────────────
export const frequenciaAlimentarSchema = z.record(z.string(), z.string()).default({})

// ─── Etapa 9 – Objetivos e configuração ──────────────────────────────────────
export const objetivosSchema = z.object({
  biotipo: z.enum(BIOTIPOS, { message: "Selecione o biotipo." }),
  objetivoComposicao: z.enum(OBJETIVOS_COMPOSICAO, {
    message: "Selecione o objetivo de composição corporal.",
  }),
  objetivosPerformance: z.array(z.enum(OBJETIVOS_PERFORMANCE)).default([]),
  formula: z.enum(FORMULAS).default("recomendada"),
  observacoes: strOpt,
})

// ─── Schema completo ──────────────────────────────────────────────────────────
export const anamneseSchema = z.object({
  dadosPessoais: dadosPessoaisSchema,
  queixa: queixaSchema,
  historicoClinico: historicoClinicoSchema,
  antropometria: antropometriaSchema,
  atividadeFisica: atividadeFisicaSchema,
  estilo: estiloSchema,
  historicoAlimentar: historicoAlimentarSchema,
  frequenciaAlimentar: frequenciaAlimentarSchema,
  objetivos: objetivosSchema,
})

export type AnamneseFormValues = z.input<typeof anamneseSchema>
export type AnamneseData = z.output<typeof anamneseSchema>

// ─── Schema por etapa (para validação parcial) ────────────────────────────────
export const STEP_SCHEMAS = {
  "dados-pessoais": z.object({ dadosPessoais: dadosPessoaisSchema }),
  "queixa": z.object({ queixa: queixaSchema }),
  "historico-clinico": z.object({ historicoClinico: historicoClinicoSchema }),
  "antropometria": z.object({ antropometria: antropometriaSchema }),
  "atividade-fisica": z.object({ atividadeFisica: atividadeFisicaSchema }),
  "estilo-vida": z.object({ estilo: estiloSchema }),
  "historico-alimentar": z.object({ historicoAlimentar: historicoAlimentarSchema }),
  "frequencia-alimentar": z.object({ frequenciaAlimentar: frequenciaAlimentarSchema }),
  "objetivos": z.object({ objetivos: objetivosSchema }),
} as const

export type StepSchemaKey = keyof typeof STEP_SCHEMAS
