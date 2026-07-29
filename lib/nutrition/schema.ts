import { z } from "zod"
import {
  BIOTIPOS,
  CONSUMOS_ALCOOL,
  FORMULAS,
  FREQUENCIAS,
  GRUPOS_ALIMENTARES,
  INTENSIDADES,
  LIMITES,
  NIVEIS_ATIVIDADE,
  NIVEIS_ESTRESSE,
  OBJETIVOS_COMPOSICAO,
  OBJETIVOS_CONSULTA,
  OBJETIVOS_PERFORMANCE,
  PERFIS_TRABALHO,
  PREPARADORES_REFEICAO,
  QUALIDADES,
  REFEICOES,
  SEXOS,
} from "./constants"

/**
 * Campo numérico opcional que aceita string vazia proveniente do input.
 * Inputs HTML sempre entregam string, então normalizamos antes de validar.
 */
function numeroOpcional(min: number, max: number, unidade: string) {
  return z
    .union([z.literal(""), z.coerce.number()])
    .optional()
    .refine(
      (valor) =>
        valor === "" ||
        valor === undefined ||
        (typeof valor === "number" &&
          Number.isFinite(valor) &&
          valor >= min &&
          valor <= max),
      { message: `Informe um valor entre ${min} e ${max} ${unidade}.` }
    )
}

function numeroObrigatorio(
  min: number,
  max: number,
  unidade: string,
  mensagemVazio: string
) {
  return z
    .union([z.literal(""), z.coerce.number()])
    .refine((valor) => valor !== "" && valor !== undefined, {
      message: mensagemVazio,
    })
    .refine(
      (valor) =>
        typeof valor === "number" &&
        Number.isFinite(valor) &&
        valor >= min &&
        valor <= max,
      { message: `Informe um valor entre ${min} e ${max} ${unidade}.` }
    )
    .transform((valor) => Number(valor))
}

const textoOpcional = z.string().trim().max(1000).optional().or(z.literal(""))
const simNaoOpcional = z.boolean().optional()

/* ── Etapa 1: Dados pessoais ─────────────────────────────────────────── */

export const dadosPessoaisSchema = z.object({
  nome: z
    .string()
    .trim()
    .min(2, "Informe o nome completo.")
    .max(120, "Nome muito longo."),
  dataNascimento: z.string().trim().optional().or(z.literal("")),
  idade: numeroObrigatorio(
    LIMITES.idade.min,
    LIMITES.idade.max,
    "anos",
    "Informe a idade."
  ),
  sexo: z.enum(SEXOS, { message: "Selecione o sexo biológico." }),
  profissao: textoOpcional,
  cargaHoraria: textoOpcional,
  contato: textoOpcional,
  encaminhadoPor: textoOpcional,
})

/* ── Etapa 2: Queixa principal e objetivo ────────────────────────────── */

export const queixaSchema = z.object({
  motivoConsulta: textoOpcional,
  objetivoConsulta: z.enum(OBJETIVOS_CONSULTA, {
    message: "Selecione o objetivo do atendimento.",
  }),
  objetivoConsultaDetalhe: textoOpcional,
  objetivoComposicao: z.enum(OBJETIVOS_COMPOSICAO, {
    message: "Selecione o objetivo de composição corporal.",
  }),
  objetivosPerformance: z.array(z.enum(OBJETIVOS_PERFORMANCE)).default([]),
  metaPrazo: textoOpcional,
})

/* ── Etapa 3: Histórico clínico ──────────────────────────────────────── */

export const historicoClinicoSchema = z.object({
  doencasDiagnosticadas: textoOpcional,
  medicamentosContinuos: textoOpcional,
  cirurgias: textoOpcional,
  alergiasIntolerancias: textoOpcional,
  historicoFamiliar: textoOpcional,
  temExamesRecentes: simNaoOpcional,
  sintomasGastrointestinais: textoOpcional,
  // Campos específicos para mulheres
  cicloRegular: simNaoOpcional,
  anticoncepcional: textoOpcional,
  gestante: simNaoOpcional,
  lactante: simNaoOpcional,
  menopausa: simNaoOpcional,
})

/* ── Etapa 4: Dados antropométricos ──────────────────────────────────── */

