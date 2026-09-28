'use client';

import { useEmptyStateStyles } from './EmptyState.styles';

export interface EmptyStateProps {
  title: string;
  description: string;
}

/** Empty/no-results message (Loja wireframe `.state-card`). */
export function EmptyState({ title, description }: EmptyStateProps) {
  const styles = useEmptyStateStyles();
  return (
    <div className={styles.root} role="status">
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{description}</p>
    </div>
  );
}
