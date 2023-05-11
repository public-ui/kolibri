import { mixMembers } from 'stencil-awesome-test';
import { Props, States } from '../component';

export const getPopoverHtml = (
	props: Props,
	slots: {
		default?: string;
	} = {}
): string => {
	const state: States = mixMembers<Props, States>(
		{
			_alignment: 'top',
			_show: false,
			_visible: false,
		},
		props
	);
	return `
  <kol-popover>
		<div class="popover hidden">
			<div class="arrow ${state._alignment}"></div>
			${slots.default !== undefined ? slots.default : ''}
		</div>
  </kol-popover>`;
};
