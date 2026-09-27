import { Title2 } from './fluent';

/**
 * Structural page shell for AIKB-0003 routes. Content and composition come
 * from the wireframes (G5); no visual content is invented here.
 */
export function ScaffoldPage({ title }: { title: string }) {
  return (
    <main id="conteudo">
      <Title2 as="h1">{title}</Title2>
    </main>
  );
}
