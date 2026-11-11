import type { NoId } from '../content';

/** Geometria do diagrama do percurso. Os textos ficam em `content.ts`. */
export type Ponto = readonly [x: number, y: number];

export const VISTA = { largura: 400, altura: 450 } as const;
export const NO = { largura: 150, altura: 70 } as const;

/** Centro de cada nó. */
export const nos: Record<NoId, Ponto> = {
  whatsapp: [100, 75],
  flow: [100, 235],
  agente: [300, 235],
  site: [300, 392],
};

/** Topo de cada plano, na ordem de `percurso.planos`. */
export const planos: readonly number[] = [0, 150, 325];

interface Aresta {
  de: NoId;
  para: NoId;
  pontos: readonly Ponto[];
}

export const arestas: readonly Aresta[] = [
  {
    de: 'whatsapp',
    para: 'flow',
    pontos: [
      [100, 110],
      [100, 200],
    ],
  },
  {
    de: 'flow',
    para: 'agente',
    pontos: [
      [175, 235],
      [225, 235],
    ],
  },
  {
    de: 'agente',
    para: 'site',
    pontos: [
      [300, 270],
      [300, 357],
    ],
  },
  // O link leva a pessoa direto ao site, por fora do MDO Flow.
  {
    de: 'whatsapp',
    para: 'site',
    pontos: [
      [175, 75],
      [390, 75],
      [390, 392],
      [375, 392],
    ],
  },
];

/** Nós percorridos pela mensagem em cada passo, na ordem de `percurso.passos`. */
export const caminhos: readonly (readonly NoId[])[] = [
  ['whatsapp'],
  ['whatsapp', 'flow', 'agente'],
  ['agente', 'site'],
  ['agente', 'flow', 'whatsapp'],
  ['whatsapp', 'site'],
];

/** Trechos percorridos no passo, já orientados no sentido da mensagem. */
export function trechos(passo: number): Ponto[][] {
  const caminho = caminhos[passo] ?? [];
  return caminho.slice(1).map((para, i) => {
    const de = caminho[i];
    const aresta = arestas.find(
      (a) => (a.de === de && a.para === para) || (a.de === para && a.para === de),
    );
    if (!aresta) throw new Error(`Sem aresta entre ${String(de)} e ${para}`);
    return aresta.de === de ? [...aresta.pontos] : [...aresta.pontos].reverse();
  });
}
