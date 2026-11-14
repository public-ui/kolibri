/* types */
import type { Generic } from 'adopted-style-sheets';
import { watchValidator } from '../utils';

const tabBehaviorPropTypeOptions = ['select-automatic', 'select-manual'] as const;
export type TabBehaviorPropType = (typeof tabBehaviorPropTypeOptions)[number];

/**
 * Defines which behavior is active.
 */
export type PropTabBehavior = {
	behavior: TabBehaviorPropType;
};

/* validator */
export const validateTabBehavior = (component: Generic.Element.Component, value?: TabBehaviorPropType): void => {
	watchValidator(
		component,
		`_behavior`,
		(value) => typeof value === 'string' && tabBehaviorPropTypeOptions.includes(value),
		new Set([`KoliBriTabBehavior {${tabBehaviorPropTypeOptions.join(', ')}`]),
		value,
	);
};
