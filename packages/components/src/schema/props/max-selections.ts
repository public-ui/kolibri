import type { Generic } from 'adopted-style-sheets';

export type PropMaxSelections = {
	maxSelections: number;
};

export type StatesMaxSelections = {
	maxSelections: number;
};

export type WatchesMaxSelections = {
	maxSelections: number;
};

export type ComponentMaxSelections = Generic.Element.Members<PropMaxSelections, PropMaxSelections>;
export type ComponentStatesMaxSelections = Generic.Element.Members<StatesMaxSelections, StatesMaxSelections>;
export type ComponentWatchesMaxSelections = Generic.Element.Watchers<WatchesMaxSelections, WatchesMaxSelections>;
