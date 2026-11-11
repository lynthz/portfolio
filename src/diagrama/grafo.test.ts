import { expect, test } from 'vitest';
import { percurso } from '../content';
import { caminhos, planos, trechos } from './grafo';

test('há um caminho por passo e um topo por plano', () => {
  expect(caminhos).toHaveLength(percurso.passos.length);
  expect(planos).toHaveLength(percurso.planos.length);
});

test('todo caminho usa arestas existentes, no sentido da mensagem', () => {
  caminhos.forEach((_, passo) => {
    expect(() => trechos(passo)).not.toThrow();
  });
  // Passo 4: a resposta volta do agente para o WhatsApp.
  expect(trechos(3)[1]?.at(-1)).toEqual([100, 110]);
});
