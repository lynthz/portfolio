import { ia } from '../content';

export function ComoTrabalho() {
  return (
    <section id="ia" aria-labelledby="ia-titulo">
      <h2 id="ia-titulo">{ia.titulo}</h2>

      <h3>{ia.pipeline.titulo}</h3>
      <p>{ia.pipeline.intro}</p>
      <ol>
        {ia.pipeline.etapas.map((etapa) => (
          <li key={etapa.titulo}>
            <h4>{etapa.titulo}</h4>
            <p>{etapa.ferramentas}</p>
          </li>
        ))}
      </ol>

      <h3>{ia.negocio.titulo}</h3>
      <p>{ia.negocio.texto}</p>

      <h3>{ia.resultado.titulo}</h3>
      <p>{ia.resultado.texto}</p>
    </section>
  );
}
