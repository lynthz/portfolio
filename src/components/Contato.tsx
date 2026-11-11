import { contato, pessoa } from '../content';
import s from './Contato.module.css';
import { LinkExterno } from './LinkExterno';

export function Contato() {
  return (
    <footer id="contato" aria-labelledby="contato-titulo" className={s.contato} data-faixa>
      <div className={s.interior}>
        <h2 id="contato-titulo" className={s.titulo}>
          {contato.titulo}
        </h2>
        <p className={s.email}>
          <a href={contato.email.url}>{contato.email.rotulo}</a>
        </p>
        <ul className={s.links}>
          {contato.links.map((link) => (
            <li key={link.url}>
              <LinkExterno {...link} />
            </li>
          ))}
        </ul>
        <div className={s.sobre}>
          <p>{pessoa.local}</p>
          <p>
            {pessoa.svulks.texto} <LinkExterno {...pessoa.svulks.link} />
          </p>
        </div>
      </div>
    </footer>
  );
}
