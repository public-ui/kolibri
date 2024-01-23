import type { HrefProp, LabelProp, Stringified } from '@public-ui/schema';
import { uiUxHintMillerscheZahl, watchJsonArrayString } from '@public-ui/schema';

import type { Generic } from 'adopted-style-sheets';

type HrefOrLabelProp = HrefProp | LabelProp;

export const watchNavLinks = (
	className: string,
	component: Generic.Element.Component & {
		state: {
			_links: HrefOrLabelProp[];
		};
	},
	value?: Stringified<HrefOrLabelProp[]>
): void => {
	watchJsonArrayString(
		component,
		'_links',
		(link) => typeof link === 'object' && (typeof (link as HrefProp)._href === 'string' || typeof (link as LabelProp)._label === 'string'),
		value
	);
	uiUxHintMillerscheZahl(className, component.state._links.length);
};
