/* eslint-env node, browser */

global.HTMLDivElement = class HTMLDivElement extends HTMLElement {};

// structuredClone is available in Node.js 17+ but not always exposed by the jsdom test environment.
// Use v8 serialize/deserialize as a drop-in polyfill (available since Node.js 8.8.0).
if (typeof global.structuredClone === 'undefined') {
	const v8 = require('v8');
	global.structuredClone = (value) => v8.deserialize(v8.serialize(value));
}

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
