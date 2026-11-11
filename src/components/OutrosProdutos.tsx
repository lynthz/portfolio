import { outros } from '../content';
import { Fatos } from './Fatos';
import { Imagem } from './Imagem';

export function OutrosProdutos() {
  return (
    <section id="outros-produtos" aria-labelledby="outros-produtos-titulo">
      <h2 id="outros-produtos-titulo">{outros.titulo}</h2>
      <p>{outros.intro}</p>
      <Fatos fatos={outros.fatos} />
      <p>{outros.escala}</p>
      <ul>
        {outros.produtos.map((produto) => (
          <li key={produto.nome}>
            <h3>{produto.nome}</h3>
            <p>{produto.descricao}</p>
            {produto.stack && produto.stack.length > 0 && (
              <ul aria-label={`Stack do ${produto.nome}`}>
                {produto.stack.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
            {produto.captura && <Imagem {...produto.captura} />}
          </li>
        ))}
      </ul>
    </section>
  );
}
