import { Nationalfarben } from '../../../enums/color';
import { getIconIcofontHtml } from '../../icon-icofont/test/html.mock';
import { mixMembers } from 'stencil-awesome-test';
import { Props } from '../component';
import { createContrastColorPair, KoliBriContrastColor } from '../contrast';

export const getBadgeHtml = (props: Props, additionalAttrs = ''): string => {
	props = mixMembers(
		{
			_color: Nationalfarben.Schwarz,
			_label: '',
			_iconAlign: 'left',
		},
		props
	);

	let contrastColorPair: KoliBriContrastColor;
	if (typeof props._color === 'string') {
		contrastColorPair = createContrastColorPair(props._color);
	} else {
		contrastColorPair = createContrastColorPair({
			baseColor: props._color?.backgroundColor as string,
			contrastColor: props._color?.color as string,
		});
	}

	return `<kol-badge${additionalAttrs}>
  <mock:shadow-root>
    <span style="background-color: ${contrastColorPair.baseColor}; color: ${contrastColorPair.contrastColor};">
      ${
				props._iconAlign === 'left' && typeof props._icon === 'string'
					? getIconIcofontHtml(
							{
								_ariaLabel: props._iconOnly === true ? props._label : '',
								_icon: props._icon,
							},
							`${props._iconOnly === true ? '' : ' class="mr-1"'} style="color: ${contrastColorPair.contrastColor};"`
					  )
					: ''
			}
      ${props._iconOnly === true ? '' : props._label}
      ${
				props._iconAlign === 'right' && typeof props._icon === 'string'
					? getIconIcofontHtml(
							{
								_ariaLabel: props._iconOnly === true ? props._label : '',
								_icon: props._icon,
							},
							`${props._iconOnly === true ? '' : ' class="ml-1"'} style="color: ${contrastColorPair.contrastColor};"`
					  )
					: ''
			}

    </span>
  </mock:shadow-root>
</kol-badge>`;
};
