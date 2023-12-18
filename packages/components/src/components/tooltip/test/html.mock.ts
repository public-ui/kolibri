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
					additionalAttrs: ` class="tooltip-area tooltip-content"${typeof state._id === 'string' ? ` id="${state._id}"` : ''}`,
				}
			)}
		</div>`
	}
</kol-tooltip-wc>`;
};
