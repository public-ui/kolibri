import { mixMembers } from 'stencil-awesome-test';

import { Props, States } from '../types';

export const getToastHtml = (props: Props): string => {
	const state = mixMembers<Props, States>(
		{
			_label: '...',
			_status: 'adding',
			_type: 'default',
		},
		props
	);
	return `
<kol-toast>
	<mock:shadow-root>
		<div class="toast ${state._status}">
			<kol-alert _alert="" _hascloser="" _label="${state._label}" _level="0" _type="${state._type}" _variant="card" class="alert">
				<slot></slot>
			</kol-alert>
		</div>
	</mock:shadow-root>
</kol-toast>`;
};
