import type { AnamneseFormValues } from "./schema"
import {
  LABEL_SEXO,
  LABEL_BIOTIPO,
  LABEL_ATIVIDADE,
  LABEL_FORMULA,
  LABEL_OBJETIVO_COMPOSICAO,
  LABEL_OBJETIVO_PERFORMANCE,
  LABEL_OBJETIVO_CONSULTA,
  LABEL_INTENSIDADE,
  LABEL_PERFIL_TRABALHO,
  LABEL_QUALIDADE,
} from "./labels"
import {
  calcularImc,
  classificarImc,
  calcularPesoIdealImc,
  calcularPesoIdealLorentz,
  calcularPlanoNutricional,
} from "./calculations"
import { FREQUENCIA_ALIMENTAR_ITEMS, HABITOS_INTESTINAIS_OPTIONS } from "./constants"

// ─── Helpers de formatação ────────────────────────────────────────────────────

function val(v: unknown, sufixo = ""): string {
  if (v === undefined || v === null || v === "") return "Não informado"
  if (typeof v === "boolean") return v ? "Sim" : "Não"
  return `${v}${sufixo}`
}

function lista(arr: string[], map?: Record<string, string>): string {
  if (!arr || arr.length === 0) return "Não informado"
  if (map) {
    return arr.map(item => map[item] || item).join(", ")
  }
  return arr.join(", ")
}

// ─── Construção de seções HTML ────────────────────────────────────────────────

function campo(label: string, valor: string): string {
  return `
    <div class="campo">
      <span class="campo-label">${label}</span>
      <span class="campo-valor">${valor}</span>
    </div>`
}

function secao(titulo: string, conteudo: string): string {
  const conteudoFiltrado = conteudo.trim()
  if (!conteudoFiltrado) return ""
  return `
  <section class="secao">
    <h2 class="secao-titulo">${titulo}</h2>
    <div class="campos-grid">${conteudo}</div>
  </section>`
}

// ─── Gerador do HTML ──────────────────────────────────────────────────────────

