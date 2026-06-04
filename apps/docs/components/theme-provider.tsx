'use client';

import * as React from 'react';

/* ----------------------------------- types ---------------------------------- */

export type HSL = { h: number; s: number; l: number };

export type ThemeState = {
    /** Border radius in px (0–24) */
    radius: number;
    /** Border width in px (0–4) */
    borderWidth: number;
    /** Shadow opacity (0–1) */
    shadowOpacity: number;
    primary: HSL;
    background: HSL;
};

export const DEFAULT_THEME: ThemeState = {
    radius: 10,
    borderWidth: 1,
    shadowOpacity: 0.1,
    primary: { h: 0, s: 0, l: 9 },
    background: { h: 0, s: 0, l: 100 },
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

/* ----------------------------- palette derivation ---------------------------- */

const LIGHT_CHARTS: HSL[] = [
    { h: 12, s: 76, l: 61 },
    { h: 173, s: 58, l: 39 },
    { h: 197, s: 37, l: 24 },
    { h: 43, s: 74, l: 66 },
    { h: 27, s: 87, l: 67 },
];

const DARK_CHARTS: HSL[] = [
    { h: 220, s: 70, l: 50 },
    { h: 160, s: 60, l: 45 },
    { h: 30, s: 80, l: 55 },
    { h: 280, s: 65, l: 60 },
    { h: 340, s: 75, l: 55 },
];

/**
 * Derives the entire color palette from just `primary` and `background`.
 * Surfaces, borders, foregrounds, ring and charts all follow automatically.
 */
export function deriveColors(primary: HSL, background: HSL): Record<string, HSL> {
    const isDark = background.l < 50;

    const foreground: HSL = {
        h: background.h,
        s: Math.min(background.s, 10),
        l: isDark ? 98 : 3.9,
    };

    const surface: HSL = {
        h: background.h,
        s: Math.min(background.s + 2, 30),
        l: isDark ? clamp(background.l + 11, 8, 32) : clamp(background.l - 3.9, 78, 97),
    };

    const surfaceForeground: HSL = {
        h: background.h,
        s: Math.min(background.s, 10),
        l: isDark ? 98 : 9,
    };

    const border: HSL = {
        h: background.h,
        s: Math.min(background.s + 2, 25),
        l: isDark ? clamp(background.l + 11, 10, 34) : clamp(background.l - 10.2, 68, 92),
    };

    const primaryForeground: HSL = {
        h: primary.h,
        s: Math.min(primary.s, 15),
        l: primary.l >= 60 ? 9 : 98,
    };

    const charts: HSL[] =
        primary.s < 10
            ? isDark
                ? DARK_CHARTS
                : LIGHT_CHARTS
            : [0, 40, 90, 160, 210].map((offset) => ({
                h: (primary.h + offset) % 360,
                s: clamp(primary.s, 45, 80),
                l: isDark ? 55 : 50,
            }));

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
        'muted-foreground': {
            h: background.h,
            s: Math.min(background.s, 12),
            l: isDark ? 63.9 : 45.1,
        },
        accent: surface,
        'accent-foreground': surfaceForeground,
        destructive: isDark ? { h: 0, s: 70.9, l: 59.4 } : { h: 0, s: 84.2, l: 60.2 },
        'destructive-foreground': { h: 0, s: 0, l: 98 },
        border,
        input: border,
        ring: { h: primary.h, s: Math.min(primary.s, 60), l: isDark ? 45 : 63 },
        'chart-1': charts[0],
        'chart-2': charts[1],
        'chart-3': charts[2],
        'chart-4': charts[3],
        'chart-5': charts[4],
    };
}

export function getColorTokens(t: ThemeState): Record<string, string> {
    const colors = deriveColors(t.primary, t.background);
    return Object.fromEntries(Object.entries(colors).map(([k, v]) => [k, formatHsl(v)]));
}

