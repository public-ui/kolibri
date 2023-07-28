export function preventEvent(event: Event): void {
	// event.preventDefault(); // TODO: InputFile öffnet Dateiauswahl nicht! - Wie fangen wir die Events ab?
	event.stopImmediatePropagation();
	event.stopPropagation();
}

function createKoliBriEvent<T>(type: string, detail: T): CustomEvent {
	const event = new CustomEvent(`kol-${type}`, {
		bubbles: true,
		cancelable: true,
		composed: true,
		detail: detail,
	});
	return event;
}

function dispatchKoliBriEvent<T>(target: EventTarget, type: string, detail?: T): boolean {
	const dispatch = target.dispatchEvent(createKoliBriEvent(type, detail));
	return dispatch;
}

export function tryToDispatchKoliBriEvent<T>(type: string, target?: EventTarget, detail?: T): void {
	target && dispatchKoliBriEvent(target, type, detail);
}
