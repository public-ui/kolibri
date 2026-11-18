/**
 * Defines whether the content is rendered as markdown.
 *
 * The supported syntax covers the inline elements bold (`**bold**` or `__bold__`), italic
 * (`*italic*` or `_italic_`), strikethrough (`~~strikethrough~~`), inline code (`` `code` ``)
 * and hard line breaks (at least two spaces before the line break). A backslash before a syntax
 * marker renders the marker as text. Everything else, especially raw HTML, links and block
 * syntax like headings or lists, stays visible text.
 */
export type AllowMarkdownPropType = boolean;
