import { CheckCircle2, Layers3, Route, Target, Workflow } from 'lucide-react';

export const mentorOnboardingOpening = [
  'Este formulário vai me ajudar a entender de onde você está partindo e qual aplicação faz mais sentido construir primeiro durante a mentoria.',
  'Você não precisa explicar toda a sua empresa ou listar tudo o que faz.',
  'Escolha um processo real, descreva como ele funciona hoje e mostre onde a IA poderia ajudar.',
  'Responda com exemplos concretos e números aproximados quando conseguir.',
];

const question = (questionNumber, name, label, type, config = {}) => ({
  questionNumber,
  name,
  label,
  type,
  required: false,
  placeholder: type === 'text'
    ? 'Digite sua resposta...'
    : type === 'textarea'
      ? 'Descreva com suas próprias palavras...'
      : undefined,
  ...config,
});

const paragraph = (number, name, label, config = {}) => question(number, name, label, 'textarea', {
  rows: 5,
  ...config,
});

const short = (number, name, label, config = {}) => question(number, name, label, 'text', config);
const choice = (number, name, label, options, config = {}) => question(number, name, label, 'radio', { options, ...config });
const checks = (number, name, label, options, config = {}) => question(number, name, label, 'checkboxes', { options, ...config });

const applicationAreaOptions = [
  'Na minha rotina profissional',
  'No meu negócio',
  'Na minha equipe',
  'Em projetos para clientes',
  'Na minha rotina pessoal',
  'Em mais de uma dessas áreas',
];

const levelOptions = [
  'Ainda estou começando e uso IA para perguntas simples',
  'Uso IA com frequência, mas continuo fazendo quase tudo manualmente',
  'Já consigo estruturar contexto e criar instruções melhores',
  'Já criei especialistas, projetos ou estruturas persistentes',
  'Já montei automações ou fluxos simples',
  'Já construí ativos, agentes ou aplicações com IA',
  'Não sei avaliar',
];

const barrierOptions = [
  'Não sei por onde começar',
  'Não sei transformar uma tarefa em um fluxo',
  'Não consigo dar contexto suficiente',
  'Não confio totalmente nos resultados',
  'Continuo tendo que revisar tudo',
  'Não sei criar especialistas digitais',
  'Não sei conectar as etapas',
  'Não sei o que pode ser automatizado',
  'Falta tempo para testar',
  'Falta acesso ou autorização',
  'Tenho receio de errar',
  'Outro',
];

const deliveryOptions = [
  'Um especialista digital utilizável',
  'Um fluxo de produção coordenado',
  'Uma automação ou rotina assistida',
  'Uma página, apresentação, dashboard ou protótipo',
  'Um pequeno aplicativo ou ferramenta',
  'Um sistema pessoal de trabalho com IA',
  'Ainda não sei',
];

const successOptions = [
  'Reduziu tempo',
  'Diminuiu retrabalho',
  'Reduziu erros',
  'Aumentou a qualidade',
  'Aumentou a velocidade',
  'Permitiu produzir mais',
  'Reduziu dependência de outras pessoas',
  'Tirou uma tarefa recorrente da sua frente',
  'Melhorou uma decisão',
  'Criou uma capacidade que você não tinha',
  'Outro',
];

const exampleOptions = [
  'Sim, posso trazer um exemplo real',
  'Sim, mas preciso anonimizar os dados',
  'Sim, mas preciso pedir autorização',
  'Só consigo trazer um exemplo fictício',
  'Ainda não sei',
];

const practiceTimeOptions = [
  'Menos de 1 hora',
  'Entre 1 e 2 horas',
  'Entre 2 e 4 horas',
  'Entre 4 e 6 horas',
  'Mais de 6 horas',
  'Ainda não sei',
];

const sessionDates = ['10 de setembro', '20 de setembro', '30 de setembro', '10 de outubro', '20 de outubro', '30 de outubro'];
const sessionAvailabilityOptions = ['Consigo participar', 'Talvez consiga', 'Não consigo'];

