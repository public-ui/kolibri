export function stopPropagation(event: Event): void {
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
