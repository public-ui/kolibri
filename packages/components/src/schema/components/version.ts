import type { Generic } from 'adopted-style-sheets';

import type { PropLabel } from '../props';

type RequiredProps = PropLabel;
type OptionalProps = NonNullable<unknown>;

type RequiredStates = PropLabel;
type OptionalStates = NonNullable<unknown>;

export type VersionProps = Generic.Element.Members<RequiredProps, OptionalProps>;
export type VersionStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type VersionAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
