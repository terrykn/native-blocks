'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@docs/components/ui/accordion';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@docs/components/ui/alert-dialog';
import { Alert, AlertDescription, AlertTitle } from '@docs/components/ui/alert';
import { AspectRatio } from '@docs/components/ui/aspect-ratio';
import { Avatar, AvatarFallback, AvatarImage } from '@docs/components/ui/avatar';
import { Badge } from '@docs/components/ui/badge';
import { Button } from '@docs/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@docs/components/ui/card';
import { Checkbox } from '@docs/components/ui/checkbox';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@docs/components/ui/collapsible';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@docs/components/ui/context-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@docs/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@docs/components/ui/dropdown-menu';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@docs/components/ui/hover-card';
import { Input } from '@docs/components/ui/input';
import { Label } from '@docs/components/ui/label';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from '@docs/components/ui/menubar';
import { Popover, PopoverContent, PopoverTrigger } from '@docs/components/ui/popover';
import { Progress } from '@docs/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@docs/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@docs/components/ui/select';
import { Separator } from '@docs/components/ui/separator';
import { Skeleton } from '@docs/components/ui/skeleton';
import { Switch } from '@docs/components/ui/switch';
import { Tabs, TabsList, TabsTrigger } from '@docs/components/ui/tabs';
import { Text } from '@docs/components/ui/text';
import { Textarea } from '@docs/components/ui/textarea';
import { Toggle, ToggleIcon } from '@docs/components/ui/toggle';
import { ToggleGroup, ToggleGroupIcon, ToggleGroupItem } from '@docs/components/ui/toggle-group';
import { Tooltip, TooltipContent, TooltipTrigger } from '@docs/components/ui/tooltip';
import {
  AlertCircle,
  Bold,
  Box,
  ChevronDown,
  Info,
  Italic,
  Maximize2,
  Terminal,
  Type,
  Underline,
} from 'lucide-react';
import Link from 'next/link';
import * as React from 'react';

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

