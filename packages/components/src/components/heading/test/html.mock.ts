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
			_label: '', // ⚠ required
			_level: 1,
		},
		props
	);
	const tag = state._level === 0 ? 'strong' : `h${state._level || 1}`;

	return `
		<kol-heading-wc${additionalAttrs}>
			${typeof slots.default === 'string' ? `` : `<slot hidden=""></slot>`}
			<${tag} class="headline">
				${state._label}
				${typeof slots.default === 'string' ? slots.default : ``}
			</${tag}>
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
