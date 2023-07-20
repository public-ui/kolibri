import { Generic } from '@a11y-ui/core';
import { LabelPropType } from '../../types/props/label';
import { ImageSourcePropType } from '../../types/props/image-source';

type RequiredAvatarProps = {
	label: LabelPropType;
};
type OptionalAvatarProps = {
	src: ImageSourcePropType,
};

type RequiredAvatarStates = RequiredAvatarProps;
type OptionalAvatarStates = OptionalAvatarProps;

export type Props = Generic.Element.Members<RequiredAvatarProps, OptionalAvatarProps>;
export type States = Generic.Element.Members<RequiredAvatarStates, OptionalAvatarStates>;
export type API = Generic.Element.ComponentApi<RequiredAvatarProps, OptionalAvatarProps, RequiredAvatarStates, OptionalAvatarStates>;
