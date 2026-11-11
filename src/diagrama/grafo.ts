import type { NoId } from '../content';

/** Geometria do diagrama do percurso, em 2D (SVG) e 3D. Os textos ficam em `content.ts`. */
export type Ponto = readonly [x: number, y: number];
export type Ponto3 = readonly [x: number, y: number, z: number];

export const VISTA = { largura: 400, altura: 450 } as const;
export const NO = { largura: 150, altura: 70 } as const;

/** Centro de cada nó no SVG. */
export const nos: Record<NoId, Ponto> = {
  whatsapp: [100, 75],
  flow: [100, 235],
  agente: [300, 235],
  site: [300, 392],
};

/** Centro de cada nó na cena 3D. O eixo z é a profundidade do plano. */
export const nos3d: Record<NoId, Ponto3> = {
  whatsapp: [-2.2, 0.5, 0],
  flow: [-2.3, -0.6, -4.5],
  agente: [1.9, 0.9, -4.5],
  site: [2.3, -1.3, -9],
};

/** Topo de cada plano no SVG e profundidade no 3D, na ordem de `percurso.planos`. */
export const planos: readonly number[] = [0, 150, 325];
export const profundidades: readonly number[] = [0, -4.5, -9];

interface Aresta {
  de: NoId;
  para: NoId;
  pontos: readonly Ponto[];
  /** Altura da curva no 3D. */
  arco: number;
}

export const arestas: readonly Aresta[] = [
  {
    de: 'whatsapp',
    para: 'flow',
    arco: 0.4,
    pontos: [
      [100, 110],
      [100, 200],
    ],
  },
  {
    de: 'flow',
    para: 'agente',
    arco: 0.6,
    pontos: [
      [175, 235],
      [225, 235],
    ],
  },
  {
    de: 'agente',
    para: 'site',
    arco: 0.4,
    pontos: [
      [300, 270],
      [300, 357],
    ],
  },
  // O link leva a pessoa direto ao site, por fora do MDO Flow.
  {
    de: 'whatsapp',
    para: 'site',
    arco: 2.6,
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

/** Pares de nós percorridos no passo, no sentido da mensagem. */
export function pares(passo: number): [NoId, NoId][] {
  const caminho = caminhos[passo] ?? [];
  return caminho.slice(1).map((para, i) => [caminho[i] ?? para, para]);
}

export function aresta(de: NoId, para: NoId): Aresta {
  const achada = arestas.find(
    (a) => (a.de === de && a.para === para) || (a.de === para && a.para === de),
  );
  if (!achada) throw new Error(`Sem aresta entre ${de} e ${para}`);
  return achada;
}

/** Trechos do SVG percorridos no passo, já orientados no sentido da mensagem. */
export function trechos(passo: number): Ponto[][] {
  return pares(passo).map(([de, para]) => {
    const a = aresta(de, para);
    return a.de === de ? [...a.pontos] : [...a.pontos].reverse();
  });
}
