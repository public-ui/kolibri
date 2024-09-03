import * as React from 'react';
import { KolAccordion, KolTree, KolTreeItem } from '@public-ui/react';
import { useMobile } from '../hooks/useMobile';
import type { Routes, Route } from '../shares/types';
import { useHref, useMatch, useResolvedPath } from 'react-router-dom';

type NavigationProps = {
	routes: Routes;
};

function ComponentNavContainer({ children }: { children?: React.ReactNode }): React.ReactNode {
	const isMobile = useMobile();

	return isMobile ? (
		<KolAccordion _label="Alle Komponenten" class="mt">
			{children}
		</KolAccordion>
	) : (
		<div className="mt scrollable-container">{children}</div>
	);
}

function TreeItem({ label, to, children }: any) {
	const href = useHref(to);
	const resolved = useResolvedPath(to);
	const match = useMatch({ path: resolved.pathname, end: true });

	return (
		<KolTreeItem _label={label} _href={href} _active={!!match}>
			{children}
		</KolTreeItem>
	);
}

function Navigation({ routes }: NavigationProps): React.ReactNode {
	const buildSubTree = (parentName: string, children: Route) => {
		return Object.keys(children).map((childName) => {
			const isTreeExample = parentName === 'tree' && childName === 'basic/:subPage';
			const subPathName = isTreeExample ? 'basic/home' : childName;
			const label = isTreeExample ? 'basic' : childName;

			return <TreeItem key={[parentName, childName].join('/')} label={label} to={[parentName, subPathName].join('/')}></TreeItem>;
		});
	};

	const parentTreeElements = Object.entries(routes).map(([parentName, children]) => (
		<KolTreeItem key={parentName} _label={parentName} _href="">
			{buildSubTree(parentName, children)}
		</KolTreeItem>
	));

	return (
		<ComponentNavContainer>
			<KolTree _label="Sitemap" class="block">
				{parentTreeElements}
			</KolTree>
		</ComponentNavContainer>
	);
}

export default Navigation;
