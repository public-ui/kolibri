import { mixMembers } from 'stencil-awesome-test';

import { getSpanWcHtml } from '../../span/test/html.mock';
import { Props, States } from '../types';

export const getTooltipHtml = (props: Props, additionalAttrs = ''): string => {
	const state: States = mixMembers<Props, States>(
		{
			_align: 'top',
			_label: '…', // ⚠ required
		},
		props
	);

	/**
	 * @todo: This covers the case where the label is undefined or null. But why?
	 */
	state._label = state._label ?? '…';

	return `
<kol-tooltip-wc${additionalAttrs} class="kol-tooltip-wc" >
	${
		state._label !== ''
			? `<div class="tooltip-floating">
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
					additionalClassNames: ['tooltip-area', 'tooltip-content', 'kol-span-wc'],
				}
			)}
		</div>`
			: ''
	}
</kol-tooltip-wc>`;
};
