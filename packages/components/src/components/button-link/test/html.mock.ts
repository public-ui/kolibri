import { mixMembers } from 'stencil-awesome-test';

import { ButtonLinkProps, ButtonLinkStates } from '../../../types/button-link';
import { getButtonWcHtml } from '../../button/test/html.mock';

export const getButtonLinkHtml = (props: ButtonLinkProps): string => {
	const state = mixMembers<ButtonLinkProps, ButtonLinkStates>(
		{
			_icon: {},
			_label: false, // ⚠ required
			_on: {},
			_type: 'button',
			_variant: 'normal',
		},
		props
	);

	return `<kol-button-link>
		<mock:shadow-root>
			${getButtonWcHtml({ ...state, _role: 'link' }, { expert: '<slot name="expert" slot="expert"></slot>' })}
		</mock:shadow-root>
	</kol-button-link>`;
};
