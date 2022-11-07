import { getBadgeHtml } from '../../badge/test/html.mock';
import { mixMembers } from 'stencil-awesome-test';
import { Props } from '../component';
import { reflectAttrs } from '../../../utils/testing';

export const getTooltipHtml = (props: Props): string => {
	props = mixMembers(
		{
			_align: 'top',
			_label: '',
		},
		props
	);
	return `
<kol-tooltip${reflectAttrs(props)} style="max-width: 300px;">
  ${
		props._label === ''
			? ''
			: getBadgeHtml(
					{
						_label: props._label,
						_color: {
							backgroundColor: '#333',
							color: '#ddd',
						},
					},
					` class="arrow-${
						props._align === 'bottom' ? 'top' : props._align === 'left' ? 'right' : props._align === 'top' ? 'bottom' : 'left'
					} kol-tooltip" id="nonce"`
			  )
	}
</kol-tooltip>`;
};
