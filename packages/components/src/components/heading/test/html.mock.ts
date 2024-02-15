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
			_label: '…', // ⚠ required
			_level: 1,
		},
		props
	);
	const tag = state._level === 0 ? 'strong' : `h${state._level || 1}`;

	return `
		<kol-heading-wc${additionalAttrs}>
			<div class="kol-heading-wc">
				<${tag} class="headline">
					${state._label}
					${typeof slots.default === 'string' ? slots.default : `<slot />`}
				</${tag}>
			</div>
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
		${getHeadingWcHtml(props, {}, ` class="kol-heading"`)}
	</mock:shadow-root>
	${slots.default !== undefined ? slots.default : ''}
</kol-heading>`;
};
