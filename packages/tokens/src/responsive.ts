import type { Range } from './identity';
import { breakpoints } from './identity';

/**
 * Range → value rule (decision IC2, docs/GAPS.md).
 *
 * Sizes: interpolate linearly between the minimum (≤ 768px) and the maximum
 * (≥ 1024px) of the range, using the tablet-portrait breakpoint of the identity.
 */
export const FLUID_MIN_VIEWPORT = breakpoints.tabletPortrait.minWidth;
export const FLUID_MAX_VIEWPORT = breakpoints.tabletPortrait.maxWidth;

const round = (n: number) => Math.round(n * 10_000) / 10_000;

export function fluidSize({ min, max }: Range): string {
  if (min === max) return `${min}px`;
  const slope = (max - min) / (FLUID_MAX_VIEWPORT - FLUID_MIN_VIEWPORT);
  const intercept = min - slope * FLUID_MIN_VIEWPORT;
  return `clamp(${min}px, ${round(intercept)}px + ${round(slope * 100)}vw, ${max}px)`;
}

/**
 * Motion: the upper bound is the default; with `prefers-reduced-motion: reduce`
 * the lower bound is used (decision IC2).
 */
export function motionDurations(range: Range): { standard: string; reduced: string } {
  return { standard: `${range.max}ms`, reduced: `${range.min}ms` };
}
