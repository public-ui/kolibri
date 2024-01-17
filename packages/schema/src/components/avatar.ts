import type { Generic } from 'adopted-style-sheets';

import type { PropImageSource, PropLabel } from '../props';

type RequiredAvatarProps = PropLabel;
type OptionalAvatarProps = PropImageSource;

type RequiredAvatarStates = RequiredAvatarProps;
type OptionalAvatarStates = OptionalAvatarProps;

export type AvatarProps = Generic.Element.Members<RequiredAvatarProps, OptionalAvatarProps>;
export type AvatarStates = Generic.Element.Members<RequiredAvatarStates, OptionalAvatarStates>;
export type AvatarAPI = Generic.Element.ComponentApi<RequiredAvatarProps, OptionalAvatarProps, RequiredAvatarStates, OptionalAvatarStates>;
