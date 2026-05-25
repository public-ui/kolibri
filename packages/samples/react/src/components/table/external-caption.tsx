import { KolTableStateful, KolTableStateless } from '@public-ui/react-v19';
import { type FC, useEffect, useRef } from 'react';
import React from 'react';
import { SampleDescription } from '../SampleDescription';

const DATA = [{ city: 'Berlin', country: 'Germany' }];

const HEADERS = {
	horizontal: [
		[
			{ key: 'city', label: 'City' },
			{ key: 'country', label: 'Country' },
		],
	],
	vertical: [],
};

const PROPS = {
	_data: DATA,
	_headers: HEADERS,
	_headerCells: HEADERS,
	_label: 'Label should always be filled',
	_minWidth: 'auto',
};

/**
 * Native Web Component pair that mirrors the Stencil kol-table-stateless architecture:
 *
 * Architecture:
 *   <demo-outer-table aria-labelledby="ext-id">   (shadow: open)
 *     └─ shadow root
 *          └─ <demo-inner-table id="nit-N">        (no shadow, same tree)
 *               └─ <table aria-labelledby="nit-N"> (IDREF, same shadow tree → valid)
 *
 * Accessible name chain:
 *   table  ──IDREF──▶  demo-inner-table  ──ariaLabelledByElements──▶  external h2
 *
 * The IDREF is tree-scoped (same shadow root of demo-outer-table → works).
 * The ElementInternals reference is NOT tree-scoped (element reference → crosses shadow boundary).
 */
