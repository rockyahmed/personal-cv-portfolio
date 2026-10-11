import type { CSSProperties } from "react";

/** Inline style helper for staggered `.reveal` animations. */
export const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as CSSProperties;

/** Inline style helper for setting an arbitrary CSS custom property. */
export const cssVar = (name: `--${string}`, value: string) => ({ [name]: value }) as CSSProperties;
