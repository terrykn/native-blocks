import { Button } from '@docs/components/ui/button';
import Link from 'next/link';

const BLOCKS = [{ title: 'Account Setup', href: '/docs/blocks/new-user/account-setup' }];

export function BlocksGrid() {
  return (
    <div className="not-prose sm:grid-cols-3 grid grid-cols-2 gap-4 xl:grid-cols-4">
      {BLOCKS.map((block) => (
        <Button
          asChild
          size="lg"
          variant="link"
          key={block.href}
          className="justify-start px-0 text-base font-normal">
          <Link href={block.href}>{block.title}</Link>
        </Button>
      ))}
    </div>
  );
}
