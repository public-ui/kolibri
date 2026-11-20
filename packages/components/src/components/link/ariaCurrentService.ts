import { getSharedState } from '../../core/shared-state';

type LocationChangeCallback = (location: string) => void;
export type UnsubscribeFunction = () => void;

const shared = getSharedState('location', (): { current?: string; subscribers: LocationChangeCallback[] } => ({ subscribers: [] }));

export const setCurrentLocation = (location: string) => {
	shared.current = location;
	shared.subscribers.forEach((subscriber) => {
		subscriber(location);
	});
};

export const onLocationChange = (callback: LocationChangeCallback, eager = true): UnsubscribeFunction => {
	if (eager && typeof shared.current === 'string') {
		callback(shared.current);
	}
	shared.subscribers.push(callback);

	// unsubscribe function
	return () => {
		const index = shared.subscribers.indexOf(callback);
		if (index >= 0) {
			shared.subscribers.splice(index, 1);
		}
	};
};
