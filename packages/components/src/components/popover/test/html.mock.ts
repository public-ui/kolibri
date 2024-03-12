import { mixMembers } from 'stencil-awesome-test';

import { Props, States } from '../types';

export const getPopoverHtml = (
	props: Props,
	slots: {
		default?: string;
	} = {},
): string => {
	const state: States = mixMembers<Props, States>(
		{
			_align: 'top',
			_show: false,
			_visible: false,
		},
		props,
	);
	return `
  <kol-popover-wc class="kol-popover-wc">
		<div class="popover hidden">
			<div class="arrow ${state._align}"></div>
			${slots.default !== undefined ? slots.default : ''}
		</div>
  </kol-popover-wc>`;
};
