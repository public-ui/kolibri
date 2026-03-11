import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeBoolean } from './helpers/normalizers';

/**
 * Allow Markdown prop for rendering markdown content
 *
 * Description:
 * Specifies whether the label content should be interpreted and rendered as Markdown.
 * When enabled, the label will be parsed as Markdown and rendered as HTML.
 *
 * Usage:
 * - Default: false (label is rendered as plain text)
 * - When true: label content is parsed as Markdown
 * - Only affects text rendering, not interactive elements
 *
 * @see https://www.markdownguide.org/
 */
export type AllowMarkdownProp = SimpleProp<'allowMarkdown', boolean>;
export const allowMarkdownProp = createPropDefinition<AllowMarkdownProp>('allowMarkdown', false, normalizeBoolean);
