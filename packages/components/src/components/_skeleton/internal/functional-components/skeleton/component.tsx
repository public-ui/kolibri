import type { FunctionalComponent as FC } from '@stencil/core';
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

export const SkeletonFC: FC<SkeletonState & SkeletonRefs> = ({ nameState, showState, setSpanRef }) => {
	return showState && <span ref={setSpanRef}>{nameState}</span>;
};
