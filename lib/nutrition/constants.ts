/**
 * Vocabulário controlado e listas de opções do domínio nutricional.
 * As listas `as const` alimentam os enums Zod e os componentes de UI sem
 * duplicação: qualquer alteração aqui reflete automaticamente em toda a app.
 */

// ─── Enums base ───────────────────────────────────────────────────────────────

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

// ─── Limites de validação ─────────────────────────────────────────────────────

export const LIMITES = {
  idade: { min: 10, max: 120 },
  peso: { min: 25, max: 350 },
  altura: { min: 100, max: 250 },
  gordura: { min: 3, max: 70 },
  circunferencia: { min: 20, max: 250 },
} as const

// ─── Tabelas de fatores ───────────────────────────────────────────────────────

export const FATOR_ATIVIDADE: Record<NivelAtividade, number> = {
  sedentario: 1.2,
  leve: 1.375,
  moderado: 1.55,
  intenso: 1.725,
  "muito-intenso": 1.9,
}

export const AJUSTE_CALORICO: Record<ObjetivoComposicao, number> = {
  emagrecer: -0.2,
  manter: 0,
  hipertrofia: 0.1,
  aumentar: 0.15,
}

export const KCAL_POR_GRAMA = { proteina: 4, carboidrato: 4, gordura: 9 } as const

// ─── Opções de UI ─────────────────────────────────────────────────────────────

export interface SelectOption<T extends string = string> {
  value: T
  label: string
  descricao?: string
}

export const SEXO_OPTIONS: SelectOption<Sexo>[] = [
  { value: "feminino", label: "Feminino" },
  { value: "masculino", label: "Masculino" },
]

export const BIOTIPO_OPTIONS: SelectOption<Biotipo>[] = [
  {
    value: "ectomorfo",
    label: "Ectomorfo",
    descricao: "Corpo naturalmente magro, dificuldade para ganhar massa.",
  },
  {
    value: "mesomorfo",
    label: "Mesomorfo",
    descricao: "Boa resposta ao treino, ganha e perde peso com facilidade.",
  },
  {
    value: "endomorfo",
    label: "Endomorfo",
    descricao: "Tendência a acumular gordura, maior dificuldade para emagrecer.",
  },
]

export const NIVEL_ATIVIDADE_OPTIONS: SelectOption<NivelAtividade>[] = [
  { value: "sedentario", label: "Sedentário", descricao: "Sem exercício ou exercício muito leve." },
  { value: "leve", label: "Levemente ativo", descricao: "Exercício leve 1–3 dias/semana." },
  { value: "moderado", label: "Moderadamente ativo", descricao: "Exercício moderado 3–5 dias/semana." },
  { value: "intenso", label: "Muito ativo", descricao: "Exercício intenso 6–7 dias/semana." },
  {
    value: "muito-intenso",
    label: "Extremamente ativo",
    descricao: "Atleta com dupla sessão ou trabalho físico pesado.",
  },
]

export const OBJETIVO_COMPOSICAO_OPTIONS: SelectOption<ObjetivoComposicao>[] = [
  { value: "emagrecer", label: "Emagrecer", descricao: "Redução de gordura corporal (déficit calórico)." },
  { value: "manter", label: "Manter", descricao: "Manutenção do peso e composição atuais." },
  {
    value: "hipertrofia",
    label: "Hipertrofia",
    descricao: "Ganho de massa muscular com superávit moderado.",
  },
  { value: "aumentar", label: "Aumentar (Bulking)", descricao: "Ganho de peso com superávit agressivo." },
]

export const OBJETIVO_PERFORMANCE_OPTIONS: SelectOption<ObjetivoPerformance>[] = [
  { value: "forca", label: "Força" },
  { value: "endurance", label: "Endurance / resistência" },
  { value: "velocidade", label: "Velocidade / potência" },
  { value: "flexibilidade", label: "Flexibilidade / mobilidade" },
]

export const FORMULA_OPTIONS: SelectOption<FormulaSelecionavel>[] = [
  { value: "recomendada", label: "Recomendada (automática)", descricao: "Seleciona a fórmula mais adequada ao perfil." },
  { value: "mifflin-st-jeor", label: "Mifflin-St Jeor", descricao: "Considerada a mais precisa para a maioria das pessoas." },
  { value: "harris-benedict", label: "Harris-Benedict (revisada)", descricao: "Clássica, amplamente usada na prática clínica." },
  { value: "katch-mcardle", label: "Katch-McArdle", descricao: "Mais precisa quando a % de gordura é conhecida." },
  { value: "oms", label: "OMS", descricao: "Fórmula da Organização Mundial da Saúde." },
  { value: "owen", label: "Owen", descricao: "Alternativa simplificada para adultos." },
  { value: "henry", label: "Henry (Schofield revisada)", descricao: "Recomendada para populações tropicais." },
]

export const QUALIDADE_SONO_OPTIONS: SelectOption[] = [
  { value: "boa", label: "Boa" },
  { value: "regular", label: "Regular" },
  { value: "ruim", label: "Ruim" },
]

