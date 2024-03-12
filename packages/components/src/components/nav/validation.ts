import type { Generic } from 'adopted-style-sheets';

import { Stringified } from '../../types/common';
import { HrefProp } from '../../types/props/href';
import { LabelProp } from '../../types/props/label';
import { uiUxHintMillerscheZahl } from '../../utils/a11y.tipps';
import { watchJsonArrayString } from '../../utils/prop.validators';

type HrefOrLabelProp = HrefProp | LabelProp;

export const watchNavLinks = (
	className: string,
	component: Generic.Element.Component & {
		state: {
			_links: HrefOrLabelProp[];
		};
	},
	value?: Stringified<HrefOrLabelProp[]>,
): void => {
	watchJsonArrayString(
		component,
		'_links',
		(link) => typeof link === 'object' && (typeof (link as HrefProp)._href === 'string' || typeof (link as LabelProp)._label === 'string'),
		value,
	);
	uiUxHintMillerscheZahl(className, component.state._links.length);
};
