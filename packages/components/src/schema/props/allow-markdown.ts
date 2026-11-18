/**
 * Defines whether the content is rendered as markdown.
 *
 * The supported syntax covers the inline elements bold (`**bold**` or `__bold__`), italic
 * (`*italic*` or `_italic_`), strikethrough (`~~strikethrough~~`), inline code (`` `code` ``)
 * and hard line breaks (at least two spaces before the line break). A backslash before a syntax
 * marker renders the marker as text. Character references resolve numerically and for the common
 * named ones (`amp`, `apos`, `gt`, `lt`, `nbsp`, `quot`); every other reference stays visible
 * text. Everything else — raw HTML, links, images and block syntax like headings or lists —
 * stays visible text.
 */
export type AllowMarkdownPropType = boolean;
