import { abertura, navegacao, pessoa } from '../content';
import s from './Abertura.module.css';

export function Abertura() {
  const { prova } = abertura;
  return (
    <header className={s.abertura}>
      <nav aria-label="Seções" className={s.nav}>
        <ul>
          {navegacao.map((item) => (
            <li key={item.url}>
              <a href={item.url}>{item.rotulo}</a>
            </li>
          ))}
        </ul>
      </nav>
      <h1 className={s.nome}>{pessoa.nome}</h1>
      <p className={s.cargo}>{pessoa.cargo}</p>
      <p className={s.formacao}>{pessoa.formacao}</p>
      <p className={s.frase}>{pessoa.frase}</p>
      <ul className={s.prova}>
        <li className={s.produto}>{prova.produto}</li>
        <li>
          <span className={s.status}>{prova.status}</span> {prova.desde}
        </li>
        {prova.numeros.map((numero) => (
          <li key={numero}>{numero}</li>
        ))}
      </ul>
      <ul className={s.botoes}>
        {abertura.botoes.map((botao) => (
          <li key={botao.url}>
            <a href={botao.url}>{botao.rotulo}</a>
          </li>
        ))}
      </ul>
    </header>
  );
}
