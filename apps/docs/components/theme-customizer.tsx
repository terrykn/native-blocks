'use client';

import {
  COLOR_LABELS,
  COLOR_TOKENS,
  formatHsl,
  generateGlobalCss,
  generateThemeTs,
  hexToHsl,
  hslToHex,
  useThemeConfig,
  type ColorToken,
  type HSL,
} from '@docs/components/theme-provider';
import { cn } from '@docs/lib/utils';
import { Check, Clipboard, RotateCcw } from 'lucide-react';
import * as React from 'react';

/* --------------------------------- primitives -------------------------------- */

type SliderRowProps = {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit?: string;
  onChange: (value: number) => void;
};

function SliderRow({ label, value, min, max, step, unit = '', onChange }: SliderRowProps) {
  return (
    <div className="flex items-center justify-between gap-4 py-2.5">
      <span className="text-sm font-medium">{label}</span>
      <div className="flex items-center gap-3">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="accent-fd-primary w-32 cursor-pointer"
          aria-label={label}
        />
        <span className="text-fd-muted-foreground w-12 text-right font-mono text-xs">
          {value}
          {unit}
        </span>
      </div>
    </div>
  );
}

type ColorRowProps = {
  label: string;
  value: HSL;
  onChange: (value: HSL) => void;
};

function ColorRow({ label, value, onChange }: ColorRowProps) {
  const hex = hslToHex(value);
  return (
    <div className="flex items-center justify-between gap-4 py-2">
      <span className="text-sm">{label}</span>
      <div className="flex items-center gap-2">
        <span className="text-fd-muted-foreground font-mono text-[10px]">
          {formatHsl(value)}
        </span>
        <div className="border-fd-border relative size-7 shrink-0 overflow-hidden rounded-md border">
          <input
            type="color"
            value={hex}
            onChange={(e) => onChange(hexToHsl(e.target.value))}
            className="absolute -inset-2 size-[150%] cursor-pointer"
            aria-label={`${label} color`}
          />
        </div>
      </div>
    </div>
  );
}

type CopyButtonProps = { label: string; getText: () => string; className?: string };

function CopyButton({ label, getText, className }: CopyButtonProps) {
  const [copied, setCopied] = React.useState(false);
  async function onCopy() {
    try {
      await navigator.clipboard.writeText(getText());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy to clipboard', error);
    }
  }
  return (
    <button
      type="button"
      onClick={onCopy}
      className={cn(
        'bg-fd-primary text-fd-primary-foreground hover:bg-fd-primary/90 inline-flex items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors',
        className
      )}>
      {copied ? <Check className="size-4" /> : <Clipboard className="size-4" />}
      {copied ? 'Copied!' : label}
    </button>
  );
}

/* ------------------------------ preview surface ------------------------------ */

