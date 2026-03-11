import type { FunctionalComponent as FC } from '@stencil/core';
import { h } from '@stencil/core';

import type { JSXBase } from '@stencil/core/internal';
import clsx from '../../../utils/clsx';
import type { FunctionalComponentProps } from '../generic-types';
import type { PopoverApi } from './api';

export type PopoverFCProps = FunctionalComponentProps<PopoverApi> &
	JSXBase.HTMLAttributes<HTMLDivElement> & {
		popoverRef?: (el?: HTMLDivElement) => void;
		arrowRef?: (el?: HTMLDivElement) => void;
	};

export const PopoverFC: FC<PopoverFCProps> = (props) => {
	const { align = 'top', popoverRef, arrowRef, class: classNames } = props;

	return (
		<div class={clsx('kol-popover', classNames)}>
			<div class="kol-popover__content" ref={popoverRef} popover="auto">
				<div class={clsx('kol-popover__arrow', `kol-popover__arrow--${align}`)} ref={arrowRef} />
				<slot />
			</div>
		</div>
	);
};
