import { mixMembers } from 'stencil-awesome-test';
import { Nationalfarben } from '../../../enums/color';
import { getSpanWcHtml } from '../../span/test/html.mock';
import { Props } from '../component';
import { createContrastColorPair, KoliBriContrastColor } from '../contrast';

export const getBadgeHtml = (props: Props, additionalAttrs = ''): string => {
	props = mixMembers(
		{
			_color: Nationalfarben.Schwarz,
			_label: '',
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

	return `<kol-badge${additionalAttrs} style="background-color: ${contrastColorPair.baseColor}; color: ${contrastColorPair.contrastColor};">
  <mock:shadow-root>
		${getSpanWcHtml({
			_label: props._label,
		})}
  </mock:shadow-root>
</kol-badge>`;
};
