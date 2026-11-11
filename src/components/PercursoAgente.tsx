import { useEffect, useRef, useState } from 'react';
import { percurso } from '../content';
import { DiagramaSvg } from '../diagrama/DiagramaSvg';
import s from './PercursoAgente.module.css';
import { Secao } from './Secao';

export function PercursoAgente() {
  const [ativo, setAtivo] = useState(0);
  const lista = useRef<HTMLOListElement>(null);

  // O passo que cruza o meio da tela vira o ativo. A rolagem da página não é alterada.
  useEffect(() => {
    const itens = lista.current?.children;
    if (!itens) return;
    const observador = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          if (entrada.isIntersecting && entrada.target instanceof HTMLElement) {
            setAtivo(Number(entrada.target.dataset.passo));
          }
        }
      },
      { rootMargin: '-45% 0px -45% 0px' },
    );
    for (const item of itens) observador.observe(item);
    return () => {
      observador.disconnect();
    };
  }, []);

  return (
    <Secao id="percurso" titulo={percurso.titulo} intro={percurso.intro} variante="larga">
      <div className={s.grade}>
        <ol ref={lista} className={s.passos}>
          {percurso.passos.map((passo, i) => (
            <li key={passo} data-passo={i}>
              <button
                type="button"
                className={s.passo}
                aria-current={i === ativo ? 'step' : undefined}
                onClick={() => {
                  setAtivo(i);
                }}
              >
                {passo}
              </button>
            </li>
          ))}
        </ol>
        <div className={s.figura}>
          <DiagramaSvg ativo={ativo} />
        </div>
      </div>
    </Secao>
  );
}
