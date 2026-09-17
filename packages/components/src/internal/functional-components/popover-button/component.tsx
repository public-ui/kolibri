import type { FunctionalComponent as FC } from '@stencil/core';
import { h } from '@stencil/core';

import { BemRootNodeFC } from '../bem-root-node/component';
import { ButtonFC } from '../button/component';
import type { FunctionalComponentProps } from '../generic-types';
import { PopoverFC } from '../popover/component';
import type { PopoverButtonApi } from './api';

/**
 * Renders the popover toggle button and the popover as siblings inside a single BEM root.
 *
 * The root must stay an **ancestor** of the button: base and theme styles size the embedded
 * button and style the popover via descendant selectors (`.kol-popover-button--inline
 * .kol-button …`), so the classes cannot merge onto the `kol-button` node itself.
 *
 * The popover's default slot distributes the light DOM of the surrounding web component, so
 * consumer content ends up inside the popover element exactly as in the predecessor.
 */
export const PopoverButtonFC: FC<FunctionalComponentProps<PopoverButtonApi>> = (props) => {
	const {
		accessKey,
		ariaDescription,
		ariaDescriptionId,
		ariaHasPopup,
		ariaSelected,
		customClass,
		disabled,
		handleBlur,
		handleClick,
		handleFocus,
		handleMouseDown,
		hideLabel,
		icons,
		id,
		inline,
		label,
		name,
		on,
		popoverAlign,
		popoverOpen,
		popoverId,
		refButton,
		refPopover,
		refTooltip,
		role,
		shortKey,
		tabIndex,
		tooltipAlign,
		type,
		variant,
	} = props;

	return (
		<BemRootNodeFC
			block="kol-popover-button"
			class={props.class}
			modifiers={{
				open: popoverOpen,
				inline: inline === true,
				standalone: inline === false,
			}}
		>
			<ButtonFC
				accessKey={accessKey}
				ariaControls={popoverId}
				ariaDescription={ariaDescription}
				ariaDescriptionId={ariaDescriptionId}
				ariaExpanded={popoverOpen ? 'true' : 'false'}
				ariaHasPopup={ariaHasPopup}
				ariaSelected={ariaSelected}
				customClass={customClass}
				disabled={disabled}
				handleBlur={handleBlur}
				handleClick={handleClick}
				handleFocus={handleFocus}
				handleMouseDown={handleMouseDown}
				hideLabel={hideLabel}
				icons={icons}
				id={id}
				inline={inline}
				label={label}
				name={name}
				on={on}
				refButton={refButton}
				refTooltip={refTooltip}
				role={role}
				shortKey={shortKey}
				tabIndex={tabIndex}
				tooltipAlign={tooltipAlign}
				type={type}
				variant={variant}
			/>
			<PopoverFC align={popoverAlign} class="kol-popover-button__popover" id={popoverId} popoverRef={refPopover} />
		</BemRootNodeFC>
	);
};
