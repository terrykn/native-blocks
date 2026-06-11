import { createPreset } from 'fumadocs-ui/tailwind-plugin';
import { fontFamily } from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: ['class'],
  content: [
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './content/**/*.{md,mdx}',
    './mdx-components.{ts,tsx}',
    '../../node_modules/fumadocs-ui/dist/**/*.js',
    './node_modules/@native-blocks/**/*.{ts,tsx}',
  ],
  presets: [
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require('nativewind/preset'),
    createPreset({ preset: 'black' }),
  ],
  important: 'html',
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans],
        mono: ['var(--font-mono)', ...fontFamily.mono],
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        chart: {
          1: 'hsl(var(--chart-1))',
          2: 'hsl(var(--chart-2))',
          3: 'hsl(var(--chart-3))',
          4: 'hsl(var(--chart-4))',
          5: 'hsl(var(--chart-5))',
        },
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      borderRadius: {
        xl: 'calc(var(--radius) + 4px)',
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      // Reacts to the Theme Customizer inside ThemePreview's scope.
      // Fallback (1px) keeps the docs UI identical everywhere else.
      borderWidth: {
        DEFAULT: 'var(--border-width, 1px)',
      },
      // Shadows scale with the Theme Customizer inside ThemePreview's scope.
      boxShadow: {
        sm: '0 1px 3px var(--shadow-sm, rgba(0, 0, 0, 0.05))',
        DEFAULT: '0 2px 8px var(--shadow-md, rgba(0, 0, 0, 0.1))',
        md: '0 4px 12px var(--shadow-md, rgba(0, 0, 0, 0.1))',
        lg: '0 8px 20px var(--shadow-lg, rgba(0, 0, 0, 0.1))',
        xl: '0 12px 30px var(--shadow-xl, rgba(0, 0, 0, 0.1))',
        '2xl': '0 15px 50px var(--shadow-2xl, rgba(0, 0, 0, 0.25))',
        none: 'none',
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require('tailwindcss-animate'),
  ],
};

export default config;