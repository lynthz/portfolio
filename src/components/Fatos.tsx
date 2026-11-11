import type { Fato } from '../content';

/** Lista de fatos. Fato sem `valor` (PENDENTE) não aparece; lista vazia não renderiza nada. */
export function Fatos({ fatos }: { fatos: Fato[] }) {
  const preenchidos = fatos.filter((fato) => fato.valor);
  if (preenchidos.length === 0) return null;
  return (
    <dl>
      {preenchidos.map((fato) => (
        <div key={fato.rotulo}>
          <dt>{fato.rotulo}</dt>
          <dd>{fato.valor}</dd>
        </div>
      ))}
    </dl>
  );
}
