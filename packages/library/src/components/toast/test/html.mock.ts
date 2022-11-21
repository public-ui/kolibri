import { getAlertHtml } from '../../alert/test/html.mock';
import { mixMembers } from 'stencil-awesome-test';
import { Props } from '../component';

export const getToastHtml = (props: Props): string => {
	props = mixMembers(
		{
			_alert: true,
			_show: true,
		},
		props
	);
	return `
<kol-toast${props._alert ? ' _alert' : ''}${props._show ? ' _show' : ''}>
  <mock:shadow-root>
    ${
			props._show === true
				? `<div>
        ${getAlertHtml(
					{
						_alert: props._alert,
						_heading: props._heading,
						_level: props._level,
						_type: props._type,
						_variant: 'card',
					},
					'<slot />'
					// ' tabindex="0"'
				)}
    </div>`
				: ''
		}
  </mock:shadow-root>
</kol-toast>`;
};
