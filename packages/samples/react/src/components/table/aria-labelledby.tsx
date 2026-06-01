import { KolTableStateful, KolTableStateless } from '@public-ui/react-v19';
import type { FC } from 'react';
import React from 'react';
import '../../@shared/demo-table-wc';
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

export const AriaLabelledby: FC = () => (
	<>
		<SampleDescription>
			<p>
				Demonstrates how to label a table using an external heading via <code>_ariaLabelledby</code>. The referenced heading lives outside the component's
				Shadow DOM. KoliBri resolves the element reference via <code>ElementInternals.ariaLabelledByElements</code>, which crosses the Shadow DOM boundary —
				unlike a plain <code>aria-labelledby</code> attribute, which is scoped to the same tree.
			</p>
		</SampleDescription>

		<section className="w-full flex flex-col gap-6">
			{/* Native HTML */}
			<div>
				<h2 id="caption-native">Native HTML (no Web Component)</h2>
				<p>
					Plain <code>&lt;table aria-labelledby="…"&gt;</code>. No Shadow DOM — the IDREF resolves directly in the document tree.
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

			{/* Native WC without shadow */}
			<div>
				<h2 id="caption-wc-light">Native Web Component — no Shadow DOM</h2>
				<p>
					<code>demo-table-light</code> renders the table into the light DOM (<code>attachShadow</code> not called). The table's <code>aria-labelledby</code>{' '}
					IDREF resolves in the host document — no boundary to cross.
				</p>
				{React.createElement('demo-table-light', { 'aria-labelledby': 'caption-wc-light' })}
			</div>

			<hr aria-hidden="true" className="border-0" />

			{/* Native WC with shadow */}
			<div>
				<h2 id="caption-wc-shadow">Native Web Component — with Shadow DOM</h2>
				<p>
					<code>demo-outer-table</code> (shadow: open) resolves the IDREF via <code>getRootNode()</code> and sets{' '}
					<code>ElementInternals.ariaLabelledByElements</code> on itself and on the inner element. The inner <code>&lt;table&gt;</code> references the inner
					element via IDREF — valid because both share the same shadow tree.
				</p>
				{React.createElement('demo-outer-table', { 'aria-labelledby': 'caption-wc-shadow' })}
			</div>

			<hr aria-hidden="true" className="border-0" />

			{/* kol-table-stateless */}
			<div>
				<h2 id="caption-stateless">kol-table-stateless</h2>
				<p>
					The <code>&lt;h2&gt;</code> above serves as the accessible label via <code>_ariaLabelledby</code>. No internal <code>&lt;caption&gt;</code> is
					rendered.
				</p>
				<KolTableStateless _ariaLabelledby="caption-stateless" {...PROPS} />
			</div>

			<hr aria-hidden="true" className="border-0" />

			{/* kol-table-stateful */}
			<div>
				<h2 id="caption-stateful">kol-table-stateful</h2>
				<p>
					Same via the stateful wrapper — <code>_ariaLabelledby</code> is forwarded to the internal stateless implementation.
				</p>
				<KolTableStateful _ariaLabelledby="caption-stateful" {...PROPS} />
			</div>
		</section>
	</>
);
