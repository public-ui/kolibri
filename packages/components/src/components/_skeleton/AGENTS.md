# Agent Instructions

This directory contains the `kol` skeleton component blueprint. For
architectural and design details, see [ARC42.md](./ARC42.md).

## Shadow DOM Strategy

**IMPORTANT**: KoliBri web components **must always use Shadow DOM** (`shadow: true` in Stencil config).

- All web components in this skeleton include `shadow: true` to ensure style isolation
- This prevents CSS conflicts between component styles and host page styles
- Components that historically should not use Shadow DOM should be implemented as **Functional Components instead** (not as web components with `shadow: false`)
- Pure Functional Components offer the same decoupling benefits without Shadow DOM complexity

## Guidelines for KI Agents

- All web components **must have `shadow: true`** in their Stencil component decorator
- Controllers encapsulate state transitions and expose `getRenderProps()` for rendering
- Functional components are stateless and render based on the controller's props
- Initialize the controller in `componentWillLoad` using the current `_count` and `_name`
- Public props use a leading `_` (for example `_count`) and mirror to internal fields without the underscore
- Watchers attach only to these underscored props
- **Do not create web components with `shadow: false`** – use Functional Components instead for such cases
