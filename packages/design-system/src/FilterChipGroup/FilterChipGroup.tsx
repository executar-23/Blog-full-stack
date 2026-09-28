'use client';

import { ToggleButton } from '@fluentui/react-components';
import { useFilterChipGroupStyles } from './FilterChipGroup.styles';

export interface FilterChip {
  value: string;
  label: string;
}

export interface FilterChipGroupProps {
  chips: readonly FilterChip[];
  active: string;
  onChange: (value: string) => void;
  ariaLabel: string;
}

/**
 * Category filter chips (Loja wireframe `.filters`/`.chip`). Composes
 * Fluent's `ToggleButton` (native `aria-pressed`), shaped as a pill —
 * `radius-pill` isn't in the identity's radius scale (sm/md/lg only), so this
 * uses Fluent's own `shape="circular"` instead of inventing a token.
 */
export function FilterChipGroup({ chips, active, onChange, ariaLabel }: FilterChipGroupProps) {
  const styles = useFilterChipGroupStyles();
  return (
    <div className={styles.root} role="group" aria-label={ariaLabel}>
      {chips.map((chip) => (
        <ToggleButton
          key={chip.value}
          className={styles.chip}
          shape="circular"
          size="small"
          checked={active === chip.value}
          onClick={() => onChange(chip.value)}
        >
          {chip.label}
        </ToggleButton>
      ))}
    </div>
  );
}
