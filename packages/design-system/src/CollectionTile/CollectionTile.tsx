'use client';

import type { ElementType } from 'react';
import { CardLink } from '../CardLink';
import { mergeClasses, useCollectionTileStyles } from './CollectionTile.styles';

export interface CollectionTileProps {
  eyebrow: string;
  title: string;
  meta: string;
  href: string;
  as?: ElementType | undefined;
  /** Alternates background like the wireframe's `nth-child(2)` tone shift. */
  tone?: 'muted' | 'subtle';
}

/** Shelf tile inside a horizontally-scrolling collection row (wireframe `.collection`). */
export function CollectionTile({
  eyebrow,
  title,
  meta,
  href,
  as,
  tone = 'muted',
}: CollectionTileProps) {
  const styles = useCollectionTileStyles();
  return (
    <CardLink
      as={as}
      href={href}
      className={mergeClasses(styles.root, tone === 'subtle' ? styles.subtle : styles.muted)}
    >
      <span className={styles.eyebrow}>{eyebrow}</span>
      <h3 className={styles.title}>{title}</h3>
      <span className={styles.meta}>{meta}</span>
    </CardLink>
  );
}
