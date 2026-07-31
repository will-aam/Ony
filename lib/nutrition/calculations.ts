import {
  AJUSTE_CALORICO,
  FATOR_ATIVIDADE,
  KCAL_POR_GRAMA,
  type Biotipo,
  type FormulaCalculavel,
  type NivelAtividade,
  type ObjetivoComposicao,
  type ObjetivoPerformance,
  type Sexo,
} from "./constants"

export interface EntradaCalculo {
  sexo: Sexo
  idade: number
  /** Peso corporal em quilogramas. */
  peso: number
  /** Altura em centímetros. */
  altura: number
  nivelAtividade: NivelAtividade
  biotipo: Biotipo
  objetivoComposicao: ObjetivoComposicao
  objetivosPerformance: ObjetivoPerformance[]
  formula: FormulaCalculavel | "recomendada"
  /** Percentual de gordura corporal, quando disponível. */
  gordura?: number | undefined
  /** Massa magra medida em kg, quando disponível (tem prioridade sobre %GC). */
  massaMagra?: number | undefined
  circunferenciaCintura?: number | undefined
  circunferenciaQuadril?: number | undefined
  pesoMeta?: number | undefined
}

export interface DistribuicaoMacros {
  proteina: { gramas: number; kcal: number; percentual: number }
  carboidrato: { gramas: number; kcal: number; percentual: number }
  gordura: { gramas: number; kcal: number; percentual: number }
  /** Gramas de proteína por kg de peso corporal. */
  proteinaPorKg: number
}

export interface ResultadoCalculo {
  formulaUtilizada: FormulaCalculavel
  formulaFoiAutomatica: boolean
  justificativa: string
  avisos: string[]
  tmb: number
  fatorAtividade: number
  get: number
  caloriasObjetivo: number
  ajustePercentual: number
  macros: DistribuicaoMacros
  imc: number | null
  classificacaoImc: string | null
  massaMagraEstimada: number | null
  relacaoCinturaQuadril: number | null
  aguaRecomendadaLitros: number
}

/* ── Recomendação de fórmula ─────────────────────────────────────────── */

/**
 * Escolhe a fórmula de TMB mais adequada aos dados disponíveis.
 * Katch-McArdle tem prioridade sempre que houver composição corporal,
 * pois parte da massa livre de gordura em vez de estimativas populacionais.
 */
export function recomendarFormula(
  biotipo: Biotipo,
  objetivoComposicao: ObjetivoComposicao,
  objetivosPerformance: ObjetivoPerformance[],
  temComposicaoCorporal: boolean
): { formula: FormulaCalculavel; justificativa: string } {
  const focoPerformance = objetivosPerformance.length > 0

  if (temComposicaoCorporal) {
    if (
      biotipo === "ectomorfo" ||
      objetivoComposicao === "hipertrofia" ||
      focoPerformance
    ) {
      return {
        formula: "katch-mcardle",
        justificativa:
          "Katch-McArdle é a mais indicada porque parte da sua massa livre de gordura — o tecido metabolicamente ativo. Isso a torna especialmente precisa para ectomorfos, hipertrofia e objetivos de performance.",
      }
    }

    if (biotipo === "endomorfo" && objetivoComposicao === "emagrecer") {
      return {
        formula: "katch-mcardle",
        justificativa:
          "Katch-McArdle evita superestimar a taxa metabólica em endomorfos que buscam emagrecimento, já que desconsidera a massa de gordura no cálculo.",
      }
    }

    return {
      formula: "katch-mcardle",
      justificativa:
        "Como você informou sua composição corporal, Katch-McArdle oferece o cálculo mais preciso: ela usa diretamente a massa livre de gordura em vez de estimativas populacionais.",
    }
  }

  if (biotipo === "endomorfo" && objetivoComposicao === "emagrecer") {
    return {
      formula: "mifflin-st-jeor",
      justificativa:
        "Mifflin-St Jeor é a melhor opção sem dados de composição corporal, pois evita a superestimativa que Harris-Benedict apresenta em endomorfos com sobrepeso.",
    }
  }

  if (
    biotipo === "ectomorfo" &&
    (objetivoComposicao === "hipertrofia" || objetivoComposicao === "aumentar")
  ) {
    return {
      formula: "mifflin-st-jeor",
      justificativa:
        "Mifflin-St Jeor atende bem ectomorfos em ganho de peso. Se você medir o percentual de gordura por bioimpedância, Katch-McArdle traria ainda mais precisão.",
    }
  }

  if (focoPerformance) {
    return {
      formula: "mifflin-st-jeor",
      justificativa:
        "Mifflin-St Jeor é confiável para objetivos de performance quando combinada a um fator de atividade bem calibrado. Com massa magra medida, Katch-McArdle seria preferível.",
    }
  }

  return {
    formula: "mifflin-st-jeor",
    justificativa:
      "Mifflin-St Jeor é a escolha padrão da literatura atual: boa precisão para a maioria dos adultos usando apenas peso, altura, idade e sexo.",
  }
}

