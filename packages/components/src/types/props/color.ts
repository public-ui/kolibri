import { Generic } from '@a11y-ui/core';
import { WatchOptions, watchValidator } from '../../utils/prop.validators';
import { Stringified } from '../common';

/* types */
/** de
 * Wenn auf false gesetzt können Knoten in der Navigation nicht zugeklappt werden.
 */
/** en
 * If set to false navigation nodes cannot be collapsed.
 */
type CharacteristicColors = {
	primary: string;
	secondary: string;
	neutral: string;
};

export type ColorPair = {
	backgroundColor: string;
	foregroundColor: Stringified<CharacteristicColors>;
};

/**
 * @deprecated
 */
export type DeprecatedColorPair = {
	backgroundColor: string;
	/**
	 * @deprecated Please use `foregroundColor` instead of `color`.
	 */
	color: string;
};

export type PropColor = Stringified<ColorPair | DeprecatedColorPair>;

/* validator */
export const validateColor = (component: Generic.Element.Component, value?: PropColor, options?: WatchOptions): void => {
	watchValidator(
		component,
		'_color',
		(value) => {
			const asString = value as string;
			const asColorPair = value as ColorPair;
			const asDeprecatedColorPair = value as DeprecatedColorPair;
			return (
				typeof asString === 'string' ||
				(typeof asColorPair === 'object' &&
					asColorPair !== null &&
					typeof asColorPair.backgroundColor === 'string' &&
					typeof asColorPair.foregroundColor === 'string') ||
				(typeof asColorPair === 'object' &&
					asColorPair !== null &&
					typeof asColorPair.backgroundColor === 'string' &&
					typeof asColorPair.foregroundColor === 'object' &&
					asColorPair.foregroundColor !== null &&
					typeof asColorPair.foregroundColor.primary === 'string' &&
					typeof asColorPair.foregroundColor.secondary === 'string' &&
					typeof asColorPair.foregroundColor.neutral === 'string') ||
				(typeof asDeprecatedColorPair === 'object' &&
					asDeprecatedColorPair !== null &&
					typeof asDeprecatedColorPair.backgroundColor === 'string' &&
					typeof asDeprecatedColorPair.color === 'string')
			);
		},
		new Set(['PropColor']),
		value,
		options
	);
};
