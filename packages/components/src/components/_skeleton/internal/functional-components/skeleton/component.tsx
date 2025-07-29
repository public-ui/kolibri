import type { FunctionalComponent as FC } from '@stencil/core';
import { h } from '@stencil/core';
import type { SkeletonState } from './controller';

export const SkeletonFC: FC<SkeletonState> = ({ nameState, showState }) => {
	return showState && <span>{nameState}</span>;
};