function gerarHtml(dados: AnamneseFormValues): string {
  const dp = dados.dadosPessoais
  const q = dados.queixa
  const hc = dados.historicoClinico
  const an = dados.antropometria
  const at = dados.atividadeFisica
  const es = dados.estilo
  const ha = dados.historicoAlimentar
  const fa = dados.frequenciaAlimentar ?? {}
  const ob = dados.objetivos

  const dataGeracao = new Date().toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })

  const habitosMap = Object.fromEntries(HABITOS_INTESTINAIS_OPTIONS.map((o) => [o.value, o.label]))

  // Cálculos de IMC, peso ideal, e calorias (quando disponíveis)
  const pesoN = Number(an.peso)
  const alturaN = Number(an.altura)
  const sexoValido = dp.sexo === "masculino" || dp.sexo === "feminino"

  let blocoCalculos = ""
  let alertas = []
  
  if (pesoN > 0 && alturaN > 0 && sexoValido) {
    const imc = calcularImc(pesoN, alturaN)
    const classificacao = classificarImc(imc)
    const faixaImc = calcularPesoIdealImc(alturaN)
    const lorentz = calcularPesoIdealLorentz(alturaN, dp.sexo)
    
    // Tentar rodar o cálculo calórico completo se tiver nível de atividade
    let dadosCaloricos = ""
    let aguaRec = 0
    
    if (at.nivelAtividade && ob.biotipo && ob.objetivoComposicao) {
      try {
        const resultado = calcularPlanoNutricional({
          sexo: dp.sexo,
          idade: Number(dp.idade),
          peso: pesoN,
          altura: alturaN,
          nivelAtividade: at.nivelAtividade,
          biotipo: ob.biotipo,
          objetivoComposicao: ob.objetivoComposicao,
          objetivosPerformance: ob.objetivosPerformance || [],
          formula: ob.formula || "recomendada",
          gordura: an.gordura ? Number(an.gordura) : undefined,
          massaMagra: an.massaMagra ? Number(an.massaMagra) : undefined,
        })
        
        aguaRec = resultado.aguaRecomendadaLitros
        
        const pctStr = (resultado.ajustePercentual * 100).toFixed(0)
        const ajusteStr = resultado.ajustePercentual > 0 ? `+${pctStr}%` : resultado.ajustePercentual < 0 ? `${pctStr}%` : "0%"
        
        const formulaNome = LABEL_FORMULA[resultado.formulaUtilizada as keyof typeof LABEL_FORMULA] || resultado.formulaUtilizada

        dadosCaloricos = `
        <div class="campos-grid" style="margin-top: 12px; padding-top: 12px; border-top: 1px dashed #d1fae5;">
          ${resultado.massaMagraEstimada ? campo("Massa magra est.", `${resultado.massaMagraEstimada} kg`) : ""}
          ${resultado.aguaRecomendadaLitros ? campo("Água recomendada", `${resultado.aguaRecomendadaLitros} L/dia`) : ""}
          ${resultado.relacaoCinturaQuadril ? campo("Relação cintura-quadril", `${resultado.relacaoCinturaQuadril}`) : ""}
        </div>
        
        <p class="bloco-titulo" style="margin-top: 16px;">Gasto Energético & Meta</p>
        <div class="campos-grid" style="margin-top: 8px;">
          ${campo("TMB (Basal)", `${resultado.tmb} kcal`)}
          ${campo("Gasto Energético (GET)", `${resultado.get} kcal`)}
          ${campo(`Meta Calórica (${ajusteStr})`, `<strong>${resultado.caloriasObjetivo} kcal</strong>`)}
        </div>

        <p class="bloco-titulo" style="margin-top: 16px;">Distribuição de Macronutrientes</p>
        <div class="campos-grid" style="margin-top: 8px;">
          ${campo("Proteína", `${resultado.macros.proteina.gramas}g (${resultado.macros.proteinaPorKg}g/kg) — ${resultado.macros.proteina.percentual}%`)}
          ${campo("Carboidrato", `${resultado.macros.carboidrato.gramas}g — ${resultado.macros.carboidrato.percentual}%`)}
          ${campo("Gordura", `${resultado.macros.gordura.gramas}g — ${resultado.macros.gordura.percentual}%`)}
        </div>

        <div style="margin-top: 12px; padding: 12px; background: #f8fafc; border-radius: 4px; border: 1px dashed #cbd5e1; font-size: 9pt;">
          <strong style="color: #334155;">Base de cálculo:</strong> ${formulaNome}${resultado.formulaFoiAutomatica ? " (Automática)" : ""}<br/>
          <span style="color: #64748b;">${resultado.justificativa}</span><br/>
          <strong style="color: #475569; display: inline-block; margin-top: 6px;">📌 Nota clínica:</strong> <span style="color: #64748b;">Revisar a cada 2-4 semanas com nova pesagem (o metabolismo basal evolui com a composição corporal).</span>
        </div>
        `

        if (resultado.avisos && resultado.avisos.length > 0) {
          resultado.avisos.forEach(a => alertas.push(`<strong>Aviso do Cálculo:</strong> ${a}`))
        }

      } catch (e) {
        console.error("Erro ao gerar cálculos no PDF", e)
      }
    }

    blocoCalculos = `
    <div class="bloco-calculo">
      <p class="bloco-titulo" style="font-size: 11pt;">Plano Nutricional Estimado & Indicadores</p>
      <div class="campos-grid">
        ${campo("IMC atual", `${imc.toFixed(1)} — ${classificacao}`)}
        ${campo("Faixa de peso ideal (OMS)", `${faixaImc.min.toFixed(1)} – ${faixaImc.max.toFixed(1)} kg`)}
        ${campo(`Peso ideal Lorentz`, `${lorentz.toFixed(1)} kg`)}
      </div>
      ${dadosCaloricos}
    </div>`

    // Gerar Alertas Inteligentes
    if (imc < 18.5 && (ob.objetivoComposicao === "hipertrofia" || ob.objetivoComposicao === "aumentar")) {
      alertas.push(`<strong>Abaixo do peso com foco em ganho de massa:</strong> O superávit calórico é prioridade absoluta. Monitore para garantir que a ingestão não seja limitante.`)
    }
    
    // Alerta de Peso Meta vs Referências
    if (an.pesoMeta) {
      const pMeta = Number(an.pesoMeta)
      if (pMeta > faixaImc.max && pMeta > lorentz) {
        alertas.push(`<strong>Expectativa de peso:</strong> O peso desejado (${pMeta}kg) está ACIMA da faixa saudável da OMS (até ${faixaImc.max.toFixed(1)}kg) e do ideal por Lorentz (${lorentz.toFixed(1)}kg). Vale alinhar expectativa de composição corporal e realidade metabólica.`)
      } else if (pMeta > lorentz) {
        alertas.push(`<strong>Referência de peso:</strong> O peso meta (${pMeta}kg) está acima do peso ideal por Lorentz (${lorentz.toFixed(1)}kg), mas dentro da faixa OMS. Conversar sobre qual referência faz mais sentido para o biotipo (${ob.biotipo || "do paciente"}).`)
      }

      // Alerta de Prazo vs Fisiologia
      // q.prazoMeses -> meses.
      if (q.prazoMeses && Number(q.prazoMeses) > 0) {
        const prazoMeses = Number(q.prazoMeses)
        const delta = pMeta - pesoN
        const semanas = prazoMeses * 4.33
        const taxaSemanal = delta / semanas
        
        if (delta > 0 && taxaSemanal > 0.5) {
          alertas.push(`<strong>Prazo vs. fisiologia:</strong> A meta implica ganho de ~${taxaSemanal.toFixed(1)}kg/semana, muito acima do ritmo natural de ganho de massa magra (0,25–0,5kg/semana). Nesse ritmo, a maior parte do ganho tende a ser gordura. Vale alinhar expectativa de prazo e composição.`)
        }
      }
    }

    // Regex para checar inconsistência de prazo no texto livre
    if (q.motivoConsulta && !q.prazoMeses) {
      // Captura tanto dígitos quanto números por extenso até 12
      const matchPrazo = q.motivoConsulta.match(/(\d+|um|dois|três|tres|quatro|cinco|seis|sete|oito|nove|dez|onze|doze)\s*(meses|mês|semanas|semana|dias|dia|anos|ano)/i)
      if (matchPrazo) {
        alertas.push(`ℹ️ <strong>Dado inconsistente:</strong> O paciente mencionou um prazo no texto livre ("${matchPrazo[0]}") mas não preencheu o campo estruturado de prazo. Confirmar com o paciente para cálculos precisos.`)
      }
    }

    // Alerta Escalonado de Hidratação
    if (es.consumoAgua && aguaRec > 0) {
      const consumoAtual = Number(es.consumoAgua)
      const deficitPct = (aguaRec - consumoAtual) / aguaRec
      if (deficitPct > 0) {
        if (deficitPct > 0.6) {
          alertas.push(`🔴 <strong>Alerta importante (Hidratação severamente abaixo):</strong> Consumo atual (${consumoAtual}L) é menos de 40% do recomendado (${aguaRec.toFixed(1)}L). Investigar e corrigir urgentemente.`)
        } else if (deficitPct >= 0.3) {
          alertas.push(`⚠️ <strong>Atenção (Hidratação abaixo):</strong> Consumo atual (${consumoAtual}L) está bem abaixo da recomendação (${aguaRec.toFixed(1)}L). Ajustar ingestão.`)
        } else {
          alertas.push(`ℹ️ <strong>Informativo (Hidratação levemente abaixo):</strong> Consumo atual (${consumoAtual}L) está pouco abaixo da recomendação (${aguaRec.toFixed(1)}L).`)
        }
      }
    }

    const freqRuim = ["3-4x-semana", "5-6x-semana", "diario", "2x-dia"]
    const comeFritura = freqRuim.includes(fa.frituras || "")
    const comeFastFood = freqRuim.includes(fa.fastFood || "")
    const bebeRefri = freqRuim.includes(fa.refrigerante || "")
    if ((comeFritura || comeFastFood || bebeRefri) && imc < 18.5) {
      alertas.push(`<strong>Padrão alimentar vs. Peso:</strong> Alta ingestão reportada de ultraprocessados/frituras aliada a baixo peso. Pode indicar baixa ingestão calórica real ou desequilíbrio nutricional importante. Investigar horários e quantidades.`)
    }
  }

  // Alerta Condição Clínica Declarada
  if (hc.doencasDiagnosticadas && hc.doencasDiagnosticadas.trim() !== "") {
    alertas.push(`<strong>Condição clínica declarada:</strong> "${hc.doencasDiagnosticadas}" — revisar com o paciente antes de prescrever intensidade de treino/dieta.`)
  }

  let blocoAlertas = ""
  if (alertas.length > 0) {
    const listAlertas = alertas.map(a => `<li style="margin-bottom: 6px;">⚠️ ${a}</li>`).join("")
    blocoAlertas = `
    <div class="bloco-alertas" style="margin: 0 36px 24px; padding: 14px 18px; background: #fffbeb; border-left: 4px solid #f59e0b; border-radius: 4px;">
      <p class="bloco-titulo" style="color: #d97706; margin-bottom: 10px;">Alertas e Insights Automáticos</p>
      <ul style="font-size: 9.5pt; color: #92400e; padding-left: 18px;">
        ${listAlertas}
      </ul>
    </div>`
  }

  // Recordatório 24h
  let recordatorio = ""
  if (ha.recordatorio24h && ha.recordatorio24h.length > 0) {
    const linhas = ha.recordatorio24h
      .filter((r) => r.alimentos)
      .map(
        (r) => `<tr>
          <td>${r.refeicao || "Não informado"}</td>
          <td>${r.horario || "Não informado"}</td>
          <td>${r.alimentos}</td>
        </tr>`
      )
      .join("")
    if (linhas) {
      recordatorio = `
      <div class="tabela-wrapper">
        <table class="tabela-recordatorio">
          <thead><tr><th>Refeição</th><th>Horário</th><th>Alimentos / Preparações</th></tr></thead>
          <tbody>${linhas}</tbody>
        </table>
      </div>`
    } else {
      recordatorio = `<p style="font-size: 10pt; color: #555;">Não informado</p>`
    }
  } else {
    recordatorio = `<p style="font-size: 10pt; color: #555;">Não informado</p>`
  }

  // Frequência alimentar
  let tabelaFreq = ""
  const itensFreq = FREQUENCIA_ALIMENTAR_ITEMS.filter(
    (item) => fa[item.key] && fa[item.key] !== ""
  )
  if (itensFreq.length > 0) {
    const linhasFreq = itensFreq
      .map(
        (item) => `<tr>
          <td>${item.label}</td>
          <td>${fa[item.key] ?? "Não informado"}</td>
        </tr>`
      )
      .join("")
    tabelaFreq = `
    <div class="tabela-wrapper">
      <table class="tabela-frequencia">
        <thead><tr><th>Alimento / grupo</th><th>Frequência</th></tr></thead>
        <tbody>${linhasFreq}</tbody>
      </table>
    </div>`
  }

  let strMeta = "Não informado"
  if (an.pesoMeta && q.prazoMeses) {
    const delta = Number(an.pesoMeta) - pesoN
    const sinal = delta > 0 ? "+" : delta < 0 ? "" : "=" // delta < 0 já tem sinal de -
    strMeta = `Atingir ${an.pesoMeta}kg em ${q.prazoMeses} meses (${sinal}${delta > 0 ? delta.toFixed(1) : delta === 0 ? "0" : delta.toFixed(1)}kg)`
  } else if (an.pesoMeta) {
    strMeta = `Atingir ${an.pesoMeta}kg (prazo não informado)`
  } else if (q.prazoMeses) {
    strMeta = `Objetivo em ${q.prazoMeses} meses (peso meta não informado)`
  }

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <title>Ficha de Anamnese — ${dp.nome || "Paciente"}</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      font-family: 'Segoe UI', Arial, sans-serif;
      font-size: 11pt;
      color: #1a1a2e;
      background: #fff;
      line-height: 1.5;
    }

    /* ── Cabeçalho ── */
    .cabecalho {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      padding: 28px 36px 20px;
      border-bottom: 3px solid #16a34a;
      margin-bottom: 24px;
    }
    .cabecalho-titulo {
      font-size: 22pt;
      font-weight: 700;
      color: #16a34a;
      letter-spacing: -0.5px;
    }
    .cabecalho-subtitulo {
      font-size: 10pt;
      color: #555;
      margin-top: 2px;
    }
    .cabecalho-meta {
      text-align: right;
      font-size: 9pt;
      color: #777;
    }

    /* ── Destaque do paciente ── */
    .paciente-banner {
      margin: 0 36px 24px;
      padding: 14px 18px;
      background: #f0fdf4;
      border-left: 4px solid #16a34a;
      border-radius: 4px;
    }
    .paciente-nome {
      font-size: 15pt;
      font-weight: 700;
      color: #15803d;
    }
    .paciente-info {
      font-size: 10pt;
      color: #555;
      margin-top: 3px;
    }

    /* ── Bloco de cálculo ── */
    .bloco-calculo {
      margin: 0 36px 18px;
      padding: 12px 16px;
      background: #f8fafc;
      border: 1px solid #d1fae5;
      border-radius: 6px;
    }
    .bloco-titulo {
      font-size: 9pt;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #16a34a;
      margin-bottom: 8px;
    }

    /* ── Seções ── */
    .secao {
      margin: 0 36px 20px;
      page-break-inside: avoid;
    }
    .secao-titulo {
      font-size: 11pt;
      font-weight: 700;
      color: #15803d;
      padding-bottom: 5px;
      border-bottom: 1px solid #d1fae5;
      margin-bottom: 10px;
      text-transform: uppercase;
      letter-spacing: 0.4px;
    }

    /* ── Campos ── */
    .campos-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 6px 24px;
    }
    .campo {
      display: flex;
      flex-direction: column;
      gap: 1px;
    }
    .campo-label {
      font-size: 8.5pt;
      font-weight: 600;
      color: #888;
      text-transform: uppercase;
      letter-spacing: 0.3px;
    }
    .campo-valor {
      font-size: 10.5pt;
      color: #1a1a2e;
    }

    /* ── Tabelas ── */
    .tabela-wrapper {
      grid-column: 1 / -1;
      margin-top: 4px;
    }
    .tabela-recordatorio,
    .tabela-frequencia {
      width: 100%;
      border-collapse: collapse;
      font-size: 9.5pt;
    }
    .tabela-recordatorio th,
    .tabela-frequencia th {
      background: #dcfce7;
      color: #15803d;
      font-weight: 700;
      text-align: left;
      padding: 5px 8px;
      border: 1px solid #d1fae5;
      font-size: 8.5pt;
      text-transform: uppercase;
    }
    .tabela-recordatorio td,
    .tabela-frequencia td {
      padding: 5px 8px;
      border: 1px solid #e5e7eb;
      vertical-align: top;
    }
    .tabela-recordatorio tr:nth-child(even) td,
    .tabela-frequencia tr:nth-child(even) td {
      background: #f9fafb;
    }

    /* ── Rodapé ── */
    .rodape {
      margin-top: 32px;
      padding: 14px 36px;
      border-top: 1px solid #e5e7eb;
      font-size: 8pt;
      color: #aaa;
      display: flex;
      justify-content: space-between;
    }

    /* ── Print ── */
    @media print {
      body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      .secao { page-break-inside: avoid; }
    }
  </style>
