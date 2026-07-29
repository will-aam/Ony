import type {
  Biotipo,
  ConsumoAlcool,
  FormulaCalculavel,
  FormulaSelecionavel,
  Frequencia,
  GrupoAlimentar,
  Intensidade,
  NivelAtividade,
  NivelEstresse,
  ObjetivoComposicao,
  ObjetivoConsulta,
  ObjetivoPerformance,
  PerfilTrabalho,
  PreparadorRefeicao,
  Qualidade,
  Refeicao,
  Sexo,
} from "./constants"

export const LABEL_SEXO: Record<Sexo, string> = {
  feminino: "Feminino",
  masculino: "Masculino",
}

export const LABEL_BIOTIPO: Record<Biotipo, string> = {
  ectomorfo: "Ectomorfo",
  mesomorfo: "Mesomorfo",
  endomorfo: "Endomorfo",
}

export const DESCRICAO_BIOTIPO: Record<Biotipo, string> = {
  ectomorfo: "Ossos finos, corpo longilíneo e dificuldade em ganhar peso.",
  mesomorfo: "Estrutura média, ombros largos e facilidade para ganhar músculo.",
  endomorfo: "Ossos largos, tendência a acumular gordura com mais facilidade.",
}

export const LABEL_ATIVIDADE: Record<NivelAtividade, string> = {
  sedentario: "Sedentário",
  leve: "Leve — 1 a 2 dias por semana",
  moderado: "Moderado — 3 a 4 dias por semana",
  intenso: "Intenso — 5 a 7 dias por semana",
  "muito-intenso": "Muito intenso — 7 dias por semana, 2x ao dia",
}

export const LABEL_FORMULA: Record<FormulaSelecionavel, string> = {
  recomendada: "Fórmula recomendada",
  "mifflin-st-jeor": "Mifflin-St Jeor",
  "harris-benedict": "Harris-Benedict",
  "katch-mcardle": "Katch-McArdle",
  oms: "OMS / FAO",
  owen: "Owen",
  henry: "Henry (Oxford)",
}

export const DESCRICAO_FORMULA: Record<FormulaCalculavel, string> = {
  "mifflin-st-jeor":
    "Padrão atual mais confiável para adultos, inclusive com sobrepeso.",
  "harris-benedict":
    "Fórmula clássica de 1919; tende a superestimar em pessoas com obesidade.",
  "katch-mcardle":
    "Baseada na massa livre de gordura; a mais precisa quando há bioimpedância.",
  oms: "Equações da OMS/FAO por faixa de idade, baseadas apenas no peso.",
  owen: "Fórmula simples baseada só no peso; útil como estimativa rápida.",
  henry:
    "Equações de Oxford, derivadas de amostra populacional ampla e diversa.",
}

export const LABEL_OBJETIVO_COMPOSICAO: Record<ObjetivoComposicao, string> = {
  emagrecer: "Perder peso (emagrecer)",
  manter: "Manter o peso",
  hipertrofia: "Ganhar massa muscular",
  aumentar: "Aumentar o peso de forma saudável",
}

export const LABEL_OBJETIVO_PERFORMANCE: Record<ObjetivoPerformance, string> = {
  forca: "Aumentar a força",
  endurance: "Aumentar a resistência",
  velocidade: "Aumentar a velocidade",
  flexibilidade: "Melhorar a flexibilidade",
}

export const LABEL_OBJETIVO_CONSULTA: Record<ObjetivoConsulta, string> = {
  emagrecimento: "Emagrecimento",
  "ganho-massa": "Ganho de massa muscular",
  manutencao: "Manutenção de peso",
  "saude-geral": "Saúde geral / reeducação alimentar",
  performance: "Performance esportiva",
  "controle-doenca": "Controle de doença",
  outro: "Outro",
}

export const LABEL_INTENSIDADE: Record<Intensidade, string> = {
  leve: "Leve",
  moderada: "Moderada",
  intensa: "Intensa",
}

export const LABEL_PERFIL_TRABALHO: Record<PerfilTrabalho, string> = {
  sedentario: "Predominantemente sentado",
  ativo: "Ativo / em pé",
  "esforco-intenso": "Esforço físico intenso",
}

export const LABEL_QUALIDADE: Record<Qualidade, string> = {
  boa: "Boa",
  regular: "Regular",
  ruim: "Ruim",
}

export const LABEL_ESTRESSE: Record<NivelEstresse, string> = {
  baixo: "Baixo",
  moderado: "Moderado",
  alto: "Alto",
}

export const LABEL_ALCOOL: Record<ConsumoAlcool, string> = {
  nao: "Não consumo",
  socialmente: "Socialmente",
  frequente: "Frequente",
}

export const LABEL_PREPARADOR: Record<PreparadorRefeicao, string> = {
  proprio: "Eu mesmo(a)",
  familiar: "Familiar",
  marmita: "Comida pronta / marmita",
  restaurante: "Restaurante",
}

export const LABEL_FREQUENCIA: Record<Frequencia, string> = {
  nunca: "Nunca",
  "1-2x": "1-2x",
  "3-4x": "3-4x",
  "5-6x": "5-6x",
  diario: "Diário",
}

export const LABEL_REFEICAO: Record<Refeicao, string> = {
  "cafe-manha": "Café da manhã",
  "lanche-manha": "Lanche da manhã",
  almoco: "Almoço",
  "lanche-tarde": "Lanche da tarde",
  jantar: "Jantar",
  ceia: "Ceia",
}

export const LABEL_GRUPO_ALIMENTAR: Record<GrupoAlimentar, string> = {
  frutas: "Frutas",
  verduras: "Verduras e legumes",
  "carnes-vermelhas": "Carnes vermelhas",
  "aves-peixes": "Aves e peixes",
  ovos: "Ovos",
  "leite-derivados": "Leite e derivados",
  "graos-integrais": "Grãos e cereais integrais",
  doces: "Doces e açúcar",
  frituras: "Frituras e fast food",
  refrigerantes: "Refrigerante e bebida açucarada",
  alcool: "Álcool",
}
