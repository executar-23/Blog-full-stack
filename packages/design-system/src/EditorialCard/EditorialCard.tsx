'use client';

import type { ElementType, ReactNode } from 'react';
import { CardLink } from '../CardLink';
import { mergeClasses, useEditorialCardStyles } from './EditorialCard.styles';

export interface EditorialCardProps {
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  as?: ElementType | undefined;
  /** Short index/label shown over the media placeholder (e.g. "01"). */
  mediaIndex: string;
  mediaLabel: ReactNode;
  ariaLabel: string;
  /** `split`: large two-column variant (wireframe `.large-editorial`). */
  layout?: 'grid' | 'split';
}

/**
 * Editorial card (Loja wireframe `.editorial-art`/`.editorial-body`, plus the
 * large `.large-editorial` spotlight via `layout="split"`). No real article
 * exists yet (G10) — `href` should point to `/blog/artigos`, never a slug.
 */
export function EditorialCard({
  eyebrow,
  title,
  description,
  href,
  as,
  mediaIndex,
  mediaLabel,
  ariaLabel,
  layout = 'grid',
}: EditorialCardProps) {
  const styles = useEditorialCardStyles();
  const split = layout === 'split';
  return (
    <CardLink
      as={as}
      href={href}
      aria-label={ariaLabel}
      className={mergeClasses(split ? styles.split : styles.grid)}
    >
      <div className={mergeClasses(styles.media, split && styles.mediaSplit)} aria-hidden="true">
        <div>
          <strong className={styles.mediaIndex}>{mediaIndex}</strong>
          {mediaLabel}
        </div>
      </div>
      <div className={mergeClasses(styles.body, split && styles.bodySplit)}>
        <span className={styles.eyebrow}>{eyebrow}</span>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>
    </CardLink>
  );
}