</head>
<body>

  <header class="cabecalho">
    <div>
      <div class="cabecalho-titulo">Ony</div>
      <div class="cabecalho-subtitulo">Ficha de Anamnese Nutricional</div>
    </div>
    <div class="cabecalho-meta">
      Gerado em ${dataGeracao}
    </div>
  </header>

  <div class="paciente-banner">
    <div class="paciente-nome">${dp.nome || "Paciente não identificado"}</div>
    <div class="paciente-info">
      ${dp.idade ? `${dp.idade} anos` : ""}
      ${dp.sexo ? ` · ${LABEL_SEXO[dp.sexo]}` : ""}
      ${dp.dataNascimento ? ` · Nasc.: ${dp.dataNascimento}` : ""}
      ${dp.profissao ? ` · ${dp.profissao}` : ""}
    </div>
  </div>

  ${blocoCalculos}
  ${blocoAlertas}

  ${secao("1. Dados Pessoais", `
    ${campo("Nome completo", val(dp.nome))}
    ${campo("Data de nascimento", val(dp.dataNascimento))}
    ${campo("Idade", val(dp.idade, " anos"))}
    ${campo("Sexo biológico", dp.sexo ? LABEL_SEXO[dp.sexo] : "Não informado")}
    ${campo("Profissão", val(dp.profissao))}
    ${campo("Carga horária", val(dp.cargaHoraria))}
    ${campo("Contato", val(dp.contato))}
    ${campo("Encaminhado por", val(dp.encaminhadoPor))}
  `)}

  ${secao("2. Queixa e Objetivo", `
    ${campo("Motivo da consulta", val(q.motivoConsulta))}
    ${campo("Objetivo da consulta", val(q.objetivoConsulta))}
    ${campo("Meta / Prazo", strMeta)}
  `)}

  ${secao("3. Histórico Clínico", `
    ${campo("Doenças diagnosticadas", val(hc.doencasDiagnosticadas))}
    ${campo("Medicamentos contínuos", val(hc.medicamentosContinuos))}
    ${campo("Cirurgias", val(hc.cirurgias))}
    ${campo("Alergias / Intolerâncias", val(hc.alergiasIntolerancias))}
    ${campo("Histórico familiar", val(hc.historicoFamiliar))}
    ${campo("Tem exames recentes?", val(hc.temExamesRecentes))}
    ${campo("Sintomas gastrointestinais", val(hc.sintomasGastrointestinais))}
    ${campo("Ciclo regular?", val(hc.cicloRegular))}
    ${campo("Anticoncepcional", val(hc.anticoncepcional))}
    ${campo("Gestante?", val(hc.gestante))}
    ${campo("Lactante?", val(hc.lactante))}
    ${campo("Menopausa?", val(hc.menopausa))}
  `)}

  ${secao("4. Antropometria", `
    ${campo("Peso atual", val(an.peso, " kg"))}
    ${campo("Altura", val(an.altura, " cm"))}
    ${campo("Peso habitual", val(an.pesoHabitual, " kg"))}
    ${campo("Peso desejado", val(an.pesoMeta, " kg"))}
    ${campo("% Gordura corporal", val(an.gordura, "%"))}
    ${campo("Massa magra", val(an.massaMagra, " kg"))}
    ${campo("Circunferência cintura", val(an.circunferenciaCintura, " cm"))}
    ${campo("Circunferência quadril", val(an.circunferenciaQuadril, " cm"))}
    ${campo("Circunferência braço", val(an.circunferenciaBraco, " cm"))}
    ${campo("Circunferência panturrilha", val(an.circunferenciaPanturrilha, " cm"))}
  `)}

  ${secao("5. Atividade Física", `
    ${campo("Nível de atividade", at.nivelAtividade ? LABEL_ATIVIDADE[at.nivelAtividade] : "Não informado")}
    ${campo("Pratica atividade física?", val(at.praticaAtividade))}
    ${campo("Atividades praticadas", val(at.atividadesQuais))}
    ${campo("Frequência semanal", val(at.frequenciaSemanal, "x/semana"))}
    ${campo("Duração da sessão", val(at.duracaoSessao, " min"))}
    ${campo("Intensidade", at.intensidade ? LABEL_INTENSIDADE[at.intensidade as keyof typeof LABEL_INTENSIDADE] ?? val(at.intensidade) : "Não informado")}
    ${campo("Tempo de prática", val(at.tempoPratica))}
    ${campo("Perfil de trabalho", at.perfilTrabalho ? LABEL_PERFIL_TRABALHO[at.perfilTrabalho as keyof typeof LABEL_PERFIL_TRABALHO] ?? val(at.perfilTrabalho) : "Não informado")}
  `)}

  ${secao("6. Estilo de Vida", `
    ${campo("Horas de sono", val(es.horasSono, "h/noite"))}
    ${campo("Qualidade do sono", es.qualidadeSono ? LABEL_QUALIDADE[es.qualidadeSono as keyof typeof LABEL_QUALIDADE] ?? val(es.qualidadeSono) : "Não informado")}
    ${campo("Nível de estresse (0–10)", val(es.nivelEstresse))}
    ${campo("Consumo de água", val(es.consumoAgua, " L/dia"))}
    ${campo("Consome álcool?", val(es.consumeAlcool))}
    ${campo("Frequência do álcool", val(es.frequenciaAlcool))}
    ${campo("Fumante?", val(es.fumante))}
    ${campo("Detalhes tabagismo", val(es.detalheTabagismo))}
    ${campo("Hábitos intestinais", lista(es.habitosIntestinais ?? [], habitosMap))}
    ${campo("Observações", val(es.observacoes))}
  `)}

  ${secao("7. Histórico Alimentar", `
    ${campo("Refeições por dia", val(ha.refeicoesDia))}
    ${campo("Preferências alimentares", lista(ha.preferencias ?? []))}
    ${campo("Aversões alimentares", lista(ha.aversoes ?? []))}
    ${campo("Alergias", val(ha.alergias))}
    ${campo("Suplementos", lista(ha.suplementos ?? []))}
    ${campo("Detalhes dos suplementos", val(ha.suplementosDetalhes))}
    ${campo("Observações", val(ha.observacoes))}
    <div class="tabela-wrapper" style="grid-column:1/-1">
      <p style="font-weight:700;font-size:9pt;color:#15803d;margin-bottom:6px;text-transform:uppercase;">Recordatório 24h</p>
      ${recordatorio}
    </div>
  `)}

  ${secao("8. Frequência Alimentar", tabelaFreq || '<p style="font-size: 10pt; color: #555;">Não informado</p>')}

  ${secao("9. Objetivos e Configuração", `
    ${campo("Biotipo", ob.biotipo ? LABEL_BIOTIPO[ob.biotipo] : "Não informado")}
    ${campo("Objetivo de composição", ob.objetivoComposicao ? LABEL_OBJETIVO_COMPOSICAO[ob.objetivoComposicao] : "Não informado")}
    ${campo("Objetivos de performance", ob.objetivosPerformance?.length ? ob.objetivosPerformance.map((o) => LABEL_OBJETIVO_PERFORMANCE[o]).join(", ") : "Não informado")}
    ${campo("Fórmula de cálculo", ob.formula ? LABEL_FORMULA[ob.formula] : "Não informado")}
    ${campo("Observações", val(ob.observacoes))}
  `)}

  <section class="secao" style="margin-top: 40px;">
    <h2 class="secao-titulo" style="border-bottom-color: #94a3b8; color: #475569;">Observações / Conduta do Profissional</h2>
    <div style="margin-top: 16px; display: flex; flex-direction: column; gap: 28px;">
      <div style="border-bottom: 1px solid #cbd5e1;"></div>
      <div style="border-bottom: 1px solid #cbd5e1;"></div>
      <div style="border-bottom: 1px solid #cbd5e1;"></div>
      <div style="border-bottom: 1px solid #cbd5e1;"></div>
      <div style="border-bottom: 1px solid #cbd5e1;"></div>
      <div style="border-bottom: 1px solid #cbd5e1;"></div>
      <div style="border-bottom: 1px solid #cbd5e1;"></div>
    </div>
  </section>

  <footer class="rodape">
    <span>Ony — Anamnese Nutricional</span>
    <span>Documento gerado em ${dataGeracao} · Uso exclusivo do profissional de saúde</span>
  </footer>

</body>
</html>`
}

// ─── Função pública ───────────────────────────────────────────────────────────

/**
 * Abre uma janela de impressão com a ficha de anamnese formatada e
 * dispara automaticamente o diálogo de impressão/salvamento como PDF.
 */
export function baixarAnamnese(dados: AnamneseFormValues): void {
  const html = gerarHtml(dados)
  const janela = window.open("", "_blank", "width=900,height=700")
  if (!janela) {
    alert(
      "O seu navegador bloqueou a janela pop-up. Permita pop-ups para este site e tente novamente."
    )
    return
  }
  janela.document.write(html)
  janela.document.close()
  // Aguarda o carregamento completo antes de imprimir
  janela.addEventListener("load", () => {
    janela.focus()
    janela.print()
  })
}