export const antropometriaSchema = z.object({
  peso: numeroObrigatorio(
    LIMITES.peso.min,
    LIMITES.peso.max,
    "kg",
    "Informe o peso atual."
  ),
  pesoHabitual: numeroOpcional(LIMITES.peso.min, LIMITES.peso.max, "kg"),
  altura: numeroObrigatorio(
    LIMITES.altura.min,
    LIMITES.altura.max,
    "cm",
    "Informe a altura em centímetros."
  ),
  pesoMeta: numeroOpcional(LIMITES.peso.min, LIMITES.peso.max, "kg"),
  circunferenciaCintura: numeroOpcional(
    LIMITES.circunferencia.min,
    LIMITES.circunferencia.max,
    "cm"
  ),
  circunferenciaQuadril: numeroOpcional(
    LIMITES.circunferencia.min,
    LIMITES.circunferencia.max,
    "cm"
  ),
  circunferenciaBraco: numeroOpcional(
    LIMITES.circunferencia.min,
    LIMITES.circunferencia.max,
    "cm"
  ),
  circunferenciaPanturrilha: numeroOpcional(
    LIMITES.circunferencia.min,
    LIMITES.circunferencia.max,
    "cm"
  ),
  gordura: numeroOpcional(LIMITES.gordura.min, LIMITES.gordura.max, "%"),
  massaMagra: numeroOpcional(LIMITES.peso.min, LIMITES.peso.max, "kg"),
  biotipo: z.enum(BIOTIPOS, { message: "Selecione o biotipo corporal." }),
})

/* ── Etapa 5: Nível de atividade física ──────────────────────────────── */

export const atividadeFisicaSchema = z.object({
  praticaAtividade: simNaoOpcional,
  atividadesQuais: textoOpcional,
  frequenciaSemanal: numeroOpcional(0, 14, "dias"),
  duracaoSessao: numeroOpcional(0, 600, "minutos"),
  intensidade: z.enum(INTENSIDADES).optional(),
  tempoPratica: textoOpcional,
  perfilTrabalho: z.enum(PERFIS_TRABALHO).optional(),
  nivelAtividade: z.enum(NIVEIS_ATIVIDADE, {
    message: "Selecione o nível de atividade física.",
  }),
})

/* ── Etapa 6: Rotina e estilo de vida ────────────────────────────────── */

export const estiloVidaSchema = z.object({
  horasSono: numeroOpcional(0, 24, "horas"),
  qualidadeSono: z.enum(QUALIDADES).optional(),
  nivelEstresse: z.enum(NIVEIS_ESTRESSE).optional(),
  consumoAgua: numeroOpcional(0, 15, "litros"),
  consumoAlcool: z.enum(CONSUMOS_ALCOOL).optional(),
  alcoolQuantidade: textoOpcional,
  tabagismo: simNaoOpcional,
  tabagismoQuantidade: textoOpcional,
  suplementos: textoOpcional,
})

/* ── Etapa 7: Histórico alimentar ────────────────────────────────────── */

export const recordatorioItemSchema = z.object({
  refeicao: z.enum(REFEICOES),
  horario: textoOpcional,
  alimentos: textoOpcional,
})

export const historicoAlimentarSchema = z.object({
  preparadorRefeicoes: z.enum(PREPARADORES_REFEICAO).optional(),
  refeicoesPorDia: numeroOpcional(1, 12, "refeições"),
  dietasAnteriores: textoOpcional,
  alimentosPreferidos: textoOpcional,
  alimentosRecusados: textoOpcional,
  restricoesEscolha: textoOpcional,
  comeFora: textoOpcional,
  beliscaEntreRefeicoes: simNaoOpcional,
  beliscaOQue: textoOpcional,
  relacaoComComida: textoOpcional,
  recordatorio: z.array(recordatorioItemSchema).default([]),
  frequenciaAlimentar: z
    .record(z.enum(GRUPOS_ALIMENTARES), z.enum(FREQUENCIAS).optional())
    .default({}),
})

/* ── Etapa 8: Preferência de cálculo ─────────────────────────────────── */

export const calculoSchema = z.object({
  formula: z.enum(FORMULAS).default("recomendada"),
})

/* ── Etapa 9: Observações ────────────────────────────────────────────── */

export const observacoesSchema = z.object({
  observacoesGerais: textoOpcional,
  condutaInicial: textoOpcional,
  dataRetorno: z.string().trim().optional().or(z.literal("")),
})

/* ── Schema completo ─────────────────────────────────────────────────── */

export const anamneseSchema = dadosPessoaisSchema
  .extend(queixaSchema.shape)
  .extend(historicoClinicoSchema.shape)
  .extend(antropometriaSchema.shape)
  .extend(atividadeFisicaSchema.shape)
  .extend(estiloVidaSchema.shape)
  .extend(historicoAlimentarSchema.shape)
  .extend(calculoSchema.shape)
  .extend(observacoesSchema.shape)

export type AnamneseFormValues = z.input<typeof anamneseSchema>
export type AnamneseData = z.output<typeof anamneseSchema>
