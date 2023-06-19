import { mixMembers } from 'stencil-awesome-test';
import { KoliBriHeadingProps, KoliBriHeadingStates } from '../types';

export const getHeadingWcHtml = (
	props: KoliBriHeadingProps,
	slots: {
		default?: string;
	} = {},
	additionalAttrs = ''
): string => {
	const state = mixMembers<KoliBriHeadingProps, KoliBriHeadingStates>(
		{
			_label: '…', // ⚠ required
			_level: 1,
		},
		props
	);
	return `
		<kol-heading-wc${additionalAttrs}>
			<h${state._level || 1} class="headline">
				${state._label}
				${typeof slots.default === 'string' ? slots.default : `<slot />`}
			</h${state._level || 1}>
		</kol-heading-wc>`;
};

export const getHeadingHtml = (
	props: KoliBriHeadingProps,
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
