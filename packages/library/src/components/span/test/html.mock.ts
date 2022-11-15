import { mixMembers } from 'stencil-awesome-test';
import { KoliBriCustomIcon, KoliBriIconProp } from '../../../types/icon';
import { mapIconProp2State } from '../../../utils/validators/icon';
import { getIconHtml } from '../../icon/test/html.mock';
import { Props } from '../component';

type Slots = {
	''?: string;
	expert?: string;
} & Record<string, undefined | string>;

export const getSpanWcHtml = (
	props: Props,
	slots: Slots = {
		expert: undefined,
	},
	additionalAttrs = '',
	hiddenSlot = false
): string => {
	const state = mixMembers(
		{
			_label: '',
		},
		props
	);
	const icon = mapIconProp2State(state._icon as KoliBriIconProp);
	return `
<kol-span-wc${state._iconOnly === true ? ` class="icon-only"` : ``}${additionalAttrs}>
	${
		icon.top
			? getIconHtml({
					_ariaLabel: '',
					_icon: (icon.top as KoliBriCustomIcon).icon,
			  })
			: ''
	}
	${hiddenSlot === true ? `<slot hidden=""></slot>` : ``}
	<span class="flex items-center">
		${
			icon.left
				? getIconHtml(
						{
							_ariaLabel: '',
							_icon: (icon.left as KoliBriCustomIcon).icon,
						},
						` class="icon left${state._iconOnly === true ? ` mr-2` : ``}"`
				  )
				: ''
		}
		<span>${state._iconOnly !== true && state._label.length > 0 ? state._label : ``}</span>
		<span>${typeof slots.default === 'string' ? `<slot>${slots.default}</slot>` : ``}</span>
		${
			icon.right
				? getIconHtml(
						{
							_ariaLabel: '',
							_icon: (icon.right as KoliBriCustomIcon).icon,
						},
						` class="icon right${state._iconOnly === true ? ` ml-2` : ``}"`
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
<kol-span>
	<mock:shadow-root>
		${getSpanWcHtml(props, {}, ``, true)}
	</mock:shadow-root>
</kol-span>`;
};
