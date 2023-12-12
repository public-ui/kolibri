import { Generic } from 'adopted-style-sheets';

import { PropImageSource } from '../../types/props/image-source';
import { PropLabel } from '../../types/props/label';

type RequiredAvatarProps = PropLabel;
type OptionalAvatarProps = PropImageSource;

type RequiredAvatarStates = RequiredAvatarProps;
type OptionalAvatarStates = OptionalAvatarProps;

export type Props = Generic.Element.Members<RequiredAvatarProps, OptionalAvatarProps>;
export type States = Generic.Element.Members<RequiredAvatarStates, OptionalAvatarStates>;
export type API = Generic.Element.ComponentApi<RequiredAvatarProps, OptionalAvatarProps, RequiredAvatarStates, OptionalAvatarStates>;
