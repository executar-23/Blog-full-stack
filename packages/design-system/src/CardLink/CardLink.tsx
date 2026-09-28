'use client';

import type { AnchorHTMLAttributes, ElementType, ReactNode } from 'react';
import { mergeClasses, useCardLinkStyles } from './CardLink.styles';

export interface CardLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Renders as a different element (e.g. Next.js `Link`) while keeping the styling. */
  as?: ElementType | undefined;
  children: ReactNode;
  className?: string | undefined;
}

/**
 * Clickable card shell shared by `Hero`, `EditorialCard`, `CollectionTile`
 * and `ProductCard` (Loja wireframe `.card-link`, ADR-007).
 */
export function CardLink({ as: Component = 'a', className, children, ...rest }: CardLinkProps) {
  const styles = useCardLinkStyles();
  return (
    <Component className={mergeClasses(styles.root, className)} {...rest}>
      {children}
    </Component>
  );
}
