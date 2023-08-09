import { Generic } from '@a11y-ui/core';

import { PropShow } from '../../types/props/show';
import { PropSpinVariant } from '../../types/props/variant/spin';

type RequiredProps = unknown;
type OptionalProps = PropSpinVariant & PropShow;
export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = PropSpinVariant;
type OptionalStates = PropShow;

export type States = Generic.Element.Members<RequiredStates, OptionalStates>;
export type API = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
