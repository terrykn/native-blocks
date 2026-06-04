'use client';

import { ThemeCustomizerControls } from '@docs/components/theme-customizer';
import { cn } from '@docs/lib/utils';
import { Paintbrush, Palette, X } from 'lucide-react';
import * as React from 'react';

/**
 * Icon button for the docs navbar (top right). Opens a popover panel
 * containing the full Theme Customizer controls.
 */
export function ThemeCustomizerButton() {
  const [open, setOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Close on outside click
  React.useEffect(() => {
    if (!open) return;
    function onPointerDown(event: PointerEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [open]);

  // Close on Escape
  React.useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false);
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

return (
  <div ref={containerRef} className="relative">
    <button
      type="button"
      onClick={() => setOpen((prev) => !prev)}
      aria-label="Open theme customizer"
      aria-expanded={open}
      className={cn(
        'text-fd-muted-foreground hover:text-fd-accent-foreground hover:bg-fd-accent inline-flex size-8 items-center justify-center rounded-md transition-colors border',
        open && 'bg-fd-accent text-fd-accent-foreground'
      )}>
      <Palette className="size-4" />
    </button>
    {open ? (
      <div className="bg-fd-popover border-fd-border fixed inset-x-4 top-16 z-[9999] max-h-[75vh] overflow-y-auto rounded-lg border shadow-lg sm:inset-x-auto sm:right-4 sm:top-[7rem] sm:w-[380px]">
        <div className="bg-fd-popover sticky top-0 z-10 flex items-center justify-between border-b px-4 py-2">
          <p className="text-sm font-medium">Theme</p>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close theme customizer"
            className="text-fd-muted-foreground hover:text-fd-foreground rounded-md p-1 transition-colors">
            <X className="size-4" />
          </button>
        </div>
        <ThemeCustomizerControls className="rounded-none border-0 bg-transparent" />
      </div>
    ) : null}
  </div>
);
}