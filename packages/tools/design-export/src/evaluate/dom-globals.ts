import { Window } from 'happy-dom';

const GLOBALS = [
	'CSSStyleSheet',
	'customElements',
	'document',
	'DocumentFragment',
	'Element',
	'Event',
	'HTMLElement',
	'MutationObserver',
	'Node',
	'ShadowRoot',
	'window',
] as const;

let installed = false;

/**
 * The browser globals the component classes touch while they are constructed and load
 * (`HTMLElement` for adopted style sheets, `document` for ids). Rendering itself needs no DOM.
 */
export function installDomGlobals(): void {
	if (installed) return;
	installed = true;
	const window = new Window({ url: 'http://localhost/' });
	const target = globalThis as Record<string, unknown>;
	for (const name of GLOBALS) {
		if (target[name] === undefined) target[name] = name === 'window' ? window : (window as unknown as Record<string, unknown>)[name];
	}
}
