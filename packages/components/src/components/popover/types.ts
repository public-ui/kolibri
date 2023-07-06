import { Generic } from '@a11y-ui/core';

import { PropAlign } from '../../types/props/align';
import { PropShow } from '../../types/props/show';

type RequiredProps = unknown;
type OptionalProps = PropAlign & PropShow;
export type KoliBriPopoverProps = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = PropAlign & PropShow & { visible: boolean };
type OptionalStates = unknown;
export type KoliBriPopoverStates = Generic.Element.Members<RequiredStates, OptionalStates>;

export type KoliBriPopoverAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
