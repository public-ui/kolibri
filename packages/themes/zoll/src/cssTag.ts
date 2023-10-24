/**
 * No-op tag function to help with CSS syntax highlighting and provide Prettier support
 */
export const css = (input: TemplateStringsArray): string => input.join(``);
