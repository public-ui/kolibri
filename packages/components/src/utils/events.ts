export function preventEvent(event: Event): void {
	event.preventDefault();
	event.stopPropagation();
}

function createKoliBriEvent<T>(type: string, detail: T): CustomEvent {
	const event = new CustomEvent(`kol-${type}`, {
		bubbles: true,
		cancelable: true,
		composed: true,
		detail: detail,
	});
	console.log('createKoliBriEvent', type, detail, '=>', event);
	return event;
}

function dispatchKoliBriEvent<T>(target: EventTarget, type: string, detail?: T): boolean {
	const dispatch = target.dispatchEvent(createKoliBriEvent(type, detail));
	console.log('dispatchKoliBriEvent', target, type, detail, '=>', dispatch);
	return dispatch;
}

export function tryToDispatchKoliBriEvent<T>(type: string, target?: EventTarget, detail?: T): void {
	target && dispatchKoliBriEvent(target, type, detail);
}
