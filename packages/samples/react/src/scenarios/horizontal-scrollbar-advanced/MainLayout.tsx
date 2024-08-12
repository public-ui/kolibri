import * as React from 'react';
import Navigation from './Navigation';
import TabsLayout from './TabsLayout';

import './layout.css';

export type MainLayoutProps = {
	children: React.ReactNode;
};

function MainLayout({ children }: MainLayoutProps) {
	return (
		<div className="mainlayout">
			<Navigation className="nav-area" />
			<TabsLayout className="content" demoContent={children} />
		</div>
	);
}

export default MainLayout;
