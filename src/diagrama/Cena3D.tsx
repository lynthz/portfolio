import { Edges, Html, Line } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef, useState, type RefObject } from 'react';
import { DoubleSide, QuadraticBezierCurve3, Vector3, type Mesh } from 'three';
import { percurso, type NoId } from '../content';
import s from './Cena3D.module.css';
import { aresta, arestas, caminhos, nos3d, pares, profundidades } from './grafo';
import { marcarLento } from './usePode3D';

export type Modo = 'abertura' | 'percurso';

type Cores = Record<'fundo' | 'texto' | 'traco' | 'fio' | 'ambar', string>;

const PLANO = { largura: 7.6, altura: 3.6 } as const;
const FOV = 40;
const MEIA_VERTICAL = (FOV * Math.PI) / 360;
const CAIXA = { largura: 2.4, altura: 1.1 } as const;
const CENTRO = new Vector3(0, 0, -4.5);
/** Vista lateral oblíqua: de lado, de cima e um pouco de frente. */
const LATERAL = new Vector3(0.78, 0.5, 1).normalize();
const VISAO_GERAL = { posicao: CENTRO.clone().addScaledVector(LATERAL, 18), alvo: CENTRO };

/** Pontos que precisam caber no quadro: cantos dos nós e amostras das curvas que os ligam. */
function pontosDos(ids: readonly NoId[]): Vector3[] {
  const pontos: Vector3[] = [];
  for (const id of ids) {
    const [x, y, z] = nos3d[id];
    for (const dx of [-1, 1]) {
      for (const dy of [-1, 1]) {
        // Folga horizontal: o rótulo HTML é mais largo que a caixa.
        pontos.push(
          new Vector3(x + dx * (CAIXA.largura / 2 + 0.4), y + (dy * CAIXA.altura) / 2, z),
        );
      }
    }
  }
  for (const a of arestas) {
    if (ids.includes(a.de) && ids.includes(a.para))
      pontos.push(...curva(a.de, a.para).getPoints(16));
  }
  return pontos;
}

const TODOS: readonly NoId[] = ['whatsapp', 'flow', 'agente', 'site'];

const PONTOS_GERAIS = [
  ...pontosDos(TODOS),
  ...profundidades.flatMap((z) =>
    [-1, 1].flatMap((dx) =>
      [-1, 1].map((dy) => new Vector3((dx * PLANO.largura) / 2, (dy * PLANO.altura) / 2, z)),
    ),
  ),
];

const CIMA = new Vector3(0, 1, 0);

/**
 * Menor distância, ao longo de `direcao` a partir de `alvo`, em que todos os pontos cabem no quadro.
 * Para cada ponto: |lateral| <= tan(meio ângulo) x profundidade, com profundidade = d - v.direcao.
 */
function distanciaQueCabe(
  pontos: readonly Vector3[],
  alvo: Vector3,
  direcao: Vector3,
  aspecto: number,
) {
  const direita = new Vector3().crossVectors(CIMA, direcao).normalize();
  const cima = new Vector3().crossVectors(direcao, direita);
  const tanV = Math.tan(MEIA_VERTICAL);
  const tanH = tanV * aspecto;
  const v = new Vector3();
  let d = 0;
  for (const p of pontos) {
    v.subVectors(p, alvo);
    const frente = v.dot(direcao);
    d = Math.max(
      d,
      frente + Math.abs(v.dot(direita)) / tanH,
      frente + Math.abs(v.dot(cima)) / tanV,
    );
  }
  return d * 1.06;
}

function curva(de: NoId, para: NoId): QuadraticBezierCurve3 {
  const a = new Vector3(...nos3d[de]);
  const b = new Vector3(...nos3d[para]);
  const meio = a.clone().lerp(b, 0.5);
  meio.y += aresta(de, para).arco;
  return new QuadraticBezierCurve3(a, meio, b);
}

/**
 * Enquadramento do passo: a câmera desliza na direção do centro dos nós do passo,
 * mas o recuo é calculado sobre todos os nós e planos, então nada sai do quadro.
 */
function enquadramento(passo: number) {
  const ids = caminhos[passo] ?? [];
  const alvo = new Vector3();
  for (const id of ids) alvo.add(new Vector3(...nos3d[id]));
  alvo.divideScalar(Math.max(ids.length, 1)).lerp(CENTRO, 0.4);
  return { pontos: PONTOS_GERAIS, alvo };
}

