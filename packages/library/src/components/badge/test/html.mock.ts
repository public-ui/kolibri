import { mixMembers } from 'stencil-awesome-test';
import { Nationalfarben } from '../../../enums/color';
import { getSpanWcHtml } from '../../span/test/html.mock';
import { Props, States } from '../component';
import { createContrastColorPair, KoliBriContrastColor } from '../contrast';

export const getBadgeHtml = (props: Props, additionalAttrs = ''): string => {
	const state = mixMembers<Props, States>(
		{
			_color: Nationalfarben.Schwarz,
		},
		props
	);

	let contrastColorPair: KoliBriContrastColor;
	if (typeof state._color === 'string') {
		contrastColorPair = createContrastColorPair(state._color);
	} else {
		contrastColorPair = createContrastColorPair({
			baseColor: state._color?.backgroundColor,
			contrastColor: state._color?.color,
		});
	}

	return `<kol-badge${props._iconOnly ? ' _icon-only' : ''}${additionalAttrs}>
	<mock:shadow-root>
		<span style="background-color: ${contrastColorPair.baseColor}; color: ${contrastColorPair.contrastColor};">
			${getSpanWcHtml(props)}
		</span>
	</mock:shadow-root>
</kol-badge>`;
};
