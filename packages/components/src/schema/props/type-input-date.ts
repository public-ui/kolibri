export const inputDateTypeOptions = ['date', 'datetime-local', 'month', 'time', 'week'] as const;
export type InputDateTypePropType = (typeof inputDateTypeOptions)[number];

/**
 * Defines the type of the input-date component.
 */
export type PropTypeInputDate = {
	type: InputDateTypePropType;
};

/** Props of the date input the date props depend on: the raw `_type` and `_step` of the element. */
export type InputDateDeps = {
	type?: InputDateTypePropType | string;
	step?: number | string;
};
