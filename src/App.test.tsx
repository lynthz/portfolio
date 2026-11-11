import { renderToStaticMarkup } from 'react-dom/server';
import { expect, test } from 'vitest';
import { App } from './App';
import { flow } from './content';

const html = renderToStaticMarkup(<App />);
const texto = html.replace(/<[^>]+>/g, ' ');

test('um único h1', () => {
  expect(html.match(/<h1/g)).toHaveLength(1);
});

test('campos PENDENTES vazios não aparecem', () => {
  for (const metrica of flow.metricas.filter((m) => !m.valor)) {
    expect(texto).not.toContain(metrica.rotulo);
  }
  expect(texto).not.toMatch(/PENDENTE|undefined|em breve|Agente usado|Tempo de construção/);
  expect(html).not.toContain('<dd></dd>');
  if (flow.capturas.length === 0) expect(html).not.toContain('<img');
});

test('nada proibido no conteúdo', () => {
  expect(texto).not.toMatch(/CompTIA|Security\+|certifica|inglês|Gemini|telefone|\(\d{2}\)\s?\d/i);
  expect(texto).not.toMatch(/apaixonad|inovador|expert/i);
  expect(texto).not.toContain('·');
});

test('fatos obrigatórios', () => {
  expect(texto).toContain('baseada no RustDesk');
  expect(texto).toContain('5 empresas');
  expect(texto).toContain('cerca de 60 usuários por dia');
  expect(texto).toContain('em produção desde jan/2025');
});

test('links externos com rel seguro', () => {
  const externos = html.match(/<a [^>]*target="_blank"[^>]*>/g) ?? [];
  expect(externos.length).toBeGreaterThan(0);
  for (const link of externos) expect(link).toContain('rel="noopener noreferrer"');
});
