'use client';

import {
  themeToCssVars,
  useThemeConfig,
  type ColorMap,
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
  colors?: Partial<ColorMap>;
}>;

/**
 * Scoped theming wrapper. Applies the customizer state (or explicit props)
 * as inline CSS variables, so only the previews inside this wrapper react to
 * theme changes — never the docs UI itself.
 */
export function ThemePreview({
  children,
  className,
  radius,
  borderWidth,
  shadowOpacity,
  colors,
}: ThemePreviewProps) {
  const { theme } = useThemeConfig();

  const merged: ThemeState = {
    radius: radius ?? theme.radius,
    borderWidth: borderWidth ?? theme.borderWidth,
    shadowOpacity: shadowOpacity ?? theme.shadowOpacity,
    colors: { ...theme.colors, ...(colors ?? {}) },
  };

  const style = themeToCssVars(merged) as React.CSSProperties;

  return (
    <div style={style} className={cn('theme-preview w-full', className)}>
      {children}
    </div>
  );
}