function defineNativeWcs() {
	if (customElements.get('demo-inner-table')) return;

	type InternalsWithRef = { ariaLabelledByElements: HTMLElement[] };

	let counter = 0;

	class DemoInnerTable extends HTMLElement {
		readonly #internals: InternalsWithRef;

		constructor() {
			super();
			this.#internals = this.attachInternals() as unknown as InternalsWithRef;
			if (!this.id) this.id = `nit-${++counter}`;
		}

		connectedCallback() {
			this.innerHTML = `<table aria-labelledby="${this.id}">
				<thead><tr><th scope="col">City</th><th scope="col">Country</th></tr></thead>
				<tbody><tr><td>Berlin</td><td>Germany</td></tr></tbody>
			</table>`;
		}

		set labelElements(els: HTMLElement[]) {
			this.#internals.ariaLabelledByElements = els;
		}
	}

	class DemoOuterTable extends HTMLElement {
		readonly #internals: InternalsWithRef;
		readonly #shadow: ShadowRoot;
		#inner: (HTMLElement & { labelElements: HTMLElement[] }) | null = null;

		constructor() {
			super();
			this.#internals = this.attachInternals() as unknown as InternalsWithRef;
			this.#shadow = this.attachShadow({ mode: 'open' });
		}

		static get observedAttributes() {
			return ['aria-labelledby'];
		}

		connectedCallback() {
			// Inject minimal styles so the table is visually distinguishable.
			this.#shadow.innerHTML = `
				<style>
					demo-inner-table { display: block; }
					table { border-collapse: collapse; }
					th, td { border: 1px solid #888; padding: 4px 12px; }
					th { background: #f0f0f0; }
				</style>
				<demo-inner-table></demo-inner-table>`;
			this.#inner = this.#shadow.querySelector('demo-inner-table') as HTMLElement & { labelElements: HTMLElement[] };
			this.#sync(this.getAttribute('aria-labelledby'));
		}

		attributeChangedCallback(_name: string, _old: string | null, newValue: string | null) {
			// Only sync when already connected; connectedCallback handles initial sync.
			if (this.isConnected) this.#sync(newValue);
		}

		#sync(value: string | null) {
			const root = this.getRootNode() as Document | ShadowRoot;
			const getById = (id: string): HTMLElement | null =>
				root instanceof ShadowRoot ? root.querySelector(`#${CSS.escape(id)}`) : document.getElementById(id);

			const ids = (value ?? '').trim().split(/\s+/).filter(Boolean);
			const els = ids.map(getById).filter((el): el is HTMLElement => el !== null);

			// Set on outer host so the host element itself is also correctly labeled.
			this.#internals.ariaLabelledByElements = els;
			// Pass into shadow so the inner element (anchor for the IDREF from <table>) is labeled.
			if (this.#inner) this.#inner.labelElements = els;
		}
	}

	customElements.define('demo-inner-table', DemoInnerTable);
	customElements.define('demo-outer-table', DemoOuterTable);
}

export const TableExternalCaption: FC = () => {
	const nativeWcContainerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		// Define first — then create the element so no upgrade step is needed.
		defineNativeWcs();
		if (nativeWcContainerRef.current && !nativeWcContainerRef.current.firstChild) {
			const el = document.createElement('demo-outer-table');
			el.setAttribute('aria-labelledby', 'caption-native-wc');
			nativeWcContainerRef.current.appendChild(el);
		}
	}, []);

	return (
		<>
			<SampleDescription>
				<p>
					Demonstrates how to label a table using an external heading via <code>_ariaLabelledby</code>. The referenced <code>&lt;h2&gt;</code> lives outside the
					component's Shadow DOM. KoliBri resolves the element reference programmatically via <code>ElementInternals.ariaLabelledByElements</code>, which crosses
					the Shadow DOM boundary — unlike a plain <code>aria-labelledby</code> attribute, which is scoped to the same tree and would not work here.
				</p>
			</SampleDescription>

			<section className="w-full flex flex-col gap-6">
				{/* Variant 1: internal caption (_label) */}
				<div>
					<h2>1. Internal caption (default)</h2>
					<p>
						No <code>_ariaLabelledby</code> set — the table renders an internal <code>&lt;caption&gt;</code> from <code>_label</code>.
					</p>
					<div className="flex flex-col gap-4">
						<div>
							<p>
								<strong>kol-table-stateless</strong>
							</p>
							<KolTableStateless {...PROPS} />
						</div>
						<div>
							<p>
								<strong>kol-table-stateful</strong>
							</p>
							<KolTableStateful {...PROPS} />
						</div>
					</div>
				</div>

				<hr aria-hidden="true" className="border-0" />

				{/* Variant 2: external caption via _ariaLabelledby */}
				<div>
					<h2 id="caption-ext">2. External caption via _ariaLabelledby</h2>
					<p>
						The <code>&lt;h2&gt;</code> above serves as the accessible label. No <code>&lt;caption&gt;</code> is rendered inside the table.
					</p>
					<div className="flex flex-col gap-4">
						<div>
							<p>
								<strong>kol-table-stateless</strong>
							</p>
							<KolTableStateless _ariaLabelledby="caption-ext" {...PROPS} />
						</div>
						<div>
							<p>
								<strong>kol-table-stateful</strong>
							</p>
							<KolTableStateful _ariaLabelledby="caption-ext" {...PROPS} />
						</div>
					</div>
				</div>

				<hr aria-hidden="true" className="border-0" />

				{/* Variant 3: broken — aria-labelledby without _ on host */}
				<div>
					<h2 id="caption-ext-bad">3. ⚠ Broken: aria-labelledby directly on host + role="table"</h2>
					<p>
						Setting <code>aria-labelledby</code> (without <code>_</code>) directly on the host element causes the browser to expose the Custom Element itself as a{' '}
						<em>table</em> group to screen readers — bypassing the internal semantic structure. Navigation into cells no longer works correctly.
					</p>
					<div className="flex flex-col gap-4">
						<div>
							<p>
								<strong>kol-table-stateless</strong>
							</p>
							<KolTableStateless aria-labelledby="caption-ext-bad" role="table" {...PROPS} />
						</div>
						<div>
							<p>
								<strong>kol-table-stateful</strong>
							</p>
							<KolTableStateful aria-labelledby="caption-ext-bad" role="table" {...PROPS} />
						</div>
					</div>
				</div>

				<hr aria-hidden="true" className="border-0" />

				{/* Variant 4: baseline — native table with aria-labelledby */}
				<div>
					<h2 id="caption-native">4. Baseline: Native HTML &lt;table&gt; with aria-labelledby (no Shadow DOM)</h2>
					<p>
						This is a native HTML table (not a Web Component) with <code>aria-labelledby</code> referencing an external <code>&lt;h2&gt;</code>. No Shadow DOM, no caption.
						This demonstrates that screenreaders <strong>natively support</strong> this pattern when there are no Shadow DOM boundaries. Use this as a reference to verify
						that the browser and screenreader stack correctly resolves aria-labelledby references.
					</p>
					<table aria-labelledby="caption-native">
						<thead>
							<tr>
								<th>City</th>
								<th>Country</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>Berlin</td>
								<td>Germany</td>
							</tr>
						</tbody>
					</table>
				</div>

				<hr aria-hidden="true" className="border-0" />

				{/* Variant 5: native Web Component with ElementInternals.ariaLabelledByElements */}
				<div>
					<h2 id="caption-native-wc">5. Native Web Component: ElementInternals.ariaLabelledByElements</h2>
					<p>
						Two plain Custom Elements (no framework) that replicate the Stencil architecture. <code>demo-outer-table</code> has a shadow root and resolves the IDREF
						via <code>getRootNode()</code>. <code>demo-inner-table</code> (no shadow, lives in the outer shadow root) gets an auto-assigned <code>id</code> and sets{' '}
						<code>ElementInternals.ariaLabelledByElements</code> to the resolved element. The inner <code>&lt;table&gt;</code> uses{' '}
						<code>aria-labelledby</code> pointing to <code>demo-inner-table</code>'s ID — a plain IDREF that works because both elements share the same shadow tree.
					</p>
					<p>
						<strong>Expected behavior:</strong> screen reader should announce the table with the text of the <code>&lt;h2&gt;</code> above ("5. Native Web Component…").
						If the browser does not yet support <code>ariaLabelledByElements</code> on <code>ElementInternals</code>, the table will have no accessible name.
					</p>
					{/* Imperatively mounted in useEffect after customElements.define to avoid upgrade-timing issues. */}
					<div ref={nativeWcContainerRef} />
				</div>
			</section>
		</>
	);
};
