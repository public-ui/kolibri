import { mixMembers } from 'stencil-awesome-test';

import { nonce } from '../../../utils/dev.utils';
import { getSpanWcHtml } from '../../span/test/html.mock';
import { KoliBriTooltipProps, KoliBriTooltipStates } from '../types';

export const getTooltipHtml = (props: KoliBriTooltipProps, additionalAttrs = ''): string => {
	const state: KoliBriTooltipStates = mixMembers<KoliBriTooltipProps, KoliBriTooltipStates>(
		{
			_align: 'top',
			_id: nonce(),
			_label: '…', // ⚠ required
		},
		props
	);
	return `
<kol-tooltip${additionalAttrs}>
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
				` class="tooltip-area tooltip-content" id="${state._id}"`
			)}
		</div>`
	}
</kol-tooltip>`;
};
