import { mixMembers } from 'stencil-awesome-test';

import { handleColorChange } from '@public-ui/schema';

import { getSpanWcHtml } from '../../span/test/html.mock';

import type { BadgeProps, BadgeStates } from '@public-ui/schema';
import type { SpanOptions } from '../../span/test/html.mock';

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
			${getSpanWcHtml({ ...state, _label: props._label, _allowMarkdown: true }, undefined, {
				...options,
				additionalAttrs: `${hasSmartButton ? ' id="nonce"' : ''}` + (options?.additionalAttrs ?? ''),
				additionalClassNames: ['kol-span-wc'],
			})}
		</span>
	</mock:shadow-root>
</kol-badge>`;
};
