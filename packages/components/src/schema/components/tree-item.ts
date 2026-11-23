import type { Generic } from 'adopted-style-sheets';
import type { PropActive, PropHref, PropLabelLangSegments, PropOpen } from '../props';
import type { Members } from '../types/members';

type RequiredProps = PropLabelLangSegments & PropHref;
type OptionalProps = PropOpen & PropActive;

type RequiredStates = RequiredProps & { hasChildren: boolean };
type OptionalStates = OptionalProps;

export type TreeItemProps = Members<RequiredProps, OptionalProps>;
export type TreeItemStates = Members<RequiredStates, OptionalStates>;
export type TreeItemAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
