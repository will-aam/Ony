import type { Metadata } from "next"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export const metadata: Metadata = {
  title: "Blog Educativo",
  description:
    "Conceitos fundamentais sobre metabolismo, gasto energético e nutrição: TMB, GET, fórmulas e macronutrientes.",
}

const TOPICOS = [
  {
    id: "tmb-get",
    titulo: "Taxa Metabólica Basal (TMB) e Gasto Energético Total (GET)",
    conteudo: (
      <>
        <p>
          A Taxa Metabólica Basal (TMB) e o Gasto Energético Total (GET) são
          conceitos fundamentais para quem busca entender o metabolismo corporal
          e gerenciar efetivamente o peso e a saúde. A TMB representa a energia
          mínima necessária para manter as funções vitais em repouso, enquanto o
          GET inclui essa taxa basal mais as calorias gastas em todas as
          atividades diárias.
        </p>

        <h3>O que é a Taxa Metabólica Basal?</h3>
        <p>
          A TMB representa a quantidade mínima de energia que o corpo humano
          necessita para manter suas funções vitais em estado de repouso
          completo — respiração, circulação sanguínea, regulação da temperatura
          corporal. Corresponde a aproximadamente 60–70% do gasto energético
          total diário da maioria das pessoas.
        </p>

        <h3>Fatores que influenciam a TMB</h3>
        <ul>
          <li>
            <strong>Sexo:</strong> Homens geralmente apresentam TMB mais
            elevada, principalmente pela maior massa muscular.
          </li>
          <li>
            <strong>Idade:</strong> A TMB tende a diminuir com o envelhecimento.
          </li>
          <li>
            <strong>Composição corporal:</strong> Músculos consomem mais energia
            que tecido adiposo, mesmo em repouso.
          </li>
          <li>
            <strong>Genética:</strong> Fatores hereditários podem causar
            diferenças metabólicas significativas.
          </li>
          <li>
            <strong>Hormônios:</strong> A tireoide e outros hormônios podem
            acelerar ou reduzir o metabolismo basal.
          </li>
        </ul>

        <h3>Como calcular a TMB — Equação de Harris-Benedict</h3>
        <p>
          Para homens: TMB = 66 + (13,7 × peso em kg) + (5 × altura em cm) −
          (6,8 × idade em anos)
          <br />
          Para mulheres: TMB = 655 + (9,6 × peso em kg) + (1,8 × altura em cm)
          − (4,7 × idade em anos)
        </p>

        <h3>Cálculo do Gasto Energético Total</h3>
        <p>
          O GET é calculado multiplicando a TMB pelo fator de atividade:
        </p>
        <ul>
          <li>Sedentário: TMB × 1,2</li>
          <li>Levemente ativo (1–3 dias/sem): TMB × 1,375</li>
          <li>Moderadamente ativo (3–5 dias/sem): TMB × 1,55</li>
          <li>Muito ativo (6–7 dias/sem): TMB × 1,725</li>
          <li>Extremamente ativo (dupla sessão ou trabalho físico): TMB × 1,9</li>
        </ul>
      </>
    ),
  },
  {
    id: "formulas",
    titulo: "Fórmulas de TMB/GER e Influência Individual",
    conteudo: (
      <>
        <p>
          A escolha da fórmula para estimar a TMB é um passo fundamental na
          avaliação das necessidades energéticas. Essa decisão deve ser pautada
          pelas características pessoais: idade, sexo, composição corporal,
          nível de atividade física e condições de saúde.
        </p>

        <h3>Principais fórmulas</h3>
        <ul>
          <li>
            <strong>Harris-Benedict (1919, revisada 1984):</strong> Uma das mais
            tradicionais, amplamente usada na prática clínica.
          </li>
          <li>
            <strong>Mifflin-St Jeor (1990):</strong> Considerada mais precisa
            para a população contemporânea, especialmente adultos com peso
            normal a sobrepeso.
          </li>
          <li>
            <strong>Katch-McArdle:</strong> Mais precisa quando a % de gordura
            corporal é conhecida, pois usa a massa magra como variável
            principal.
          </li>
          <li>
            <strong>OMS / FAO:</strong> Indicada para crianças e adolescentes, e
            em contextos de saúde pública.
          </li>
          <li>
            <strong>Henry (Schofield revisada):</strong> Recomendada para
            populações tropicais e brasileiras.
          </li>
        </ul>

        <h3>Como a Ony escolhe a fórmula automaticamente</h3>
        <p>
          Quando você seleciona "Recomendada (automática)", a plataforma
          considera seu perfil: se você informou o percentual de gordura,
          Katch-McArdle é priorizada; caso contrário, Mifflin-St Jeor é usada
          como padrão para adultos, por ser a mais validada cientificamente para
          a população geral.
        </p>

        <h3>Limitações das fórmulas</h3>
        <p>
          Todas as equações fornecem estimativas baseadas em populações. Fatores
          como nível de hidratação, variação hormonal, doenças metabólicas e
          genética individual podem causar desvios de 10–20% em relação ao
          gasto real, medido por calorimetria indireta. Por isso, os resultados
          devem ser interpretados como pontos de partida, ajustados
          progressivamente com acompanhamento profissional.
        </p>
      </>
    ),
  },
  {
    id: "macronutrientes",
    titulo: "Macronutrientes: proteína, carboidrato e gordura",
    conteudo: (
      <>
        <p>
          Os macronutrientes são os três grupos de compostos que fornecem energia
          ao organismo. Cada um desempenha funções específicas e essenciais para
          a saúde e o desempenho físico.
        </p>

        <h3>Proteína (4 kcal/g)</h3>
        <p>
          Fundamental para síntese muscular, reparo tecidual e produção de
          enzimas e hormônios. A ingestão recomendada varia de 0,8 g/kg (saúde
          geral) a 2,2 g/kg (atletas em fase de hipertrofia ou cutting).
          Fontes: carnes magras, ovos, laticínios, leguminosas e suplementos
          como whey protein.
        </p>

        <h3>Carboidrato (4 kcal/g)</h3>
        <p>
          Principal fonte de energia para o cérebro e para exercícios de alta
          intensidade. Carboidratos complexos (arroz integral, aveia, batata-
          doce) fornecem energia de liberação gradual, contribuindo para maior
          saciedade e estabilidade glicêmica.
        </p>

        <h3>Gordura (9 kcal/g)</h3>
        <p>
          Essencial para absorção de vitaminas lipossolúveis (A, D, E, K),
          produção hormonal e proteção de órgãos. Gorduras insaturadas
          (azeite, abacate, castanhas, peixes gordurosos) são associadas a
          benefícios cardiovasculares. Gorduras saturadas e trans devem ser
          consumidas com moderação.
        </p>

        <h3>Distribuição recomendada pela Ony</h3>
        <p>
          A plataforma distribui os macros com base no objetivo de composição
          corporal:
        </p>
        <ul>
          <li>
            <strong>Emagrecer:</strong> Proteína elevada (preservar massa
            magra), carboidrato moderado, gordura adequada.
          </li>
          <li>
            <strong>Manter:</strong> Distribuição equilibrada conforme
            recomendações gerais de saúde.
          </li>
          <li>
            <strong>Hipertrofia / Bulking:</strong> Proteína alta, carboidrato
            elevado (energia para treinos e síntese), gordura suficiente.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "biotipo",
    titulo: "Biotipos corporais: ectomorfo, mesomorfo e endomorfo",
    conteudo: (
      <>
        <p>
          A teoria dos somatótipos, proposta por William Sheldon na década de
          1940, classifica os corpos humanos em três tipos principais com base
          nas características físicas e tendências metabólicas. Embora nenhuma
          pessoa seja exclusivamente de um tipo, o somatótipo dominante pode
          orientar estratégias nutricionais e de treinamento.
        </p>

        <h3>Ectomorfo</h3>
        <p>
          Estrutura óssea fina, metabolismo acelerado e dificuldade para ganhar
          peso ou massa muscular. Ectomorfos geralmente se beneficiam de maior
          ingestão calórica e carboidratos mais elevados, com treinamento de
          força para estimular hipertrofia.
        </p>

        <h3>Mesomorfo</h3>
        <p>
          Corpo atlético, boa resposta ao treinamento e facilidade tanto para
          ganhar massa quanto para perder gordura. É o tipo considerado mais
          "responsivo" a intervenções nutricionais e de exercício.
        </p>

        <h3>Endomorfo</h3>
        <p>
          Tendência a acumular gordura corporal, metabolismo mais lento e
          dificuldade para emagrecer. Estratégias com déficit calórico
          moderado, carboidratos complexos e exercícios de resistência e
          cardiovascular combinados costumam ser mais efetivas.
        </p>

        <h3>Limitações do conceito</h3>
        <p>
          A teoria dos somatótipos não tem base genética sólida e foi criticada
          por simplificar excessivamente a variabilidade humana. Na Ony, o
          biotipo é usado como um dos fatores para personalizar levemente a
          distribuição de macronutrientes, não como um determinante absoluto. A
          avaliação individual com nutricionista sempre superará qualquer
          classificação generalista.
        </p>
      </>
    ),
  },
  {
    id: "imc-composicao",
    titulo: "IMC, composição corporal e indicadores de risco",
    conteudo: (
      <>
        <p>
          O Índice de Massa Corporal (IMC) é a medida de triagem mais utilizada
          mundialmente por sua simplicidade — peso (kg) dividido pela altura ao
          quadrado (m²). Apesar de útil para populações, possui limitações
          importantes na avaliação individual.
        </p>

        <h3>Classificação do IMC (OMS)</h3>
        <ul>
          <li>Abaixo de 18,5 — Abaixo do peso</li>
          <li>18,5 a 24,9 — Peso normal</li>
          <li>25,0 a 29,9 — Sobrepeso</li>
          <li>30,0 a 34,9 — Obesidade grau I</li>
          <li>35,0 a 39,9 — Obesidade grau II</li>
          <li>40,0 ou mais — Obesidade grau III (mórbida)</li>
        </ul>

        <h3>Relação cintura-quadril (RCQ)</h3>
        <p>
          Mede a distribuição de gordura abdominal, um indicador de risco
          cardiometabólico mais sensível que o IMC isolado. Risco elevado:
          acima de 0,90 para homens e 0,85 para mulheres (OMS).
        </p>

        <h3>Limitações do IMC</h3>
        <p>
          O IMC não distingue massa muscular de gordura corporal. Um atleta
          com muita musculatura pode ter IMC de "sobrepeso" mesmo com baixo
          percentual de gordura. Por isso, a Ony combina IMC com percentual de
          gordura (quando informado) e RCQ para uma triagem mais completa.
          Ainda assim, nada substitui avaliação com bioimpedância, absorciometria
          de dupla energia (DEXA) ou dobras cutâneas feitas por profissional.
        </p>
      </>
    ),
  },
]

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:py-14">
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-foreground text-balance">
          Tópicos Educativos
        </h1>
        <p className="mt-2 text-muted-foreground leading-relaxed">
          Conceitos fundamentais sobre metabolismo, gasto energético e nutrição.
        </p>
      </header>

      <Accordion type="single" collapsible className="flex flex-col gap-3">
        {TOPICOS.map((topico) => (
          <AccordionItem
            key={topico.id}
            value={topico.id}
            className="rounded-xl border border-border bg-card px-5 data-[state=open]:border-primary/40"
          >
            <AccordionTrigger className="py-4 text-left font-semibold text-foreground hover:no-underline">
              {topico.titulo}
            </AccordionTrigger>
            <AccordionContent>
              <div className="prose prose-sm prose-green max-w-none pb-4 text-muted-foreground [&_h3]:mt-5 [&_h3]:mb-1.5 [&_h3]:text-sm [&_h3]:font-semibold [&_h3]:uppercase [&_h3]:tracking-wide [&_h3]:text-primary [&_ul]:mt-2 [&_ul]:space-y-1.5 [&_ul]:pl-5 [&_li]:leading-relaxed [&_p]:leading-relaxed [&_p]:mb-3 [&_strong]:text-foreground">
                {topico.conteudo}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
