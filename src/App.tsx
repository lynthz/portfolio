import { Abertura } from './components/Abertura';
import { CasoFlow } from './components/CasoFlow';
import { ComoTrabalho } from './components/ComoTrabalho';
import { Contato } from './components/Contato';
import { Infra } from './components/Infra';
import { OutrosProdutos } from './components/OutrosProdutos';
import { PercursoAgente } from './components/PercursoAgente';

export function App() {
  return (
    <>
      <Abertura />
      <main>
        <CasoFlow />
        <PercursoAgente />
        <OutrosProdutos />
        <ComoTrabalho />
        <Infra />
      </main>
      <Contato />
    </>
  );
}