export const HABITOS_INTESTINAIS_OPTIONS: SelectOption[] = [
  { value: "bristol-1", label: "Tipo 1 (Caroços duros separados)" },
  { value: "bristol-2", label: "Tipo 2 (Em forma de salsicha, grumoso)" },
  { value: "bristol-3", label: "Tipo 3 (Em formato de salsicha, com rachaduras)" },
  { value: "bristol-4", label: "Tipo 4 (Como salsicha ou cobra, liso e macio)" },
  { value: "bristol-5", label: "Tipo 5 (Pedaços macios com bordas nítidas)" },
  { value: "bristol-6", label: "Tipo 6 (Pedaços fofos com bordas irregulares)" },
  { value: "bristol-7", label: "Tipo 7 (Aquoso, sem pedaços sólidos)" },
]

export const REFEICOES_DIA_OPTIONS: SelectOption[] = [
  { value: "2", label: "2 refeições" },
  { value: "3", label: "3 refeições" },
  { value: "4", label: "4 refeições" },
  { value: "5", label: "5 refeições" },
  { value: "6", label: "6 refeições" },
  { value: "7", label: "7 ou mais" },
]

export const PREFERENCIAS_OPTIONS: SelectOption[] = [
  { value: "frutas", label: "Frutas" },
  { value: "verduras", label: "Verduras e legumes" },
  { value: "carnes", label: "Carnes em geral" },
  { value: "peixe", label: "Peixes e frutos do mar" },
  { value: "ovos", label: "Ovos" },
  { value: "laticinios", label: "Laticínios" },
  { value: "graos", label: "Grãos e cereais" },
  { value: "leguminosas", label: "Leguminosas (feijão, lentilha)" },
  { value: "doces", label: "Doces" },
  { value: "massas", label: "Massas e pães" },
]

export const AVERSOES_OPTIONS: SelectOption[] = [
  { value: "gluten", label: "Glúten" },
  { value: "lactose", label: "Lactose" },
  { value: "frutos-do-mar", label: "Frutos do mar" },
  { value: "amendoim", label: "Amendoim" },
  { value: "ovos", label: "Ovos" },
  { value: "soja", label: "Soja" },
  { value: "carnes", label: "Carnes (vegetariano)" },
  { value: "animal", label: "Qualquer alimento animal (vegano)" },
]

export const SUPLEMENTOS_OPTIONS: SelectOption[] = [
  { value: "whey", label: "Whey Protein" },
  { value: "creatina", label: "Creatina" },
  { value: "cafeina", label: "Cafeína / Pré-treino" },
  { value: "omega3", label: "Ômega 3" },
  { value: "vitamina-d", label: "Vitamina D" },
  { value: "multivitaminico", label: "Multivitamínico" },
  { value: "magnesio", label: "Magnésio" },
  { value: "bcaa", label: "BCAA" },
  { value: "colageno", label: "Colágeno" },
  { value: "outros", label: "Outros" },
]

export const FREQUENCIA_OPTIONS: SelectOption[] = [
  { value: "nunca", label: "Nunca" },
  { value: "1-2x-semana", label: "1–2x/semana" },
  { value: "3-4x-semana", label: "3–4x/semana" },
  { value: "5-6x-semana", label: "5–6x/semana" },
  { value: "diario", label: "Diariamente" },
  { value: "2x-dia", label: "2x ao dia ou mais" },
]

export const FREQUENCIA_ALIMENTAR_ITEMS: Array<{ key: string; label: string }> = [
  { key: "carneVermelha", label: "Carne vermelha" },
  { key: "frango", label: "Frango / aves" },
  { key: "peixe", label: "Peixe / frutos do mar" },
  { key: "ovos", label: "Ovos" },
  { key: "leite", label: "Leite / iogurte" },
  { key: "queijo", label: "Queijo" },
  { key: "frutas", label: "Frutas" },
  { key: "verdurasCruas", label: "Verduras cruas" },
  { key: "verdurasCozihas", label: "Verduras cozidas" },
  { key: "feijao", label: "Feijão / lentilha / grão-de-bico" },
  { key: "arroz", label: "Arroz / macarrão / pão" },
  { key: "integralCereais", label: "Integrais / cereais" },
  { key: "frituras", label: "Frituras" },
  { key: "fastFood", label: "Fast food" },
  { key: "doces", label: "Doces / sobremesas" },
  { key: "refrigerante", label: "Refrigerante / suco industrializado" },
  { key: "alcool", label: "Bebidas alcoólicas" },
  { key: "oleaginosas", label: "Oleaginosas (castanhas, nozes)" },
]

export const PERFIL_TRABALHO_OPTIONS: SelectOption[] = [
  { value: "sedentario", label: "Sedentário (escritório, home office)" },
  { value: "ativo", label: "Em pé / caminhando bastante" },
  { value: "esforco-intenso", label: "Esforço físico intenso" },
]

export const INTENSIDADE_OPTIONS: SelectOption[] = [
  { value: "leve", label: "Leve (conversa fácil)" },
  { value: "moderada", label: "Moderada (alguma dificuldade para falar)" },
  { value: "intensa", label: "Intensa (difícil falar durante o exercício)" },
]

export const OBJETIVO_CONSULTA_OPTIONS: SelectOption[] = [
  { value: "emagrecimento", label: "Emagrecimento" },
  { value: "ganho-massa", label: "Ganho de massa muscular" },
  { value: "manutencao", label: "Manutenção do peso" },
  { value: "saude-geral", label: "Saúde geral e qualidade de vida" },
  { value: "performance", label: "Melhora de performance esportiva" },
  { value: "controle-doenca", label: "Controle de doença (diabetes, hipertensão, etc.)" },
  { value: "outro", label: "Outro" },
]
