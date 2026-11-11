import type { Captura } from '../content';

export function Imagem({ arquivo, alt, largura, altura }: Captura) {
  return (
    <img
      src={`${import.meta.env.BASE_URL}${arquivo}`}
      alt={alt}
      width={largura}
      height={altura}
      loading="lazy"
      decoding="async"
    />
  );
}
