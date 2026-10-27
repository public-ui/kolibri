import type { Generic } from 'adopted-style-sheets';

import type { Callback } from '../enums';
import type { PropCustomClass, PropLabel, PropMax, PropTooltipAlign } from '../props';
import type { EventValueOrEventCallback, Stringified } from '../types';

export type KoliBriPaginationButtonCallbacks = {
	[Callback.onClick]?: EventValueOrEventCallback<Event, number>;
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
} & PropMax;
type OptionalProps = {
	boundaryCount: number;
	hasButtons: boolean | Stringified<PaginationHasButton>;
	pageSize: number;
	pageSizeOptions: Stringified<number[]>;
	siblingCount: number;
} & PropCustomClass &
	PropLabel &
	PropTooltipAlign;

export type KoliBriPaginationProps = RequiredProps & OptionalProps;

export type PaginationProps = Generic.Element.Members<RequiredProps, OptionalProps>;
