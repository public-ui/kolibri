import type { Generic } from 'adopted-style-sheets';
import type { Stringified } from '../types';

import type { LabelProp } from '../props';

export type MenuItemProps = LabelProp;

type RequiredProps = {
	menuItems: Stringified<MenuItemProps[]>;
};
type OptionalProps = NonNullable<unknown>;

type RequiredStates = {
	menuItems: MenuItemProps[];
};
type OptionalStates = NonNullable<unknown>;

export type MenuProps = Generic.Element.Members<RequiredProps, OptionalProps>;
export type MenuStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type MenuAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
