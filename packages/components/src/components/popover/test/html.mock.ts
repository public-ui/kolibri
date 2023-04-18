import { mixMembers } from 'stencil-awesome-test';
import { Props, States } from '../shadow';

export const getPopoverHtml = (props: Props, slots?: { default?: string }, additionalAttrs = ''): string => {
	const state: States = mixMembers<Props, States>(
		{
			_alignment: 'top',
			_open: false,
			_show: false,
		},
		props
	);
	return `
  <kol-popover ${additionalAttrs}>
		<mock:shadow-root>
			<div class="popover hidden">
				<div class="arrow ${state._alignment}"></div>
				${slots?.default ? slots.default : '<slot></slot>'}
			</div>
		</mock:shadow-root>
  </kol-popover>`;
};