/* ── TMB por fórmula ─────────────────────────────────────────────────── */

function calcularTmb(
  formula: FormulaCalculavel,
  entrada: Pick<EntradaCalculo, "sexo" | "peso" | "altura" | "idade">,
  massaLivreGordura: number | null
): number {
  const { sexo, peso, altura, idade } = entrada
  const masculino = sexo === "masculino"

  switch (formula) {
    case "harris-benedict":
      return masculino
        ? 88.362 + 13.397 * peso + 4.799 * altura - 5.677 * idade
        : 447.593 + 9.247 * peso + 3.098 * altura - 4.33 * idade

    case "mifflin-st-jeor": {
      const base = 10 * peso + 6.25 * altura - 5 * idade
      return masculino ? base + 5 : base - 161
    }

    case "katch-mcardle": {
      // Requer massa livre de gordura; o chamador garante o fallback.
      const mlg = massaLivreGordura ?? peso
      return 370 + 21.6 * mlg
    }

    case "oms":
      if (masculino) {
        if (idade <= 30) return 15.3 * peso + 679
        if (idade <= 60) return 11.6 * peso + 879
        return 11.9 * peso + 700
      }
      if (idade <= 30) return 14.7 * peso + 496
      if (idade <= 60) return 8.7 * peso + 829
      return 10.5 * peso + 596

    case "owen":
      return masculino ? 879 + 10.2 * peso : 795 + 7.18 * peso

    case "henry":
      if (masculino) {
        if (idade <= 30) return 14.7 * peso + 678
        if (idade <= 60) return 13.0 * peso + 747
        return 13.5 * peso + 514
      }
      if (idade <= 30) return 10.5 * peso + 615
      if (idade <= 60) return 9.7 * peso + 595
      return 9.8 * peso + 520
  }
}

/* ── IMC ─────────────────────────────────────────────────────────────── */

export function calcularImc(pesoKg: number, alturaCm: number): number {
  const alturaMetros = alturaCm / 100
  return pesoKg / (alturaMetros * alturaMetros)
}

export function classificarImc(imc: number): string {
  if (imc < 18.5) return "Abaixo do peso"
  if (imc < 25) return "Peso adequado"
  if (imc < 30) return "Sobrepeso"
  if (imc < 35) return "Obesidade grau I"
  if (imc < 40) return "Obesidade grau II"
  return "Obesidade grau III"
}

/**
 * Faixa de peso ideal pela OMS/IMC (IMC entre 18,5 e 24,9).
 * Retorna [pesoMin, pesoMax] em kg, com 1 casa decimal.
 */
export function calcularPesoIdealImc(
  alturaCm: number
): { min: number; max: number } {
  const alturaM = alturaCm / 100
  const alturaM2 = alturaM * alturaM
  return {
    min: Math.round(18.5 * alturaM2 * 10) / 10,
    max: Math.round(24.9 * alturaM2 * 10) / 10,
  }
}

/**
 * Peso ideal pela fórmula de Lorentz (amplamente usada na nutrição clínica brasileira).
 * Homens: PI = h - 100 - (h - 150) / 4
 * Mulheres: PI = h - 100 - (h - 150) / 2
 * Onde h é a altura em cm.
 */
export function calcularPesoIdealLorentz(
  alturaCm: number,
  sexo: "masculino" | "feminino"
): number {
  const pi =
    sexo === "masculino"
      ? alturaCm - 100 - (alturaCm - 150) / 4
      : alturaCm - 100 - (alturaCm - 150) / 2
  return Math.round(pi * 10) / 10
}


/* ── Macronutrientes ─────────────────────────────────────────────────── */

/**
 * Distribui as calorias-alvo em macronutrientes.
 * A proteína é definida em g/kg de peso corporal (referência mais robusta
 * que percentuais fixos), a gordura recebe um percentual das calorias e o
 * carboidrato preenche o restante.
 */
function calcularMacros(
  caloriasObjetivo: number,
  peso: number,
  objetivoComposicao: ObjetivoComposicao,
  objetivosPerformance: ObjetivoPerformance[]
): DistribuicaoMacros {
  const focoForca =
    objetivosPerformance.includes("forca") ||
    objetivoComposicao === "hipertrofia"
  const focoEndurance =
    objetivosPerformance.includes("endurance") ||
    objetivosPerformance.includes("velocidade")

  let proteinaPorKg: number
  if (objetivoComposicao === "emagrecer") proteinaPorKg = 2.0
  else if (focoForca) proteinaPorKg = 1.9
  else if (objetivoComposicao === "aumentar") proteinaPorKg = 1.7
  else if (focoEndurance) proteinaPorKg = 1.5
  else proteinaPorKg = 1.4

  const percentualGordura = objetivoComposicao === "emagrecer" ? 0.28 : 0.25

  const proteinaGramas = peso * proteinaPorKg
  const proteinaKcal = proteinaGramas * KCAL_POR_GRAMA.proteina

  const gorduraKcal = caloriasObjetivo * percentualGordura
  const gorduraGramas = gorduraKcal / KCAL_POR_GRAMA.gordura

  const carboidratoKcal = Math.max(
    caloriasObjetivo - proteinaKcal - gorduraKcal,
    0
  )
  const carboidratoGramas = carboidratoKcal / KCAL_POR_GRAMA.carboidrato

  const total = proteinaKcal + gorduraKcal + carboidratoKcal || 1

  return {
    proteina: {
      gramas: Math.round(proteinaGramas),
      kcal: Math.round(proteinaKcal),
      percentual: Math.round((proteinaKcal / total) * 100),
    },
    carboidrato: {
      gramas: Math.round(carboidratoGramas),
      kcal: Math.round(carboidratoKcal),
      percentual: Math.round((carboidratoKcal / total) * 100),
    },
    gordura: {
      gramas: Math.round(gorduraGramas),
      kcal: Math.round(gorduraKcal),
      percentual: Math.round((gorduraKcal / total) * 100),
    },
    proteinaPorKg,
  }
}

