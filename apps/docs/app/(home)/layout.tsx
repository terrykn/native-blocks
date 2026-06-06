import { NbIcon } from '@docs/components/icons/nb-icon';
import { SkipNavigationButton } from '@docs/components/skip-navigation-button';
import { Button } from '@docs/components/ui/button';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import type { Metadata } from 'next';
import Link from 'next/link';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Native Blocks',
  description: 'A template you can use to create your own Universal Components registry.',
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <SkipNavigationButton />
      <HomeLayout
        // githubUrl="https://github.com/"
        nav={{
          title: (
            <div className="hover:bg-fd-accent -ml-0.5 flex size-8 items-center justify-center rounded-md transition-colors duration-200">
              <NbIcon className="w-6" pathClassName="stroke-[1px]" />
            </div>
          ),
        }}
        links={[
          {
            type: 'custom',
            children: (
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="hover:bg-fd-accent dark:hover:bg-fd-accent -ml-1.5 justify-start sm:ml-0 sm:justify-center">
                <Link href="/docs">Docs</Link>
              </Button>
            ),
          },
          {
            type: 'custom',
            children: (
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="hover:bg-fd-accent dark:hover:bg-fd-accent -ml-1.5 justify-start sm:ml-0 sm:justify-center">
                <Link href="/docs/blocks/new-user">Blocks</Link>
              </Button>
            ),
          },
          {
            type: 'custom',
            children: (
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="hover:bg-fd-accent dark:hover:bg-fd-accent -ml-1.5 justify-start sm:ml-0 sm:justify-center">
                <Link href="/docs/components/reusables">Components</Link>
              </Button>
            ),
          },
          {
            type: 'custom',
            children: (
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="hover:bg-fd-accent dark:hover:bg-fd-accent -ml-1.5 justify-start sm:ml-0 sm:justify-center">
                <Link href="/docs/theme">Theme</Link>
              </Button>
            ),
          },
        ]}>
        {children}
      </HomeLayout>
    </>
  );
}