function lerCores(el: HTMLElement): Cores {
  const estilo = getComputedStyle(el);
  const v = (nome: string) => estilo.getPropertyValue(`--${nome}`).trim();
  return {
    fundo: v('fundo'),
    texto: v('texto'),
    traco: v('traco'),
    fio: v('fio'),
    ambar: v('ambar'),
  };
}

/** Cores lidas dos tokens CSS do contêiner, relidas quando o tema do sistema muda. */
function useCores(ref: RefObject<HTMLElement | null>): Cores | undefined {
  const [cores, setCores] = useState<Cores>();
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const atualizar = () => {
      setCores(lerCores(el));
    };
    atualizar();
    const tema = matchMedia('(prefers-color-scheme: dark)');
    tema.addEventListener('change', atualizar);
    return () => {
      tema.removeEventListener('change', atualizar);
    };
  }, [ref]);
  return cores;
}

/** Renderiza só com a cena na tela e a aba visível. */
function useVisivel(ref: RefObject<HTMLElement | null>): boolean {
  const [naTela, setNaTela] = useState(false);
  const [abaVisivel, setAbaVisivel] = useState(!document.hidden);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observador = new IntersectionObserver(([entrada]) => {
      setNaTela(entrada?.isIntersecting ?? false);
    });
    observador.observe(el);
    const aba = () => {
      setAbaVisivel(!document.hidden);
    };
    document.addEventListener('visibilitychange', aba);
    return () => {
      observador.disconnect();
      document.removeEventListener('visibilitychange', aba);
    };
  }, [ref]);
  return naTela && abaVisivel;
}

function Camera({ modo, ativo }: { modo: Modo; ativo: number }) {
  const alvo = useRef(CENTRO.clone());
  const quadro = useMemo(
    () => (modo === 'abertura' ? { pontos: PONTOS_GERAIS, alvo: CENTRO } : enquadramento(ativo)),
    [modo, ativo],
  );
  const direcao = useRef(new Vector3());
  const posicao = useRef(new Vector3());
  useFrame(({ camera, clock, size }, delta) => {
    const k = 1 - Math.exp(-delta * 2.4);
    // Balanço lento em torno do eixo vertical; o recuo é recalculado para nada sair do quadro.
    const balanco = modo === 'abertura' ? Math.sin(clock.elapsedTime * 0.2) * 0.22 : 0;
    const dir = direcao.current.copy(LATERAL).applyAxisAngle(CIMA, balanco);
    const d = distanciaQueCabe(quadro.pontos, quadro.alvo, dir, size.width / size.height);
    camera.position.lerp(posicao.current.copy(quadro.alvo).addScaledVector(dir, d), k);
    alvo.current.lerp(quadro.alvo, k);
    camera.lookAt(alvo.current);
  });
  return null;
}

function Pulso({ curvas, cor }: { curvas: QuadraticBezierCurve3[]; cor: string }) {
  const ref = useRef<Mesh>(null);
  const halo = useRef<Mesh>(null);
  const t = useRef(0);
  useEffect(() => {
    t.current = 0;
  }, [curvas]);
  useFrame((_, delta) => {
    const bola = ref.current;
    const brilho = halo.current;
    if (!bola || !brilho) return;
    t.current = (t.current + delta * 0.8) % (curvas.length + 0.5);
    const i = Math.floor(t.current);
    const trecho = curvas[i];
    bola.visible = brilho.visible = trecho !== undefined;
    if (!trecho) return;
    trecho.getPoint(t.current - i, bola.position);
    brilho.position.copy(bola.position);
    brilho.scale.setScalar(1 + Math.sin(t.current * 12) * 0.25);
  });
  return (
    <>
      <mesh ref={ref}>
        <sphereGeometry args={[0.12, 20, 20]} />
        <meshBasicMaterial color={cor} />
      </mesh>
      <mesh ref={halo}>
        <sphereGeometry args={[0.3, 20, 20]} />
        <meshBasicMaterial color={cor} transparent opacity={0.25} depthWrite={false} />
      </mesh>
    </>
  );
}

