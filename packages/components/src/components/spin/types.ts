import { Generic } from '@a11y-ui/core';

import { PropShow } from '../../types/props/show';
import { PropSpinVariant } from '../../types/props/variant/spin';

type RequiredProps = unknown;
type OptionalProps = PropSpinVariant & PropShow;
export type KoliBriSpinProps = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = PropSpinVariant;
type OptionalStates = PropShow;

export type KoliBriSpinStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type KoliBriSpinAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
