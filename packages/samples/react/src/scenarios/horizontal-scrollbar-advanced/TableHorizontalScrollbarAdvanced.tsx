import * as React from 'react';
import { KolTableStateful, KolTabs, KolNav } from '@public-ui/react';
import type { KoliBriTableHeaders, TabButtonProps } from '@public-ui/components';
import { SampleDescription } from '../../components/SampleDescription';
import { LINKS } from '../../components/nav/links';
import DATA from './databasedata.json';

import './layout.scss';

const TABS: TabButtonProps[] = [
	{
		_icons: 'codicon codicon-pie-chart',
		_label: 'Erster Tab',
	},
	{
		_icons: 'codicon codicon-calendar',
		_label: 'Zweiter Tab',
		_disabled: true,
	},
	{
		_icons: 'codicon codicon-briefcase',
		_label: 'Deaktivierter Tab',
		_disabled: true,
	},
	{
		_icons: 'codicon codicon-telescope',
		_label: 'Letzter Tab',
		_disabled: true,
	},
];

const HEADERS: KoliBriTableHeaders = {
	horizontal: [
		[
			{ key: 'name', label: 'Name', textAlign: 'left', minWidth: '400px' },
			{ key: 'species', label: 'Species', textAlign: 'left', minWidth: '400px' },
			{ key: 'habitat', label: 'Habitat', textAlign: 'left', minWidth: '400px' },
			{ key: 'diet', label: 'Diet', textAlign: 'left', minWidth: '400px' },
			{ key: 'lifespan', label: 'lifespan', textAlign: 'right', minWidth: '400px' },
		],
	],
};

function TableHorizontalScrollbarAdvanced() {
	const [tableWidth] = React.useState(() => {
		const columnDefinitions = HEADERS.horizontal![0];
		let width = 0;

		for (const def of columnDefinitions as { minWidth: string }[]) {
			width += Number(def.minWidth?.replace('px', '') || 0);
		}
		return `${width}px`;
	});

	return (
		<>
			<SampleDescription></SampleDescription>
			<div className="mainlayout">
				<aside className="nav-area">
					<KolNav _label="Main navigation" _links={LINKS} _hasCompactButton _hasIconsWhenExpanded />
				</aside>
				<div className="content">
					<KolTabs _tabs={TABS} _align="top" _label="Demo Tabs">
						<div style={{ overflow: 'hidden' }}>
							<KolTableStateful
								_label="Table for demonstration purposes with horizontal scrollbar"
								_headers={HEADERS}
								_data={DATA}
								_pagination={{ _page: 1 }}
								className="block"
							/>
						</div>
						<div></div>
						<div></div>
						<div></div>
					</KolTabs>
				</div>
			</div>
		</>
	);
}

export default TableHorizontalScrollbarAdvanced;
