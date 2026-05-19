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
	focus = 'focus',
	input = 'input',
	keydown = 'keydown',
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

function dispatchDomEvent<T>(target: HTMLElement, event: KolEvent, detail?: T): boolean {
	return target.dispatchEvent(createKoliBriEvent<T>(event, detail));
}

export { KolEvent, dispatchDomEvent };
