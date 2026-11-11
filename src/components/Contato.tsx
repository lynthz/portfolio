import { contato, pessoa, site } from '../content';
import { Fatos } from './Fatos';
import { LinkExterno } from './LinkExterno';

export function Contato() {
  return (
    <footer id="contato" aria-labelledby="contato-titulo">
      <h2 id="contato-titulo">{contato.titulo}</h2>
      <ul>
        {contato.links.map((link) => (
          <li key={link.url}>
            <LinkExterno {...link} />
          </li>
        ))}
      </ul>
      <p>{pessoa.local}</p>
      <p>
        {pessoa.svulks.texto} <LinkExterno {...pessoa.svulks.link} />
      </p>

      <section aria-labelledby="site-titulo">
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
    </footer>
  );
}
