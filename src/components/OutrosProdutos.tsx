import { outros } from '../content';
import { Fatos } from './Fatos';
import { Imagem } from './Imagem';
import s from './OutrosProdutos.module.css';
import { Secao } from './Secao';

export function OutrosProdutos() {
  return (
    <Secao id="outros-produtos" titulo={outros.titulo} intro={outros.intro}>
      <Fatos fatos={outros.fatos} />
      <p className={s.escala}>{outros.escala}</p>
      <ul className={s.produtos}>
        {outros.produtos.map((produto) => (
          <li key={produto.nome} className={s.produto}>
            <h3>{produto.nome}</h3>
            <div>
              <p>{produto.descricao}</p>
              {produto.stack && produto.stack.length > 0 && (
                <ul className={s.stack} aria-label={`Stack do ${produto.nome}`}>
                  {produto.stack.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
              {produto.captura && <Imagem {...produto.captura} />}
            </div>
          </li>
        ))}
      </ul>
    </Secao>
  );
}
