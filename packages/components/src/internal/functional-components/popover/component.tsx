import type { FunctionalComponent as FC } from '@stencil/core';
import { h } from '@stencil/core';

import clsx from '../../../utils/clsx';
import type { FunctionalComponentProps } from '../generic-types';
import type { PopoverApi } from './api';

/**
 * PopoverFC - Functional Component for Popover
 *
 * A stateless renderer that displays the popover content and arrow.
 * Receives normalized props and refs from the PopoverController.
 *
 * Structure:
 * - Outer div: kol-popover__content (the floating element with popover API)
 * - Inner div: kol-popover__arrow (directional indicator, positioned based on align)
 * - Slot: user-provided content
 *
 * Props consumed:
 * - align: alignment direction ('top', 'right', 'bottom', 'left')
 * - show: popover visibility state (W3C Popover API standard)
 *
 * Note: Only show prop is consumed. visible is internal state derived from show.
 */
export const PopoverFC: FC<FunctionalComponentProps<PopoverApi>> = (props) => {
	const { align, show, refPopoverElement, refArrowElement, ...rest } = props;

	// Determine visibility classes
	const contentClasses = clsx('kol-popover__content', rest.class, {
		'kol-popover__content--visible': show === true,
	});

	// Arrow positioning class based on align
	const arrowClasses = clsx('kol-popover__arrow', `kol-popover__arrow--${align || 'top'}`);

	return (
		<div {...rest} class={contentClasses} ref={(el) => refPopoverElement?.(el)} popover="auto">
			<div class={arrowClasses} ref={(el) => refArrowElement?.(el)} />
			<slot />
		</div>
	);
};
