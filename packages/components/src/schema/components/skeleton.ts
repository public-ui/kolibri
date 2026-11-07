import type { Generic } from 'adopted-style-sheets';

import type { NamePropType } from '../props';

type RequiredSkeletonProps = {
	name: NamePropType;
};
type OptionalSkeletonProps = NonNullable<unknown>;

export type SkeletonProps = Generic.Element.Members<RequiredSkeletonProps, OptionalSkeletonProps>;
