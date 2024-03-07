import type { KoliBriCustomIcon, KoliBriIconsProp, SpanProps, SpanStates } from '@public-ui/schema';
import { mixMembers } from 'stencil-awesome-test';

import { mapIconProp2State, showExpertSlot } from '@public-ui/schema';

import { md } from '../../../utils/markdown';
import { getIconHtml } from '../../icon/test/html.mock';

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
	options?: SpanOptions
): string => {
	const state = mixMembers<SpanProps, SpanStates>(
		{
			_allowMarkdown: false,
			_hideLabel: false,
			_icons: {},
			_label: '', // ⚠ required
		},
		props
	);

	/**
	 * @todo: This covers the case where the label is undefined or null. But why?
	 */
	state._label = state._label ?? '';

	const hideExpertSlot = !showExpertSlot(state._label);
	const icon = mapIconProp2State(state._icons as KoliBriIconsProp);
	const classNames: string[] = [...(state._hideLabel === true ? [`hide-label`] : []), ...(options?.additionalClassNames ?? [])];

	return `
<kol-span-wc${classNames.length ? ` class="${classNames.join(' ')}"` : ``}${options?.additionalAttrs ?? ''}>
	${
		icon.top
			? getIconHtml({
					_label: (icon.top as KoliBriCustomIcon).label ?? '',
					_icons: (icon.top as KoliBriCustomIcon).icon,
			  })
			: ''
	}
	<span>
		${
			icon.left
				? getIconHtml(
						{
							_label: (icon.left as KoliBriCustomIcon).label ?? '',
							_icons: (icon.left as KoliBriCustomIcon).icon,
						},
						` class="kol-icon icon left"`
				  )
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
				? getIconHtml(
						{
							_label: (icon.right as KoliBriCustomIcon).label ?? '',
							_icons: (icon.right as KoliBriCustomIcon).icon,
						},
						` class="icon right"`
				  )
				: ''
		}
	</span>
	${
		icon.bottom
			? getIconHtml({
					_label: (icon.bottom as KoliBriCustomIcon).label ?? '',
					_icons: (icon.bottom as KoliBriCustomIcon).icon,
			  })
			: ''
	}
</kol-span-wc>`;
};

export const getSpanHtml = (
	props: SpanProps,
	slots: Slots = {
		expert: `<slot name="expert" slot="expert"></slot>`,
	}
): string => {
	return `
<kol-span>
	<mock:shadow-root>
		${getSpanWcHtml(props, slots, { additionalClassNames: ['kol-span', 'kol-span-wc'] })}
	</mock:shadow-root>
</kol-span>`;
};
