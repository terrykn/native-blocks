'use client';

import * as React from 'react';

/* ----------------------------------- types ---------------------------------- */

export type HSL = { h: number; s: number; l: number };

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
    colors: ColorMap;
};

const STORAGE_KEY = 'docs-theme-customizer';

/* ---------------------------------- helpers --------------------------------- */

const clamp = (v: number, min = 0, max = 100) => Math.min(max, Math.max(min, v));
const round = (v: number) => Math.round(v * 10) / 10;

export const formatHsl = ({ h, s, l }: HSL) => `${round(h)} ${round(s)}% ${round(l)}%`;

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

export const DEFAULT_COLORS: ColorMap = {
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

export const DEFAULT_THEME: ThemeState = {
    radius: 10,
    borderWidth: 1,
    shadowOpacity: 0.1,
    colors: DEFAULT_COLORS,
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
 * Derives the full palette from `primary` + `background`.
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

export function getColorTokens(t: ThemeState): Record<ColorToken, string> {
    return Object.fromEntries(
        COLOR_TOKENS.map((k) => [k, formatHsl(t.colors[k])])
    ) as Record<ColorToken, string>;
}

/** Everything `ThemePreview` injects as inline CSS variables. */
export function themeToCssVars(t: ThemeState): Record<string, string> {
    const vars: Record<string, string> = {};
    for (const k of COLOR_TOKENS) vars[`--${k}`] = formatHsl(t.colors[k]);
    vars['--radius'] = `${t.radius}px`;
    vars['--border-width'] = `${t.borderWidth}px`;
    vars['--shadow-intensity'] = `${t.shadowOpacity}`;
    vars['--shadow-color'] = '0 0% 0%';
    return vars;
}

/* ------------------------------- code generation ----------------------------- */

const invertColor = (c: HSL): HSL => ({ ...c, l: clamp(100 - c.l, 2, 98) });
const invertColors = (m: ColorMap): ColorMap =>
    Object.fromEntries(COLOR_TOKENS.map((k) => [k, invertColor(m[k])])) as ColorMap;

/** Generates the full `packages/library/reusables/global.css` file. */
export function generateGlobalCss(theme: ThemeState): string {
    const isDark = theme.colors.background.l < 50;
    const lightColors = isDark ? invertColors(theme.colors) : theme.colors;
    const darkColors = isDark ? theme.colors : invertColors(theme.colors);

    const block = (colors: ColorMap, indent = '    ') => {
        const lines = COLOR_TOKENS.map((k) => `${indent}--${k}: ${formatHsl(colors[k])};`);
        const ringIdx = lines.findIndex((l) => l.includes('--ring:'));
        lines.splice(
            ringIdx + 1,
            0,
            `${indent}--radius: ${theme.radius}px;`,
            `${indent}--border-width: ${theme.borderWidth}px;`,
            `${indent}--shadow-intensity: ${theme.shadowOpacity};`
        );
        return lines.join('\n');
    };

    return `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
${block(lightColors)}
  }

  .dark:root {
${block(darkColors)}
  }
}
`;
}

/** Generates the full `packages/library/reusables/lib/theme.ts` file. */
export function generateThemeTs(theme: ThemeState): string {
    const isDark = theme.colors.background.l < 50;
    const lightColors = isDark ? invertColors(theme.colors) : theme.colors;
    const darkColors = isDark ? theme.colors : invertColors(theme.colors);

    const block = (colors: ColorMap) => {
        const lines = COLOR_TOKENS.map((k) => {
            const key = k.replace(/-(\w)/g, (_, c: string) => c.toUpperCase());
            return `    ${key}: 'hsl(${formatHsl(colors[k])})',`;
        });
        const ringIdx = lines.findIndex((l) => l.includes('ring:'));
        lines.splice(ringIdx + 1, 0, `    radius: '${theme.radius}px',`);
        return lines.join('\n');
    };

    return `import { DarkTheme, DefaultTheme, type Theme } from '@react-navigation/native';

export const THEME = {
  light: {
${block(lightColors)}
  },
  dark: {
${block(darkColors)}
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
    setTheme: React.Dispatch<React.SetStateAction<ThemeState>>;
    updateTheme: (partial: Partial<Omit<ThemeState, 'colors'>>) => void;
    /** Set a single color token without touching the others. */
    updateColor: (token: ColorToken, value: HSL) => void;
    /** Re-derive the whole palette from a new base color. */
    deriveFromBase: (base: 'primary' | 'background', value: HSL) => void;
    reset: () => void;
};

const ThemeContext = React.createContext<ThemeContextValue>({
    theme: DEFAULT_THEME,
    setTheme: () => undefined,
    updateTheme: () => undefined,
    updateColor: () => undefined,
    deriveFromBase: () => undefined,
    reset: () => undefined,
});

export function ThemeProvider({ children }: React.PropsWithChildren) {
    const [theme, setTheme] = React.useState<ThemeState>(DEFAULT_THEME);

    React.useEffect(() => {
        try {
            const stored = window.localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored) as Partial<ThemeState>;
                setTheme({
                    ...DEFAULT_THEME,
                    ...parsed,
                    colors: { ...DEFAULT_COLORS, ...(parsed.colors ?? {}) },
                });
            }
        } catch {
            // ignore corrupted storage
        }
    }, []);

    React.useEffect(() => {
        try {
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(theme));
        } catch {
            // ignore storage errors
        }
    }, [theme]);

    const updateTheme = React.useCallback((partial: Partial<Omit<ThemeState, 'colors'>>) => {
        setTheme((prev) => ({ ...prev, ...partial }));
    }, []);

    const updateColor = React.useCallback((token: ColorToken, value: HSL) => {
        setTheme((prev) => ({ ...prev, colors: { ...prev.colors, [token]: value } }));
    }, []);

    const deriveFromBase = React.useCallback(
        (base: 'primary' | 'background', value: HSL) => {
            setTheme((prev) => {
                const primary = base === 'primary' ? value : prev.colors.primary;
                const background = base === 'background' ? value : prev.colors.background;
                return { ...prev, colors: deriveColors(primary, background) };
            });
        },
        []
    );

    const reset = React.useCallback(() => setTheme(DEFAULT_THEME), []);

    const value = React.useMemo(
        () => ({ theme, setTheme, updateTheme, updateColor, deriveFromBase, reset }),
        [theme, updateTheme, updateColor, deriveFromBase, reset]
    );

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useThemeConfig() {
    return React.useContext(ThemeContext);
}