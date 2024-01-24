export const inputTextTypeOptions = ['text', 'search', 'url', 'tel'] as const;
export type InputTextType = (typeof inputTextTypeOptions)[number];
