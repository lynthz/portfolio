import { ia } from '../content';
import s from './ComoTrabalho.module.css';
import { Secao } from './Secao';

export function ComoTrabalho() {
  return (
    <Secao id="ia" titulo={ia.titulo}>
      <h3 className={s.subtitulo}>{ia.pipeline.titulo}</h3>
      <p>{ia.pipeline.intro}</p>
      <ol className={s.etapas}>
        {ia.pipeline.etapas.map((etapa) => (
          <li key={etapa.titulo}>
            <h4>{etapa.titulo}</h4>
            <p>{etapa.ferramentas}</p>
          </li>
        ))}
      </ol>

      <div className={s.blocos}>
        {[ia.negocio, ia.resultado].map((bloco) => (
          <div key={bloco.titulo}>
            <h3 className={s.subtitulo}>{bloco.titulo}</h3>
            <p>{bloco.texto}</p>
          </div>
        ))}
      </div>
    </Secao>
  );
}
