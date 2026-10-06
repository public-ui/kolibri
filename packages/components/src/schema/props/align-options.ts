/*
 * The align options live in this module without any import, so every module can import them
 * directly, whatever the order in which the schema and the prop modules are loaded.
 */
const horizontalAlignOptions = ['left', 'right'] as const;
type HorizontalAlign = (typeof horizontalAlignOptions)[number];
const verticalAlignOptions = ['top', 'bottom'] as const;
type VerticalAlign = (typeof verticalAlignOptions)[number];
export const alignPropTypeOptions = [...horizontalAlignOptions, ...verticalAlignOptions] as const;
export type AlignPropType = HorizontalAlign | VerticalAlign;
