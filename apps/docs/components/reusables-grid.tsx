import { Button } from '@docs/components/ui/button';
import Link from 'next/link';

const COMPONENTS = [
    { title: 'Accordion', href: 'https://reactnativereusables.com/docs/components/accordion' },
    { title: 'Alert', href: 'https://reactnativereusables.com/docs/components/alert' },
    { title: 'Alert Dialog', href: 'https://reactnativereusables.com/docs/components/alert-dialog' },
    { title: 'Aspect Ratio', href: 'https://reactnativereusables.com/docs/components/aspect-ratio' },
    { title: 'Avatar', href: 'https://reactnativereusables.com/docs/components/avatar' },
    { title: 'Badge', href: 'https://reactnativereusables.com/docs/components/badge' },
    { title: 'Button', href: 'https://reactnativereusables.com/docs/components/button' },
    { title: 'Card', href: 'https://reactnativereusables.com/docs/components/card' },
    { title: 'Checkbox', href: 'https://reactnativereusables.com/docs/components/checkbox' },
    { title: 'Collapsible', href: 'https://reactnativereusables.com/docs/components/collapsible' },
    { title: 'Context Menu', href: 'https://reactnativereusables.com/docs/components/context-menu' },
    { title: 'Dialog', href: 'https://reactnativereusables.com/docs/components/dialog' },
    { title: 'Dropdown Menu', href: 'https://reactnativereusables.com/docs/components/dropdown-menu' },
    { title: 'Hover Card', href: 'https://reactnativereusables.com/docs/components/hover-card' },
    { title: 'Input', href: 'https://reactnativereusables.com/docs/components/input' },
    { title: 'Label', href: 'https://reactnativereusables.com/docs/components/label' },
    { title: 'Menubar', href: 'https://reactnativereusables.com/docs/components/menubar' },
    { title: 'Popover', href: 'https://reactnativereusables.com/docs/components/popover' },
    { title: 'Progress', href: 'https://reactnativereusables.com/docs/components/progress' },
    { title: 'Radio Group', href: 'https://reactnativereusables.com/docs/components/radio-group' },
    { title: 'Select', href: 'https://reactnativereusables.com/docs/components/select' },
    { title: 'Separator', href: 'https://reactnativereusables.com/docs/components/separator' },
    { title: 'Skeleton', href: 'https://reactnativereusables.com/docs/components/skeleton' },
    { title: 'Switch', href: 'https://reactnativereusables.com/docs/components/switch' },
    { title: 'Tabs', href: 'https://reactnativereusables.com/docs/components/tabs' },
    { title: 'Text', href: 'https://reactnativereusables.com/docs/components/text' },
    { title: 'Textarea', href: 'https://reactnativereusables.com/docs/components/textarea' },
    { title: 'Toggle', href: 'https://reactnativereusables.com/docs/components/toggle' },
    { title: 'Toggle Group', href: 'https://reactnativereusables.com/docs/components/toggle-group' },
    { title: 'Tooltip', href: 'https://reactnativereusables.com/docs/components/tooltip' },
];

export function ReusablesGrid() {
    return (
        <div className="not-prose grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
            {COMPONENTS.map((component) => (
                <Button
                    asChild
                    size="lg"
                    variant="link"
                    key={component.href}
                    className="justify-start px-0 text-base font-normal">
                    <Link href={component.href} target="_blank" rel="noreferrer">
                        {component.title}
                    </Link>
                </Button>
            ))}
        </div>
    );
}