const baseSteps = [
  {
    id: 'contexto',
    number: '01',
    label: 'Seu contexto',
    title: 'De onde você está começando',
    description: 'O contexto necessário para entender seu ponto de partida sem transformar a mentoria em uma ficha de RH.',
    icon: Target,
    fields: [
      short(1, 'full_name', 'Qual é o seu nome completo?', { required: true, autoComplete: 'name', placeholder: 'Seu nome completo' }),
      paragraph(2, 'current_work', 'O que você faz hoje, em que área atua e quais responsabilidades passam por você?', { required: true, helper: 'Descreva seu trabalho atual com suas próprias palavras.' }),
      choice(3, 'application_area', 'Onde você quer aplicar primeiro o que aprender na mentoria?', applicationAreaOptions),
      paragraph(4, 'main_result', 'Qual é o principal resultado que você gostaria de construir durante a mentoria?', { required: true }),
    ],
  },
  {
    id: 'ponto-a',
    number: '02',
    label: 'Seu ponto A',
    title: 'O processo que precisa melhorar',
    description: 'Escolha um processo real. Quanto mais concreto for o exemplo, melhor será a aplicação durante a mentoria.',
    icon: Workflow,
    fields: [
      paragraph(5, 'priority_process', 'Qual processo, tarefa ou tipo de trabalho mais consome seu tempo ou continua voltando para você?', { required: true, helper: 'Descreva uma situação específica. Exemplos: relatório mensal, preparação de reuniões, produção de conteúdo, propostas comerciais, análise de dados, acompanhamento de projetos, organização de informações, atendimento, criação de uma página ou protótipo.' }),
      paragraph(6, 'process_current_steps', 'Como esse processo acontece hoje?', { required: true, helper: 'Descreva o caminho em poucas etapas, do início ao fim.' }),
      paragraph(7, 'process_frequency_time', 'Com que frequência esse processo acontece e quanto tempo ele consome?', { required: true, helper: 'Inclua, se possível, frequência, tempo por ocorrência e tempo total por semana ou mês.' }),
      paragraph(8, 'process_bottlenecks', 'Onde esse processo trava, gera retrabalho ou depende demais de você?', { required: true }),
      paragraph(9, 'process_consequences', 'O que acontece quando esse processo não é feito bem ou no prazo?', { required: true, helper: 'A resposta pode envolver atraso, erro, perda de oportunidade, dependência de outras pessoas, queda de qualidade, estresse, decisão mais lenta ou tarefa acumulada.' }),
      paragraph(10, 'attempted_improvements', 'O que você já tentou fazer para melhorar esse processo?', { required: true, helper: 'O que funcionou e por que não se sustentou?' }),
    ],
  },
  {
    id: 'ia-atual',
    number: '03',
    label: 'Como você usa IA hoje',
    title: 'O que já faz parte da sua prática',
    description: 'Quero partir do que você realmente usa, construiu e ainda não conseguiu resolver com IA.',
    icon: Layers3,
    fields: [
      paragraph(11, 'ai_current_use', 'Como você usa IA atualmente?', { required: true, helper: 'Quais ferramentas usa e para quais tarefas? Não precisa listar todas as ferramentas que já testou. Fale apenas do que realmente faz parte da sua rotina.' }),
      paragraph(12, 'ai_built_with', 'O que você já conseguiu construir ou organizar com ajuda de IA?', { required: true, helper: 'Pode ser texto, relatório, apresentação, planilha, página, dashboard, automação, agente, código, processo ou outro ativo. Se ainda não construiu nada, escreva isso.' }),
      paragraph(13, 'ai_limit', 'O que você ainda não consegue fazer com IA, mesmo já tendo tentado?', { required: true }),
      choice(14, 'ai_level', 'Em qual nível você se encontra hoje?', levelOptions),
      checks(15, 'ai_barriers', 'O que mais impede você de avançar com IA hoje?', barrierOptions),
    ],
  },
  {
    id: 'ponto-b',
    number: '04',
    label: 'Seu ponto B',
    title: 'O que precisa sair da mentoria',
    description: 'Agora vamos transformar o problema em uma aplicação possível, com valor concreto e limites humanos claros.',
    icon: Route,
    fields: [
      paragraph(16, 'desired_ai_help', 'O que você gostaria que a IA fizesse nesse processo prioritário?', { required: true, helper: 'Descreva a ajuda ideal, mesmo que ainda não saiba se é tecnicamente possível.' }),
      choice(17, 'desired_delivery', 'Qual destas entregas seria mais valiosa para você ao final da mentoria?', deliveryOptions),
      checks(18, 'success_indicators', 'Como você saberia que essa aplicação funcionou?', successOptions, { required: true, helper: 'Escolha um resultado concreto: redução de tempo, menos retrabalho, menos erros, mais qualidade, mais velocidade, mais produção, menos dependência, uma tarefa recorrente a menos, uma decisão melhor ou uma capacidade nova.' }),
      paragraph(18, 'success_expected_result', 'Qual seria o resultado esperado?', { required: true, helper: 'Explique o resultado concreto que você gostaria de observar.' }),
      paragraph(19, 'human_responsibility', 'O que precisa continuar sob responsabilidade humana?', { required: true, helper: 'O que você não quer deixar a IA decidir, publicar, enviar, alterar ou executar sozinha?' }),
      paragraph(20, 'why_now', 'Por que esse processo precisa melhorar agora?', { required: true }),
    ],
  },
  {
    id: 'condicoes',
    number: '05',
    label: 'Condições reais',
    title: 'O que define a aplicação possível',
    description: 'Ferramentas, restrições, disponibilidade e material real determinam o que dá para construir com segurança.',
    icon: CheckCircle2,
    fields: [
      paragraph(21, 'process_tools_systems', 'Quais arquivos, ferramentas ou sistemas fazem parte do processo escolhido?', { required: true, helper: 'Fale apenas do processo prioritário. Exemplos: planilha, email, documentos, calendário, sistema interno, ferramenta de projetos, CRM, banco de dados, arquivos locais ou ferramenta de criação.' }),
      paragraph(22, 'application_restrictions', 'Existe alguma restrição que pode limitar essa aplicação?', { required: true, helper: 'Considere política da empresa, falta de acesso, necessidade de aprovação, dados sensíveis, ferramenta proibida, ausência de licença, necessidade de envolver TI ou nenhuma restrição conhecida.' }),
      choice(23, 'bring_example', 'Você consegue trazer um exemplo desse processo para trabalharmos durante a mentoria?', exampleOptions),
      choice(24, 'practice_time', 'Quanto tempo você consegue reservar por semana para aplicar o que for construído?', practiceTimeOptions),
      question(25, 'session_availability', 'Você consegue participar dos seis encontros previstos?', 'availability', { dates: sessionDates, options: sessionAvailabilityOptions, helper: 'Escolha uma resposta para cada data.' }),
      paragraph(26, 'between_session_barriers', 'O que pode impedir você de aplicar entre um encontro e outro?', { required: true }),
    ],
  },
];

