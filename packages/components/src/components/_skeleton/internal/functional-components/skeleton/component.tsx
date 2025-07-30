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

export const SkeletonFC: FC<SkeletonState & SkeletonRefs & SkeletonEmitter> = ({ nameState, showState, setSpanRef, onLoadedEmitter }) => {
	if (showState) {
		setTimeout(() => onLoadedEmitter.emit(), 2000);
		return <span ref={setSpanRef}>{nameState}</span>;
	}
	return null;
};
