/**
 * Native Web Component pair for demonstrating ElementInternals.ariaLabelledByElements
 * across Shadow DOM boundaries.
 *
 * Architecture:
 *   <demo-outer-table aria-labelledby="ext-id">  (shadow: open)
 *     └─ shadow root
 *          └─ <demo-inner-table id="nit-N">       (no shadow, same tree)
 *               └─ <table aria-labelledby="nit-N">
 *
 * Accessible-name chain:
 *   <table> ──IDREF──▶ demo-inner-table ──ariaLabelledByElements──▶ external h2
 *
 * The IDREF is tree-scoped (same shadow root → valid).
 * The ElementInternals reference is NOT tree-scoped (crosses shadow boundary).
 *
 * Import this module once anywhere in the app to register the elements.
 * The guard prevents duplicate registration when multiple modules import it.
 */
type _Internals = { ariaLabelledByElements: HTMLElement[] };

const _innerInternals = new WeakMap<HTMLElement, _Internals>();
const _outerInternals = new WeakMap<HTMLElement, _Internals>();
const _outerShadow = new WeakMap<HTMLElement, ShadowRoot>();
const _outerInner = new WeakMap<HTMLElement, HTMLElement & { labelElements: HTMLElement[] }>();

let _counter = 0;

class DemoInnerTable extends HTMLElement {
	constructor() {
		super();
		if (!this.id) this.id = `nit-${++_counter}`;
		try {
			_innerInternals.set(this, this.attachInternals() as unknown as _Internals);
		} catch (_) {
			/* attachInternals not supported */
		}
	}

	connectedCallback() {
		this.innerHTML = `<table aria-labelledby="${this.id}">
			<thead><tr><th scope="col">City</th><th scope="col">Country</th></tr></thead>
			<tbody><tr><td>Berlin</td><td>Germany</td></tr></tbody>
		</table>`;
	}

	set labelElements(els: HTMLElement[]) {
		const internals = _innerInternals.get(this);
		if (internals) {
			try {
				internals.ariaLabelledByElements = els;
			} catch (_) {
				/* ariaLabelledByElements not supported */
			}
		}
	}
}

class DemoOuterTable extends HTMLElement {
	constructor() {
		super();
		try {
			_outerInternals.set(this, this.attachInternals() as unknown as _Internals);
		} catch (_) {
			/* attachInternals not supported */
		}
		_outerShadow.set(this, this.attachShadow({ mode: 'open' }));
	}

	static get observedAttributes() {
		return ['aria-labelledby'];
	}

	connectedCallback() {
		const shadow = _outerShadow.get(this)!;
		shadow.innerHTML = `<style>
			demo-inner-table { display: block; }
			table { border-collapse: collapse; }
			th, td { border: 1px solid #888; padding: 4px 12px; }
			th { background: #f0f0f0; }
		</style><demo-inner-table></demo-inner-table>`;
		_outerInner.set(this, shadow.querySelector('demo-inner-table') as HTMLElement & { labelElements: HTMLElement[] });
		this._sync(this.getAttribute('aria-labelledby'));
	}

	attributeChangedCallback(_name: string, _old: string | null, newValue: string | null) {
		if (this.isConnected) this._sync(newValue);
	}

	_sync(value: string | null) {
		const root = this.getRootNode() as Document | ShadowRoot;
		const getById = (id: string): HTMLElement | null =>
			root instanceof ShadowRoot ? root.querySelector(`#${CSS.escape(id)}`) : document.getElementById(id);

		const ids = (value ?? '').trim().split(/\s+/).filter(Boolean);
		const els = ids.map(getById).filter((el): el is HTMLElement => el !== null);

		const internals = _outerInternals.get(this);
		if (internals) {
			try {
				internals.ariaLabelledByElements = els;
			} catch (_) {
				/* ariaLabelledByElements not supported */
			}
		}
		const inner = _outerInner.get(this);
		if (inner) inner.labelElements = els;
	}
}

if (typeof customElements !== 'undefined') {
	if (!customElements.get('demo-inner-table')) customElements.define('demo-inner-table', DemoInnerTable);
	if (!customElements.get('demo-outer-table')) customElements.define('demo-outer-table', DemoOuterTable);
}
