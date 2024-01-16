import type { Generic } from 'adopted-style-sheets';
import type { PropHref } from '../props/href';
import type { PropLabel } from '../props/label';
import type { PropOpen } from '../props/open';

type RequiredProps = PropLabel & PropHref;
type OptionalProps = PropOpen;

type RequiredStates = RequiredProps & { hasChildren: boolean };
type OptionalStates = OptionalProps;

export type TreeItemProps = Generic.Element.Members<RequiredProps, OptionalProps>;
export type TreeItemStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type TreeItemAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
