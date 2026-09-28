'use client';

import type { ElementType, ReactNode } from 'react';
import { CardLink } from '../CardLink';
import { useHeroStyles } from './Hero.styles';

export interface HeroProps {
  eyebrow: string;
  heading: string;
  description: string;
  ctaLabel: string;
  href: string;
  /** Renders the CTA/root link as a different element (e.g. Next.js `Link`). */
  as?: ElementType | undefined;
  identityLabel: string;
  identityInitial: string;
  mediaLabel: ReactNode;
  ariaLabel: string;
}

/**
 * Marketing hero for the Loja (wireframe `.hero`, ADR-007): whole card is a
 * link to the destination, per the wireframe's own `<a class="hero card-link">`.
 */
export function Hero({
  eyebrow,
  heading,
  description,
  ctaLabel,
  href,
  as,
  identityLabel,
  identityInitial,
  mediaLabel,
  ariaLabel,
}: HeroProps) {
  const styles = useHeroStyles();
  return (
    <CardLink as={as} href={href} aria-label={ariaLabel} className={styles.root}>
      <div>
        <span className={styles.eyebrow}>{eyebrow}</span>
        <h2 className={styles.heading}>{heading}</h2>
        <p className={styles.description}>{description}</p>
        <div className={styles.bottom}>
          <span className={styles.identity}>
            <span className={styles.identityIcon} aria-hidden="true">
              {identityInitial}
            </span>
            {identityLabel}
          </span>
          {/* Decorative: the whole card is already the link (CardLink), so this
              is a styled span, never a nested interactive control. */}
          <span className={styles.cta} aria-hidden="true">
            {ctaLabel}
          </span>
        </div>
      </div>
      <div className={styles.media} aria-hidden="true">
        {mediaLabel}
      </div>
    </CardLink>
  );
}
