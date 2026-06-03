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

- `apps/docs/mdx-components.tsx` to create custom components used in `.mdx` files
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
