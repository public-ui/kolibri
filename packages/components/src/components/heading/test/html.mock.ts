import type { HeadingProps, HeadingStates } from '@public-ui/schema';
import { mixMembers } from 'stencil-awesome-test';

export const getHeadingWcHtml = (
	props: HeadingProps,
	slots: {
		expert?: string;
	} = {},
	additionalAttrs = '',
): string => {
	const state = mixMembers<HeadingProps, HeadingStates>(
		{
			_label: '', // ⚠ required
			_level: 1,
		},
		props,
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
	props: HeadingProps,
	slots: {
		expert?: string;
	} = {},
): string => {
	return `
<kol-heading>
	<mock:shadow-root>
		${getHeadingWcHtml(props, {}, ` class="kol-heading kol-heading-wc"`)}
	</mock:shadow-root>
	${slots.expert !== undefined ? slots.expert : ''}
</kol-heading>`;
};
