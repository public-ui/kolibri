import { mixMembers } from 'stencil-awesome-test';

import { KoliBriPopoverProps, KoliBriPopoverStates } from '../types';

export const getPopoverHtml = (
	props: KoliBriPopoverProps,
	slots: {
		default?: string;
	} = {}
): string => {
	const state: KoliBriPopoverStates = mixMembers<KoliBriPopoverProps, KoliBriPopoverStates>(
		{
			_align: 'top',
			_show: false,
			_visible: false,
		},
		props
	);
	return `
  <kol-popover>
		<div class="popover hidden">
			<div class="arrow ${state._align}"></div>
			${slots.default !== undefined ? slots.default : ''}
		</div>
  </kol-popover>`;
};
