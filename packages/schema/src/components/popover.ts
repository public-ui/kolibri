import type { Generic } from 'adopted-style-sheets';

import type { PropAlign, PropShow } from '../props';

type RequiredProps = NonNullable<unknown>;
type OptionalProps = PropAlign & PropShow;

type RequiredStates = PropAlign & PropShow & { visible: boolean };
type OptionalStates = NonNullable<unknown>;

export type PopoverProps = Generic.Element.Members<RequiredProps, OptionalProps>;
export type PopoverStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type PopoverAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
