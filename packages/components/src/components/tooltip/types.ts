import type { Generic } from 'adopted-style-sheets';

import { PropAlign } from '../../types/props/align';
import { PropId } from '../../types/props/id';
import { PropLabel } from '../../types/props/label';

type RequiredProps = PropLabel;
type OptionalProps = PropAlign & PropId;
export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = PropAlign & PropLabel;
type OptionalStates = PropId;

export type States = Generic.Element.Members<RequiredStates, OptionalStates>;
export type API = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
