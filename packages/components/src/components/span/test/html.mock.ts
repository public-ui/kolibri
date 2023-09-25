import { mixMembers } from 'stencil-awesome-test';

import { KoliBriCustomIcon, KoliBriIconProp } from '../../../types/icon';
import { mapIconProp2State } from '../../../types/props/icon';
import { md } from '../../../utils/markdown';
import { showExpertSlot } from '../../../utils/reuse';
import { getIconHtml } from '../../icon/test/html.mock';
import { Props, States } from '../types';

type Slots = {
	''?: string;
	expert?: string;
} & Record<string, undefined | string>;
export type SpanOptions = {
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
			_label: '', // ⚠ required
		},
		props
	);

	/**
	 * @todo: This covers the case where the label is undefined or null. But why?
	 */
	state._label = state._label ?? '';

	const hideExpertSlot = !showExpertSlot(state._label);
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
