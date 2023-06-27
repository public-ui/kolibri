import { Generic } from '@a11y-ui/core';
import { Stringified } from '../../types/common';
import { uiUxHintMillerscheZahl } from '../../utils/a11y.tipps';
import { watchJsonArrayString } from '../../utils/prop.validators';
import { ButtonOrLinkOrTextWithChildrenProps } from '../../components';

export const watchNavLinks = (
	className: string,
	component: Generic.Element.Component & {
		state: {
			_links: ButtonOrLinkOrTextWithChildrenProps[];
		};
	},
	value?: Stringified<ButtonOrLinkOrTextWithChildrenProps[]>
): void => {
	watchJsonArrayString(component, '_links', (link) => typeof link === 'object' && typeof link._label === 'string', value);
	uiUxHintMillerscheZahl(className, component.state._links.length);
};
