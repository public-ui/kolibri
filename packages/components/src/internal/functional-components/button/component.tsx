import type { FunctionalComponent as FC } from '@stencil/core';
import { h } from '@stencil/core';

import { showExpertSlot } from '../../../schema';
import { bem } from '../../../schema/bem-registry';
import clsx from '../../../utils/clsx';
import type { FunctionalComponentProps } from '../generic-types';
import { SpanFC } from '../span/component';
import { TooltipFC } from '../tooltip/component';
import type { ButtonApi } from './api';

const buttonBem = bem.forBlock('kol-button');

type ButtonFCProps = FunctionalComponentProps<ButtonApi> & {
	tooltipId?: string;
	handleClick: (event: MouseEvent) => void;
	handleMouseDown: (event: MouseEvent) => void;
	handleFocus: (event: FocusEvent) => void;
	handleBlur: (event: FocusEvent) => void;
};

export const ButtonFC: FC<ButtonFCProps> = (props) => {
	const {
		accessKey,
		ariaControls,
		ariaDescription,
		ariaExpanded,
		ariaSelected,
		customClass,
		disabled,
		hideLabel,
		icons,
		id,
		inline,
		label,
		name,
		role,
		shortKey,
		tabIndex,
		type,
		variant,
		handleClick,
		handleMouseDown,
		handleFocus,
		handleBlur,
		refButton,
		refTooltipFloating,
		tooltipId,
	} = props;

	const hasExpertSlot = showExpertSlot(label);
	const ariaDescriptionValue = ariaDescription?.trim();
	const badgeText = accessKey || shortKey;
	const isDisabled = disabled === true;
	const hideLabel_ = hideLabel === true;

	const buttonClass = clsx(
		buttonBem({
			disabled: isDisabled,
			[`${variant}`]: variant !== 'custom',
			inline: inline === true,
			standalone: inline === false,
			'hide-label': hideLabel_,
		}),
		typeof customClass === 'string' && customClass.length > 0 ? customClass : undefined,
	);

	return (
		<button
			ref={refButton}
			accessKey={accessKey || undefined}
			aria-controls={ariaControls || undefined}
			aria-description={ariaDescriptionValue || undefined}
			aria-expanded={ariaExpanded || undefined}
			aria-keyshortcuts={shortKey || undefined}
			aria-label={hideLabel_ && typeof label === 'string' && label.length > 0 ? label : undefined}
			aria-selected={ariaSelected || undefined}
			class={buttonClass}
			disabled={isDisabled}
			id={id || undefined}
			name={name || undefined}
			onClick={handleClick}
			onMouseDown={handleMouseDown}
			onFocus={handleFocus}
			onBlur={handleBlur}
			role={role || undefined}
			tabIndex={tabIndex === '' ? undefined : tabIndex}
			type={type}
		>
			<SpanFC class={buttonBem('text')} badgeText={badgeText} icons={icons} hideLabel={hideLabel_} label={hasExpertSlot ? '' : label}>
				<slot name="expert" slot="expert"></slot>
			</SpanFC>
			{hideLabel_ && typeof label === 'string' && label.length > 0 && tooltipId && (
				<div class={buttonBem('tooltip')}>
					<TooltipFC badgeText={badgeText || ''} label={label} id={tooltipId} refFloating={refTooltipFloating} />
				</div>
			)}
		</button>
	);
};
