type LocationChangeCallback = (location: string) => void;
export type UnsubscribeFunction = () => void;

let currentLocation: string | undefined;
const subscribers: Array<LocationChangeCallback> = [];

export const setCurrentLocation = (location: string) => {
	currentLocation = location;
	subscribers.forEach((subscriber) => {
		subscriber(location);
	});
};

export const onLocationChange = (callback: LocationChangeCallback, eager = true): UnsubscribeFunction => {
	if (eager && typeof currentLocation === 'string') {
		callback(currentLocation);
	}
	subscribers.push(callback);

	// unsubscribe function
	return () => {
		const index = subscribers.indexOf(callback);
		if (index >= 0) {
			subscribers.splice(index, 1);
		}
	};
};
