// TODO: Should be synchronized with enums/events.ts
type KoliBriEventType = 'blur' | 'change' | 'click' | 'focus' | 'input' | 'toggle' | 'selection-change';

export function stopPropagation(event: Event): void {
	event.stopImmediatePropagation();
	event.stopPropagation();
}

function createKoliBriEvent<T>(type: KoliBriEventType, detail: T): CustomEvent {
	const event = new CustomEvent(`kol-${type}`, {
		bubbles: true,
		cancelable: true,
		composed: true,
		detail: detail,
	});
	return event;
}

function dispatchKoliBriEvent<T>(target: EventTarget, type: KoliBriEventType, detail?: T): boolean {
	const dispatch = target.dispatchEvent(createKoliBriEvent(type, detail));
	return dispatch;
}

export function tryToDispatchKoliBriEvent<T>(type: KoliBriEventType, target?: EventTarget, detail?: T): void {
	target && dispatchKoliBriEvent(target, type, detail);
}

export function preventDefaultAndStopPropagation(event: Event) {
	event.preventDefault();
	stopPropagation(event);
}
