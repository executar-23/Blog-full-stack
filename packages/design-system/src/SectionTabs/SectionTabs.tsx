'use client';

import { Tab, TabList, type SelectTabEvent, type SelectTabData } from '@fluentui/react-components';
import { useSectionTabsStyles } from './SectionTabs.styles';

export interface SectionTab {
  value: string;
  label: string;
  /** Decorative glyph shown only in the mobile bottom-bar layout; `aria-hidden`. */
  icon?: string;
}

export interface SectionTabsProps {
  tabs: readonly SectionTab[];
  selectedValue: string;
  onSelect: (value: string) => void;
  ariaLabel: string;
}

/**
 * Section switcher (Loja wireframe `.subnav`/`.tabbar`): a single `TabList`
 * reflows from a top row into a fixed bottom bar under the mobile breakpoint
 * (ADR-007) — one tablist, not two, so mobile and desktop share one set of
 * ARIA roles/ids instead of duplicating the landmark.
 */
export function SectionTabs({ tabs, selectedValue, onSelect, ariaLabel }: SectionTabsProps) {
  const styles = useSectionTabsStyles();
  return (
    <>
      <TabList
        className={styles.root}
        aria-label={ariaLabel}
        selectedValue={selectedValue}
        onTabSelect={(_event: SelectTabEvent, data: SelectTabData) => onSelect(String(data.value))}
      >
        {tabs.map((tab) => (
          <Tab
            key={tab.value}
            value={tab.value}
            {...(tab.icon
              ? {
                  icon: (
                    <span className={styles.icon} aria-hidden="true">
                      {tab.icon}
                    </span>
                  ),
                }
              : {})}
          >
            {tab.label}
          </Tab>
        ))}
      </TabList>
      {/* Reserves space so fixed mobile bar doesn't cover the page footer. */}
      <div className={styles.spacer} aria-hidden="true" />
    </>
  );
}
