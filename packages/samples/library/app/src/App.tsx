import type { FC } from 'react';
import React from 'react';
import { useLocation } from 'react-router';
import { Navigate, Route, Routes, useSearchParams } from 'react-router-dom';

import { KolAlert } from '@public-ui/react';

import { Sidebar } from './components/Sidebar';
import { useSetCurrentLocation } from './hooks/useSetCurrentLocation';
import { HideMenusContext } from './shares/HideMenusContext';
import { ROUTES } from './components/routes';

import type { Route as MyRoute, Routes as MyRoutes } from './shares/types';

import type { Option } from '@public-ui/components';

const getRouteList = (routes: MyRoutes, offset = '/'): string[] => {
	let list: string[] = [];
	for (const key in routes) {
		if (routes[key]) {
			const ThisRoute: MyRoute = routes[key];
			const path = `${offset}${key}`;
			if (typeof ThisRoute === 'function') {
				list.push(path);
			} else if (typeof ThisRoute === 'object' && ThisRoute !== null) {
				list = list.concat(getRouteList(ThisRoute, `${path}/`));
			}
		}
	}
	return list;
};

const getRouteTree = (routes: MyRoutes): ReturnType<typeof Route>[] => {
	const tree: ReturnType<typeof Route>[] = [];
	for (const key in routes) {
		if (routes[key]) {
			const ThisRoute: MyRoute = routes[key];
			const path = `/${key}`;
			if (typeof ThisRoute === 'function') {
				tree.push(<Route key={path} path={path} element={<ThisRoute />} />);
				tree.push(
					<Route
						key={`${path}/all`}
						path={`${path}/all`}
						element={
							<div className="d-grid gap-4">
								<div className="d-grid gap-2">
									<div className="mt-4">
										<strong>Demo</strong>
									</div>
									<div className="my-2">
										<ThisRoute />
									</div>
									<hr aria-hidden="true" />
								</div>
							</div>
						}
					/>,
				);
			} else if (typeof ThisRoute === 'object' && ThisRoute !== null) {
				const keys = Object.keys(ThisRoute);
				if (keys.length > 0) {
					tree.push(
						<Route
							key={path}
							path={`${path}/*`}
							element={
								<Routes>
									<Route path="/" element={<Navigate to={keys[0]} />} />
									{getRouteTree(ThisRoute)}
								</Routes>
							}
						/>,
					);
				}
			}
		}
	}
	return tree;
};

const ROUTE_LIST = getRouteList(ROUTES);
const ROUTE_TREE = getRouteTree(ROUTES);

console.log('ROUTE_LIST', ROUTE_LIST);

const componentList: Map<string, Option<string>> = new Map();
ROUTE_LIST.forEach((route) => {
	const routeSplit = route.split('/');
	if (!componentList.has(routeSplit[1])) {
		componentList.set(routeSplit[1], {
			label: routeSplit[1],
			value: route,
		});
	}
});

export const App: FC = () => {
	const routerLocation = useLocation();
	const [searchParams] = useSearchParams();
	const hideMenus = searchParams.has('hideMenus');

	useSetCurrentLocation();

	return (
		<HideMenusContext.Provider value={hideMenus}>
			<div className={!hideMenus ? 'app-container' : ''}>
				{!hideMenus && <Sidebar sample={routerLocation.pathname} routes={ROUTES} routeList={ROUTE_LIST} />}
				<div className="p-4" id="route-container">
					<Routes>
						{ROUTE_TREE}
						<Route path="*" element={<KolAlert _type="info">This code example has not been migrated yet - it&#39;s coming soon!</KolAlert>} />
					</Routes>
				</div>
			</div>
		</HideMenusContext.Provider>
	);
};
