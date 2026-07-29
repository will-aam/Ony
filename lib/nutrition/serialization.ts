import {
  BIOTIPOS,
  FORMULAS,
  NIVEIS_ATIVIDADE,
  OBJETIVOS_COMPOSICAO,
  OBJETIVOS_PERFORMANCE,
  SEXOS,
  type Biotipo,
  type FormulaSelecionavel,
  type NivelAtividade,
  type ObjetivoComposicao,
  type ObjetivoPerformance,
  type Sexo,
} from "./constants"
import type { EntradaCalculo } from "./calculations"

/**
 * Apenas os campos necessários para reproduzir o cálculo viajam na URL.
 * Dados sensíveis da anamnese (histórico clínico, recordatório, contato)
 * permanecem em memória e nunca são serializados.
 */
export interface ParametrosCalculo {
  sexo: Sexo
  idade: number
  peso: number
  altura: number
  nivelAtividade: NivelAtividade
  biotipo: Biotipo
  objetivoComposicao: ObjetivoComposicao
  objetivosPerformance: ObjetivoPerformance[]
  formula: FormulaSelecionavel
  gordura?: number | undefined
  massaMagra?: number | undefined
  circunferenciaCintura?: number | undefined
  circunferenciaQuadril?: number | undefined
  pesoMeta?: number | undefined
  nome?: string | undefined
}

export function paraSearchParams(
  parametros: ParametrosCalculo
): URLSearchParams {
  const params = new URLSearchParams()

  params.set("sexo", parametros.sexo)
  params.set("idade", String(parametros.idade))
  params.set("peso", String(parametros.peso))
  params.set("altura", String(parametros.altura))
  params.set("atividade", parametros.nivelAtividade)
  params.set("biotipo", parametros.biotipo)
  params.set("objetivo", parametros.objetivoComposicao)
  params.set("formula", parametros.formula)

  for (const objetivo of parametros.objetivosPerformance) {
    params.append("performance", objetivo)
  }

  const opcionais: Array<[string, number | string | undefined]> = [
    ["gordura", parametros.gordura],
    ["massaMagra", parametros.massaMagra],
    ["cintura", parametros.circunferenciaCintura],
    ["quadril", parametros.circunferenciaQuadril],
    ["pesoMeta", parametros.pesoMeta],
    ["nome", parametros.nome],
  ]

  for (const [chave, valor] of opcionais) {
    if (valor !== undefined && valor !== "" && valor !== null) {
      params.set(chave, String(valor))
    }
  }

  return params
}

/** Converte string em número finito, ou `undefined` se inválida/ausente. */
function lerNumero(valor: string | undefined): number | undefined {
  if (valor === undefined || valor.trim() === "") return undefined
  const numero = Number(valor)
  return Number.isFinite(numero) ? numero : undefined
}

function lerEnum<T extends readonly string[]>(
  valores: T,
  valor: string | undefined
): T[number] | undefined {
  if (valor === undefined) return undefined
  return valores.includes(valor) ? (valor as T[number]) : undefined
}

export interface ResultadoParse {
  entrada: EntradaCalculo | null
  nome: string | undefined
  camposFaltantes: string[]
}

type SearchParamsLike = Record<string, string | string[] | undefined>

function primeiro(valor: string | string[] | undefined): string | undefined {
  if (Array.isArray(valor)) return valor[0]
  return valor
}

function todos(valor: string | string[] | undefined): string[] {
  if (valor === undefined) return []
  return Array.isArray(valor) ? valor : [valor]
}

/**
 * Reconstrói a entrada de cálculo a partir dos search params.
 * Retorna a lista de campos obrigatórios ausentes em vez de lançar erro,
 * permitindo que a página renderize uma mensagem útil.
 */
export function deSearchParams(params: SearchParamsLike): ResultadoParse {
  const sexo = lerEnum(SEXOS, primeiro(params.sexo))
  const idade = lerNumero(primeiro(params.idade))
  const peso = lerNumero(primeiro(params.peso))
  const altura = lerNumero(primeiro(params.altura))
  const nivelAtividade = lerEnum(NIVEIS_ATIVIDADE, primeiro(params.atividade))
  const biotipo = lerEnum(BIOTIPOS, primeiro(params.biotipo))
  const objetivoComposicao =
    lerEnum(OBJETIVOS_COMPOSICAO, primeiro(params.objetivo)) ?? "manter"
  const formula = lerEnum(FORMULAS, primeiro(params.formula)) ?? "recomendada"

  const objetivosPerformance = todos(params.performance).filter(
    (valor): valor is ObjetivoPerformance =>
      (OBJETIVOS_PERFORMANCE as readonly string[]).includes(valor)
  )

  const camposFaltantes: string[] = []
  if (!sexo) camposFaltantes.push("sexo")
  if (idade === undefined) camposFaltantes.push("idade")
  if (peso === undefined) camposFaltantes.push("peso")
  if (altura === undefined) camposFaltantes.push("altura")
  if (!nivelAtividade) camposFaltantes.push("nível de atividade")
  if (!biotipo) camposFaltantes.push("biotipo")

  const nome = primeiro(params.nome)

  if (
    !sexo ||
    idade === undefined ||
    peso === undefined ||
    altura === undefined ||
    !nivelAtividade ||
    !biotipo
  ) {
    return { entrada: null, nome, camposFaltantes }
  }

  return {
    entrada: {
      sexo,
      idade,
      peso,
      altura,
      nivelAtividade,
      biotipo,
      objetivoComposicao,
      objetivosPerformance,
      formula,
      gordura: lerNumero(primeiro(params.gordura)),
      massaMagra: lerNumero(primeiro(params.massaMagra)),
      circunferenciaCintura: lerNumero(primeiro(params.cintura)),
      circunferenciaQuadril: lerNumero(primeiro(params.quadril)),
      pesoMeta: lerNumero(primeiro(params.pesoMeta)),
    },
    nome,
    camposFaltantes,
  }
}
