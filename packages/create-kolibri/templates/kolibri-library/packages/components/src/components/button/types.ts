import { Generic } from '@a11y-ui/core';
import { KoliBriButtonVariant } from '@public-ui/components';

/**
 * Button-Types
 *
 * - Types should be defined a separate types.ts file
 * - Types should be exported for reuse
 */
export type {{capital name}}ButtonVariants = 'primary' | 'secondary' | 'tertiary';

/**
 * Button-API - "Make the plan" - "Less is more"
 */
export type RequiredProps = {
	label: string;
};
export type OptionalProps = {
	disabled: boolean;
	hideLabel: boolean;
	icon: string;
	variant: {{capital name}}ButtonVariants;
};
export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;

export type RequiredStates = {
	label: string;
	variant: KoliBriButtonVariant; // MyButtonVariants
};
export type OptionalStates = {
	disabled: boolean;
	hideLabel: boolean;
	icon: string;
};
export type States = Generic.Element.Members<RequiredStates, OptionalStates>;
