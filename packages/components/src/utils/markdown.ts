import MarkdownIt from 'markdown-it';

const markdown = new MarkdownIt();

export const md = (str: string) => markdown.renderInline(str);
