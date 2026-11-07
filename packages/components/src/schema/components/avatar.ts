import type { Generic } from 'adopted-style-sheets';

import type { ColorPair, LabelPropType, SrcPropType } from '../props';

type RequiredAvatarProps = {
	label: LabelPropType;
};
type OptionalAvatarProps = {
	color: string | ColorPair;
	src: SrcPropType;
};

export type AvatarProps = Generic.Element.Members<RequiredAvatarProps, OptionalAvatarProps>;
