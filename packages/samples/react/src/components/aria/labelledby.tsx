import { KolTableStateful, KolTableStateless } from '@public-ui/react-v19';
import type { FC } from 'react';
import React from 'react';
import '../../@shared/demo-table-wc';
import { SampleDescription } from '../SampleDescription';

const TABLE_DATA = [{ city: 'Berlin', country: 'Germany' }];
const TABLE_HEADERS = {
	horizontal: [
		[
			{ key: 'city', label: 'City' },
			{ key: 'country', label: 'Country' },
		],
	],
};

export const AriaLabelledby: FC = () => (
	<>
		<SampleDescription>
			<p>
				<code>aria-labelledby</code> uses an IDREF string scoped to the same tree. For a table, that is the clean way to expose an external headline as the
				table caption when the headline lives outside the table element.
			</p>
			<p>
				The KoliBri table components accept <code>_ariaLabelledby</code> so the external headline can be resolved into the internal caption / accessible name,
				while the semantic table structure stays intact.
			</p>
		</SampleDescription>

		<div className="grid gap-10">
			<section className="grid gap-4">
				<h2 className="text-xl font-bold">External headline as table caption</h2>

				<div className="grid gap-6">
					<div>
						<h3 className="font-semibold">✅ Native HTML</h3>
						<p className="text-sm text-gray-600 mb-2">
							The headline sits outside the table and is referenced via <code>aria-labelledby</code>.
						</p>
						<h4 id="label-native-table" className="text-base">
							Cities of the world
						</h4>
						<table aria-labelledby="label-native-table" className="border-collapse border border-gray-300">
							<thead>
								<tr>
									<th className="border border-gray-300 px-3 py-1">City</th>
									<th className="border border-gray-300 px-3 py-1">Country</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td className="border border-gray-300 px-3 py-1">Berlin</td>
									<td className="border border-gray-300 px-3 py-1">Germany</td>
								</tr>
							</tbody>
						</table>
					</div>

					<div>
						<h3 className="font-semibold">✅ KoliBri stateless table</h3>
						<p className="text-sm text-gray-600 mb-2">
							The external headline is passed via <code>_ariaLabelledby</code>. The component resolves it and renders the caption internally.
						</p>
						<h4 id="label-stateless-table" className="text-base">
							Cities of the world
						</h4>
						<KolTableStateless _ariaLabelledby="label-stateless-table" _data={TABLE_DATA} _headerCells={TABLE_HEADERS} _label="fallback label" />
					</div>

					<div>
						<h3 className="font-semibold">✅ KoliBri stateful table</h3>
						<p className="text-sm text-gray-600 mb-2">The stateful wrapper forwards the same prop to the internal table implementation.</p>
						<h4 id="label-stateful-table" className="text-base">
							Cities of the world
						</h4>
						<KolTableStateful _ariaLabelledby="label-stateful-table" _data={TABLE_DATA} _headers={TABLE_HEADERS} _label="fallback label" />
					</div>

					<div>
						<h3 className="font-semibold">🔬 Native Web Component (ElementInternals.ariaLabelledByElements)</h3>
						<p className="text-sm text-gray-600 mb-2">
							Two plain Custom Elements without framework mirror the Stencil architecture. <code>demo-outer-table</code> (shadow: open) resolves the IDREF and
							sets <code>ElementInternals.ariaLabelledByElements</code>. <code>demo-inner-table</code> (no shadow, lives in the outer shadow root) gets an
							auto-assigned <code>id</code>; the inner <code>&lt;table&gt;</code> references it via <code>aria-labelledby</code> — a plain IDREF valid within
							the same shadow tree. Expected: screen reader announces the table with the heading text.
						</p>
						<h4 id="label-native-wc-table" className="text-base">
							Cities of the world
						</h4>
						{React.createElement('demo-outer-table', { 'aria-labelledby': 'label-native-wc-table' })}
					</div>
				</div>
			</section>
		</div>
	</>
);
