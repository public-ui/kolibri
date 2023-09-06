import { mixMembers } from 'stencil-awesome-test';

import { KoliBriCustomIcon, KoliBriIconProp } from '../../../types/icon';
import { mapIconProp2State } from '../../../types/props/icon';
import { getIconHtml } from '../../icon/test/html.mock';
import { Props, States } from '../types';

type Slots = {
	''?: string;
	expert?: string;
} & Record<string, undefined | string>;
export type SpanOptions = {
	parsedLabel?: string;
	additionalAttrs?: string;
};
export const getSpanWcHtml = (
	props: Props,
	slots: Slots = {
		expert: undefined,
	},
	options?: SpanOptions
): string => {
	const state = mixMembers<Props, States>(
		{
			_allowMarkdown: false,
			_icon: {},
			_hideLabel: false,
			_label: false, // ⚠ required
		},
		props
	);
	if (state._label === '') {
		state._label = false; // TODO: remove this workaround in v2
	}
	const hideExpertSlot: boolean = typeof state._label === 'string';
	const icon = mapIconProp2State(state._icon as KoliBriIconProp);
	return `
<kol-span-wc${state._hideLabel === true ? ` class="icon-only hide-label"` : ``}${options?.additionalAttrs ?? ''}>
	${
		icon.top
			? getIconHtml({
					_label: '',
					_icon: (icon.top as KoliBriCustomIcon).icon,
			  })
			: ''
	}
	<span>
		${
			icon.left
				? getIconHtml(
						{
							_label: '',
							_icon: (icon.left as KoliBriCustomIcon).icon,
						},
						` class="icon left"`
				  )
				: ''
		}
		${
			!state._hideLabel && hideExpertSlot
				? state._allowMarkdown && options?.parsedLabel !== undefined
					? `<span class="span-label md">${options.parsedLabel}</span>`
					: `<span class="span-label">${state._label as string}</span>`
				: ``
		}
		<span class="span-label" ${hideExpertSlot ? ' aria-hidden="true" hidden' : ''}>
			${slots.expert ? slots.expert : ``}
		</span>
		${
			icon.right
				? getIconHtml(
						{
							_label: '',
							_icon: (icon.right as KoliBriCustomIcon).icon,
						},
						` class="icon right"`
				  )
				: ''
		}
	</span>
	${
		icon.bottom
			? getIconHtml({
					_label: '',
					_icon: (icon.bottom as KoliBriCustomIcon).icon,
			  })
			: ''
	}
</kol-span-wc>`;
};

export const getSpanHtml = (
	props: Props,
	slots: Slots = {
		expert: `<slot name="expert" slot="expert"></slot>`,
	}
): string => {
	return `
<kol-span>
	<mock:shadow-root>
		${getSpanWcHtml(props, slots)}
	</mock:shadow-root>
</kol-span>`;
};
