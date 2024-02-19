import { mixMembers } from 'stencil-awesome-test';

import { handleColorChange } from '../../../types/props/color';
import { getSpanWcHtml, SpanOptions } from '../../span/test/html.mock';
import { Props, States } from '../types';

export const getBadgeHtml = (props: Props, options?: SpanOptions): string => {
	const state = mixMembers<Props, States>(
		{
			_color: {
				backgroundColor: '#000',
				foregroundColor: '#fff',
			},
		},
		props
	);

	state._color = handleColorChange(props._color || '#000');

	const hasSmartButton = typeof state._smartButton === 'object' && state._smartButton !== null;
	return `<kol-badge${options?.additionalAttrs ?? ''} class="kol-badge" >
	<mock:shadow-root>
		<span style="background-color: ${state._color.backgroundColor}; color: ${state._color.foregroundColor as string};">
			${getSpanWcHtml({ ...state, _label: props._label, _allowMarkdown: true }, undefined, {
				...options,
				additionalAttrs: `${hasSmartButton ? ' id="nonce"' : ''}` + (options?.additionalAttrs ?? ''),
			})}
		</span>
	</mock:shadow-root>
</kol-badge>`;
};
