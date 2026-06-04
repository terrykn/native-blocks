'use client';

import {
  themeToCssVars,
  useThemeConfig,
  type HSL,
  type ThemeState,
} from '@docs/components/theme-provider';
import { cn } from '@docs/lib/utils';
import * as React from 'react';

type ThemePreviewProps = React.PropsWithChildren<{
  className?: string;
  /** Optional per-instance overrides — fall back to the global customizer state. */
  radius?: number;
  borderWidth?: number;
  shadowOpacity?: number;
  primary?: HSL;
  background?: HSL;
}>;

/**
 * Scoped theming wrapper. Applies the customizer state (or explicit props)
 * as inline CSS variables, so only the component previews inside this
 * wrapper react to theme changes — never the docs UI itself.
 */
export function ThemePreview({ children, className, ...overrides }: ThemePreviewProps) {
  const { theme } = useThemeConfig();

  const merged: ThemeState = {
    ...theme,
    ...Object.fromEntries(Object.entries(overrides).filter(([, v]) => v !== undefined)),
  };

  const style = themeToCssVars(merged) as React.CSSProperties;

  return (
    <div style={style} className={cn('theme-preview w-full', className)}>
      {children}
    </div>
  );
}