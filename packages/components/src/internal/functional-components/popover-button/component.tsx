import type { FunctionalComponent as FC } from '@stencil/core';
import { Fragment, h } from '@stencil/core';
import type { JSXBase } from '@stencil/core/internal';
import { bem } from '../../../schema/bem-registry';
import clsx from '../../../utils/clsx';
import { ButtonFC } from '../button/component';
import type { ResolvedButtonProps } from '../button/resolve-props';
import type { FunctionalComponentProps } from '../generic-types';
import { PopoverFC } from '../popover/component';
import type { PopoverButtonApi } from './api';

const popoverButtonBem = bem.forBlock('kol-popover-button');
const BEM_CLASS_POPOVER_BUTTON__POPOVER = popoverButtonBem('popover');

type PopoverButtonFCProps = Pick<
	FunctionalComponentProps<PopoverButtonApi>,
	'ariaDescriptionId' | 'handleBlur' | 'handleClick' | 'handleFocus' | 'handleMouseDown' | 'popoverAlign' | 'refButton' | 'refTooltip'
> & {
	/** The fully normalized button render props, resolved from the public button props by the WC. */
	buttonProps: ResolvedButtonProps;
	/** Whether the popover is currently open. Drives the BEM modifier and `aria-expanded`. */
	popoverOpen: boolean;
	/** DOM id linking the button's `aria-controls` to the popover element. */
	popoverId: string;
	/** Ref callback for the popover element. */
	popoverRef?: (el?: HTMLDivElement) => void;
	/** Extra class forwarded onto the popover-button wrapper (e.g. `kol-split-button__secondary-button`). */
	class?: JSXBase.HTMLAttributes<HTMLElement>['class'];
};

/**
 * Renders the popover button: a `ButtonFC` carrying the `kol-popover-button` block class plus its
 * modifiers, with a `PopoverFC` as its sibling.
 *
 * `ButtonFC` owns its own `kol-button` BEM root, so the popover-button block class is forwarded as
 * the button's `class` prop — `BemRootNodeFC` merges it onto the `kol-button` root node. The popover
 * is a sibling so its `:popover-open` state and the `+ .kol-popover` selector stay intact.
 */
export const PopoverButtonFC: FC<PopoverButtonFCProps> = (props) => {
	const {
		ariaDescriptionId,
		buttonProps,
		handleBlur,
		handleClick,
		handleFocus,
		handleMouseDown,
		popoverAlign,
		popoverId,
		popoverOpen,
		popoverRef,
		refButton,
		refTooltip,
		class: hostClass,
	} = props;
	return (
		<>
			<ButtonFC
				{...buttonProps}
				accessKey={buttonProps.accessKey}
				ariaControls={popoverId}
				ariaDescriptionId={ariaDescriptionId}
				ariaExpanded={popoverOpen ? 'true' : 'false'}
				ariaHasPopup={'true'}
				class={clsx(popoverButtonBem({ open: popoverOpen, inline: buttonProps.inline === true, standalone: buttonProps.inline === false }), hostClass)}
				handleBlur={handleBlur}
				handleClick={handleClick}
				handleFocus={handleFocus}
				handleMouseDown={handleMouseDown}
				refButton={refButton}
				refTooltip={refTooltip}
			/>
			<PopoverFC align={popoverAlign} class={BEM_CLASS_POPOVER_BUTTON__POPOVER} id={popoverId} popoverRef={popoverRef}>
				<slot />
			</PopoverFC>
		</>
	);
};
