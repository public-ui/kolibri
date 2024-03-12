import { mixMembers } from 'stencil-awesome-test';

import { getAlertHtml } from '../../alert/test/html.mock';
import { Props } from '../types';

export const getToastHtml = (props: Props): string => {
	props = mixMembers(
		{
			_alert: true,
			_level: 1,
			_show: true,
		},
		props,
	);
	return `
<kol-toast${props._show ? ' _show' : ''} class="kol-toast">
  <mock:shadow-root>
    ${
			props._show === true
				? `<div>
        ${getAlertHtml(
					{
						_alert: props._alert,
						_label: props._label,
						_level: props._level,
						_type: props._type,
						_variant: 'card',
					},
					'<slot />',
					// ' tabindex="0"'
				)}
    </div>`
				: ''
		}
  </mock:shadow-root>
</kol-toast>`;
};
