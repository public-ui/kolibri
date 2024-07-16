import { mixMembers } from 'stencil-awesome-test';

import { showExpertSlot } from '../../../utils/reuse';
import { getSpanWcHtml } from '../../span/test/html.mock';
import { getTooltipHtml } from '../../tooltip/test/html.mock';
import { Props, States } from '../types';

type Slots = {
	expert?: string;
};

export const getButtonWcHtml = (
	props: Props,
	slots: Slots = {
		expert: undefined,
	},
	additionalAttrs = '',
): string => {
	const state = mixMembers<Props, States>(
		{
			_icons: {},
			_label: '…', // ⚠ required
			_on: {},
			_type: 'button',
			_variant: 'normal',
		},
		props,
	);
	const ariaControls = typeof state._ariaControls === 'string' ? state._ariaControls : undefined;
	const ariaExpanded = typeof state._ariaExpanded === 'boolean' ? state._ariaExpanded : undefined;
	const hasExpertSlot = showExpertSlot(state._label);
	const type = typeof state._type === 'string' ? state._type : 'button';
	const variant = typeof state._variant === 'string' ? state._variant : 'normal';
	const classNames: string[] = ['button', variant];

	if (state._hideLabel) {
		classNames.push('icon-only', 'hide-label');
	}

	return `<kol-button-wc${additionalAttrs}>
	<button${ariaControls ? ' aria-controls="nonce"' : ''}${
		typeof state._ariaExpanded === 'boolean' ? ` aria-expanded="${ariaExpanded === true ? 'true' : 'false'}"` : ''
	}
	${state._hideLabel && typeof state._label === 'string' ? ` aria-label="${state._label}"` : ''}
	${state._role ? `role="${state._role}"` : ''}
	class="${classNames.join(' ')}" type="${type}">
		${getSpanWcHtml(
			{
				...props,
				_label: state._label,
			},
			slots,
			{
				additionalClassNames: ['button-inner'],
			},
		)}
	</button>
	${getTooltipHtml(
		{
			_align: state._tooltipAlign,
			_label: typeof state._label === 'string' ? state._label : '',
		},
		` aria-hidden="true"${hasExpertSlot || !state._hideLabel ? ' hidden' : ''}`,
	)}
</kol-button-wc>`;
};

export const getButtonHtml = (props: Props): string => {
	const state = mixMembers<Props, States>(
		{
			_icons: {},
			_label: '…', // ⚠ required
			_type: 'button',
			_variant: 'normal',
		},
		props,
	);
	return `<kol-button class="kol-button" >
  <mock:shadow-root>
    ${getButtonWcHtml(
			props,
			{
				expert: `<slot name="expert" slot="expert"></slot>`,
			},
			` class="kol-button-wc button ${state._variant}"`,
		)}
  </mock:shadow-root>
</kol-button>`;
};
