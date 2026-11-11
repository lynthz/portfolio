import type { ReactNode } from 'react';
import { useGsap } from '../animacao/useGsap';
import s from './Secao.module.css';

interface Props {
  id: string;
  titulo: string;
  intro?: string;
  /** `ficha`: título à esquerda e conteúdo à direita. `larga`: título acima. `destaque`: larga, título maior. */
  variante?: 'ficha' | 'larga' | 'destaque';
  faixa?: boolean;
  children: ReactNode;
}

export function Secao({ id, titulo, intro, variante = 'ficha', faixa, children }: Props) {
  // Entrada em cascata: título, introdução e cada bloco do conteúdo.
  const ref = useGsap<HTMLElement>((gsap, el) => {
    gsap.from(el.querySelectorAll('[data-revelar], [data-revelar-filhos] > *'), {
      y: 48,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out',
      stagger: 0.08,
      scrollTrigger: { trigger: el, start: 'top 80%' },
    });
  });
  return (
    <section
      ref={ref}
      id={id}
      aria-labelledby={`${id}-titulo`}
      className={s.secao}
      data-faixa={faixa ? '' : undefined}
    >
      <div className={s.interior} data-variante={variante}>
        <header data-revelar>
          <h2 id={`${id}-titulo`} className={s.titulo}>
            {titulo}
          </h2>
          {intro && <p className={s.intro}>{intro}</p>}
        </header>
        <div data-revelar-filhos>{children}</div>
      </div>
    </section>
  );
}
