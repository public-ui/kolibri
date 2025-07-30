import type { FunctionalComponent as FC, EventEmitter } from '@stencil/core';
import { h } from '@stencil/core';
import type { NamePropType } from './schema/props/name';
import type { ShowPropType } from './schema/props/show';

export type SkeletonState = {
	nameState?: NamePropType;
	showState?: ShowPropType;
};

export type SkeletonRefs = {
	setSpanRef: (element?: HTMLSpanElement) => void;
};

export type SkeletonEmitter = {
	onLoadedEmitter: EventEmitter<void>;
};

export type SkeletonCallbacks = {
	onClick: () => void;
};

export const SkeletonFC: FC<SkeletonState & SkeletonRefs & SkeletonEmitter & SkeletonCallbacks> = ({
	nameState,
	showState,
	setSpanRef,
	onLoadedEmitter,
	onClick,
}) => {
	if (showState) {
		setTimeout(() => onLoadedEmitter.emit(), 2000);
		return (
			<span
				ref={setSpanRef}
				role="button"
				tabIndex={0}
				onClick={onClick}
				onKeyDown={(event): void => {
					if (event.key === 'Enter' || event.key === ' ') {
						onClick();
					}
				}}
			>
				{nameState}
			</span>
		);
	}
	return null;
};
