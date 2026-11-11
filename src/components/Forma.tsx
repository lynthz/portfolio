import type { Forma as TipoForma } from '../content';

const R = 16;
const hexagono = Array.from({ length: 6 }, (_, k) => {
  const a = (Math.PI / 3) * k + Math.PI / 6;
  return `${(Math.cos(a) * R).toFixed(2)},${(Math.sin(a) * R).toFixed(2)}`;
}).join(' ');

const desenhos: Record<TipoForma, React.JSX.Element> = {
  circulo: <circle r={R} />,
  quadrado: <rect x={-14} y={-14} width={28} height={28} />,
  hexagono: <polygon points={hexagono} />,
  losango: <polygon points="0,-18 18,0 0,18 -18,0" />,
  triangulo: <polygon points="0,-16 17,13 -17,13" />,
};

/** Forma geométrica de uma camada, centrada na origem. Use dentro de um `<svg>` ou sozinha. */
export function Forma({ forma, x = 0, y = 0 }: { forma: TipoForma; x?: number; y?: number }) {
  return <g transform={`translate(${String(x)} ${String(y)})`}>{desenhos[forma]}</g>;
}

export function IconeForma({ forma, className }: { forma: TipoForma; className?: string }) {
  return (
    <svg className={className} viewBox="-20 -20 40 40" aria-hidden="true" focusable="false">
      <Forma forma={forma} />
    </svg>
  );
}
