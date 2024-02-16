import type { PopoverProps, PopoverStates } from '@public-ui/schema';
import { mixMembers } from 'stencil-awesome-test';

export const getPopoverHtml = (
	props: PopoverProps,
	slots: {
		default?: string;
	} = {}
): string => {
	const state = mixMembers<PopoverProps, PopoverStates>(
		{
			_align: 'top',
			_show: false,
			_visible: false,
		},
		props
	);
	return `
  <kol-popover-wc>
		<div class="popover hidden">
			<div class="arrow ${state._align}"></div>
			${slots.default !== undefined ? slots.default : ''}
		</div>
  </kol-popover-wc>`;
};
