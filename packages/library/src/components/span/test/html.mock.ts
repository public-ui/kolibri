import { mixMembers } from 'stencil-awesome-test';
import { KoliBriAllIcon, KoliBriCustomIcon } from '../../../types/icon';
import { reflectAttrs } from '../../../utils/testing';
import { getIconHtml } from '../../icon/test/html.mock';
import { Props } from '../component';

export const getSpanWcHtml = (props: Props): string => {
	props = mixMembers(
		{
			_label: '',
		},
		props
	);
	return `
<kol-span-wc${reflectAttrs(props)}>
	${
		(props._icon as KoliBriAllIcon).top
			? getIconHtml({
					_ariaLabel: '',
					_icon: ((props._icon as KoliBriAllIcon).top as KoliBriCustomIcon).icon,
			  })
			: ''
	}
	<span class="flex items-center">
		${
			(props._icon as KoliBriAllIcon).left
				? getIconHtml({
						_ariaLabel: '',
						_icon: ((props._icon as KoliBriAllIcon).left as KoliBriCustomIcon).icon,
				  })
				: ''
		}
		<span>${props._iconOnly !== true && props._label.length > 0 ? props._label : ``}</span>
		<span></span>
		${
			(props._icon as KoliBriAllIcon).right
				? getIconHtml({
						_ariaLabel: '',
						_icon: ((props._icon as KoliBriAllIcon).right as KoliBriCustomIcon).icon,
				  })
				: ''
		}
	</span>
	${
		(props._icon as KoliBriAllIcon).bottom
			? getIconHtml({
					_ariaLabel: '',
					_icon: ((props._icon as KoliBriAllIcon).bottom as KoliBriCustomIcon).icon,
			  })
			: ''
	}
</kol-span-wc>`;
};
