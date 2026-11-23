export const cssResizeOptions = ['vertical', 'none'] as const;
export type CSSResize = (typeof cssResizeOptions)[number];
