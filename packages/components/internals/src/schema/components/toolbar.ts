import type { Generic } from 'adopted-style-sheets';
import type { PropLabel, PropToolbarItems } from '../props';
import type { PropOrientation } from '../props/orientation';

type RequiredProps = PropLabel & PropToolbarItems;
type OptionalProps = PropOrientation;

type RequiredStates = RequiredProps;
type OptionalStates = OptionalProps;

export type ToolbarProps = Generic.Element.Members<RequiredProps, OptionalProps>;
export type ToolbarStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type ToolbarAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
