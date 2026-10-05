import { KolInputText, KolTree, KolTreeItem } from '@public-ui/react-v19';
import * as React from 'react';
import { useMemo, useState } from 'react';
import { useHref, useMatch, useResolvedPath } from 'react-router';
import type { Route, Routes } from '../shares/types';

type NavigationProps = {
	routes: Routes;
};

function isRoutes(x: Route): x is Routes {
	return typeof x === 'object' && x !== null;
}

function cloneSubtree(route: Route): Route {
	if (!isRoutes(route)) return route; // FC einfach durchreichen
	const out: Routes = {};
	for (const [k, v] of Object.entries(route)) out[k] = cloneSubtree(v);
	return out;
}

function tokenize(query: string): string[] {
	return query.trim().toLowerCase().split(/\s+/).filter(Boolean);
}

function pathMatchesTokens(pathSegments: string[], tokens: string[]): boolean {
	const segs = pathSegments.map((s) => s.toLowerCase());
	const fullPath = segs.join('/');

	return tokens.every((t) => segs.some((seg) => seg.includes(t)) || fullPath.includes(t));
}

function walkPath(current: Routes, tokens: string[], path: string[]): Routes {
	const out: Routes = {};

	for (const [key, value] of Object.entries(current)) {
		const nextPath = [...path, key];

		const matchesHere = pathMatchesTokens(nextPath, tokens);

		if (matchesHere) {
			// ganzer Subtree ab hier (weil Pfad bis hier alle Tokens erfüllt)
			out[key] = cloneSubtree(value);
			continue;
		}

		if (isRoutes(value)) {
			const filteredChildren = walkPath(value, tokens, nextPath);
			if (Object.keys(filteredChildren).length > 0) {
				out[key] = filteredChildren; // Pfad zu Treffern behalten
			}
		}
	}

	return out;
}

function filterRoutes(routes: Routes, query: string): Routes {
	const tokens = tokenize(query);
	if (tokens.length === 0) return cloneSubtree(routes) as Routes;

	return walkPath(routes, tokens, []);
}

function ComponentNavContainer({ children }: { children?: React.ReactNode }): React.ReactNode {
	return <div className="mt scrollable-container">{children}</div>;
}

function TreeItem({ label, to, children, open }: any) {
	const href = useHref(to);
	const resolved = useResolvedPath(to);
	const match = useMatch({ path: resolved.pathname, end: true });

	return (
		<KolTreeItem _label={label} _href={href} _active={!!match} _open={open}>
			{children}
		</KolTreeItem>
	);
}

function Navigation({ routes }: NavigationProps): React.ReactNode {
	const [query, setQuery] = useState<string>('');
	const filteredRoutes = useMemo(() => filterRoutes(routes, query), [routes, query]);

	const buildSubTree = (parentName: string, children: Route) => {
		return Object.keys(children).map((childName) => {
			const isTreeExample = parentName === 'tree' && childName === 'basic/:subPage';
			const subPathName = isTreeExample ? 'basic/home' : childName;
			const label = isTreeExample ? 'basic' : childName;

			return <TreeItem key={[parentName, childName].join('/')} label={label} to={[parentName, subPathName].join('/')}></TreeItem>;
		});
	};

	const parentTreeElements = Object.entries(filteredRoutes).map(([parentName, children]) => (
		<TreeItem key={parentName} label={parentName} to={parentName} open={!!query}>
			{buildSubTree(parentName, children)}
		</TreeItem>
	));

	return (
		<ComponentNavContainer>
			<KolInputText
				_label="Suche"
				_on={{
					onInput: (event: Event) => {
						const input = event.target as HTMLInputElement;
						setQuery(input.value);
					},
				}}
			/>
			<nav className="main-nav">
				<KolTree _label="Navigation" class="block">
					{parentTreeElements}
				</KolTree>
			</nav>
		</ComponentNavContainer>
	);
}

export default Navigation;
