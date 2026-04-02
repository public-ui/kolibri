import type { FunctionalComponent as FC } from '@stencil/core';
import { h } from '@stencil/core';

import { showExpertSlot } from '../../../schema';
import { bem } from '../../../schema/bem-registry';
import type { FunctionalComponentProps } from '../generic-types';
import { SpanFC } from '../span/component';
import { TooltipFC } from '../tooltip/component';
import type { ButtonApi } from './api';

const buttonBem = bem.forBlock('kol-button');

function mapBoolean2String(value?: boolean): string | undefined {
	if (value === true) {
		return 'true';
	}
	if (value === false) {
		return 'false';
	}
	return undefined;
}

function mapStringOrBoolean2String(value?: string | boolean): string | undefined {
	if (typeof value === 'boolean') {
		return mapBoolean2String(value);
	}
	if (typeof value === 'string') {
		return value;
	}
	return undefined;
}

type ButtonFCProps = FunctionalComponentProps<ButtonApi> & {
	tooltipId?: string;
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
		refButton,
		refTooltipFloating,
		tooltipId,
	} = props;

	const hasExpertSlot = showExpertSlot(label);
	const ariaDescriptionValue = ariaDescription?.trim();
	const badgeText = accessKey || shortKey;
	const isDisabled = disabled === true;
	const hideLabel_ = hideLabel === true;

	const buttonClass = buttonBem({
		disabled: isDisabled,
		[`${variant}`]: variant !== 'custom',
		inline: inline === true,
		standalone: inline === false,
		'hide-label': hideLabel_,
		[customClass]: typeof customClass === 'string' && customClass.length > 0,
	});

	return (
		<button
			ref={refButton}
			accessKey={accessKey}
			aria-controls={ariaControls}
			aria-description={ariaDescriptionValue || undefined}
			aria-expanded={mapBoolean2String(ariaExpanded)}
			aria-keyshortcuts={shortKey}
			aria-label={hideLabel_ && typeof label === 'string' && label.length > 0 ? label : undefined}
			aria-selected={mapStringOrBoolean2String(ariaSelected)}
			class={buttonClass}
			disabled={isDisabled}
			id={id}
			name={name}
			onClick={handleClick}
			onMouseDown={handleMouseDown}
			role={role}
			tabIndex={tabIndex}
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
