global.HTMLDivElement = class HTMLDivElement extends HTMLElement {};

class MutationObserver {
	constructor(callback) {}
	disconnect() {}
	ResizeObserver(element, initObject) {}
	takeRecords() {
		return [];
	}
}

global.MutationObserver = MutationObserver;
