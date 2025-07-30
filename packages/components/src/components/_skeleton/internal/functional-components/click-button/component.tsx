import type { FunctionalComponent as FC } from '@stencil/core';
import { h } from '@stencil/core';
import type { FunctionalComponentProps } from '../generic-types';

export type ClickButtonCallbacks = {
	click: () => void;
};

export type ClickButtonRefs = {
	button: HTMLButtonElement;
};

export type ClickButtonState = Record<never, never>;

export type ClickButtonEmitters = Record<never, never>;

type Props = FunctionalComponentProps<ClickButtonState, ClickButtonCallbacks, ClickButtonEmitters, ClickButtonRefs>;

export const ClickButtonFC: FC<Props> = ({ handleClick, refButton }) => (
	<button
		ref={refButton}
		onClick={handleClick}
		onKeyDown={(event): void => {
			if (event.key === 'Enter' || event.key === ' ') {
				handleClick();
			}
		}}
	>
		Toggle
	</button>
);
