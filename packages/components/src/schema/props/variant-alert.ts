export const alertVariantOptions = ['card', 'msg'] as const;
export type AlertVariantPropType = (typeof alertVariantOptions)[number];

/**
 * Defines the variant for presenting alerts.
 */
export type PropAlertVariant = {
	variant: AlertVariantPropType;
};
