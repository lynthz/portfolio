// Todo o texto do site mora aqui. Campos opcionais são os PENDENTES:
// enquanto estiverem ausentes, nada é renderizado no lugar deles.

export interface Link {
  rotulo: string;
  url: string;
}

export interface Fato {
  rotulo: string;
  /** PENDENTE quando ausente: o fato inteiro não aparece. */
  valor?: string;
}

export interface Captura {
  /** Caminho a partir de `public/`, por exemplo `screens/kanban.webp`. */
  arquivo: string;
  alt: string;
  largura: number;
  altura: number;
}

export interface Agente {
  nome: string;
  descricao: string;
}

export interface Passo {
  titulo: string;
  descricao: string;
}

export interface Produto {
  nome: string;
  descricao: string;
  /** PENDENTE */
  stack?: string[];
  /** PENDENTE */
  captura?: Captura;
}

export interface EtapaPipeline {
  titulo: string;
  ferramentas: string;
}

export const pessoa = {
  nome: 'Luiz Otávio Ongaro',
  cargo: 'Desenvolvedor na MDO Prime',
  formacao: 'Estudante de Segurança da Informação, Fatec Americana, formatura em jul/2028',
  frase:
    'Construo produtos com IA que estão em produção e são usados todos os dias por empresas reais.',
  local: 'São Paulo, Brasil',
  svulks: {
    texto: 'Também sou fundador da Svulks, empresa de criação de software.',
    link: { rotulo: 'svulks.xyz', url: 'https://svulks.xyz' },
  },
};

export const navegacao: Link[] = [
  { rotulo: 'MDO Flow', url: '#mdo-flow' },
  { rotulo: 'Outros produtos', url: '#outros-produtos' },
  { rotulo: 'Como trabalho com IA', url: '#ia' },
  { rotulo: 'Contato', url: '#contato' },
];

export const abertura = {
  prova: ['MDO Flow', 'em produção desde jan/2025', '5 empresas', 'cerca de 60 usuários por dia'],
  botoes: [
    { rotulo: 'Ver o MDO Flow', url: '#mdo-flow' },
    { rotulo: 'Falar comigo', url: '#contato' },
  ] satisfies Link[],
};

export const flow = {
  titulo: 'MDO Flow',
  resumo: 'SaaS B2B: um CRM para WhatsApp com IA, que centraliza atendimento, leads e vendas.',
  problema:
    'Empresas que vendem pelo WhatsApp perdem conversas e vendas quando o atendimento fica espalhado em celulares, sem histórico nem acompanhamento.',
  construido:
    'Construí o MDO Flow para a MDO Prime. Concebi, desenvolvi, testei e opero o produto de ponta a ponta.',
  uso: [
    { rotulo: 'Em produção desde', valor: 'janeiro de 2025' },
    { rotulo: 'Empresas', valor: '5' },
    { rotulo: 'Usuários ativos por dia', valor: 'cerca de 60' },
    { rotulo: 'Segmentos dos clientes', valor: 'contabilidade e indústria' },
  ] satisfies Fato[],
  agentes: [
    {
      nome: 'Agente de atendimento e vendas',
      descricao:
        'Responde o cliente no WhatsApp, entende o que a pessoa descreve e envia o link do produto certo no site para ela comprar.',
    },
    {
      nome: 'Agente de validação',
      descricao: 'Confere as operações registradas no CRM.',
    },
  ] satisfies Agente[],
  orquestracao: 'A orquestração é feita em n8n, integrada a LLMs e aos sistemas do cliente.',
  funcionalidades: [
    'Multiusuário',
    'Múltiplas conexões de WhatsApp',
    'Envio de mensagens em massa',
    'Comunicação interna da equipe',
    'Kanban',
    'Automação de follow-ups',
  ],
  // PENDENTE: preencha `valor` quando houver o número. Sem `valor`, a métrica não aparece.
  metricas: [
    { rotulo: 'Mensagens processadas por mês' },
    { rotulo: 'Conversas respondidas pelo agente por mês' },
    { rotulo: 'Conversas que terminaram com envio de link de produto' },
    { rotulo: 'Horas economizadas para os clientes' },
  ] as Fato[],
  // PENDENTE de confirmação pelo Luiz.
  stack: ['TypeScript', 'Node.js', 'React', 'PostgreSQL', 'Redis', 'n8n', 'Docker'],
  links: [
    { rotulo: 'mdoflow.com.br', url: 'https://mdoflow.com.br' },
    { rotulo: 'app.mdoflow.com.br', url: 'https://app.mdoflow.com.br' },
  ] satisfies Link[],
  // PENDENTE: 3 a 4 capturas anonimizadas em `public/screens/`. Vazio, a galeria não aparece.
  capturas: [] as Captura[],
};

