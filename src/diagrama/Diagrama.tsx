import { lazy, Suspense } from 'react';
import type { Modo } from './Cena3D';
import { DiagramaSvg } from './DiagramaSvg';
import { useOcioso, usePode3D } from './usePode3D';

const Cena3D = lazy(() => import('./Cena3D'));

/** Mostra o SVG na hora e troca pela cena 3D quando ela pode rodar e o navegador está ocioso. */
export function Diagrama({ ativo, modo }: { ativo: number; modo: Modo }) {
  const pode = usePode3D();
  const ocioso = useOcioso(pode);
  const svg = <DiagramaSvg ativo={ativo} />;
  if (!pode || !ocioso) return svg;
  return (
    <Suspense fallback={svg}>
      <Cena3D ativo={ativo} modo={modo} />
    </Suspense>
  );
}
