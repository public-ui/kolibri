import { mixMembers } from 'stencil-awesome-test';

import { Props, States } from '../types';

export const getHeadingWcHtml = (
	props: Props,
	slots: {
		expert?: string;
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
			<${tag} class="headline headline-${props._variant || tag}">
				${state._label}
				${slots.expert !== undefined ? slots.expert : '<slot name="expert" slot="expert"></slot>'}
			</${tag}>
		</kol-heading-wc>`;
};

export const getHeadingHtml = (
	props: Props,
	slots: {
		expert?: string;
	} = {}
): string => {
	return `
<kol-heading>
	<mock:shadow-root>
		${getHeadingWcHtml(props)}
	</mock:shadow-root>
	${slots.expert !== undefined ? slots.expert : ''}
</kol-heading>`;
};
