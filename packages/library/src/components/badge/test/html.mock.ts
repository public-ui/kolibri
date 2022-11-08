import { mixMembers } from 'stencil-awesome-test';
import { Nationalfarben } from '../../../enums/color';
import { getSpanWcHtml } from '../../span/test/html.mock';
import { Props } from '../component';
import { createContrastColorPair, KoliBriContrastColor } from '../contrast';

export const getBadgeHtml = (props: Props, additionalAttrs = ''): string => {
	const state = mixMembers(
		{
			_color: Nationalfarben.Schwarz,
			_label: '',
		},
		props
	);

	let contrastColorPair: KoliBriContrastColor;
	if (typeof state._color === 'string') {
		contrastColorPair = createContrastColorPair(state._color);
	} else {
		contrastColorPair = createContrastColorPair({
			baseColor: state._color?.backgroundColor as string,
			contrastColor: state._color?.color as string,
		});
	}

	return `<kol-badge${additionalAttrs}>
  <mock:shadow-root>
		${getSpanWcHtml(props, {}, ` style = 'background-color: ${contrastColorPair.baseColor}; color: ${contrastColorPair.contrastColor};'`)}
  </mock:shadow-root>
</kol-badge>`;
};
