import type { FunctionalComponent as FC } from '@stencil/core';
import { h } from '@stencil/core';
import { bem } from '../../../../internals/src/schema/bem-registry';

import type { JSXBase } from '@stencil/core/internal';
import type { FunctionalComponentProps } from '../../../../internals/src/controller/generic-types';
import type { PopoverApi } from '../../../../internals/src/controller/popover/api';
import clsx from '../../../../internals/src/utils/clsx';

export type PopoverFCProps = FunctionalComponentProps<PopoverApi> &
	JSXBase.HTMLAttributes<HTMLDivElement> & {
		popoverRef?: (el?: HTMLDivElement) => void;
		arrowRef?: (el?: HTMLDivElement) => void;
	};

/**
 * The popover content is the given children; without children, the default slot distributes the
 * light DOM of the surrounding web component.
 */
const popoverBem = bem.forBlock('kol-popover');

export const PopoverFC: FC<PopoverFCProps> = (props, children) => {
	const { align = 'bottom', popoverRef, arrowRef, class: classNames, ...rest } = props;

	return (
		<div {...rest} class={clsx(popoverBem(), classNames)} ref={popoverRef} popover="auto">
			<div class={clsx(popoverBem('arrow'), popoverBem('arrow', { [align]: true }))} ref={arrowRef} />
			{children.length > 0 ? children : <slot />}
		</div>
	);
};
