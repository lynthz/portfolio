import { abertura, navegacao, pessoa } from '../content';

export function Abertura() {
  return (
    <header>
      <nav aria-label="Seções">
        <ul>
          {navegacao.map((item) => (
            <li key={item.url}>
              <a href={item.url}>{item.rotulo}</a>
            </li>
          ))}
        </ul>
      </nav>
      <h1>{pessoa.nome}</h1>
      <p>{pessoa.cargo}</p>
      <p>{pessoa.formacao}</p>
      <p>{pessoa.frase}</p>
      <ul aria-label="Prova">
        {abertura.prova.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <ul>
        {abertura.botoes.map((botao) => (
          <li key={botao.url}>
            <a href={botao.url}>{botao.rotulo}</a>
          </li>
        ))}
      </ul>
    </header>
  );
}
