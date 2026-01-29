export const debounce = <Args extends unknown[]>(callback: (...args: Args) => void, wait = 0) => {
	let timeoutId: ReturnType<typeof setTimeout> | undefined;

	return (...args: Args): void => {
		if (timeoutId) {
			clearTimeout(timeoutId);
		}

		timeoutId = setTimeout(() => {
			timeoutId = undefined;
			callback(...args);
		}, wait);
	};
};
