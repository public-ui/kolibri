import type { Generic } from 'adopted-style-sheets';

import { Events } from '../../enums/events';
import { EventValueOrEventCallback } from '../../types/callbacks';
import { Stringified } from '../../types/common';
import { Option } from '../../types/input/types';
import { PropButtonVariant } from '../../types/props/button-variant';
import { PropCustomClass } from '../../types/props/custom-class';
import { PropLabel } from '../../types/props/label';
import { PropTooltipAlign } from '../../types/props/tooltip-align';
import { PropMax } from '../../types/props/max';

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
};
type OptionalProps = {
	boundaryCount: number;
	hasButtons: boolean | Stringified<PaginationHasButton>;
	pageSize: number;
	pageSizeOptions: Stringified<number[]>;
	siblingCount: number;
	/**
	 * @deprecated Use _max.
	 */
	total: number;
} & PropButtonVariant &
	PropCustomClass &
	PropLabel &
	PropMax & // @todo V2: Make max required.
	PropTooltipAlign;

export type KoliBriPaginationProps = RequiredProps & OptionalProps;

type RequiredStates = {
	boundaryCount: number;
	hasButtons: PaginationHasButton;
	page: number;
	pageSize: number;
	pageSizeOptions: Option<number>[];
	on: KoliBriPaginationButtonCallbacks;
	siblingCount: number;
} & PropButtonVariant &
	PropLabel &
	PropMax;

type OptionalStates = PropCustomClass & PropTooltipAlign;

export type States = Generic.Element.Members<RequiredStates, OptionalStates>;
export type API = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
