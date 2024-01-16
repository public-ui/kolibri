import { Generic } from 'adopted-style-sheets';
import { PropLabel } from '../props/label';
import { PropOpen } from '../props/open';
import { PropHref } from '../props/href';

type RequiredProps = PropLabel & PropHref;
type OptionalProps = PropOpen;

type RequiredStates = RequiredProps & { hasChildren: boolean };
type OptionalStates = OptionalProps;

export type TreeItemProps = Generic.Element.Members<RequiredProps, OptionalProps>;
export type TreeItemStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type TreeItemAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
