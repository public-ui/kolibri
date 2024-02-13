import type { Generic } from 'adopted-style-sheets';
import type { PropActive, PropHref, PropLabel, PropOpen } from '../props';

type RequiredProps = PropLabel & PropHref;
type OptionalProps = PropOpen & PropActive;

type RequiredStates = RequiredProps & { hasChildren: boolean };
type OptionalStates = OptionalProps;

export type TreeItemProps = Generic.Element.Members<RequiredProps, OptionalProps>;
export type TreeItemStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type TreeItemAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
