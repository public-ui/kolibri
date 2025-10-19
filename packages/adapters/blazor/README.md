# Blazor adapter for KoliBri

This package hosts the generated Blazor components that wrap the KoliBri Web Components.
The sources are created on demand by the `packages/components/scripts/blazor.js` generator
and are therefore not committed to the repository. Run `pnpm --filter @public-ui/components build`
or `pnpm --filter @public-ui/components build:light` to re-create the output in the
`packages/adapters/blazor/src` directory.

> **Note**
> The generated code is experimental and currently focuses on exposing the web component
> attributes as Blazor component parameters. Additional behaviours (event forwarding,
> two-way bindings, etc.) will be added in future iterations.