function ComponentPreview({ title }: { title: string }) {
  const [showAlert, setShowAlert] = React.useState(false);

  switch (title) {
    case 'Accordion':
      return (
        <Accordion type="single" collapsible className="w-full px-4">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <Text>Can I use this?</Text>
            </AccordionTrigger>
            <AccordionContent>
              <Text>Yes you can!</Text>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      );
    case 'Alert':
      return (
        <div className="flex w-full flex-col items-center gap-2 px-4">
          {showAlert ? (
            <Alert icon={Terminal} className="w-full">
              <AlertTitle>Heads up!</AlertTitle>
              <AlertDescription>You can add components to your app using the cli.</AlertDescription>
            </Alert>
          ) : (
            <Button size="sm" onClick={() => setShowAlert(true)}>
              Show Alert
            </Button>
          )}
        </div>
      );
    case 'Alert Dialog':
      return (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" size="sm">
              Show Dialog
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your account and remove
                your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>
                <Text>Cancel</Text>
              </AlertDialogCancel>
              <AlertDialogAction>
                <Text>Continue</Text>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      );
    case 'Aspect Ratio':
      return (
        <div className="w-full px-4">
          <AspectRatio ratio={16 / 9} className="bg-muted flex items-center justify-center rounded-md">
            <Box className="text-muted-foreground/20" size={24} />
          </AspectRatio>
        </div>
      );
    case 'Avatar':
      return (
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>NB</AvatarFallback>
        </Avatar>
      );
    case 'Badge':
      return <Badge>Badge</Badge>;
    case 'Button':
      return <Button size="sm">Button</Button>;
    case 'Card':
      return (
        <Card className="w-full max-w-[200px]">

          <CardContent>
            <Text>Card content</Text>
          </CardContent>
        </Card>
      );
    case 'Checkbox':
      return (
        <div className="flex flex-row items-center gap-2">
          <Checkbox id="terms" />
          <Label nativeID="terms">Accept terms</Label>
        </div>
      );
    case 'Collapsible':
      return (
        <Collapsible className="w-full px-4">
          <CollapsibleTrigger asChild>
            <Button variant="outline" size="sm">
              Toggle
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2 rounded-md border p-2">
            <Text className="text-xs">This content is collapsible.</Text>
          </CollapsibleContent>
        </Collapsible>
      );
    case 'Context Menu':
      return (
        <ContextMenu>
          <ContextMenuTrigger className="bg-muted flex h-16 w-32 items-center justify-center rounded-md border border-dashed">
            <Text className="text-muted-foreground text-xs text-center">Right click here</Text>
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem>
              <Text>Profile</Text>
            </ContextMenuItem>
            <ContextMenuItem>
              <Text>Billing</Text>
            </ContextMenuItem>
            <ContextMenuItem>
              <Text>Team</Text>
            </ContextMenuItem>
            <ContextMenuItem>
              <Text>Subscription</Text>
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      );
    case 'Dialog':
      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              Open Dialog
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-4 py-4">
              <Input placeholder="Name" />
              <Input placeholder="Username" />
            </div>
            <DialogFooter>
              <Button variant="default" type="submit">
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );
    case 'Dropdown Menu':
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              Open Menu
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>
              <Text>My Account</Text>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Text>Profile</Text>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Text>Billing</Text>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Text>Team</Text>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Text>Subscription</Text>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    case 'Hover Card':
      return (
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button variant="link">@nextjs</Button>
          </HoverCardTrigger>
          <HoverCardContent className="w-80">
            <div className="flex justify-between space-x-4">
              <Avatar>
                <AvatarImage src="https://github.com/vercel.png" />
                <AvatarFallback>VC</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <Text className="text-sm">
                  The React Framework – created and maintained by @vercel.
                </Text>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      );
    case 'Input':
      return <Input placeholder="Type..." className="max-w-[120px]" />;
    case 'Label':
      return <Label>Label</Label>;
    case 'Menubar':
      return (
        <Menubar>
          <MenubarMenu value="file">
            <MenubarTrigger>
              <Text>File</Text>
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem>
                <Text>New Tab</Text>
              </MenubarItem>
              <MenubarItem>
                <Text>New Window</Text>
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem>
                <Text>Share</Text>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      );
    case 'Popover':
      return (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm">
              Open Popover
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Text className="text-muted-foreground text-sm">
                  Set the dimensions for the layer.
                </Text>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      );
    case 'Progress':
      return <Progress value={60} className="w-[100px]" />;
    case 'Radio Group':
      return (
        <RadioGroup defaultValue="1">
          <RadioGroupItem value="1" />
        </RadioGroup>
      );
    case 'Select':
      return (
        <Select>
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1" label="Option 1">
              Option 1
            </SelectItem>
            <SelectItem value="2" label="Option 2">
              Option 2
            </SelectItem>
          </SelectContent>
        </Select>
      );
    case 'Separator':
      return <Separator className="w-16" />;
    case 'Skeleton':
      return <Skeleton className="h-6 w-[100px]" />;
    case 'Switch':
      return <Switch checked />;
    case 'Tabs':
      return (
        <Tabs defaultValue="1" className="w-[140px]">
          <TabsList className="grid h-8 w-full grid-cols-2">
            <TabsTrigger value="1" className="text-xs">
              <Text>1</Text>
            </TabsTrigger>
            <TabsTrigger value="2" className="text-xs">
              <Text>2</Text>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      );
    case 'Text':
      return <Text className="text-sm">Hello</Text>;
    case 'Textarea':
      return <Textarea placeholder="Type..." className="min-h-[40px] max-w-[120px] text-xs" />;
    case 'Toggle':
      return (
        <Toggle variant="outline" aria-label="Toggle italic">
          <ToggleIcon as={Italic} />
        </Toggle>
      );
    case 'Toggle Group':
      return (
        <ToggleGroup type="multiple" variant="outline">
          <ToggleGroupItem value="bold" aria-label="Toggle bold">
            <ToggleGroupIcon as={Bold} />
          </ToggleGroupItem>
          <ToggleGroupItem value="italic" aria-label="Toggle italic">
            <ToggleGroupIcon as={Italic} />
          </ToggleGroupItem>
          <ToggleGroupItem value="underline" aria-label="Toggle underline">
            <ToggleGroupIcon as={Underline} />
          </ToggleGroupItem>
        </ToggleGroup>
      );
    case 'Tooltip':
      return (
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon">
              <Info size={16} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <Text>Add to library</Text>
          </TooltipContent>
        </Tooltip>
      );
    default:
      return <Box className="text-muted-foreground/20" size={32} />;
  }
}

export function ReusablesGrid() {
  return (
    <div className="not-prose grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
      {COMPONENTS.map((component) => (
        <div
          key={component.href}
          className="bg-card hover:bg-muted/50 flex flex-col gap-2 rounded-xl border p-4 transition-colors">
          <div className="flex h-24 items-center justify-center overflow-hidden">
            <ComponentPreview title={component.title} />
          </div>
          <Button
            asChild
            size="sm"
            variant="link"
            className="h-auto justify-start px-0 text-base font-normal">
            <Link href={component.href} target="_blank" rel="noreferrer">
              {component.title}
            </Link>
          </Button>
        </div>
      ))}
    </div>
  );
}