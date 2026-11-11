import type { gsap as Gsap } from 'gsap';
import { useEffect, useRef } from 'react';

type G = typeof Gsap;

let carga: Promise<G> | undefined;

/** GSAP fica fora do bundle inicial: só baixa quando um componente animado monta. */
function carregar(): Promise<G> {
  carga ??= Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(
    ([{ gsap }, { ScrollTrigger }]) => {
      gsap.registerPlugin(ScrollTrigger);
      return gsap;
    },
  );
  return carga;
}

export const movimentoReduzido = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Monta animações GSAP no elemento da ref, dentro de um `gsap.context` desfeito na desmontagem.
 * Com movimento reduzido nada é animado e o conteúdo fica no estado final.
 */
export function useGsap<T extends HTMLElement>(montar: (gsap: G, el: T) => void) {
  const ref = useRef<T>(null);
  const montarRef = useRef(montar);
  useEffect(() => {
    const el = ref.current;
    if (!el || movimentoReduzido()) return;
    let vivo = true;
    let contexto: ReturnType<G['context']> | undefined;
    void carregar().then((gsap) => {
      if (vivo) {
        contexto = gsap.context(() => {
          montarRef.current(gsap, el);
        }, el);
      }
    });
    return () => {
      vivo = false;
      contexto?.revert();
    };
  }, []);
  return ref;
}
