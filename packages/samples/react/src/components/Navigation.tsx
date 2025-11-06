import { KolAccordion, KolHeading, KolTree, KolTreeItem } from '@public-ui/react-v19';
import * as React from 'react';
import { useHref, useMatch, useResolvedPath } from 'react-router-dom';

import { useMobile } from '../hooks/useMobile';
import type { Route, Routes } from '../shares/types';

type NavigationProps = {
	routes: Routes;
};

const CATEGORY_ORDER = ['components', 'scenarios', 'docs'] as const;
const CATEGORY_LABELS: Record<(typeof CATEGORY_ORDER)[number], string> = {
	components: 'Component Stories',
	scenarios: 'Scenarios',
	docs: 'Docs',
};

const isRoutes = (route: Route): route is Routes => typeof route === 'object' && route !== null;

function ComponentNavContainer({ children }: { children?: React.ReactNode }): React.ReactNode {
	const isMobile = useMobile();

	return isMobile ? (
		<KolAccordion _label="All samples" class="mt">
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

const buildTreeItems = (categoryKey: string, nodes: Routes, parentSegments: string[] = []): React.ReactNode[] => {
	return Object.entries(nodes)
		.map(([nodeName, childRoute]) => {
			const currentSegments = [...parentSegments, nodeName];
			const isTreeExample = parentSegments[0] === 'tree' && nodeName === 'basic/:subPage';
			const label = isTreeExample ? 'basic' : nodeName;
			const pathSegments = isTreeExample ? [...parentSegments, 'basic', 'home'] : currentSegments;
			const to = [categoryKey, ...pathSegments].join('/');

			if (typeof childRoute === 'function') {
				return <TreeItem key={to} label={label} to={to}></TreeItem>;
			}

			if (isRoutes(childRoute)) {
				return (
					<TreeItem key={to} label={label} to={to}>
						{buildTreeItems(categoryKey, childRoute, currentSegments)}
					</TreeItem>
				);
			}

			return null;
		})
		.filter((node): node is React.ReactNode => node !== null);
};

function Navigation({ routes }: NavigationProps): React.ReactNode {
	const categories = CATEGORY_ORDER.filter((categoryKey) => isRoutes(routes[categoryKey])).map((categoryKey) => ({
		key: categoryKey,
		label: CATEGORY_LABELS[categoryKey],
		routes: routes[categoryKey] as Routes,
	}));

	return (
		<ComponentNavContainer>
			{categories.map(({ key, label, routes: categoryRoutes }) => (
				<section key={key} className="mt">
					<KolHeading _label={label} _level={2} className="block" />
					<nav aria-label={label}>
						<KolTree _label={`${label} navigation`} class="block">
							{buildTreeItems(key, categoryRoutes)}
						</KolTree>
					</nav>
				</section>
			))}
		</ComponentNavContainer>
	);
}

export default Navigation;
