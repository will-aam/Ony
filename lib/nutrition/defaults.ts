import { REFEICOES } from "./constants"
import type { AnamneseFormValues } from "./schema"

/**
 * Estado inicial do formulário. Campos numéricos começam como string vazia
 * porque inputs controlados do React não aceitam `undefined` sem alternar
 * para modo não controlado.
 */
export const VALORES_INICIAIS: AnamneseFormValues = {
  // 1. Dados pessoais
  nome: "",
  dataNascimento: "",
  idade: "",
  sexo: undefined as unknown as AnamneseFormValues["sexo"],
  profissao: "",
  cargaHoraria: "",
  contato: "",
  encaminhadoPor: "",

  // 2. Queixa e objetivo
  motivoConsulta: "",
  objetivoConsulta:
    undefined as unknown as AnamneseFormValues["objetivoConsulta"],
  objetivoConsultaDetalhe: "",
  objetivoComposicao:
    undefined as unknown as AnamneseFormValues["objetivoComposicao"],
  objetivosPerformance: [],
  metaPrazo: "",

  // 3. Histórico clínico
  doencasDiagnosticadas: "",
  medicamentosContinuos: "",
  cirurgias: "",
  alergiasIntolerancias: "",
  historicoFamiliar: "",
  temExamesRecentes: undefined,
  sintomasGastrointestinais: "",
  cicloRegular: undefined,
  anticoncepcional: "",
  gestante: undefined,
  lactante: undefined,
  menopausa: undefined,

  // 4. Antropometria
  peso: "",
  pesoHabitual: "",
  altura: "",
  pesoMeta: "",
  circunferenciaCintura: "",
  circunferenciaQuadril: "",
  circunferenciaBraco: "",
  circunferenciaPanturrilha: "",
  gordura: "",
  massaMagra: "",
  biotipo: undefined as unknown as AnamneseFormValues["biotipo"],

  // 5. Atividade física
  praticaAtividade: undefined,
  atividadesQuais: "",
  frequenciaSemanal: "",
  duracaoSessao: "",
  intensidade: undefined,
  tempoPratica: "",
  perfilTrabalho: undefined,
  nivelAtividade:
    undefined as unknown as AnamneseFormValues["nivelAtividade"],

  // 6. Estilo de vida
  horasSono: "",
  qualidadeSono: undefined,
  nivelEstresse: undefined,
  consumoAgua: "",
  consumoAlcool: undefined,
  alcoolQuantidade: "",
  tabagismo: undefined,
  tabagismoQuantidade: "",
  suplementos: "",

  // 7. Histórico alimentar
  preparadorRefeicoes: undefined,
  refeicoesPorDia: "",
  dietasAnteriores: "",
  alimentosPreferidos: "",
  alimentosRecusados: "",
  restricoesEscolha: "",
  comeFora: "",
  beliscaEntreRefeicoes: undefined,
  beliscaOQue: "",
  relacaoComComida: "",
  recordatorio: REFEICOES.map((refeicao) => ({
    refeicao,
    horario: "",
    alimentos: "",
  })),
  frequenciaAlimentar: {},

  // 8. Cálculo
  formula: "recomendada",

  // 9. Observações
  observacoesGerais: "",
  condutaInicial: "",
  dataRetorno: "",
}
