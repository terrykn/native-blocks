'use client';

import { useTheme } from 'next-themes';
import * as React from 'react';

/* ----------------------------------- types ---------------------------------- */

export type HSL = { h: number; s: number; l: number };
export type Mode = 'light' | 'dark';

export const COLOR_TOKENS = [
    'background',
    'foreground',
    'card',
    'card-foreground',
    'popover',
    'popover-foreground',
    'primary',
    'primary-foreground',
    'secondary',
    'secondary-foreground',
    'muted',
    'muted-foreground',
    'accent',
    'accent-foreground',
    'destructive',
    'destructive-foreground',
    'border',
    'input',
    'ring',
    'chart-1',
    'chart-2',
    'chart-3',
    'chart-4',
    'chart-5',
] as const;

export type ColorToken = (typeof COLOR_TOKENS)[number];

export const COLOR_LABELS: Record<ColorToken, string> = {
    background: 'Background',
    foreground: 'Foreground',
    card: 'Card',
    'card-foreground': 'Card Foreground',
    popover: 'Popover',
    'popover-foreground': 'Popover Foreground',
    primary: 'Primary',
    'primary-foreground': 'Primary Foreground',
    secondary: 'Secondary',
    'secondary-foreground': 'Secondary Foreground',
    muted: 'Muted',
    'muted-foreground': 'Muted Foreground',
    accent: 'Accent',
    'accent-foreground': 'Accent Foreground',
    destructive: 'Destructive',
    'destructive-foreground': 'Destructive Foreground',
    border: 'Border',
    input: 'Input',
    ring: 'Ring',
    'chart-1': 'Chart 1',
    'chart-2': 'Chart 2',
    'chart-3': 'Chart 3',
    'chart-4': 'Chart 4',
    'chart-5': 'Chart 5',
};

export type ColorMap = Record<ColorToken, HSL>;

export type ThemeState = {
    /** Border radius in px (0–24) */
    radius: number;
    /** Border width in px (0–4) */
    borderWidth: number;
    /** Shadow opacity (0–1) */
    shadowOpacity: number;
    /** Independent palettes per color scheme. */
    colors: Record<Mode, ColorMap>;
};

const STORAGE_KEY = 'docs-theme-customizer-v3';

/* ---------------------------------- helpers --------------------------------- */

const clamp = (v: number, min = 0, max = 100) => Math.min(max, Math.max(min, v));
const round = (v: number) => Math.round(v * 100) / 100;
const pxToRem = (px: number) => (px === 0 ? '0' : `${round(px / 16)}rem`);

export const formatHsl = ({ h, s, l }: HSL) => `${Math.round(h * 10) / 10} ${Math.round(s * 10) / 10}% ${Math.round(l * 10) / 10}%`;

export function hslToHex({ h, s, l }: HSL): string {
    const s1 = s / 100;
    const l1 = l / 100;
    const k = (n: number) => (n + h / 30) % 12;
    const a = s1 * Math.min(l1, 1 - l1);
    const f = (n: number) => l1 - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    const toHex = (x: number) =>
        Math.round(x * 255)
            .toString(16)
            .padStart(2, '0');
    return `#${toHex(f(0))}${toHex(f(8))}${toHex(f(4))}`;
}

export function hexToHsl(hex: string): HSL {
    const m = hex.replace('#', '');
    const r = parseInt(m.slice(0, 2), 16) / 255;
    const g = parseInt(m.slice(2, 4), 16) / 255;
    const b = parseInt(m.slice(4, 6), 16) / 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;
    if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            default:
                h = (r - g) / d + 4;
        }
        h *= 60;
    }
    return { h: round(h), s: round(s * 100), l: round(l * 100) };
}

const hsl = (h: number, s: number, l: number): HSL => ({ h, s, l });

/* --------------------------------- defaults ---------------------------------- */
/* Mirrors packages/library/reusables/global.css exactly. */

