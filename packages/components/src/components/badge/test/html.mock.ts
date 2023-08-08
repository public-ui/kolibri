import { mixMembers } from 'stencil-awesome-test';

import { handleColorChange } from '../../../types/props/color';
import { getSpanWcHtml } from '../../span/test/html.mock';
import { Props, States } from '../types';

export const getBadgeHtml = (props: Props, additionalAttrs = ''): string => {
	const state = mixMembers<Props, States>(
		{
			_color: {
				backgroundColor: '#000',
				foregroundColor: '#fff',
			},
			_label: '…', // ⚠ required
		},
		props
	);

	state._color = handleColorChange(props._color || '#000');

	return `<kol-badge${additionalAttrs}>
	<mock:shadow-root>
		<span style="background-color: ${state._color.backgroundColor}; color: ${state._color.foregroundColor as string};">
			${getSpanWcHtml(state, undefined, ' id="nonce"')}
		</span>
	</mock:shadow-root>
</kol-badge>`;
};
