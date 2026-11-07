import type { Generic } from 'adopted-style-sheets';

import type { LabelPropType } from '../props';

type RequiredIconProps = {
	icons: string;
	label: LabelPropType;
};
type OptionalIconProps = NonNullable<unknown>;

export type IconProps = Generic.Element.Members<RequiredIconProps, OptionalIconProps>;
