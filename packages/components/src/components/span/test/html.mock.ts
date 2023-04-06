import { mixMembers } from 'stencil-awesome-test';
import { KoliBriCustomIcon, KoliBriIconProp } from '../../../types/icon';
import { mapIconProp2State } from '../../../types/props/icon';
import { getIconHtml } from '../../icon/test/html.mock';
import { Props, States } from '../component';

type Slots = {
	''?: string;
	expert?: string;
} & Record<string, undefined | string>;

export const getSpanWcHtml = (
	props: Props,
	slots: Slots = {
		expert: undefined,
	},
	additionalAttrs = ''
): string => {
	const state = mixMembers<Props, States>(
		{
			_icon: {},
			_iconOnly: false,
			_label: '…', // ⚠ required
		},
		props
	);
	const hideExpertSlot = state._label.length > 0;
	const icon = mapIconProp2State(state._icon as KoliBriIconProp);
	return `
<kol-span-wc${props._iconOnly ? ' _icon-only' : ''}${state._iconOnly === true ? ` class="icon-only"` : ``}${additionalAttrs}>
	${
		icon.top
			? getIconHtml({
					_ariaLabel: '',
					_icon: (icon.top as KoliBriCustomIcon).icon,
			  })
			: ''
	}
	<span>
		${
			icon.left
				? getIconHtml(
						{
							_ariaLabel: '',
							_icon: (icon.left as KoliBriCustomIcon).icon,
						},
						` class="icon left"`
				  )
				: ''
		}
		${state._iconOnly !== true && state._label.length > 0 ? `<span>${state._label}</span>` : ``}
		<span${hideExpertSlot ? ' aria-hidden="true" hidden' : ''}>
			${slots.expert ? slots.expert : ``}
		</span>
		${
			icon.right
				? getIconHtml(
						{
							_ariaLabel: '',
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
					_ariaLabel: '',
					_icon: (icon.bottom as KoliBriCustomIcon).icon,
			  })
			: ''
	}
</kol-span-wc>`;
};

export const getSpanHtml = (props: Props): string => {
	return `
<kol-span${props._iconOnly ? ' _icon-only' : ''}>
	<mock:shadow-root>
		${getSpanWcHtml(props, {
			expert: `<slot name="expert" slot="expert"></slot>`,
		})}
	</mock:shadow-root>
</kol-span>`;
};
