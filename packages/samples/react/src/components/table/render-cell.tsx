import type { FC } from 'react';
import React from 'react';

import { createReactRenderElement, KolButton, KolInputText, KolTableStateful } from '@public-ui/react-v19';

import { getRoot } from '../../shares/react-roots';
import { SampleDescription } from '../SampleDescription';
import { DATE_FORMATTER } from './formatter';

import type { IconsPropType, KoliBriTableCell, KoliBriTableHeaders, KoliBriTableSelection } from '@public-ui/components';
import { useToasterService } from '../../hooks/useToasterService';

type Data = {
	order: number;
	date: Date;
	shipped: boolean;
};

/**
 * Generates n data entries with random dates and shipping status
 * @param n - Number of data entries to generate
 * @returns Array of Data objects
 */
function generateDataEntries(n: number): Data[] {
	const entries: Data[] = [];
	const startDate = new Date('1970-01-01').getTime();
	const endDate = new Date('2025-12-31').getTime();

	for (let i = 0; i < n; i++) {
		const randomTimestamp = startDate + Math.random() * (endDate - startDate);
		entries.push({
			order: i,
			shipped: Math.random() > 0.5,
			date: new Date(randomTimestamp),
		});
	}

	return entries;
}

const DATA: Data[] = generateDataEntries(100);

function KolButtonWrapper({ label, icons }: { label: string; icons: IconsPropType }) {
	const { dummyClickEventHandler } = useToasterService();

	const dummyEventHandler = {
		onClick: dummyClickEventHandler,
	};

	return <KolButton _label={label} _icons={icons} _on={dummyEventHandler} />;
}

const HEADERS: KoliBriTableHeaders = {
	horizontal: [
		[
			{
				label: '#',
				key: 'order',
				textAlign: 'center',
				width: 100,

				/* Example 1: Use render return value to format data */
				render: (_el, cell: KoliBriTableCell) => {
					const { label } = cell as { label: string };
					return `Index: ${label}`;
				},
			},
			{
				label: 'Status',
				key: 'shipped',
				textAlign: 'center',
				width: 100,

				/* Example 2: Simple render function using textContent */
				render: (el, cell: KoliBriTableCell) => {
					const { label } = cell as { label: string };
					const element = el as HTMLElement;
					if (label) {
						element.textContent = `Order has been dispatched 🚚`;
					} else {
						element.textContent = `Order pending 📦`;
					}
				},
			},
			{
				label: 'Date (string)',
				key: 'date',
				width: 200,
				textAlign: 'center',

				/* Example 3: Render function using innerHTML. ⚠️Make sure to sanitize data to avoid XSS. */
				render: (el, cell: KoliBriTableCell) => {
					const { label } = cell as { label: string };
					(el as HTMLElement).innerHTML = `<strong>${DATE_FORMATTER.format(label as unknown as Date)}</strong>`;
				},
				compareFn: (data0, data1) => (data0 as Data).date.getTime() - (data1 as Data).date.getTime(),
			},
			{
				label: 'Action (react)',
				key: 'action',
				width: 200,

				/* Example 4: Render function using React */
				render: (el) => {
					getRoot(createReactRenderElement(el)).render(
						<div
							style={{
								display: `grid`,
								gridAutoFlow: `column`,
								alignItems: `end`,
								gap: `1rem`,
								maxWidth: `400px`,
							}}
						>
							<KolInputText _label="Input" />
							<KolButtonWrapper label="Save" icons={{ left: 'kolicon-check' }} />
						</div>,
					);
				},
			},
		],
	],
};

const selection: KoliBriTableSelection = {
	label: (row) => `Selection for ${(row as Data).order}`,
	multiple: false,
	keyPropertyName: 'internalIdentifier',
};

export const TableRenderCell: FC = () => (
	<>
		<SampleDescription>
			<p>This sample shows KolTableStateful using React render functions for the cell contents.</p>
		</SampleDescription>

		<KolTableStateful _label="Sort by date column" _data={DATA} _headers={HEADERS} className="w-full" _hasSettingsMenu _selection={selection} />
	</>
);
