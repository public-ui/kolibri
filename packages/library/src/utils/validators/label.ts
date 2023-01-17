import { Generic } from '@a11y-ui/core';
import { a11yHint } from '../a11y.tipps';
import { watchString } from '../prop.validators';
import { isEmptyOrPrefixOf } from '../validator';

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
				`Das abweichende Aria-Label am Schalter ist nicht barrierefrei. Ein abweichendes Aria-Label muss aus Gründern der Barrierefreiheit für die Sprachsteuerung mit dem Label-Text beginnen.`
			);
		}
	}
};

export const validateAriaLabel = (component: Generic.Element.Component, value?: string): void => {
	watchString(component, '_ariaLabel', value, {
		hooks: {
			beforePatch: syncAriaLabelBeforePatch,
		},
	});
};

export const validateLabel = (component: Generic.Element.Component, value?: string): void => {
	watchString(component, '_label', value, {
		hooks: {
			beforePatch: syncAriaLabelBeforePatch,
		},
		required: true,
	});
};
