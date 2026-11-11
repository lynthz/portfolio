import { useGsap } from '../animacao/useGsap';
import { ia } from '../content';
import s from './ComoTrabalho.module.css';
import { Secao } from './Secao';

function Pipeline() {
  // O trilho se desenha com a rolagem e as estações acendem em sequência.
  const ref = useGsap<HTMLOListElement>((gsap, el) => {
    const gatilho = { trigger: el, start: 'top 75%', end: 'bottom 55%', scrub: 0.6 };
    gsap.fromTo(el, { '--trilho': 0 }, { '--trilho': 1, ease: 'none', scrollTrigger: gatilho });
    gsap.from(el.querySelectorAll('[data-estacao]'), {
      scale: 0,
      duration: 0.6,
      ease: 'back.out(2)',
      stagger: 0.25,
      scrollTrigger: { trigger: el, start: 'top 75%' },
    });
  });
  return (
    <ol ref={ref} className={s.etapas}>
      {ia.pipeline.etapas.map((etapa) => (
        <li key={etapa.titulo}>
          <span className={s.estacao} data-estacao aria-hidden="true" />
          <h4>{etapa.titulo}</h4>
          <p>{etapa.ferramentas}</p>
        </li>
      ))}
    </ol>
  );
}

export function ComoTrabalho() {
  return (
    <Secao id="ia" titulo={ia.titulo} faixa>
      <h3 className={s.subtitulo}>{ia.pipeline.titulo}</h3>
      <p className={s.texto}>{ia.pipeline.intro}</p>
      <Pipeline />
      <div className={s.blocos}>
        {[ia.negocio, ia.resultado].map((bloco) => (
          <div key={bloco.titulo}>
            <h3 className={s.subtitulo}>{bloco.titulo}</h3>
            <p className={s.texto}>{bloco.texto}</p>
          </div>
        ))}
      </div>
    </Secao>
  );
}
