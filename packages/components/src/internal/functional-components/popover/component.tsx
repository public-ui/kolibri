import type { FunctionalComponent as FC } from '@stencil/core';
import { h } from '@stencil/core';

import type { FunctionalComponentProps } from '../generic-types';
import type { PopoverApi } from './api';

export const PopoverFC: FC<FunctionalComponentProps<PopoverApi>> = (props) => {
	const { align, visible, refPopoverElement, refArrowElement } = props;
	return (
		<div
			class={{
				'kol-popover__content': true,
				'kol-popover__content--visible': visible,
			}}
			ref={refPopoverElement}
			popover="auto"
		>
			<div class={`kol-popover__arrow kol-popover__arrow--${align}`} ref={refArrowElement} />
			<slot />
		</div>
	);
};
