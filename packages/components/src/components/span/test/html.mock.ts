import { mixMembers } from 'stencil-awesome-test';

import { KoliBriCustomIcon, KoliBriIconsProp } from '../../../types/icons';
import { mapIconProp2State } from '../../../types/props/icons';
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
	additionalClassNames?: string[];
};
export const getSpanWcHtml = (
	props: Props,
	slots: Slots = {
		expert: undefined,
	},
	options?: SpanOptions,
): string => {
	const state = mixMembers<Props, States>(
		{
			_allowMarkdown: false,
			_hideLabel: false,
			_icons: {},
			_label: '…', // ⚠ required
		},
		props,
	);

	/**
	 * @todo: This covers the case where the label is undefined or null. But why?
	 */
	state._label = state._label ?? '…';

	const hideExpertSlot = !showExpertSlot(state._label);
	const icons = mapIconProp2State(state._icons as KoliBriIconsProp);
	const classNames: string[] = [
		...(state._hideLabel === true ? ['icon-only', 'hide-label', 'kol-span-wc'] : ['kol-span-wc']),
		...(options?.additionalClassNames ?? []),
	];

	return `
<kol-span-wc${classNames.length ? ` class="${classNames.join(' ')}"` : ``}${options?.additionalAttrs ?? ''} >
	${
		icons.top
			? getIconHtml({
					_label: (icons.top as KoliBriCustomIcon).label ?? '',
					_icons: (icons.top as KoliBriCustomIcon).icon,
				})
			: ''
	}
	<span>
		${
			icons.left
				? getIconHtml(
						{
							_label: (icons.left as KoliBriCustomIcon).label ?? '',
							_icons: (icons.left as KoliBriCustomIcon).icon,
						},
						` class="kol-icon icon left"`,
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
			icons.right
				? getIconHtml(
						{
							_label: (icons.right as KoliBriCustomIcon).label ?? '',
							_icons: (icons.right as KoliBriCustomIcon).icon,
						},
						` class="icon right"`,
					)
				: ''
		}
	</span>
	${
		icons.bottom
			? getIconHtml({
					_label: (icons.bottom as KoliBriCustomIcon).label ?? '',
					_icons: (icons.bottom as KoliBriCustomIcon).icon,
				})
			: ''
	}
</kol-span-wc>`;
};