export const percurso = {
  titulo: 'Como o agente de vendas funciona',
  intro: 'O percurso de uma conversa, do WhatsApp ao CRM.',
  passos: [
    {
      titulo: 'Mensagem do cliente no WhatsApp',
      descricao: 'O cliente descreve o que procura.',
    },
    {
      titulo: 'O agente interpreta o pedido',
      descricao: 'O agente de atendimento e vendas entende o que a pessoa descreveu.',
    },
    {
      titulo: 'Consulta ao catálogo',
      descricao: 'O agente encontra no catálogo o produto certo para o pedido.',
    },
    {
      titulo: 'Resposta com o link do produto',
      descricao: 'O cliente recebe no WhatsApp o link do produto no site, para comprar.',
    },
    {
      titulo: 'Operação registrada e validada no CRM',
      descricao: 'A operação fica registrada no CRM e o agente de validação confere.',
    },
  ] satisfies Passo[],
};

export const outros = {
  titulo: 'Mais quatro produtos, construídos por uma pessoa com IA',
  intro:
    'Construí sozinho, com um pipeline de agentes de IA, outros quatro produtos para a MDO Prime.',
  fatos: [
    { rotulo: 'Status', valor: 'em produção, em uso interno na MDO Prime' },
    { rotulo: 'Uso', valor: '3 pessoas usam todos os dias' },
    { rotulo: 'Construção', valor: 'algumas semanas de construção cada' },
  ] satisfies Fato[],
  escala:
    'O MDO Flow atende clientes externos: 5 empresas, cerca de 60 usuários por dia. Estes quatro são ferramentas internas, usadas por 3 pessoas.',
  produtos: [
    {
      nome: 'MDO Remote',
      descricao:
        'Ferramenta de suporte e acesso remoto baseada no RustDesk, projeto de código aberto, adaptada para a operação da MDO Prime.',
    },
    {
      nome: 'MDO Backup',
      descricao: 'Central de backups desenvolvida inteiramente por mim, com o restic como motor.',
    },
    {
      nome: 'MDO Connect',
      descricao:
        'Aplicativo de gerenciamento de DNS que controla quais sites podem ou não ser acessados.',
    },
    {
      nome: 'MDO Commerce',
      descricao: 'E-commerce headless integrado a API de pagamentos.',
    },
  ] as Produto[],
};

export const ia = {
  titulo: 'Como trabalho com IA',
  pipeline: {
    titulo: 'Pipeline próprio de agentes para desenvolvimento',
    intro: 'Combino Claude Code e Codex em um fluxo personalizado.',
    etapas: [
      { titulo: 'Ordenação das tarefas', ferramentas: 'Claude Fable e Claude Opus' },
      {
        titulo: 'Construção do código',
        ferramentas: 'ChatGPT Codex, alternando às vezes entre GPT e Claude Sonnet',
      },
      { titulo: 'Revisão e testes', ferramentas: 'Claude Fable e Claude Opus' },
    ] satisfies EtapaPipeline[],
  },
  negocio: {
    titulo: 'Agentes em produção para o negócio',
    texto: 'Automações em n8n ligadas a sistemas reais: WhatsApp, CRM e e-commerce.',
  },
  resultado: {
    titulo: 'Resultado',
    texto: 'Cinco produtos em produção, quatro deles construídos em algumas semanas cada.',
  },
};

export const infra = {
  titulo: 'Infraestrutura que mantenho',
  intro:
    'Sou desenvolvedor na MDO Prime desde janeiro de 2024 e também respondo pela infraestrutura.',
  itens: [
    'Servidores Linux e virtualização (KVM/Proxmox) para a MDO Prime e clientes',
    'Deploy de aplicações com Coolify e Docker',
    'Rede privada entre clientes com Tailscale e ACLs por cliente',
    'Servidores de arquivos Samba e Active Directory',
  ],
};

export const contato = {
  titulo: 'Contato',
  links: [
    { rotulo: 'luizotavioongaro@gmail.com', url: 'mailto:luizotavioongaro@gmail.com' },
    { rotulo: 'LinkedIn', url: 'https://www.linkedin.com/in/luiizong/' },
    { rotulo: 'GitHub', url: 'https://github.com/lynthz' },
  ] satisfies Link[],
};

export const site: {
  titulo: string;
  texto: string;
  repositorio: Link;
  /** PENDENTE */
  agente?: string;
  /** PENDENTE */
  tempo?: string;
} = {
  titulo: 'Como este site foi feito',
  texto:
    'Este portfólio foi construído com um agente de código a partir de um prompt mestre, com auditoria e revisão humanas.',
  repositorio: { rotulo: 'Repositório público', url: 'https://github.com/lynthz/portfolio' },
};
