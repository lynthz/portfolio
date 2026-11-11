import { percurso } from '../content';

export function PercursoAgente() {
  return (
    <section id="percurso" aria-labelledby="percurso-titulo">
      <h2 id="percurso-titulo">{percurso.titulo}</h2>
      <p>{percurso.intro}</p>
      <ol>
        {percurso.passos.map((passo) => (
          <li key={passo.titulo}>
            <h3>{passo.titulo}</h3>
            <p>{passo.descricao}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
