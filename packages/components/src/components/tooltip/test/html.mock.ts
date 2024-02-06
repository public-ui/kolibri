import { mixMembers } from 'stencil-awesome-test';

import { getSpanWcHtml } from '../../span/test/html.mock';
import { Props, States } from '../types';
import { nonce } from '../../../utils/dev.utils';

export const getTooltipHtml = (props: Props, additionalAttrs = ''): string => {
	const state: States = mixMembers<Props, States>(
		{
			_align: 'top',
			_id: nonce(), // ⚠ required
			_label: '…', // ⚠ required
		},
		props
	);

	/**
	 * @todo: This covers the case where the label is undefined or null. But why?
	 */
	state._label = state._label ?? '…';

	return `
<kol-tooltip-wc${additionalAttrs}>
	${
		state._label !== ''
			? `<div aria-hidden="true" class="tooltip-floating" id="${state._id}-tooltip" role="tooltip">
			<div class="tooltip-area tooltip-arrow"></div>
			${getSpanWcHtml(
				{
					_label: state._label,
				},
				{
					expert: undefined,
				},
				{
					additionalClassNames: ['tooltip-area', 'tooltip-content'],
				}
			)}
		</div>`
			: ''
	}
</kol-tooltip-wc>`;
};
