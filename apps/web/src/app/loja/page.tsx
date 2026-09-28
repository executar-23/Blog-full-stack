import { Title2 } from '../../components/fluent';
import { pageMetadata } from '../../seo';
import { LojaView } from './LojaView';

/** ADR-007: seção Loja, fora da árvore AIKB-0003. Catálogo é de exemplo (G17). */
export const metadata = pageMetadata('/loja', 'Loja');

export default function Page() {
  return (
    <main id="conteudo">
      <Title2 as="h1">Loja</Title2>
      <LojaView />
    </main>
  );
}
