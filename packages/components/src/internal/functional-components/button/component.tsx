import type { FunctionalComponent as FC } from '@stencil/core';
import { h } from '@stencil/core';

import { showExpertSlot } from '../../../schema';
import { bem } from '../../../schema/bem-registry';
import clsx from '../../../utils/clsx';
import type { BlockModifiers } from '../bem-root-node/component';
import { BemRootNodeFC } from '../bem-root-node/component';
import type { FunctionalComponentProps } from '../generic-types';
import { SpanFC } from '../span/component';
import { TooltipFC } from '../tooltip/component';
import type { ButtonApi } from './api';

const buttonBem = bem.forBlock('kol-button');

type ButtonFCProps = FunctionalComponentProps<ButtonApi> & {
	/** Additional classes forwarded onto the BEM root node (e.g. from embedding components). */
	class?: string;
	'data-testid'?: string;
	hidden?: boolean;
	ariaCurrent?: string;
	tooltipId?: string;
	handleClick: (event: MouseEvent) => void;
	handleMouseDown: (event: MouseEvent) => void;
	handleFocus: (event: FocusEvent) => void;
	handleBlur: (event: FocusEvent) => void;
};

export const ButtonFC: FC<ButtonFCProps> = (props) => {
	const {
		class: hostClass,
		'data-testid': dataTestId,
		hidden: hostHidden,
		ariaCurrent,
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

	// The free-form variant of kol-button-link is not part of the typed modifier set,
	// but produces a valid `kol-button--<variant>` class at runtime.
	const modifiers = {
		disabled: isDisabled,
		[`${variant}`]: variant !== 'custom',
		inline: inline === true,
		standalone: inline === false,
		'hide-label': hideLabel_,
	} as BlockModifiers<'kol-button'>;

	return (
		<BemRootNodeFC
			block="kol-button"
			modifiers={modifiers}
			class={clsx(hostClass, typeof customClass === 'string' && customClass.length > 0 ? customClass : undefined) || undefined}
			data-testid={dataTestId}
			hidden={hostHidden}
		>
			<button
				ref={refButton}
				accessKey={accessKey || undefined}
				aria-controls={ariaControls || undefined}
				aria-current={ariaCurrent || undefined}
				aria-description={ariaDescriptionValue || undefined}
				aria-expanded={ariaExpanded || undefined}
				aria-keyshortcuts={shortKey || undefined}
				aria-label={hideLabel_ && typeof label === 'string' && label.length > 0 ? label : undefined}
				aria-selected={ariaSelected || undefined}
				class={buttonBem('button')}
				disabled={isDisabled}
				id={id || undefined}
				name={name || undefined}
				onClick={handleClick}
				onMouseDown={handleMouseDown}
				onFocus={handleFocus}
				onBlur={handleBlur}
				role={role || undefined}
				tabIndex={tabIndex === 0 ? undefined : tabIndex}
				type={type}
			>
				<SpanFC class={buttonBem('text')} badgeText={badgeText} icons={icons} hideLabel={hideLabel_} label={hasExpertSlot ? '' : label}>
					<slot name="expert" slot="expert"></slot>
				</SpanFC>
			</button>
			{hideLabel_ && typeof label === 'string' && label.length > 0 && (
				<div class={buttonBem('tooltip')}>
					<TooltipFC badgeText={badgeText || ''} label={label} id={tooltipId} refFloating={refTooltipFloating} />
				</div>
			)}
		</BemRootNodeFC>
	);
};
