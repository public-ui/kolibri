import { mixMembers } from 'stencil-awesome-test';
import type { ButtonLinkProps, ButtonLinkStates } from '../../../schema';
import { KolButtonWcTag } from '../../../core/component-names';

export const getButtonLinkHtml = (props: ButtonLinkProps): string => {
	const state = mixMembers<ButtonLinkProps, ButtonLinkStates>(
		{
			_icons: {},
			_label: '', // ⚠ required
			_on: {},
			_type: 'button',
			_variant: 'normal',
		},
		props,
	);

	return `<kol-button-link class="kol-button-link">
		<mock:shadow-root>
		<${KolButtonWcTag}
					_role="link"
					_type="button"
					${state._label !== null && state._label !== '' ? `_label="${state._label}"` : ''}
					_tooltipalign="top"
				>
					<slot name="expert" slot="expert"></slot>
				</${KolButtonWcTag}>
		</mock:shadow-root>
	</kol-button-link>`;
};
