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

export function dispatchKoliBriEvent<T>(target: EventTarget, type: string, detail?: T): boolean {
	const dispatch = target.dispatchEvent(createKoliBriEvent(type, detail));
	console.log('dispatchKoliBriEvent', target, type, detail, '=>', dispatch);
	return dispatch;
}
