import { getBadgeHtml } from '../../badge/test/html.mock';
import { mixMembers } from 'stencil-awesome-test';
import { Props } from '../component';

export const getTooltipHtml = (props: Props): string => {
	const state = mixMembers(
		{
			_align: 'top',
			_label: '',
		},
		props
	);
	return `
<kol-tooltip style="max-width: 300px;">
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
					` class="arrow-${
						state._align === 'bottom' ? 'top' : state._align === 'left' ? 'right' : state._align === 'top' ? 'bottom' : 'left'
					} kol-tooltip" id="nonce"`
			  )
	}
</kol-tooltip>`;
};
