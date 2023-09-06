import MarkdownIt from 'markdown-it';

const md: MarkdownIt = new MarkdownIt();

export const markdown = (text: string) => md.render(text);
