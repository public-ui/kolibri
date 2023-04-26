import { Generic } from '@a11y-ui/core';
import { PropAlignment, PropShow } from '../../types/props';

type RequiredProps = unknown;
type OptionalProps = PropAlignment & PropShow;
export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = PropAlignment & PropShow & { visible: boolean };
type OptionalStates = unknown;
export type States = Generic.Element.Members<RequiredStates, OptionalStates>;

type API = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