const conditionalFields = {
  automation: paragraph(27, 'automation_details', 'O que dispara esse processo, o que entra nele, qual decisão precisa acontecer e qual ação deveria sair no final?', { helper: 'Inclua também onde uma pessoa precisaria revisar ou aprovar.' }),
  asset: paragraph(28, 'asset_details', 'O que você quer construir, quem usaria e qual é o menor fluxo que precisa funcionar primeiro?'),
  general: paragraph(29, 'general_problem', 'Qual problema ou resultado você quer melhorar, mesmo que ainda não saiba qual processo deve ser construído?'),
};

const selectedOptions = (value) => {
  if (Array.isArray(value)) return value;
  if (value && typeof value === 'object' && Array.isArray(value.selected)) return value.selected;
  if (value && typeof value === 'object' && typeof value.value === 'string') return [value.value];
  if (typeof value === 'string') return [value];
  return [];
};

const containsAny = (value, terms) => {
  const source = typeof value === 'string' ? value : '';
  const normalized = source.toLocaleLowerCase('pt-BR');
  return terms.some((term) => normalized.includes(term));
};

export function getMentorOnboardingSteps(values = {}) {
  const steps = baseSteps.map((step) => ({ ...step, fields: [...step.fields] }));
  const processText = [values.priority_process, values.desired_ai_help, values.main_result].filter(Boolean).join(' ');
  const priorityProcess = String(values.priority_process || '').trim();
  const barriers = selectedOptions(values.ai_barriers);
  const conditional = [];

  const needsAutomation = barriers.some((item) => item === 'Não sei conectar as etapas' || item === 'Não sei o que pode ser automatizado')
    || containsAny(processText, ['autom', 'conect', 'integra', 'fluxo']);
  const needsAsset = containsAny(processText, ['página', 'dashboard', 'protótipo', 'aplicativo', 'ferramenta', 'apresentação']);
  const needsGeneralProblem = priorityProcess.length > 0
    && (containsAny(priorityProcess, ['não sei', 'ainda não', 'problema', 'resultado']) || priorityProcess.length < 28);

  if (needsAutomation) conditional.push(conditionalFields.automation);
  if (needsAsset) conditional.push(conditionalFields.asset);
  if (needsGeneralProblem) conditional.push(conditionalFields.general);

  if (conditional.length > 0) {
    steps.push({
      id: 'aprofundamento',
      number: '06',
      label: 'Aprofundamento',
      title: 'Um recorte para começar',
      description: 'Estas perguntas aparecem porque suas respostas indicam que vale detalhar mais o primeiro caminho de aplicação.',
      icon: Layers3,
      fields: conditional,
    });
  }

  return steps;
}

export function getAllMentorOnboardingFieldNames() {
  const names = new Set();
  baseSteps.forEach((step) => step.fields.forEach((field) => names.add(field.name)));
  Object.values(conditionalFields).forEach((field) => names.add(field.name));
  return [...names];
}
