import { Events } from '../../enums/events';
import { EventValueCallback } from '../../types/callbacks';

export type KoliBriPaginationButtonCallbacks = {
	[Events.onClick]?: EventValueCallback<Event, number>;
	onChangePage?: EventValueCallback<Event, number>;
	onChangePageSize?: EventValueCallback<Event, number>;
};
