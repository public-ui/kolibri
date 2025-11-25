enum KolEvent {
	blur = 'kolBlur',
	change = 'kolChange',
	changePage = 'kolChangePage',
	changePageSize = 'kolChangePageSize',
	click = 'kolClick',
	close = 'kolClose',
	create = 'kolCreate',
	focus = 'kolFocus',
	input = 'kolInput',
	keydown = 'kolKeydown',
	mousedown = 'kolMousedown',
	reset = 'kolReset',
	select = 'kolSelect',
	selectionChange = 'kolSelectionChange',
	settingsChange = 'settingsChange',
	sort = 'kolSort',
	submit = 'kolSubmit',
	toggle = 'kolToggle',
}

function createKoliBriEvent<T>(event: KolEvent, detail?: T): CustomEvent {
	return new CustomEvent(event, {
		bubbles: true,
		cancelable: true,
		composed: true,
		detail: detail,
	});
}

function dispatchDomEvent<T>(target: HTMLElement, event: KolEvent, detail?: T) {
	target.dispatchEvent(createKoliBriEvent<T>(event, detail));
}

export { KolEvent, dispatchDomEvent };
