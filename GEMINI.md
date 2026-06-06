NativeBlocks is a mobile-first React Native component registry distributed through a shadcn/ui registry.

The goal is to provide production-ready, copy-paste React Native components and app blocks that feel native to iOS and Android. Components should prioritize touch interactions, dynamic Tailwind styling classes without any statically defined values, smooth animations, minimalistic following standards, and modern mobile design patterns rather than web-inspired interfaces.

## Using the template

- The components are found in the `packages/library` folder.
- The template includes the necessary config to use [react-native-reusables](https://reactnativereusables.com) components as dependencies.

  **Note:** The Reusables UI is installed in `packages/library/reusables`.
  
  If you want to use more `react-native-reusables` components as dependencies, you have to install them
  through the [CLI](https://reactnativereusables.com/docs/cli) inside `packages/library` using `npx @react-native-reusables/cli@latest add <component name>`.

<Callout>
  - All `package.json` files start with `@native-blocks/...` and you will need to update them with your own library name too.
</Callout>

## References

### Docs

- `apps/docs/mdx-components.tsx` to create custom components used in `.mdx` files (not required unless we need any new components to be used in .mdx)
- `apps/docs/content/docs/blocks` contains documentation for every block. Create a new folder with an index.mdx for a new section/category of blocks that get shown in a block grid. Create block-name.mdx along with their information inside the folder for every block in that section.
- `apps/docs/content/docs/components` contains documentation for every component. Works the same as `apps/docs/content/docs/blocks`. But for our current purposes, we are focused on blocks more, so sections are more important for blocks and we do not need sections for components.
- `apps/docs/components/examples.tsx` to update the components
- `apps/docs/components/blocks.tsx` to update the blocks
- `apps/docs/lib/file-generator.ts` to update the import paths in the code blocks
- `apps/docs/registry.json` to update the registry
- `apps/docs/tsconfig.json` to update the paths
- `apps/docs/package.json` to install the package as a dependency
- `apps/docs/next.config.mjs` to update the paths

### Showcase app

- `apps/showcase/app/components/*` add your components here
- `apps/showcase/lib/constants.ts` to add your components to the list
- `apps/showcase/app.config.ts` to update the app config
- `apps/showcase/content/docs/meta.json`
- `apps/showcase/registry.json` for updating the registry
- `apps/showcase/tsconfig.json` for updating the paths
- `apps/showcase/package.json` to install the package as a dependency

### Component Library

- `packages/library/package.json` to update the package name
- `packages/library/src/components/ui/*` to create your components
- `packages/library/src/examples/*` to update the example components
- `packages/library/src/blocks/*` to update the examples blocks

### Commands
- `pnpm install` to update any packages from package.json
- `pnpm turbo build` to check the builds
- `pnpm registry` to create the public/r files in docs and showcase
- `cd packages/cli` and `npm publish --access public` to update the CLI

### Steps for adding a new block (fill in the placeholders)
1. Create the source code in packages/library/src/blocks/block-name.tsx then export it in packages/library/src/blocks/index.ts
2. Create the example code in packages/library/src/examples/block-name/block-name-variant.tsx with as many examples as we require to demonstrate the different variants of this block (if exists) using the name BlockNameVariantPreview then export in packages/library/src/examples/block-name/index.ts.
3. Add it to apps/showcase/registry.json and apps/docs/registry.json (both should be identical), with name "block-name", type "registry:block", title "Block Name", description (use a concise desc), author "@terrykn", files with path "./node_modules/@native-blocks/library/src/blocks/block-name.tsx" and type "registry:block", and registryDependencies with array of any React Native Reusables dependencies used in the block, with https://reactnativereusables.com/r/new-york/used-component-name.json
4. Create apps/docs/content/docs/blocks/[use appropriate block category]/block-name.mdx following the structure from EXAMPLE_BLOCK_DOC.mdx
5. Add the object to BLOCKS array inside apps/docs/components/blocks-grid.tsx with title "Block Name" and href "/docs/blocks/[block category]/block-name"
6. Add the example preview(s) to apps/showcase/app/components/block-name.tsx importing BlockNameVariantPreview from @/library/examples/block-name using the following structure:

```
import { PreviewCarousel } from '@showcase/components/preview-carousel';
import * as React from 'react';
import { BlockNameVariantPreview } from '@/library/examples/block-name';

const blockNamePreviews = [ { name: 'Variant', component: BlockNameVariantPreview }, { ... }, ... ] 

export default function BlockNameScreen() {
  return <PreviewCarousel previews={blockNamePreviews} />
}
```

7. Add the block to COMPONENTS array in apps/showcase/lib/constants.ts with slug "block-name", name: "Block Name"

8. pnpm registry, pnpm build

### Steps for adding a new component (fill in the placeholders)
1. Create the source code for ComponentName in packages/library/src/components/ui/component-name.tsx then export it in packages/library/src/components/ui/index.ts
2. Create the example code in packages/library/src/examples/component-name/component-name-variant.tsx with as many examples as we require to demonstrate the different variants of this component (if exists) using the name ComponentNameVariantPreview then export in packages/library/src/examples/component-name/index.ts.
3. Add it to apps/showcase/registry.json and apps/docs/registry.json (both should be identical), with name "component-name", type "registry:component", title "Component Name", description (use a concise desc), author "@terrykn", files with path "./node_modules/@native-components/library/src/components/ui/component-name.tsx" and type "registry:component", and registryDependencies with array of any React Native Reusables dependencies used in the component, with https://reactnativereusables.com/r/new-york/used-component-name.json
4. Create apps/docs/content/docs/components/component-name.mdx following the structure from EXAMPLE_COMPONENT_DOC.mdx
5. Add the example preview(s) to apps/showcase/app/components/component-name.tsx importing ComponentNameVariantPreview from @/library/examples/component-name using the following structure:

```
import { PreviewCarousel } from '@showcase/components/preview-carousel';
import * as React from 'react';
import { ComponentNameVariantPreview } from '@/library/examples/component-name';

const ComponentNamePreviews = [ { name: 'Variant', component: ComponentNameVariantPreview }, { ... }, ... ] 

export default function ComponentNameScreen() {
  return <PreviewCarousel previews={ComponentNamePreviews} />
}
```

6. Add the component to COMPONENTS array in apps/showcase/lib/constants.ts with slug "component-name", name: "Component Name"

7. pnpm registry, pnpm build