import { percurso, type NoId } from '../content';
import s from './DiagramaSvg.module.css';
import { arestas, caminhos, NO, nos, planos, trechos, VISTA, type Ponto } from './grafo';

const LINHA = 17;
const COLUNAS = 15;

/** Quebra o rótulo em linhas que cabem no nó. */
function quebrar(texto: string): string[] {
  const linhas: string[] = [];
  for (const palavra of texto.split(' ')) {
    const ultima = linhas.at(-1);
    if (ultima !== undefined && `${ultima} ${palavra}`.length <= COLUNAS) {
      linhas[linhas.length - 1] = `${ultima} ${palavra}`;
    } else {
      linhas.push(palavra);
    }
  }
  return linhas;
}

const comoPontos = (pontos: readonly Ponto[]) => pontos.map((p) => p.join(',')).join(' ');

/** Versão estática do percurso. Decorativa: a lista de passos traz o mesmo conteúdo. */
export function DiagramaSvg({ ativo }: { ativo: number }) {
  const caminho = caminhos[ativo] ?? [];
  return (
    <svg
      className={s.diagrama}
      viewBox={`0 0 ${String(VISTA.largura)} ${String(VISTA.altura)}`}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <marker
          id="seta"
          viewBox="0 0 8 8"
          refX="7"
          refY="4"
          markerWidth="5"
          markerHeight="5"
          orient="auto"
        >
          <path className={s.seta} d="M0 0 8 4 0 8z" />
        </marker>
      </defs>

      {planos.map((topo, i) => (
        <g key={topo}>
          {topo > 0 && (
            <line className={s.divisoria} x1="0" x2={VISTA.largura} y1={topo} y2={topo} />
          )}
          <text className={s.plano} x="8" y={topo + 22}>
            {percurso.planos[i]}
          </text>
        </g>
      ))}

      {arestas.map((aresta) => (
        <polyline
          key={`${aresta.de}-${aresta.para}`}
          className={s.aresta}
          points={comoPontos(aresta.pontos)}
        />
      ))}

      {trechos(ativo).map((pontos) => (
        <polyline
          key={comoPontos(pontos)}
          className={s.transito}
          points={comoPontos(pontos)}
          markerEnd="url(#seta)"
        />
      ))}

      {(Object.keys(nos) as NoId[]).map((id) => {
        const [x, y] = nos[id];
        const linhas = quebrar(percurso.nos[id]);
        const primeira = y - ((linhas.length - 1) * LINHA) / 2;
        return (
          <g key={id} className={caminho.includes(id) ? s.noAtivo : s.no}>
            <rect
              x={x - NO.largura / 2}
              y={y - NO.altura / 2}
              width={NO.largura}
              height={NO.altura}
            />
            <text x={x} y={primeira} textAnchor="middle" dominantBaseline="central">
              {linhas.map((linha, i) => (
                <tspan key={linha} x={x} dy={i === 0 ? 0 : LINHA}>
                  {linha}
                </tspan>
              ))}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
