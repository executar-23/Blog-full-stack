'use client';

import type { ElementType, ReactNode } from 'react';
import {
  mergeClasses,
  useProductListRowStyles,
  useProductListStyles,
} from './ProductListRow.styles';

export interface ProductListProps {
  children: ReactNode;
  'aria-label'?: string;
}

/** List container for `ProductListRow` (Loja wireframe `.product-list`). */
export function ProductList({ children, ...rest }: ProductListProps) {
  const styles = useProductListStyles();
  return (
    <div role="list" className={styles.root} {...rest}>
      {children}
    </div>
  );
}

export interface ProductListRowProps {
  icon: string;
  title: string;
  description: string;
  ctaLabel: string;
  href: string;
  as?: ElementType | undefined;
}

/** Single row inside `ProductList` (Loja wireframe `.product-row`). */
export function ProductListRow({
  icon,
  title,
  description,
  ctaLabel,
  href,
  as: Component = 'a',
}: ProductListRowProps) {
  const styles = useProductListRowStyles();
  return (
    <div role="listitem">
      <Component
        href={href}
        aria-label={`${title}, ${ctaLabel}`}
        className={mergeClasses(styles.root)}
      >
        <span className={styles.icon} aria-hidden="true">
          {icon}
        </span>
        <span className={styles.copy}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.description}>{description}</p>
        </span>
        {/* Decorative: the row itself is the interactive control. */}
        <span className={styles.cta} aria-hidden="true">
          {ctaLabel}
        </span>
      </Component>
    </div>
  );
}
