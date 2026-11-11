import { flow } from '../content';
import s from './CasoFlow.module.css';
import { Fatos } from './Fatos';
import { Imagem } from './Imagem';
import { LinkExterno } from './LinkExterno';
import { Secao } from './Secao';

export function CasoFlow() {
  return (
    <Secao id="mdo-flow" titulo={flow.titulo} intro={flow.resumo} variante="destaque">
      <div className={s.duas}>
        <div>
          <h3>O problema</h3>
          <p>{flow.problema}</p>
          <h3 className={s.seguinte}>O que foi construído</h3>
          <p>{flow.construido}</p>
        </div>
        <div>
          <h3>Uso real</h3>
          <Fatos fatos={flow.uso} />
          <Fatos fatos={flow.metricas} />
        </div>
      </div>

      <div className={s.grupo}>
        <h3>Agentes de IA</h3>
        <ul className={s.agentes}>
          {flow.agentes.map((agente) => (
            <li key={agente.nome}>
              <h4>{agente.nome}</h4>
              <p>{agente.descricao}</p>
            </li>
          ))}
        </ul>
        <p className={s.orquestracao}>{flow.orquestracao}</p>
      </div>

      <div className={s.grupo}>
        <div className={s.duas}>
          <div>
            <h3>Plataforma</h3>
            <ul className={s.funcionalidades}>
              {flow.funcionalidades.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Stack</h3>
            <ul className={s.stack}>
              {flow.stack.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <h3 className={s.seguinte}>Links</h3>
            <ul className={s.links}>
              {flow.links.map((link) => (
                <li key={link.url}>
                  <LinkExterno {...link} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {flow.capturas.length > 0 && (
        <div className={s.grupo}>
          <h3>Capturas de tela</h3>
          <ul className={s.galeria}>
            {flow.capturas.map((captura) => (
              <li key={captura.arquivo}>
                <Imagem {...captura} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </Secao>
  );
}
