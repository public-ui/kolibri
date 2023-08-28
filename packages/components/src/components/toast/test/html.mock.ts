import { mixMembers } from 'stencil-awesome-test';

import { getAlertHtml } from '../../alert/test/html.mock';
import { Props, States } from '../types';

export const getToastHtml = (props: Props): string => {
	const state = mixMembers<Props, States>(
		{
			_label: '...',
			_status: 'adding',
		},
		props
	);
	return `
<kol-toast>
  <mock:shadow-root>
    <div>
        ${getAlertHtml(
					{
						_alert: true,
						_label: state._label,
						_level: 0,
						_hasCloser: true,
						_type: state._type,
						_variant: 'card',
					},
					'<slot />'
				)}
    </div>
  </mock:shadow-root>
</kol-toast>`;
};