/** Everything `ThemePreview` injects as inline CSS variables. */
export function themeToCssVars(t: ThemeState): Record<string, string> {
    const colors = getColorTokens(t);
    return {
        ...Object.fromEntries(Object.entries(colors).map(([k, v]) => [`--${k}`, v])),
        '--radius': `${t.radius}px`,
        '--border-width': `${t.borderWidth}px`,
        '--shadow-intensity': `${t.shadowOpacity}`,
        '--shadow-color': '0 0% 0%',
    };
}

/* ------------------------------- code generation ----------------------------- */

function invertTheme(t: ThemeState): ThemeState {
    return {
        ...t,
        background: { ...t.background, l: clamp(100 - t.background.l, 2, 98) },
        primary: { ...t.primary, l: clamp(100 - t.primary.l, 2, 98) },
    };
}

/** Generates the full `packages/library/reusables/global.css` file. */
export function generateGlobalCss(theme: ThemeState): string {
    const isDark = theme.background.l < 50;
    const light = isDark ? invertTheme(theme) : theme;
    const dark = isDark ? theme : invertTheme(theme);

    const block = (t: ThemeState, indent = '    ') => {
        const lines = Object.entries(getColorTokens(t)).map(([k, v]) => `${indent}--${k}: ${v};`);
        const ringIdx = lines.findIndex((l) => l.includes('--ring:'));
        lines.splice(
            ringIdx + 1,
            0,
            `${indent}--radius: ${t.radius}px;`,
            `${indent}--border-width: ${t.borderWidth}px;`,
            `${indent}--shadow-intensity: ${t.shadowOpacity};`
        );
        return lines.join('\n');
    };

    return `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
${block(light)}
  }

  .dark:root {
${block(dark)}
  }
}
`;
}

/** Generates the full `packages/library/reusables/lib/theme.ts` file. */
export function generateThemeTs(theme: ThemeState): string {
    const isDark = theme.background.l < 50;
    const light = isDark ? invertTheme(theme) : theme;
    const dark = isDark ? theme : invertTheme(theme);

    const block = (t: ThemeState) => {
        const lines = Object.entries(getColorTokens(t)).map(([k, v]) => {
            const key = k.replace(/-(\w)/g, (_, c: string) => c.toUpperCase());
            return `    ${key}: 'hsl(${v})',`;
        });
        const ringIdx = lines.findIndex((l) => l.includes('ring:'));
        lines.splice(ringIdx + 1, 0, `    radius: '${t.radius}px',`);
        return lines.join('\n');
    };

    return `import { DarkTheme, DefaultTheme, type Theme } from '@react-navigation/native';

export const THEME = {
  light: {
${block(light)}
  },
  dark: {
${block(dark)}
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
    updateTheme: (partial: Partial<ThemeState>) => void;
    reset: () => void;
};

const ThemeContext = React.createContext<ThemeContextValue>({
    theme: DEFAULT_THEME,
    setTheme: () => undefined,
    updateTheme: () => undefined,
    reset: () => undefined,
});

export function ThemeProvider({ children }: React.PropsWithChildren) {
    const [theme, setTheme] = React.useState<ThemeState>(DEFAULT_THEME);

    // Hydration-safe restore from localStorage
    React.useEffect(() => {
        try {
            const stored = window.localStorage.getItem(STORAGE_KEY);
            if (stored) {
                setTheme({ ...DEFAULT_THEME, ...(JSON.parse(stored) as Partial<ThemeState>) });
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

    const updateTheme = React.useCallback((partial: Partial<ThemeState>) => {
        setTheme((prev) => ({ ...prev, ...partial }));
    }, []);

    const reset = React.useCallback(() => setTheme(DEFAULT_THEME), []);

    const value = React.useMemo(
        () => ({ theme, setTheme, updateTheme, reset }),
        [theme, updateTheme, reset]
    );

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useThemeConfig() {
    return React.useContext(ThemeContext);
}