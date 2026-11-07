import type { Generic } from 'adopted-style-sheets';

import type { LabelPropType } from '../props';

type RequiredClickButtonProps = {
	label: LabelPropType;
};
type OptionalClickButtonProps = NonNullable<unknown>;

export type ClickButtonProps = Generic.Element.Members<RequiredClickButtonProps, OptionalClickButtonProps>;
