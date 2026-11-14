/*
 * Stencil's lazy loader used to install this wrapper for `window.HTMLElement` before anything else
 * ran: the base classes of the components (`BaseWebComponent` and its subclasses) are instantiated
 * outside the custom element registry as well (the pagination item pool creates a `PageSizeSelect`
 * with `new`), and those instances can only be constructed while `HTMLElement` is this wrapper.
 *
 * The React adapters register through the custom elements output and no longer load the loader, so
 * applications that render such components import this module once, before the components.
 */
(function () {
	if (typeof window !== 'undefined' && window.Reflect !== undefined && window.customElements !== undefined) {
		const base = HTMLElement;
		const wrapper = function (this: HTMLElement): HTMLElement {
			return Reflect.construct(base, [], new.target ?? base);
		} as unknown as typeof HTMLElement;
		window.HTMLElement = wrapper;
		HTMLElement.prototype = base.prototype;
		HTMLElement.prototype.constructor = wrapper;
		Object.setPrototypeOf(HTMLElement, base);
	}
})();
