/**
 * Catálogo de exemplo da Loja (G17 — catálogo real, preços e checkout ainda
 * não existem). Rotulagem "de exemplo" propositalmente explícita, no mesmo
 * padrão do protótipo do usuário ("Executar Store S01"): nenhum produto,
 * preço ou provedor real é inventado aqui.
 */

export const categories = [
  { value: 'all', label: 'Todos' },
  { value: 'ferramentas', label: 'Ferramentas' },
  { value: 'ebooks', label: 'E-books' },
  { value: 'solucoes', label: 'Soluções' },
] as const;

export type CategoryValue = (typeof categories)[number]['value'];

export interface ExampleProduct {
  id: string;
  icon: string;
  title: string;
  description: string;
  category: Exclude<CategoryValue, 'all'>;
}

export const exampleProducts: readonly ExampleProduct[] = [
  {
    id: 'produto-a',
    icon: 'A',
    title: 'Ferramenta de exemplo A',
    description: 'Ferramentas · exemplo',
    category: 'ferramentas',
  },
  {
    id: 'produto-b',
    icon: 'B',
    title: 'E-book de exemplo B',
    description: 'E-books · exemplo',
    category: 'ebooks',
  },
  {
    id: 'produto-c',
    icon: 'C',
    title: 'Solução de exemplo C',
    description: 'Soluções · exemplo',
    category: 'solucoes',
  },
  {
    id: 'produto-d',
    icon: 'D',
    title: 'Ferramenta de exemplo D',
    description: 'Ferramentas · exemplo',
    category: 'ferramentas',
  },
] as const;

export const editorialHighlights = [
  {
    id: 'editorial-1',
    eyebrow: 'Editorial',
    title: 'Uma seleção para começar',
    description: 'Conteúdo editorial de exemplo, conectado aos artigos do blog.',
    mediaIndex: '01',
  },
  {
    id: 'editorial-2',
    eyebrow: 'Guia',
    title: 'Ideias para sua rotina',
    description: 'Conteúdo editorial de exemplo, conectado aos artigos do blog.',
    mediaIndex: '02',
  },
  {
    id: 'editorial-3',
    eyebrow: 'Descubra',
    title: 'Novos caminhos para explorar',
    description: 'Conteúdo editorial de exemplo, conectado aos artigos do blog.',
    mediaIndex: '03',
  },
] as const;

export const collections = [
  {
    id: 'colecao-ferramentas',
    eyebrow: 'Coleção de exemplo',
    title: 'Ferramentas para o dia a dia',
  },
  { id: 'colecao-ebooks', eyebrow: 'Coleção de exemplo', title: 'E-books para aprofundar' },
  { id: 'colecao-solucoes', eyebrow: 'Coleção de exemplo', title: 'Soluções prontas para aplicar' },
] as const;
