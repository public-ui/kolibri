import type { FunctionalComponent as FC } from '@stencil/core';
import { h } from '@stencil/core';
import type { NamePropType } from './schema/props/name';
import type { ShowPropType } from './schema/props/show';
import type { FunctionalComponentProps } from '../generic-types';

export type SkeletonCallbacks = Record<never, never>;

export type SkeletonEmitters = {
	loaded: number;
};

export type SkeletonRefs = {
	span: HTMLSpanElement;
};

export type SkeletonState = {
	name: NamePropType;
	show: ShowPropType;
};

type Props = FunctionalComponentProps<SkeletonState, SkeletonCallbacks, SkeletonEmitters, SkeletonRefs>;

export const SkeletonFC: FC<Props> = ({ name, show, onLoaded, refSpan }) => {
	if (show) {
		setTimeout(() => onLoaded.emit(1), 2000);
		return <span ref={refSpan}>{name}</span>;
	}
	return null;
};
