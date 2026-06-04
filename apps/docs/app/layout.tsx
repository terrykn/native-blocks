import './global.css';
import 'raf/polyfill';

import { CookiesProvider } from '@docs/components/cookies-provider';
import { SafeAreaProvider } from '@docs/components/safe-area-provider';
import { ThemeProvider } from '@docs/components/theme-provider';
import { cn } from '@docs/lib/utils';
import type { SearchLink } from 'fumadocs-ui/components/dialog/search';
import { RootProvider } from 'fumadocs-ui/provider';
import { Geist, Geist_Mono } from 'next/font/google';

const fontSans = Geist({
  subsets: ['latin'],
  variable: '--font-sans',
});

const fontMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400'],
});

const SEARCH_OPTIONS = {
  links: [
    ['Installation', '/docs/installation'],
    ['Theme', '/docs/theme'],
    ['Changelog', '/docs/changelog'],
  ] satisfies SearchLink[],
};

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en" className={cn(fontSans.variable, fontMono.variable)} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" />
      </head>
      <body className="flex min-h-svh flex-col">
        <CookiesProvider>
          <SafeAreaProvider>
            <RootProvider search={SEARCH_OPTIONS}>
              <ThemeProvider>{children}</ThemeProvider>
            </RootProvider>
          </SafeAreaProvider>
        </CookiesProvider>
      </body>
    </html>
  );
}