/* ── Cálculo principal ───────────────────────────────────────────────── */

export function calcularPlanoNutricional(
  entrada: EntradaCalculo
): ResultadoCalculo {
  const avisos: string[] = []

  // Massa livre de gordura: prioriza a medida direta sobre a derivada do %GC.
  let massaLivreGordura: number | null = null
  if (typeof entrada.massaMagra === "number" && entrada.massaMagra > 0) {
    massaLivreGordura = entrada.massaMagra
  } else if (typeof entrada.gordura === "number" && entrada.gordura > 0) {
    massaLivreGordura = entrada.peso * (1 - entrada.gordura / 100)
  }

  const temComposicaoCorporal = massaLivreGordura !== null

  const recomendacao = recomendarFormula(
    entrada.biotipo,
    entrada.objetivoComposicao,
    entrada.objetivosPerformance,
    temComposicaoCorporal
  )

  let formulaUtilizada: FormulaCalculavel
  let justificativa: string
  const formulaFoiAutomatica = entrada.formula === "recomendada"

  if (formulaFoiAutomatica) {
    formulaUtilizada = recomendacao.formula
    justificativa = recomendacao.justificativa
  } else {
    formulaUtilizada = entrada.formula as FormulaCalculavel
    justificativa = recomendacao.justificativa
  }

  // Katch-McArdle é inviável sem composição corporal: fazemos fallback.
  if (formulaUtilizada === "katch-mcardle" && !temComposicaoCorporal) {
    avisos.push(
      "Katch-McArdle exige percentual de gordura ou massa magra. Usamos Mifflin-St Jeor no lugar."
    )
    formulaUtilizada = "mifflin-st-jeor"
    justificativa =
      "Mifflin-St Jeor foi aplicada porque não havia dados de composição corporal para Katch-McArdle."
  }

  const tmb = calcularTmb(formulaUtilizada, entrada, massaLivreGordura)
  const fatorAtividade = FATOR_ATIVIDADE[entrada.nivelAtividade]
  const get = tmb * fatorAtividade

  const ajustePercentual = AJUSTE_CALORICO[entrada.objetivoComposicao]
  const caloriasObjetivo = get * (1 + ajustePercentual)

  // Um piso de segurança evita recomendações excessivamente restritivas.
  const pisoCalorico = entrada.sexo === "masculino" ? 1500 : 1200
  let caloriasFinais = caloriasObjetivo
  if (caloriasFinais < pisoCalorico) {
    avisos.push(
      `O objetivo calórico calculado ficou abaixo do mínimo de segurança (${pisoCalorico} kcal). Ajustamos para esse piso — procure acompanhamento profissional.`
    )
    caloriasFinais = pisoCalorico
  }

  const imc = calcularImc(entrada.peso, entrada.altura)

  const relacaoCinturaQuadril =
    typeof entrada.circunferenciaCintura === "number" &&
    typeof entrada.circunferenciaQuadril === "number" &&
    entrada.circunferenciaQuadril > 0
      ? entrada.circunferenciaCintura / entrada.circunferenciaQuadril
      : null

  return {
    formulaUtilizada,
    formulaFoiAutomatica,
    justificativa,
    avisos,
    tmb: Math.round(tmb),
    fatorAtividade,
    get: Math.round(get),
    caloriasObjetivo: Math.round(caloriasFinais),
    ajustePercentual,
    macros: calcularMacros(
      caloriasFinais,
      entrada.peso,
      entrada.objetivoComposicao,
      entrada.objetivosPerformance
    ),
    imc: Number(imc.toFixed(1)),
    classificacaoImc: classificarImc(imc),
    massaMagraEstimada:
      massaLivreGordura !== null ? Number(massaLivreGordura.toFixed(1)) : null,
    relacaoCinturaQuadril:
      relacaoCinturaQuadril !== null
        ? Number(relacaoCinturaQuadril.toFixed(2))
        : null,
    aguaRecomendadaLitros: Number((entrada.peso * 0.035).toFixed(1)),
  }
}
