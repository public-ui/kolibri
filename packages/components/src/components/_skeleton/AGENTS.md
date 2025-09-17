# Agent Instructions

This directory contains the `kol` skeleton component blueprint. For
architectural and design details, see [ARC42.md](./ARC42.md).

## Guidelines for KI Agents

- Controllers encapsulate state transitions and expose `getRenderProps()` for
  rendering.
- Functional components are stateless and render based on the controller's
  props.
- Initialize the controller in `componentWillLoad` using the current `_count`
  and `_name`.
- Public props use a leading `_` (for example `_count`) and mirror to internal
  fields without the underscore.
- Watchers attach only to these underscored props.