function PreviewSurface() {
  return (
    <div className="bg-background text-foreground border-border rounded-lg border p-6 shadow-lg">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1.5">
          <h4 className="text-lg font-semibold leading-none">Create project</h4>
          <p className="text-muted-foreground text-sm">Deploy your new project in one click.</p>
        </div>

        {/* input → border / input / ring / foreground */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Name</label>
          <input
            placeholder="Name of your project"
            className="border-input bg-background placeholder:text-muted-foreground focus-visible:ring-ring rounded-md border px-3 py-2 text-sm shadow-sm outline-none focus-visible:ring-2"
          />
        </div>

        {/* buttons → primary / secondary / accent / destructive */}
        <div className="flex flex-wrap items-center gap-3">
          <button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2 text-sm font-medium shadow transition-colors">
            Primary
          </button>
          <button className="bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-md px-4 py-2 text-sm font-medium shadow-sm transition-colors">
            Secondary
          </button>
          <button className="hover:bg-accent hover:text-accent-foreground border-input bg-background rounded-md border px-4 py-2 text-sm font-medium shadow-sm transition-colors">
            Accent
          </button>
          <button className="bg-destructive text-destructive-foreground rounded-md px-4 py-2 text-sm font-medium shadow transition-colors hover:opacity-90">
            Destructive
          </button>
        </div>

        {/* card / popover / muted surfaces */}
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="bg-card text-card-foreground border-border rounded-md border p-3 shadow-sm">
            <p className="text-sm font-medium">Card</p>
            <p className="text-muted-foreground text-xs">card / card-foreground</p>
          </div>
          <div className="bg-popover text-popover-foreground border-border rounded-md border p-3 shadow-sm">
            <p className="text-sm font-medium">Popover</p>
            <p className="text-muted-foreground text-xs">popover / popover-foreground</p>
          </div>
        </div>

        <div className="bg-muted text-muted-foreground rounded-md border p-3 text-xs shadow-sm">
          Muted surface — also showing radius, border-width, and shadow.
        </div>

        {/* charts */}
        <div>
          <p className="text-muted-foreground mb-2 text-xs font-medium">Charts</p>
          <div className="flex h-20 items-end gap-2">
            {['bg-chart-1', 'bg-chart-2', 'bg-chart-3', 'bg-chart-4', 'bg-chart-5'].map(
              (c, i) => (
                <div
                  key={c}
                  className={cn('flex-1 rounded-t-md', c)}
                  style={{ height: `${40 + i * 12}%` }}
                />
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* --------------------------------- customizer -------------------------------- */

// Tokens grouped for the controls column.
const BASE_TOKENS: ColorToken[] = [
  'background',
  'foreground',
  'primary',
  'primary-foreground',
  'secondary',
  'secondary-foreground',
  'accent',
  'accent-foreground',
  'muted',
  'muted-foreground',
  'card',
  'card-foreground',
  'popover',
  'popover-foreground',
  'destructive',
  'destructive-foreground',
  'border',
  'input',
  'ring',
];
const CHART_TOKENS: ColorToken[] = COLOR_TOKENS.filter((t) => t.startsWith('chart-'));

export function ThemeCustomizer() {
  const { theme, updateTheme, updateColor, deriveFromBase, reset } = useThemeConfig();

  return (
    <div className="not-prose grid grid-cols-1 gap-6 lg:grid-cols-2">
      {/* LEFT: controls */}
      <div className="bg-fd-card rounded-lg border p-5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-base font-semibold">Theme Customizer</h3>
          <button
            type="button"
            onClick={reset}
            className="text-fd-muted-foreground hover:text-fd-foreground inline-flex items-center gap-1.5 text-sm transition-colors"
            aria-label="Reset theme to defaults">
            <RotateCcw className="size-3.5" />
            Reset
          </button>
        </div>

        {/* measurements — one per row */}
        <div className="divide-fd-border divide-y">
          <SliderRow
            label="Roundedness"
            value={theme.radius}
            min={0}
            max={24}
            step={1}
            unit="px"
            onChange={(radius) => updateTheme({ radius })}
          />
          <SliderRow
            label="Borders"
            value={theme.borderWidth}
            min={0}
            max={4}
            step={0.5}
            unit="px"
            onChange={(borderWidth) => updateTheme({ borderWidth })}
          />
          <SliderRow
            label="Shadows"
            value={theme.shadowOpacity}
            min={0}
            max={1}
            step={0.05}
            onChange={(shadowOpacity) => updateTheme({ shadowOpacity })}
          />
        </div>

        {/* base colors → editing Primary/Background re-derives everything */}
        <p className="text-fd-muted-foreground mt-5 mb-1 text-xs font-medium uppercase tracking-wide">
          Base colors
        </p>
        <p className="text-fd-muted-foreground mb-1 text-xs">
          Editing Primary or Background re-derives the full palette.
        </p>
        <div className="divide-fd-border divide-y">
          {BASE_TOKENS.map((token) => {
            const isBase = token === 'primary' || token === 'background';
            return (
              <ColorRow
                key={token}
                label={COLOR_LABELS[token]}
                value={theme.colors[token]}
                onChange={(value) =>
                  isBase
                    ? deriveFromBase(token as 'primary' | 'background', value)
                    : updateColor(token, value)
                }
              />
            );
          })}
        </div>

        {/* chart colors */}
        <p className="text-fd-muted-foreground mt-5 mb-1 text-xs font-medium uppercase tracking-wide">
          Chart colors
        </p>
        <div className="divide-fd-border divide-y">
          {CHART_TOKENS.map((token) => (
            <ColorRow
              key={token}
              label={COLOR_LABELS[token]}
              value={theme.colors[token]}
              onChange={(value) => updateColor(token, value)}
            />
          ))}
        </div>

        {/* export */}
        <div className="mt-5 flex flex-col gap-3 border-t pt-5">
          <div className="flex flex-wrap gap-3">
            <CopyButton
              label="Copy global.css"
              getText={() => generateGlobalCss(theme)}
              className="flex-1"
            />
            <CopyButton
              label="Copy theme.ts"
              getText={() => generateThemeTs(theme)}
              className="flex-1"
            />
          </div>
          <p className="text-fd-muted-foreground text-xs">
            Paste into <code className="font-mono">packages/library/reusables/global.css</code> and{' '}
            <code className="font-mono">packages/library/reusables/lib/theme.ts</code>
          </p>
        </div>
      </div>

      {/* RIGHT: live preview (scoped via ThemePreview in the mdx page) */}
      <div className="lg:sticky lg:top-24 lg:self-start">
        <PreviewSurface />
      </div>
    </div>
  );
}