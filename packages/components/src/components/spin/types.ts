import { Generic } from '@a11y-ui/core';
import { PropShow } from '../../types/props';
import { PropSpinVariant } from '../../types/props/variant/spin';

type RequiredProps = unknown;
type OptionalProps = PropSpinVariant & PropShow;

type RequiredStates = PropSpinVariant;
type OptionalStates = PropShow;

export type KoliBriSpinStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type KoliBriSpinAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
