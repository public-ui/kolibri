import { mixMembers } from 'stencil-awesome-test';

import { Props, States } from '../types';

export const getHeadingWcHtml = (
	props: Props,
	slots: {
		default?: string;
	} = {},
	additionalAttrs = ''
): string => {
	const state = mixMembers<Props, States>(
		{
			_label: false, // ⚠ required
			_level: 1,
		},
		props
	);
	return `
		<kol-heading-wc${additionalAttrs}>
			<h${state._level || 1} class="headline">
				${typeof state._label === 'string' ? state._label : ''}
				${typeof slots.default === 'string' ? slots.default : `<slot />`}
			</h${state._level || 1}>
		</kol-heading-wc>`;
};

export const getHeadingHtml = (
	props: Props,
	slots: {
		default?: string;
	} = {}
): string => {
	return `
<kol-heading>
	<mock:shadow-root>
		${getHeadingWcHtml(props)}
	</mock:shadow-root>
	${slots.default !== undefined ? slots.default : ''}
</kol-heading>`;
};
