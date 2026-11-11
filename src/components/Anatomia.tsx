import { useState } from 'react';
import { useGsap } from '../animacao/useGsap';
import { anatomia } from '../content';
import s from './Anatomia.module.css';
import { Forma, IconeForma } from './Forma';

const EXPLOSAO = 0.3;

/**
 * Vista explodida do MDO Flow. A rolagem da página continua livre: o trilho alto dá espaço
 * para a pilha (sticky) se abrir e destacar uma camada por vez.
 */
export function Anatomia() {
  const [ativa, setAtiva] = useState(-1);
  const n = anatomia.camadas.length;
  const ref = useGsap<HTMLElement>((gsap, el) => {
    // shortcut: decide a largura só na montagem; redimensionar depois não reconfigura.
    if (!matchMedia('(min-width: 60rem)').matches) return;
    const meio = (n - 1) / 2;
    // O vão entre camadas acompanha a largura da placa, que o CSS ajusta à tela.
    const largura = el.querySelector<HTMLElement>('[data-giro]')?.offsetWidth ?? 384;
    const vao = largura * 0.32;
    gsap
      .timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: el.querySelector('[data-trilho]'),
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.8,
          onUpdate: ({ progress }) => {
            const p = (progress - EXPLOSAO) / (1 - EXPLOSAO);
            setAtiva(p < 0 ? -1 : Math.min(n - 1, Math.floor(p * n)));
          },
        },
      })
      .fromTo(
        '[data-camada]',
        { z: (i: number) => (meio - i) * vao * 0.08 },
        { z: (i: number) => (meio - i) * vao, duration: EXPLOSAO },
        0,
      )
      .fromTo('[data-giro]', { rotation: -52 }, { rotation: -38, duration: 1 }, 0)
      .fromTo(
        '[data-inclinacao]',
        { rotationX: 74, rotationY: -4 },
        { rotationX: 64, rotationY: -18, duration: 1 },
        0,
      );
  });

  return (
    <section
      ref={ref}
      id="anatomia"
      aria-labelledby="anatomia-titulo"
      className={s.anatomia}
      data-faixa
    >
      <div className={s.trilho} data-trilho>
        <div className={s.palco}>
          <div className={s.texto}>
            <h2 id="anatomia-titulo" className={s.titulo}>
              {anatomia.titulo}
            </h2>
            <p className={s.intro}>{anatomia.intro}</p>
            <ol className={s.lista}>
              {anatomia.camadas.map((camada, i) => (
                <li key={camada.nome} className={i === ativa ? s.itemAtivo : s.item}>
                  <IconeForma forma={camada.forma} className={s.icone} />
                  <div>
                    <h3>{camada.nome}</h3>
                    <ul className={s.itens}>
                      {camada.itens.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className={s.cena} aria-hidden="true">
            <div className={s.inclinacao} data-inclinacao>
              <div className={s.giro} data-giro>
                {anatomia.camadas.map((camada, i) => (
                  <div
                    key={camada.nome}
                    className={s.camada}
                    style={{ '--i': i, '--meio': (n - 1) / 2 } as React.CSSProperties}
                    data-camada
                  >
                    <div className={i === ativa ? s.placaAtiva : s.placa}>
                      <span className={s.nomeCamada}>{camada.nome}</span>
                      <svg viewBox="0 0 260 150" className={s.formas}>
                        {camada.itens.map((item, k) => (
                          <Forma
                            key={item}
                            forma={camada.forma}
                            x={130 + (k - (camada.itens.length - 1) / 2) * 46}
                            y={84}
                          />
                        ))}
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
