/**
 * Constantes e vocabulário controlado do domínio nutricional.
 * Todas as listas são `as const` para derivar tipos literais e alimentar
 * os enums do Zod sem duplicação.
 */

export const SEXOS = ["feminino", "masculino"] as const
export type Sexo = (typeof SEXOS)[number]

export const BIOTIPOS = ["ectomorfo", "mesomorfo", "endomorfo"] as const
export type Biotipo = (typeof BIOTIPOS)[number]

export const NIVEIS_ATIVIDADE = [
  "sedentario",
  "leve",
  "moderado",
  "intenso",
  "muito-intenso",
] as const
export type NivelAtividade = (typeof NIVEIS_ATIVIDADE)[number]

export const FORMULAS = [
  "recomendada",
  "mifflin-st-jeor",
  "harris-benedict",
  "katch-mcardle",
  "oms",
  "owen",
  "henry",
] as const
export type FormulaSelecionavel = (typeof FORMULAS)[number]

/** Fórmulas efetivamente calculáveis (exclui o valor sentinela "recomendada"). */
export type FormulaCalculavel = Exclude<FormulaSelecionavel, "recomendada">

export const OBJETIVOS_COMPOSICAO = [
  "emagrecer",
  "manter",
  "hipertrofia",
  "aumentar",
] as const
export type ObjetivoComposicao = (typeof OBJETIVOS_COMPOSICAO)[number]

export const OBJETIVOS_PERFORMANCE = [
  "forca",
  "endurance",
  "velocidade",
  "flexibilidade",
] as const
export type ObjetivoPerformance = (typeof OBJETIVOS_PERFORMANCE)[number]

export const OBJETIVOS_CONSULTA = [
  "emagrecimento",
  "ganho-massa",
  "manutencao",
  "saude-geral",
  "performance",
  "controle-doenca",
  "outro",
] as const
export type ObjetivoConsulta = (typeof OBJETIVOS_CONSULTA)[number]

export const INTENSIDADES = ["leve", "moderada", "intensa"] as const
export type Intensidade = (typeof INTENSIDADES)[number]

export const PERFIS_TRABALHO = [
  "sedentario",
  "ativo",
  "esforco-intenso",
] as const
export type PerfilTrabalho = (typeof PERFIS_TRABALHO)[number]

export const QUALIDADES = ["boa", "regular", "ruim"] as const
export type Qualidade = (typeof QUALIDADES)[number]

export const NIVEIS_ESTRESSE = ["baixo", "moderado", "alto"] as const
export type NivelEstresse = (typeof NIVEIS_ESTRESSE)[number]

export const CONSUMOS_ALCOOL = ["nao", "socialmente", "frequente"] as const
export type ConsumoAlcool = (typeof CONSUMOS_ALCOOL)[number]

export const PREPARADORES_REFEICAO = [
  "proprio",
  "familiar",
  "marmita",
  "restaurante",
] as const
export type PreparadorRefeicao = (typeof PREPARADORES_REFEICAO)[number]

export const FREQUENCIAS = [
  "nunca",
  "1-2x",
  "3-4x",
  "5-6x",
  "diario",
] as const
export type Frequencia = (typeof FREQUENCIAS)[number]

export const REFEICOES = [
  "cafe-manha",
  "lanche-manha",
  "almoco",
  "lanche-tarde",
  "jantar",
  "ceia",
] as const
export type Refeicao = (typeof REFEICOES)[number]

export const GRUPOS_ALIMENTARES = [
  "frutas",
  "verduras",
  "carnes-vermelhas",
  "aves-peixes",
  "ovos",
  "leite-derivados",
  "graos-integrais",
  "doces",
  "frituras",
  "refrigerantes",
  "alcool",
] as const
export type GrupoAlimentar = (typeof GRUPOS_ALIMENTARES)[number]

/** Fatores multiplicadores da TMB para obter o GET (TDEE). */
export const FATOR_ATIVIDADE: Record<NivelAtividade, number> = {
  sedentario: 1.2,
  leve: 1.375,
  moderado: 1.55,
  intenso: 1.725,
  "muito-intenso": 1.9,
}

/** Ajuste calórico aplicado ao GET conforme o objetivo de composição. */
export const AJUSTE_CALORICO: Record<ObjetivoComposicao, number> = {
  emagrecer: -0.2,
  manter: 0,
  hipertrofia: 0.1,
  aumentar: 0.15,
}

/** Energia por gramo de cada macronutriente (kcal/g). */
export const KCAL_POR_GRAMA = {
  proteina: 4,
  carboidrato: 4,
  gordura: 9,
} as const

export const LIMITES = {
  idade: { min: 10, max: 120 },
  peso: { min: 25, max: 350 },
  altura: { min: 100, max: 250 },
  gordura: { min: 3, max: 70 },
  circunferencia: { min: 20, max: 250 },
} as const
