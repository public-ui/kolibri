import type { Generic } from 'adopted-style-sheets';

import type { PropShow, PropSpinVariant, PropLabel } from '../props';

type RequiredProps = NonNullable<unknown>;
type OptionalProps = PropSpinVariant & PropShow & PropLabel;

type RequiredStates = PropSpinVariant;
type OptionalStates = PropShow & PropLabel;

export type SpinProps = Generic.Element.Members<RequiredProps, OptionalProps>;
export type SpinStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type SpinAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
