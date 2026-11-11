import type { Link } from '../content';

export function LinkExterno({ rotulo, url }: Link) {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer">
      {rotulo}
    </a>
  );
}
