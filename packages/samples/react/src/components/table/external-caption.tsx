import { KolTableStateful, KolTableStateless } from '@public-ui/react-v19';
import type { FC } from 'react';
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

export const TableExternalCaption: FC = () => (
	<>
		<SampleDescription>
			<p>
				Demonstrates how to label a table using an external heading via <code>_ariaLabelledby</code>. The referenced{' '}
				<code>&lt;h2&gt;</code> lives outside the component's Shadow DOM. KoliBri resolves the element reference
				programmatically via <code>ElementInternals.ariaLabelledByElements</code>, which crosses the Shadow DOM boundary
				— unlike a plain <code>aria-labelledby</code> attribute, which is scoped to the same tree and would not work
				here.
			</p>
		</SampleDescription>

		<section className="w-full flex flex-col gap-6">
			{/* Variant 1: internal caption (_label) */}
			<div>
				<h2>1. Internal caption (default)</h2>
				<p>
					No <code>_ariaLabelledby</code> set — the table renders an internal <code>&lt;caption&gt;</code> from{' '}
					<code>_label</code>.
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
					The <code>&lt;h2&gt;</code> above serves as the accessible label. No <code>&lt;caption&gt;</code> is rendered
					inside the table.
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
					Setting <code>aria-labelledby</code> (without <code>_</code>) directly on the host element causes the browser
					to expose the Custom Element itself as a <em>table</em> group to screen readers — bypassing the internal
					semantic structure. Navigation into cells no longer works correctly.
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
		</section>
	</>
);
