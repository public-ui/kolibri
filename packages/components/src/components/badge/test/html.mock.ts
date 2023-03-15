import { mixMembers } from 'stencil-awesome-test';
import { getSpanWcHtml } from '../../span/test/html.mock';
import { Props, States } from '../component';
import { createContrastColorPair, ColorContrast } from '../contrast';

export const getBadgeHtml = (props: Props, additionalAttrs = ''): string => {
	const state = mixMembers<Props, States>(
		{
			_color: '#000',
			_label: '…', // ⚠ required
		},
		props
	);

	let contrastColorPair: ColorContrast<string>;
	if (typeof state._color === 'string') {
		contrastColorPair = createContrastColorPair(state._color);
	} else {
		contrastColorPair = createContrastColorPair({
			background: state._color?.backgroundColor,
			foreground: state._color?.color,
		});
	}

	return `<kol-badge${props._iconOnly ? ' _icon-only' : ''}${additionalAttrs}>
	<mock:shadow-root>
		<span style="background-color: ${contrastColorPair.background}; color: ${contrastColorPair.foreground};">
			${getSpanWcHtml(props)}
		</span>
	</mock:shadow-root>
</kol-badge>`;
};
