import type { Fato } from '../content';
import s from './Fatos.module.css';

/** Lista de fatos. Fato sem `valor` (PENDENTE) não aparece; lista vazia não renderiza nada. */
export function Fatos({ fatos }: { fatos: Fato[] }) {
  const preenchidos = fatos.filter((fato) => fato.valor);
  if (preenchidos.length === 0) return null;
  return (
    <dl className={s.fatos}>
      {preenchidos.map((fato) => (
        <div key={fato.rotulo} className={s.fato}>
          <dt>{fato.rotulo}</dt>
          <dd>{fato.valor}</dd>
        </div>
      ))}
    </dl>
  );
}
