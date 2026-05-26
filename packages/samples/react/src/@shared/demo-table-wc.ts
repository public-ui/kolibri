/**
 * Native Web Component demos for aria-labelledby across Shadow DOM boundaries.
 *
 * demo-table-light  — no shadow root; aria-labelledby IDREF on <table> resolves
 *                     directly in the document tree (no boundary to cross).
 *
 * demo-outer-table (shadow: open)
 *   └─ demo-inner-table (no shadow, lives in outer shadow root)
 *        └─ <table aria-labelledby="nit-N">
 *
 * Accessible-name chain for demo-outer-table:
 *   <table> ──IDREF──▶ demo-inner-table ──ariaLabelledByElements──▶ external element
 *
 * Import this module once anywhere in the app; the guard prevents duplicate registration.
 */
type _Internals = { ariaLabelledByElements: HTMLElement[] };

const _innerInternals = new WeakMap<HTMLElement, _Internals>();
const _outerInternals = new WeakMap<HTMLElement, _Internals>();
const _outerShadow = new WeakMap<HTMLElement, ShadowRoot>();
const _outerInner = new WeakMap<HTMLElement, HTMLElement & { labelElements: HTMLElement[] }>();

let _counter = 0;

const TABLE_STYLES = `
	table { border-collapse: collapse; }
	th, td { border: 1px solid #888; padding: 4px 12px; }
	th { background: #f0f0f0; }
`;

const TABLE_BODY = `
	<thead><tr><th scope="col">City</th><th scope="col">Country</th></tr></thead>
	<tbody><tr><td>Berlin</td><td>Germany</td></tr></tbody>
`;

/** Web Component WITHOUT shadow root. The table's aria-labelledby IDREF resolves in the host document. */
class DemoTableLight extends HTMLElement {
	static get observedAttributes() {
		return ['aria-labelledby'];
	}

	connectedCallback() {
		this._render();
	}

	attributeChangedCallback() {
		if (this.isConnected) this._render();
	}

	_render() {
		const labelId = this.getAttribute('aria-labelledby') ?? '';
		// Build the DOM via createElement/setAttribute to avoid HTML injection from attribute values.
		this.innerHTML = `<style>${TABLE_STYLES}</style><table>${TABLE_BODY}</table>`;
		const table = this.querySelector('table')!;
		if (labelId) {
			table.setAttribute('aria-labelledby', labelId);
		} else {
			table.removeAttribute('aria-labelledby');
		}
	}
}

/** Inner part of the shadow WC pair — no shadow, lives inside demo-outer-table's shadow root. */
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
		this.innerHTML = `<table aria-labelledby="${this.id}">${TABLE_BODY}</table>`;
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

/** Outer part of the shadow WC pair — has shadow: open, bridges the label via ElementInternals. */
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
		shadow.innerHTML = `<style>demo-inner-table { display: block; }${TABLE_STYLES}</style><demo-inner-table></demo-inner-table>`;
		_outerInner.set(this, shadow.querySelector('demo-inner-table') as HTMLElement & { labelElements: HTMLElement[] });
		this._sync(this.getAttribute('aria-labelledby'));
	}

	attributeChangedCallback(_name: string, _old: string | null, newValue: string | null) {
		if (this.isConnected) this._sync(newValue);
	}

	_sync(value: string | null) {
		const root = this.getRootNode() as Document | ShadowRoot;
		const getById = (id: string): HTMLElement | null => (root instanceof ShadowRoot ? root.querySelector(`#${CSS.escape(id)}`) : document.getElementById(id));

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
	if (!customElements.get('demo-table-light')) customElements.define('demo-table-light', DemoTableLight);
	if (!customElements.get('demo-inner-table')) customElements.define('demo-inner-table', DemoInnerTable);
	if (!customElements.get('demo-outer-table')) customElements.define('demo-outer-table', DemoOuterTable);
}
