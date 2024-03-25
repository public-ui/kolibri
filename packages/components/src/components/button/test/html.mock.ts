import { mixMembers } from 'stencil-awesome-test';

import { showExpertSlot } from '@public-ui/schema';

import clsx from 'clsx';

import type { ButtonProps, ButtonStates } from '@public-ui/schema';
import { KolSpanWcTag, KolTooltipWcTag } from '../../../core/component-names';

export const getButtonWcHtml = (props: ButtonProps, additionalAttrs = ''): string => {
	const state = mixMembers<ButtonProps, ButtonStates>(
		{
			_icons: {},
			_label: '', // ⚠ required
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

	const classNames = clsx({
		button: true,
		disabled: state._disabled,
		'hide-label': state._hideLabel,
		[variant]: true,
	});

	return `<kol-button-wc${additionalAttrs}>
	<button${ariaControls ? ' aria-controls="nonce"' : ''}${
		typeof state._ariaExpanded === 'boolean' ? ` aria-expanded="${ariaExpanded === true ? 'true' : 'false'}"` : ''
	}
	${state._hideLabel && typeof state._label === 'string' ? ` aria-label="${state._label}"` : ''}
	class="${classNames}"
	${state._disabled ? `disabled` : ''}
	${state._role ? `role="${state._role}"` : ''} type="${type}">

		<${KolSpanWcTag}
		class="button-inner"
		_label="${hasExpertSlot ? '' : state._label}"
	>
		<slot name="expert" slot="expert"></slot>
	</${KolSpanWcTag}>

	</button>
	<${KolTooltipWcTag}
				aria-hidden="true"
				hidden=""
					${state._tooltipAlign ? `_align=${state._tooltipAlign}` : "_align='top'"}
					_label="${typeof state._label === 'string' ? state._label : ''}"
				></${KolTooltipWcTag}>
</kol-button-wc>`;
};

export const getButtonHtml = (props: ButtonProps): string => {
	const state = mixMembers<ButtonProps, ButtonStates>(
		{
			_icons: {},
			_label: '', // ⚠ required
			_type: 'button',
			_variant: 'normal',
		},
		props,
	);
	return `<kol-button class="kol-button">
  <mock:shadow-root>
    ${getButtonWcHtml(props, ` class="kol-button-wc button ${state._variant}"`)}
  </mock:shadow-root>
</kol-button>`;
};
