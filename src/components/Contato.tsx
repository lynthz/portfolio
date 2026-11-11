import { contato, pessoa, site } from '../content';
import s from './Contato.module.css';
import { Fatos } from './Fatos';
import { LinkExterno } from './LinkExterno';

export function Contato() {
  return (
    <footer id="contato" aria-labelledby="contato-titulo" className={s.contato}>
      <div className={s.interior}>
        <h2 id="contato-titulo" className={s.titulo}>
          {contato.titulo}
        </h2>
        <ul className={s.links}>
          {contato.links.map((link) => (
            <li key={link.url}>
              <LinkExterno {...link} />
            </li>
          ))}
        </ul>
        <p className={s.sobre}>{pessoa.local}</p>
        <p className={s.sobre}>
          {pessoa.svulks.texto} <LinkExterno {...pessoa.svulks.link} />
        </p>

        <section aria-labelledby="site-titulo" className={s.nota}>
          <h2 id="site-titulo">{site.titulo}</h2>
          <p>{site.texto}</p>
          <Fatos
            fatos={[
              { rotulo: 'Agente usado', valor: site.agente },
              { rotulo: 'Tempo de construção', valor: site.tempo },
            ]}
          />
          <p>
            <LinkExterno {...site.repositorio} />
          </p>
        </section>
      </div>
    </footer>
  );
}
