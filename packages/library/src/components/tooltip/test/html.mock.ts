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
<kol-tooltip style="max-width: 300px;"${additionalAttrs}>
  ${
		state._label === ''
			? ''
			: getBadgeHtml(
					{
						_label: state._label,
						_color: {
							backgroundColor: '#333',
							color: '#ddd',
						},
					},
					` class="arrow-${state._align === 'bottom' ? 'top' : state._align === 'left' ? 'right' : state._align === 'top' ? 'bottom' : 'left'}" id="${
						state._id
					}"`
			  )
	}
</kol-tooltip>`;
};
