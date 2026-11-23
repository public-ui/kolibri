import type { Generic } from 'adopted-style-sheets';
import type { PropLabel, PropToolbarItems } from '../props';
import type { PropOrientation } from '../props/orientation';
import type { Members } from '../types/members';

type RequiredProps = PropLabel & PropToolbarItems;
type OptionalProps = PropOrientation;

type RequiredStates = RequiredProps;
type OptionalStates = OptionalProps;

export type ToolbarProps = Members<RequiredProps, OptionalProps>;
export type ToolbarStates = Members<RequiredStates, OptionalStates>;
export type ToolbarAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
