import { mixMembers } from 'stencil-awesome-test';

import { handleColorChange } from '@public-ui/schema';

import { getSpanWcHtml } from '../../span/test/html.mock';

import type { BadgeProps, BadgeStates } from '@public-ui/schema';
import type { SpanOptions } from '../../span/test/html.mock';
import { KolSpanWcTag } from '../../../core/component-names';

export const getBadgeHtml = (props: BadgeProps, options?: SpanOptions): string => {
	const state = mixMembers<BadgeProps, BadgeStates>(
		{
			_color: {
				backgroundColor: '#000',
				foregroundColor: '#fff',
			},
		},
		props,
	);

	state._color = handleColorChange(props._color || '#000');

	const hasSmartButton = typeof state._smartButton === 'object' && state._smartButton !== null;
	return `<kol-badge${options?.additionalAttrs ?? ''} class="kol-badge">
	<mock:shadow-root>
		<span style="background-color: ${state._color.backgroundColor}; color: ${state._color.foregroundColor as string};">
		<${KolSpanWcTag} _allowMarkdown  ${props._icons ? `_icons="${props._icons}"` : ''} ${props._label ? `_label="${props._label}"` : ''}></${KolSpanWcTag} >

		</span>
	</mock:shadow-root>
</kol-badge>`;
};
