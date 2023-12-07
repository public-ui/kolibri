export const orientationOptions = ['horizontal', 'vertical'] as const;
export type Orientation = (typeof orientationOptions)[number];
