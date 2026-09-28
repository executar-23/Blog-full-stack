'use client';

import type { ElementType } from 'react';
import { CardLink } from '../CardLink';
import { useProductCardStyles } from './ProductCard.styles';

export interface ProductCardProps {
  /** Single-letter/short initial shown in the icon placeholder (wireframe `.product-icon`). */
  icon: string;
  title: string;
  description: string;
  ctaLabel: string;
  href: string;
  as?: ElementType | undefined;
}

/** Grid product card (Loja wireframe `.product-card`, "Mais para explorar"). */
export function ProductCard({ icon, title, description, ctaLabel, href, as }: ProductCardProps) {
  const styles = useProductCardStyles();
  return (
    <CardLink as={as} href={href} aria-label={`${title}, ${ctaLabel}`} className={styles.root}>
      <span className={styles.icon} aria-hidden="true">
        {icon}
      </span>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      {/* Decorative: CardLink is already the interactive control. */}
      <span className={styles.cta} aria-hidden="true">
        {ctaLabel}
      </span>
    </CardLink>
  );
}
