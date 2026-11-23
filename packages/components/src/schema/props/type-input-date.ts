export const inputDateTypeOptions = ['date', 'datetime-local', 'month', 'time', 'week'] as const;
export type InputDateTypePropType = (typeof inputDateTypeOptions)[number];

/**
 * Defines the type of the input-date component.
 */
export type PropTypeInputDate = {
	type: InputDateTypePropType;
};
