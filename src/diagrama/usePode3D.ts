import { useEffect, useState, useSyncExternalStore } from 'react';

// SVG abaixo de 768 px, sem WebGL, com movimento reduzido ou depois de medir quadros lentos.
const CONSULTA = '(min-width: 768px) and (prefers-reduced-motion: no-preference)';

let lento = false;
let webgl: boolean | undefined;
const ouvintes = new Set<() => void>();

/** Troca para o SVG uma única vez por visita, sem voltar ao 3D. */
export function marcarLento() {
  lento = true;
  for (const ouvinte of ouvintes) ouvinte();
}

function temWebGL(): boolean {
  if (webgl === undefined) {
    const contexto = document.createElement('canvas').getContext('webgl2');
    webgl = contexto !== null;
    contexto?.getExtension('WEBGL_lose_context')?.loseContext();
  }
  return webgl;
}

function inscrever(avisar: () => void) {
  const consulta = matchMedia(CONSULTA);
  consulta.addEventListener('change', avisar);
  ouvintes.add(avisar);
  return () => {
    consulta.removeEventListener('change', avisar);
    ouvintes.delete(avisar);
  };
}

const ler = () => !lento && matchMedia(CONSULTA).matches && temWebGL();

export function usePode3D(): boolean {
  return useSyncExternalStore(inscrever, ler, () => false);
}

/** Vira `true` quando o navegador fica ocioso depois da primeira pintura. */
export function useOcioso(ativo: boolean): boolean {
  const [ocioso, setOcioso] = useState(false);
  useEffect(() => {
    if (!ativo) return;
    const pronto = () => {
      setOcioso(true);
    };
    if (typeof requestIdleCallback === 'function') {
      const id = requestIdleCallback(pronto, { timeout: 2000 });
      return () => {
        cancelIdleCallback(id);
      };
    }
    const id = setTimeout(pronto, 300);
    return () => {
      clearTimeout(id);
    };
  }, [ativo]);
  return ocioso;
}
