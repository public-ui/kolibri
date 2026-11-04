/**
 * Corrections for two happy-dom deviations from the CSS specification that keep every KoliBri host
 * element invisible. An invisible host makes the native elements in its shadow root inaccessible,
 * so `*ByRole` queries without `hidden: true` find nothing and no accessible name can be matched.
 *
 * Both corrections only touch the test environment; the components themselves stay unchanged.
 * Remove a correction as soon as happy-dom follows the specification in that point.
 */

/**
 * `CSSStyleDeclaration.setProperty(name, null)` must treat `null` as the empty string and remove the
 * property (CSSOM, `[LegacyNullToEmptyString]`). happy-dom ignores the call instead. The theming
 * runtime hides each host with `visibility: hidden !important` until its styles are adopted and then
 * restores the previous inline value, which is `null` when there was none.
 */
const restoreNullToEmptyString = (): void => {
	const setProperty = CSSStyleDeclaration.prototype.setProperty;
	CSSStyleDeclaration.prototype.setProperty = function (this: CSSStyleDeclaration, name: string, value: string | null, priority?: string): void {
		setProperty.call(this, name, value ?? '', priority);
	};
};

/**
 * Stencil hides all component tags until they are hydrated and reveals them with
 * `.hydrated { visibility: inherit }`. happy-dom does not resolve `inherit` from a stylesheet, so the
 * lower `visibility: hidden` stays in effect. `visible` is what `inherit` resolves to on a visible page.
 */
const revealHydratedHosts = (): void => {
	const style = document.createElement('style');
	style.dataset.happyDomWorkaround = '';
	style.textContent = '.hydrated { visibility: visible; }';
	document.head.append(style);
};

export const applyHappyDomWorkarounds = (): void => {
	restoreNullToEmptyString();
	revealHydratedHosts();
};
