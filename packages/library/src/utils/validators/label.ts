import { Generic } from '@a11y-ui/core';
import { a11yHint } from '../a11y.tipps';
import { watchString, WatchStringOptions } from '../prop.validators';
import { isEmptyOrPrefixOf } from '../validator';

const READABLE_CHARS = /[a-zA-Z0-9äöüÄÖÜß]/g;
const ONLY_NUMBERS = /^\d+$/;

const countReadableChars = (str: string): number => (typeof str === 'string' ? str.match(READABLE_CHARS)?.length || 0 : 0);

export const hasEnoughReadableChars = (str: string, min = 1): boolean => countReadableChars(str) >= min;

export const containsOnlyNumbers = (str: string): boolean => ONLY_NUMBERS.test(str);

/**
 * Ein abweichendes Aria-Label muss aus Gründern der Barrierefreiheit für
 * die Sprachsteuerung mit dem Label-Text beginnen.
 */
const syncAriaLabelBeforePatch: Generic.Element.NextStateHooksCallback = (_nextValue, nextState, component: Generic.Element.Component, key): void => {
	const ariaLabel: string | undefined = nextState.has('_ariaLabel') ? (nextState.get('_ariaLabel') as string) : (component.state._ariaLabel as string);
	if (typeof ariaLabel === 'string') {
		const label: string | undefined = nextState.has('_label') ? (nextState.get('_label') as string) : (component.state._label as string);
		if (isEmptyOrPrefixOf(label, ariaLabel) === false) {
			if (key === '_ariaLabel') {
				nextState.set('_label', ariaLabel);
				// smartSetTimeout(() => ((component as Generic.Element.Component & { _label: string })._label = ariaLabel), 50);
			} else {
				nextState.set('_ariaLabel', label);
				// smartSetTimeout(() => ((component as Generic.Element.Component & { _ariaLabel: string })._ariaLabel = label), 50);
			}
			a11yHint(
				`Das abweichende Aria-Label ist nicht barrierefrei. Ein abweichendes Aria-Label muss aus Gründern der Barrierefreiheit für die Sprachsteuerung mit dem Label-Text beginnen.`
			);
		}
	}
};

const validateAriaLabel = (component: Generic.Element.Component, value?: string, options: WatchStringOptions = {}): void => {
	watchString(component, '_ariaLabel', value, {
		hooks: {
			afterPatch: (value, state, component, key) => {
				if (typeof options.hooks?.afterPatch === 'function') {
					options.hooks?.afterPatch(value, state, component, key);
				}
				if (typeof value === 'string' && value.length > 0 && hasEnoughReadableChars(value, 3) === false && containsOnlyNumbers(value) === false) {
					a11yHint(
						`Ein abweichendes Aria-Label (${value}) ist nicht barrierefrei. Ein abweichendes Aria-Label sollte aus mindestens drei lesbaren Zeichen bestehen.`
					);
				}
			},
			beforePatch: options.hooks?.beforePatch,
		},
	});
};

export const validateAriaLabelWithLabel = (component: Generic.Element.Component, value?: string): void => {
	validateAriaLabel(component, value, {
		hooks: {
			beforePatch: syncAriaLabelBeforePatch,
		},
	});
};

export const validateLabel = (component: Generic.Element.Component, value?: string, options: WatchStringOptions = {}): void => {
	watchString(component, '_label', value, {
		hooks: {
			afterPatch: (value, state, component, key) => {
				if (typeof options.hooks?.afterPatch === 'function') {
					options.hooks?.afterPatch(value, state, component, key);
				}
				if (typeof value === 'string' && hasEnoughReadableChars(value, 3) === false && containsOnlyNumbers(value) === false) {
					a11yHint(`Ein Label (${value}) ist nicht barrierefrei. Ein Label sollte aus mindestens drei lesbaren Zeichen bestehen.`);
				}
			},
			beforePatch: options.hooks?.beforePatch,
		},
		required: true,
	});
};

export const validateLabelWithAriaLabel = (component: Generic.Element.Component, value?: string): void => {
	validateLabel(component, value, {
		hooks: {
			beforePatch: syncAriaLabelBeforePatch,
		},
	});
};
