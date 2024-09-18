import * as React from 'react';
import { KolTable, KolTabs, KolNav } from '@public-ui/react';
import type { KoliBriTableHeaders, TabButtonProps } from '@public-ui/components';
import { SampleDescription } from '../../components/SampleDescription';
import { LINKS } from '../../components/nav/links';
import DATA from './databasedata.json';

import './layout.css';

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
			{ key: 'name', label: 'Name', textAlign: 'left', width: '400px' },
			{ key: 'species', label: 'Species', textAlign: 'left', width: '400px' },
			{ key: 'habitat', label: 'Habitat', textAlign: 'left', width: '400px' },
			{ key: 'diet', label: 'Diet', textAlign: 'left', width: '400px' },
			{ key: 'lifespan', label: 'lifespan', textAlign: 'right', width: '400px' },
		],
	],
};

function TableHorizontalScrollbarAdvanced() {
	const [tableWith] = React.useState(() => {
		const columnDefinitions = HEADERS.horizontal![0];
		let width = 0;

		for (const def of columnDefinitions as { width: string }[]) {
			width += Number(def.width?.replace('px', '') || 0);
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
					<KolTabs _tabs={TABS} _label="Demo Tabs"></KolTabs>
					<div style={{ overflow: 'hidden' }}>
						<KolTable
							_label="Table for demonstration purposes with horizontal scrollbar"
							_minWidth={tableWith}
							_headers={HEADERS}
							_data={DATA}
							_pagination={{ _page: 1 }}
							className="block"
						/>
					</div>
				</div>
			</div>
		</>
	);
}

export default TableHorizontalScrollbarAdvanced;
