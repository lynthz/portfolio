import { flow } from '../content';
import { Fatos } from './Fatos';
import { Imagem } from './Imagem';
import { LinkExterno } from './LinkExterno';

export function CasoFlow() {
  return (
    <section id="mdo-flow" aria-labelledby="mdo-flow-titulo">
      <h2 id="mdo-flow-titulo">{flow.titulo}</h2>
      <p>{flow.resumo}</p>

      <h3>O problema</h3>
      <p>{flow.problema}</p>

      <h3>O que foi construído</h3>
      <p>{flow.construido}</p>

      <h3>Uso real</h3>
      <Fatos fatos={flow.uso} />
      <Fatos fatos={flow.metricas} />

      <h3>Agentes de IA</h3>
      <ul>
        {flow.agentes.map((agente) => (
          <li key={agente.nome}>
            <h4>{agente.nome}</h4>
            <p>{agente.descricao}</p>
          </li>
        ))}
      </ul>
      <p>{flow.orquestracao}</p>

      <h3>Plataforma</h3>
      <ul>
        {flow.funcionalidades.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <h3>Stack</h3>
      <ul>
        {flow.stack.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <h3>Links</h3>
      <ul>
        {flow.links.map((link) => (
          <li key={link.url}>
            <LinkExterno {...link} />
          </li>
        ))}
      </ul>

      {flow.capturas.length > 0 && (
        <>
          <h3>Capturas de tela</h3>
          <ul>
            {flow.capturas.map((captura) => (
              <li key={captura.arquivo}>
                <Imagem {...captura} />
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}
