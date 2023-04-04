import { Generic } from '@a11y-ui/core';
import { Stringified } from '../../types/common';
import { LabelProp } from '../../types/props/label';
import { uiUxHintMillerscheZahl } from '../../utils/a11y.tipps';
import { watchJsonArrayString } from '../../utils/prop.validators';

export const watchNavLinks = (
	className: string,
	component: Generic.Element.Component & {
		state: {
			_links: LabelProp[];
		};
	},
	value?: Stringified<LabelProp[]>
): void => {
	watchJsonArrayString(component, '_links', (link) => typeof link === 'object' && typeof link._label === 'string', value);
	uiUxHintMillerscheZahl(className, component.state._links.length);
};
