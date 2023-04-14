import { mixMembers } from 'stencil-awesome-test';
import { Props, States } from '../shadow';

export const getPopoverHtml = (props: Props, slots?: { default?: string }, additionalAttrs = ''): string => {
	const state: States = mixMembers<Props, States>(
		{
			_alignment: 'top',
		},
		props
	);
	return `
  <kol-popover _alignment="${state._alignment}"${additionalAttrs}>
		<div class="popover hidden">
    	<div class="arrow ${state._alignment}" />
    	${slots?.default !== undefined ? slots.default : ''}
		</div>
  </kol-popover>`;
};
