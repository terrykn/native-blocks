'use client';

import * as React from 'react';
import { usePathname } from 'next/navigation';
import {
    LinkTabs,
    LinkTabsList,
    LinkTabsTrigger,
} from '@docs/components/link-tabs';

export function InstallationTabs() {
    const pathname = usePathname();
    const activeValue = (pathname ?? '/docs/installation') as `/${string}`;

    return (
        <div className="my-6">
            <LinkTabs value={activeValue}>
                <LinkTabsList>
                    <LinkTabsTrigger href="/docs/installation">CLI</LinkTabsTrigger>
                    <LinkTabsTrigger href="/docs/installation/manual">Manual</LinkTabsTrigger>
                </LinkTabsList>
            </LinkTabs>
        </div>
    );
}
