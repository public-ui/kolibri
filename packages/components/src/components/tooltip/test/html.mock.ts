import { mixMembers } from 'stencil-awesome-test';
import { Props, States } from '../component';
import { nonce } from '../../../utils/dev.utils';
import { getSpanWcHtml } from '../../span/test/html.mock';

export const getTooltipHtml = (props: Props, additionalAttrs = ''): string => {
	const state: States = mixMembers<Props, States>(
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
			: `<div id="floating">
			<div class="area" id="arrow"></div>
			${getSpanWcHtml(
				{
					_label: state._label,
				},
				{
					expert: undefined,
				},
				` class="area" id="${state._id}"`
			)}
		</div>`
	}
</kol-tooltip>`;
};
