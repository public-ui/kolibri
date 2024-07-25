import type { KoliBriCustomIcon, KoliBriIconsProp, SpanProps, SpanStates } from '../../../schema';
import { mixMembers } from 'stencil-awesome-test';

import { mapIconProp2State, showExpertSlot } from '../../../schema';

import { md } from '../../../utils/markdown';
import { KolIconTag } from '../../../core/component-names';

type Slots = {
	''?: string;
	expert?: string;
} & Record<string, undefined | string>;
export type SpanOptions = {
	additionalAttrs?: string;
	additionalClassNames?: string[];
};
export const getSpanWcHtml = (
	props: SpanProps,
	slots: Slots = {
		expert: undefined,
	},
	options?: SpanOptions,
): string => {
	const state = mixMembers<SpanProps, SpanStates>(
		{
			_allowMarkdown: false,
			_hideLabel: false,
			_icons: {},
			_label: '', // ⚠ required
		},
		props,
	);

	/**
	 * @todo: This covers the case where the label is undefined or null. But why?
	 */
	state._label = state._label ?? '';

	const hideExpertSlot = !showExpertSlot(state._label);
	const icon = mapIconProp2State(state._icons as KoliBriIconsProp);
	const classNames: string[] = ['kol-span-wc', ...(state._hideLabel === true ? [`hide-label`] : []), ...(options?.additionalClassNames ?? [])];

	return `
<kol-span-wc${classNames.length ? ` class="${classNames.join(' ')}"` : ``}${options?.additionalAttrs ?? ''}>
	${icon.top ? `<${KolIconTag}  _label="${(icon.top as KoliBriCustomIcon).label ?? ''}" _icons="${(icon.top as KoliBriCustomIcon).icon}" > </${KolIconTag}>` : ''}
	<span>
		${
			icon.left
				? `<${KolIconTag}
				class="icon left"
				_label="${(icon.left as KoliBriCustomIcon).label ?? ''}"
				 _icons="${(icon.left as KoliBriCustomIcon).icon}"
				 >
			 </${KolIconTag}>`
				: ''
		}
		${
			!state._hideLabel && hideExpertSlot
				? state._allowMarkdown && typeof state._label === 'string' && state._label.length > 0
					? `<span class="span-label md">${md(state._label)}</span>`
					: `<span class="span-label">${state._label ?? ''}</span>`
				: ``
		}
		<span class="span-label" ${hideExpertSlot ? ' aria-hidden="true" hidden' : ''}>
			${slots.expert ? slots.expert : ``}
		</span>
		${
			icon.right
				? `<${KolIconTag}
				class="icon right"
				_label="${(icon.right as KoliBriCustomIcon).label ?? ''}"
				 _icons="${(icon.right as KoliBriCustomIcon).icon}" >
			 </${KolIconTag}>`
				: ''
		}
	</span>
	${
		icon.bottom
			? `<${KolIconTag}
				_label="${(icon.bottom as KoliBriCustomIcon).label ?? ''}"
				 _icons="${(icon.bottom as KoliBriCustomIcon).icon}" >
			 </${KolIconTag}>`
			: ''
	}
</kol-span-wc>`;
};
