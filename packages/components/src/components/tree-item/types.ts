import { Generic } from 'adopted-style-sheets';
import { PropLabel } from '../../types/props/label';
import { PropOpen } from '../../types/props/open';
import { PropHref } from '../../types/props/href';

type RequiredProps = PropLabel & PropHref;
type OptionalProps = PropOpen;

type RequiredStates = RequiredProps & { hasChildren: boolean };
type OptionalStates = OptionalProps;

export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;
export type States = Generic.Element.Members<RequiredStates, OptionalStates>;
export type API = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
