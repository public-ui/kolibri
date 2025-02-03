/* eslint-env node, browser */

global.HTMLDivElement = class HTMLDivElement extends HTMLElement {};

class MutationObserver {
	constructor() {}
	disconnect() {}
	ResizeObserver() {}
	takeRecords() {
		return [];
	}
}

global.MutationObserver = MutationObserver;

class ResizeObserverMock {
	observe() {}
	unobserve() {}
	disconnect() {}
}

global.ResizeObserver = ResizeObserverMock;