export const DEFAULT_LIGHT_COLORS: ColorMap = {
    background: hsl(0, 0, 100),
    foreground: hsl(0, 0, 3.9),
    card: hsl(0, 0, 100),
    'card-foreground': hsl(0, 0, 3.9),
    popover: hsl(0, 0, 100),
    'popover-foreground': hsl(0, 0, 3.9),
    primary: hsl(0, 0, 9),
    'primary-foreground': hsl(0, 0, 98),
    secondary: hsl(0, 0, 96.1),
    'secondary-foreground': hsl(0, 0, 9),
    muted: hsl(0, 0, 96.1),
    'muted-foreground': hsl(0, 0, 45.1),
    accent: hsl(0, 0, 96.1),
    'accent-foreground': hsl(0, 0, 9),
    destructive: hsl(0, 84.2, 60.2),
    'destructive-foreground': hsl(0, 0, 98),
    border: hsl(0, 0, 89.8),
    input: hsl(0, 0, 89.8),
    ring: hsl(0, 0, 63),
    'chart-1': hsl(12, 76, 61),
    'chart-2': hsl(173, 58, 39),
    'chart-3': hsl(197, 37, 24),
    'chart-4': hsl(43, 74, 66),
    'chart-5': hsl(27, 87, 67),
};

export const DEFAULT_DARK_COLORS: ColorMap = {
    background: hsl(0, 0, 3.9),
    foreground: hsl(0, 0, 98),
    card: hsl(0, 0, 3.9),
    'card-foreground': hsl(0, 0, 98),
    popover: hsl(0, 0, 3.9),
    'popover-foreground': hsl(0, 0, 98),
    primary: hsl(0, 0, 98),
    'primary-foreground': hsl(0, 0, 9),
    secondary: hsl(0, 0, 14.9),
    'secondary-foreground': hsl(0, 0, 98),
    muted: hsl(0, 0, 14.9),
    'muted-foreground': hsl(0, 0, 63.9),
    accent: hsl(0, 0, 14.9),
    'accent-foreground': hsl(0, 0, 98),
    destructive: hsl(0, 70.9, 59.4),
    'destructive-foreground': hsl(0, 0, 98),
    border: hsl(0, 0, 14.9),
    input: hsl(0, 0, 14.9),
    ring: hsl(300, 0, 45),
    'chart-1': hsl(220, 70, 50),
    'chart-2': hsl(160, 60, 45),
    'chart-3': hsl(30, 80, 55),
    'chart-4': hsl(280, 65, 60),
    'chart-5': hsl(340, 75, 55),
};

export const DEFAULT_THEME: ThemeState = {
    radius: 20,
    borderWidth: 0.5,
    shadowOpacity: 0,
    colors: {
        light: DEFAULT_LIGHT_COLORS,
        dark: DEFAULT_DARK_COLORS,
    },
};

/* ----------------------------- palette derivation ---------------------------- */

const LIGHT_CHARTS: HSL[] = [
    hsl(12, 76, 61),
    hsl(173, 58, 39),
    hsl(197, 37, 24),
    hsl(43, 74, 66),
    hsl(27, 87, 67),
];
const DARK_CHARTS: HSL[] = [
    hsl(220, 70, 50),
    hsl(160, 60, 45),
    hsl(30, 80, 55),
    hsl(280, 65, 60),
    hsl(340, 75, 55),
];

/**
 * Derives a full palette from `primary` + `background`.
 * Used when the user edits one of the two "base" colors.
 */
export function deriveColors(primary: HSL, background: HSL): ColorMap {
    const isDark = background.l < 50;

    const foreground = hsl(background.h, Math.min(background.s, 10), isDark ? 98 : 3.9);
    const surface = hsl(
        background.h,
        Math.min(background.s + 2, 30),
        isDark ? clamp(background.l + 11, 8, 32) : clamp(background.l - 3.9, 78, 97)
    );
    const surfaceForeground = hsl(background.h, Math.min(background.s, 10), isDark ? 98 : 9);
    const border = hsl(
        background.h,
        Math.min(background.s + 2, 25),
        isDark ? clamp(background.l + 11, 10, 34) : clamp(background.l - 10.2, 68, 92)
    );
    const primaryForeground = hsl(primary.h, Math.min(primary.s, 15), primary.l >= 60 ? 9 : 98);

    const charts =
        primary.s < 10
            ? isDark
                ? DARK_CHARTS
                : LIGHT_CHARTS
            : [0, 40, 90, 160, 210].map((o) =>
                hsl((primary.h + o) % 360, clamp(primary.s, 45, 80), isDark ? 55 : 50)
            );

    return {
        background,
        foreground,
        card: { ...background },
        'card-foreground': foreground,
        popover: { ...background },
        'popover-foreground': foreground,
        primary,
        'primary-foreground': primaryForeground,
        secondary: surface,
        'secondary-foreground': surfaceForeground,
        muted: surface,
        'muted-foreground': hsl(background.h, Math.min(background.s, 12), isDark ? 63.9 : 45.1),
        accent: surface,
        'accent-foreground': surfaceForeground,
        destructive: isDark ? hsl(0, 70.9, 59.4) : hsl(0, 84.2, 60.2),
        'destructive-foreground': hsl(0, 0, 98),
        border,
        input: border,
        ring: hsl(primary.h, Math.min(primary.s, 60), isDark ? 45 : 63),
        'chart-1': charts[0],
        'chart-2': charts[1],
        'chart-3': charts[2],
        'chart-4': charts[3],
        'chart-5': charts[4],
    };
}

