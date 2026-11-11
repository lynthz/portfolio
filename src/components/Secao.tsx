import type { ReactNode } from 'react';
import s from './Secao.module.css';

interface Props {
  id: string;
  titulo: string;
  intro?: string;
  /** `ficha`: título à esquerda e conteúdo à direita. `larga`: título acima. `destaque`: larga, título maior. */
  variante?: 'ficha' | 'larga' | 'destaque';
  children: ReactNode;
}

export function Secao({ id, titulo, intro, variante = 'ficha', children }: Props) {
  return (
    <section id={id} aria-labelledby={`${id}-titulo`} className={s.secao}>
      <div className={s.interior} data-variante={variante}>
        <header>
          <h2 id={`${id}-titulo`} className={s.titulo}>
            {titulo}
          </h2>
          {intro && <p className={s.intro}>{intro}</p>}
        </header>
        <div>{children}</div>
      </div>
    </section>
  );
}