function No({ id, ativo, cores }: { id: NoId; ativo: boolean; cores: Cores }) {
  const ref = useRef<Mesh>(null);
  useFrame((_, delta) => {
    const caixa = ref.current;
    if (!caixa) return;
    const escala = ativo ? 1.08 : 1;
    caixa.scale.setScalar(caixa.scale.x + (escala - caixa.scale.x) * Math.min(1, delta * 6));
  });
  return (
    <group position={nos3d[id]}>
      <mesh ref={ref}>
        <boxGeometry args={[CAIXA.largura, CAIXA.altura, 0.3]} />
        <meshBasicMaterial color={cores.fundo} />
        <Edges color={ativo ? cores.ambar : cores.traco} lineWidth={ativo ? 2.5 : 1.5} />
      </mesh>
      <Html center className={ativo ? s.rotuloAtivo : s.rotulo}>
        {percurso.nos[id]}
      </Html>
    </group>
  );
}

function Plano({ z, nome, cores }: { z: number; nome: string; cores: Cores }) {
  const { largura: l, altura: a } = PLANO;
  const borda: [number, number, number][] = [
    [-l / 2, -a / 2, 0],
    [l / 2, -a / 2, 0],
    [l / 2, a / 2, 0],
    [-l / 2, a / 2, 0],
    [-l / 2, -a / 2, 0],
  ];
  return (
    <group position={[0, 0, z]}>
      <mesh>
        <planeGeometry args={[l, a]} />
        <meshBasicMaterial
          color={cores.traco}
          transparent
          opacity={0.08}
          depthWrite={false}
          side={DoubleSide}
        />
      </mesh>
      <Line
        points={borda}
        color={cores.traco}
        lineWidth={1}
        dashed
        dashSize={0.15}
        gapSize={0.12}
      />
      <Html position={[-l / 2 + 0.15, a / 2 - 0.15, 0]} className={s.plano}>
        {nome}
      </Html>
    </group>
  );
}

/** Mede a taxa de quadros depois de 1 s de aquecimento; abaixo de 30 fps troca para o SVG. */
function Medidor() {
  const m = useRef({ tempo: 0, quadros: 0, feito: false });
  useFrame((_, delta) => {
    const atual = m.current;
    if (atual.feito || delta > 0.25) return;
    atual.tempo += delta;
    if (atual.tempo < 1) return;
    atual.quadros += 1;
    if (atual.tempo >= 3) {
      atual.feito = true;
      if (atual.quadros / (atual.tempo - 1) < 30) marcarLento();
    }
  });
  return null;
}

function Grafo({ ativo, modo, cores }: { ativo: number; modo: Modo; cores: Cores }) {
  const caminho = caminhos[ativo] ?? [];
  const curvas = useMemo(() => pares(ativo).map(([de, para]) => curva(de, para)), [ativo]);
  const linhas = useMemo(() => arestas.map((a) => curva(a.de, a.para).getPoints(48)), []);
  return (
    <>
      <Camera modo={modo} ativo={ativo} />
      {profundidades.map((z, i) => (
        <Plano key={z} z={z} nome={percurso.planos[i] ?? ''} cores={cores} />
      ))}
      {linhas.map((pontos, i) => (
        <Line key={i} points={pontos} color={cores.traco} lineWidth={1.5} />
      ))}
      {curvas.map((c, i) => (
        <Line
          key={`ativa-${String(i)}`}
          points={c.getPoints(48)}
          color={cores.ambar}
          lineWidth={3}
        />
      ))}
      <Pulso curvas={curvas} cor={cores.ambar} />
      {(Object.keys(nos3d) as NoId[]).map((id) => (
        <No key={id} id={id} ativo={caminho.includes(id)} cores={cores} />
      ))}
      <Medidor />
    </>
  );
}

export default function Cena3D({ ativo, modo }: { ativo: number; modo: Modo }) {
  const ref = useRef<HTMLDivElement>(null);
  const cores = useCores(ref);
  const visivel = useVisivel(ref);
  return (
    <div ref={ref} className={s.cena} data-modo={modo} aria-hidden="true">
      {cores && (
        <Canvas
          dpr={[1, 2]}
          frameloop={visivel ? 'always' : 'never'}
          camera={{ position: VISAO_GERAL.posicao.toArray(), fov: FOV }}
          gl={{ antialias: true, alpha: true }}
        >
          <Grafo ativo={ativo} modo={modo} cores={cores} />
        </Canvas>
      )}
    </div>
  );
}
