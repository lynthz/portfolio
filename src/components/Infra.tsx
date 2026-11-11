import { infra } from '../content';

export function Infra() {
  return (
    <section id="infraestrutura" aria-labelledby="infraestrutura-titulo">
      <h2 id="infraestrutura-titulo">{infra.titulo}</h2>
      <p>{infra.intro}</p>
      <ul>
        {infra.itens.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
