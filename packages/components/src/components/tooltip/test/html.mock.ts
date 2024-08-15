import { mixMembers } from 'stencil-awesome-test';

import { KolSpanWcTag } from '../../../core/component-names';

import type { TooltipProps, TooltipStates } from '../../../schema';
export const getTooltipHtml = (props: TooltipProps, additionalAttrs = ''): string => {
	const state = mixMembers<TooltipProps, TooltipStates>(
		{
			_align: 'top',
			_label: '', // ⚠ required
		},
		props,
	);
	return `
<kol-tooltip-wc${additionalAttrs} class="kol-tooltip-wc">
	${
		state._label === ''
			? ''
			: `<div class="tooltip-floating">
			<div class="tooltip-area tooltip-arrow"></div>
			<${KolSpanWcTag} class="tooltip-area tooltip-content" ${state._id !== null ? `id="${state._id}"` : ''} _label="${state._label}"></${KolSpanWcTag}>
		</div>`
	}
</kol-tooltip-wc>`;
};
