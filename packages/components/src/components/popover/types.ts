import { Generic } from '@a11y-ui/core';
import { PropAlign, PropShow } from '../../types/props';

type RequiredProps = unknown;
type OptionalProps = PropAlign & PropShow;

type RequiredStates = PropAlign & PropShow & { visible: boolean };
type OptionalStates = unknown;
export type KoliBriPopoverStates = Generic.Element.Members<RequiredStates, OptionalStates>;

export type KoliBriPopoverAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
