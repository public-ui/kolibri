import { mixMembers } from 'stencil-awesome-test';

import { getSpanWcHtml } from '../../span/test/html.mock';

import type { TooltipProps, TooltipStates } from '@public-ui/schema';
export const getTooltipHtml = (props: TooltipProps, additionalAttrs = ''): string => {
	const state = mixMembers<TooltipProps, TooltipStates>(
		{
			_align: 'top',
			_label: '', // ⚠ required
		},
		props
	);
	return `
<kol-tooltip-wc${additionalAttrs}>
	${
		state._label === ''
			? ''
			: `<div class="tooltip-floating">
			<div class="tooltip-area tooltip-arrow"></div>
			${getSpanWcHtml(
				{
					_label: state._label,
				},
				{
					expert: undefined,
				},
				{
					additionalAttrs: typeof state._id === 'string' ? ` id="${state._id}"` : undefined,
					additionalClassNames: ['tooltip-area', 'tooltip-content'],
				}
			)}
		</div>`
	}
</kol-tooltip-wc>`;
};
