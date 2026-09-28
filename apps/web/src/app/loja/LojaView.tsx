'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { SearchBox } from '@fluentui/react-components';
import {
  CollectionTile,
  EditorialCard,
  EmptyState,
  FilterChipGroup,
  Hero,
  ProductCard,
  ProductList,
  ProductListRow,
  SectionTabs,
} from '@blog/design-system';
import {
  categories,
  collections,
  editorialHighlights,
  exampleProducts,
  type CategoryValue,
} from './data';

const tabs = [
  { value: 'hoje', label: 'Destaques', icon: '▣' },
  { value: 'explorar', label: 'Explorar', icon: '◫' },
  { value: 'buscar', label: 'Buscar', icon: '⌕' },
] as const;

type ViewValue = (typeof tabs)[number]['value'];

/**
 * Loja interativa (ADR-007). Estrutura e comportamento seguem o protótipo do
 * usuário ("Executar Store S01"); catálogo é de exemplo (G17). Estilização
 * usa só `@blog/design-system`/`@blog/tokens` — o "design system interno" do
 * protótipo não foi usado (confirmado pelo usuário: "não misture as coisas").
 */
export function LojaView() {
  const [view, setView] = useState<ViewValue>('hoje');
  const [category, setCategory] = useState<CategoryValue>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredByCategory = useMemo(
    () =>
      category === 'all'
        ? exampleProducts
        : exampleProducts.filter((product) => product.category === category),
    [category],
  );

  const searchMatches = useMemo(() => {
    const term = searchTerm.trim().toLocaleLowerCase('pt-BR');
    if (!term) return [];
    return exampleProducts.filter((product) =>
      `${product.title} ${product.description}`.toLocaleLowerCase('pt-BR').includes(term),
    );
  }, [searchTerm]);

  return (
    <>
      <SectionTabs
        tabs={tabs}
        selectedValue={view}
        onSelect={(value) => setView(value as ViewValue)}
        ariaLabel="Seções da Loja"
      />

      {view === 'hoje' && (
        <section role="tabpanel" aria-label="Destaques">
          <Hero
            as={Link}
            href="/loja#explorar"
            ariaLabel="Destaque: Ferramenta de exemplo A — ver em Explorar"
            eyebrow="Destaque · exemplo"
            heading="Ferramenta de exemplo A para organizar seu dia"
            description="Texto ilustrativo do destaque. A descrição final será definida quando o catálogo real existir (G17)."
            ctaLabel="Ver produto"
            identityLabel="Ferramenta de exemplo A"
            identityInitial="A"
            mediaLabel="Mídia do destaque, placeholder"
          />

          <h2>Em destaque</h2>
          {editorialHighlights.map((item) => (
            <EditorialCard
              key={item.id}
              as={Link}
              href="/blog/artigos"
              ariaLabel={item.title}
              eyebrow={item.eyebrow}
              title={item.title}
              description={item.description}
              mediaIndex={item.mediaIndex}
              mediaLabel="Imagem de exemplo"
            />
          ))}

          <h2>Selecionados para você</h2>
          <ProductList aria-label="Selecionados para você">
            {exampleProducts.slice(0, 3).map((product) => (
              <ProductListRow
                key={product.id}
                as={Link}
                href="/loja#buscar"
                icon={product.icon}
                title={product.title}
                description={product.description}
                ctaLabel="Ver"
              />
            ))}
          </ProductList>

          <h2>Coleções</h2>
          {collections.map((collection, index) => (
            <CollectionTile
              key={collection.id}
              as={Link}
              href="/loja#explorar"
              eyebrow={collection.eyebrow}
              title={collection.title}
              meta="Explorar coleção →"
              tone={index % 2 === 0 ? 'muted' : 'subtle'}
            />
          ))}

          <EditorialCard
            as={Link}
            href="/blog/artigos"
            ariaLabel="Um olhar mais próximo sobre a seleção"
            eyebrow="História · exemplo"
            title="Um olhar mais próximo sobre a seleção"
            description="Espaço para uma história editorial em destaque, conectada a um artigo real do blog quando existir (G10)."
            mediaIndex="04"
            mediaLabel="Imagem editorial de exemplo"
            layout="split"
          />

          <h2>Mais para explorar</h2>
          <FilterChipGroup
            chips={categories}
            active={category}
            onChange={(value) => setCategory(value as CategoryValue)}
            ariaLabel="Filtrar produtos em Mais para explorar"
          />
          {filteredByCategory.length === 0 ? (
            <EmptyState
              title="Nenhum produto nesta categoria"
              description="O catálogo real ainda não existe (G17); tente outra categoria de exemplo."
            />
          ) : (
            filteredByCategory.map((product) => (
              <ProductCard
                key={product.id}
                as={Link}
                href="/loja#buscar"
                icon={product.icon}
                title={product.title}
                description={product.description}
                ctaLabel="Ver"
              />
            ))
          )}
        </section>
      )}

      {view === 'explorar' && (
        <section role="tabpanel" aria-label="Explorar">
          <h2>Explorar</h2>
          <p>Vitrine de exemplo. Use as categorias para filtrar os produtos de exemplo.</p>
          <FilterChipGroup
            chips={categories}
            active={category}
            onChange={(value) => setCategory(value as CategoryValue)}
            ariaLabel="Filtrar produtos em Explorar"
          />
          {filteredByCategory.length === 0 ? (
            <EmptyState
              title="Nenhum produto nesta categoria"
              description="O catálogo real ainda não existe (G17); tente outra categoria de exemplo."
            />
          ) : (
            filteredByCategory.map((product) => (
              <ProductCard
                key={product.id}
                as={Link}
                href="/loja#buscar"
                icon={product.icon}
                title={product.title}
                description={product.description}
                ctaLabel="Ver"
              />
            ))
          )}
        </section>
      )}

      {view === 'buscar' && (
        <section role="tabpanel" aria-label="Buscar">
          <h2>Buscar</h2>
          <SearchBox
            placeholder="Digite um nome ou categoria"
            value={searchTerm}
            onChange={(_event, data) => setSearchTerm(data.value)}
            aria-label="Buscar produtos de exemplo"
          />
          <div aria-live="polite">
            {searchTerm.trim() === '' ? (
              <p>Digite para buscar nos produtos de exemplo.</p>
            ) : searchMatches.length === 0 ? (
              <EmptyState
                title="Sem resultados"
                description="Tente outro nome ou categoria de exemplo."
              />
            ) : (
              <>
                <p>{searchMatches.length} resultado(s) de exemplo</p>
                <ProductList aria-label="Resultados da busca">
                  {searchMatches.map((product) => (
                    <ProductListRow
                      key={product.id}
                      as={Link}
                      href="/loja#buscar"
                      icon={product.icon}
                      title={product.title}
                      description={product.description}
                      ctaLabel="Ver"
                    />
                  ))}
                </ProductList>
              </>
            )}
          </div>
        </section>
      )}
    </>
  );
}
