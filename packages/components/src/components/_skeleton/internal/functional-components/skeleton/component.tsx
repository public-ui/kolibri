import type { FunctionalComponent as FC } from '@stencil/core';
import { h } from '@stencil/core';
import type { NamePropType } from './schema/props/name';
import type { ShowPropType } from './schema/props/show';
import type { FunctionalComponentProps } from '../generic-types';

export type SkeletonCallbacks = {
	click: () => void;
};

export type SkeletonEmitters = {
	loaded: number;
};

export type SkeletonRefs = {
	button: HTMLButtonElement;
};

export type SkeletonState = {
	name: NamePropType;
	show: ShowPropType;
};

type Props = FunctionalComponentProps<SkeletonState, SkeletonCallbacks, SkeletonEmitters, SkeletonRefs>;

export const SkeletonFC: FC<Props> = ({ name, show, handleClick, onLoaded, refButton }) => {
	if (show) {
		setTimeout(() => onLoaded.emit(1), 2000);
		return (
			<button
				ref={refButton}
				onClick={handleClick}
				onKeyDown={(event): void => {
					if (event.key === 'Enter' || event.key === ' ') {
						handleClick();
					}
				}}
			>
				{name}
			</button>
		);
	}
	return null;
};