/* ----------------------------- css var generation ---------------------------- */

/** Everything `ThemePreview` injects as inline CSS variables, for the given mode. */
export function themeToCssVars(t: ThemeState, mode: Mode): Record<string, string> {
    const s = t.shadowOpacity;
    const palette = t.colors[mode];
    const vars: Record<string, string> = {};
    for (const k of COLOR_TOKENS) vars[`--${k}`] = formatHsl(palette[k]);
    vars['--radius'] = pxToRem(t.radius);
    vars['--border-width'] = `${t.borderWidth}px`;

    const isDark = mode === "dark"

    if (isDark) {
        vars['--shadow-color-sm'] = `rgba(0, 0, 0, ${round(s * 2.5)})`;
        vars['--shadow-color-md'] = `rgba(0, 0, 0, ${round(s * 3.5)})`;
        vars['--shadow-color-lg'] = `rgba(0, 0, 0, ${round(s * 4.5)})`;
        vars['--shadow-color-xl'] = `rgba(0, 0, 0, ${round(s * 5.5)})`;
        vars['--shadow-color-2xl'] = `rgba(0, 0, 0, ${round(s * 6.5)})`;
    } else {
        vars['--shadow-color-sm'] = `rgba(0, 0, 0, ${round(s * 0.5)})`;
        vars['--shadow-color-md'] = `rgba(0, 0, 0, ${round(s * 0.8)})`;
        vars['--shadow-color-lg'] = `rgba(0, 0, 0, ${round(s * 1.2)})`;
        vars['--shadow-color-xl'] = `rgba(0, 0, 0, ${round(s * 1.6)})`;
        vars['--shadow-color-2xl'] = `rgba(0, 0, 0, ${round(s * 2.0)})`;
    }

    if (s === 0) {
        vars['--shadow-xs'] = 'none';
        vars['--shadow-sm'] = 'none';
        vars['--shadow'] = 'none';
        vars['--shadow-md'] = 'none';
        vars['--shadow-lg'] = 'none';
        vars['--shadow-xl'] = 'none';
        vars['--shadow-2xl'] = 'none';
    } else {
        vars['--shadow-xs'] = '0 1px 2px var(--tw-shadow-color, var(--shadow-color-sm))';
        vars['--shadow-sm'] = '0 1px 3px var(--tw-shadow-color, var(--shadow-color-sm))';
        vars['--shadow'] = '0 2px 8px var(--tw-shadow-color, var(--shadow-color-md))';
        vars['--shadow-md'] = '0 4px 12px var(--tw-shadow-color, var(--shadow-color-md))';
        vars['--shadow-lg'] = '0 8px 20px var(--tw-shadow-color, var(--shadow-color-lg))';
        vars['--shadow-xl'] = '0 12px 30px var(--tw-shadow-color, var(--shadow-color-xl))';
        vars['--shadow-2xl'] = '0 15px 50px var(--tw-shadow-color, var(--shadow-color-2xl))';
    }

    return vars;
}

/* ------------------------------- code generation ----------------------------- */

