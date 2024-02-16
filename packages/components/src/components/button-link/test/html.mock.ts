import { mixMembers } from 'stencil-awesome-test';

import { getButtonWcHtml } from '../../button/test/html.mock';

import type { ButtonLinkProps, ButtonLinkStates } from '@public-ui/schema';

export const getButtonLinkHtml = (props: ButtonLinkProps): string => {
	const state = mixMembers<ButtonLinkProps, ButtonLinkStates>(
		{
			_icons: {},
			_label: '', // ⚠ required
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
