import type { FunctionalComponent as FC } from '@stencil/core';
import { Fragment, h } from '@stencil/core';

import { bem } from '../../../schema/bem-registry';
import { classNameFromVariant } from '../../../schema/props/variant-class-name';
import clsx from '../../../utils/clsx';
import { BemRootNodeFC } from '../bem-root-node/component';
import type { FunctionalComponentProps } from '../generic-types';
import { SpanFC } from '../span/component';
import { TooltipFC } from '../tooltip/component';
import type { ButtonApi } from './api';

const buttonBem = bem.forBlock('kol-button');
const BEM_CLASS_BUTTON__BUTTON = buttonBem('button');
const BEM_CLASS_BUTTON__TEXT = buttonBem('text');
const BEM_CLASS_BUTTON__TOOLTIP = buttonBem('tooltip');

/**
 * Renders the button, its floating tooltip and its visually-hidden description.
 *
 * The tooltip and the description span cannot live inside the `<button>` — a nested tooltip would
 * become part of the accessible name, and the description is referenced by `aria-describedby` from
 * outside. They are rendered as siblings of the `BemRootNodeFC` wrapper (direct children of the
 * host), exactly where they sat before the skeleton migration: putting the `position: fixed`
 * `kol-button__tooltip` subtree inside the extra wrapper `<div>` makes Firefox rasterise its
 * compositing layer ~2px differently (visible on `kern`'s dialog/drawer/modal close-button
 * tooltip, invisible elsewhere only because those themes' tooltip fonts hint more robustly).
 */
export const ButtonFC: FC<FunctionalComponentProps<ButtonApi>> = (props) => {
	const {
		accessKey,
		ariaControls,
		ariaDescription,
		ariaDescriptionId,
		ariaExpanded,
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
		refButton,
		refTooltip,
		role,
		shortKey,
		tabIndex,
		type,
		variant,
	} = props;

	const badgeText = accessKey || shortKey;
	const hasLabelText = label.length > 0;
	const hasAriaDescription = ariaDescription.trim().length > 0;

	return (
		<Fragment>
			<BemRootNodeFC
				block="kol-button"
				class={clsx({
					[classNameFromVariant(variant, 'button')]: variant.length > 0,
					[customClass]: customClass.length > 0,
				})}
				modifiers={{
					disabled,
					'hide-label': hideLabel,
					inline: inline === true,
					standalone: inline === false,
				}}
			>
				<button
					ref={refButton}
					accessKey={accessKey || undefined}
					aria-controls={ariaControls || undefined}
					aria-describedby={hasAriaDescription ? ariaDescriptionId : undefined}
					aria-expanded={ariaExpanded || undefined}
					aria-haspopup={ariaHasPopup || undefined}
					aria-keyshortcuts={shortKey || undefined}
					aria-label={hideLabel && hasLabelText ? label : undefined}
					aria-selected={ariaSelected || undefined}
					class={BEM_CLASS_BUTTON__BUTTON}
					disabled={disabled}
					id={id || undefined}
					name={name || undefined}
					onBlur={handleBlur}
					onClick={handleClick}
					onFocus={handleFocus}
					onMouseDown={handleMouseDown}
					role={role || undefined}
					tabIndex={tabIndex}
					type={type}
				>
					<SpanFC class={BEM_CLASS_BUTTON__TEXT} badgeText={badgeText} icons={icons} hideLabel={hideLabel} label={label}>
						<slot name="expert" slot="expert"></slot>
					</SpanFC>
				</button>
			</BemRootNodeFC>
			{hideLabel && hasLabelText && (
				<div class={BEM_CLASS_BUTTON__TOOLTIP}>
					<TooltipFC badgeText={badgeText} label={label} refFloating={refTooltip} />
				</div>
			)}
			{hasAriaDescription && (
				<span class="visually-hidden" id={ariaDescriptionId}>
					{ariaDescription}
				</span>
			)}
		</Fragment>
	);
};
