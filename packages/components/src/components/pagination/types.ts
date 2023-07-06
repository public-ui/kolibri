import { Generic } from '@a11y-ui/core';

import { Events } from '../../enums/events';
import { KoliBriButtonCustomClassPropState, KoliBriButtonVariantPropState } from '../../types/button-link';
import { EventValueOrEventCallback } from '../../types/callbacks';
import { Stringified } from '../../types/common';
import { Option } from '../../types/input/types';
import { Align } from '../../types/props/align';

export type KoliBriPaginationButtonCallbacks = {
	[Events.onClick]?: EventValueOrEventCallback<Event, number>;
	onChangePage?: EventValueOrEventCallback<Event, number>;
	onChangePageSize?: EventValueOrEventCallback<Event, number>;
};

/**
 * Der HasButton-Typ definiert die Einstellungsmöglichkeiten der speziellen
 * Sprung-Schalter der Pagination.
 */
export type PaginationHasButton = {
	/**
	 * Der First-Button ist der Schalter, um direkt auf die erste Seite zu gelangen.
	 */
	first: boolean;
	/**
	 * Der Last-Button ist der Schalter, um direkt auf die letzte Seite zu gelangen.
	 */
	last: boolean;
	/**
	 * Der Next-Button ist der Schalter, um direkt auf die nächste Seite zu gelangen.
	 */
	next: boolean;
	/**
	 * Der Previous-Button ist der Schalter, um direkt auf die vorherige Seite zu gelangen.
	 */
	previous: boolean;
};

type RequiredProps = {
	on: KoliBriPaginationButtonCallbacks;
	page: number;
	total: number;
};
type OptionalProps = {
	boundaryCount: number;
	hasButtons: boolean | Stringified<PaginationHasButton>;
	pageSize: number;
	pageSizeOptions: Stringified<number[]>;
	siblingCount: number;
	tooltipAlign: Align;
} & KoliBriButtonCustomClassPropState &
	KoliBriButtonVariantPropState;

export type KoliBriPaginationProps = RequiredProps & OptionalProps;

type RequiredStates = {
	boundaryCount: number;
	hasButtons: PaginationHasButton;
	page: number;
	pageSize: number;
	pageSizeOptions: Option<number>[];
	on: KoliBriPaginationButtonCallbacks;
	siblingCount: number;
	total: number;
} & KoliBriButtonVariantPropState;

type OptionalStates = {
	tooltipAlign: Align;
} & KoliBriButtonCustomClassPropState;

export type KoliBriPaginationStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type KoliBriPaginationAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
