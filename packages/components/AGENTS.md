# Agent Instructions

This package contains the Stencil based web component library for KoliBri.

Use `pnpm --filter @public-ui/components build` to build the library or `pnpm start` for development.
Always run a build before linting so the generated component typings exist for the check.

## Structure

- `src/components` – Each component lives in its own folder. The usual files are:
  - `component.tsx` – component logic (optional, some components implement everything directly in `shadow.tsx`).
  - `shadow.tsx` – entry point registered with the `@Component` decorator.
  - `controller.ts` – helper functions used by the component (optional).
  - `style.scss` – SCSS styles for the component.
  - `*.e2e.ts` – Playwright end-to-end tests.
  - `test/` – Jest snapshot tests.
- `src/schema` – TypeScript schema describing the API of every component. For each component there is a file in `src/schema/components`. Shared enums, props and types are in the neighbouring folders.
- other folders like `src/assets`, `src/locales` and `src/utils` contain shared assets, translations and helpers.

## Coding Rules

Observe the following coding rules when making changes to this project.

### General Rules

- Never use the title-Attribute to add tooltips. Always use the `KolTooltip` component.

### Conditional Rendering Rule

Use the `condition && <Element />` pattern to render JSX elements only when a condition is true. This approach avoids unnecessary DOM nodes and keeps the code concise and readable.

```jsx
{
	isVisible && <div>This is shown only when isVisible is true</div>;
}
```

Avoid using `hidden={condition}` unless the element should always be present in the DOM but visually hidden.

### Language texts

All UI texts must be stored in `src/locales/en.ts` and `src/locales/de.ts`.
New translations get the prefix `kol-` and are referenced in the code using the
`translate()` helper, e.g. `translate('kol-example')`.
Call `translate()` once when the component instance is created (e.g. in a field
initializer) and reuse the result. This prevents unnecessary work while still
updating texts when the component is rerendered. Cache the value in a class
property whose name starts with `translate` followed by the translation
identifier, for example `translateSort` for `kol-sort` or `translateOrderBy`
for `kol-order-by`.

### Properties

To make the components easier to learn, property names and their descriptions should be consistent across components. Therefore you should:

- Use the same property name for attributes that serve the same purpose.
- Whenever possible, use identical descriptions for identical property names.
- Whenever possible, keep the types of identical property names the same.
- Minimize the number of different properties, descriptions and types.

#### Props Handling

Every property lives in a dedicated file under `src/schema/props`. The file
contains the prop type, the prop schema and a validator function. Components and
their controllers must import these validators instead of implementing custom
logic. Always use the validator exported from the prop schema to keep behaviour
consistent across components.

#### Open vs Show

Use `_open` when the component renders an element on demand, for example a drawer or popover that appears from nothing. Use `_show` when the element already exists in the DOM and you only toggle its visibility.

#### Alignment properties

The `align` prop controls the orientation of the component itself. When aligning an inner element, such as a tooltip or popover inside a component, specialized props like `tooltipAlign` or `popoverAlign` may be used instead of `align`.

### BEM

In release 2 we does not use the BEM styling concept. It will be introduced in a future release.
