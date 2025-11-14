import { KolAccordion, KolTree, KolTreeItem } from '@public-ui/react-v19';
import * as React from 'react';
import { useHref, useMatch, useResolvedPath } from 'react-router-dom';
import { useMobile } from '../hooks/useMobile';
import type { Route, Routes } from '../shares/types';

type NavigationProps = {
	routes: Routes;
};

function ComponentNavContainer({ children }: { children?: React.ReactNode }): React.ReactNode {
	const isMobile = useMobile();

	return isMobile ? (
		<KolAccordion _label="All components" class="mt">
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
	const buildSubTree = (parentPath: string, children: Route): React.ReactNode[] => {
		const childrenObj = children as Routes;
		return Object.keys(childrenObj).map((childName) => {
			const child = childrenObj[childName];
			const isTreeExample = parentPath === 'tree' && childName === 'basic/:subPage';
			const subPathName = isTreeExample ? 'basic/home' : childName;
			const label = isTreeExample ? 'basic' : childName;
			const fullPath = `${parentPath}/${subPathName}`;

			// Check if this is a nested route object (more routes inside)
			// Functional components are 'function' type, nested routes are 'object' type
			if (typeof child === 'object' && child !== null) {
				// This is a nested route, recursively build its children
				return (
					<TreeItem key={fullPath} label={label} to={fullPath}>
						{buildSubTree(fullPath, child as Routes)}
					</TreeItem>
				);
			}

			// This is a leaf node (functional component)
			return <TreeItem key={fullPath} label={label} to={fullPath}></TreeItem>;
		});
	};

	const parentTreeElements = Object.entries(routes).map(([parentName, children]) => (
		<TreeItem key={parentName} label={parentName} to={parentName}>
			{buildSubTree(parentName, children)}
		</TreeItem>
	));

	return (
		<ComponentNavContainer>
			<nav>
				<KolTree _label="Navigation" class="block">
					{parentTreeElements}
				</KolTree>
			</nav>
		</ComponentNavContainer>
	);
}

export default Navigation;
