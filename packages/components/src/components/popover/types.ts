import { Generic } from '@a11y-ui/core';

import { PropAlign } from '../../types/props/align';
import { PropShow } from '../../types/props/show';

type RequiredProps = NonNullable<unknown>;
type OptionalProps = PropAlign & PropShow;
export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = PropAlign & PropShow & { visible: boolean };
type OptionalStates = NonNullable<unknown>;
export type States = Generic.Element.Members<RequiredStates, OptionalStates>;

export type API = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
