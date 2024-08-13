import * as React from 'react';
import { KolTable, KolTabs, KolNav } from '@public-ui/react';
import type { TabButtonProps } from '@public-ui/components';
import { SampleDescription } from '../../components/SampleDescription';
import { LINKS } from '../../components/nav/links';
import DatabaseData from './databasedata.json';

import './layout.css';

type UseTableResult = {
	data: any;
	columns: any;
	tableWith: string;
};

type TabsLayoutProps = {
	className?: string;
    demoContent: React.ReactNode;
};

type NavigationProps = {
	className?: string;
};

type MainLayoutProps = {
	children: React.ReactNode;
};

const tabs: TabButtonProps[] = [
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

const columnDefinitions: unknown = [
	{ key: 'name', label: 'Name', textAlign: 'left', width: '400px' },
	{ key: 'species', label: 'Species', textAlign: 'left', width: '400px' },
	{ key: 'habitat', label: 'Habitat', textAlign: 'left', width: '400px' },
	{ key: 'diet', label: 'Diet', textAlign: 'left', width: '400px' },
	{ key: 'lifespan', label: 'lifespan', textAlign: 'right', width: '400px' },
];

function useTable(): UseTableResult {
	const [tableWith] = React.useState(() => {
		let width = 0;

		for (const def of columnDefinitions as { width: string }[]) {
			width += Number(def.width?.replace('px', '') || 0);
		}
		return `${width}px`;
	});

	return {
		data: DatabaseData,
		columns: columnDefinitions,
		tableWith,
	};
}

function Table() {
	const table = useTable();

	return (
		<div style={{ overflow: 'hidden' }}>
			<KolTable
				_label="Table for demonstration purposes with horizontal scrollbar"
				_minWidth={table.tableWith}
				_headers={{ horizontal: [table.columns] }}
				_data={table.data}
				_pagination={{ _page: 1 }}
				className="block"
			/>
		</div>
	);
}

function TabsLayout({ className, demoContent }: TabsLayoutProps) {
	return (
		<div className={className}>
			<KolTabs _tabs={tabs} _label="Demo Tabs"></KolTabs>
            {demoContent}
		</div>
	);
}

function Navigation({ className }: NavigationProps) {
	return (
		<div className={className}>
			<KolNav _label="Main navigation" _links={LINKS} _hasCompactButton _hasIconsWhenExpanded />
		</div>
	);
}

function MainLayout({ children }: MainLayoutProps) {
	return (
		<div className="mainlayout">
			<Navigation className="nav-area" />
			<TabsLayout className="content" demoContent={children} />
		</div>
	);
}

function TableHorizontalScrollbarAdvanced() {
	return (
		<>
			<SampleDescription></SampleDescription>
			<MainLayout>
				<Table />
			</MainLayout>
		</>
	);
}

export default TableHorizontalScrollbarAdvanced;