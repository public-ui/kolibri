import { mixMembers } from 'stencil-awesome-test';
import { Props, States } from '../component';

export const getPopoverHtml = (props: Props, slots?: { default?: string }, additionalAttrs = ''): string => {
	const state: States = mixMembers<Props, States>(
		{
			_alignment: 'top',
			_show: false,
			_visible: false,
		},
		props
	);
	return `
  <kol-popover ${additionalAttrs}>
		<div class="popover hidden">
			<div class="arrow ${state._alignment}"></div>
			${slots?.default ? slots.default : '<slot></slot>'}
		</div>
  </kol-popover>`;
};