/** Generates the full `packages/library/reusables/global.css` file from both palettes. */
export function generateGlobalCss(theme: ThemeState): string {
    const block = (colors: ColorMap, mode: Mode, indent = '    ') => {
        const lines = COLOR_TOKENS.map((k) => `${indent}--${k}: ${formatHsl(colors[k])};`);
        const ringIdx = lines.findIndex((l) => l.includes('--ring:'));

        const isDark = mode === 'dark';
        const s = theme.shadowOpacity;
        const shadowColorLines = isDark
            ? [
                  `${indent}--shadow-color-sm: rgba(0, 0, 0, ${round(s * 2.5)});`,
                  `${indent}--shadow-color-md: rgba(0, 0, 0, ${round(s * 3.5)});`,
                  `${indent}--shadow-color-lg: rgba(0, 0, 0, ${round(s * 4.5)});`,
                  `${indent}--shadow-color-xl: rgba(0, 0, 0, ${round(s * 5.5)});`,
                  `${indent}--shadow-color-2xl: rgba(0, 0, 0, ${round(s * 6.5)});`,
              ]
            : [
                  `${indent}--shadow-color-sm: rgba(0, 0, 0, ${round(s * 0.5)});`,
                  `${indent}--shadow-color-md: rgba(0, 0, 0, ${round(s * 0.8)});`,
                  `${indent}--shadow-color-lg: rgba(0, 0, 0, ${round(s * 1.2)});`,
                  `${indent}--shadow-color-xl: rgba(0, 0, 0, ${round(s * 1.6)});`,
                  `${indent}--shadow-color-2xl: rgba(0, 0, 0, ${round(s * 2.0)});`,
              ];

        const shadowLines =
            s === 0
                ? [
                      `${indent}--shadow-xs: none;`,
                      `${indent}--shadow-sm: none;`,
                      `${indent}--shadow: none;`,
                      `${indent}--shadow-md: none;`,
                      `${indent}--shadow-lg: none;`,
                      `${indent}--shadow-xl: none;`,
                      `${indent}--shadow-2xl: none;`,
                  ]
                : [
                      `${indent}--shadow-xs: 0 1px 2px var(--tw-shadow-color, var(--shadow-color-sm));`,
                      `${indent}--shadow-sm: 0 1px 3px var(--tw-shadow-color, var(--shadow-color-sm));`,
                      `${indent}--shadow: 0 2px 8px var(--tw-shadow-color, var(--shadow-color-md));`,
                      `${indent}--shadow-md: 0 4px 12px var(--tw-shadow-color, var(--shadow-color-md));`,
                      `${indent}--shadow-lg: 0 8px 20px var(--tw-shadow-color, var(--shadow-color-lg));`,
                      `${indent}--shadow-xl: 0 12px 30px var(--tw-shadow-color, var(--shadow-color-xl));`,
                      `${indent}--shadow-2xl: 0 15px 50px var(--tw-shadow-color, var(--shadow-color-2xl));`,
                  ];

        lines.splice(
            ringIdx + 1,
            0,
            `${indent}--radius: ${pxToRem(theme.radius)};`,
            `${indent}--border-width: ${theme.borderWidth}px;`,
            ...shadowColorLines,
            ...shadowLines
        );
        return lines.join('\n');
    };

    return `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
${block(theme.colors.light, 'light')}
  }

  .dark:root {
${block(theme.colors.dark, 'dark')}
  }
}

@layer utilities {
  .shadow-xs { box-shadow: var(--shadow-xs) !important; }
  .shadow-sm { box-shadow: var(--shadow-sm) !important; }
  .shadow { box-shadow: var(--shadow) !important; }
  .shadow-md { box-shadow: var(--shadow-md) !important; }
  .shadow-lg { box-shadow: var(--shadow-lg) !important; }
  .shadow-xl { box-shadow: var(--shadow-xl) !important; }
  .shadow-2xl { box-shadow: var(--shadow-2xl) !important; }
}
`;
}

/** Generates the full `packages/library/reusables/lib/theme.ts` file from both palettes. */
export function generateThemeTs(theme: ThemeState): string {
    const block = (colors: ColorMap) => {
        const lines = COLOR_TOKENS.map((k) => {
            const key = k.replace(/-(\w)/g, (_, c: string) => c.toUpperCase());
            return `    ${key}: 'hsl(${formatHsl(colors[k])})',`;
        });
        const ringIdx = lines.findIndex((l) => l.includes('ring:'));
        lines.splice(
            ringIdx + 1,
            0,
            `    radius: '${pxToRem(theme.radius)}',`,
            `    borderWidth: '${theme.borderWidth}px',`
        );
        return lines.join('\n');
    };

    return `import { DarkTheme, DefaultTheme, type Theme } from '@react-navigation/native';

export const THEME = {
  light: {
${block(theme.colors.light)}
  },
  dark: {
${block(theme.colors.dark)}
  },
};

export const NAV_THEME: Record<'light' | 'dark', Theme> = {
  light: {
    ...DefaultTheme,
    colors: {
      background: THEME.light.background,
      border: THEME.light.border,
      card: THEME.light.card,
      notification: THEME.light.destructive,
      primary: THEME.light.primary,
      text: THEME.light.foreground,
    },
  },
  dark: {
    ...DarkTheme,
    colors: {
      background: THEME.dark.background,
      border: THEME.dark.border,
      card: THEME.dark.card,
      notification: THEME.dark.destructive,
      primary: THEME.dark.primary,
      text: THEME.dark.foreground,
    },
  },
};
`;
}

