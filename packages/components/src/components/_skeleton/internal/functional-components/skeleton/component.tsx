import { h } from '@stencil/core';
import type { JSX } from '@stencil/core';
import type { NamePropType } from './schema/props/name';

export type SkeletonFunctionalProps = {
	nameState?: NamePropType;
};

export const SkeletonFunctionalComponent = ({ nameState }: SkeletonFunctionalProps): JSX.Element => {
	return <div>{nameState}</div>;
};
