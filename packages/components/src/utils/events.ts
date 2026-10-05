enum KolEvent {
	blur = 'blur',
	cancel = 'cancel',
	change = 'change',
	changeHeaderCells = 'changeheadercells',
	changePage = 'changepage',
	changePageSize = 'changepagesize',
	click = 'click',
	close = 'close',
	create = 'create',
	error = 'error',
	focus = 'focus',
	input = 'input',
	keydown = 'keydown',
	load = 'load',
	mousedown = 'mousedown',
	reset = 'reset',
	select = 'select',
	selectionChange = 'selectionchange',
	sort = 'sort',
	submit = 'submit',
	toggle = 'toggle',
}

const DEFAULT_OPTIONS = {
	bubbles: true,
	cancelable: true,
	composed: true,
} as const;

function createKoliBriEvent<T>(event: KolEvent, detail: T | null = null): CustomEvent<T | null> {
	return new CustomEvent<T | null>(event, {
		...DEFAULT_OPTIONS,
		detail,
	});
}

function dispatchDomEvent<T>(target: EventTarget, event: KolEvent, detail?: T): boolean {
	return target.dispatchEvent(createKoliBriEvent<T>(event, detail));
}

/**
 * Creates a synthetic event for value changes that are not triggered by a real DOM event, e.g. clicking a
 * clear button. The event itself is never dispatched: it is only handed to the controller's onFacade methods,
 * which dispatch the public CustomEvent on the host themselves. Consumers receive it as the `event` argument
 * of `_on.onInput` / `_on.onChange`, so `target` and `currentTarget` are patched to the interactive element
 * they would expect - an undispatched event would report `null` there.
 */
function createEventWithTarget<T>(event: KolEvent, detail: T | null = null, target?: EventTarget | null): CustomEvent<T | null> {
	const customEvent = createKoliBriEvent<T>(event, detail);

	if (target) {
		Object.defineProperty(customEvent, 'target', { value: target });
		Object.defineProperty(customEvent, 'currentTarget', { value: target });
	}

	return customEvent;
}

export { KolEvent, createEventWithTarget, dispatchDomEvent };
