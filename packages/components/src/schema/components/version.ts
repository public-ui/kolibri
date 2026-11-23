import type { Generic } from 'adopted-style-sheets';

import type { PropLabel } from '../props';
import type { Members } from '../types/members';

type RequiredProps = PropLabel;
type OptionalProps = NonNullable<unknown>;

type RequiredStates = PropLabel;
type OptionalStates = NonNullable<unknown>;

export type VersionProps = Members<RequiredProps, OptionalProps>;
export type VersionStates = Members<RequiredStates, OptionalStates>;
export type VersionAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
