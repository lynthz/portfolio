import { useEffect, useState } from 'react';
import { movimentoReduzido } from '../animacao/useGsap';
import { abertura, navegacao, percurso, pessoa } from '../content';
import { Diagrama } from '../diagrama/Diagrama';
import s from './Abertura.module.css';

/** Na abertura o diagrama percorre os passos sozinho, como uma prévia do percurso. */
function DiagramaAbertura() {
  const [ativo, setAtivo] = useState(1);
  useEffect(() => {
    if (movimentoReduzido()) return;
    const id = setInterval(() => {
      setAtivo((passo) => (passo + 1) % percurso.passos.length);
    }, 3200);
    return () => {
      clearInterval(id);
    };
  }, []);
  return <Diagrama ativo={ativo} modo="abertura" />;
}

export function Abertura() {
  const { prova } = abertura;
  return (
    <header className={s.abertura} data-faixa>
      <div className={s.interior}>
        <nav aria-label="Seções" className={s.nav}>
          <ul>
            {navegacao.map((item) => (
              <li key={item.url}>
                <a href={item.url}>{item.rotulo}</a>
              </li>
            ))}
          </ul>
        </nav>
        <div className={s.grade}>
          <div className={s.texto}>
            <h1 className={s.nome}>{pessoa.nome}</h1>
            <p className={s.cargo}>{pessoa.cargo}</p>
            <p className={s.formacao}>{pessoa.formacao}</p>
            <p className={s.frase}>{pessoa.frase}</p>
            <div className={s.prova}>
              <p className={s.produto}>
                {prova.produto} <span className={s.status}>{prova.status}</span>
              </p>
              <ul className={s.numeros}>
                {prova.numeros.map((n) => (
                  <li key={n.valor}>
                    {n.antes && <span className={s.legenda}>{n.antes} </span>}
                    <strong className={s.valor}>{n.valor}</strong>
                    {n.depois && <span className={s.legenda}> {n.depois}</span>}
                  </li>
                ))}
              </ul>
            </div>
            <ul className={s.botoes}>
              {abertura.botoes.map((botao) => (
                <li key={botao.url}>
                  <a href={botao.url}>{botao.rotulo}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className={s.figura}>
            <DiagramaAbertura />
          </div>
        </div>
      </div>
    </header>
  );
}
