require('@stencil/core');
global.HTMLDivElement = class HTMLDivElement extends HTMLElement {};

class MutationObserver {
	constructor(callback) {}
	disconnect() {}
	ResizeObserver(element, initObject) {}
	takeRecords() {
		return [];
	}
}

global.ShadowRoot = global.ShadowRoot || class extends HTMLElement {};
global.MutationObserver = MutationObserver;
