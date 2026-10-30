/**
 * Native Web Component demos for aria-details across Shadow DOM boundaries — the control group for
 * the KoliBri `_ariaDetails` implementation: if a case announces in a screen reader while the
 * KoliBri fields do not, the gap is ours; if the native shadow case is silent too, the platform
 * (e.g. Safari/VoiceOver without element reflection) does not support the relation yet.
 *
 * demo-input-light  — no shadow root; the input's aria-details IDREF resolves
 *                     directly in the document tree (no boundary to cross).
 *
 * demo-input-shadow (shadow: open)
 *   └─ <input> in the shadow root; external elements are bridged via the
 *      input's ariaDetailsElements (ARIA element reflection) — the same
 *      mechanism the KoliBri form fields use.
 *
 * Import this module once anywhere in the app; the guard prevents duplicate registration.
 */
type DetailsTarget = HTMLElement & { ariaDetailsElements?: HTMLElement[] | null };

const INPUT_STYLES = `
	label { display: block; }
	span { display: block; margin-bottom: 4px; }
	input { border: 1px solid #888; padding: 4px 8px; font: inherit; }
`;

const resolveExternal = (host: HTMLElement, value: string | null): HTMLElement[] => {
	const root = host.getRootNode() as Document | ShadowRoot;
	const getById = (id: string): HTMLElement | null => (root instanceof ShadowRoot ? root.querySelector(`#${CSS.escape(id)}`) : document.getElementById(id));
	return (value ?? '')
		.trim()
		.split(/\s+/)
		.filter(Boolean)
		.map(getById)
		.filter((el): el is HTMLElement => el !== null);
};

/** Web Component WITHOUT shadow root. The input's aria-details IDREF resolves in the host document. */
class DemoInputLight extends HTMLElement {
	static get observedAttributes() {
		return ['aria-details'];
	}

	connectedCallback() {
		this._render();
	}

	attributeChangedCallback() {
		if (this.isConnected) this._render();
	}

	_render() {
		this.innerHTML = `<style>${INPUT_STYLES}</style><label><span>Native input, no shadow root</span><input aria-label="Native light input"></label>`;
		const input = this.querySelector('input')!;
		const details = this.getAttribute('aria-details');
		if (details) {
			input.setAttribute('aria-details', details);
		} else {
			input.removeAttribute('aria-details');
		}
	}
}

/** Outer part — shadow: open; bridges the external details via element reflection on the native input. */
class DemoInputShadow extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	static get observedAttributes() {
		return ['aria-details'];
	}

	connectedCallback() {
		this.shadowRoot!.innerHTML = `<style>${INPUT_STYLES}</style><label><span>Native input, inside a shadow root</span><input aria-label="Native shadow input"></label>`;
		this._sync(this.getAttribute('aria-details'));
	}

	attributeChangedCallback(_name: string, _old: string | null, newValue: string | null) {
		if (this.isConnected) this._sync(newValue);
	}

	_sync(value: string | null) {
		const input = this.shadowRoot!.querySelector('input') as unknown as DetailsTarget;
		if (!('ariaDetailsElements' in input)) {
			return;
		}
		try {
			input.ariaDetailsElements = resolveExternal(this, value);
		} catch (_) {
			/* ariaDetailsElements not supported */
		}
	}
}

if (typeof customElements !== 'undefined') {
	if (!customElements.get('demo-input-light')) customElements.define('demo-input-light', DemoInputLight);
	if (!customElements.get('demo-input-shadow')) customElements.define('demo-input-shadow', DemoInputShadow);
}