/* ----------------------------------- context --------------------------------- */

type ThemeContextValue = {
    theme: ThemeState;
    /** The site's active color scheme ('light' until mounted). */
    mode: Mode;
    /** Shortcut for theme.colors[mode]. */
    activeColors: ColorMap;
    setTheme: React.Dispatch<React.SetStateAction<ThemeState>>;
    updateTheme: (partial: Partial<Omit<ThemeState, 'colors'>>) => void;
    /** Set a single color token in the ACTIVE mode's palette. */
    updateColor: (token: ColorToken, value: HSL) => void;
    /** Re-derive the ACTIVE mode's entire palette from a new base color. */
    deriveFromBase: (base: 'primary' | 'background', value: HSL) => void;
    reset: () => void;
};

const ThemeContext = React.createContext<ThemeContextValue>({
    theme: DEFAULT_THEME,
    mode: 'light',
    activeColors: DEFAULT_LIGHT_COLORS,
    setTheme: () => undefined,
    updateTheme: () => undefined,
    updateColor: () => undefined,
    deriveFromBase: () => undefined,
    reset: () => undefined,
});

export function ThemeProvider({ children }: React.PropsWithChildren) {
    const [theme, setTheme] = React.useState<ThemeState>(DEFAULT_THEME);
    const [mounted, setMounted] = React.useState(false);
    const { resolvedTheme } = useTheme();

    // 'light' during SSR/first paint to avoid hydration mismatches,
    // then follows the fumadocs/next-themes toggle.
    const mode: Mode = mounted && resolvedTheme === 'dark' ? 'dark' : 'light';

    React.useEffect(() => {
        setMounted(true);
        try {
            const stored = window.localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored) as Partial<ThemeState>;
                setTheme({
                    ...DEFAULT_THEME,
                    ...parsed,
                    colors: {
                        light: { ...DEFAULT_LIGHT_COLORS, ...(parsed.colors?.light ?? {}) },
                        dark: { ...DEFAULT_DARK_COLORS, ...(parsed.colors?.dark ?? {}) },
                    },
                });
            }
        } catch {
            // ignore corrupted storage
        }
    }, []);

    React.useEffect(() => {
        if (!mounted) return;
        try {
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(theme));
        } catch {
            // ignore storage errors
        }
    }, [theme, mounted]);

    const updateTheme = React.useCallback((partial: Partial<Omit<ThemeState, 'colors'>>) => {
        setTheme((prev) => ({ ...prev, ...partial }));
    }, []);

    const updateColor = React.useCallback(
        (token: ColorToken, value: HSL) => {
            setTheme((prev) => ({
                ...prev,
                colors: {
                    ...prev.colors,
                    [mode]: { ...prev.colors[mode], [token]: value },
                },
            }));
        },
        [mode]
    );

    const deriveFromBase = React.useCallback(
        (base: 'primary' | 'background', value: HSL) => {
            setTheme((prev) => {
                const current = prev.colors[mode];
                const primary = base === 'primary' ? value : current.primary;
                const background = base === 'background' ? value : current.background;
                return {
                    ...prev,
                    colors: { ...prev.colors, [mode]: deriveColors(primary, background) },
                };
            });
        },
        [mode]
    );

    const reset = React.useCallback(() => setTheme(DEFAULT_THEME), []);

    const value = React.useMemo(
        () => ({
            theme,
            mode,
            activeColors: theme.colors[mode],
            setTheme,
            updateTheme,
            updateColor,
            deriveFromBase,
            reset,
        }),
        [theme, mode, updateTheme, updateColor, deriveFromBase, reset]
    );

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useThemeConfig() {
    return React.useContext(ThemeContext);
}