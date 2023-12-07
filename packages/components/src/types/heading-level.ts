export const headingLevelOptions = [0, 1, 2, 3, 4, 5, 6] as const;
export type HeadingLevel = (typeof headingLevelOptions)[number];
