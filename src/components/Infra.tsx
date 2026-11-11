import { infra } from '../content';
import s from './Infra.module.css';
import { Secao } from './Secao';

export function Infra() {
  return (
    <Secao id="infraestrutura" titulo={infra.titulo} intro={infra.intro}>
      <ul className={s.itens}>
        {infra.itens.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </Secao>
  );
}
