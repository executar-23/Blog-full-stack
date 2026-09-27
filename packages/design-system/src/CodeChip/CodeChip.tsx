'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Button } from '@fluentui/react-components';
import { mergeClasses, useCodeChipStyles } from './CodeChip.styles';

export interface CodeChipProps {
  /** Code shown in monospace (e.g. an OTP code). */
  value: string;
  /** Accessible, visible label of the copy action. */
  copyLabel: string;
  /** Inline confirmation shown after a successful copy. */
  copiedLabel: string;
  /** Renders the code muted and struck-through (handoff: `EmailCard.OTP` expired). */
  expired?: boolean;
  /** How long the confirmation stays visible, in ms. */
  confirmationTimeout?: number;
  onCopy?: (value: string) => void;
  onCopyError?: (error: unknown) => void;
}

/**
 * `CodeChip` — handoff-spec-onboarding-patterns.md: monospace pill with
 * light-gray background and `radius-sm`, selectable/copyable, reachable by
 * keyboard with a visible copy action and a brief inline "Copied" confirmation.
 * Composes the Fluent `Button` for the copy action.
 */
export function CodeChip({
  value,
  copyLabel,
  copiedLabel,
  expired = false,
  confirmationTimeout = 2000,
  onCopy,
  onCopyError,
}: CodeChipProps) {
  const styles = useCodeChipStyles();
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      onCopy?.(value);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), confirmationTimeout);
    } catch (error) {
      onCopyError?.(error);
    }
  }, [value, confirmationTimeout, onCopy, onCopyError]);

  return (
    <span className={styles.root}>
      <code className={mergeClasses(styles.code, expired && styles.expired)}>{value}</code>
      <Button appearance="subtle" size="small" onClick={copy} disabled={expired}>
        {copyLabel}
      </Button>
      <span
        role="status"
        aria-live="polite"
        className={mergeClasses(styles.status, copied && styles.statusVisible)}
      >
        {copied ? copiedLabel : ''}
      </span>
    </span>
  );
}
