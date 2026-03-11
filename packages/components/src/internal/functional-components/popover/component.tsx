import type { FunctionalComponent as FC } from '@stencil/core';
import { h } from '@stencil/core';

import clsx from '../../../utils/clsx';
import type { FunctionalComponentProps } from '../generic-types';
import type { PopoverApi } from './api';

export const PopoverFC: FC<FunctionalComponentProps<PopoverApi>> = (props) => {
	const { align, refArrowElement, refPopoverElement, visible } = props;

	return (
		<div class="kol-popover">
			<div class={clsx('kol-popover__content', { 'kol-popover__content--visible': visible })} ref={refPopoverElement} popover="auto">
				<div class={clsx('kol-popover__arrow', `kol-popover__arrow--${align}`)} ref={refArrowElement} />
				<slot />
			</div>
		</div>
	);
};
