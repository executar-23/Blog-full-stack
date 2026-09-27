import { Title2 } from './fluent';

/** Structural shell; editorial screens come from the wireframes (G5). */
export function ScaffoldPage({ title }: { title: string }) {
  return (
    <main id="conteudo">
      <Title2 as="h1">{title}</Title2>
    </main>
  );
}
