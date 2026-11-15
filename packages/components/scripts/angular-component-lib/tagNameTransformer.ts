/**
 * Registers the tag name transformer with the Stencil runtime, the same registration as
 * `bootstrap({ transformTagName })`, and limits it to `kol-*` tags.
 */
export { registerTagNameTransformer as setTagNameTransformer } from '@public-ui/components';
