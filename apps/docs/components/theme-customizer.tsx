'use client';

import {
  DEFAULT_THEME,
  formatHsl,
  generateGlobalCss,
  generateThemeTs,
  hexToHsl,
  hslToHex,
  useThemeConfig,
  type HSL,
} from '@docs/components/theme-provider';
import { cn } from '@docs/lib/utils';
import { Check, Clipboard, RotateCcw } from 'lucide-react';
import * as React from 'react';

/* --------------------------------- primitives -------------------------------- */

type SliderProps = {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit?: string;
  onChange: (value: number) => void;
};

function Slider({ label, value, min, max, step, unit = '', onChange }: SliderProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">{label}</span>
        <span className="text-fd-muted-foreground font-mono text-xs">
          {value}
          {unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="accent-fd-primary w-full cursor-pointer"
        aria-label={label}
      />
    </div>
  );
}

type ColorFieldProps = {
  label: string;
  value: HSL;
  onChange: (value: HSL) => void;
};

function ColorField({ label, value, onChange }: ColorFieldProps) {
  const hex = hslToHex(value);

  return (
    <div className="space-y-2">
      <span className="text-sm font-medium">{label}</span>
      <div className="flex items-center gap-2">
        <div className="border-fd-border relative size-9 shrink-0 overflow-hidden rounded-md border">
          <input
            type="color"
            value={hex}
            onChange={(e) => onChange(hexToHsl(e.target.value))}
            className="absolute -inset-2 size-[150%] cursor-pointer"
            aria-label={`${label} color picker`}
          />
        </div>
        <div className="flex flex-col">
          <span className="font-mono text-xs uppercase">{hex}</span>
          <span className="text-fd-muted-foreground font-mono text-[10px]">
            hsl({formatHsl(value)})
          </span>
        </div>
      </div>
    </div>
  );
}

type CopyButtonProps = {
  label: string;
  getText: () => string;
  className?: string;
};

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
        'bg-fd-primary text-fd-primary-foreground hover:bg-fd-primary/90 inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors',
        className
      )}>
      {copied ? <Check className="size-4" /> : <Clipboard className="size-4" />}
      {copied ? 'Copied!' : label}
    </button>
  );
}

/* --------------------------------- customizer -------------------------------- */

export function ThemeCustomizer() {
  const { theme, updateTheme, reset } = useThemeConfig();

  return (
    <div className="bg-fd-card not-prose rounded-lg border p-5">
      <div className="mb-5 flex items-center justify-between">
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

      <div className="grid gap-6 sm:grid-cols-2">
        {/* Colors — everything else is derived from these two */}
        <ColorField
          label="Primary"
          value={theme.primary}
          onChange={(primary) => updateTheme({ primary })}
        />
        <ColorField
          label="Background"
          value={theme.background}
          onChange={(background) => updateTheme({ background })}
        />

        {/* Measurements */}
        <Slider
          label="Roundedness"
          value={theme.radius}
          min={0}
          max={24}
          step={1}
          unit="px"
          onChange={(radius) => updateTheme({ radius })}
        />
        <Slider
          label="Borders"
          value={theme.borderWidth}
          min={0}
          max={4}
          step={0.5}
          unit="px"
          onChange={(borderWidth) => updateTheme({ borderWidth })}
        />
        <Slider
          label="Shadows"
          value={theme.shadowOpacity}
          min={0}
          max={1}
          step={0.05}
          onChange={(shadowOpacity) => updateTheme({ shadowOpacity })}
        />
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3 border-t pt-5">
        <CopyButton label="Copy global.css" getText={() => generateGlobalCss(theme)} />
        <CopyButton label="Copy theme.ts" getText={() => generateThemeTs(theme)} />
        <p className="text-fd-muted-foreground text-xs">
          Paste into{' '}
          <code className="font-mono">packages/library/reusables/global.css</code> and{' '}
          <code className="font-mono">packages/library/reusables/lib/theme.ts</code>
        </p>
      </div>
    </div>
  );
}