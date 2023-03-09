import { getBadgeHtml } from '../../badge/test/html.mock';
import { mixMembers } from 'stencil-awesome-test';
import { Props, States } from '../component';
import { nonce } from '../../../utils/dev.utils';

export const getTooltipHtml = (props: Props, additionalAttrs = ''): string => {
	const state: States = mixMembers(
		{
			_align: 'top',
			_id: nonce(),
			_label: '',
		},
		props
	);
	return `
<kol-tooltip${additionalAttrs}>
	${
		state._label === ''
			? ''
			: `<div id="floating">
			<div id="arrow"></div>
			${getBadgeHtml(
				{
					_label: state._label,
					_color: {
						backgroundColor: '#333',
						color: '#ddd',
					},
				},
				` id="${state._id}"`
			)}
		</div>`
	}
</kol-tooltip>`;
};
