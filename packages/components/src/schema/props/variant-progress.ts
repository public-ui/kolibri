export const progressVariantOptions = ['bar', 'cycle'] as const;
export type ProgressVariantPropType = (typeof progressVariantOptions)[number];

/**
 * Defines the variant for displaying the progress component.
 */
export type PropVariantProgress = {
	variant: ProgressVariantPropType;
};
