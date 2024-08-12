import * as React from 'react';
import { KolTabs } from '@public-ui/react';
import type { TabButtonProps } from '@public-ui/components';

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

export type TabsLayout = {
	className?: string;
	demoContent: React.ReactNode;
};

function TabsLayout({ className, demoContent }: TabsLayout) {
	return (
		<div className={className}>
			<KolTabs _tabs={tabs} _label="Demo Tabs"></KolTabs>
			{demoContent}
		</div>
	);
}

export default TabsLayout;
